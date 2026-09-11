import React from 'react';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/server/storage';
import { Compass, AlertTriangle, ExternalLink } from 'lucide-react';

export default async function RankingsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Google Maps Rankings & Grid Intelligence"
        subtitle="Cardinal 5-point local ranking grid measurements across downtown, north, south, east, and west sectors"
      />

      <div className="p-6 space-y-6">
        {/* Cardinal Grid Disclaimer */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2.5 font-mono">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            OBSERVED LOCAL SEARCH DATA: Rankings vary based on searcher proximity, algorithm updates, and physical location. This represents observed point-in-time ranking, not a guaranteed universal ranking.
          </span>
        </div>

        {/* Lead Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leads.map((lead) => {
            const grid = lead.rankingGrid;
            if (!grid) return null;

            return (
              <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                          lead.currentRank <= 3
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        Rank #{lead.currentRank}
                      </span>
                      <h3 className="text-sm font-bold text-zinc-100">{lead.businessName}</h3>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      Keyword: <span className="font-mono text-zinc-300">"{grid.keyword}"</span> • {grid.searchCity}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-semibold text-emerald-400">
                      {grid.visibilityPercentage}% Visibility
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono">
                      3-Pack: {grid.threePackAppearances}/5 points
                    </div>
                  </div>
                </div>

                {/* 5-Point Display */}
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-3 w-64 text-center text-xs">
                    <div />
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-[9px] text-zinc-500 font-mono">NORTH</div>
                      <div className="font-mono font-bold text-zinc-200">#{grid.northRank}</div>
                    </div>
                    <div />

                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-[9px] text-zinc-500 font-mono">WEST</div>
                      <div className="font-mono font-bold text-zinc-200">#{grid.westRank}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <div className="text-[9px] font-bold">CENTER</div>
                      <div className="font-mono font-bold text-sm">#{grid.centerRank}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-[9px] text-zinc-500 font-mono">EAST</div>
                      <div className="font-mono font-bold text-zinc-200">#{grid.eastRank}</div>
                    </div>

                    <div />
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-[9px] text-zinc-500 font-mono">SOUTH</div>
                      <div className="font-mono font-bold text-zinc-200">#{grid.southRank}</div>
                    </div>
                    <div />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                  <span className="font-mono">Avg: #{grid.averageRank} • Best: #{grid.bestRank}</span>
                  <span className="text-[11px] text-zinc-500">Observed: {grid.observedAt.split('T')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
