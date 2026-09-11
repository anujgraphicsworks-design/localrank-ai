'use client';

import React from 'react';
import Link from 'next/link';
import {
  X,
  Play,
  Pause,
  Square,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  Terminal,
  ExternalLink,
  Users
} from 'lucide-react';
import { WorkflowExecution, Workflow } from '@/lib/types';

interface ExecutionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  execution: WorkflowExecution | null;
  workflow: Workflow | null;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
}

export function ExecutionDrawer({
  isOpen,
  onClose,
  execution,
  workflow,
  onPause,
  onResume,
  onStop
}: ExecutionDrawerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [execution?.logs]);

  if (!isOpen || !execution) return null;

  const totalSteps = workflow?.nodes.length || execution.totalSteps || 1;
  const currentStep = execution.currentStepIndex || 0;
  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  const isRunning = execution.status === 'running';
  const isCompleted = execution.status === 'completed';
  const isFailed = execution.status === 'failed';
  const isPaused = execution.status === 'paused';

  return (
    <div className="fixed inset-y-0 right-0 w-[480px] bg-zinc-950 border-l border-zinc-800/80 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            {isRunning ? (
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
            ) : isCompleted ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
              <span>Workflow Execution</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono uppercase font-semibold ${
                  isRunning
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : isCompleted
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {execution.status}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 truncate max-w-[260px]">{workflow?.name || 'LocalRank Pipeline'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <button
              onClick={onPause}
              title="Pause Workflow"
              className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
            </button>
          )}
          {isPaused && (
            <button
              onClick={onResume}
              title="Resume Workflow"
              className="p-1.5 rounded-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/30 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
            </button>
          )}
          {isRunning && (
            <button
              onClick={onStop}
              title="Stop Execution"
              className="p-1.5 rounded-md text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
            >
              <Square className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Metric Bar */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/30">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-medium text-zinc-300">Overall Pipeline Progress</span>
          <span className="font-mono text-emerald-400 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 font-mono">
          <span>
            Step: {currentStep} / {totalSteps}
          </span>
          <span>Processed: {execution.businessesProcessed} leads</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="p-4 border-b border-zinc-800/80 overflow-y-auto max-h-56 space-y-2">
        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">Execution Steps</div>
        {workflow?.nodes.map((node, idx) => {
          const status = execution.nodeStatuses?.[node.id] || 'queued';
          const isNodeRunning = status === 'running';
          const isNodeCompleted = status === 'completed';
          const isNodeFailed = status === 'failed';

          return (
            <div
              key={node.id}
              className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                isNodeRunning
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : isNodeCompleted
                  ? 'bg-zinc-900/40 text-zinc-300'
                  : isNodeFailed
                  ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
                  : 'text-zinc-400 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {isNodeRunning && <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin shrink-0" />}
                {isNodeCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                {isNodeFailed && <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                {status === 'queued' && <Circle className="w-3.5 h-3.5 text-zinc-600 shrink-0" />}
                <span className="font-medium truncate max-w-[280px]">{node.data.label}</span>
              </div>
              <span className="font-mono text-[10px] uppercase font-semibold">
                {status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Streaming Terminal Log */}
      <div className="flex-1 flex flex-col p-4 overflow-hidden bg-black/50">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2 font-mono">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span>LIVE EXECUTION STREAM</span>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto font-mono text-[11px] p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 space-y-1.5 text-zinc-300 select-text"
        >
          {execution.logs.map((log) => {
            let color = 'text-zinc-400';
            if (log.level === 'success') color = 'text-emerald-400 font-medium';
            if (log.level === 'warn') color = 'text-amber-400 font-medium';
            if (log.level === 'error') color = 'text-rose-400 font-bold';

            return (
              <div key={log.id} className="leading-relaxed">
                <span className="text-zinc-400 mr-2">[{log.timestamp}]</span>
                {log.nodeName && <span className="text-zinc-400 mr-1.5">&lt;{log.nodeName}&gt;</span>}
                <span className={color}>{log.message}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation */}
      {isCompleted && (
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Finished! Processed {execution.businessesProcessed} leads.</span>
          </div>
          <Link
            href="/leads"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>View in Leads</span>
          </Link>
        </div>
      )}
    </div>
  );
}
