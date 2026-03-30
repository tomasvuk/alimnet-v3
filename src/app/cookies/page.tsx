'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  fontWeight: '800',
  color: '#2D3A20',
  margin: '2rem 0 0.6rem',
  letterSpacing: '-0.01em',
};

const paragraphStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#4A5A38',
  lineHeight: 1.75,
  margin: '0 0 0.5rem',
  fontWeight: '500',
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: '#E8EDE2',
  margin: '1.5rem 0',
};

interface CookieRowProps {
  name: string;
  purpose: string;
  type: string;
  required: boolean;
}

function CookieRow({ name, purpose, type, required }: CookieRowProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr auto',
      gap: '1rem',
      padding: '0.9rem 1rem',
      borderRadius: '14px',
      background: '#F8F9F5',
      alignItems: 'center',
      marginBottom: '0.5rem',
    }}>
      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#2D3A20', fontFamily: 'monospace' }}>
        {name}
      </span>
      <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#4A5A38', lineHeight: 1.5 }}>
        {purpose}
      </span>
      <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#7A906A' }}>
        {type}
      </span>
      <span style={{
        fontSize: '0.7rem',
        fontWeight: '800',
        padding: '0.25rem 0.6rem',
        borderRadius: '20px',
        background: required ? '#F0F4ED' : '#FFF8EE',
        color: required ? '#5F7D4A' : '#B07D2E',
        whiteSpace: 'nowrap',
        letterSpacing: '0.05em',
      }}>
        {required ? 'ESENCIAL' : 'TERCERO'}
      </span>
    </div>
  );
}

export default function CookiesPage() {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Manrope', sans-serif; box-sizing: border-box; }
        @media (max-width: 600px) {
          .cookie-table { display: none !important; }
          .cookie-list { display: block !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#F8F9F5',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        <Header />

        <main style={{
          flex: 1,
          paddingTop: '70px',
          padding: '70px 1rem 4rem',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '40px',
            padding: 'clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem)',
            boxShadow: '0 4px 40px rgba(45, 58, 32, 0.07)',
            border: '1px solid #E8EDE2',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#F0F4ED',
              color: '#5F7D4A',
              borderRadius: '30px',
              padding: '0.35rem 1rem',
              fontSize: '0.7rem',
              fontWeight: '900',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}>
              Legal
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: '900',
              color: '#2D3A20',
              margin: '0 0 0.5rem',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Politica de Cookies
            </h1>

            <p style={{
              fontSize: '0.82rem',
              color: '#9AAB88',
              fontWeight: '600',
              margin: '0 0 0.5rem',
            }}>
              Ultima actualizacion: Marzo 2026
            </p>

            <div style={dividerStyle} />

            {/* Section 1 */}
            <h2 style={sectionHeadingStyle}>1. Que son las cookies</h2>
            <p style={paragraphStyle}>
              Las cookies son pequenos archivos de texto que los sitios web almacenan en
              tu navegador cuando los visitas. Permiten que el sitio recuerde informacion
              sobre tu visita, como tu sesion iniciada, para que no tengas que volver a
              ingresar tus datos cada vez que accedas.
            </p>
            <p style={paragraphStyle}>
              Las cookies pueden ser de sesion (se eliminan al cerrar el navegador) o
              persistentes (permanecen almacenadas por un periodo determinado).
            </p>

            <div style={dividerStyle} />

            {/* Section 2 */}
            <h2 style={sectionHeadingStyle}>2. Cookies que usamos</h2>
            <p style={paragraphStyle}>
              Alimnet utiliza unicamente las cookies estrictamente necesarias para el
              funcionamiento de la plataforma:
            </p>

            {/* Cookie table — desktop */}
            <div className="cookie-table" style={{ marginTop: '1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr 1fr auto',
                gap: '1rem',
                padding: '0.6rem 1rem',
                marginBottom: '0.3rem',
              }}>
                {['Cookie', 'Finalidad', 'Tipo', 'Estado'].map((h) => (
                  <span key={h} style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#9AAB88',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {h}
                  </span>
                ))}
              </div>
              <CookieRow
                name="sb-auth-token"
                purpose="Token de sesion de Supabase. Mantiene tu sesion iniciada en la plataforma."
                type="Sesion"
                required={true}
              />
            </div>

            {/* Cookie list — mobile fallback */}
            <div className="cookie-list" style={{ display: 'none', marginTop: '1rem' }}>
              <div style={{
                background: '#F8F9F5',
                borderRadius: '16px',
                padding: '1rem 1.2rem',
              }}>
                <p style={{ margin: '0 0 0.3rem', fontWeight: '800', fontSize: '0.9rem', color: '#2D3A20' }}>
                  sb-auth-token
                </p>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: '#4A5A38', fontWeight: '500', lineHeight: 1.5 }}>
                  Token de sesion de Supabase. Mantiene tu sesion iniciada en la plataforma.
                </p>
                <span style={{
                  fontSize: '0.7rem', fontWeight: '800', padding: '0.25rem 0.6rem',
                  borderRadius: '20px', background: '#F0F4ED', color: '#5F7D4A', letterSpacing: '0.05em',
                }}>
                  ESENCIAL
                </span>
              </div>
            </div>

            <div style={{
              marginTop: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '0.8rem 1rem',
                borderRadius: '14px',
                background: '#F0F4ED',
              }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>-</span>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#4A5A38', fontWeight: '600', lineHeight: 1.5 }}>
                  <strong>No usamos cookies de publicidad</strong> ni rastreo comportamental con fines comerciales.
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                padding: '0.8rem 1rem',
                borderRadius: '14px',
                background: '#F0F4ED',
              }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>-</span>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#4A5A38', fontWeight: '600', lineHeight: 1.5 }}>
                  <strong>No usamos cookies de rastreo de terceros</strong> para analisis de audiencia ni remarketing.
                </p>
              </div>
            </div>

            <div style={dividerStyle} />

            {/* Section 3 */}
            <h2 style={sectionHeadingStyle}>3. Cookies de terceros</h2>
            <p style={paragraphStyle}>
              Si elegis iniciar sesion con <strong>Google OAuth</strong>, Google puede
              establecer sus propias cookies durante el proceso de autenticacion. Estas
              cookies estan sujetas a la{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5F7D4A', fontWeight: '700' }}
              >
                Politica de Privacidad de Google
              </a>
              {' '}y no estan bajo el control de Alimnet.
            </p>
            <p style={paragraphStyle}>
              Fuera del proceso de autenticacion con Google, Alimnet no incorpora scripts
              ni herramientas de terceros que establezcan cookies de seguimiento.
            </p>

            <div style={dividerStyle} />

            {/* Section 4 */}
            <h2 style={sectionHeadingStyle}>4. Como desactivar las cookies</h2>
            <p style={paragraphStyle}>
              Podes configurar tu navegador para rechazar o eliminar cookies en cualquier
              momento. A continuacion encontras los enlaces de configuracion de los
              navegadores mas comunes:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              margin: '0.8rem 0',
            }}>
              {[
                { label: 'Google Chrome', href: 'https://support.google.com/chrome/answer/95647' },
                { label: 'Mozilla Firefox', href: 'https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-' },
                { label: 'Safari', href: 'https://support.apple.com/es-ar/guide/safari/sfri11471/mac' },
                { label: 'Microsoft Edge', href: 'https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    background: '#F8F9F5',
                    border: '1.5px solid #E4EBDD',
                    color: '#5F7D4A',
                    fontWeight: '700',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
            <div style={{
              background: '#FFF8EE',
              borderRadius: '14px',
              padding: '0.9rem 1.1rem',
              marginTop: '0.8rem',
              border: '1px solid #F0E0B8',
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.85rem',
                color: '#7A5C20',
                fontWeight: '600',
                lineHeight: 1.6,
              }}>
                Tene en cuenta que desactivar las cookies esenciales afectara el funcionamiento
                del inicio de sesion y no podras acceder a tu cuenta en Alimnet.
              </p>
            </div>

            <div style={dividerStyle} />

            {/* Section 5 */}
            <h2 style={sectionHeadingStyle}>5. Contacto</h2>
            <p style={paragraphStyle}>
              Para cualquier consulta relacionada con el uso de cookies en Alimnet,
              escribinos a <strong>info@alimnet.com</strong>.
            </p>

            <div style={dividerStyle} />

            {/* Disclaimer */}
            <div style={{
              background: '#F8F9F5',
              borderRadius: '16px',
              padding: '1rem 1.2rem',
              marginTop: '0.5rem',
            }}>
              <p style={{
                fontSize: '0.8rem',
                color: '#9AAB88',
                fontWeight: '600',
                margin: 0,
                lineHeight: 1.6,
              }}>
                Esta politica es informativa y no constituye asesoramiento legal.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '1.5rem 1rem',
          color: '#9AAB88',
          fontSize: '0.8rem',
          fontWeight: '600',
        }}>
          <span>2026 Alimnet — </span>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#5F7D4A',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: '700',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Volver al inicio
          </button>
        </footer>
      </div>
    </>
  );
}
