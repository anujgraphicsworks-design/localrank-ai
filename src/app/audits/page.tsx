import React from 'react';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/server/storage';
import { ShieldCheck, Globe, Check, AlertTriangle, ExternalLink } from 'lucide-react';

export default async function AuditsPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="GBP & Website Technical Audits"
        subtitle="Automated inspection of SSL, Schema JSON-LD, title tags, mobile viewport, and Google Business Profile factors"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leads.map((lead) => {
            const web = lead.websiteAudit;
            const gbp = lead.gbpAudit;

            return (
              <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100">{lead.businessName}</h3>
                    <div className="text-xs text-zinc-400 mt-0.5">{lead.city}, {lead.state}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">Web Score</div>
                      <div className="text-base font-bold font-mono text-emerald-400">
                        {web?.scores.overall ?? 0}/100
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase font-semibold">GBP Score</div>
                      <div className="text-base font-bold font-mono text-blue-400">
                        {gbp?.score ?? 0}/100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Bar */}
                {web && (
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 grid grid-cols-5 gap-2 text-center text-xs">
                    <div>
                      <div className="text-[9px] text-zinc-500">Tech SEO</div>
                      <div className="font-mono font-bold text-zinc-200">{web.scores.technicalSeo}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500">Local SEO</div>
                      <div className="font-mono font-bold text-zinc-200">{web.scores.localSeo}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500">Content</div>
                      <div className="font-mono font-bold text-zinc-200">{web.scores.content}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500">Conversion</div>
                      <div className="font-mono font-bold text-zinc-200">{web.scores.conversion}</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-zinc-500">Trust</div>
                      <div className="font-mono font-bold text-zinc-200">{web.scores.trust}</div>
                    </div>
                  </div>
                )}

                {/* Key Findings */}
                <div className="space-y-1.5 text-xs text-zinc-300">
                  <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Critical Audit Findings
                  </div>
                  {web?.findings.slice(0, 2).map((f, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span className="line-clamp-1">{f}</span>
                    </div>
                  ))}
                  {gbp?.weaknesses.slice(0, 1).map((w, i) => (
                    <div key={i} className="flex items-start gap-2 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{w}</span>
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
