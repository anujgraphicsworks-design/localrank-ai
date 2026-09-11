/**
 * gap/index.ts - Competitor Analysis & Local SEO Gap Engine
 * Compares target business against Top 3 ranking competitors in Google Maps.
 */

import { CompetitorComparison, CompetitorItem } from '../../types';

export interface GapAnalysisInput {
  businessName: string;
  currentRank: number;
  reviewsCount: number;
  rating: number;
  hasWebsite: boolean;
  benchmarkTop3?: CompetitorItem[];
}

export const DEFAULT_AUSTIN_TOP3: CompetitorItem[] = [
  {
    id: 'comp-1',
    businessName: 'Austin Dental Works',
    rank: 1,
    rating: 4.9,
    reviewsCount: 215,
    hasWebsite: true,
    websiteUrl: 'https://austindentalworks.com',
    primaryCategory: 'Emergency Dental Service',
    photosCount: 42,
    hasDedicatedLandingPage: true,
    hasLocalSchema: true,
    keyAdvantage: '215 reviews, dedicated 24/7 emergency landing page, schema marked up with emergency hours'
  },
  {
    id: 'comp-2',
    businessName: 'Lone Star Urgent Dental',
    rank: 2,
    rating: 4.8,
    reviewsCount: 184,
    hasWebsite: true,
    websiteUrl: 'https://lonestarurgentdental.com',
    primaryCategory: 'Emergency Dentist',
    photosCount: 35,
    hasDedicatedLandingPage: true,
    hasLocalSchema: true,
    keyAdvantage: 'High monthly review velocity (14/mo), instant online appointment booking widget'
  },
  {
    id: 'comp-3',
    businessName: 'South Congress Dental 24/7',
    rank: 3,
    rating: 4.7,
    reviewsCount: 142,
    hasWebsite: true,
    websiteUrl: 'https://socodental.com',
    primaryCategory: 'Dental Clinic',
    photosCount: 28,
    hasDedicatedLandingPage: true,
    hasLocalSchema: false,
    keyAdvantage: 'Direct geo-targeted keyword in GMB title and 142 reviews'
  }
];

export function analyzeCompetitorGaps(input: GapAnalysisInput): CompetitorComparison {
  const {
    businessName,
    currentRank,
    reviewsCount,
    rating,
    hasWebsite,
    benchmarkTop3 = DEFAULT_AUSTIN_TOP3
  } = input;

  const avgTop3Reviews = Math.round(
    benchmarkTop3.reduce((acc, c) => acc + c.reviewsCount, 0) / benchmarkTop3.length
  );
  const avgTop3Rating = parseFloat(
    (benchmarkTop3.reduce((acc, c) => acc + c.rating, 0) / benchmarkTop3.length).toFixed(1)
  );

  const reviewDelta = Math.max(0, avgTop3Reviews - reviewsCount);
  const ratingDelta = parseFloat(Math.max(0, avgTop3Rating - rating).toFixed(1));

  let primaryGap = '';
  if (!hasWebsite) {
    primaryGap = 'Severe domain authority deficit: Missing linked website prevents competing with Top 3 authority signals.';
  } else if (reviewDelta > 80) {
    primaryGap = `Significant review deficit: Trails Top 3 competitors by ~${reviewDelta} verified reviews.`;
  } else if (currentRank > 3) {
    primaryGap = 'Missing high-intent localized service page (e.g. /emergency-dentist-austin) and LocalBusiness schema.';
  } else {
    primaryGap = 'Rank leader: Competitors are rapidly increasing review velocity to displace your 3-Pack spot.';
  }

  return {
    targetBusinessName: businessName,
    targetRank: currentRank,
    targetReviews: reviewsCount,
    targetRating: rating,
    top3Competitors: benchmarkTop3,
    reviewDeltaToTop3Avg: reviewDelta,
    ratingDeltaToTop3Avg: ratingDelta,
    primaryGap
  };
}
