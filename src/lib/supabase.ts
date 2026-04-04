import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keagrrvtzmsukcmzxqrl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYWdycnZ0em1zdWtjbXp4cXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDE0MDYsImV4cCI6MjA4ODcxNzQwNn0.LyOQfrO5ltk7WJgOQueCKIiWgTScS2jXa5xMqTy1-pc'

// Cliente estándar para uso en la web (solo lectura pública por defecto)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
})

// getAdminClient() SOLO debe usarse desde Server Components o API Routes.
// NUNCA desde archivos con 'use client'.
export const getAdminClient = () => {
    if (typeof window !== 'undefined') {
        throw new Error('[SECURITY] getAdminClient() no puede ser llamado desde el cliente');
    }
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceRoleKey || serviceRoleKey === 'placeholder') {
        console.error('⚠️ [SECURITY] SUPABASE_SERVICE_ROLE_KEY no está configurada. Las operaciones administrativas fallarán.');
        // No lanzamos para no romper el build, pero el cliente no funcionará realmente
        return createClient(supabaseUrl, 'missing-key');
    }
    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
}
