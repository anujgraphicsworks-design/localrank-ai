/**
 * db.ts - Database Adapter with Cloud Firestore + LocalStorage fallback
 * Seamlessly syncs all data to Google Cloud Firestore with zero-latency local caching.
 */

import { BusinessLead, Workflow, WorkflowExecution, IntegrationSettings } from '../types';
import { INITIAL_LEADS, INITIAL_WORKFLOWS, INITIAL_EXECUTIONS, INITIAL_SETTINGS } from './mockStore';
import { getFirebaseApp } from './client';
import { collection, doc, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

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

// ----------------------------------------------------
// LEADS
// ----------------------------------------------------

export async function getLeads(workspaceId: string = 'ws-default'): Promise<BusinessLead[]> {
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const colRef = collection(db, 'leads');
        const snapshot = await getDocs(colRef);
        
        // Return documents directly from Firestore
        const remoteLeads = snapshot.docs.map((d) => d.data() as BusinessLead);
        remoteLeads.sort((a, b) => {
          const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        });
        setStorageItem('leads', remoteLeads);
        return remoteLeads.filter((l) => !workspaceId || l.workspaceId === workspaceId);
      }
    } catch (err) {
      console.warn('Firestore getLeads fallback:', err);
    }

    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const json = await res.json();
        if (json.leads && json.leads.length > 0) {
          setStorageItem('leads', json.leads);
          return json.leads.filter((l: any) => !workspaceId || l.workspaceId === workspaceId);
        }
      }
    } catch (apiErr) {
      console.warn('API getLeads fallback warning:', apiErr);
    }
  }

  const stored = getStorageItem<BusinessLead[]>('leads', INITIAL_LEADS);
  return stored.filter((l) => !workspaceId || l.workspaceId === workspaceId);
}

export async function getLeadById(id: string): Promise<BusinessLead | null> {
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const docRef = doc(db, 'leads', id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          return snapshot.data() as BusinessLead;
        }
      }
    } catch (err) {
      console.warn('Firestore getLeadById fallback:', err);
    }
  }
  const leads = await getLeads();
  return leads.find((l) => l.id === id) || null;
}

export async function saveLead(lead: BusinessLead): Promise<void> {
  const leads = getStorageItem<BusinessLead[]>('leads', []);
  const existingIdx = leads.findIndex((l) => l.id === lead.id);
  const now = new Date().toISOString();
  const updatedLead: BusinessLead = existingIdx >= 0
    ? { ...leads[existingIdx], ...lead, updatedAt: now }
    : { ...lead, createdAt: lead.createdAt || now, updatedAt: now };

  if (existingIdx >= 0) {
    leads[existingIdx] = updatedLead;
  } else {
    leads.unshift(updatedLead);
  }
  setStorageItem('leads', leads);

  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const cleanLead = JSON.parse(JSON.stringify(updatedLead));
        await setDoc(doc(db, 'leads', updatedLead.id), cleanLead, { merge: true });
      }
    } catch (err) {
      console.error('Firestore saveLead error:', err);
    }

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead)
      });
    } catch (e) {
      console.error('Error syncing lead to server:', e);
    }
  }
}

export async function updateLead(id: string, updates: Partial<BusinessLead>): Promise<void> {
  const leads = await getLeads();
  const existing = leads.find((l) => l.id === id);
  if (existing) {
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await saveLead(updated);
  }
}

export async function deleteLead(id: string): Promise<void> {
  const leads = getStorageItem<BusinessLead[]>('leads', []);
  const filtered = leads.filter((l) => l.id !== id);
  setStorageItem('leads', filtered);

  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        await deleteDoc(doc(db, 'leads', id));
      }
    } catch (err) {
      console.error('Firestore deleteLead error:', err);
    }

    try {
      await fetch(`/api/leads?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Error syncing delete to server:', e);
    }
  }
}

// ----------------------------------------------------
// WORKFLOWS
// ----------------------------------------------------

export async function getWorkflows(workspaceId: string = 'ws-default'): Promise<Workflow[]> {
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const colRef = collection(db, 'workflows');
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          const remoteWfs = snapshot.docs.map((d) => d.data() as Workflow);
          setStorageItem('workflows', remoteWfs);
          return remoteWfs.filter((w) => !workspaceId || w.workspaceId === workspaceId);
        }
      }
    } catch (err) {
      console.warn('Firestore getWorkflows warning:', err);
    }
  }

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
  const now = new Date().toISOString();
  const updatedWf: Workflow = existingIdx >= 0
    ? { ...workflows[existingIdx], ...workflow, updatedAt: now }
    : { ...workflow, createdAt: workflow.createdAt || now, updatedAt: now };

  if (existingIdx >= 0) {
    workflows[existingIdx] = updatedWf;
  } else {
    workflows.unshift(updatedWf);
  }
  setStorageItem('workflows', workflows);

  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const cleanWf = JSON.parse(JSON.stringify(updatedWf));
        await setDoc(doc(db, 'workflows', updatedWf.id), cleanWf, { merge: true });
      }
    } catch (err) {
      console.error('Firestore save workflow error:', err);
    }

    try {
      await fetch('/api/workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWf)
      });
    } catch (e) {
      console.error('Error syncing workflow to server:', e);
    }
  }
}

export async function deleteWorkflow(id: string): Promise<void> {
  const workflows = getStorageItem<Workflow[]>('workflows', INITIAL_WORKFLOWS);
  const filtered = workflows.filter((w) => w.id !== id);
  setStorageItem('workflows', filtered);

  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        await deleteDoc(doc(db, 'workflows', id));
      }
    } catch (err) {
      console.error('Firestore delete workflow error:', err);
    }

    try {
      await fetch(`/api/workflows?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Error syncing delete workflow to server:', e);
    }
  }
}

// ----------------------------------------------------
// EXECUTIONS
// ----------------------------------------------------

export async function getExecutions(workflowId?: string): Promise<WorkflowExecution[]> {
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const colRef = collection(db, 'executions');
        const snapshot = await getDocs(colRef);
        if (!snapshot.empty) {
          const remoteExecs = snapshot.docs.map((d) => d.data() as WorkflowExecution);
          setStorageItem('executions', remoteExecs);
          return workflowId ? remoteExecs.filter((e) => e.workflowId === workflowId) : remoteExecs;
        }
      }
    } catch (err) {
      console.warn('Firestore getExecutions warning:', err);
    }
  }

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
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const cleanExec = JSON.parse(JSON.stringify(execution));
        await setDoc(doc(db, 'executions', execution.id), cleanExec, { merge: true });
      }
    } catch (err) {
      console.error('Firestore save execution error:', err);
    }

    try {
      await fetch('/api/executions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(execution)
      });
    } catch (e) {
      console.error('Error syncing execution to server:', e);
    }
  }
}

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------

export async function getSettings(): Promise<IntegrationSettings> {
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const docRef = doc(db, 'settings', 'global');
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const remoteSettings = snapshot.data() as IntegrationSettings;
          setStorageItem('settings', remoteSettings);
          return remoteSettings;
        }
      }
    } catch (err) {
      console.warn('Firestore getSettings warning:', err);
    }
  }

  return getStorageItem<IntegrationSettings>('settings', INITIAL_SETTINGS);
}

export async function saveSettings(settings: IntegrationSettings): Promise<void> {
  setStorageItem('settings', settings);
  if (isBrowser) {
    try {
      const { db, isConfigured } = getFirebaseApp();
      if (isConfigured && db) {
        const cleanSettings = JSON.parse(JSON.stringify(settings));
        await setDoc(doc(db, 'settings', 'global'), cleanSettings, { merge: true });
      }
    } catch (err) {
      console.error('Firestore save settings error:', err);
    }

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
    } catch (e) {
      console.error('Error syncing settings to server:', e);
    }
  }
}

export async function resetDemoData(): Promise<void> {
  setStorageItem('leads', INITIAL_LEADS);
  setStorageItem('workflows', INITIAL_WORKFLOWS);
  setStorageItem('executions', INITIAL_EXECUTIONS);
  setStorageItem('settings', INITIAL_SETTINGS);
}
