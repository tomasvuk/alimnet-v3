import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/explorar';
  
  // Usamos el host del request para asegurar la URL correcta en producción
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const baseUrl = `${protocol}://${host}`;

  console.log("[AUTH CALLBACK]: Iniciando proceso...", { baseUrl, next });

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keagrrvtzmsukcmzxqrl.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYWdycnZ0em1zdWtjbXp4cXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDE0MDYsImV4cCI6MjA4ODcxNzQwNn0.LyOQfrO5ltk7WJgOQueCKIiWgTScS2jXa5xMqTy1-pc';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      console.log("[AUTH CALLBACK]: Sesión de Google obtenida para:", data.session.user.email);

      // Verificamos perfil
      let isNewUser = true;
      try {
        const { data: profile, error: pError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', data.session.user.id)
          .maybeSingle(); // Usamos maybeSingle para no explotar si no existe
        
        if (profile?.first_name && profile?.last_name) {
          isNewUser = false;
        }
        console.log("[AUTH CALLBACK]: Estado del perfil:", { isNewUser, error: pError });
      } catch (err) {
        console.error("[AUTH CALLBACK]: Error buscando perfil, asumiendo nuevo usuario", err);
      }

      const redirectUrl = isNewUser ? `${baseUrl}/bienvenida` : `${baseUrl}${next}`;
      console.log("[AUTH CALLBACK]: Redirigiendo a:", redirectUrl);
      
      const response = NextResponse.redirect(redirectUrl);
      
      // Cookie de sesión rápida
      const essentialSession = {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      };
      
      response.cookies.set('sb-keagrrvtzmsukcmzxqrl-auth-token', encodeURIComponent(JSON.stringify(essentialSession)), {
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
        sameSite: 'lax',
        secure: true,
      });

      return response;
    } else {
      console.error("[AUTH CALLBACK]: Error en exchangeCodeForSession:", error);
    }
  }

  console.warn("[AUTH CALLBACK]: Falló el proceso, volviendo a login con error.");
  return NextResponse.redirect(`${baseUrl}/login?error=auth-failure`);
}
