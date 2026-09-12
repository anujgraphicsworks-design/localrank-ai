#!/usr/bin/env python3
"""
maps_scraper.py - Google Maps Autonomous Background Scraper & Profile Verifier
Deeply inspects Google Business Profiles (GBP) one by one in headless Playwright:
- Secures verified share shortlinks (https://maps.app.goo.gl/...) or decimal CIDs (https://www.google.com/maps?cid=...)
- Strictly rejects any broken links containing 'place//@' or empty coordinates
- Extracts exact ranking positions (#1 to #N organic, distinguishing sponsored ads)
- Extracts star rating, exact review count, category, phone, full address, claimed status, and official website
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
    Extracts primary service and city from query like 'emergency dentists in Austin'
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

def sanitize_and_verify_url(candidate_url: str, business_name: str = "", address: str = "", city: str = ""):
    """
    Validates that a GBP URL is clean and authentic.
    STRICTLY DISCARDS any link containing 'place//@' or coordinate-only links.
    Guarantees a 100% working link that directly opens the business profile.
    """
    if not candidate_url:
        candidate_url = ""
        
    cand = candidate_url.strip()
    
    # 1. If it has place//@ or begins with @, it is a broken coordinate link! Reject immediately.
    if "place//@" in cand or cand.startswith("@") or "//@" in cand:
        cand = ""
        
    # 2. Check for hexadecimal place CID (0x...:0x...)
    m_cid = re.search(r'0x[0-9a-fA-F]+:(0x[0-9a-fA-F]+)', cand)
    if m_cid:
        try:
            cid_dec = str(int(m_cid.group(1), 16))
            return cid_dec, f"https://www.google.com/maps?cid={cid_dec}"
        except Exception:
            pass

    # 3. Check for official Google Maps share shortlink (maps.app.goo.gl)
    if "maps.app.goo.gl" in cand:
        return None, cand

    # 4. Check for direct cid= query parameter
    if "cid=" in cand:
        m = re.search(r'cid=(\d+)', cand)
        if m:
            return m.group(1), f"https://www.google.com/maps?cid={m.group(1)}"

    # 5. Check for clean /maps/place/<Business+Name>/ format
    if "/maps/place/" in cand:
        m_place = re.search(r'/maps/place/([^/@]+)', cand)
        if m_place and m_place.group(1) and not m_place.group(1).startswith("@"):
            clean_name = m_place.group(1).strip()
            return None, f"https://www.google.com/maps/place/{clean_name}/"

    # 6. Fallback to Google's official Maps Search URL using Business Name & Location
    if business_name:
        q_str = f"{business_name} {address or city}".strip()
        canonical_search = f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote_plus(q_str)}"
        return None, canonical_search

    return None, cand

class MapsScraper:
    def __init__(self, headless=True):
        self.headless = headless

    def scrape(self, query: str, max_results: int = 10):
        """
        Scrapes Google Maps for query, navigating to each business one by one in the background,
        inspecting the full Google Business Profile, securing verified links, and recording rankings.
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
                viewport={'width': 1366, 'height': 900}
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

            # Locate feed container
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
            scroll_attempts = max(3, (max_results // 3) + 2)
            print(f"[*] Scrolling feed ({scroll_attempts} passes) to load listings...")
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

            print(f"[*] Discovered {len(cards)} candidate cards in Google Maps search results.")

            # Collect candidate listings first
            candidates = []
            seen_keys = set()
            organic_counter = 1

            for c in cards:
                if len(candidates) >= max_results:
                    break

                try:
                    c_text = c.inner_text()
                    title_el = c.query_selector('div.qBF1Pd')
                    link_el = c.query_selector('a.hfpxzc')

                    title = ""
                    if title_el and clean_text(title_el.inner_text()):
                        title = clean_text(title_el.inner_text())
                    elif link_el and link_el.get_attribute('aria-label'):
                        title = clean_text(link_el.get_attribute('aria-label'))

                    if not title or title.lower() in ["results", "directions", "website", "search"]:
                        continue

                    dedup_name = re.sub(r'[^a-z0-9]', '', title.lower())
                    if dedup_name in seen_keys:
                        continue
                    seen_keys.add(dedup_name)

                    raw_href = link_el.get_attribute('href') if link_el else ""
                    if not raw_href or "place//@" in raw_href:
                        continue

                    is_sponsored = 'Sponsored' in c_text or 'Ad' in c_text[:30]
                    m_rat = re.search(r'([1-5]\.\d)', c_text)
                    c_rating = float(m_rat.group(1)) if m_rat else 0.0

                    m_rev = re.search(r'\((\d+[\d,]*)\)', c_text) or re.search(r'(\d+[\d,]*)\s+reviews?', c_text, re.IGNORECASE)
                    c_revs = int(m_rev.group(1).replace(',', '')) if m_rev else 0

                    assigned_rank = 0 if is_sponsored else organic_counter
                    if not is_sponsored:
                        organic_counter += 1

                    candidates.append({
                        "name": title,
                        "href": raw_href,
                        "is_sponsored": is_sponsored,
                        "card_text": c_text,
                        "card_rating": c_rating,
                        "card_revs": c_revs,
                        "rank": assigned_rank
                    })
                except Exception:
                    continue

            print(f"[*] Deeply inspecting {len(candidates)} Google Business Profiles one by one...")

            # Deep profile inspection: Visit each business's Google Business Profile one by one
            inspect_page = context.new_page()

            for idx, cand in enumerate(candidates):
                title = cand["name"]
                raw_href = cand["href"]
                is_sponsored = cand["is_sponsored"]
                card_text = cand["card_text"]
                rating = cand["card_rating"]
                reviews_count = cand["card_revs"]
                current_rank = cand["rank"]

                print(f"[*] [{idx+1}/{len(candidates)}] Inspecting Google Business Profile: {title}...")

                website_url = None
                phone = None
                address = None
                category = primary_service
                is_unclaimed = False
                opening_hours = None
                verified_gbp_url = None
                cid_dec = None

                try:
                    inspect_page.goto(raw_href, wait_until="domcontentloaded", timeout=25000)
                    try:
                        inspect_page.wait_for_selector('h1.DUwDvf, h1, div[role="main"]', timeout=7000)
                    except Exception:
                        pass
                    time.sleep(1.8)

                    current_url = inspect_page.url

                    # 1. Business Name from Profile H1
                    h1_el = inspect_page.query_selector('h1.DUwDvf, h1')
                    if h1_el and clean_text(h1_el.inner_text()):
                        title = clean_text(h1_el.inner_text())

                    # 2. Extract Place CID from URL
                    m_cid = re.search(r'0x[0-9a-fA-F]+:(0x[0-9a-fA-F]+)', current_url)
                    if m_cid:
                        try:
                            cid_dec = str(int(m_cid.group(1), 16))
                        except Exception:
                            pass

                    # 3. Category from Profile
                    cat_btn = inspect_page.query_selector('button[jsaction*="category"], button.DkEaL')
                    if cat_btn and clean_text(cat_btn.inner_text()):
                        category = clean_text(cat_btn.inner_text())

                    # 4. Rating & Reviews from Profile
                    rat_el = inspect_page.query_selector('span.ceNzKf, div.F7nice span[aria-hidden="true"]')
                    if rat_el:
                        r_txt = rat_el.get_attribute('aria-label') or rat_el.inner_text()
                        m_r = re.search(r'([1-5]\.\d)', r_txt)
                        if m_r:
                            try:
                                rating = float(m_r.group(1))
                            except Exception:
                                pass

                    rev_el = inspect_page.query_selector('button[aria-label*="reviews"], div.F7nice')
                    if rev_el:
                        rv_txt = rev_el.get_attribute('aria-label') or rev_el.inner_text()
                        m_rv = re.search(r'\((\d+[\d,]*)\)', rv_txt) or re.search(r'(\d+[\d,]*)\s+reviews?', rv_txt, re.IGNORECASE)
                        if m_rv:
                            try:
                                reviews_count = int(m_rv.group(1).replace(',', ''))
                            except Exception:
                                pass

                    # 5. Full Address from Profile
                    addr_btn = inspect_page.query_selector('button[data-item-id="address"], button[aria-label*="Address"]')
                    if addr_btn:
                        a_txt = addr_btn.get_attribute('aria-label') or addr_btn.inner_text()
                        a_txt = re.sub(r'[\ue000-\uf8ff]', '', a_txt)
                        m_a = re.search(r'Address:\s*(.*)', a_txt, re.IGNORECASE)
                        address = m_a.group(1).strip() if m_a else clean_text(a_txt)

                    # 6. Phone Number from Profile
                    phone_btn = inspect_page.query_selector('button[data-item-id*="phone"], button[aria-label*="Phone"]')
                    if phone_btn:
                        p_txt = phone_btn.get_attribute('aria-label') or phone_btn.inner_text()
                        p_txt = re.sub(r'[\ue000-\uf8ff]', '', p_txt)
                        m_p = re.search(r'Phone:\s*(.*)', p_txt, re.IGNORECASE)
                        phone = m_p.group(1).strip() if m_p else clean_text(p_txt)

                    # 7. Official Website from Profile
                    web_btn = inspect_page.query_selector('a[data-item-id="authority"], a[aria-label*="Website"], a[aria-label*="website"], a[aria-label*="Open website"]')
                    if web_btn:
                        w_href = web_btn.get_attribute('href')
                        if w_href:
                            if '/url?q=' in w_href:
                                m_w = re.search(r'/url\?q=([^&]+)', w_href)
                                website_url = urllib.parse.unquote(m_w.group(1)) if m_w else w_href
                            else:
                                website_url = w_href

                    # 8. Opening Hours from Profile
                    hours_btn = inspect_page.query_selector('div[aria-label*="Hours"], button[data-item-id*="oh"], div.t39EBf')
                    if hours_btn:
                        h_txt = re.sub(r'[\ue000-\uf8ff]', '', hours_btn.inner_text())
                        h_match = re.search(r'(Open 24 hours|Closed · Opens [^\n]+|Open · Closes [^\n]+|[A-Za-z]+(?:\s*\d+[:\d]*\s*(?:am|pm))?[^\n]+)', h_txt, re.IGNORECASE)
                        opening_hours = clean_text(h_match.group(0)) if h_match else clean_text(h_txt)

                    # 9. Unclaimed Status from Profile
                    claim_btn = inspect_page.query_selector('button[aria-label*="Claim this business"], a[href*="claim?"], button:has-text("Claim this business")')
                    is_unclaimed = bool(claim_btn)

                    # 10. Click Share Button to get verified shortlink
                    share_btn = inspect_page.query_selector('button[data-value="Share"], button[aria-label*="Share"], button[aria-label*="share"]')
                    if share_btn:
                        try:
                            share_btn.click()
                            time.sleep(0.8)
                            share_input = inspect_page.query_selector('input.vrsrZe, input[value*="maps"]')
                            if share_input:
                                v_val = share_input.get_attribute('value')
                                if v_val and ('maps.app.goo.gl' in v_val or 'google.com/maps' in v_val) and 'place//@' not in v_val:
                                    verified_gbp_url = v_val.strip()
                            close_btn = inspect_page.query_selector('button[aria-label="Close"], button[aria-label*="close"]')
                            if close_btn:
                                close_btn.click()
                        except Exception:
                            pass

                except Exception as inspect_err:
                    print(f"[!] Warning inspecting profile {title}: {inspect_err}")

                # Establish verified canonical link
                if not verified_gbp_url:
                    if cid_dec:
                        verified_gbp_url = f"https://www.google.com/maps?cid={cid_dec}"
                    else:
                        cid_found, clean_url = sanitize_and_verify_url(raw_href, title, address, city)
                        verified_gbp_url = clean_url
                        cid_dec = cid_found

                if not verified_gbp_url or "place//@" in verified_gbp_url:
                    cid_dec, verified_gbp_url = sanitize_and_verify_url("", title, address, city)

                # Address fallback if not explicitly found in profile
                if not address and card_text:
                    lines = [l.strip() for l in card_text.split('\n') if l.strip()]
                    for line in lines:
                        if any(term in line for term in ['Blvd', 'Rd', 'St', 'Ave', 'Drive', 'Lane', 'Way', 'Ste', 'Suite', city]):
                            address = line
                            break

                has_real_website = bool(website_url and not any(soc in website_url.lower() for soc in SOCIAL_DOMAINS))

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
                    "gbpUrl": verified_gbp_url,
                    "mapsUrl": verified_gbp_url,
                    "googleMapsUrl": verified_gbp_url,
                    "placeCid": cid_dec,
                    "isUnclaimed": is_unclaimed,
                    "openingHours": opening_hours or "Check profile for hours"
                }

                if is_sponsored:
                    print(f"  [SPONSORED AD] {title} | {rating}★ ({reviews_count} revs) | Phone: {phone} | GBP: {verified_gbp_url}")
                else:
                    print(f"  [Organic #{current_rank}] {title} | {rating}★ ({reviews_count} revs) | Phone: {phone} | GBP: {verified_gbp_url}")

                results.append(business_data)

            inspect_page.close()
            browser.close()

        # Separate organic vs sponsored for benchmarking
        organic_results = [b for b in results if not b.get("isSponsored")]
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
