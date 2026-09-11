'use client';

import React from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { WorkflowNode } from '@/lib/types';
import { NODE_REGISTRY } from '@/lib/workflow/nodeRegistry';

interface NodeConfigDrawerProps {
  node: WorkflowNode | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (nodeId: string, label: string, config: Record<string, any>) => void;
  onDeleteNode: (nodeId: string) => void;
}

export function NodeConfigDrawer({
  node,
  isOpen,
  onClose,
  onUpdateConfig,
  onDeleteNode
}: NodeConfigDrawerProps) {
  if (!isOpen || !node) return null;

  const definition = NODE_REGISTRY[node.data.type] || NODE_REGISTRY.google_maps_search;
  const [label, setLabel] = React.useState(node.data.label);
  const [config, setConfig] = React.useState<Record<string, any>>(node.data.config || {});

  const handleChange = (key: string, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdateConfig(node.id, label, config);
    onClose();
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100">Configure Node</h2>
          <p className="text-[11px] text-zinc-400 font-mono">{node.data.type}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        <div>
          <label className="block text-[11px] font-medium text-zinc-300 mb-1">Node Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
          />
        </div>

        {/* Dynamic Fields based on node type */}
        {node.data.type === 'google_maps_search' && (
          <>
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Search Query</label>
              <input
                type="text"
                value={config.query || 'Emergency Dentists in Austin, TX'}
                onChange={(e) => handleChange('query', e.target.value)}
                placeholder="e.g. Emergency Dentists in Austin, TX"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Location / City</label>
              <input
                type="text"
                value={config.location || 'Austin, TX'}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">Max Results</label>
                <select
                  value={config.maxResults || 50}
                  onChange={(e) => handleChange('maxResults', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
                >
                  <option value={25}>25 leads</option>
                  <option value={50}>50 leads</option>
                  <option value={100}>100 leads</option>
                  <option value={250}>250 leads</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-300 mb-1">Radius (km)</label>
                <select
                  value={config.radiusKm || 10}
                  onChange={(e) => handleChange('radiusKm', Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
                >
                  <option value={1}>1 km</option>
                  <option value={3}>3 km</option>
                  <option value={5}>5 km</option>
                  <option value={10}>10 km</option>
                  <option value={25}>25 km</option>
                </select>
              </div>
            </div>
          </>
        )}

        {node.data.type === 'email_generation' && (
          <>
            <div>
              <label className="block text-[11px] font-medium text-zinc-300 mb-1">Sender Name</label>
              <input
                type="text"
                value={config.senderName || 'Anuj'}
                onChange={(e) => handleChange('senderName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500 text-xs"
              />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="strictWords"
                checked={config.strictUnder100Words !== false}
                onChange={(e) => handleChange('strictUnder100Words', e.target.checked)}
                className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="strictWords" className="text-zinc-300 text-xs">
                Strict Under 100 Words Guarantee
              </label>
            </div>
          </>
        )}

        {node.data.type === 'ranking_grid' && (
          <div>
            <label className="block text-[11px] font-medium text-zinc-300 mb-1">Cardinal Grid Size</label>
            <input
              type="number"
              value={config.gridSize || 5}
              disabled
              className="w-full px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs cursor-not-allowed"
            />
            <p className="text-[10px] text-zinc-300 mt-1">Evaluates Center, North, South, East, and West points.</p>
          </div>
        )}

        <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-[11px] text-zinc-300">
          <div className="font-semibold text-zinc-300 mb-1">Description</div>
          <p>{definition.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 flex items-center justify-between">
        <button
          onClick={() => onDeleteNode(node.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 text-xs font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete Node</span>
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
