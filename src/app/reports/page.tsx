import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/server/storage';
import { FileText, ExternalLink, Printer, Award } from 'lucide-react';

export default async function ReportsListPage() {
  const leads = await getLeads();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Client-Facing SEO Audit Reports"
        subtitle="Branded, professional presentation reports ready to send to prospective clients or export as PDF"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {leads.map((lead) => (
            <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                    Rank #{lead.currentRank}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Opp Score: {lead.opportunityScore?.score ?? 75}/100
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-100">{lead.businessName}</h3>
                <p className="text-xs text-zinc-400">
                  {lead.category} • {lead.city}, {lead.state}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <Link
                  href={`/reports/${lead.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Full Report</span>
                </Link>

                <span className="text-[10px] text-zinc-500 font-mono">PDF Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
