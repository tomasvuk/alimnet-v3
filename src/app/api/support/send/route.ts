import { NextResponse } from 'next/server';
import { supabase, getAdminClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/mailing';
import { AdminAlertEmail } from '@/components/emails/AdminAlertEmail';
import React from 'react';

export async function POST(req: Request) {
  try {
    const { message, lang = 'es', metadata = {} } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
    }

    // Capture user context if available (optional)
    const { data: { user } } = await supabase.auth.getUser();
    const senderEmail = user?.email || metadata.email || 'Visita Anónima';

    // 1. Create a notification record (Admin Alert) using Admin Client to bypass RLS
    const adminClient = getAdminClient();
    const { data: notif, error: insertError } = await adminClient
      .from('notifications')
      .insert({
        user_id: user?.id || null,
        title: lang === 'es' ? 'Nueva Consulta en Chatbot' : 'New Chatbot Query',
        content: message,
        type: 'ADMIN_ALERT',
        metadata: {
          ...metadata,
          email: senderEmail,
          lang: lang,
          origin: 'chatbot'
        }
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error recording notification:', insertError);
      // We continue to send the email anyway
    }

    // 2. Dispatch immediate email to admin
    await sendEmail({
      to: 'info@alimnet.com',
      subject: `[CHATBOT] Nueva consulta de ${senderEmail}`,
      react: React.createElement(AdminAlertEmail, {
        title: lang === 'es' ? 'Nueva Consulta en Chatbot' : 'New Chatbot Query',
        content: message,
        metadata: {
          ...metadata,
          email: senderEmail,
        },
      }),
    });

    // 3. Mark notification as sent if it was created
    if (notif) {
      await adminClient
        .from('notifications')
        .update({ status: 'sent', sent_at: new Date().toISOString() })
        .eq('id', notif.id);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Support API Error:', error);
    return NextResponse.json({ error: error.message || 'Error processing request' }, { status: 500 });
  }
}
