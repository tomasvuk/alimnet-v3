/**
 * Auth Utilities para Alimnet
 * Sincroniza la sesión de Supabase con las cookies que lee el Middleware.
 */

const SUPABASE_COOKIE_NAME = 'sb-keagrrvtzmsukcmzxqrl-auth-token';

/**
 * Guarda la sesión en una cookie para el middleware.
 * @param session La sesión de Supabase
 */
export function setAuthCookie(session: any) {
  if (!session) return;
  
  const cookieValue = encodeURIComponent(JSON.stringify(session));
  const maxAge = 30 * 24 * 60 * 60;
  
  // Establecer dominio para que funcione en alimnet.com y www.alimnet.com
  const domain = window.location.hostname.includes('alimnet.com') ? '; domain=.alimnet.com' : '';
  
  document.cookie = `${SUPABASE_COOKIE_NAME}=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax; Secure${domain}`;
  console.log("Auth Cookie synchronized (30 days) with domain:", domain || 'default');
}

/**
 * Elimina la cookie de sesión (usar al cerrar sesión).
 */
export function removeAuthCookie() {
  const domain = window.location.hostname.includes('alimnet.com') ? '; domain=.alimnet.com' : '';
  document.cookie = `${SUPABASE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure${domain}`;
  console.log("Auth Cookie removed from domain:", domain || 'default');
}
