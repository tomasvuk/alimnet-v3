import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/explorar';
  
  const host = request.headers.get('host');
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const origin = `${protocol}://${host}`;

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keagrrvtzmsukcmzxqrl.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYWdycnZ0em1zdWtjbXp4cXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDE0MDYsImV4cCI6MjA4ODcxNzQwNn0.LyOQfrO5ltk7WJgOQueCKIiWgTScS2jXa5xMqTy1-pc';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // ESTE PASO ES VITAL: Cambia el código por una sesión real
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Verificamos si es un usuario que necesita bienvenida
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', data.session.user.id)
        .maybeSingle();

      const isNewUser = !profile?.first_name || !profile?.last_name;
      const redirectUrl = isNewUser ? `${origin}/bienvenida` : `${origin}${next}`;
      
      const response = NextResponse.redirect(redirectUrl);
      
      // Guardamos la sesión en la cookie que usa el resto de la app
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
    }
  }

  // Si algo falló, al menos volvemos al login
  return NextResponse.redirect(`${origin}/login?error=auth-callback-error`);
}
