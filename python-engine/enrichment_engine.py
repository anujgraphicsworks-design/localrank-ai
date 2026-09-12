#!/usr/bin/env python3
"""
enrichment_engine.py - Contact Details & Social Media Enrichment Engine
Finds emails, Facebook, Instagram, LinkedIn, and discovers owner/contact first name.
"""

import re
import urllib.parse
import requests
from bs4 import BeautifulSoup

import warnings
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
warnings.filterwarnings('ignore')

IGNORED_EMAILS = [
    'sentry.io', 'wixpress.com', 'wordpress.org', 'example.com', 
    'domain.com', 'yourdomain.com', 'email.com', 'test.com', 'wght@'
]

IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.css', '.js', '.woff', '.woff2')

def clean_email(email: str):
    email = email.strip().lower()
    if '..' in email or '@' not in email:
        return None
    if any(ext in email for ext in IMAGE_EXTENSIONS):
        return None
    for ignored in IGNORED_EMAILS:
        if ignored in email:
            return None
    # Must have a standard alpha top level domain (e.g. .com, .org, .co, .net, .dental)
    if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$', email):
        return None
    return email

def extract_first_name_from_text_or_name(business_name: str, text: str = ""):
    """
    Attempts to discover owner/founder/doctor first name:
    1. Checks business name (e.g. "Dave's Plumbing", "Dr. Michael Smith Dental", "Sarah Jane Studio")
    2. Checks page text for "Meet Dr. [Name]", "Founded by [Name]", "Owner: [Name]"
    3. Fallback to clean title or "there"
    """
    # 1. From Business Name
    # Dr. [First] [Last]
    dr_match = re.search(r'\b(?:Dr|Doctor)\.?\s+([A-Z][a-z]+)', business_name, re.IGNORECASE)
    if dr_match:
        return dr_match.group(1).capitalize()

    # [Name]'s Business (e.g., Dave's Apex Dental)
    possessive_match = re.search(r'^([A-Z][a-z]+)[\'’]s\b', business_name)
    if possessive_match:
        name = possessive_match.group(1)
        # ensure not common non-name words like "World's", "City's", "America's"
        if name.lower() not in ["world", "city", "america", "nation", "state", "queen", "king", "nature"]:
            return name.capitalize()

    # 2. From page text if available
    if text:
        # "Meet Dr. John" or "Meet John"
        meet_match = re.search(r'\bMeet\s+(?:Dr\.?\s+)?([A-Z][a-z]+)\b', text)
        if meet_match:
            candidate = meet_match.group(1)
            if candidate.lower() not in ["our", "the", "us", "team", "your"]:
                return candidate.capitalize()

        # "Founded by [First] [Last]"
        found_match = re.search(r'\b(?:founded|owned|started)\s+by\s+([A-Z][a-z]+)\b', text, re.IGNORECASE)
        if found_match:
            return found_match.group(1).capitalize()

        # "Owner: [First]" or "Founder: [First]"
        owner_match = re.search(r'\b(?:Owner|Founder|Lead Stylist|Head Dentist|Principal):\s*([A-Z][a-z]+)\b', text, re.IGNORECASE)
        if owner_match:
            return owner_match.group(1).capitalize()

    # Fallback to "there" for natural phrasing (e.g. "Hey there," / "there, check Apex Dental...")
    # Or first word if it looks like a person name
    return "there"

class EnrichmentEngine:
    def __init__(self, timeout: int = 5):
        self.timeout = timeout
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        })

    def enrich_website(self, website_url: str, business_name: str = ""):
        """
        Crawls website homepage and contact page to extract emails, social profiles, and names.
        """
        if not website_url:
            return {
                "emails": [],
                "facebook": None,
                "instagram": None,
                "linkedin": None,
                "twitter": None,
                "firstName": extract_first_name_from_text_or_name(business_name, "")
            }

        # Standardize URL
        if not website_url.startswith("http://") and not website_url.startswith("https://"):
            website_url = "https://" + website_url

        emails_found = set()
        fb_url = None
        ig_url = None
        li_url = None
        tw_url = None
        extracted_text = ""

        # Pages to inspect: Homepage, /contact, /about
        base_domain = urllib.parse.urlparse(website_url).netloc
        urls_to_crawl = [website_url]

        # Add potential contact & about subpaths
        parsed = urllib.parse.urlparse(website_url)
        base_origin = f"{parsed.scheme}://{parsed.netloc}"
        for path in ["/contact", "/contact-us", "/about", "/about-us", "/our-team"]:
            urls_to_crawl.append(base_origin + path)

        for u in urls_to_crawl[:3]: # Keep it fast: top 3 candidate pages
            try:
                resp = self.session.get(u, timeout=self.timeout, verify=False)
                if resp.status_code != 200:
                    continue

                html = resp.text
                soup = BeautifulSoup(html, 'html.parser')
                extracted_text += " " + soup.get_text()

                # 1. Look for mailto links
                for a in soup.find_all('a', href=True):
                    href = a['href'].strip()
                    if href.startswith('mailto:'):
                        clean = clean_email(href.replace('mailto:', '').split('?')[0])
                        if clean:
                            emails_found.add(clean)

                    # Social links
                    href_lower = href.lower()
                    if 'facebook.com/' in href_lower and not fb_url:
                        if not any(x in href_lower for x in ['sharer', 'share', 'tr?id=']):
                            fb_url = href
                    elif 'instagram.com/' in href_lower and not ig_url:
                        if not any(x in href_lower for x in ['p/', 'reel/']):
                            ig_url = href
                    elif 'linkedin.com/' in href_lower and not li_url:
                        li_url = href
                    elif ('twitter.com/' in href_lower or 'x.com/' in href_lower) and not tw_url:
                        tw_url = href

                # 2. Regex email scan in text
                raw_emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', html)
                for em in raw_emails:
                    clean = clean_email(em)
                    if clean:
                        emails_found.add(clean)

            except Exception:
                continue

        first_name = extract_first_name_from_text_or_name(business_name, extracted_text)

        return {
            "emails": list(emails_found),
            "primaryEmail": list(emails_found)[0] if emails_found else None,
            "facebook": fb_url,
            "instagram": ig_url,
            "linkedin": li_url,
            "twitter": tw_url,
            "firstName": first_name
        }

    def search_enrichment_fallback(self, business_name: str, city: str):
        """
        Fallback web search to find Facebook/Instagram or email if website was absent or had no socials.
        Uses DuckDuckGo HTML endpoint.
        """
        try:
            query = f"{business_name} {city} facebook instagram"
            url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
            resp = self.session.get(url, timeout=self.timeout)
            
            fb = None
            ig = None
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                for a in soup.find_all('a', href=True):
                    h = a['href']
                    if 'facebook.com/' in h and not fb:
                        m = re.search(r'facebook\.com/([a-zA-Z0-9_.-]+)', h)
                        if m and m.group(1) not in ['sharer', 'help']:
                            fb = f"https://www.facebook.com/{m.group(1)}"
                    if 'instagram.com/' in h and not ig:
                        m = re.search(r'instagram\.com/([a-zA-Z0-9_.-]+)', h)
                        if m and m.group(1) not in ['p', 'reel']:
                            ig = f"https://www.instagram.com/{m.group(1)}"
                            
            return {"facebook": fb, "instagram": ig}
        except Exception:
            return {"facebook": None, "instagram": None}

    def enrich(self, business: dict):
        """
        Performs complete enrichment on a business record.
        """
        web_url = business.get("website")
        name = business.get("businessName", "")
        city = business.get("city", "")

        enriched = self.enrich_website(web_url, name)

        # If socials missing, attempt web search discovery
        if not enriched.get("facebook") or not enriched.get("instagram"):
            fallback_socials = self.search_enrichment_fallback(name, city)
            if not enriched.get("facebook") and fallback_socials.get("facebook"):
                enriched["facebook"] = fallback_socials["facebook"]
            if not enriched.get("instagram") and fallback_socials.get("instagram"):
                enriched["instagram"] = fallback_socials["instagram"]

        return {
            **business,
            "enrichment": enriched
        }

if __name__ == "__main__":
    enricher = EnrichmentEngine()
    sample = {
        "businessName": "Apex Dental",
        "city": "Austin",
        "website": "https://www.pepsico.com"
    }
    res = enricher.enrich(sample)
    print("Enrichment test:", res['enrichment'])
