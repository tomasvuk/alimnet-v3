import { NextResponse } from 'next/server';
import { supabase, getAdminClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/mailing';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { AdminAlertEmail } from '@/components/emails/AdminAlertEmail';
import React from 'react';

// This API route will be called to process a notification
export async function POST(req: Request) {
  try {
    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 });
    }

    // 1. Fetch the notification from the database using admin privileges
    const adminClient = getAdminClient();
    const { data: notification, error: fetchError } = await adminClient
      .from('notifications')
      .select('*')
      .eq('id', notificationId)
      .single();

    if (fetchError || !notification) {
      console.error('Notification not found:', fetchError);
      return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
    }

    // 2. Dispatch the correct email type
    let emailResult;
    if (notification.type === 'WELCOME') {
      const emailTo = notification.metadata?.email;
      const userName = notification.metadata?.name || 'Amigo/a';
      const userLang = notification.metadata?.lang === 'es' ? 'es' : 'en';

      if (!emailTo) {
        throw new Error('Email address (metadata.email) is missing in notification record');
      }

      emailResult = await sendEmail({
        to: emailTo,
        subject: userLang === 'es' ? notification.title : 'Welcome to Alimnet!',
        react: React.createElement(WelcomeEmail, { userName, lang: userLang }),
      });
    } else if (notification.type === 'ADMIN_ALERT') {
      emailResult = await sendEmail({
        to: 'info@alimnet.com',
        subject: `[ADMIN ALERT] ${notification.title}`,
        react: React.createElement(AdminAlertEmail, {
          title: notification.title,
          content: notification.content,
          metadata: notification.metadata,
        }),
      });
    }

    // 3. Update notification status in database
    const { error: updateError } = await adminClient
      .from('notifications')
      .update({ 
        status: 'sent', 
        sent_at: new Date().toISOString() 
      })
      .eq('id', notificationId);

    if (updateError) {
      console.error('Error updating notification status:', updateError);
      // We don't throw here because the email was already sent
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email dispatched successfully',
      emailId: emailResult?.id
    });

  } catch (error: any) {
    console.error('Error in notification processor:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
