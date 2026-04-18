import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json();
    console.log(`[API READ]: Req for ID=${id}, Type=${type}`);
    const adminClient = getAdminClient();

    if (type === 'CONTACT_FORM') {
      const { error } = await adminClient
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);
      if (error) {
        console.error('[API READ]: Error Updating Contact Form:', error);
        throw error;
      }
    } else {
      // Chatbot / Notifications
      const { data: current, error: fetchError } = await adminClient
        .from('notifications')
        .select('metadata, status')
        .eq('id', id)
        .single();
      
      if (fetchError) {
        console.error('[API READ]: Error Fetching Notification:', fetchError);
        throw fetchError;
      }

      let metadata = current?.metadata || {};
      if (typeof metadata === 'string') {
        try { metadata = JSON.parse(metadata); } catch(e) { metadata = {}; }
      }

      const newMetadata = { ...metadata, admin_read: true };
      
      console.log(`[API READ]: Updating Notification ${id} to status=read`);
      const { error: updateError } = await adminClient
        .from('notifications')
        .update({ 
          metadata: newMetadata,
          status: 'read' 
        })
        .eq('id', id);
      
      if (updateError) {
        console.error('[API READ]: Error Updating Notification:', updateError);
        throw updateError;
      }
      console.log(`[API READ]: Successfully updated ${id}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API READ ERROR]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
