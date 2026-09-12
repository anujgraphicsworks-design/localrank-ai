'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getLeadById } from '@/lib/firebase/db';
import { BusinessLead } from '@/lib/types';
import { ensureLeadComplete } from '@/lib/providers/normalizeLead';
import {
  Printer,
  Compass,
  Check,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Globe,
  ExternalLink,
  Award,
  Radar
} from 'lucide-react';

export default function ClientReportPage() {
  const params = useParams();
  const id = params?.id as string;
  const [rawLead, setRawLead] = useState<BusinessLead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchLead() {
      if (!id) return;
      setLoading(true);

      try {
        const fetched = await getLeadById(id);
        if (fetched && isMounted) {
          setRawLead(fetched);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Direct Firestore fetch error, falling back:', err);
      }

      // Fallback to /api/leads
      try {
        const res = await fetch('/api/leads');
        if (res.ok) {
          const data = await res.json();
          const leads: BusinessLead[] = Array.isArray(data) ? data : (data.leads || []);
          const found = leads.find(
            (l) =>
              l.id === id ||
              l.id === decodeURIComponent(id) ||
              l.businessName.toLowerCase() === decodeURIComponent(id).toLowerCase()
          );
          if (found && isMounted) {
            setRawLead(found);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Fallback /api/leads fetch error:', err);
      }

      if (isMounted) {
        setLoading(false);
      }
    }

    fetchLead();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const lead = rawLead ? ensureLeadComplete(rawLead) : null;

  if (loading) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs font-mono">
        Loading client audit report...
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-12 text-center text-zinc-500 text-xs font-mono space-y-3">
        <div>Lead not found or report unavailable for ID: {id}</div>
        <a
          href="/leads"
          className="inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
        >
          Return to Leads
        </a>
      </div>
    );
  }

  const grid = lead.rankingGrid;
  const comp = lead.competitorComparison;
  const web = lead.websiteAudit;
  const gbp = lead.gbpAudit;
  const opp = lead.opportunityScore;
  const plan = lead.actionPlan;

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-6 md:p-10 font-sans text-zinc-200 print:bg-white print:text-black">
      {/* Print Control Bar (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Radar className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white">LocalRank AI Report</span>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Report Document Sheet */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-zinc-900/60 border border-zinc-800 p-8 md:p-12 space-y-10 shadow-2xl print:bg-white print:border-none print:shadow-none print:p-0 print:text-black">
        {/* Cover Header */}
        <div className="border-b border-zinc-800 print:border-gray-300 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Confidential Local SEO Audit &amp; Growth Strategy
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white print:text-black tracking-tight mt-1">
              {lead.businessName}
            </h1>
            <p className="text-xs text-zinc-400 print:text-gray-600 mt-1">
              Prepared for {lead.businessName} • {lead.city}, {lead.state} • Target Keyword: "{lead.primaryService}"
            </p>
          </div>

          <div className="text-left md:text-right print:text-right">
            <div className="text-xs text-zinc-500 print:text-gray-500 font-mono">Report Date</div>
            <div className="text-sm font-semibold text-zinc-300 print:text-black mt-0.5">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">3-Pack Gap Analysis</div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/80 print:bg-gray-50 border border-zinc-800 print:border-gray-200">
            <div className="text-[10px] text-zinc-400 print:text-gray-600 uppercase font-semibold">Observed Rank</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 print:text-emerald-700 mt-1">
              #{lead.currentRank}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">Google Maps Local Feed</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 print:bg-gray-50 border border-zinc-800 print:border-gray-200">
            <div className="text-[10px] text-zinc-400 print:text-gray-600 uppercase font-semibold">Top 3 Feasibility</div>
            <div className="text-2xl font-bold font-mono text-zinc-100 print:text-black mt-1">
              {opp?.score ?? 78}/100
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">High Revenue Potential</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 print:bg-gray-50 border border-zinc-800 print:border-gray-200">
            <div className="text-[10px] text-zinc-400 print:text-gray-600 uppercase font-semibold">Implementation Time</div>
            <div className="text-lg font-bold font-mono text-zinc-100 print:text-black mt-1">
              {(plan?.timelineLabel || (plan as any)?.timelineSummary || '45-60 Days').split('(')[0]}
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">3-Phase Action Sprint</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/80 print:bg-gray-50 border border-zinc-800 print:border-gray-200">
            <div className="text-[10px] text-zinc-400 print:text-gray-600 uppercase font-semibold">Website Tech Score</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 print:text-emerald-700 mt-1">
              {web?.scores.overall ?? 0}/100
            </div>
            <div className="text-[10px] text-zinc-500 mt-1">Conversion &amp; Schema Audit</div>
          </div>
        </div>

        {/* Section 1: 5-Point Ranking Grid */}
        {grid && (
          <div className="space-y-4">
            <div className="border-b border-zinc-800 print:border-gray-200 pb-2 flex items-center justify-between">
              <h2 className="text-base font-bold text-white print:text-black tracking-tight">
                1. Local Ranking Distribution (5-Point Cardinal Grid)
              </h2>
              <span className="text-[10px] text-zinc-500 font-mono">OBSERVED LOCAL DATA</span>
            </div>

            <p className="text-xs text-zinc-300 print:text-gray-700 leading-relaxed">
              Local search rankings on Google Maps vary based on searcher proximity and physical density. Below is the observed rank across 5 cardinal coordinates in {grid.searchCity}:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="p-4 rounded-xl bg-zinc-950 print:bg-gray-50 border border-zinc-800 print:border-gray-200 flex justify-center">
                <div className="grid grid-cols-3 gap-3 w-64 text-center text-xs">
                  <div />
                  <div className="p-2.5 rounded-lg bg-zinc-900 print:bg-white border border-zinc-800 print:border-gray-300">
                    <div className="text-[9px] text-zinc-500">NORTH</div>
                    <div className="font-mono font-bold text-zinc-200 print:text-black">#{grid.northRank}</div>
                  </div>
                  <div />

                  <div className="p-2.5 rounded-lg bg-zinc-900 print:bg-white border border-zinc-800 print:border-gray-300">
                    <div className="text-[9px] text-zinc-500">WEST</div>
                    <div className="font-mono font-bold text-zinc-200 print:text-black">#{grid.westRank}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 print:bg-emerald-100 border border-emerald-500/30 text-emerald-400 print:text-emerald-800">
                    <div className="text-[9px] font-bold">CENTER</div>
                    <div className="font-mono font-bold text-sm">#{grid.centerRank}</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 print:bg-white border border-zinc-800 print:border-gray-300">
                    <div className="text-[9px] text-zinc-500">EAST</div>
                    <div className="font-mono font-bold text-zinc-200 print:text-black">#{grid.eastRank}</div>
                  </div>

                  <div />
                  <div className="p-2.5 rounded-lg bg-zinc-900 print:bg-white border border-zinc-800 print:border-gray-300">
                    <div className="text-[9px] text-zinc-500">SOUTH</div>
                    <div className="font-mono font-bold text-zinc-200 print:text-black">#{grid.southRank}</div>
                  </div>
                  <div />
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-300 print:text-gray-700">
                <div className="flex justify-between py-1 border-b border-zinc-800 print:border-gray-200">
                  <span>Average Observed Position:</span>
                  <span className="font-mono font-bold">#{grid.averageRank}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800 print:border-gray-200">
                  <span>3-Pack Inbound Appearances:</span>
                  <span className="font-mono font-bold">{grid.threePackAppearances} / 5 sectors</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800 print:border-gray-200">
                  <span>Overall Local Visibility Index:</span>
                  <span className="font-mono font-bold text-emerald-400 print:text-emerald-700">{grid.visibilityPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Competitor Benchmarking */}
        {comp && (
          <div className="space-y-4">
            <div className="border-b border-zinc-800 print:border-gray-200 pb-2">
              <h2 className="text-base font-bold text-white print:text-black tracking-tight">
                2. Top 3 Competitor Gap Analysis
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 print:bg-gray-50 border border-zinc-800 print:border-gray-200 text-xs text-zinc-300 print:text-gray-700 space-y-1">
              <div className="font-semibold text-emerald-400 print:text-emerald-800">Primary Ranking Gap Identified:</div>
              <p>{comp.primaryGap}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(comp?.top3Competitors || []).map((c, idx) => (
                <div key={c.id || idx} className="p-4 rounded-xl bg-zinc-950 print:bg-gray-50 border border-zinc-800 print:border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-400 print:text-emerald-800">#{c.rank} 3-Pack Leader</span>
                    <span className="text-zinc-400 print:text-gray-600">{c.reviewsCount} reviews</span>
                  </div>
                  <div className="font-bold text-zinc-100 print:text-black">{c.businessName}</div>
                  <p className="text-[11px] text-zinc-400 print:text-gray-600 leading-relaxed">{c.keyAdvantage}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: 3-Phase Action Plan */}
        {plan && (
          <div className="space-y-4">
            <div className="border-b border-zinc-800 print:border-gray-200 pb-2">
              <h2 className="text-base font-bold text-white print:text-black tracking-tight">
                3. Recommended 3-Phase Strategic Roadmap
              </h2>
            </div>

            <div className="space-y-3">
              {(plan?.phases || []).map((ph, pIdx) => (
                <div key={ph.phase || pIdx} className="p-4 rounded-xl bg-zinc-950 print:bg-gray-50 border border-zinc-800 print:border-gray-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-400 print:text-emerald-800">
                    <span>{ph.name}</span>
                    <span className="font-mono text-zinc-400 print:text-gray-600">{ph.daysRange}</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {(ph.tasks || []).map((t, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-zinc-300 print:text-gray-800">
                        <span className="font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 print:bg-gray-200 text-zinc-300 print:text-gray-800 shrink-0">
                          {t.priority}
                        </span>
                        <span>{t.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
