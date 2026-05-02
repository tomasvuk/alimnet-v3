import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event_type, payload } = body;

    // Supabase Admin for bypass RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get Geo info from Vercel Headers (Super accurate)
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const province = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown';
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // Enrich payload with server-side info
    const enrichedPayload = {
      ...payload,
      country: country === 'Unknown' ? (payload.country || 'Unknown') : country,
      province: province === 'Unknown' ? (payload.province || 'Unknown') : province,
      city: city === 'Unknown' ? (payload.city || 'Unknown') : city,
      userAgent: userAgent
    };

    const { error } = await supabaseAdmin.from('system_events').insert({
      event_type,
      payload: enrichedPayload
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
