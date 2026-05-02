import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Verify admin
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const searchParams = req.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');

    let query = supabaseAdmin
      .from('system_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3000);

    if (startDate) {
      query = query.gt('created_at', startDate);
    }

    const { data: events, error } = await query;
    if (error) throw error;

    return NextResponse.json(events);
  } catch (e: any) {
    console.error('Analytics API error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
