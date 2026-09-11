import React from 'react';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/server/storage';
import { Swords, CheckCircle2, TrendingDown, ExternalLink } from 'lucide-react';

export default async function CompetitorsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Competitor Analysis & 3-Pack Benchmarks"
        subtitle="Side-by-side gap analysis comparing target leads against Top 3 Google Maps leaders"
      />

      <div className="p-6 space-y-6">
        <div className="space-y-6">
          {leads.map((lead) => {
            const comp = lead.competitorComparison;
            if (!comp) return null;

            return (
              <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-zinc-500">Target Lead</span>
                    <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2 mt-0.5">
                      <span>{lead.businessName}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                        Rank #{lead.currentRank}
                      </span>
                    </h3>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-amber-400 font-mono font-semibold">
                      Review Deficit: +{comp.reviewDeltaToTop3Avg} reviews
                    </span>
                    <div className="text-[11px] text-zinc-400">
                      Rating Gap: +{comp.ratingDeltaToTop3Avg}★ vs Top 3 average
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300">
                  <span className="text-zinc-500 font-semibold">Primary SEO Gap: </span>
                  <span>{comp.primaryGap}</span>
                </div>

                {/* Top 3 Competitors Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {comp.top3Competitors.map((c) => (
                    <div key={c.id} className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold text-[10px]">
                          Competitor #{c.rank}
                        </span>
                        <span className="font-mono text-zinc-400">{c.reviewsCount} reviews ({c.rating}★)</span>
                      </div>
                      <div className="font-semibold text-zinc-200 truncate">{c.businessName}</div>
                      <div className="text-[11px] text-zinc-400 leading-relaxed line-clamp-3">
                        {c.keyAdvantage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
