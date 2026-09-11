'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { getLeads } from '@/lib/firebase/db';
import { BusinessLead } from '@/lib/types';
import { Mail, Copy, Check, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function EmailsPage() {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    getLeads().then(setLeads);
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Personalized Cold Outreach Center"
        subtitle="High-converting emails strictly under 100 words grounded in real Google Maps rank findings"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {leads.map((lead) => {
            const email = lead.coldEmail;
            if (!email) return null;

            return (
              <div key={lead.id} className="p-5 rounded-xl glass-panel space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-100">{lead.businessName}</h3>
                      <div className="text-[11px] text-zinc-400 mt-0.5">
                        To: <span className="font-mono text-emerald-400">{lead.contact?.primaryEmail || 'DM / Form Outreach'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                        {email.wordCount} words (&lt;100w)
                      </span>
                    </div>
                  </div>

                  {/* Subject Line Options */}
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80 space-y-1 text-xs font-mono">
                    <div className="text-[10px] font-semibold text-zinc-500 uppercase">Recommended Subject</div>
                    <div className="text-emerald-400 font-medium truncate">{email.subjectRecommended}</div>
                  </div>

                  {/* Body Preview */}
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs font-mono text-zinc-300 whitespace-pre-line leading-relaxed select-text">
                    {email.body}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Rank #{email.targetRank} Verified</span>
                  </div>

                  <button
                    onClick={() => handleCopy(email.id, email.body)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 transition-colors"
                  >
                    {copiedId === email.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === email.id ? 'Copied!' : 'Copy Script'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
