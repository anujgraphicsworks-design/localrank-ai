import { NextRequest, NextResponse } from 'next/server';
import { serverStorage } from '@/lib/server/storage';

export async function GET() {
  try {
    const settings = serverStorage.getSettings();
    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    serverStorage.saveSettings(body);
    return NextResponse.json({ success: true, settings: body });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
