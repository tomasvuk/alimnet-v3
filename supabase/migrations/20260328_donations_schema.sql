-- Alimnet Donation Schema
-- 2026-03-28

-- 1. Table for one-time donations
CREATE TABLE IF NOT EXISTS public.user_donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL, -- 'ARS' | 'USD'
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'succeeded', 'failed'
    payment_method VARCHAR(50), -- 'mercadopago' | 'stripe'
    external_id VARCHAR(255), -- Gateway transaction ID
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Table for recurring subscriptions
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    gateway VARCHAR(20) NOT NULL, -- 'stripe' | 'mercadopago'
    external_id VARCHAR(255) UNIQUE NOT NULL, -- Subscription ID from gateway
    status VARCHAR(50) NOT NULL, -- 'active', 'past_due', 'cancelled', 'paused'
    amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for performance
CREATE INDEX IF NOT EXISTS user_donations_user_id_idx ON public.user_donations (user_id);
CREATE INDEX IF NOT EXISTS user_subscriptions_user_id_idx ON public.user_subscriptions (user_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.user_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Users can see their own donations
CREATE POLICY "Users can see their own donations" 
ON public.user_donations FOR SELECT 
USING (auth.uid() = user_id);

-- Users can see their own subscriptions
CREATE POLICY "Users can see their own subscriptions" 
ON public.user_subscriptions FOR SELECT 
USING (auth.uid() = user_id);
