/**
 * db.ts - Client Database Adapter with automatic server API persistence
 * Keeps local state responsive and synchronizes every action to server disk storage via /api.
 */

import { BusinessLead, Workflow, WorkflowExecution, IntegrationSettings } from '../types';
import { INITIAL_LEADS, INITIAL_WORKFLOWS, INITIAL_EXECUTIONS, INITIAL_SETTINGS } from './mockStore';

const isBrowser = typeof window !== 'undefined';

function getStorageItem<T>(key: string, fallback: T): T {
  if (!isBrowser) return fallback;
  try {
    const item = localStorage.getItem(`localrank_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`localrank_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to persist to localStorage for key ${key}:`, e);
  }
}

export async function getLeads(workspaceId: string = 'ws-default'): Promise<BusinessLead[]> {
  const stored = getStorageItem<BusinessLead[]>('leads', INITIAL_LEADS);
  return stored.filter((l) => !workspaceId || l.workspaceId === workspaceId);
}

export async function getLeadById(id: string): Promise<BusinessLead | null> {
  const leads = await getLeads();
  return leads.find((l) => l.id === id) || null;
}

export async function saveLead(lead: BusinessLead): Promise<void> {
  const leads = getStorageItem<BusinessLead[]>('leads', INITIAL_LEADS);
  const existingIdx = leads.findIndex((l) => l.id === lead.id);
  if (existingIdx >= 0) {
    leads[existingIdx] = { ...lead, updatedAt: new Date().toISOString() };
  } else {
    leads.unshift({ ...lead, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  setStorageItem('leads', leads);

  if (isBrowser) {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    }).catch((e) => console.error('Error syncing lead to server:', e));
  }
}

export async function updateLead(id: string, updates: Partial<BusinessLead>): Promise<void> {
  const leads = await getLeads();
  const existingIdx = leads.findIndex((l) => l.id === id);
  if (existingIdx >= 0) {
    const updated = { ...leads[existingIdx], ...updates, updatedAt: new Date().toISOString() };
    await saveLead(updated);
  }
}

export async function deleteLead(id: string): Promise<void> {
  const leads = getStorageItem<BusinessLead[]>('leads', INITIAL_LEADS);
  const filtered = leads.filter((l) => l.id !== id);
  setStorageItem('leads', filtered);

  if (isBrowser) {
    fetch(`/api/leads?id=${id}`, { method: 'DELETE' }).catch((e) =>
      console.error('Error syncing delete to server:', e)
    );
  }
}

export async function getWorkflows(workspaceId: string = 'ws-default'): Promise<Workflow[]> {
  const stored = getStorageItem<Workflow[]>('workflows', INITIAL_WORKFLOWS);
  return stored.filter((w) => !workspaceId || w.workspaceId === workspaceId);
}

export async function getWorkflowById(id: string): Promise<Workflow | null> {
  const workflows = await getWorkflows();
  return workflows.find((w) => w.id === id) || null;
}

export async function saveWorkflow(workflow: Workflow): Promise<void> {
  const workflows = getStorageItem<Workflow[]>('workflows', INITIAL_WORKFLOWS);
  const existingIdx = workflows.findIndex((w) => w.id === workflow.id);
  if (existingIdx >= 0) {
    workflows[existingIdx] = { ...workflow, updatedAt: new Date().toISOString() };
  } else {
    workflows.unshift({ ...workflow, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }
  setStorageItem('workflows', workflows);

  if (isBrowser) {
    fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow)
    }).catch((e) => console.error('Error syncing workflow to server:', e));
  }
}

export async function deleteWorkflow(id: string): Promise<void> {
  const workflows = getStorageItem<Workflow[]>('workflows', INITIAL_WORKFLOWS);
  const filtered = workflows.filter((w) => w.id !== id);
  setStorageItem('workflows', filtered);

  if (isBrowser) {
    fetch(`/api/workflows?id=${id}`, { method: 'DELETE' }).catch((e) =>
      console.error('Error syncing delete workflow to server:', e)
    );
  }
}

export async function getExecutions(workflowId?: string): Promise<WorkflowExecution[]> {
  const executions = getStorageItem<WorkflowExecution[]>('executions', INITIAL_EXECUTIONS);
  if (workflowId) {
    return executions.filter((e) => e.workflowId === workflowId);
  }
  return executions;
}

export async function saveExecution(execution: WorkflowExecution): Promise<void> {
  const executions = getStorageItem<WorkflowExecution[]>('executions', INITIAL_EXECUTIONS);
  const existingIdx = executions.findIndex((e) => e.id === execution.id);
  if (existingIdx >= 0) {
    executions[existingIdx] = execution;
  } else {
    executions.unshift(execution);
  }
  setStorageItem('executions', executions);

  if (isBrowser) {
    fetch('/api/executions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(execution)
    }).catch((e) => console.error('Error syncing execution to server:', e));
  }
}

export async function getSettings(): Promise<IntegrationSettings> {
  return getStorageItem<IntegrationSettings>('settings', INITIAL_SETTINGS);
}

export async function saveSettings(settings: IntegrationSettings): Promise<void> {
  setStorageItem('settings', settings);
  if (isBrowser) {
    fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    }).catch((e) => console.error('Error syncing settings to server:', e));
  }
}

export async function resetDemoData(): Promise<void> {
  setStorageItem('leads', INITIAL_LEADS);
  setStorageItem('workflows', INITIAL_WORKFLOWS);
  setStorageItem('executions', INITIAL_EXECUTIONS);
  setStorageItem('settings', INITIAL_SETTINGS);
}
