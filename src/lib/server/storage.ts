import fs from 'fs';
import path from 'path';
import { BusinessLead, Workflow, WorkflowExecution, IntegrationSettings } from '../types';
import { INITIAL_LEADS, INITIAL_WORKFLOWS, INITIAL_EXECUTIONS, INITIAL_SETTINGS } from '../firebase/mockStore';

const DATA_DIR = path.join(process.cwd(), '.data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (e) {
      console.error('Failed to create .data directory:', e);
    }
  }
}

function readJson<T>(filename: string, fallback: T): T {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    writeJson(filename, fallback);
    return fallback;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
}

function writeJson<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

export const serverStorage = {
  getLeads(workspaceId?: string): BusinessLead[] {
    const leads = readJson<BusinessLead[]>('leads.json', INITIAL_LEADS);
    if (!workspaceId) return leads;
    return leads.filter((l) => l.workspaceId === workspaceId);
  },

  getLeadById(id: string): BusinessLead | null {
    const leads = this.getLeads();
    return leads.find((l) => l.id === id) || null;
  },

  saveLead(lead: BusinessLead): void {
    const leads = this.getLeads();
    const idx = leads.findIndex((l) => l.id === lead.id);
    if (idx >= 0) {
      leads[idx] = { ...lead, updatedAt: new Date().toISOString() };
    } else {
      leads.unshift({ ...lead, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    writeJson('leads.json', leads);
  },

  deleteLead(id: string): void {
    const leads = this.getLeads().filter((l) => l.id !== id);
    writeJson('leads.json', leads);
  },

  getWorkflows(workspaceId?: string): Workflow[] {
    const workflows = readJson<Workflow[]>('workflows.json', INITIAL_WORKFLOWS);
    if (!workspaceId) return workflows;
    return workflows.filter((w) => w.workspaceId === workspaceId);
  },

  getWorkflowById(id: string): Workflow | null {
    const workflows = this.getWorkflows();
    return workflows.find((w) => w.id === id) || null;
  },

  saveWorkflow(workflow: Workflow): void {
    const workflows = this.getWorkflows();
    const idx = workflows.findIndex((w) => w.id === workflow.id);
    if (idx >= 0) {
      workflows[idx] = { ...workflow, updatedAt: new Date().toISOString() };
    } else {
      workflows.unshift({ ...workflow, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    writeJson('workflows.json', workflows);
  },

  deleteWorkflow(id: string): void {
    const workflows = this.getWorkflows().filter((w) => w.id !== id);
    writeJson('workflows.json', workflows);
  },

  getExecutions(workflowId?: string): WorkflowExecution[] {
    const executions = readJson<WorkflowExecution[]>('executions.json', INITIAL_EXECUTIONS);
    if (!workflowId) return executions;
    return executions.filter((e) => e.workflowId === workflowId);
  },

  saveExecution(execution: WorkflowExecution): void {
    const executions = this.getExecutions();
    const idx = executions.findIndex((e) => e.id === execution.id);
    if (idx >= 0) {
      executions[idx] = execution;
    } else {
      executions.unshift(execution);
    }
    writeJson('executions.json', executions);
  },

  getSettings(): IntegrationSettings {
    return readJson<IntegrationSettings>('settings.json', INITIAL_SETTINGS);
  },

  saveSettings(settings: IntegrationSettings): void {
    writeJson('settings.json', settings);
  },

  resetDemo(): void {
    writeJson('leads.json', INITIAL_LEADS);
    writeJson('workflows.json', INITIAL_WORKFLOWS);
    writeJson('executions.json', INITIAL_EXECUTIONS);
    writeJson('settings.json', INITIAL_SETTINGS);
  }
};

// Convenience functions for Server Components and API Routes
export const getLeads = (workspaceId?: string) => serverStorage.getLeads(workspaceId);
export const getLeadById = (id: string) => serverStorage.getLeadById(id);
export const saveLead = (lead: BusinessLead) => serverStorage.saveLead(lead);
export const deleteLead = (id: string) => serverStorage.deleteLead(id);
export const getWorkflows = (workspaceId?: string) => serverStorage.getWorkflows(workspaceId);
export const getWorkflowById = (id: string) => serverStorage.getWorkflowById(id);
export const saveWorkflow = (wf: Workflow) => serverStorage.saveWorkflow(wf);
export const deleteWorkflow = (id: string) => serverStorage.deleteWorkflow(id);
export const getExecutions = (wfId?: string) => serverStorage.getExecutions(wfId);
export const saveExecution = (exec: WorkflowExecution) => serverStorage.saveExecution(exec);
export const getSettings = () => serverStorage.getSettings();
export const saveSettings = (s: IntegrationSettings) => serverStorage.saveSettings(s);
export const resetDemoData = () => serverStorage.resetDemo();

if (typeof globalThis !== 'undefined') {
  (globalThis as any).__serverStorage = serverStorage;
}

