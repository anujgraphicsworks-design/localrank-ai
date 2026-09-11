import React from 'react';
import { Header } from '@/components/layout/Header';
import { LeadTable } from '@/components/leads/LeadTable';
import { getLeads } from '@/lib/server/storage';
import { Play } from 'lucide-react';

export default async function LeadsPage() {
  const leads = await getLeads();

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
        <LeadTable leads={leads} />
      </div>
    </div>
  );
}
