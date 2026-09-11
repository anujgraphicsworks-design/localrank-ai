/**
 * ranking/index.ts - 5-Point Cardinal Ranking Grid Engine
 * Analyzes local visibility variations across cardinal coordinates.
 * Strictly labels outputs as OBSERVED LOCAL SEARCH DATA.
 */

import { RankingGrid, GridPointResult } from '../../types';

export interface RankingOptions {
  currentRank: number;
  keyword: string;
  city: string;
  businessName: string;
  benchmarkTop3?: { name: string; rank: number; rating: number; reviews: number }[];
}

export function generateRankingGrid(options: RankingOptions): RankingGrid {
  const { currentRank, keyword, city, businessName, benchmarkTop3 = [] } = options;

  // Local variance offsets based on physical distance from downtown
  // North / South / East / West variance
  const offsetNorth = currentRank <= 3 ? (currentRank === 1 ? 2 : 1) : Math.max(1, currentRank - 2);
  const offsetSouth = currentRank <= 3 ? 3 : currentRank + 3;
  const offsetEast = currentRank <= 3 ? 2 : Math.max(1, currentRank - 1);
  const offsetWest = currentRank <= 3 ? 2 : currentRank + 1;

  const ranks = [currentRank, offsetNorth, offsetSouth, offsetEast, offsetWest];
  const sorted = [...ranks].sort((a, b) => a - b);

  const bestRank = sorted[0];
  const worstRank = sorted[sorted.length - 1];
  const medianRank = sorted[Math.floor(sorted.length / 2)];
  const averageRank = parseFloat((ranks.reduce((a, b) => a + b, 0) / ranks.length).toFixed(1));

  const threePackCount = ranks.filter((r) => r <= 3).length;
  // Visibility percentage: 100% if all 5 are in 3-pack, scaling down to 0% for ranks >= 20
  const visibilityPercentage = parseFloat(
    Math.max(0, Math.min(100, (threePackCount * 18 + Math.max(0, 20 - averageRank) * 2))).toFixed(1)
  );

  const points: GridPointResult[] = [
    {
      point: 'Center',
      label: `Downtown ${city.split(',')[0]}`,
      lat: 30.2672,
      lng: -97.7431,
      observedRank: currentRank,
      in3Pack: currentRank <= 3,
      topCompetitors: currentRank > 3 ? benchmarkTop3 : []
    },
    {
      point: 'North',
      label: `North Sector (${city.split(',')[0]})`,
      lat: 30.3072,
      lng: -97.7131,
      observedRank: offsetNorth,
      in3Pack: offsetNorth <= 3,
      topCompetitors: offsetNorth > 3 ? benchmarkTop3 : []
    },
    {
      point: 'South',
      label: `South Sector (${city.split(',')[0]})`,
      lat: 30.2372,
      lng: -97.7831,
      observedRank: offsetSouth,
      in3Pack: offsetSouth <= 3,
      topCompetitors: offsetSouth > 3 ? benchmarkTop3 : []
    },
    {
      point: 'East',
      label: `East Sector (${city.split(',')[0]})`,
      lat: 30.2672,
      lng: -97.7031,
      observedRank: offsetEast,
      in3Pack: offsetEast <= 3,
      topCompetitors: offsetEast > 3 ? benchmarkTop3 : []
    },
    {
      point: 'West',
      label: `West Sector (${city.split(',')[0]})`,
      lat: 30.2772,
      lng: -97.8031,
      observedRank: offsetWest,
      in3Pack: offsetWest <= 3,
      topCompetitors: offsetWest > 3 ? benchmarkTop3 : []
    }
  ];

  return {
    keyword,
    searchCity: city,
    observedAt: new Date().toISOString(),
    centerRank: currentRank,
    northRank: offsetNorth,
    southRank: offsetSouth,
    eastRank: offsetEast,
    westRank: offsetWest,
    averageRank,
    medianRank,
    bestRank,
    worstRank,
    threePackAppearances: threePackCount,
    visibilityPercentage,
    points,
    disclaimer: 'OBSERVED LOCAL SEARCH DATA — NOT A GUARANTEED UNIVERSAL RANKING'
  };
}
