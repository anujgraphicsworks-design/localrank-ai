'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { LeadTable } from '@/components/leads/LeadTable';
import { getLeads } from '@/lib/firebase/db';
import { BusinessLead } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function LeadsPage() {
  const [leads, setLeads] = useState<BusinessLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getLeads().then((data) => {
      if (active) {
        setLeads(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Local Business Leads Database"
        subtitle="Discovered local businesses with ranking positions, technical audits, contacts, and validated cold emails"
        actionButton={{
          label: 'Run Lead Gen Workflow',
          href: '/workflows/wf-leadgen-full',
          iconType: 'play'
        }}
      />

      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 space-y-3">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
            <p className="text-sm text-zinc-400">Loading leads from Cloud Firestore...</p>
          </div>
        ) : (
          <LeadTable leads={leads} />
        )}
      </div>
    </div>
  );
}
