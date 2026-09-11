/**
 * strategy/index.ts - Top 3 Opportunity Score, Timeline & Action Plan Engine
 * Calculates practical implementation timelines and high-impact action plans to reach Google 3-Pack.
 */

import { Top3OpportunityScore, ActionPlan } from '../../types';

export interface StrategyInput {
  currentRank: number;
  reviewsCount: number;
  rating: number;
  hasWebsite: boolean;
  category: string;
  city: string;
  reviewDelta: number;
}

export function calculateOpportunityScore(input: StrategyInput): Top3OpportunityScore {
  const { currentRank, reviewsCount, rating, hasWebsite, reviewDelta } = input;

  let baseScore = 50;
  let difficulty: 'Low' | 'Medium' | 'High' = 'Medium';
  let potential: 'High' | 'Medium' | 'Low' = 'High';
  const factors: { factor: string; impact: string; weight: number }[] = [];

  // Ranking proximity factor
  if (currentRank >= 4 && currentRank <= 9) {
    baseScore += 25;
    factors.push({ factor: `Observed Rank #${currentRank}`, impact: 'Sitting right outside the 3-Pack; moderate push required', weight: 30 });
    difficulty = 'Medium';
    potential = 'High';
  } else if (currentRank >= 10 && currentRank <= 15) {
    baseScore += 15;
    factors.push({ factor: `Observed Rank #${currentRank}`, impact: 'Second page visibility; needs structured citation & review sprint', weight: 25 });
    difficulty = 'Medium';
    potential = 'High';
  } else if (currentRank <= 3) {
    baseScore = 65;
    factors.push({ factor: `Rank #${currentRank} 3-Pack Leader`, impact: 'Already in 3-Pack; focus is defensive retention & lead capture', weight: 40 });
    difficulty = 'Low';
    potential = 'Medium';
  } else {
    baseScore += 5;
    factors.push({ factor: `Observed Rank #${currentRank}`, impact: 'Deep rank position; requires full profile rebuild', weight: 20 });
    difficulty = 'High';
    potential = 'Medium';
  }

  // Missing website upside
  if (!hasWebsite) {
    baseScore += 20;
    factors.push({ factor: 'No Website Linked to GMB', impact: 'Huge low-hanging fruit; launching a localized site triggers immediate ranking jumps', weight: 30 });
  }

  // Review deficit
  if (reviewDelta > 0 && reviewDelta <= 80) {
    baseScore += 10;
    factors.push({ factor: `Review Deficit (${reviewDelta} reviews)`, impact: 'Achievable via automated post-visit review SMS sequence', weight: 20 });
  }

  const finalScore = Math.max(20, Math.min(95, baseScore));

  const summary = currentRank <= 3
    ? `Dominates 3-Pack at #${currentRank}. High conversion opportunity by deploying automated missed-call lead capture.`
    : `Rank #${currentRank} with ${reviewsCount} reviews. Significant upside to enter Google 3-Pack within targeted timeline.`;

  return {
    score: finalScore,
    difficulty,
    potential,
    summary,
    factors,
    disclaimer: 'Opportunity score based on observed competitive gap. Not a ranking guarantee.'
  };
}

export function generateActionPlanAndTimeline(input: StrategyInput): ActionPlan {
  const { currentRank, hasWebsite, category, city, reviewDelta } = input;

  let days = 60;
  let timelineLabel = '45-60 Days (Citation Sync & Review Velocity Push)';
  let p1End = 15;
  let p2Start = 16;
  let p2End = 35;
  let p3Start = 36;

  if (!hasWebsite || reviewDelta > 120) {
    days = 90;
    timelineLabel = '75-90 Days (Full Profile Rebuild & Review Acceleration)';
    p1End = 15;
    p2Start = 16;
    p2End = 45;
    p3Start = 46;
  } else if (currentRank <= 3) {
    days = 30;
    timelineLabel = '15-30 Days (Rank Retention & Conversion Maximization)';
    p1End = 10;
    p2Start = 11;
    p2End = 20;
    p3Start = 21;
  } else if (currentRank <= 7) {
    days = 45;
    timelineLabel = '30-45 Days (Category Tuning, Schema & Review Velocity)';
    p1End = 10;
    p2Start = 11;
    p2End = 25;
    p3Start = 26;
  }

  const phases = [
    {
      phase: 1,
      name: `Phase 1: GMB Foundation & Core Signals (Days 1–${p1End})`,
      daysRange: `Days 1-${p1End}`,
      tasks: [
        {
          priority: 'P0' as const,
          task: `Audit & lock in primary GMB category to "${category}" and configure 4 secondary categories.`,
          impact: 'High' as const,
          difficulty: 'Low' as const,
          estimatedEffort: '1-2 hours'
        },
        {
          priority: 'P0' as const,
          task: 'Deploy automated post-service SMS review request campaign to past 60 days of clients.',
          impact: 'High' as const,
          difficulty: 'Medium' as const,
          estimatedEffort: '3-4 hours'
        },
        {
          priority: 'P1' as const,
          task: 'Upload 15+ geotagged high-resolution photos of premises, staff, and real client work.',
          impact: 'Medium' as const,
          difficulty: 'Low' as const,
          estimatedEffort: '2 hours'
        }
      ]
    },
    {
      phase: 2,
      name: `Phase 2: Local Authority & On-Page Dominance (Days ${p2Start}–${p2End})`,
      daysRange: `Days ${p2Start}-${p2End}`,
      tasks: [
        {
          priority: 'P0' as const,
          task: hasWebsite
            ? `Inject LocalBusiness / MedicalBusiness JSON-LD schema with exact coordinates and service taxonomy on website.`
            : `Deploy high-speed mobile landing page with LocalBusiness schema and link to GMB.`,
          impact: 'High' as const,
          difficulty: 'Medium' as const,
          estimatedEffort: hasWebsite ? '2 hours' : '6 hours'
        },
        {
          priority: 'P1' as const,
          task: 'Build & sync consistent NAP citations across top 40 local directories (Yelp, Apple Maps, Bing, YellowPages).',
          impact: 'Medium' as const,
          difficulty: 'Medium' as const,
          estimatedEffort: '4 hours'
        },
        {
          priority: 'P1' as const,
          task: `Embed official Google Maps driving directions and ${city} service area coverage on contact page.`,
          impact: 'Medium' as const,
          difficulty: 'Low' as const,
          estimatedEffort: '1 hour'
        }
      ]
    },
    {
      phase: 3,
      name: `Phase 3: Automated Lead-Capture & 3-Pack Domination (Days ${p3Start}–${days})`,
      daysRange: `Days ${p3Start}-${days}`,
      tasks: [
        {
          priority: 'P0' as const,
          task: 'Install automated Missed-Call Text-Back: instantly texts callers within 30 seconds if staff is busy.',
          impact: 'High' as const,
          difficulty: 'Low' as const,
          estimatedEffort: '2 hours'
        },
        {
          priority: 'P1' as const,
          task: 'Set up instant 24/7 web booking or emergency inquiry capture workflow routing directly to front desk.',
          impact: 'High' as const,
          difficulty: 'Medium' as const,
          estimatedEffort: '3 hours'
        },
        {
          priority: 'P2' as const,
          task: 'Monitor Google Maps 5-point rank grid weekly to measure 3-pack expansion across target neighborhood radius.',
          impact: 'Medium' as const,
          difficulty: 'Low' as const,
          estimatedEffort: 'Ongoing'
        }
      ]
    }
  ];

  return {
    overallStrategy: `Execute targeted 3-phase roadmap to eliminate the ${reviewDelta > 0 ? reviewDelta + ' review deficit' : 'local schema gap'} and lock in top ranking with automated conversion funnels.`,
    practicalTimelineDays: days,
    timelineLabel,
    confidence: 'High',
    phases
  };
}
