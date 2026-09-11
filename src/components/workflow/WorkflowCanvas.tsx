'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant
} from '@xyflow/react';
import {
  Play,
  Save,
  Plus,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  Layers,
  ChevronDown
} from 'lucide-react';
import { CustomNode } from './CustomNode';
import { NodeConfigDrawer } from './NodeConfigDrawer';
import { ExecutionDrawer } from './ExecutionDrawer';
import { Workflow, WorkflowNode, WorkflowExecution } from '@/lib/types';
import { NODE_REGISTRY } from '@/lib/workflow/nodeRegistry';
import { WORKFLOW_TEMPLATES } from '@/lib/workflow/templates';
import { WorkflowEngine } from '@/lib/workflow/engine';
import { saveWorkflow } from '@/lib/firebase/db';

const nodeTypes = {
  customNode: CustomNode
};

interface WorkflowCanvasProps {
  initialWorkflow: Workflow;
}

export function WorkflowCanvas({ initialWorkflow }: WorkflowCanvasProps) {
  const [workflow, setWorkflow] = useState<Workflow>(initialWorkflow);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialWorkflow.nodes as unknown as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialWorkflow.edges as Edge[]);

  // Selection & Configuration Drawer
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Execution Drawer
  const [isExecuting, setIsExecuting] = useState(false);
  const [execution, setExecution] = useState<WorkflowExecution | null>(null);
  const [engineInstance, setEngineInstance] = useState<WorkflowEngine | null>(null);

  // Node Palette Modal
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNode(node as unknown as WorkflowNode);
      setIsConfigOpen(true);
    },
    []
  );

  const handleUpdateNodeConfig = useCallback(
    (nodeId: string, label: string, config: Record<string, any>) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === nodeId) {
            return {
              ...n,
              data: {
                ...n.data,
                label,
                config
              }
            };
          }
          return n;
        })
      );
    },
    [setNodes]
  );

  const handleDeleteNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      setIsConfigOpen(false);
      setSelectedNode(null);
    },
    [setNodes, setEdges]
  );

  const handleAddNode = (typeKey: string) => {
    const definition = NODE_REGISTRY[typeKey as keyof typeof NODE_REGISTRY];
    if (!definition) return;

    const newNodeId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'customNode',
      position: { x: 350 + Math.random() * 80, y: 200 + Math.random() * 80 },
      data: {
        label: definition.label,
        type: definition.type,
        config: { ...definition.defaultConfig },
        status: 'idle'
      }
    };

    setNodes((nds) => nds.concat(newNode));
    setIsPaletteOpen(false);
  };

  const handleLoadTemplate = (templateId: string) => {
    const t = WORKFLOW_TEMPLATES.find((x) => x.id === templateId);
    if (t) {
      setWorkflow(t);
      setNodes(t.nodes as unknown as Node[]);
      setEdges(t.edges as Edge[]);
      setIsTemplatesOpen(false);
    }
  };

  const handleSave = async () => {
    const updated: Workflow = {
      ...workflow,
      nodes: nodes as unknown as WorkflowNode[],
      edges: edges as any,
      updatedAt: new Date().toISOString()
    };
    await saveWorkflow(updated);
    setWorkflow(updated);
    alert('Workflow saved successfully!');
  };

  // Run Workflow natively
  const handleRun = async () => {
    const currentWf: Workflow = {
      ...workflow,
      nodes: nodes as unknown as WorkflowNode[],
      edges: edges as any
    };

    setIsExecuting(true);
    const engine = new WorkflowEngine();
    setEngineInstance(engine);

    try {
      const exec = await engine.run(currentWf, {
        onLog: (log) => {
          setExecution((prev) => (prev ? { ...prev, logs: [...prev.logs, log] } : null));
        },
        onStatusChange: (updatedExec) => {
          setExecution(updatedExec);
          // Update visual nodes status on canvas
          setNodes((nds) =>
            nds.map((n) => ({
              ...n,
              data: {
                ...n.data,
                status: updatedExec.nodeStatuses[n.id] || 'idle'
              }
            }))
          );
        }
      });
      setExecution(exec);
    } catch (e: any) {
      console.error('Run failed:', e);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-[#09090b] flex flex-col overflow-hidden select-none">
      {/* Canvas Top Toolbar */}
      <div className="h-14 px-5 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-xs font-semibold text-zinc-100">{workflow.name}</h2>
            <p className="text-[10px] text-zinc-300">Native Autonomous Workflow Canvas</p>
          </div>

          <button
            onClick={() => setIsTemplatesOpen(!isTemplatesOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 transition-colors ml-2"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Templates</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Node Button */}
          <button
            onClick={() => setIsPaletteOpen(!isPaletteOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Node</span>
          </button>

          {/* Save Workflow Button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-zinc-400" />
            <span>Save</span>
          </button>

          {/* Run Workflow Button */}
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02]"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Workflow</span>
          </button>
        </div>
      </div>

      {/* Templates Dropdown Modal */}
      {isTemplatesOpen && (
        <div className="absolute top-16 left-32 w-80 rounded-xl glass-panel p-2 shadow-2xl z-40 border border-zinc-800 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
            Select Pre-built Workflow
          </div>
          {WORKFLOW_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => handleLoadTemplate(t.id)}
              className="w-full text-left p-2.5 rounded-lg hover:bg-zinc-900/80 transition-colors group"
            >
              <div className="text-xs font-medium text-zinc-200 group-hover:text-emerald-400">{t.name}</div>
              <div className="text-[10px] text-zinc-300 line-clamp-2 mt-0.5">{t.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Add Node Palette Modal */}
      {isPaletteOpen && (
        <div className="absolute top-16 right-48 w-88 rounded-xl glass-panel p-3 shadow-2xl z-40 border border-zinc-800 max-h-[75vh] overflow-y-auto space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <span className="text-xs font-semibold text-zinc-200">Insert Workflow Node</span>
            <span className="text-[10px] text-zinc-300 font-mono">25 Nodes Available</span>
          </div>

          {['Trigger', 'Discovery', 'Audit & Rank', 'Strategy & AI', 'Outreach', 'Flow & Storage'].map((cat) => {
            const nodesInCat = Object.values(NODE_REGISTRY).filter((n) => n.category === cat);
            if (nodesInCat.length === 0) return null;

            return (
              <div key={cat} className="space-y-1">
                <div className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider px-1 pt-1">
                  {cat}
                </div>
                {nodesInCat.map((n) => (
                  <button
                    key={n.type}
                    onClick={() => handleAddNode(n.type)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/90 text-left transition-colors border border-transparent hover:border-zinc-800"
                  >
                    <div>
                      <div className="text-xs font-medium text-zinc-200">{n.label}</div>
                      <div className="text-[10px] text-zinc-300 line-clamp-1">{n.description}</div>
                    </div>
                    <Plus className="w-3.5 h-3.5 text-zinc-500 hover:text-emerald-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* React Flow Canvas */}
      <div className="flex-1 relative w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Background color="#1f1f23" gap={24} size={1.5} variant={BackgroundVariant.Dots} />
          <Controls />
          <MiniMap
            nodeColor={() => '#10b981'}
            maskColor="rgba(9, 9, 11, 0.7)"
          />
        </ReactFlow>
      </div>

      {/* Node Config Drawer */}
      <NodeConfigDrawer
        node={selectedNode}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onUpdateConfig={handleUpdateNodeConfig}
        onDeleteNode={handleDeleteNode}
      />

      {/* Live Execution Drawer */}
      <ExecutionDrawer
        isOpen={isExecuting}
        onClose={() => setIsExecuting(false)}
        execution={execution}
        workflow={workflow}
        onPause={() => engineInstance?.pause()}
        onResume={() => engineInstance?.resume()}
        onStop={() => engineInstance?.cancel()}
      />
    </div>
  );
}
