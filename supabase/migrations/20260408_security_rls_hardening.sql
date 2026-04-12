-- Migration: Hardening RLS Policies for sensitive tables
-- 2026-04-08

-- 1. CONTACT_MESSAGES (Hardening)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede enviar mensajes de contacto" ON public.contact_messages;
CREATE POLICY "Cualquiera puede enviar mensajes de contacto" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Solo admins pueden ver mensajes de contacto" ON public.contact_messages;
CREATE POLICY "Solo admins pueden ver mensajes de contacto" 
ON public.contact_messages FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 2. MERCHANTS (Hardening)
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública de comercios" ON public.merchants;
CREATE POLICY "Lectura pública de comercios" 
ON public.merchants FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Usuarios autenticados pueden sumar comercios" ON public.merchants;
CREATE POLICY "Usuarios autenticados pueden sumar comercios" 
ON public.merchants FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Creadores y admins pueden editar comercios" ON public.merchants;
CREATE POLICY "Creadores y admins pueden editar comercios" 
ON public.merchants FOR UPDATE 
USING (
  auth.uid() = created_by 
  OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 3. VALIDATIONS (Hardening)
ALTER TABLE public.validations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública de validaciones" ON public.validations;
CREATE POLICY "Lectura pública de validaciones" 
ON public.validations FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Usuarios autenticados pueden validar" ON public.validations;
CREATE POLICY "Usuarios autenticados pueden validar" 
ON public.validations FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Dueños de validación o admins pueden eliminar" ON public.validations;
CREATE POLICY "Dueños de validación o admins pueden eliminar" 
ON public.validations FOR DELETE 
USING (
  auth.uid() = user_id 
  OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- 4. NOTIFICATIONS (Hardening para el Admin Alert del Chatbot)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Usuarios ven sus propias notificaciones" ON public.notifications;
CREATE POLICY "Usuarios ven sus propias notificaciones" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins ven todas las notificaciones" ON public.notifications;
CREATE POLICY "Admins ven todas las notificaciones" 
ON public.notifications FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
