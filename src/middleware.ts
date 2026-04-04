import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/perfil', '/mi-cuenta', '/registro-comercio'];
const ADMIN_ROUTES = ['/admin'];
const SUPABASE_COOKIE_NAME = 'sb-keagrrvtzmsukcmzxqrl-auth-token';

function parseSupabaseCookie(cookieValue: string): { valid: boolean; expired: boolean; userId?: string } {
  try {
    const decoded = decodeURIComponent(cookieValue);
    const parsed = JSON.parse(decoded);

    let accessToken: string | null = null;
    if (parsed && typeof parsed === 'object' && parsed.access_token) {
      accessToken = parsed.access_token;
    } else if (Array.isArray(parsed) && parsed[0]) {
      accessToken = parsed[0];
    } else if (typeof parsed === 'string') {
      accessToken = parsed;
    }

    if (!accessToken) return { valid: false, expired: false };

    const parts = accessToken.split('.');
    if (parts.length !== 3) return { valid: false, expired: false };

    // Usamos atob para ser compatibles con Edge Runtime (Next.js Middleware)
    // Agregamos padding al base64url para evitar errores de longitud
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const payload = JSON.parse(atob(padded));
    const now = Math.floor(Date.now() / 1000);

    return {
      valid: true,
      // Damos un margen de 10 minutos (600s) por diferencia de relojes entre servidor y cliente
      expired: payload.exp ? payload.exp < (now - 600) : false,
      userId: payload.sub,
    };
  } catch (err) {
    console.error('Middleware Auth Error:', err);
    return { valid: false, expired: false };
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));

  if (!isAdminRoute && !isProtectedRoute) return NextResponse.next();

  const supabaseCookie = request.cookies.get(SUPABASE_COOKIE_NAME);
  const cookieValue = supabaseCookie?.value;

  if (!cookieValue) {
    console.log("No detecto cookie -> Login");
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectedFrom', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay cookie, lo dejamos pasar. 
  // La validación real se hace en el cliente (que es más robusto).
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/perfil/:path*',
    '/mi-cuenta/:path*',
    '/registro-comercio/:path*',
  ],
};
