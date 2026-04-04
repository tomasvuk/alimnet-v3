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
  
  // Usar cookie estándar sin dominio explícito para máxima compatibilidad móvil
  document.cookie = `${SUPABASE_COOKIE_NAME}=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
  console.log("Cookie de sesión Alimnet sincronizada (30 días)");
}

/**
 * Elimina la cookie de sesión (usar al cerrar sesión).
 */
export function removeAuthCookie() {
  document.cookie = `${SUPABASE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure`;
  console.log("Cookie de sesión Alimnet eliminada");
}
