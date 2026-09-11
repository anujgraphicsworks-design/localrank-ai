import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { WORKFLOW_TEMPLATES } from '@/lib/workflow/templates';
import { Sparkles, Play, Layers, Compass, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <Header
        title="Agency Workflow Templates"
        subtitle="Turnkey autonomous pipelines ready to run in one click or customize on the visual canvas"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKFLOW_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="p-6 rounded-2xl glass-panel space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-800 text-zinc-300">
                    {tmpl.nodes.length} Nodes Configured
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {tmpl.description}
                </p>

                {/* Node flow snippet */}
                <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                  {tmpl.nodes.slice(0, 4).map((node, i) => (
                    <React.Fragment key={node.id}>
                      <span className="text-[10px] px-2 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-300 font-medium">
                        {node.data.label}
                      </span>
                      {i < 3 && <ArrowRight className="w-3 h-3 text-zinc-600" />}
                    </React.Fragment>
                  ))}
                  {tmpl.nodes.length > 4 && (
                    <span className="text-[10px] text-zinc-500 font-mono">
                      +{tmpl.nodes.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <Link
                  href={`/workflows/${tmpl.id}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Template Canvas</span>
                </Link>

                <span className="text-[11px] text-zinc-500 font-mono uppercase">
                  {tmpl.triggerType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
