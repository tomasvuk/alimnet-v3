-- =====================================================
-- SETUP ADMIN USER: info@alimnet.com
-- Correr en Supabase SQL Editor (con permisos de service_role)
-- =====================================================

-- PASO 1: Verificar si el usuario existe en auth.users
SELECT id, email, created_at
FROM auth.users
WHERE email = 'info@alimnet.com';

-- PASO 2: Si el usuario YA existe, actualizar su perfil a admin
-- (Reemplazar el <USER_ID> con el id del resultado del paso 1)
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = '<USER_ID>';

-- PASO 2b: Si el usuario existe pero NO tiene perfil, crear el perfil admin
-- INSERT INTO public.profiles (id, role, first_name)
-- VALUES ('<USER_ID>', 'admin', 'Admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- =====================================================
-- SCRIPT COMBINADO (corre esto si el usuario ya existe):
-- =====================================================
DO $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Buscar el user id
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'info@alimnet.com';

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'Usuario info@alimnet.com NO encontrado en auth.users. Debe crearse desde Supabase Dashboard > Authentication > Users > Add User';
  ELSE
    -- Upsert del perfil con rol admin
    INSERT INTO public.profiles (id, role, first_name, created_at, updated_at)
    VALUES (v_user_id, 'admin', 'Admin', NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET role = 'admin', updated_at = NOW();

    RAISE NOTICE 'OK: Perfil admin configurado para user_id: %', v_user_id;
  END IF;
END;
$$;
