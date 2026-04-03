# 📧 Alimnet Mailing & Notification System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a premium automated mailing system using Resend and Supabase, with a centralized notification hub.

**Architecture:** A "Notification Center" approach where events trigger a record in a `notifications` table, which then triggers a Resend email via a Next.js API route.

**Tech Stack:** Next.js 16, Supabase, Resend SDK, React Email.

---

### Task 1: Supabase Notifications Table

**Files:**
- Create: `supabase/migrations/20240403000000_create_notifications.sql`

- [ ] **Step 1: Write SQL Migration**
```sql
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL, -- 'WELCOME', 'ADMIN_ALERT', 'VERIFICATION'
  priority INT DEFAULT 0,
  is_read BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'error'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Only admins can see all notifications, users see their own
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);
```

- [ ] **Step 2: Apply migration to Supabase**
Run: `npx supabase db push` (or use the Supabase Dashboard SQL Editor).
Expected: Table `notifications` exists in `public` schema.

- [ ] **Step 3: Commit**
```bash
git add supabase/migrations/
git commit -m "db: add notifications table for mailing system"
```

---

### Task 2: Resend Client & Basic Utility

**Files:**
- Create: `src/lib/mailing.ts`
- Modify: `.env.local`

- [ ] **Step 1: Verify API Key in .env.local**
Ensure `RESEND_API_KEY=your_resend_api_key_here` is present.

- [ ] **Step 2: Create Mailing Utility**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Alimnet <info@alimnet.com>',
      to,
      subject,
      react,
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
```

- [ ] **Step 3: Test with a script**
Create `scripts/test-resend.ts` and run it to send a test mail to yourself.

- [ ] **Step 4: Commit**
```bash
git add src/lib/mailing.ts
git commit -m "feat: setup resend client and mailing utility"
```

---

### Task 3: Welcome Email Template (React Email)

**Files:**
- Create: `src/components/emails/WelcomeEmail.tsx`

- [ ] **Step 1: Implement Welcome Component**
```tsx
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Img,
} from '@react-email/components';
import * as React from 'react';

export const WelcomeEmail = ({ userName }: { userName: string }) => (
  <Html>
    <Head />
    <Preview>Bienvenido a la red de alimentos cuidados más grande de Latinoamérica</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>¡Hola {userName}!</Heading>
        <Text style={text}>
          Estamos felices de que seas parte de **Alimnet**. Juntos estamos construyendo la red de soberanía alimentaria más grande de la región.
        </Text>
        <Section style={section}>
          <Link style={button} href="https://alimnet.com/explorar">
            Explorar el Mapa
          </Link>
        </Section>
        <Text style={footer}>
          Alimnet - Conectando alimentos con conciencia.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: '#f6f9fc', fontFamily: 'Inter, sans-serif' };
const container = { margin: '0 auto', padding: '20px 0 48px' };
const h1 = { color: '#333', fontSize: '24px', fontWeight: 'bold' };
const text = { color: '#555', fontSize: '16px', lineHeight: '26px' };
const section = { textAlign: 'center' as const, margin: '30px 0' };
const button = { backgroundColor: '#22c55e', color: '#fff', padding: '12px 20px', borderRadius: '8px', textDecoration: 'none' };
const footer = { color: '#8898aa', fontSize: '12px', textAlign: 'center' as const };
```

- [ ] **Step 2: Commit**
```bash
git add src/components/emails/WelcomeEmail.tsx
git commit -m "feat: add WelcomeEmail template"
```

---

### Task 4: API Dispatcher & Database Connection

**Files:**
- Create: `src/app/api/notifications/process/route.ts`

- [ ] **Step 1: Create Processor Route**
This route will be called to process pending notifications.
```typescript
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/mailing';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import React from 'react';

export async function POST(req: Request) {
  const { notificationId } = await req.json();

  const { data: notification, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('id', notificationId)
    .single();

  if (error || !notification) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Simple dispatcher logic
  if (notification.type === 'WELCOME') {
    await sendEmail({
      to: notification.metadata.email,
      subject: notification.title,
      react: React.createElement(WelcomeEmail, { userName: notification.metadata.name }),
    });
  }

  // Update status
  await supabase
    .from('notifications')
    .update({ status: 'sent', sent_at: new Date().toISOString() })
    .eq('id', notificationId);

  return NextResponse.json({ success: true });
}
```

- [ ] **Step 2: Commit**
```bash
git add src/app/api/notifications/process/route.ts
git commit -m "feat: add notification processor api"
```

---

### Task 5: Automation Trigger (Welcome Email)

**Files:**
- Modify: `src/app/registro/page.tsx` (or auth callback)

- [ ] **Step 1: Hook Registration with Notification**
When a user finishes registration, insert a record into the `notifications` table.

- [ ] **Step 2: Commit**
```bash
git commit -m "feat: trigger welcome notification on registration"
```
