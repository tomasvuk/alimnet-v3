import { NextResponse } from 'next/server';
import { supabase, getAdminClient } from '@/lib/supabase';
import { sendEmail } from '@/lib/mailing';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { AdminAlertEmail } from '@/components/emails/AdminAlertEmail';
import React from 'react';
import * as fs from 'fs';
import * as path from 'path';

const JSON_FILE_PATH = path.join(process.cwd(), 'src/lib/email-settings.json');

async function getTemplate(id: string) {
  try {
    const adminClient = getAdminClient();
    const { data, error } = await adminClient
      .from('email_templates')
      .select('subject, body')
      .eq('id', id)
      .single();
    
    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.error('Error fetching template from DB:', err);
  }

  try {
    const content = fs.readFileSync(JSON_FILE_PATH, 'utf-8');
    const templates = JSON.parse(content);
    return templates[id] || null;
  } catch (err) {
    console.error('Error fetching template from JSON:', err);
  }
  return null;
}

function formatEmailBody(body: string, vars: Record<string, string>) {
  let text = body;
  Object.entries(vars).forEach(([key, val]) => {
    text = text.replace(new RegExp(`{{${key}}}`, 'g'), val);
  });

  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const paragraphs = text.split('\n\n');
  const formattedParagraphs = paragraphs.map(p => {
    const withBrs = p.replace(/\n/g, '<br />');
    return `<p style="color: #4b5563; font-size: 16px; line-height: 26px; margin-bottom: 16px;">${withBrs}</p>`;
  });

  return formattedParagraphs.join('');
}

function wrapInBrandLayout(contentHtml: string, buttonText?: string, buttonUrl?: string) {
  const buttonHtml = buttonText && buttonUrl ? `
    <div style="text-align: center; margin: 32px 0;">
      <a style="background-color: #5F7D4A; border-radius: 12px; color: #fff; font-size: 16px; font-weight: bold; text-decoration: none; padding: 16px 32px; display: inline-block;" href="${buttonUrl}">
        ${buttonText}
      </a>
    </div>
  ` : '';

  return `
    <div style="background-color: #f6f9fc; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; padding: 40px 20px;">
      <div style="background-color: #ffffff; margin: 0 auto; padding: 40px; border-radius: 16px; max-width: 560px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        ${contentHtml}
        ${buttonHtml}
      </div>
    </div>
  `;
}

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
    } else if (notification.type === 'RECOMMENDATION_RECEIVED') {
      const emailTo = notification.metadata?.email;
      const userName = notification.metadata?.user_name || 'Amigo/a';
      const merchantName = notification.metadata?.merchant_name || 'Nuevo comercio';
      
      if (!emailTo) {
        throw new Error('Email address (metadata.email) is missing in notification record');
      }

      const template = await getTemplate('recommendation_received');
      const subject = template?.subject?.replace(/{{merchantName}}/g, merchantName) || `¡Recibimos tu recomendación de "${merchantName}"! 🌿`;
      const bodyText = template?.body || '';
      
      const contentHtml = formatEmailBody(bodyText, { userName, merchantName });
      const wrappedHtml = wrapInBrandLayout(contentHtml, 'Ver el Mapa de Alimnet', 'https://www.alimnet.com/explorar');

      emailResult = await sendEmail({
        to: emailTo,
        subject,
        react: React.createElement('div', { dangerouslySetInnerHTML: { __html: wrappedHtml } }),
      });
    } else if (notification.type === 'RECOMMENDATION_APPROVED') {
      const emailTo = notification.metadata?.email;
      const userName = notification.metadata?.user_name || 'Amigo/a';
      const merchantName = notification.metadata?.merchant_name || 'Tu comercio sugerido';
      const merchantId = notification.metadata?.merchant_id;
      
      if (!emailTo) {
        throw new Error('Email address (metadata.email) is missing in notification record');
      }

      const template = await getTemplate('recommendation_approved');
      const subject = template?.subject?.replace(/{{merchantName}}/g, merchantName) || `¡Tu recomendación de "${merchantName}" fue aceptada! 🎉`;
      const bodyText = template?.body || '';
      
      const contentHtml = formatEmailBody(bodyText, { userName, merchantName });
      const exploreUrl = merchantId ? `https://www.alimnet.com/explorar?id=${merchantId}` : 'https://www.alimnet.com/explorar';
      const wrappedHtml = wrapInBrandLayout(contentHtml, `Ver ${merchantName} en el Mapa`, exploreUrl);

      emailResult = await sendEmail({
        to: emailTo,
        subject,
        react: React.createElement('div', { dangerouslySetInnerHTML: { __html: wrappedHtml } }),
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
