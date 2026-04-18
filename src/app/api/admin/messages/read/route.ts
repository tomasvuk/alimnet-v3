import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json();
    const adminClient = getAdminClient();

    if (type === 'CONTACT_FORM') {
      const { error } = await adminClient
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);
      if (error) throw error;
    } else {
      // Chatbot / Notifications
      const { data: current } = await adminClient
        .from('notifications')
        .select('metadata')
        .eq('id', id)
        .single();
      
      let metadata = current?.metadata || {};
      if (typeof metadata === 'string') {
        try { metadata = JSON.parse(metadata); } catch(e) { metadata = {}; }
      }

      const newMetadata = { ...metadata, admin_read: true };
      
      const { error } = await adminClient
        .from('notifications')
        .update({ 
          metadata: newMetadata,
          status: 'read' 
        })
        .eq('id', id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API READ ERROR]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
