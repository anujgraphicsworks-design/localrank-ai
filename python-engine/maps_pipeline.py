#!/usr/bin/env python3
"""
maps_pipeline.py - Master Orchestrator Pipeline
Connects Google Maps scraping, rank analysis, website audit, contact enrichment,
cold email generation, and Cloud Firestore/local synchronization into a unified workflow.
"""

import os
import sys
import json
import csv
import time
import argparse
import urllib.request
import urllib.parse
from datetime import datetime

# Local pipeline modules
from maps_scraper import MapsScraper, extract_city_and_service
from audit_engine import run_audit
from enrichment_engine import EnrichmentEngine
from email_generator import generate_cold_email

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def py_to_firestore(val):
    if val is None:
        return {"nullValue": None}
    elif isinstance(val, bool):
        return {"booleanValue": val}
    elif isinstance(val, int):
        return {"integerValue": str(val)}
    elif isinstance(val, float):
        return {"doubleValue": val}
    elif isinstance(val, str):
        return {"stringValue": val}
    elif isinstance(val, list):
        return {"arrayValue": {"values": [py_to_firestore(x) for x in val]}}
    elif isinstance(val, dict):
        return {"mapValue": {"fields": {k: py_to_firestore(v) for k, v in val.items()}}}
    return {"stringValue": str(val)}

class MapsPipeline:
    def __init__(self, headless: bool = True):
        self.scraper = MapsScraper(headless=headless)
        self.enricher = EnrichmentEngine(timeout=5)

    def execute(self, query: str, max_results: int = 10, sender_name: str = "Anuj", progress_callback=None):
        """
        Executes complete pipeline:
        Stage 1: Google Maps Scraping & Ranking (Inspecting profiles one by one in background)
        Stage 2: Benchmarking & Local 3-Pack Gap Analysis
        Stage 3: Technical Website & Conversion Audit
        Stage 4: Deep Contact & Social Enrichment
        Stage 5: Cold Email Generation (under 100 words)
        Stage 6: Cloud Firestore & Local Storage Sync
        """
        def update_progress(stage_num, stage_name, message, percent):
            if progress_callback:
                progress_callback({
                    "stage": stage_num,
                    "stageName": stage_name,
                    "message": message,
                    "percent": percent
                })
            else:
                print(f"[{percent}%] Stage {stage_num} ({stage_name}): {message}")

        update_progress(1, "Google Maps Scraping", f"Scraping Google Maps for '{query}'...", 10)

        # 1. Scrape Maps one by one
        maps_data = self.scraper.scrape(query, max_results=max_results)
        raw_businesses = maps_data.get("businesses", [])
        benchmark = maps_data.get("benchmark", {})
        total = len(raw_businesses)

        update_progress(2, "Ranking & Benchmark", f"Found {total} listings. Analyzing Top 3 3-Pack benchmark...", 30)

        processed_leads = []

        for idx, biz in enumerate(raw_businesses):
            curr_pct = 30 + int(((idx + 1) / max(1, total)) * 50)
            biz_name = biz.get("businessName")
            rank = biz.get("currentRank")

            update_progress(3, "Auditing & Enrichment", f"Processing #{rank}: {biz_name}...", curr_pct)

            # Stage 2 & 3: Audit Engine (Ranking gap, what lacks, timeline, 3-phase action plan, website check)
            audited = run_audit(biz, benchmark)

            # Stage 4: Contact & Social Enrichment (Emails, FB, IG, First Name)
            enriched = self.enricher.enrich(audited)

            # Stage 5: Cold Email Synthesis (Under 100 words, exact user template)
            email_data = generate_cold_email(enriched, your_name=sender_name, strict_under_100=True)
            enriched["coldEmail"] = email_data

            processed_leads.append(enriched)

        update_progress(4, "Database Sync", f"Syncing {len(processed_leads)} leads to Cloud Firestore & Local Storage...", 85)

        # Stage 6: Sync to Cloud Firestore & Local JSON
        self.sync_to_cloud_and_local(processed_leads, query, benchmark)

        update_progress(5, "Completed", f"Successfully audited, enriched & saved {len(processed_leads)} leads.", 100)

        result_payload = {
            "query": query,
            "city": maps_data.get("city"),
            "primaryService": maps_data.get("primaryService"),
            "senderName": sender_name,
            "timestamp": datetime.now().isoformat(),
            "benchmark": benchmark,
            "totalLeads": len(processed_leads),
            "leads": processed_leads
        }

        # Save to file
        slug = "".join(c if c.isalnum() else "_" for c in query.lower())[:35]
        ts = datetime.now().strftime("%Y%m%d_%H%M%S")
        json_path = os.path.join(OUTPUT_DIR, f"leads_{slug}_{ts}.json")
        csv_path = os.path.join(OUTPUT_DIR, f"leads_{slug}_{ts}.csv")

        result_payload["jsonFile"] = json_path
        result_payload["csvFile"] = csv_path

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(result_payload, f, indent=2, ensure_ascii=False)

        self.save_csv(processed_leads, csv_path)

        return result_payload

    def sync_to_cloud_and_local(self, leads: list, query: str, benchmark: dict):
        """
        Syncs processed leads into:
        1. Cloud Firestore: projects/localrank-ai-31e78/databases/(default)/documents/leads
        2. Local Next.js storage: localrank-ai/.data/leads.json
        """
        local_data_file = "/Users/anuj/.gemini/antigravity-ide/scratch/localrank-ai/.data/leads.json"
        
        existing_leads = []
        if os.path.exists(local_data_file):
            try:
                with open(local_data_file, "r", encoding="utf-8") as f:
                    existing_leads = json.load(f)
            except Exception:
                existing_leads = []

        synced_count = 0
        for l in leads:
            b_name = l.get("businessName", "Local Business")
            clean_b_slug = "".join(c for c in b_name.lower() if c.isalnum())[:16]
            lead_id = f"lead-scraped-{l.get('placeCid') or clean_b_slug}"
            enrich = l.get("enrichment", {})
            audit = l.get("auditPlan", {})
            cold = l.get("coldEmail", {})
            site_audit = l.get("websiteAudit", {})
            
            gbp_link = l.get("gbpUrl") or l.get("mapsUrl") or f"https://www.google.com/maps/search/?api=1&query={urllib.parse.quote_plus(b_name + ' ' + l.get('city', ''))}"

            formatted_lead = {
                "id": lead_id,
                "workspaceId": "ws-default",
                "isDemo": False,
                "businessName": b_name,
                "category": l.get("category", "Local Business"),
                "primaryService": l.get("primaryService", "Local Service"),
                "address": l.get("address", ""),
                "city": l.get("city", "Austin"),
                "state": "TX",
                "postalCode": "78704",
                "country": "USA",
                "googleMapsUrl": gbp_link,
                "placeCid": l.get("placeCid"),
                "isUnclaimed": bool(l.get("isUnclaimed")),
                "phone": l.get("phone"),
                "website": l.get("website"),
                "hasWebsite": bool(l.get("hasRealWebsite")),
                "rating": l.get("rating", 0.0),
                "reviewsCount": l.get("reviewsCount", 0),
                "businessStatus": "OPERATIONAL",
                "photosCount": 15,
                "currentRank": l.get("currentRank", 1),
                "whatLacks": audit.get("whatLacks", []),
                "actionPlan": {
                    "phase1": " | ".join(audit.get("actionPlan", {}).get("phase1", {}).get("steps", [])),
                    "phase2": " | ".join(audit.get("actionPlan", {}).get("phase2", {}).get("steps", [])),
                    "phase3": " | ".join(audit.get("actionPlan", {}).get("phase3", {}).get("steps", [])),
                    "timelineDays": audit.get("daysToTop3", 45),
                    "timelineSummary": audit.get("practicalTimeline", "30-45 Days")
                },
                "contact": {
                    "firstName": enrich.get("firstName") or "",
                    "primaryEmail": enrich.get("primaryEmail") or "",
                    "allEmails": enrich.get("emails", []),
                    "emailFound": bool(enrich.get("primaryEmail")),
                    "facebookUrl": enrich.get("facebook") or "",
                    "instagramUrl": enrich.get("instagram") or ""
                },
                "coldEmail": {
                    "subject": cold.get("subject", ""),
                    "body": cold.get("body", ""),
                    "wordCount": cold.get("wordCount", 0),
                    "recipientEmail": cold.get("recipientEmail") or enrich.get("primaryEmail") or ""
                },
                "leadStatus": "New",
                "createdAt": datetime.now().isoformat(),
                "updatedAt": datetime.now().isoformat()
            }

            # Update in local array
            idx = next((i for i, ex in enumerate(existing_leads) if ex.get("id") == lead_id or ex.get("businessName") == b_name), -1)
            if idx >= 0:
                existing_leads[idx] = formatted_lead
            else:
                existing_leads.insert(0, formatted_lead)

            # Sync to Cloud Firestore via REST
            try:
                fs_fields = {k: py_to_firestore(v) for k, v in formatted_lead.items()}
                fs_body = json.dumps({"fields": fs_fields}).encode("utf-8")
                url = f"https://firestore.googleapis.com/v1/projects/localrank-ai-31e78/databases/(default)/documents/leads/{lead_id}"
                req = urllib.request.Request(url, data=fs_body, method="PATCH", headers={"Content-Type": "application/json"})
                urllib.request.urlopen(req, timeout=5)
                synced_count += 1
            except Exception as e:
                print(f"[!] Warning on syncing lead {lead_id} to Firestore: {e}")

        # Save to local file
        try:
            os.makedirs(os.path.dirname(local_data_file), exist_ok=True)
            with open(local_data_file, "w", encoding="utf-8") as f:
                json.dump(existing_leads, f, indent=2, ensure_ascii=False)
            print(f"[*] Saved {len(existing_leads)} leads to local storage ({local_data_file}).")
        except Exception as e:
            print(f"[!] Warning saving to local leads.json: {e}")

        print(f"[*] Successfully synced {synced_count} leads to Cloud Firestore.")

    def save_csv(self, leads: list, csv_path: str):
        headers = [
            "Rank", "Business Name", "Google Business Profile URL", "Place CID", "Is Unclaimed GBP",
            "Rating", "Reviews", "Category", "City", "Phone", "Website", "Has Real Website",
            "Primary Email", "All Emails", "Facebook", "Instagram", "Owner First Name",
            "Contact Channel", "Top 3 Practical Timeline", "Review Deficit",
            "What Lacks", "Phase 1 Plan", "Cold Email Subject", "Cold Email Body", "Word Count"
        ]

        with open(csv_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(headers)

            for lead in leads:
                enrich = lead.get("enrichment", {})
                audit = lead.get("auditPlan", {})
                email = lead.get("coldEmail", {})
                plan = audit.get("actionPlan", {})

                phase1_str = " | ".join(plan.get("phase1", {}).get("steps", []))
                lacks_str = " | ".join(audit.get("whatLacks", []))
                emails_str = "; ".join(enrich.get("emails", []))

                writer.writerow([
                    lead.get("currentRank"),
                    lead.get("businessName"),
                    lead.get("gbpUrl") or lead.get("mapsUrl", ""),
                    lead.get("placeCid", ""),
                    "Yes (Unclaimed!)" if lead.get("isUnclaimed") else "No (Claimed)",
                    lead.get("rating"),
                    lead.get("reviewsCount"),
                    lead.get("category"),
                    lead.get("city"),
                    lead.get("phone"),
                    lead.get("website", ""),
                    "Yes" if lead.get("hasRealWebsite") else "No",
                    enrich.get("primaryEmail", ""),
                    emails_str,
                    enrich.get("facebook", ""),
                    enrich.get("instagram", ""),
                    enrich.get("firstName", ""),
                    email.get("contactChannel", ""),
                    audit.get("practicalTimeline", ""),
                    audit.get("reviewDeficit", 0),
                    lacks_str,
                    phase1_str,
                    email.get("subject", ""),
                    email.get("body", ""),
                    email.get("wordCount", 0)
                ])

def main():
    parser = argparse.ArgumentParser(description="Google Maps Local SEO Audit & Cold Outreach Pipeline")
    parser.add_argument("query", nargs="?", default="emergency dentists in Austin", help="Search query (e.g. 'emergency dentists in Austin')")
    parser.add_argument("--limit", type=int, default=10, help="Max results to scrape")
    parser.add_argument("--sender", type=str, default="Anuj", help="Sender name for email template")
    parser.add_argument("--headful", action="store_true", help="Run browser visibly for debugging")

    args = parser.parse_args()

    pipeline = MapsPipeline(headless=not args.headful)
    result = pipeline.execute(args.query, max_results=args.limit, sender_name=args.sender)

    print("\n" + "=" * 60)
    print(f"PIPELINE RUN COMPLETE: {result['totalLeads']} Leads Processed")
    print(f"JSON Output: {result['jsonFile']}")
    print(f"CSV Output:  {result['csvFile']}")
    print("=" * 60)

if __name__ == "__main__":
    main()
