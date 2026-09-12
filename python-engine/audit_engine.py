#!/usr/bin/env python3
"""
audit_engine.py - Local Business Ranking, Website & GMB Audit Engine
Analyzes rank positioning, computes gap against Top 3 competitors, audits website & local presence,
and generates a realistic timeline (days) and full step-by-step action plan to reach the Top 3.
"""

import re
import urllib.parse
import requests
from bs4 import BeautifulSoup
import warnings
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
warnings.filterwarnings('ignore')

def inspect_website(url: str, timeout: int = 6):
    """
    Fast technical inspection of business website:
    - SSL check
    - Title & Meta description
    - Mobile viewport
    - Local SEO signals
    - Lead capture elements (forms, booking widgets, click-to-call)
    """
    if not url:
        return {
            "hasWebsite": False,
            "status": "No Website Linked",
            "ssl": False,
            "title": "",
            "metaDescription": "",
            "hasLeadCapture": False,
            "isMobileResponsive": False,
            "findings": ["No official website linked to Google Business Profile."]
        }

    try:
        # Standardize URL
        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url

        resp = requests.get(
            url, 
            timeout=timeout, 
            headers={"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"},
            allow_redirects=True,
            verify=False
        )
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # 1. SSL
        is_ssl = resp.url.startswith("https://")
        
        # 2. Title & Meta
        title_el = soup.find('title')
        title = title_el.get_text().strip() if title_el else ""
        
        meta_desc_el = soup.find('meta', attrs={"name": re.compile(r'description', re.I)})
        meta_desc = meta_desc_el.get('content', '').strip() if meta_desc_el else ""
        
        # 3. Mobile responsiveness
        viewport = soup.find('meta', attrs={"name": "viewport"})
        is_mobile = bool(viewport)
        
        # 4. Lead Capture & Automation signals
        has_form = bool(soup.find('form'))
        has_phone_link = bool(soup.find('a', href=re.compile(r'^tel:', re.I)))
        has_booking_widget = bool(re.search(r'(calendly|acuity|vagaro|mindbody|square|jane\.app|schedul|booknow|appointment)', resp.text, re.I))
        has_schema = bool(soup.find('script', type="application/ld+json"))
        
        has_lead_capture = has_form or has_booking_widget

        findings = []
        if not is_ssl:
            findings.append("Missing SSL Certificate (Site flagged as Not Secure).")
        if not title:
            findings.append("Missing HTML Page Title.")
        elif len(title) < 20:
            findings.append(f"Weak Title tag ('{title}') lacking target localized keywords.")
        if not meta_desc:
            findings.append("Missing meta description tag for search snippet CTR.")
        if not is_mobile:
            findings.append("Missing mobile viewport configuration (poor mobile UX).")
        if not has_schema:
            findings.append("Missing LocalBusiness JSON-LD structured data schema.")
        if not has_lead_capture:
            findings.append("Lacks instant lead-capture forms or automated booking calendars.")
        if not has_phone_link:
            findings.append("Lacks tap-to-call mobile buttons for instant phone conversion.")

        if not findings:
            findings.append("Website foundation is operational; lacks aggressive local conversion optimization.")

        return {
            "hasWebsite": True,
            "url": resp.url,
            "statusCode": resp.status_code,
            "ssl": is_ssl,
            "title": title,
            "metaDescription": meta_desc,
            "isMobileResponsive": is_mobile,
            "hasLeadCapture": has_lead_capture,
            "hasBookingWidget": has_booking_widget,
            "hasSchema": has_schema,
            "findings": findings
        }

    except Exception as e:
        return {
            "hasWebsite": True,
            "url": url,
            "error": str(e),
            "status": "Inaccessible or Slow Loading",
            "ssl": url.startswith("https://"),
            "findings": [f"Website failed to load cleanly within {timeout}s: server timeout or SSL handshake issue."]
        }

def calculate_top3_plan(business: dict, benchmark: dict):
    """
    Computes ranking gap, missing factors, practical timeline (days), and 3-phase action plan.
    """
    rank = business.get("currentRank", 10)
    reviews = business.get("reviewsCount", 0)
    rating = business.get("rating", 0.0)
    has_website = business.get("hasRealWebsite", False)
    category = business.get("category") or business.get("primaryService") or "Local Business"
    city = business.get("city", "Local Area")

    is_unclaimed = business.get("isUnclaimed", False)
    top3_avg_reviews = benchmark.get("top3AvgReviews", 150)
    top3_avg_rating = benchmark.get("top3AvgRating", 4.7)

    review_deficit = max(0, int(top3_avg_reviews - reviews))
    rating_deficit = round(max(0.0, top3_avg_rating - rating), 1)

    # 1. Determine "What Lacks"
    lacks = []
    if is_unclaimed:
        lacks.append("Profile Ownership Void: Google Business Profile is UNCLAIMED — vulnerable to edits and heavily penalized in 3-pack trust.")

    if rank > 3:
        lacks.append(f"Rank Deficit: Currently sitting at #{rank} — outside Google's high-converting 3-Pack.")
    elif rank == 0:
        lacks.append("Ad Reliance: Currently paying for Sponsored Google Ads rather than holding permanent organic 3-pack real estate.")
        
    if review_deficit > 0:
        lacks.append(f"Review Volume Deficit: Trails Top 3 competitors by ~{review_deficit} customer reviews.")
    else:
        lacks.append("Review Velocity Deficit: Sufficient total reviews, but lacks fresh monthly review velocity.")

    if rating < 4.5 and rating > 0:
        lacks.append(f"Star Rating Deficit: {rating} ★ vs Top 3 average of {top3_avg_rating} ★.")

    if not has_website:
        lacks.append("Domain Authority Penalty: No dedicated website connected to Google Business Profile (major ranking anchor missing).")
        lacks.append("Lead Conversion Void: Zero automated digital capture for inbound local prospects.")
    else:
        lacks.append("Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.")
        lacks.append("Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries.")

    # 2. Calculate Practical Realistic Timeline (Days to achieve Top 3)
    if not has_website or review_deficit > 100:
        days = 90
        p1_end = 15
        p2_start = 16
        p2_end = 45
        p3_start = 46
        timeline_label = "75-90 Days (Full Profile Rebuild & Review Acceleration)"
    elif review_deficit > 40:
        days = 60
        p1_end = 15
        p2_start = 16
        p2_end = 35
        p3_start = 36
        timeline_label = "45-60 Days (Citation Sync & Review Velocity Push)"
    elif rank > 3:
        days = 45
        p1_end = 15
        p2_start = 16
        p2_end = 30
        p3_start = 31
        timeline_label = "30-45 Days (Category Tuning, Schema & Review Velocity)"
    else:
        days = 30
        p1_end = 10
        p2_start = 11
        p2_end = 20
        p3_start = 21
        timeline_label = "15-30 Days (Rank Retention & Conversion Maximization)"

    # 3. Step-by-Step Action Plan to Reach Top 3
    action_plan = {
        "phase1": {
            "name": f"Phase 1: GMB Foundation & Core Signals (Days 1–{p1_end})",
            "steps": [
                f"Audit and lock in primary GMB category to '{category}' and add 4-6 relevant secondary categories.",
                "Inject high-intent local keywords and geo-tags into business description and service menu.",
                "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
                "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work."
            ]
        },
        "phase2": {
            "name": f"Phase 2: Local Authority & On-Page Dominance (Days {p2_start}–{p2_end})",
            "steps": [
                "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
                f"{'Deploy a high-speed mobile landing page with local schema.' if not has_website else 'Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.'}",
                "Embed official Google Maps driving directions onto the website contact section.",
                "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high."
            ]
        },
        "phase3": {
            "name": f"Phase 3: Automated Lead-Capture & 3-Pack Domination (Days {p3_start}–{days})",
            "steps": [
                "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
                "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
                "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
                "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius."
            ]
        }
    }

    return {
        "currentRank": rank,
        "reviewDeficit": review_deficit,
        "ratingDeficit": rating_deficit,
        "daysToTop3": days,
        "practicalTimeline": timeline_label,
        "whatLacks": lacks,
        "actionPlan": action_plan
    }

def enhance_plan_with_ai(business: dict, benchmark: dict, heuristic_plan: dict, ai_key: str) -> dict:
    """Uses Gemini 3.8 to generate a hyper-personalized action plan and audit findings."""
    biz_name = business.get("businessName", "This business")
    rank = business.get("currentRank", "unknown")
    category = business.get("category", "business")
    
    prompt = f"""
You are a top-tier local SEO expert. Analyze this business and provide a realistic, 3-phase action plan to get them into the Google Maps Top 3.
Business Name: {biz_name}
Current Rank: #{rank}
Category: {category}
Reviews: {business.get('reviewsCount', 0)} (Top 3 Avg: {benchmark.get('top3AvgReviews', 0)})
Rating: {business.get('rating', 0)} (Top 3 Avg: {benchmark.get('top3AvgRating', 0)})

Return ONLY valid JSON in this exact structure:
{{
  "whatLacks": ["bullet 1 about what they are missing", "bullet 2"],
  "actionPlan": {{
    "phase1": {{ "name": "Phase 1: ...", "steps": ["step 1", "step 2"] }},
    "phase2": {{ "name": "Phase 2: ...", "steps": ["step 1", "step 2"] }},
    "phase3": {{ "name": "Phase 3: ...", "steps": ["step 1", "step 2"] }}
  }}
}}
"""
    try:
        import json
        headers = {
            "Authorization": f"Bearer {ai_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "gemini-3.8-flash",
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"}
        }
        resp = requests.post("https://api.maxplus-ai.cc/gemini-full/v1/chat/completions", headers=headers, json=payload, timeout=30)
        if resp.ok:
            data = resp.json()
            content = data["choices"][0]["message"]["content"]
            # Clean up potential markdown formatting
            if content.startswith("```json"):
                content = content[7:-3]
            ai_data = json.loads(content)
            
            heuristic_plan["whatLacks"] = ai_data.get("whatLacks", heuristic_plan["whatLacks"])
            heuristic_plan["actionPlan"] = ai_data.get("actionPlan", heuristic_plan["actionPlan"])
            print(f"[*] Gemini AI successfully enhanced audit plan for {biz_name}")
    except Exception as e:
        print(f"[!] Gemini AI plan enhancement failed: {e}")
        
    return heuristic_plan

def run_audit(business: dict, benchmark: dict, ai_key: str = None, use_ai: bool = False):
    """
    Runs full combined audit on business data:
    1. Technical Website Audit (if website exists)
    2. GMB & Top 3 Gap Analysis
    3. Practical Timeline & Plan Generation
    """
    web_audit = inspect_website(business.get("website"))
    plan = calculate_top3_plan(business, benchmark)
    
    if use_ai and ai_key:
        plan = enhance_plan_with_ai(business, benchmark, plan, ai_key)

    return {
        **business,
        "websiteAudit": web_audit,
        "auditPlan": plan
    }

if __name__ == "__main__":
    sample_b = {
        "currentRank": 8,
        "businessName": "Apex Dental",
        "rating": 4.2,
        "reviewsCount": 24,
        "category": "Emergency Dental Service",
        "city": "Austin",
        "website": "https://example.com",
        "hasRealWebsite": True
    }
    sample_bench = {
        "top3AvgReviews": 180,
        "top3AvgRating": 4.8
    }
    result = run_audit(sample_b, sample_bench)
    print("Timeline:", result['auditPlan']['practicalTimeline'])
    print("What lacks:", result['auditPlan']['whatLacks'])
