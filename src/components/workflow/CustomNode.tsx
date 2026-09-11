'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import {
  MapPin,
  Database,
  Filter,
  Compass,
  Search,
  Users,
  ShieldCheck,
  Globe,
  Code,
  FileSearch,
  TrendingUp,
  Award,
  CheckSquare,
  Clock,
  Mail,
  Share2,
  Send,
  CheckCircle,
  Save,
  Download,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Repeat,
  GitMerge,
  Hourglass,
  Settings2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { NODE_REGISTRY } from '@/lib/workflow/nodeRegistry';
import { NodeType, NodeStatus, WorkflowNodeData } from '@/lib/types';

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Database,
  Filter,
  Compass,
  Search,
  Users,
  ShieldCheck,
  Globe,
  Code,
  FileSearch,
  TrendingUp,
  Award,
  CheckSquare,
  Clock,
  Mail,
  Share2,
  Send,
  CheckCircle,
  Save,
  Download,
  FileSpreadsheet,
  FileText,
  GitBranch,
  Repeat,
  GitMerge,
  Hourglass
};

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' },
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', glow: 'shadow-amber-500/20' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' },
  zinc: { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/30', glow: 'shadow-zinc-500/20' }
};

export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as WorkflowNodeData;
  const nodeType = (nodeData?.type as NodeType) || 'google_maps_search';
  const definition = NODE_REGISTRY[nodeType] || NODE_REGISTRY.google_maps_search;
  const status = (nodeData?.status as NodeStatus) || 'idle';
  const label = typeof nodeData?.label === 'string' ? nodeData.label : definition.label;
  const nodeConfig = (nodeData?.config as Record<string, any>) || {};

  const Icon = ICON_MAP[definition.iconName] || MapPin;
  const theme = COLOR_MAP[definition.color] || COLOR_MAP.emerald;

  const isRunning = status === 'running';
  const isCompleted = status === 'completed';
  const isFailed = status === 'failed';

  return (
    <div
      className={`w-64 rounded-xl glass-panel transition-all duration-200 select-none ${
        selected ? 'ring-2 ring-emerald-400/80 border-emerald-500/50 shadow-lg' : ''
      } ${isRunning ? 'node-running border-emerald-500' : ''}`}
    >
      {/* Input Handle (if applicable) */}
      {definition.inputs.length > 0 && (
        <Handle
          type="target"
          position={Position.Left}
          className="!bg-emerald-400 !w-3 !h-3 !-left-1.5"
        />
      )}

      {/* Node Header */}
      <div className="p-3.5 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg ${theme.bg} ${theme.border} border flex items-center justify-center ${theme.text}`}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-100 tracking-tight line-clamp-1">
              {label}
            </div>
            <div className="text-[10px] text-zinc-300 uppercase tracking-wider font-mono">
              {definition.category}
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1">
          {isRunning && <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />}
          {isCompleted && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
          {isFailed && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
          {status === 'idle' && <span className="w-2 h-2 rounded-full bg-zinc-600" />}
        </div>
      </div>

      {/* Node Body / Description */}
      <div className="p-3 text-[11px] text-zinc-300 leading-relaxed bg-zinc-950/40 rounded-b-xl">
        <p className="line-clamp-2">{definition.description}</p>

        {/* Quick config preview */}
        {nodeConfig && Object.keys(nodeConfig).length > 0 && (
          <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-300">
            <span className="truncate">
              {nodeConfig.query || nodeConfig.primaryKeyword || `${Object.keys(nodeConfig).length} params set`}
            </span>
            <span className="shrink-0 text-emerald-400">config</span>
          </div>
        )}
      </div>

      {/* Output Handle */}
      {definition.outputs.length > 0 && (
        <Handle
          type="source"
          position={Position.Right}
          className="!bg-emerald-400 !w-3 !h-3 !-right-1.5"
        />
      )}
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
