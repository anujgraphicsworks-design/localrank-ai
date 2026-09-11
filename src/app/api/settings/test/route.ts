import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { provider, apiKey } = await req.json();

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: 'No API key provided. Demo mode fallback remains active.'
      });
    }

    if (provider === 'google_maps') {
      // Test request to Google Maps Places API
      try {
        const testUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Dentist&inputtype=textquery&fields=name&key=${apiKey}`;
        const res = await fetch(testUrl);
        const data = await res.json();
        if (data.status === 'OK' || data.status === 'ZERO_RESULTS') {
          return NextResponse.json({ success: true, message: 'Connected to Google Maps Platform successfully!' });
        } else {
          return NextResponse.json({
            success: false,
            message: `Google Maps API returned status: ${data.status} - ${data.error_message || ''}`
          });
        }
      } catch (err: any) {
        return NextResponse.json({ success: false, message: `Connection failed: ${err.message}` });
      }
    }

    if (provider === 'gemini') {
      try {
        const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const res = await fetch(testUrl);
        if (res.ok) {
          return NextResponse.json({ success: true, message: 'Connected to Google Gemini AI successfully!' });
        } else {
          return NextResponse.json({ success: false, message: `Gemini API returned status ${res.status}` });
        }
      } catch (err: any) {
        return NextResponse.json({ success: false, message: `Connection failed: ${err.message}` });
      }
    }

    return NextResponse.json({ success: false, message: 'Unknown provider' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
