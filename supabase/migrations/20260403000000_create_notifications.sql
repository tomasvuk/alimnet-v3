-- Migration: Create notifications table
-- Created at: 2026-04-03

CREATE TABLE IF NOT EXISTS public.notifications (
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

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Delete existing policy if it exists to avoid errors on retry
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;

-- Create policy
CREATE POLICY "Users can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- Add a policy for admins to see everything (assuming admin role or specific UID)
-- For now, focused on the user's own view as per spec.
