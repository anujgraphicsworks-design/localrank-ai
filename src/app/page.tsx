'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Compass,
  Users,
  Globe,
  Award,
  Mail,
  Send,
  ArrowUpRight,
  Play,
  TrendingUp,
  ShieldCheck,
  FileCheck2,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { getLeads, getExecutions } from '@/lib/firebase/db';
import { BusinessLead, WorkflowExecution } from '@/lib/types';

export default function DashboardPage() {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([getLeads(), getExecutions()]).then(([l, e]) => {
      if (active) {
        setLeads(l);
        setExecutions(e);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Metrics computation
  const totalDiscovered = leads.length;
  const inTop3 = leads.filter((l) => l.currentRank <= 3).length;
  const outsideTop3 = leads.filter((l) => l.currentRank > 3).length;
  const withoutWebsite = leads.filter((l) => !l.hasWebsite).length;
  const withWebsite = leads.filter((l) => l.hasWebsite).length;
  const emailsFound = leads.filter((l) => l.contact?.emailFound).length;
  const highOpportunity = leads.filter((l) => (l.opportunityScore?.score ?? 0) >= 75).length;

  const avgRank = totalDiscovered
    ? (leads.reduce((acc, l) => acc + l.currentRank, 0) / totalDiscovered).toFixed(1)
    : '0';

  const avgRating = totalDiscovered
    ? (leads.reduce((acc, l) => acc + l.rating, 0) / totalDiscovered).toFixed(1)
    : '0';

  const avgReviews = totalDiscovered
    ? Math.round(leads.reduce((acc, l) => acc + l.reviewsCount, 0) / totalDiscovered)
    : 0;

  const avgWebsiteScore = withWebsite
    ? Math.round(
        leads.filter((l) => l.hasWebsite).reduce((acc, l) => acc + (l.websiteAudit?.scores.overall || 0), 0) / withWebsite
      )
    : 0;

  const avgGBPScore = totalDiscovered
    ? Math.round(leads.reduce((acc, l) => acc + (l.gbpAudit?.score || 0), 0) / totalDiscovered)
    : 0;

  const avgOppScore = totalDiscovered
    ? Math.round(leads.reduce((acc, l) => acc + (l.opportunityScore?.score || 0), 0) / totalDiscovered)
    : 0;

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Agency Intelligence Dashboard"
        subtitle="Live metrics, local ranking benchmarks, and automated lead intelligence pipeline"
        actionButton={{
          label: 'Run Lead Gen Workflow',
          href: '/workflows/wf-leadgen-full',
          iconType: 'play'
        }}
      />

      <div className="p-6 space-y-6">
        {/* Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900/60 to-zinc-900/40 border border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Austin Emergency Dental Campaign Active</h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Observed {totalDiscovered} businesses in target radius. {outsideTop3} sitting outside the 3-Pack with high revenue loss.
              </p>
            </div>
          </div>
          <Link
            href="/leads"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all shrink-0"
          >
            <span>View Leads Database</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Primary KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Total Leads</span>
            <div className="text-2xl font-bold font-mono text-zinc-100">{totalDiscovered}</div>
            <div className="text-[10px] text-emerald-400 font-medium">100% Verified</div>
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Outside Top 3</span>
            <div className="text-2xl font-bold font-mono text-amber-300">{outsideTop3}</div>
            <div className="text-[10px] text-zinc-500">Prime agency outreach targets</div>
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">In 3-Pack</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">{inTop3}</div>
            <div className="text-[10px] text-zinc-500">Defensive / Lead-capture pitch</div>
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">No Website</span>
            <div className="text-2xl font-bold font-mono text-rose-400">{withoutWebsite}</div>
            <div className="text-[10px] text-rose-400/80 font-medium">Immediate $2k–$5k web project</div>
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">Public Emails</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">{emailsFound}</div>
            <div className="text-[10px] text-zinc-500">Zero spam or guess algorithms</div>
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-1">
            <span className="text-[11px] font-medium text-zinc-400">High Opportunity</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">{highOpportunity}</div>
            <div className="text-[10px] text-zinc-500">Score &gt;= 75 / 100</div>
          </div>
        </div>

        {/* Secondary Audit Benchmark Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Average Rank</div>
            <div className="text-lg font-bold font-mono text-zinc-200 mt-1">#{avgRank}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Average Rating</div>
            <div className="text-lg font-bold font-mono text-zinc-200 mt-1">{avgRating} ★</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avg Review Count</div>
            <div className="text-lg font-bold font-mono text-zinc-200 mt-1">{avgReviews}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avg GBP Score</div>
            <div className="text-lg font-bold font-mono text-zinc-200 mt-1">{avgGBPScore} / 100</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avg Web Score</div>
            <div className="text-lg font-bold font-mono text-zinc-200 mt-1">{avgWebsiteScore} / 100</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
            <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avg Opp Score</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-1">{avgOppScore} / 100</div>
          </div>
        </div>

        {/* Breakdown Charts & Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ranking Distribution */}
          <div className="p-5 rounded-xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Local Ranking Distribution</h4>
              <span className="text-[11px] font-mono text-zinc-500">Austin, TX</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">Google 3-Pack (#1 - #3)</span>
                  <span className="font-mono text-emerald-400">{inTop3} leads ({Math.round((inTop3 / totalDiscovered) * 100)}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(inTop3 / totalDiscovered) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">Mid-tier Visibility (#4 - #9)</span>
                  <span className="font-mono text-amber-400">
                    {leads.filter((l) => l.currentRank >= 4 && l.currentRank <= 9).length} leads
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{
                      width: `${(leads.filter((l) => l.currentRank >= 4 && l.currentRank <= 9).length / totalDiscovered) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">Invisible / Page 2+ (#10+)</span>
                  <span className="font-mono text-rose-400">
                    {leads.filter((l) => l.currentRank >= 10).length} leads
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-500"
                    style={{
                      width: `${(leads.filter((l) => l.currentRank >= 10).length / totalDiscovered) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Website Availability */}
          <div className="p-5 rounded-xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Website Availability</h4>
              <span className="text-[11px] font-mono text-zinc-500">Conversion Funnel</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">Has Connected Website</span>
                  <span className="font-mono text-emerald-400">{withWebsite} leads</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(withWebsite / totalDiscovered) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">NO Website Linked</span>
                  <span className="font-mono text-rose-400">{withoutWebsite} leads</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${(withoutWebsite / totalDiscovered) * 100}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">Missing LocalBusiness Schema</span>
                  <span className="font-mono text-amber-400">
                    {leads.filter((l) => l.hasWebsite && !l.websiteAudit?.hasSchema).length} sites
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{
                      width: `${(leads.filter((l) => l.hasWebsite && !l.websiteAudit?.hasSchema).length / totalDiscovered) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Workflow Executions */}
          <div className="p-5 rounded-xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Workflow History</h4>
              <Link href="/workflows" className="text-[11px] text-emerald-400 hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2 text-xs">
              {executions.slice(0, 3).map((exec) => (
                <div key={exec.id} className="p-2.5 rounded-lg bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-zinc-200 truncate max-w-[180px]">
                      Full Lead Gen Execution
                    </div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                      Processed: {exec.businessesProcessed} leads
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
                    {exec.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
