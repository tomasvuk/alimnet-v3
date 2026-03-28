import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Cliente estándar para uso en la web (solo lectura pública por defecto)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// getAdminClient() SOLO debe usarse desde Server Components o API Routes.
// NUNCA desde archivos con 'use client'.
export const getAdminClient = () => {
    if (typeof window !== 'undefined') {
        throw new Error('[SECURITY] getAdminClient() no puede ser llamado desde el cliente');
    }
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey || serviceRoleKey === 'placeholder') {
        throw new Error('[SECURITY] SUPABASE_SERVICE_ROLE_KEY no está configurada');
    }
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}
