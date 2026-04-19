-- Migration: Fix missing columns and RLS for merchant recommendations
-- Created at: 2026-04-19

-- 1. Add missing created_by column to merchants
ALTER TABLE public.merchants 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 2. Add INSERT policy for notifications
-- This allows authenticated users to create notifications (like ADMIN_ALERTS)
DROP POLICY IF EXISTS "Usuarios pueden crear notificaciones" ON public.notifications;
CREATE POLICY "Usuarios pueden crear notificaciones" 
ON public.notifications FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Ensure created_by_type exists (just in case)
ALTER TABLE public.merchants 
ADD COLUMN IF NOT EXISTS created_by_type TEXT DEFAULT 'merchant';
