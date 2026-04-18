-- Migration: Allow admins to update messages status
-- 2026-04-18

-- 1. CONTACT_MESSAGES
DROP POLICY IF EXISTS "Admins pueden actualizar mensajes de contacto" ON public.contact_messages;
CREATE POLICY "Admins pueden actualizar mensajes de contacto" 
ON public.contact_messages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 2. NOTIFICATIONS
DROP POLICY IF EXISTS "Admins pueden actualizar notificaciones" ON public.notifications;
CREATE POLICY "Admins pueden actualizar notificaciones" 
ON public.notifications FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
