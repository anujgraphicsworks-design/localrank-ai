import { NextRequest, NextResponse } from 'next/server';
import { WorkflowEngine } from '@/lib/workflow/engine';
import { getWorkflowById } from '@/lib/server/storage';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workflowId, workflow: customWorkflow } = body;

    let targetWorkflow = customWorkflow;
    if (!targetWorkflow && workflowId) {
      targetWorkflow = await getWorkflowById(workflowId);
    }

    if (!targetWorkflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 });
    }

    const engine = new WorkflowEngine();
    const execution = await engine.run(targetWorkflow);

    return NextResponse.json({ success: true, execution });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Workflow execution error' }, { status: 500 });
  }
}
