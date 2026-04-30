'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AnalyticsTracker() {
  useEffect(() => {
    const trackPageView = async () => {
      // Evitar tracking en localhost si no se desea
      if (window.location.hostname === 'localhost' && !localStorage.getItem('track_local')) return;

      try {
        // Obtenemos info básica del navegador
        const userAgent = navigator.userAgent;
        const language = navigator.language;
        const referrer = document.referrer;
        const path = window.location.pathname;

        // Intentamos obtener ubicación básica vía API gratuita (ipapi.co es limitada pero sirve de ejemplo)
        // Nota: En producción esto es mejor hacerlo del lado del servidor con headers de Vercel/Cloudflare
        let geoData = { country: 'Desconocido', province: 'Desconocido', city: 'Desconocido' };
        
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            geoData = {
              country: data.country_name || 'Desconocido',
              province: data.region || 'Desconocido',
              city: data.city || 'Desconocido'
            };
          }
        } catch (e) {
          console.warn("GeoIP tracking blocked or failed");
        }

        const sessionId = getSessionId();

        await supabase.from('system_events').insert({
          event_type: 'PAGE_VIEW',
          payload: {
            path,
            referrer,
            language,
            userAgent,
            ...geoData,
            sessionId
          }
        });
      } catch (err) {
        console.error("Analytics error:", err);
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
