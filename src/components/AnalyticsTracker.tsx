'use client';

import { useEffect } from 'react';

export default function AnalyticsTracker() {
  useEffect(() => {
    const trackPageView = async () => {
      // Evitar tracking en localhost si no se desea
      if (window.location.hostname === 'localhost' && !localStorage.getItem('track_local')) return;

      try {
        const path = window.location.pathname;
        const referrer = document.referrer;
        const language = navigator.language;
        const sessionId = getSessionId();

        // Enviamos al proxy server-side para mayor precisión (GeoIP vía Vercel Headers)
        await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_type: 'PAGE_VIEW',
            payload: {
              path,
              referrer,
              language,
              sessionId
            }
          })
        });
      } catch (err) {
        // Silencio en errores de tracking para no afectar UX
      }
    };

    const getSessionId = () => {
      let sid = sessionStorage.getItem('alimnet_session_id');
      if (!sid) {
        sid = crypto.randomUUID();
        sessionStorage.setItem('alimnet_session_id', sid);
      }
      return sid;
    };

    trackPageView();
  }, []);

  return null;
}
