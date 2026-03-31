-- Migration: Add role column to profiles table
-- 2026-03-31

-- 1. Add role column with default 'user'
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user'
CHECK (role IN ('user', 'merchant', 'admin'));

-- 2. Index for fast role-based lookups
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles (role);

-- 3. Policy: admins can read ALL profiles (needed for admin dashboard)
DROP POLICY IF EXISTS "Admins pueden leer todos los perfiles" ON public.profiles;
CREATE POLICY "Admins pueden leer todos los perfiles"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id
  OR
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid() AND p.role = 'admin'
  )
);

-- Drop the old public read policy if it exists (replaced by above)
DROP POLICY IF EXISTS "Lectura pública perfiles" ON public.profiles;

-- 4. Policy: only the user or an admin can update a profile
DROP POLICY IF EXISTS "Usuarios editan su perfil" ON public.profiles;
CREATE POLICY "Usuarios editan su perfil"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);
