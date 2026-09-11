/**
 * templates.ts - Pre-configured Production Workflow Templates
 * Allows agencies to launch high-converting workflows in 1 click.
 */

import { Workflow } from '../types';
import { INITIAL_WORKFLOWS } from '../firebase/mockStore';

export const WORKFLOW_TEMPLATES: Workflow[] = [...INITIAL_WORKFLOWS];

export function getTemplateById(templateId: string): Workflow | undefined {
  return WORKFLOW_TEMPLATES.find((t) => t.id === templateId);
}

export function instantiateTemplate(templateId: string, customName?: string): Workflow {
  const template = getTemplateById(templateId) || WORKFLOW_TEMPLATES[0];
  const newId = `wf-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

  return {
    ...template,
    id: newId,
    name: customName || `${template.name} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'idle',
    lastExecutionId: undefined
  };
}
