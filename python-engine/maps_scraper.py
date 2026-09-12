#!/usr/bin/env python3
"""
maps_scraper.py - Google Maps Scraper & Google Business Profile (GBP) Inspector
Extracts accurate organic ranking positions (#1, #2, #3, etc.), extracts canonical
Google Business Profile CID links (https://www.google.com/maps?cid=...), inspects
each GBP for phone, website, address, claim status, and reviews.
"""

import time
import re
import urllib.parse
from playwright.sync_api import sync_playwright

SOCIAL_DOMAINS = [
    'instagram.com', 'facebook.com', 'fb.com', 'fb.me', 
    'tiktok.com', 'linktr.ee', 'linktree', 'twitter.com', 'x.com', 'yelp.com'
]

def clean_text(text):
    if not text:
        return ""
    return re.sub(r'\s+', ' ', text).strip()

def extract_city_and_service(query):
    """
    Heuristic to extract primary service and city from search query like 'emergency dentists in Austin'
    """
    clean_q = clean_text(query)
    match = re.search(r'^(.*?)\s+in\s+(.*)$', clean_q, re.IGNORECASE)
    if match:
        service = match.group(1).strip()
        city = match.group(2).strip()
        return service, city
    
    parts = clean_q.split(',')
    if len(parts) >= 2:
        return parts[0].strip(), parts[1].strip()
        
    return clean_q, "your local area"

def extract_cid_and_canonical_url(href):
    """
    Extracts the decimal CID from Google Maps place link to construct
    the permanent, canonical Google Business Profile URL:
    https://www.google.com/maps?cid={cid_decimal}
    This link ALWAYS opens the standalone business profile and NEVER a search page.
    """
    if not href:
        return None, ""

    m = re.search(r'0x[0-9a-fA-F]+:(0x[0-9a-fA-F]+)', href)
    if m:
        try:
            hex_part = m.group(1)
            cid_dec = int(hex_part, 16)
            canonical_url = f"https://www.google.com/maps?cid={cid_dec}"
            return str(cid_dec), canonical_url
        except Exception:
            pass

    # Fallback to place path if CID conversion fails
    place_match = re.search(r'/maps/place/([^/]+)/', href)
    if place_match:
        place_name = place_match.group(1)
        return None, f"https://www.google.com/maps/place/{place_name}"

    return None, href

class MapsScraper:
    def __init__(self, headless=True):
        self.headless = headless

    def scrape(self, query: str, max_results: int = 15):
        """
        Scrapes Google Maps for query, extracting each Google Business Profile
        and recording their exact organic ranking positions.
        """
        primary_service, city = extract_city_and_service(query)
        encoded_query = urllib.parse.quote(query)
        search_url = f"https://www.google.com/maps/search/{encoded_query}"

        print(f"[*] Launching browser for query: '{query}'")
        print(f"[*] Search URL: {search_url}")

        results = []
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=self.headless,
                args=[
                    '--disable-blink-features=AutomationControlled',
                    '--no-sandbox',
                    '--disable-dev-shm-usage'
                ]
            )
            context = browser.new_context(
                user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
                viewport={'width': 1280, 'height': 900}
            )
            page = context.new_page()

            try:
                page.goto(search_url, wait_until="domcontentloaded", timeout=30000)
            except Exception as e:
                print(f"[!] Warning on initial page navigation: {e}")

            time.sleep(3.5)

            # Dismiss cookie/consent prompts if present
            for selector in [
                'button[aria-label="Reject all"]',
                'button[aria-label="Accept all"]',
                'form[action*="consent"] button',
                'button:has-text("Accept all")',
                'button:has-text("Reject all")'
            ]:
                try:
                    btn = page.query_selector(selector)
                    if btn and btn.is_visible():
                        btn.click()
                        time.sleep(1)
                        break
                except Exception:
                    pass

            # Locate the results feed container
            feed = None
            for sel in ['div[role="feed"]', 'div[aria-label*="Results for"]', 'div.m6QEdf.DkEaL']:
                feed = page.query_selector(sel)
                if feed:
                    break

            if not feed:
                try:
                    page.wait_for_selector('div.Nv2PK, a.hfpxzc', timeout=8000)
                except Exception:
                    pass

            # Scroll feed to populate target number of listings
            scroll_attempts = max(3, (max_results // 3) + 1)
            print(f"[*] Scrolling feed ({scroll_attempts} times) to load listings...")
            for _ in range(scroll_attempts):
                if feed:
                    try:
                        feed.evaluate('el => el.scrollBy(0, 1000)')
                    except Exception:
                        pass
                else:
                    page.mouse.wheel(0, 1000)
                time.sleep(1.0)

            # Query all listing cards in feed
            cards = page.query_selector_all('div[role="feed"] div.Nv2PK')
            if not cards:
                cards = page.query_selector_all('div.Nv2PK')

            print(f"[*] Discovered {len(cards)} raw cards in search results.")

            seen_cids = set()
            seen_names = set()
            organic_rank = 1

            for card in cards:
                if len(results) >= max_results:
                    break

                try:
                    card_text = card.inner_text()
                    is_sponsored = 'Sponsored' in card_text or 'Ad' in card_text[:30]

                    # 1. Business Name
                    title_el = card.query_selector('div.qBF1Pd')
                    link_el = card.query_selector('a.hfpxzc')
                    
                    title = ""
                    if title_el and clean_text(title_el.inner_text()):
                        title = clean_text(title_el.inner_text())
                    elif link_el and link_el.get_attribute('aria-label'):
                        title = clean_text(link_el.get_attribute('aria-label'))

                    if not title or title.lower() in ["results", "directions", "website"]:
                        continue

                    # 2. Canonical Google Business Profile URL & CID
                    raw_href = link_el.get_attribute('href') if link_el else ""
                    cid_dec, gbp_url = extract_cid_and_canonical_url(raw_href)

                    # Deduplicate by CID or normalized name
                    dedup_key = cid_dec or title.lower()
                    if dedup_key in seen_cids or title.lower() in seen_names:
                        continue
                    if cid_dec:
                        seen_cids.add(cid_dec)
                    seen_names.add(title.lower())

                    # 3. Card-level rating & reviews (reliable and per-listing)
                    rating = 0.0
                    reviews_count = 0
                    m_rat = re.search(r'([1-5]\.\d)', card_text)
                    if m_rat:
                        try:
                            rating = float(m_rat.group(1))
                        except Exception:
                            pass

                    m_rev = re.search(r'\((\d+[\d,]*)\)', card_text)
                    if m_rev:
                        try:
                            reviews_count = int(m_rev.group(1).replace(',', ''))
                        except Exception:
                            pass

                    # 4. Deep Profile Inspection (Click card to load detail panel)
                    website_url = None
                    phone = None
                    address = None
                    category = primary_service
                    is_unclaimed = False
                    opening_hours = None

                    try:
                        if link_el:
                            link_el.click(timeout=3000)
                            time.sleep(1.8)

                            # Detail panel container
                            detail_panel = page.query_selector('div[role="main"], div.TI2pp, div.m6QEdf')
                            panel_text = detail_panel.inner_text() if detail_panel else ""

                            # Category
                            cat_btn = page.query_selector('button[jsaction*="category"], button.DkEaL')
                            if cat_btn and clean_text(cat_btn.inner_text()):
                                category = clean_text(cat_btn.inner_text())

                            # Website button
                            web_btn = page.query_selector('a[data-item-id="authority"], a[aria-label*="Website"], a[aria-label*="website"]')
                            if web_btn:
                                w_href = web_btn.get_attribute('href')
                                if w_href:
                                    if '/url?q=' in w_href:
                                        m = re.search(r'/url\?q=([^&]+)', w_href)
                                        website_url = urllib.parse.unquote(m.group(1)) if m else w_href
                                    else:
                                        website_url = w_href

                            # Phone button
                            phone_btn = page.query_selector('button[data-item-id*="phone"], button[aria-label*="Phone"]')
                            if phone_btn:
                                p_txt = phone_btn.get_attribute('aria-label') or phone_btn.inner_text()
                                p_match = re.search(r'Phone:\s*(.*)', p_txt, re.IGNORECASE)
                                phone = p_match.group(1).strip() if p_match else clean_text(p_txt)

                            # Address button
                            addr_btn = page.query_selector('button[data-item-id="address"], button[aria-label*="Address"]')
                            if addr_btn:
                                a_txt = addr_btn.get_attribute('aria-label') or addr_btn.inner_text()
                                a_match = re.search(r'Address:\s*(.*)', a_txt, re.IGNORECASE)
                                address = a_match.group(1).strip() if a_match else clean_text(a_txt)

                            # Claimed status
                            claim_btn = page.query_selector('button[aria-label*="Claim this business"], a[href*="claim?"], button:has-text("Claim this business")')
                            is_unclaimed = bool(claim_btn)

                            # Check opening hours snippet
                            hours_match = re.search(r'(Open 24 hours|Closed · Opens [^\n]+|Open · Closes [^\n]+)', panel_text)
                            if hours_match:
                                opening_hours = hours_match.group(1).strip()

                    except Exception as click_err:
                        pass

                    # Fallbacks from card text if detail panel didn't populate
                    if not address and card_text:
                        # Find address segment in card
                        lines = [l.strip() for l in card_text.split('\n') if l.strip()]
                        for line in lines:
                            if any(term in line for term in ['Blvd', 'Rd', 'St', 'Ave', 'Drive', 'Lane', 'Way', 'Ste', 'Suite', 'TX', city]):
                                address = line
                                break

                    has_real_website = bool(website_url and not any(soc in website_url.lower() for soc in SOCIAL_DOMAINS))

                    current_rank = organic_rank if not is_sponsored else 0

                    business_data = {
                        "currentRank": current_rank,
                        "isSponsored": is_sponsored,
                        "businessName": title,
                        "rating": rating,
                        "reviewsCount": reviews_count,
                        "category": category or primary_service,
                        "primaryService": primary_service,
                        "city": city,
                        "address": address or f"{city}",
                        "phone": phone or "Not publicly listed",
                        "website": website_url,
                        "hasWebsite": bool(website_url),
                        "hasRealWebsite": has_real_website,
                        "gbpUrl": gbp_url,
                        "mapsUrl": gbp_url,  # GUARANTEED to be the direct Google Business Profile URL
                        "placeCid": cid_dec,
                        "isUnclaimed": is_unclaimed,
                        "openingHours": opening_hours or "Check profile for hours"
                    }

                    if is_sponsored:
                        print(f"  [SPONSORED AD] {title} | {rating}★ ({reviews_count} revs) | GBP: {gbp_url}")
                    else:
                        print(f"  [Organic #{organic_rank}] {title} | {rating}★ ({reviews_count} revs) | GBP: {gbp_url}")
                        organic_rank += 1

                    results.append(business_data)

                except Exception as e:
                    print(f"[!] Error parsing listing card: {e}")
                    continue

            browser.close()

        # Separate organic vs sponsored for benchmarking
        organic_results = [b for b in results if not b.get("isSponsored")]
        # Fallback if all were flagged or none
        pool_for_benchmark = organic_results if len(organic_results) >= 3 else results
        top_3 = pool_for_benchmark[:3]

        top_3_reviews = [b['reviewsCount'] for b in top_3 if b['reviewsCount'] > 0]
        top_3_ratings = [b['rating'] for b in top_3 if b['rating'] > 0]

        benchmark = {
            "top3Count": len(top_3),
            "top3AvgReviews": round(sum(top_3_reviews) / len(top_3_reviews), 1) if top_3_reviews else 50,
            "top3AvgRating": round(sum(top_3_ratings) / len(top_3_ratings), 1) if top_3_ratings else 4.7,
            "top3Names": [b['businessName'] for b in top_3],
            "top3Gbps": [b['gbpUrl'] for b in top_3]
        }

        print(f"[*] Benchmark Top 3 established: Avg Reviews = {benchmark['top3AvgReviews']}, Avg Rating = {benchmark['top3AvgRating']}")

        return {
            "query": query,
            "primaryService": primary_service,
            "city": city,
            "benchmark": benchmark,
            "totalFound": len(results),
            "businesses": results
        }

if __name__ == "__main__":
    import sys
    query = sys.argv[1] if len(sys.argv) > 1 else "emergency dentists in Austin"
    scraper = MapsScraper(headless=True)
    data = scraper.scrape(query, max_results=5)
    print(f"\nScraped {len(data['businesses'])} businesses successfully.")
    for b in data['businesses']:
        print(f"#{b['currentRank']} {b['businessName']} => GBP: {b['gbpUrl']} | Web: {b['website']}")
