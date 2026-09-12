#!/usr/bin/env python3
"""
email_generator.py - High-Converting Cold Email Synthesizer
Generates personalized cold emails under 100 words strictly matching the user's proven template.
Works for every business whether email was found or not.
"""

import re

EMAIL_TEMPLATE_SUBJECT = "{firstName}, check {businessName} on Google rn"
EMAIL_TEMPLATE_SUBJECT_FALLBACK = "Quick check on {businessName} on Google rn"

EMAIL_TEMPLATE_BODY = """Hey {firstName},

Came across {businessName} while searching for {primaryService} in {city} last week.

While looking into it, I noticed you're sitting at #{currentRank} on Google Maps, meaning the top 3 spots are taking virtually all the inbound calls, clicks, and bookings.

Doing the math, being outside the 3-pack is probably costing you dozens of high-value leads every single month.

So, I put together an action plan to get {businessName} into the Top 3 on Google Maps, plus built out automated lead-capture workflows so you instantly lock in leads and stop wasting hours on repetitive follow-ups and manual tasks.

It's yours. Already mapped out & ready to go.

Reply and I'll hand it over.

Best,

{yourName}"""

# Ultra-concise version strictly guaranteed under 90 words
CONCISE_TEMPLATE_BODY = """Hey {firstName},

Came across {businessName} while searching for {primaryService} in {city}.

I noticed you're sitting at #{currentRank} on Google Maps — meaning the top 3 spots take virtually all inbound calls and bookings.

Being outside the 3-pack likely costs you dozens of high-value leads every month.

I put together an action plan to get {businessName} into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.

Already mapped out. Reply and I'll hand it over.

Best,

{yourName}"""

def count_words(text: str) -> int:
    """Counts words in text excluding empty whitespace."""
    tokens = re.findall(r'\b[\w\'-]+\b', text)
    return len(tokens)

def generate_cold_email(business: dict, your_name: str = "Anuj", strict_under_100: bool = True, ai_key: str = None, use_ai: bool = False):
    """
    Generates personalized cold email for business.
    Returns:
        dict:
            - subject: str
            - body: str
            - wordCount: int
            - recipientEmail: str or None
            - recipientChannel: str ('Email', 'Instagram DM', 'Facebook Messenger', 'Contact Form')
            - variablesUsed: dict
    """
    enrichment = business.get("enrichment", {})
    first_name_candidate = enrichment.get("firstName") or business.get("firstName") or "there"
    
    # Capitalize cleanly
    first_name = first_name_candidate.strip().capitalize() if first_name_candidate else "there"
    
    business_name = business.get("businessName", "your business").strip()
    primary_service = business.get("primaryService", "services").strip()
    city = business.get("city", "your area").strip()
    current_rank = business.get("currentRank", 8)
    
    # If business is rank 1-3, adjust rank text slightly or keep exact #1/2/3
    rank_str = str(current_rank)

    # Clean subject line
    if first_name.lower() in ["there", "team", ""]:
        subject = f"Check {business_name} on Google rn"
        first_name_in_body = "there"
    else:
        subject = f"{first_name}, check {business_name} on Google rn"
        first_name_in_body = first_name

    variables = {
        "firstName": first_name_in_body,
        "businessName": business_name,
        "primaryService": primary_service,
        "city": city,
        "currentRank": rank_str,
        "yourName": your_name
    }

    # Format template
    body = EMAIL_TEMPLATE_BODY.format(**variables)
    word_count = count_words(body)

    # If strict_under_100 is requested and standard body is > 100 words, use the concise version
    if strict_under_100 and word_count > 100:
        concise_body = CONCISE_TEMPLATE_BODY.format(**variables)
        concise_words = count_words(concise_body)
        if concise_words < word_count:
            body = concise_body
            word_count = concise_words

    # Identify best outreach channel
    primary_email = enrichment.get("primaryEmail")
    ig = enrichment.get("instagram")
    fb = enrichment.get("facebook")
    has_web = business.get("hasRealWebsite")

    if primary_email:
        channel = "Email"
    elif ig:
        channel = "Instagram DM"
    elif fb:
        channel = "Facebook Messenger"
    elif has_web:
        channel = "Website Contact Form"
    else:
        channel = "Direct Outreach / SMS"

    biz_name = business_name
    first_name_clean = first_name
    rank = current_rank
    service = primary_service
    final_subject = subject
    final_body = body
    is_fallback = True

    if use_ai and ai_key:
        try:
            import requests
            import json
            prompt = f"""
You are an expert B2B cold email copywriter. Write a highly converting cold email to this business owner.
The email MUST be UNDER 100 words. Keep it punchy, direct, and conversational.
Do not use cliches. Provide a clear hook, value proposition, and a soft call to action.

Business Name: {biz_name}
First Name: {first_name_clean}
Current Rank: #{rank}
Service: {service}
City: {city}
Sender Name: {your_name}
What they lack: {business.get('auditPlan', {}).get('whatLacks', [])}

Return ONLY valid JSON in this exact structure:
{{
  "subject": "The email subject line",
  "body": "The full email body"
}}
"""
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
                if content.startswith("```json"):
                    content = content[7:-3]
                ai_data = json.loads(content)
                
                final_subject = ai_data.get("subject", final_subject)
                final_body = ai_data.get("body", final_body)
                is_fallback = False
                print(f"[*] Gemini AI successfully generated cold email for {biz_name}")
        except Exception as e:
            print(f"[!] Gemini AI email generation failed: {e}")

    word_count = count_words(final_body)

    return {
        "subject": final_subject,
        "body": final_body,
        "wordCount": word_count,
        "isUnder100Words": word_count < 100,
        "isFallback": is_fallback,
        "recipientEmail": primary_email,
        "contactChannel": channel,
        "variables": variables
    }

if __name__ == "__main__":
    sample = {
        "currentRank": 8,
        "businessName": "Apex Dental",
        "primaryService": "emergency dentists",
        "city": "Austin",
        "firstName": "Dave",
        "enrichment": {"firstName": "Dave", "primaryEmail": "info@apexdental.com"}
    }
    email_data = generate_cold_email(sample, "Anuj")
    print("Subject:", email_data['subject'])
    print("Words:", email_data['wordCount'])
    print("\nBody:\n" + email_data['body'])
