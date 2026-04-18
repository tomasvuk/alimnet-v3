import { NextResponse } from 'next/server';
import { getAdminClient } from '@/lib/supabase';

export async function GET() {
  try {
    const adminClient = getAdminClient();
    
    // 1. Contact Form Messages
    const { data: contactMsgs, error: contactError } = await adminClient
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (contactError) throw contactError;

    // 2. Chatbot Notifications
    const { data: chatNotifs, error: chatError } = await adminClient
      .from('notifications')
      .select('*')
      .eq('type', 'ADMIN_ALERT')
      .order('created_at', { ascending: false });
      
    if (chatError) throw chatError;

    return NextResponse.json({ 
      contact_messages: contactMsgs || [], 
      notifications: chatNotifs || [] 
    });
  } catch (error: any) {
    console.error('[API MESSAGES LIST ERROR]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
