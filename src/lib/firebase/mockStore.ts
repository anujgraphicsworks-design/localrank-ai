import { BusinessLead, Workflow, WorkflowExecution, IntegrationSettings } from '../types';

export const INITIAL_SETTINGS: IntegrationSettings = {
  googleMapsApiKey: '',
  googleMapsStatus: 'not_configured',
  geminiApiKey: '',
  geminiStatus: 'not_configured',
  useAiAnalysis: false,
  enableDemoMode: true,
  maxScrapeConcurrency: 5,
  requestTimeoutSeconds: 15,
  defaultSenderName: 'Anuj'
};

export const INITIAL_LEADS: BusinessLead[] = [
  {
    "id": "lead-austin-1",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Emergency Dentist of Austin",
    "category": "emergency dentists",
    "primaryService": "emergency dentists",
    "address": "Emergency Dentist of Austin",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=8726852563881499337",
    "placeCid": "8726852563881499337",
    "isUnclaimed": false,
    "phone": "Not publicly listed",
    "whatLacks": [
      "Review Velocity Deficit: Sufficient total reviews, but lacks fresh monthly review velocity.",
      "Domain Authority Penalty: No dedicated website connected to Google Business Profile (major ranking anchor missing).",
      "Lead Conversion Void: Zero automated digital capture for inbound local prospects."
    ],
    "hasWebsite": false,
    "rating": 4.8,
    "reviewsCount": 1509,
    "businessStatus": "OPERATIONAL",
    "photosCount": 15,
    "currentRank": 1,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 1,
      "northRank": 2,
      "southRank": 3,
      "eastRank": 2,
      "westRank": 1,
      "averageRank": 1.8,
      "medianRank": 1,
      "bestRank": 1,
      "worstRank": 3,
      "threePackAppearances": 5,
      "visibilityPercentage": 100.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 1,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 2,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 2,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 1,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Emergency Dentist of Austin",
      "targetRank": 1,
      "targetReviews": 1509,
      "targetRating": 4.8,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 0,
      "ratingDeltaToTop3Avg": 0.0,
      "primaryGap": "Currently in Top 3; defend position against aggressive review velocity below."
    },
    "gbpAudit": {
      "score": 85,
      "primaryCategory": "emergency dentists",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": true,
      "reviewCount": 1509,
      "rating": 4.8,
      "reviewRecencyDays": 5,
      "reviewResponseRatePercent": 85,
      "photosCount": 15,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": false,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 8726852563881499337)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Competitors actively running monthly review collection campaigns",
        "Lacks automated missed-call lead capture workflow",
        "No instant emergency booking link on GMB drawer"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Maintain review velocity of 10+ reviews/month"
      ]
    },
    "websiteAudit": {
      "hasWebsite": false,
      "ssl": false,
      "title": "",
      "titleLength": 0,
      "metaDescription": "",
      "metaDescLength": 0,
      "isMobileResponsive": false,
      "hasLeadCapture": false,
      "hasBookingWidget": false,
      "hasTapToCall": false,
      "hasSchema": false,
      "schemaTypes": [],
      "hasDedicatedServicePages": false,
      "hasLocationPages": false,
      "findings": [
        "No official website linked to Google Business Profile."
      ],
      "scores": {
        "overall": 15,
        "technicalSeo": 0,
        "localSeo": 10,
        "content": 0,
        "conversion": 35,
        "mobileUx": 20,
        "trust": 75
      }
    },
    "opportunityScore": {
      "score": 96,
      "difficulty": "Low",
      "potential": "High",
      "summary": "Sitting at #1 on Google Maps with 1509 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#1)",
          "impact": "Target rank gap: 0 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-0 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 0 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'emergency dentists' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy a high-speed mobile landing page with local schema.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-1-1",
        "finding": "Observed at Rank #1 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=8726852563881499337",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #1 on Google Maps (CID: 8726852563881499337)."
      },
      {
        "id": "ev-1-2",
        "finding": "No official website connected to Google Business Profile",
        "category": "Website",
        "source": "Google Business Profile Inspection",
        "sourceUrl": "https://www.google.com/maps?cid=8726852563881499337",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "GMB listing lacks an official website link, severely penalizing organic local ranking."
      }
    ],
    "contact": {
      "decisionMakerName": "Practice Manager",
      "firstName": "there",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-1",
      "subjectRecommended": "Check Emergency Dentist of Austin on Google rn",
      "subjectAlt1": "Emergency Dentist of Austin\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Emergency Dentist of Austin",
      "body": "Hey there,\n\nCame across Emergency Dentist of Austin while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #1 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Emergency Dentist of Austin into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 91,
      "isUnder100Words": true,
      "targetRank": 1,
      "recipientName": "there",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "New",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-2",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Austin Emergency Dental",
    "category": "Dentist",
    "primaryService": "emergency dentists",
    "address": "Austin Emergency Dental, 2500 W William Cannon Dr Ste 103 (Building #1, Austin, TX 78745, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=10235853594185523657",
    "placeCid": "10235853594185523657",
    "isUnclaimed": false,
    "phone": "+1 737-747-4646",
    "whatLacks": [
      "Review Volume Deficit: Trails Top 3 competitors by ~340 customer reviews.",
      "Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.",
      "Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries."
    ],
    "website": "https://emergencydentalaustin.com/",
    "hasWebsite": true,
    "rating": 4.9,
    "reviewsCount": 829,
    "businessStatus": "OPERATIONAL",
    "photosCount": 18,
    "currentRank": 2,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 2,
      "northRank": 3,
      "southRank": 4,
      "eastRank": 3,
      "westRank": 3,
      "averageRank": 3.0,
      "medianRank": 2,
      "bestRank": 2,
      "worstRank": 4,
      "threePackAppearances": 4,
      "visibilityPercentage": 80.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 2,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 4,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Austin Emergency Dental",
      "targetRank": 2,
      "targetReviews": 829,
      "targetRating": 4.9,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 340,
      "ratingDeltaToTop3Avg": 0.0,
      "primaryGap": "Currently in Top 3; defend position against aggressive review velocity below."
    },
    "gbpAudit": {
      "score": 85,
      "primaryCategory": "Dentist",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": true,
      "reviewCount": 829,
      "rating": 4.9,
      "reviewRecencyDays": 5,
      "reviewResponseRatePercent": 85,
      "photosCount": 18,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": true,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 10235853594185523657)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~340 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "Review response rate could be increased"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 340 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": true,
      "url": "https://emergencydentalaustin.com/",
      "statusCode": 200,
      "ssl": true,
      "title": "Emergency Dentist Austin TX | Austin Emergency Dental",
      "titleLength": 53,
      "metaDescription": "Emergency dental care in Austin\u2014walk-ins welcome! Open late & weekends. $49 exam & X-rays for new patients. Fast pain relief & tooth repair.",
      "metaDescLength": 140,
      "isMobileResponsive": true,
      "hasLeadCapture": true,
      "hasBookingWidget": true,
      "hasTapToCall": true,
      "hasSchema": true,
      "schemaTypes": [
        "LocalBusiness",
        "MedicalBusiness"
      ],
      "hasDedicatedServicePages": true,
      "hasLocationPages": true,
      "findings": [
        "Website foundation is operational; lacks aggressive local conversion optimization."
      ],
      "scores": {
        "overall": 75,
        "technicalSeo": 80,
        "localSeo": 70,
        "content": 72,
        "conversion": 65,
        "mobileUx": 85,
        "trust": 75
      }
    },
    "opportunityScore": {
      "score": 96,
      "difficulty": "Low",
      "potential": "High",
      "summary": "Sitting at #2 on Google Maps with 829 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#2)",
          "impact": "Target rank gap: 0 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-340 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 340 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Dentist' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-2-1",
        "finding": "Observed at Rank #2 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=10235853594185523657",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #2 on Google Maps (CID: 10235853594185523657)."
      },
      {
        "id": "ev-2-2",
        "finding": "Website live with SSL: https://emergencydentalaustin.com/",
        "category": "Website",
        "source": "HTTP Inspection",
        "sourceUrl": "https://emergencydentalaustin.com/",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Emergency Dentist Austin TX | Austin Emergency Dental"
      }
    ],
    "contact": {
      "decisionMakerName": "Practice Manager",
      "firstName": "there",
      "role": "Lead Dentist / Practice Director",
      "primaryEmail": "admin@emergencydentalaustin.com",
      "emailFound": true,
      "emailSource": "Website Contact Page / DNS Record",
      "confidence": "High",
      "websiteUrl": "https://emergencydentalaustin.com/",
      "outreachChannel": "Email"
    },
    "coldEmail": {
      "id": "email-austin-2",
      "subjectRecommended": "Check Austin Emergency Dental on Google rn",
      "subjectAlt1": "Austin Emergency Dental\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Austin Emergency Dental",
      "body": "Hey there,\n\nCame across Austin Emergency Dental while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #2 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Austin Emergency Dental into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 89,
      "isUnder100Words": true,
      "targetRank": 2,
      "recipientEmail": "admin@emergencydentalaustin.com",
      "recipientName": "there",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "New",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-3",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Dr. Conor Perrin Emergency Dental Service",
    "category": "Emergency dental service",
    "primaryService": "emergency dentists",
    "address": "5608 S 1st St, Austin, TX 78745, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=2107337486137333730",
    "placeCid": "2107337486137333730",
    "isUnclaimed": false,
    "phone": "+1 737-738-7277",
    "whatLacks": [
      "Review Volume Deficit: Trails Top 3 competitors by ~1169 customer reviews.",
      "Domain Authority Penalty: No dedicated website connected to Google Business Profile (major ranking anchor missing).",
      "Lead Conversion Void: Zero automated digital capture for inbound local prospects."
    ],
    "hasWebsite": false,
    "rating": 0.0,
    "reviewsCount": 0,
    "businessStatus": "OPERATIONAL",
    "photosCount": 21,
    "currentRank": 3,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 3,
      "northRank": 2,
      "southRank": 5,
      "eastRank": 4,
      "westRank": 2,
      "averageRank": 3.2,
      "medianRank": 3,
      "bestRank": 2,
      "worstRank": 5,
      "threePackAppearances": 3,
      "visibilityPercentage": 60.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 2,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 5,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 4,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 2,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Dr. Conor Perrin Emergency Dental Service",
      "targetRank": 3,
      "targetReviews": 0,
      "targetRating": 0.0,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 1169,
      "ratingDeltaToTop3Avg": 4.8,
      "primaryGap": "Currently in Top 3; defend position against aggressive review velocity below."
    },
    "gbpAudit": {
      "score": 85,
      "primaryCategory": "Emergency dental service",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 0,
      "rating": 0.0,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 21,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": false,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 2107337486137333730)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~1169 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "No instant emergency booking link on GMB drawer"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 1169 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": false,
      "ssl": false,
      "title": "",
      "titleLength": 0,
      "metaDescription": "",
      "metaDescLength": 0,
      "isMobileResponsive": false,
      "hasLeadCapture": false,
      "hasBookingWidget": false,
      "hasTapToCall": true,
      "hasSchema": false,
      "schemaTypes": [],
      "hasDedicatedServicePages": false,
      "hasLocationPages": false,
      "findings": [
        "No official website linked to Google Business Profile."
      ],
      "scores": {
        "overall": 15,
        "technicalSeo": 0,
        "localSeo": 10,
        "content": 0,
        "conversion": 35,
        "mobileUx": 20,
        "trust": 40
      }
    },
    "opportunityScore": {
      "score": 96,
      "difficulty": "Low",
      "potential": "High",
      "summary": "Sitting at #3 on Google Maps with 0 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#3)",
          "impact": "Target rank gap: 0 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-1169 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 1169 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Emergency dental service' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy a high-speed mobile landing page with local schema.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-3-1",
        "finding": "Observed at Rank #3 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=2107337486137333730",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #3 on Google Maps (CID: 2107337486137333730)."
      },
      {
        "id": "ev-3-2",
        "finding": "No official website connected to Google Business Profile",
        "category": "Website",
        "source": "Google Business Profile Inspection",
        "sourceUrl": "https://www.google.com/maps?cid=2107337486137333730",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "GMB listing lacks an official website link, severely penalizing organic local ranking."
      }
    ],
    "contact": {
      "decisionMakerName": "Dr. Conor",
      "firstName": "Conor",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-3",
      "subjectRecommended": "Conor, check Dr. Conor Perrin Emergency Dental Service on Google rn",
      "subjectAlt1": "Dr. Conor Perrin Emergency Dental Service\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Dr. Conor Perrin Emergency Dental Service",
      "body": "Hey Conor,\n\nCame across Dr. Conor Perrin Emergency Dental Service while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #3 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Dr. Conor Perrin Emergency Dental Service into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 95,
      "isUnder100Words": true,
      "targetRank": 3,
      "recipientName": "Conor",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "New",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-4",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Dr. Mark Davidson Emergency Dental Service",
    "category": "Dental clinic",
    "primaryService": "emergency dentists",
    "address": "2808 Hemphill Park, Austin, TX 78705, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=4286758627269761960",
    "placeCid": "4286758627269761960",
    "isUnclaimed": false,
    "phone": "+1 903-857-7900",
    "whatLacks": [
      "Rank Deficit: Currently sitting at #4 \u2014 outside Google's high-converting 3-Pack.",
      "Review Volume Deficit: Trails Top 3 competitors by ~1169 customer reviews.",
      "Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.",
      "Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries."
    ],
    "website": "https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
    "hasWebsite": true,
    "rating": 0.0,
    "reviewsCount": 0,
    "businessStatus": "OPERATIONAL",
    "photosCount": 24,
    "currentRank": 4,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 4,
      "northRank": 3,
      "southRank": 6,
      "eastRank": 5,
      "westRank": 5,
      "averageRank": 4.6,
      "medianRank": 4,
      "bestRank": 3,
      "worstRank": 6,
      "threePackAppearances": 1,
      "visibilityPercentage": 20.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 4,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 3,
          "in3Pack": true,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 5,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 5,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Dr. Mark Davidson Emergency Dental Service",
      "targetRank": 4,
      "targetReviews": 0,
      "targetRating": 0.0,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 1169,
      "ratingDeltaToTop3Avg": 4.8,
      "primaryGap": "Trails Top 3 average by 1169 reviews and needs local schema markup."
    },
    "gbpAudit": {
      "score": 68,
      "primaryCategory": "Dental clinic",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 0,
      "rating": 0.0,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 24,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": true,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 4286758627269761960)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~1169 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "Review response rate could be increased"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 1169 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": true,
      "url": "https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
      "statusCode": 200,
      "ssl": true,
      "title": "Emergency Dental Clinics Located in Austin, TX 78705",
      "titleLength": 52,
      "metaDescription": "Find 24 Hour Emergency Dentists near Austin, TX 78705  - Best emergency dentists for Lost Dental Filling, Fully Dislodged Tooth - Call now: 1-888-896-1427",
      "metaDescLength": 154,
      "isMobileResponsive": true,
      "hasLeadCapture": true,
      "hasBookingWidget": true,
      "hasTapToCall": true,
      "hasSchema": false,
      "schemaTypes": [],
      "hasDedicatedServicePages": true,
      "hasLocationPages": true,
      "findings": [
        "Missing LocalBusiness JSON-LD structured data schema."
      ],
      "scores": {
        "overall": 55,
        "technicalSeo": 80,
        "localSeo": 40,
        "content": 72,
        "conversion": 65,
        "mobileUx": 85,
        "trust": 40
      }
    },
    "opportunityScore": {
      "score": 76,
      "difficulty": "Low",
      "potential": "High",
      "summary": "Sitting at #4 on Google Maps with 0 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#4)",
          "impact": "Target rank gap: 1 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-1169 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 1169 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Dental clinic' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-4-1",
        "finding": "Observed at Rank #4 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=4286758627269761960",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #4 on Google Maps (CID: 4286758627269761960)."
      },
      {
        "id": "ev-4-2",
        "finding": "Website live with SSL: https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
        "category": "Website",
        "source": "HTTP Inspection",
        "sourceUrl": "https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Emergency Dental Clinics Located in Austin, TX 78705"
      },
      {
        "id": "ev-4-3",
        "finding": "Missing LocalBusiness JSON-LD structured schema on website",
        "category": "Website",
        "source": "HTML DOM Schema Check",
        "sourceUrl": "https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "No structured local business schema found to signal geo-relevance to Google."
      }
    ],
    "contact": {
      "decisionMakerName": "Dr. Mark",
      "firstName": "Mark",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "websiteUrl": "https://www.emergencydentalservice.com/emergencydentist24-7/austin-tx-78705",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-4",
      "subjectRecommended": "Mark, check Dr. Mark Davidson Emergency Dental Service on Google rn",
      "subjectAlt1": "Dr. Mark Davidson Emergency Dental Service\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Dr. Mark Davidson Emergency Dental Service",
      "body": "Hey Mark,\n\nCame across Dr. Mark Davidson Emergency Dental Service while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #4 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Dr. Mark Davidson Emergency Dental Service into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 95,
      "isUnder100Words": true,
      "targetRank": 4,
      "recipientName": "Mark",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "Ready to Contact",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-5",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Austin Primary Dental",
    "category": "Dentist",
    "primaryService": "emergency dentists",
    "address": "6700 West Gate Blvd Ste 103, Austin, TX 78745, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=6510972559064028443",
    "placeCid": "6510972559064028443",
    "isUnclaimed": false,
    "phone": "+1 512-808-5651",
    "whatLacks": [
      "Rank Deficit: Currently sitting at #5 \u2014 outside Google's high-converting 3-Pack.",
      "Review Volume Deficit: Trails Top 3 competitors by ~796 customer reviews.",
      "Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.",
      "Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries."
    ],
    "website": "https://austinprimarydental.com/?utm_source=GMB&utm_medium=organic&utm_campaign=DevOptimization&utm_content=Website",
    "hasWebsite": true,
    "rating": 4.9,
    "reviewsCount": 373,
    "businessStatus": "OPERATIONAL",
    "photosCount": 27,
    "currentRank": 5,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 5,
      "northRank": 4,
      "southRank": 7,
      "eastRank": 6,
      "westRank": 4,
      "averageRank": 5.2,
      "medianRank": 5,
      "bestRank": 4,
      "worstRank": 7,
      "threePackAppearances": 0,
      "visibilityPercentage": 0.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 5,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 4,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 4,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Austin Primary Dental",
      "targetRank": 5,
      "targetReviews": 373,
      "targetRating": 4.9,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 796,
      "ratingDeltaToTop3Avg": 0.0,
      "primaryGap": "Trails Top 3 average by 796 reviews and needs local schema markup."
    },
    "gbpAudit": {
      "score": 68,
      "primaryCategory": "Dentist",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 373,
      "rating": 4.9,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 27,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": true,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 6510972559064028443)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~796 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "Review response rate could be increased"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 796 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": true,
      "url": "https://austinprimarydental.com/?utm_source=GMB&utm_medium=organic&utm_campaign=DevOptimization&utm_content=Website",
      "statusCode": 200,
      "ssl": true,
      "title": "Austin Primary Dental Austin Texas \u2013 Get a healthy gorgeous smile at Austin Primary Dental",
      "titleLength": 90,
      "metaDescription": "Trusted source with great results! Austin Primary Dental - Modern dentistry with a warm, caring and highly trained staff. Get the healthy, gorgeous smile you deserve.",
      "metaDescLength": 166,
      "isMobileResponsive": true,
      "hasLeadCapture": true,
      "hasBookingWidget": true,
      "hasTapToCall": true,
      "hasSchema": true,
      "schemaTypes": [
        "LocalBusiness",
        "MedicalBusiness"
      ],
      "hasDedicatedServicePages": true,
      "hasLocationPages": true,
      "findings": [
        "Website foundation is operational; lacks aggressive local conversion optimization."
      ],
      "scores": {
        "overall": 75,
        "technicalSeo": 80,
        "localSeo": 70,
        "content": 72,
        "conversion": 65,
        "mobileUx": 85,
        "trust": 75
      }
    },
    "opportunityScore": {
      "score": 72,
      "difficulty": "Medium",
      "potential": "High",
      "summary": "Sitting at #5 on Google Maps with 373 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#5)",
          "impact": "Target rank gap: 2 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-796 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 796 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Dentist' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-5-1",
        "finding": "Observed at Rank #5 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=6510972559064028443",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #5 on Google Maps (CID: 6510972559064028443)."
      },
      {
        "id": "ev-5-2",
        "finding": "Website live with SSL: https://austinprimarydental.com/?utm_source=GMB&utm_medium=organic&utm_campaign=DevOptimization&utm_content=Website",
        "category": "Website",
        "source": "HTTP Inspection",
        "sourceUrl": "https://austinprimarydental.com/?utm_source=GMB&utm_medium=organic&utm_campaign=DevOptimization&utm_content=Website",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Austin Primary Dental Austin Texas \u2013 Get a healthy gorgeous smile at Austin Primary Dental"
      }
    ],
    "contact": {
      "decisionMakerName": "Practice Manager",
      "firstName": "there",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "websiteUrl": "https://austinprimarydental.com/?utm_source=GMB&utm_medium=organic&utm_campaign=DevOptimization&utm_content=Website",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-5",
      "subjectRecommended": "Check Austin Primary Dental on Google rn",
      "subjectAlt1": "Austin Primary Dental\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Austin Primary Dental",
      "body": "Hey there,\n\nCame across Austin Primary Dental while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #5 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Austin Primary Dental into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 89,
      "isUnder100Words": true,
      "targetRank": 5,
      "recipientName": "there",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "Ready to Contact",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-6",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Dr. Eli Zimmerman Emergency Dental Service",
    "category": "Emergency dental service",
    "primaryService": "emergency dentists",
    "address": "9933 Menchaca Rd, Austin, TX 78748, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=11386459742115606850",
    "placeCid": "11386459742115606850",
    "isUnclaimed": false,
    "phone": "+1 737-353-1100",
    "whatLacks": [
      "Rank Deficit: Currently sitting at #6 \u2014 outside Google's high-converting 3-Pack.",
      "Review Volume Deficit: Trails Top 3 competitors by ~1169 customer reviews.",
      "Domain Authority Penalty: No dedicated website connected to Google Business Profile (major ranking anchor missing).",
      "Lead Conversion Void: Zero automated digital capture for inbound local prospects."
    ],
    "hasWebsite": false,
    "rating": 0.0,
    "reviewsCount": 0,
    "businessStatus": "OPERATIONAL",
    "photosCount": 30,
    "currentRank": 6,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 6,
      "northRank": 5,
      "southRank": 8,
      "eastRank": 7,
      "westRank": 7,
      "averageRank": 6.6,
      "medianRank": 6,
      "bestRank": 5,
      "worstRank": 8,
      "threePackAppearances": 0,
      "visibilityPercentage": 0.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 5,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 8,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Dr. Eli Zimmerman Emergency Dental Service",
      "targetRank": 6,
      "targetReviews": 0,
      "targetRating": 0.0,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 1169,
      "ratingDeltaToTop3Avg": 4.8,
      "primaryGap": "Trails Top 3 average by 1169 reviews and needs local schema markup."
    },
    "gbpAudit": {
      "score": 42,
      "primaryCategory": "Emergency dental service",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 0,
      "rating": 0.0,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 30,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": false,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 11386459742115606850)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~1169 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "No instant emergency booking link on GMB drawer"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 1169 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": false,
      "ssl": false,
      "title": "",
      "titleLength": 0,
      "metaDescription": "",
      "metaDescLength": 0,
      "isMobileResponsive": false,
      "hasLeadCapture": false,
      "hasBookingWidget": false,
      "hasTapToCall": true,
      "hasSchema": false,
      "schemaTypes": [],
      "hasDedicatedServicePages": false,
      "hasLocationPages": false,
      "findings": [
        "No official website linked to Google Business Profile."
      ],
      "scores": {
        "overall": 15,
        "technicalSeo": 0,
        "localSeo": 10,
        "content": 0,
        "conversion": 35,
        "mobileUx": 20,
        "trust": 40
      }
    },
    "opportunityScore": {
      "score": 68,
      "difficulty": "Medium",
      "potential": "High",
      "summary": "Sitting at #6 on Google Maps with 0 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#6)",
          "impact": "Target rank gap: 3 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-1169 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 1169 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Emergency dental service' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy a high-speed mobile landing page with local schema.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-6-1",
        "finding": "Observed at Rank #6 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=11386459742115606850",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #6 on Google Maps (CID: 11386459742115606850)."
      },
      {
        "id": "ev-6-2",
        "finding": "No official website connected to Google Business Profile",
        "category": "Website",
        "source": "Google Business Profile Inspection",
        "sourceUrl": "https://www.google.com/maps?cid=11386459742115606850",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "GMB listing lacks an official website link, severely penalizing organic local ranking."
      }
    ],
    "contact": {
      "decisionMakerName": "Dr. Eli",
      "firstName": "Eli",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-6",
      "subjectRecommended": "Eli, check Dr. Eli Zimmerman Emergency Dental Service on Google rn",
      "subjectAlt1": "Dr. Eli Zimmerman Emergency Dental Service\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Dr. Eli Zimmerman Emergency Dental Service",
      "body": "Hey Eli,\n\nCame across Dr. Eli Zimmerman Emergency Dental Service while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #6 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Dr. Eli Zimmerman Emergency Dental Service into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 95,
      "isUnder100Words": true,
      "targetRank": 6,
      "recipientName": "Eli",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "Ready to Contact",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-7",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "Dentist in Austin.",
    "category": "Dentist",
    "primaryService": "emergency dentists",
    "address": "2110 W Slaughter Ln Ste 190, Austin, TX 78748, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=307141331480248165",
    "placeCid": "307141331480248165",
    "isUnclaimed": false,
    "phone": "+1 209-315-7212",
    "whatLacks": [
      "Rank Deficit: Currently sitting at #7 \u2014 outside Google's high-converting 3-Pack.",
      "Review Volume Deficit: Trails Top 3 competitors by ~826 customer reviews.",
      "Star Rating Deficit: 3.4 \u2605 vs Top 3 average of 4.8 \u2605.",
      "Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.",
      "Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries."
    ],
    "website": "http://dentistinaustin.health/",
    "hasWebsite": true,
    "rating": 3.4,
    "reviewsCount": 343,
    "businessStatus": "OPERATIONAL",
    "photosCount": 33,
    "currentRank": 7,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 7,
      "northRank": 6,
      "southRank": 6,
      "eastRank": 8,
      "westRank": 6,
      "averageRank": 6.6,
      "medianRank": 7,
      "bestRank": 6,
      "worstRank": 8,
      "threePackAppearances": 0,
      "visibilityPercentage": 0.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 8,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "Dentist in Austin.",
      "targetRank": 7,
      "targetReviews": 343,
      "targetRating": 3.4,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 826,
      "ratingDeltaToTop3Avg": 1.4,
      "primaryGap": "Trails Top 3 average by 826 reviews and needs local schema markup."
    },
    "gbpAudit": {
      "score": 68,
      "primaryCategory": "Dentist",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 343,
      "rating": 3.4,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 33,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": true,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 307141331480248165)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~826 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "Review response rate could be increased"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 826 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": true,
      "url": "http://dentistinaustin.health/",
      "statusCode": 200,
      "ssl": false,
      "title": "",
      "titleLength": 0,
      "metaDescription": "",
      "metaDescLength": 0,
      "isMobileResponsive": false,
      "hasLeadCapture": false,
      "hasBookingWidget": false,
      "hasTapToCall": true,
      "hasSchema": false,
      "schemaTypes": [],
      "hasDedicatedServicePages": true,
      "hasLocationPages": true,
      "findings": [
        "Website failed to load cleanly within 6s: server timeout or SSL handshake issue."
      ],
      "scores": {
        "overall": 55,
        "technicalSeo": 80,
        "localSeo": 40,
        "content": 72,
        "conversion": 35,
        "mobileUx": 20,
        "trust": 40
      }
    },
    "opportunityScore": {
      "score": 64,
      "difficulty": "High",
      "potential": "High",
      "summary": "Sitting at #7 on Google Maps with 343 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#7)",
          "impact": "Target rank gap: 4 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-826 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 826 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Dentist' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-7-1",
        "finding": "Observed at Rank #7 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=307141331480248165",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #7 on Google Maps (CID: 307141331480248165)."
      },
      {
        "id": "ev-7-2",
        "finding": "Website live with SSL: http://dentistinaustin.health/",
        "category": "Website",
        "source": "HTTP Inspection",
        "sourceUrl": "http://dentistinaustin.health/",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": ""
      },
      {
        "id": "ev-7-3",
        "finding": "Missing LocalBusiness JSON-LD structured schema on website",
        "category": "Website",
        "source": "HTML DOM Schema Check",
        "sourceUrl": "http://dentistinaustin.health/",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "No structured local business schema found to signal geo-relevance to Google."
      }
    ],
    "contact": {
      "decisionMakerName": "Practice Manager",
      "firstName": "there",
      "role": "Lead Dentist / Practice Director",
      "emailFound": false,
      "confidence": "Medium",
      "websiteUrl": "http://dentistinaustin.health/",
      "outreachChannel": "Direct"
    },
    "coldEmail": {
      "id": "email-austin-7",
      "subjectRecommended": "Check Dentist in Austin. on Google rn",
      "subjectAlt1": "Dentist in Austin.\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for Dentist in Austin.",
      "body": "Hey there,\n\nCame across Dentist in Austin. while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #7 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get Dentist in Austin. into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 89,
      "isUnder100Words": true,
      "targetRank": 7,
      "recipientName": "there",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "Ready to Contact",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  },
  {
    "id": "lead-austin-8",
    "workspaceId": "ws-default",
    "isDemo": false,
    "businessName": "TRU Dentistry Austin",
    "category": "Dentist",
    "primaryService": "emergency dentists",
    "address": "9901 Brodie Ln Ste 130, Austin, TX 78748, United States",
    "city": "Austin",
    "state": "TX",
    "postalCode": "78704",
    "country": "USA",
    "googleMapsUrl": "https://www.google.com/maps?cid=10843578219852735952",
    "placeCid": "10843578219852735952",
    "isUnclaimed": false,
    "phone": "+1 737-201-9488",
    "whatLacks": [
      "Rank Deficit: Currently sitting at #8 \u2014 outside Google's high-converting 3-Pack.",
      "Review Volume Deficit: Trails Top 3 competitors by ~669 customer reviews.",
      "Local Schema Deficit: Lacks verified LocalBusiness schema & geo-coordinates.",
      "Inbound Automation Gap: Missing automated 60-second follow-up workflows for incoming calls/inquiries."
    ],
    "website": "https://www.trudentistryaustin.com/",
    "hasWebsite": true,
    "rating": 4.9,
    "reviewsCount": 500,
    "businessStatus": "OPERATIONAL",
    "photosCount": 36,
    "currentRank": 8,
    "rankingGrid": {
      "keyword": "emergency dentists",
      "searchCity": "Austin, TX",
      "observedAt": "2026-09-12T09:26:37Z",
      "centerRank": 8,
      "northRank": 7,
      "southRank": 7,
      "eastRank": 6,
      "westRank": 9,
      "averageRank": 7.4,
      "medianRank": 8,
      "bestRank": 6,
      "worstRank": 9,
      "threePackAppearances": 0,
      "visibilityPercentage": 0.0,
      "disclaimer": "OBSERVED LOCAL SEARCH DATA \u2014 NOT A GUARANTEED UNIVERSAL RANKING",
      "points": [
        {
          "point": "Center",
          "label": "Downtown Austin",
          "lat": 30.2672,
          "lng": -97.7431,
          "observedRank": 8,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "North",
          "label": "North Loop / Mueller",
          "lat": 30.3072,
          "lng": -97.7131,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "South",
          "label": "South Lamar / Barton",
          "lat": 30.2372,
          "lng": -97.7831,
          "observedRank": 7,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "East",
          "label": "East Austin / Plaza",
          "lat": 30.2672,
          "lng": -97.7031,
          "observedRank": 6,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        },
        {
          "point": "West",
          "label": "Westlake Hills",
          "lat": 30.2772,
          "lng": -97.8031,
          "observedRank": 9,
          "in3Pack": false,
          "topCompetitors": [
            {
              "name": "Emergency Dentist of Austin",
              "rank": 1,
              "rating": 4.8,
              "reviews": 1509
            },
            {
              "name": "Austin Emergency Dental",
              "rank": 2,
              "rating": 4.9,
              "reviews": 829
            },
            {
              "name": "Dr. Conor Perrin Emergency Dental Service",
              "rank": 3,
              "rating": 0.0,
              "reviews": 0
            }
          ]
        }
      ]
    },
    "competitorComparison": {
      "targetBusinessName": "TRU Dentistry Austin",
      "targetRank": 8,
      "targetReviews": 500,
      "targetRating": 4.9,
      "top3Competitors": [
        {
          "id": "comp-1",
          "businessName": "Emergency Dentist of Austin",
          "rank": 1,
          "rating": 4.8,
          "reviewsCount": 1509,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "emergency dentists",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "1509 reviews, ranking #1 on Google Maps 3-Pack"
        },
        {
          "id": "comp-2",
          "businessName": "Austin Emergency Dental",
          "rank": 2,
          "rating": 4.9,
          "reviewsCount": 829,
          "hasWebsite": true,
          "websiteUrl": "https://emergencydentalaustin.com/",
          "primaryCategory": "Dentist",
          "hasDedicatedLandingPage": true,
          "hasLocalSchema": true,
          "keyAdvantage": "829 reviews, ranking #2 on Google Maps 3-Pack"
        },
        {
          "id": "comp-3",
          "businessName": "Dr. Conor Perrin Emergency Dental Service",
          "rank": 3,
          "rating": 0.0,
          "reviewsCount": 0,
          "hasWebsite": false,
          "websiteUrl": "",
          "primaryCategory": "Emergency dental service",
          "hasDedicatedLandingPage": false,
          "hasLocalSchema": false,
          "keyAdvantage": "0 reviews, ranking #3 on Google Maps 3-Pack"
        }
      ],
      "reviewDeltaToTop3Avg": 669,
      "ratingDeltaToTop3Avg": 0.0,
      "primaryGap": "Trails Top 3 average by 669 reviews and needs local schema markup."
    },
    "gbpAudit": {
      "score": 68,
      "primaryCategory": "Dentist",
      "secondaryCategories": [
        "Dentist",
        "Cosmetic Dentist",
        "Urgent Care Clinic"
      ],
      "hasDescription": true,
      "descriptionKeywordOptimized": false,
      "reviewCount": 500,
      "rating": 4.9,
      "reviewRecencyDays": 28,
      "reviewResponseRatePercent": 30,
      "photosCount": 36,
      "hasOpeningHours": true,
      "hasSpecialHours": false,
      "hasBookingUrl": true,
      "strengths": [
        "Direct Canonical Google Business Profile registered (CID: 10843578219852735952)",
        "Established physical address listed in Austin, TX",
        "Primary GMB category directly targets emergency dentistry"
      ],
      "weaknesses": [
        "Deficit of ~669 customer reviews vs Top 3 average",
        "Lacks automated missed-call lead capture workflow",
        "Review response rate could be increased"
      ],
      "missingOpportunities": [
        "Adding '24/7 Urgent Dentist' secondary category",
        "Deploying automated SMS review request sequences for recent appointments",
        "Connecting Missed-Call Text-Back to lock in incoming urgent patients"
      ],
      "priorityFixes": [
        "Install automated instant SMS responder for after-hours calls",
        "Bridge review deficit of 669 reviews via automated post-treatment requests"
      ]
    },
    "websiteAudit": {
      "hasWebsite": true,
      "url": "https://www.trudentistryaustin.com/",
      "statusCode": 200,
      "ssl": true,
      "title": "Dentist in Austin, TX | TRU Dentistry",
      "titleLength": 37,
      "metaDescription": "Get the best dental care with Dr. Kostiuk at TRU Dentistry, the top rated dentist in Austin, TX. Call (737) 203-8538 or visit us at 9901 Brodie Ln suite 130.",
      "metaDescLength": 157,
      "isMobileResponsive": true,
      "hasLeadCapture": true,
      "hasBookingWidget": true,
      "hasTapToCall": true,
      "hasSchema": true,
      "schemaTypes": [
        "LocalBusiness",
        "MedicalBusiness"
      ],
      "hasDedicatedServicePages": true,
      "hasLocationPages": true,
      "findings": [
        "Website foundation is operational; lacks aggressive local conversion optimization."
      ],
      "scores": {
        "overall": 75,
        "technicalSeo": 80,
        "localSeo": 70,
        "content": 72,
        "conversion": 65,
        "mobileUx": 85,
        "trust": 75
      }
    },
    "opportunityScore": {
      "score": 60,
      "difficulty": "High",
      "potential": "High",
      "summary": "Sitting at #8 on Google Maps with 500 reviews. 75-90 Days (Full Profile Rebuild & Review Acceleration) to reach or solidify Top 3 position.",
      "factors": [
        {
          "factor": "Current Rank (#8)",
          "impact": "Target rank gap: 5 positions",
          "weight": 35
        },
        {
          "factor": "Review Gap (-669 reviews)",
          "impact": "Primary organic algorithm factor",
          "weight": 35
        },
        {
          "factor": "Local Lead Capture Automation",
          "impact": "Instant revenue upside via missed-call capture",
          "weight": 30
        }
      ],
      "disclaimer": "Opportunity score based on observed competitive gap. Not a ranking guarantee."
    },
    "actionPlan": {
      "overallStrategy": "Execute targeted local SEO and lead-capture acceleration to bridge the 669 review gap and capture inbound patient demand.",
      "practicalTimelineDays": 90,
      "timelineLabel": "75-90 Days (Full Profile Rebuild & Review Acceleration)",
      "confidence": "High",
      "phases": [
        {
          "phase": 1,
          "name": "Phase 1: GMB Foundation & Core Signals (Days 1\u201315)",
          "daysRange": "Days 1-15",
          "tasks": [
            {
              "priority": "P0",
              "task": "Audit and lock in primary GMB category to 'Dentist' and add 4-6 relevant secondary categories.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject high-intent local keywords and geo-tags into business description and service menu.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Deploy automated post-service SMS review request campaign to past 60 days of satisfied customers.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 2,
          "name": "Phase 2: Local Authority & On-Page Dominance (Days 16\u201345)",
          "daysRange": "Days 16-45",
          "tasks": [
            {
              "priority": "P0",
              "task": "Build & sync consistent NAP (Name, Address, Phone) citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Inject LocalBusiness JSON-LD schema with exact geo-coordinates and service taxonomy on website.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Embed official Google Maps driving directions onto the website contact section.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Publish 2 weekly GMB updates with keyword-rich call-to-actions to keep profile freshness score high.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        },
        {
          "phase": 3,
          "name": "Phase 3: Automated Lead-Capture & 3-Pack Domination (Days 46\u201390)",
          "daysRange": "Days 46-90",
          "tasks": [
            {
              "priority": "P0",
              "task": "Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy, locking in appointments.",
              "impact": "High",
              "difficulty": "Low",
              "estimatedEffort": "1-2 hours"
            },
            {
              "priority": "P1",
              "task": "Set up instant 24/7 web booking or inquiry capture workflow routing directly to front-desk phones.",
              "impact": "High",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P1",
              "task": "Maintain steady velocity of 8-12 verified 5-star reviews every month to leapfrog competitor rankings.",
              "impact": "Medium",
              "difficulty": "Medium",
              "estimatedEffort": "3-5 hours"
            },
            {
              "priority": "P2",
              "task": "Monitor Google Maps rank grid tracker to measure 3-pack expansion across target neighborhood radius.",
              "impact": "Medium",
              "difficulty": "High",
              "estimatedEffort": "3-5 hours"
            }
          ]
        }
      ]
    },
    "evidence": [
      {
        "id": "ev-8-1",
        "finding": "Observed at Rank #8 on Google Maps for \"emergency dentists in Austin\"",
        "category": "Ranking",
        "source": "Google Maps Search Feed",
        "sourceUrl": "https://www.google.com/maps?cid=10843578219852735952",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Organic position #8 on Google Maps (CID: 10843578219852735952)."
      },
      {
        "id": "ev-8-2",
        "finding": "Website live with SSL: https://www.trudentistryaustin.com/",
        "category": "Website",
        "source": "HTTP Inspection",
        "sourceUrl": "https://www.trudentistryaustin.com/",
        "observedAt": "2026-09-12T09:26:37Z",
        "confidence": "High",
        "snippet": "Dentist in Austin, TX | TRU Dentistry"
      }
    ],
    "contact": {
      "decisionMakerName": "Practice Manager",
      "firstName": "there",
      "role": "Lead Dentist / Practice Director",
      "primaryEmail": "info@trudentistryaustin.com",
      "emailFound": true,
      "emailSource": "Website Contact Page / DNS Record",
      "confidence": "High",
      "websiteUrl": "https://www.trudentistryaustin.com/",
      "outreachChannel": "Email"
    },
    "coldEmail": {
      "id": "email-austin-8",
      "subjectRecommended": "Check TRU Dentistry Austin on Google rn",
      "subjectAlt1": "TRU Dentistry Austin\u2019s Google Maps spot",
      "subjectAlt2": "Quick Google Maps finding for TRU Dentistry Austin",
      "body": "Hey there,\n\nCame across TRU Dentistry Austin while searching for emergency dentists in Austin.\n\nI noticed you're sitting at #8 on Google Maps \u2014 meaning the top 3 spots take virtually all inbound calls and bookings.\n\nBeing outside the 3-pack likely costs you dozens of high-value leads every month.\n\nI put together an action plan to get TRU Dentistry Austin into the Top 3 on Maps, plus automated lead-capture workflows so you instantly lock in leads without manual follow-ups.\n\nAlready mapped out. Reply and I'll hand it over.\n\nBest,\n\nAnuj",
      "wordCount": 89,
      "isUnder100Words": true,
      "targetRank": 8,
      "recipientEmail": "info@trudentistryaustin.com",
      "recipientName": "there",
      "status": "Approved",
      "validation": {
        "isRealRank": true,
        "isRealBusinessName": true,
        "isUnder100Words": true,
        "noFabricatedClaims": true,
        "tailoredToTop3Status": true
      }
    },
    "leadStatus": "Ready to Contact",
    "createdAt": "2026-09-12T09:26:37Z",
    "updatedAt": "2026-09-12T09:26:37Z"
  }
];

export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-leadgen-full',
    workspaceId: 'ws-default',
    name: 'Full Local SEO Lead Generation',
    description: 'Autonomous end-to-end pipeline: Maps search → Deduplication → 5-Point Ranking Grid → Competitors → GBP & Web Audit → SEO Gap Analysis → Top 3 Plan → Enrichment → Personalized Email → Save Lead.',
    triggerType: 'manual',
    status: 'idle',
    createdAt: '2026-09-11T10:00:00Z',
    updatedAt: '2026-09-11T12:00:00Z',
    nodes: [
      { id: 'node-1', type: 'customNode', position: { x: 50, y: 180 }, data: { label: 'Search Google Maps', type: 'google_maps_search', config: { query: 'Emergency Dentists in Austin, TX', location: 'Austin, TX', radiusKm: 10, maxResults: 50, primaryKeyword: 'emergency dentist' }, status: 'completed' } },
      { id: 'node-2', type: 'customNode', position: { x: 300, y: 180 }, data: { label: 'Business Discovery', type: 'business_extraction', config: { extractDetails: true, extractPhotos: true }, status: 'completed' } },
      { id: 'node-3', type: 'customNode', position: { x: 550, y: 180 }, data: { label: 'Deduplication', type: 'deduplication', config: { matchByNameAndPhone: true }, status: 'completed' } },
      { id: 'node-4', type: 'customNode', position: { x: 800, y: 180 }, data: { label: '5-Point Ranking Grid', type: 'ranking_grid', config: { gridSize: 5, primaryKeyword: 'emergency dentist', checkCenterNorthSouthEastWest: true }, status: 'completed' } },
      { id: 'node-5', type: 'customNode', position: { x: 1050, y: 80 }, data: { label: 'Competitor Analysis', type: 'competitor_analysis', config: { analyzeTop3: true }, status: 'completed' } },
      { id: 'node-6', type: 'customNode', position: { x: 1050, y: 280 }, data: { label: 'GBP & Website Audit', type: 'website_seo_audit', config: { checkSsl: true, checkSchema: true, checkLeadCapture: true }, status: 'completed' } },
      { id: 'node-7', type: 'customNode', position: { x: 1300, y: 180 }, data: { label: 'Local SEO Gap Analysis', type: 'local_seo_analysis', config: { calculateOpportunityScore: true, generateTimeline: true }, status: 'completed' } },
      { id: 'node-8', type: 'customNode', position: { x: 1550, y: 180 }, data: { label: 'Contact Enrichment', type: 'contact_enrichment', config: { crawlPages: ['/contact', '/about', '/team'], extractEmails: true, findSocials: true }, status: 'completed' } },
      { id: 'node-9', type: 'customNode', position: { x: 1800, y: 180 }, data: { label: 'Personalized Cold Email', type: 'email_generation', config: { strictUnder100Words: true, senderName: 'Anuj' }, status: 'completed' } },
      { id: 'node-10', type: 'customNode', position: { x: 2050, y: 180 }, data: { label: 'Save Leads to Database', type: 'save_lead', config: { notifyOnComplete: true }, status: 'completed' } }
    ],
    edges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', animated: true },
      { id: 'e2-3', source: 'node-2', target: 'node-3', animated: true },
      { id: 'e3-4', source: 'node-3', target: 'node-4', animated: true },
      { id: 'e4-5', source: 'node-4', target: 'node-5', animated: true },
      { id: 'e4-6', source: 'node-4', target: 'node-6', animated: true },
      { id: 'e5-7', source: 'node-5', target: 'node-7', animated: true },
      { id: 'e6-7', source: 'node-6', target: 'node-7', animated: true },
      { id: 'e7-8', source: 'node-7', target: 'node-8', animated: true },
      { id: 'e8-9', source: 'node-8', target: 'node-9', animated: true },
      { id: 'e9-10', source: 'node-9', target: 'node-10', animated: true }
    ]
  },
  {
    id: 'wf-lead-finder',
    workspaceId: 'ws-default',
    name: 'Local Business Lead Finder (Fast)',
    description: 'High-speed discovery pipeline: Google Maps search → Extract businesses → Check website status → Public contact research → Save leads.',
    triggerType: 'manual',
    status: 'idle',
    createdAt: '2026-09-11T11:00:00Z',
    updatedAt: '2026-09-11T11:00:00Z',
    nodes: [
      { id: 'f-1', type: 'customNode', position: { x: 50, y: 150 }, data: { label: 'Google Maps Search', type: 'google_maps_search', config: { maxResults: 25 }, status: 'idle' } },
      { id: 'f-2', type: 'customNode', position: { x: 300, y: 150 }, data: { label: 'Website Detection', type: 'website_check', config: {}, status: 'idle' } },
      { id: 'f-3', type: 'customNode', position: { x: 550, y: 150 }, data: { label: 'Contact Research', type: 'contact_enrichment', config: {}, status: 'idle' } },
      { id: 'f-4', type: 'customNode', position: { x: 800, y: 150 }, data: { label: 'Save Leads', type: 'save_lead', config: {}, status: 'idle' } }
    ],
    edges: [
      { id: 'fe1-2', source: 'f-1', target: 'f-2' },
      { id: 'fe2-3', source: 'f-2', target: 'f-3' },
      { id: 'fe3-4', source: 'f-3', target: 'f-4' }
    ]
  },
  {
    id: 'wf-seo-audit',
    workspaceId: 'ws-default',
    name: 'Full Local SEO Audit & Gap Engine',
    description: 'Deep SEO audit: 5-Point rank grid → Competitors comparison → Deep website crawl → GBP audit → Action plan generation.',
    triggerType: 'manual',
    status: 'idle',
    createdAt: '2026-09-11T11:15:00Z',
    updatedAt: '2026-09-11T11:15:00Z',
    nodes: [
      { id: 'a-1', type: 'customNode', position: { x: 50, y: 150 }, data: { label: 'Search Maps', type: 'google_maps_search', config: {}, status: 'idle' } },
      { id: 'a-2', type: 'customNode', position: { x: 300, y: 150 }, data: { label: 'Ranking Analysis', type: 'ranking_grid', config: {}, status: 'idle' } },
      { id: 'a-3', type: 'customNode', position: { x: 550, y: 150 }, data: { label: 'Competitor Audit', type: 'competitor_analysis', config: {}, status: 'idle' } },
      { id: 'a-4', type: 'customNode', position: { x: 800, y: 150 }, data: { label: 'Website Audit', type: 'website_seo_audit', config: {}, status: 'idle' } },
      { id: 'a-5', type: 'customNode', position: { x: 1050, y: 150 }, data: { label: 'Action Plan & Timeline', type: 'action_plan', config: {}, status: 'idle' } }
    ],
    edges: [
      { id: 'ae1-2', source: 'a-1', target: 'a-2' },
      { id: 'ae2-3', source: 'a-2', target: 'a-3' },
      { id: 'ae3-4', source: 'a-3', target: 'a-4' },
      { id: 'ae4-5', source: 'a-4', target: 'a-5' }
    ]
  },
  {
    id: 'wf-ranking-monitor',
    workspaceId: 'ws-default',
    name: 'Ranking Monitor & Change Detector',
    description: 'Scheduled monitor: checks 5-point local ranking grid against previous snapshot, computes delta, and flags drops/gains.',
    triggerType: 'scheduled',
    cronSchedule: '0 9 * * 1', // Every Monday at 9 AM
    status: 'idle',
    createdAt: '2026-09-11T11:30:00Z',
    updatedAt: '2026-09-11T11:30:00Z',
    nodes: [
      { id: 'm-1', type: 'customNode', position: { x: 50, y: 150 }, data: { label: 'Target Businesses', type: 'google_maps_search', config: {}, status: 'idle' } },
      { id: 'm-2', type: 'customNode', position: { x: 300, y: 150 }, data: { label: 'Check 5-Point Grid', type: 'ranking_grid', config: {}, status: 'idle' } },
      { id: 'm-3', type: 'customNode', position: { x: 550, y: 150 }, data: { label: 'Rank Change Condition', type: 'condition', config: { condition: 'rank_changed' }, status: 'idle' } },
      { id: 'm-4', type: 'customNode', position: { x: 800, y: 150 }, data: { label: 'Generate Alert Report', type: 'report_generation', config: {}, status: 'idle' } }
    ],
    edges: [
      { id: 'me1-2', source: 'm-1', target: 'm-2' },
      { id: 'me2-3', source: 'm-2', target: 'm-3' },
      { id: 'me3-4', source: 'm-3', target: 'm-4' }
    ]
  }
];

export const INITIAL_EXECUTIONS: WorkflowExecution[] = [
  {
    id: 'exec-demo-101',
    workflowId: 'wf-leadgen-full',
    workspaceId: 'ws-default',
    status: 'completed',
    startedAt: '2026-09-11T12:00:00Z',
    completedAt: '2026-09-11T12:02:45Z',
    totalBusinessesDiscovered: 50,
    businessesProcessed: 50,
    currentStepIndex: 10,
    totalSteps: 10,
    nodeStatuses: {
      'node-1': 'completed',
      'node-2': 'completed',
      'node-3': 'completed',
      'node-4': 'completed',
      'node-5': 'completed',
      'node-6': 'completed',
      'node-7': 'completed',
      'node-8': 'completed',
      'node-9': 'completed',
      'node-10': 'completed'
    },
    resultsSummary: {
      totalLeads: 50,
      top3Count: 3,
      outsideTop3Count: 47,
      noWebsiteCount: 8,
      emailsFoundCount: 39
    },
    logs: [
      { id: 'log-1', timestamp: '12:00:01', level: 'info', nodeName: 'Google Maps Search', message: 'Initialized search query: "Emergency Dentists in Austin, TX" (Radius: 10km, Max: 50)' },
      { id: 'log-2', timestamp: '12:00:15', level: 'success', nodeName: 'Business Discovery', message: 'Extracted 50 candidate businesses from Google Maps feed' },
      { id: 'log-3', timestamp: '12:00:22', level: 'info', nodeName: 'Deduplication', message: 'Deduplicated listings: 50 unique physical locations verified' },
      { id: 'log-4', timestamp: '12:00:45', level: 'info', nodeName: '5-Point Ranking Grid', message: 'Evaluated 5-point grid (Center, North, South, East, West). Top 3 Pack average review threshold: 180 reviews.' },
      { id: 'log-5', timestamp: '12:01:10', level: 'info', nodeName: 'GBP & Website Audit', message: 'Audited 50 websites: 8 businesses lack websites; 34 lack LocalBusiness JSON-LD schema.' },
      { id: 'log-6', timestamp: '12:01:40', level: 'info', nodeName: 'Contact Enrichment', message: 'Enriched 39 valid business emails and 42 Instagram/Facebook business profiles' },
      { id: 'log-7', timestamp: '12:02:15', level: 'success', nodeName: 'Personalized Cold Email', message: 'Generated 50 customized cold emails under 100 words. Verified 0 hallucinations.' },
      { id: 'log-8', timestamp: '12:02:45', level: 'success', nodeName: 'Save Leads', message: 'Workflow completed successfully. 50 leads saved to workspace database.' }
    ]
  }
];
