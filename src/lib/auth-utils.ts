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
  
  // Guardamos SOLO lo esencial para no exceder los límites de cookies en móviles (4kb)
  const essentialSession = {
    access_token: session.access_token,
    refresh_token: session.refresh_token
  };
  
  const cookieValue = encodeURIComponent(JSON.stringify(essentialSession));
  const maxAge = 30 * 24 * 60 * 60;
  
  // Usar cookie estándar sin dominio explícito para máxima compatibilidad móvil
  document.cookie = `${SUPABASE_COOKIE_NAME}=${cookieValue}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
  console.log("Cookie de sesión Alimnet (Tokens optimizados) sincronizada.");
}

/**
 * Elimina la cookie de sesión (usar al cerrar sesión).
 */
export function removeAuthCookie() {
  document.cookie = `${SUPABASE_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax; Secure`;
  console.log("Cookie de sesión Alimnet eliminada");
}
