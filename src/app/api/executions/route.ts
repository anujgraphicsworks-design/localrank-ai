import { NextRequest, NextResponse } from 'next/server';
import { serverStorage } from '@/lib/server/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workflowId = searchParams.get('workflowId') || undefined;
    const executions = serverStorage.getExecutions(workflowId);
    return NextResponse.json({ executions });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    serverStorage.saveExecution(body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
