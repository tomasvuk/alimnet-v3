import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/explorar';

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://keagrrvtzmsukcmzxqrl.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlYWdycnZ0em1zdWtjbXp4cXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxNDE0MDYsImV4cCI6MjA4ODcxNzQwNn0.LyOQfrO5ltk7WJgOQueCKIiWgTScS2jXa5xMqTy1-pc';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Check if profile is complete
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', data.session.user.id)
        .single();

      const isNewUser = !profile?.first_name || !profile?.last_name;
      const redirectUrl = isNewUser ? `${origin}/bienvenida` : `${origin}${next}`;
      
      const response = NextResponse.redirect(redirectUrl);
      
      // Optimizamos la cookie para móviles (Máximo 4kb)
      const essentialSession = {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      };
      
      const cookieName = 'sb-keagrrvtzmsukcmzxqrl-auth-token';
      const cookieValue = encodeURIComponent(JSON.stringify(essentialSession));
      
      response.cookies.set(cookieName, cookieValue, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60, // 30 días
        sameSite: 'lax',
        secure: true,
      });

      return response;
    }
  }

  // Return the user to an error page
  return NextResponse.redirect(`${origin}/login?error=auth-failure`);
}
