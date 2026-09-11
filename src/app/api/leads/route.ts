import { NextRequest, NextResponse } from 'next/server';
import { serverStorage } from '@/lib/server/storage';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get('workspaceId') || undefined;
    const leads = serverStorage.getLeads(workspaceId);
    return NextResponse.json({ leads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    serverStorage.saveLead(body);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    serverStorage.deleteLead(id);

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'localrank-ai-31e78';
    if (projectId) {
      await fetch(
        `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/leads/${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      ).catch((e) => console.error('Error deleting from Firestore REST:', e));
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
