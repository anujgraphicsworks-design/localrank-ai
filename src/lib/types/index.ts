/**
 * LocalRank AI - Core TypeScript Types & Data Models
 * Multi-workspace local SEO lead intelligence and workflow orchestration
 */

export type NodeStatus = 'idle' | 'queued' | 'running' | 'completed' | 'failed' | 'skipped';

export type NodeType =
  | 'google_maps_search'
  | 'business_extraction'
  | 'deduplication'
  | 'ranking_check'
  | 'ranking_grid'
  | 'competitor_analysis'
  | 'gbp_audit'
  | 'website_check'
  | 'website_crawler'
  | 'website_seo_audit'
  | 'local_seo_analysis'
  | 'opportunity_score'
  | 'action_plan'
  | 'timeline_estimator'
  | 'contact_enrichment'
  | 'social_discovery'
  | 'email_generation'
  | 'email_validation'
  | 'save_lead'
  | 'csv_export'
  | 'excel_export'
  | 'report_generation'
  | 'condition'
  | 'loop'
  | 'merge'
  | 'delay';

export interface WorkflowNodeConfig {
  [key: string]: any;
}

export interface WorkflowNodeData extends Record<string, any> {
  label: string;
  type: NodeType;
  config: WorkflowNodeConfig;
  status?: NodeStatus;
  progress?: { current: number; total: number };
  error?: string;
  lastRun?: string;
  outputSummary?: string;
}

export interface WorkflowNode {
  id: string;
  type: string; // ReactFlow node type
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string | null;
  targetHandle?: string | null;
  animated?: boolean;
}

export interface Workflow {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  createdAt: string;
  updatedAt: string;
  lastExecutionId?: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  triggerType: 'manual' | 'scheduled';
  cronSchedule?: string;
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  nodeId?: string;
  nodeName?: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workspaceId: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  startedAt: string;
  completedAt?: string;
  totalBusinessesDiscovered: number;
  businessesProcessed: number;
  currentStepIndex: number;
  totalSteps: number;
  currentNodeId?: string;
  nodeStatuses: Record<string, NodeStatus>;
  logs: ExecutionLog[];
  resultsSummary?: {
    totalLeads: number;
    top3Count: number;
    outsideTop3Count: number;
    noWebsiteCount: number;
    emailsFoundCount: number;
  };
  error?: string;
}

// --------------------------------------------------------------------------
// Business & Ranking Types
// --------------------------------------------------------------------------

export type LeadStatus =
  | 'New'
  | 'Researched'
  | 'Ready to Contact'
  | 'Contacted'
  | 'Replied'
  | 'Interested'
  | 'Not Interested'
  | 'Client'
  | 'Do Not Contact';

export interface GridPointResult {
  point: 'Center' | 'North' | 'South' | 'East' | 'West';
  label: string;
  lat: number;
  lng: number;
  observedRank: number; // 1-20+
  in3Pack: boolean;
  topCompetitors: { name: string; rank: number; rating: number; reviews: number }[];
}

export interface RankingGrid {
  keyword: string;
  searchCity: string;
  observedAt: string;
  centerRank: number;
  northRank: number;
  southRank: number;
  eastRank: number;
  westRank: number;
  averageRank: number;
  medianRank: number;
  bestRank: number;
  worstRank: number;
  threePackAppearances: number; // 0 to 5
  visibilityPercentage: number; // 0% to 100%
  points: GridPointResult[];
  disclaimer: string; // "OBSERVED LOCAL SEARCH DATA — NOT GUARANTEED UNIVERSAL RANKING"
}

export interface CompetitorItem {
  id: string;
  businessName: string;
  rank: number;
  rating: number;
  reviewsCount: number;
  hasWebsite: boolean;
  websiteUrl?: string;
  primaryCategory: string;
  photosCount?: number;
  hasDedicatedLandingPage: boolean;
  hasLocalSchema: boolean;
  keyAdvantage: string;
}

export interface CompetitorComparison {
  targetBusinessName: string;
  targetRank: number;
  targetReviews: number;
  targetRating: number;
  top3Competitors: CompetitorItem[];
  reviewDeltaToTop3Avg: number; // e.g. +85 reviews needed
  ratingDeltaToTop3Avg: number; // e.g. +0.4 stars
  primaryGap: string;
}

export interface WebsiteAuditItem {
  hasWebsite: boolean;
  url?: string;
  statusCode?: number;
  ssl: boolean;
  title: string;
  titleLength: number;
  metaDescription: string;
  metaDescLength: number;
  isMobileResponsive: boolean;
  hasLeadCapture: boolean;
  hasBookingWidget: boolean;
  hasTapToCall: boolean;
  hasSchema: boolean;
  schemaTypes: string[]; // ['LocalBusiness', 'PostalAddress', 'FAQPage', etc.]
  hasDedicatedServicePages: boolean;
  hasLocationPages: boolean;
  findings: string[];
  scores: {
    overall: number; // 0-100
    technicalSeo: number; // 0-100
    localSeo: number; // 0-100
    content: number; // 0-100
    conversion: number; // 0-100
    mobileUx: number; // 0-100
    trust: number; // 0-100
  };
}

export interface GBPAuditItem {
  score: number; // 0-100
  primaryCategory: string;
  secondaryCategories: string[];
  hasDescription: boolean;
  descriptionKeywordOptimized: boolean;
  reviewCount: number;
  rating: number;
  reviewRecencyDays: number;
  reviewResponseRatePercent: number;
  photosCount: number;
  hasOpeningHours: boolean;
  hasSpecialHours: boolean;
  hasBookingUrl: boolean;
  strengths: string[];
  weaknesses: string[];
  missingOpportunities: string[];
  priorityFixes: string[];
}

export interface EvidenceItem {
  id: string;
  finding: string;
  category: 'Ranking' | 'Website' | 'GBP' | 'Competitor' | 'Contact';
  source: string; // e.g. "Google Maps Search Result", "Business Website Homepage", "DNS SSL Inspection"
  sourceUrl?: string;
  observedAt: string;
  confidence: 'High' | 'Medium' | 'Low';
  snippet?: string;
}

export interface ActionPlanPhase {
  phase: number;
  name: string;
  daysRange: string;
  tasks: {
    priority: 'P0' | 'P1' | 'P2';
    task: string;
    impact: 'High' | 'Medium' | 'Low';
    difficulty: 'Low' | 'Medium' | 'High';
    estimatedEffort: string;
    dependencies?: string;
  }[];
}

export interface ActionPlan {
  overallStrategy: string;
  practicalTimelineDays: number;
  timelineLabel: string; // e.g. "45-60 Days (Citation Sync & Review Velocity Push)"
  confidence: 'High' | 'Medium' | 'Low';
  phases: ActionPlanPhase[];
}

export interface Top3OpportunityScore {
  score: number; // 0-100
  difficulty: 'Low' | 'Medium' | 'High';
  potential: 'High' | 'Medium' | 'Low';
  summary: string;
  factors: { factor: string; impact: string; weight: number }[];
  disclaimer: string; // "Opportunity score based on observed competitive gap. Not a ranking guarantee."
}

export interface ContactEnrichment {
  decisionMakerName?: string;
  firstName?: string;
  role?: string;
  primaryEmail?: string;
  emailFound: boolean;
  emailSource?: string;
  confidence: 'High' | 'Medium' | 'Low';
  websiteUrl?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  outreachChannel: 'Email' | 'Instagram DM' | 'Facebook Messenger' | 'Website Contact Form' | 'Direct';
}

export interface ColdEmail {
  id: string;
  subjectRecommended: string;
  subjectAlt1: string;
  subjectAlt2: string;
  body: string;
  wordCount: number;
  isUnder100Words: boolean;
  targetRank: number;
  recipientEmail?: string;
  recipientName: string;
  status: 'Draft' | 'Approved' | 'Sent' | 'Bounced' | 'Replied';
  validation: {
    isRealRank: boolean;
    isRealBusinessName: boolean;
    isUnder100Words: boolean;
    noFabricatedClaims: boolean;
    tailoredToTop3Status: boolean;
  };
}

export interface BusinessLead {
  id: string;
  workspaceId: string;
  executionId?: string;
  isDemo: boolean;
  businessName: string;
  category: string;
  primaryService: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  googleMapsUrl: string;
  placeCid?: string;
  isUnclaimed?: boolean;
  phone?: string;
  whatLacks?: string[];
  website?: string;
  hasWebsite: boolean;
  rating: number;
  reviewsCount: number;
  businessStatus: string;
  photosCount: number;
  currentRank: number;
  rankingGrid?: RankingGrid;
  competitorComparison?: CompetitorComparison;
  gbpAudit?: GBPAuditItem;
  websiteAudit?: WebsiteAuditItem;
  opportunityScore?: Top3OpportunityScore;
  actionPlan?: ActionPlan;
  evidence: EvidenceItem[];
  contact: ContactEnrichment;
  coldEmail?: ColdEmail;
  leadStatus: LeadStatus;
  researchNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Settings & Workspace
// --------------------------------------------------------------------------

export interface IntegrationSettings {
  googleMapsApiKey?: string;
  googleMapsStatus: 'connected' | 'not_configured' | 'error';
  geminiApiKey?: string;
  geminiStatus: 'connected' | 'not_configured' | 'error';
  useAiAnalysis: boolean;
  enableDemoMode: boolean;
  maxScrapeConcurrency: number;
  requestTimeoutSeconds: number;
  defaultSenderName: string;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  createdAt: string;
  settings: IntegrationSettings;
}
