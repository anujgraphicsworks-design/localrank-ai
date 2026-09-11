import React from 'react';
import { notFound } from 'next/navigation';
import { WorkflowCanvas } from '@/components/workflow/WorkflowCanvas';
import { getWorkflowById } from '@/lib/server/storage';
import { INITIAL_WORKFLOWS } from '@/lib/firebase/mockStore';

interface WorkflowEditorPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkflowEditorPage({ params }: WorkflowEditorPageProps) {
  const { id } = await params;
  let workflow = await getWorkflowById(id);

  if (!workflow) {
    workflow = INITIAL_WORKFLOWS.find((w) => w.id === id) || INITIAL_WORKFLOWS[0];
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <WorkflowCanvas initialWorkflow={workflow} />
    </div>
  );
}
