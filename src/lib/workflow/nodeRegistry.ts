/**
 * nodeRegistry.ts - Complete Registry of 25 Node Types for LocalRank AI
 * Config schemas, UI styling tokens, and capability metadata.
 */

import { NodeType } from '../types';

export interface NodeDefinition {
  type: NodeType;
  label: string;
  category: 'Trigger' | 'Discovery' | 'Audit & Rank' | 'Strategy & AI' | 'Outreach' | 'Flow & Storage';
  description: string;
  iconName: string;
  color: string; // Tailwind color class
  defaultConfig: Record<string, any>;
  inputs: { id: string; label: string; type: string }[];
  outputs: { id: string; label: string; type: string }[];
}

export const NODE_REGISTRY: Record<NodeType, NodeDefinition> = {
  google_maps_search: {
    type: 'google_maps_search',
    label: 'Search Google Maps',
    category: 'Trigger',
    description: 'Searches Google Maps for businesses matching query, city, and radius.',
    iconName: 'MapPin',
    color: 'emerald',
    defaultConfig: {
      query: 'Emergency Dentists in Austin, TX',
      location: 'Austin, TX',
      radiusKm: 10,
      maxResults: 50,
      primaryKeyword: 'emergency dentist'
    },
    inputs: [],
    outputs: [{ id: 'out', label: 'Raw Results', type: 'places' }]
  },
  business_extraction: {
    type: 'business_extraction',
    label: 'Extract Business Data',
    category: 'Discovery',
    description: 'Extracts full GMB profile details, categories, reviews, and website URL.',
    iconName: 'Database',
    color: 'emerald',
    defaultConfig: {
      extractPhotos: true,
      extractHours: true,
      extractSecondaryCategories: true
    },
    inputs: [{ id: 'in', label: 'Places', type: 'places' }],
    outputs: [{ id: 'out', label: 'Extracted Businesses', type: 'businesses' }]
  },
  deduplication: {
    type: 'deduplication',
    label: 'Deduplication',
    category: 'Discovery',
    description: 'Removes duplicate business listings based on name, address, and phone.',
    iconName: 'Filter',
    color: 'emerald',
    defaultConfig: {
      matchByNameAndPhone: true,
      normalizeAddresses: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Unique Businesses', type: 'businesses' }]
  },
  ranking_check: {
    type: 'ranking_check',
    label: 'Quick Rank Check',
    category: 'Audit & Rank',
    description: 'Checks primary ranking position for the main target keyword.',
    iconName: 'Search',
    color: 'blue',
    defaultConfig: {
      primaryKeyword: 'emergency dentist'
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Ranked Businesses', type: 'businesses' }]
  },
  ranking_grid: {
    type: 'ranking_grid',
    label: '5-Point Ranking Grid',
    category: 'Audit & Rank',
    description: 'Evaluates cardinal ranking grid (Center, North, South, East, West) & 3-pack appearances.',
    iconName: 'Compass',
    color: 'blue',
    defaultConfig: {
      gridSize: 5,
      checkCenterNorthSouthEastWest: true,
      calculateVisibilityPercentage: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Grid Analyzed', type: 'businesses' }]
  },
  competitor_analysis: {
    type: 'competitor_analysis',
    label: 'Competitor Analysis',
    category: 'Audit & Rank',
    description: 'Benchmarks target business against Top 3 Google 3-Pack competitors.',
    iconName: 'Users',
    color: 'blue',
    defaultConfig: {
      analyzeTop3: true,
      calculateReviewGap: true,
      calculateRatingGap: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Competitor Insights', type: 'businesses' }]
  },
  gbp_audit: {
    type: 'gbp_audit',
    label: 'GBP Profile Audit',
    category: 'Audit & Rank',
    description: 'Audits Google Business Profile completeness, reviews, photos, and response rate.',
    iconName: 'ShieldCheck',
    color: 'blue',
    defaultConfig: {
      checkPhotos: true,
      checkReviewRecency: true,
      checkResponseRate: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Audited GBP', type: 'businesses' }]
  },
  website_check: {
    type: 'website_check',
    label: 'Website Detection',
    category: 'Discovery',
    description: 'Determines if business has a linked website and verifies reachability.',
    iconName: 'Globe',
    color: 'emerald',
    defaultConfig: {
      verifyHttps: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Verified Web Status', type: 'businesses' }]
  },
  website_crawler: {
    type: 'website_crawler',
    label: 'Website Crawler',
    category: 'Audit & Rank',
    description: 'Crawls homepage, contact, and about pages for structural elements.',
    iconName: 'Code',
    color: 'blue',
    defaultConfig: {
      crawlSubpages: true,
      maxPagesPerSite: 3
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Crawled Pages', type: 'businesses' }]
  },
  website_seo_audit: {
    type: 'website_seo_audit',
    label: 'Technical Website Audit',
    category: 'Audit & Rank',
    description: 'Checks SSL, meta tags, viewport, LocalBusiness JSON-LD schema, and booking widgets.',
    iconName: 'FileSearch',
    color: 'blue',
    defaultConfig: {
      checkSsl: true,
      checkSchema: true,
      checkLeadCapture: true,
      checkTapToCall: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Website Audit Scores', type: 'businesses' }]
  },
  local_seo_analysis: {
    type: 'local_seo_analysis',
    label: 'Local SEO Gap Analysis',
    category: 'Strategy & AI',
    description: 'Pinpoints exact signals Top 3 competitors possess that the target business lacks.',
    iconName: 'TrendingUp',
    color: 'purple',
    defaultConfig: {
      identifyMissingLandingPages: true,
      identifySchemaDeficit: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'SEO Gaps', type: 'businesses' }]
  },
  opportunity_score: {
    type: 'opportunity_score',
    label: 'Top 3 Opportunity Score',
    category: 'Strategy & AI',
    description: 'Calculates a transparent 0-100 score indicating feasibility to reach Top 3.',
    iconName: 'Award',
    color: 'purple',
    defaultConfig: {
      weightRankingProximity: 30,
      weightReviewGap: 25,
      weightWebsiteQuality: 25
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Scored Businesses', type: 'businesses' }]
  },
  action_plan: {
    type: 'action_plan',
    label: '3-Phase Action Plan',
    category: 'Strategy & AI',
    description: 'Generates P0/P1/P2 tactical checklist (GMB, Schema, Review Velocity, Inbound Automation).',
    iconName: 'CheckSquare',
    color: 'purple',
    defaultConfig: {
      generatePhases: 3,
      includeDependencies: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Action Plans', type: 'businesses' }]
  },
  timeline_estimator: {
    type: 'timeline_estimator',
    label: 'Timeline Estimator',
    category: 'Strategy & AI',
    description: 'Estimates practical realistic days (30, 45, 60, 90 days) based on review deficit.',
    iconName: 'Clock',
    color: 'purple',
    defaultConfig: {
      dynamicReviewWeight: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Timeline Estimated', type: 'businesses' }]
  },
  contact_enrichment: {
    type: 'contact_enrichment',
    label: 'Contact Enrichment',
    category: 'Outreach',
    description: 'Finds public business emails and discovers decision maker / doctor first names safely.',
    iconName: 'Mail',
    color: 'amber',
    defaultConfig: {
      crawlContactAndAbout: true,
      cleanEmailFilter: true,
      neverFabricateNames: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Enriched Contacts', type: 'businesses' }]
  },
  social_discovery: {
    type: 'social_discovery',
    label: 'Social Profile Discovery',
    category: 'Outreach',
    description: 'Extracts Instagram, Facebook, LinkedIn, and Twitter profiles from website.',
    iconName: 'Share2',
    color: 'amber',
    defaultConfig: {
      checkInstagram: true,
      checkFacebook: true,
      checkLinkedin: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Socials Extracted', type: 'businesses' }]
  },
  email_generation: {
    type: 'email_generation',
    label: 'Personalized Cold Email',
    category: 'Outreach',
    description: 'Generates cold emails under 100 words using proven agency template and real ranking data.',
    iconName: 'Send',
    color: 'amber',
    defaultConfig: {
      senderName: 'Anuj',
      strictUnder100Words: true,
      generate3SubjectLines: true,
      top3DefenseVariant: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Emails Generated', type: 'businesses' }]
  },
  email_validation: {
    type: 'email_validation',
    label: 'Email Validator',
    category: 'Outreach',
    description: 'Validates that emails are under 100 words, cite real ranks, and have no hallucinations.',
    iconName: 'CheckCircle',
    color: 'amber',
    defaultConfig: {
      failIfOver100Words: true,
      verifyRealRank: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Validated Emails', type: 'businesses' }]
  },
  save_lead: {
    type: 'save_lead',
    label: 'Save Leads',
    category: 'Flow & Storage',
    description: 'Persists enriched leads, audits, ranking grids, and emails to the workspace database.',
    iconName: 'Save',
    color: 'zinc',
    defaultConfig: {
      workspaceId: 'ws-default',
      notifyOnComplete: true
    },
    inputs: [{ id: 'in', label: 'Businesses', type: 'businesses' }],
    outputs: [{ id: 'out', label: 'Saved Leads', type: 'leads' }]
  },
  csv_export: {
    type: 'csv_export',
    label: 'Export to CSV',
    category: 'Flow & Storage',
    description: 'Exports processed leads and email copy to a downloadable CSV format.',
    iconName: 'Download',
    color: 'zinc',
    defaultConfig: {
      includeRankings: true,
      includeColdEmails: true
    },
    inputs: [{ id: 'in', label: 'Leads', type: 'leads' }],
    outputs: [{ id: 'out', label: 'CSV File', type: 'file' }]
  },
  excel_export: {
    type: 'excel_export',
    label: 'Export to Excel',
    category: 'Flow & Storage',
    description: 'Exports comprehensive leads with structured sheets to XLSX.',
    iconName: 'FileSpreadsheet',
    color: 'zinc',
    defaultConfig: {},
    inputs: [{ id: 'in', label: 'Leads', type: 'leads' }],
    outputs: [{ id: 'out', label: 'Excel File', type: 'file' }]
  },
  report_generation: {
    type: 'report_generation',
    label: 'Generate Client Report',
    category: 'Flow & Storage',
    description: 'Builds interactive branded audit report with executive PDF printing layout.',
    iconName: 'FileText',
    color: 'zinc',
    defaultConfig: {
      includeGridVisualizer: true,
      includeCompetitorMatrix: true
    },
    inputs: [{ id: 'in', label: 'Leads', type: 'leads' }],
    outputs: [{ id: 'out', label: 'Report URL', type: 'report' }]
  },
  condition: {
    type: 'condition',
    label: 'Condition / Filter',
    category: 'Flow & Storage',
    description: 'Branches workflow execution based on criteria (e.g. rank > 3, hasWebsite == false).',
    iconName: 'GitBranch',
    color: 'cyan',
    defaultConfig: {
      field: 'currentRank',
      operator: 'greater_than',
      value: 3
    },
    inputs: [{ id: 'in', label: 'Input', type: 'any' }],
    outputs: [
      { id: 'true', label: 'True Branch', type: 'any' },
      { id: 'false', label: 'False Branch', type: 'any' }
    ]
  },
  loop: {
    type: 'loop',
    label: 'Batch Loop',
    category: 'Flow & Storage',
    description: 'Batches items to process with controlled concurrency and delay.',
    iconName: 'Repeat',
    color: 'cyan',
    defaultConfig: {
      batchSize: 10,
      delayMsBetweenBatches: 1000
    },
    inputs: [{ id: 'in', label: 'Items', type: 'array' }],
    outputs: [{ id: 'out', label: 'Batched Items', type: 'array' }]
  },
  merge: {
    type: 'merge',
    label: 'Merge Branches',
    category: 'Flow & Storage',
    description: 'Funnels multiple parallel execution branches back into a single pipeline.',
    iconName: 'GitMerge',
    color: 'cyan',
    defaultConfig: {},
    inputs: [
      { id: 'in1', label: 'Branch 1', type: 'any' },
      { id: 'in2', label: 'Branch 2', type: 'any' }
    ],
    outputs: [{ id: 'out', label: 'Merged Stream', type: 'any' }]
  },
  delay: {
    type: 'delay',
    label: 'Delay / Rate Limit',
    category: 'Flow & Storage',
    description: 'Pauses execution for a specified duration to prevent rate limiting.',
    iconName: 'Hourglass',
    color: 'zinc',
    defaultConfig: {
      delaySeconds: 2
    },
    inputs: [{ id: 'in', label: 'Input', type: 'any' }],
    outputs: [{ id: 'out', label: 'Output', type: 'any' }]
  }
};
