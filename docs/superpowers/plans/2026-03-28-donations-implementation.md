# Alimnet Donation Hub Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a secure, brand-aligned donation system with recurring (Stripe/MP) and one-time payments.

**Architecture:** Dual-path integration using Stripe Elements (Global) and Mercado Pago Bricks (LATAM/ARS), orchestrated via Next.js API Routes and Supabase.

**Tech Stack:** Next.js (App Router), Supabase, Stripe SDK, Mercado Pago SDK, Framer Motion.

---

### Task 1: Constants & Environment
**Files:**
- Create: `src/lib/donation-constants.ts`
- Modify: `.env.local`

- [ ] **Step 1: Define brand-aligned amounts and constants**
```typescript
export const DONATION_AMOUNTS = {
  ARS: {
    MONTHLY: [5000, 17000, 25000, 50000],
    ONCE: [5000, 12000, 40000, 60000],
    MIN_CUSTOM: 5000
  },
  USD: {
    MONTHLY: [5, 12, 30, 75],
    ONCE: [12, 40, 100, 250],
    MIN_CUSTOM: 5
  }
};
```
- [ ] **Step 2: Commit**

### Task 2: Database Schema (Supabase)
**Files:**
- Create: `supabase/migrations/20260328_donations_schema.sql`

- [ ] **Step 1: Create donations and subscriptions tables**
```sql
CREATE TABLE public.user_donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    amount DECIMAL NOT NULL,
    currency VARCHAR(3) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    payment_method VARCHAR(50),
    external_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    gateway VARCHAR(20) NOT NULL, -- 'stripe' | 'mercadopago'
    external_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    amount DECIMAL NOT NULL,
    currency VARCHAR(3) NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```
- [ ] **Step 2: Apply migration and commit**

### Task 3: Backend API (Stripe & MP)
**Files:**
- Create: `src/app/api/donations/create-intent/route.ts`
- Create: `src/app/api/donations/webhook/route.ts`

- [ ] **Step 1: Implement Stripe/MP Intent logic**
- [ ] **Step 2: Implement Webhook handlers for payment notification**
- [ ] **Step 3: Commit**

### Task 4: Frontend UI - Donation Hub
**Files:**
- Create: `src/components/donations/DonationHub.tsx`
- Create: `src/components/donations/AmountSelector.tsx`

- [ ] **Step 1: Build the UI with Framer Motion following the mockup**
- [ ] **Step 2: Integrate Stripe Elements and Mercado Pago Bricks SDKs**
- [ ] **Step 3: Commit**

### Task 5: User Dashboard & Cancellation
**Files:**
- Modify: `src/app/mi-cuenta/page.tsx`

- [ ] **Step 1: Show active subscription status**
- [ ] **Step 2: Implement cancellation logic (Stripe Portal + MP API)**
- [ ] **Step 3: Commit**
