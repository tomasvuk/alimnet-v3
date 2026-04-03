# 📧 Spec: Alimnet Mailing & Notification System

## Status: Draft
## Date: 2026-04-03
## Author: Antigravity

---

## 1. Overview
Implement a robust, premium mailing system for **Alimnet v3** using **Resend** and **Supabase**. The goal is to provide automated communication (Welcome emails, Admin alerts) while building a foundation for an in-app "Notification Inbox".

## 2. Goals
- **Professionalism:** High deliverability (No Spam) via DNS verification (SPF/DKIM/DMARC).
- **Aesthetics:** Use React Email for premium, responsive templates.
- **Traceability:** Store all notifications in a Supabase table.
- **Automation:** Trigger emails on specific database events (New user, new merchant).

## 3. Architecture (Option A: Notification Center)

### 3.1 Components
1. **Mailing Engine:** [Resend](https://resend.com) (API-based, verified domain `alimnet.com`).
2. **Database:** Supabase `notifications` table.
3. **Mailing Service:** A centralized utility in `src/lib/mailing.ts` using the Resend SDK.
4. **Templates:** React components in `src/components/emails/`.
5. **Triggers:** Next.js Route Handlers (API) called by Supabase Webhooks or direct application calls.

### 3.2 Database Schema (`public.notifications`)
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key. |
| `user_id` | `uuid` | Recipient (references `auth.users`). |
| `title` | `text` | Subject line of the email/message. |
| `content` | `text` | Body of the message (markdown/JSON). |
| `type` | `text` | e.g., 'WELCOME', 'ADMIN_ALERT', 'VERIFICATION'. |
| `priority` | `int` | 0 (low) to 10 (high - critical alerts). |
| `is_read` | `boolean` | For the future in-app inbox. |
| `sent_at` | `timestamp`| When the email was actually sent. |
| `metadata` | `jsonb` | Additional context (e.g., merchant name). |

## 4. Key Email Flows

### 4.1 Welcome Email (The "Large Network" Welcome)
- **Trigger:** On `auth.users` insert.
- **Content:** "Bienvenido a la red de alimentos cuidados más grande de Latinoamérica".
- **CTA:** Complete profile / Explore map.

### 4.2 Admin Alerts (info@alimnet.com)
- **Trigger:** New merchant registration or verification request.
- **Recipient:** `info@alimnet.com` (Hardcoded for now).
- **Content:** Details of the new merchant + link to Admin Hub.

### 4.3 Business Verification
- **Trigger:** Admin approves a merchant.
- **Content:** "¡Tu comercio ha sido verificado en Alimnet!".

## 5. Security & Deliverability
- **SPF/DKIM/DMARC:** Configured in Vercel DNS (In progress/Verified).
- **API Security:** `RESEND_API_KEY` stored in `.env.local` (Never exposed to frontend).
- **Rate Limiting:** Managed by Resend Free Tier limits.

## 6. Testing Plan
- Create a test route `/api/test-email` to send a sample email to the developer.
- Manual verification of Supabase triggers during registration.

---

## 7. Future Scope
- **Inbox UI:** Profile section for users to read past notifications.
- **Unsubscribe:** Proper link management in compliance with anti-spam laws.
