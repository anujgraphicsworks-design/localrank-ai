import React from 'react';
import Link from 'next/link';
import { GitFork, Play, Plus, Clock, Sparkles, ChevronRight, Layers } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { getWorkflows } from '@/lib/server/storage';

export default async function WorkflowsListPage() {
  const workflows = await getWorkflows();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Visual Workflows"
        subtitle="Autonomous local SEO pipelines, node graph execution, and scheduled ranking trackers"
        actionButton={{
          label: 'New Workflow Canvas',
          href: '/workflows/wf-leadgen-full',
          iconType: 'plus'
        }}
      />

      <div className="p-6 space-y-6">
        {/* Templates Banner */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Pre-built Agency Workflows Ready to Deploy</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">
                Launch 1-click lead gen, competitor gap analysis, and cold outreach pipelines.
              </div>
            </div>
          </div>
          <Link
            href="/templates"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors"
          >
            <span>Explore Templates</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </Link>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="p-5 rounded-xl glass-panel flex flex-col justify-between space-y-4 hover:border-zinc-700 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase font-semibold">
                    {wf.triggerType}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {wf.nodes.length} Nodes
                  </span>
                </div>

                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {wf.name}
                </h3>
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {wf.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <Link
                  href={`/workflows/${wf.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Open &amp; Run Canvas</span>
                </Link>

                <span className="text-[10px] text-zinc-500 font-mono">
                  Updated: {wf.updatedAt.split('T')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
