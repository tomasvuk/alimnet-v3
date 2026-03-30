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

const listStyle: React.CSSProperties = {
  paddingLeft: '1.4rem',
  margin: '0.4rem 0 0.8rem',
};

const listItemStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#4A5A38',
  lineHeight: 1.75,
  fontWeight: '500',
  marginBottom: '0.3rem',
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  background: '#E8EDE2',
  margin: '1.5rem 0',
};

export default function PrivacidadPage() {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Manrope', sans-serif; box-sizing: border-box; }
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
            {/* Header block */}
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
              Politica de Privacidad
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
            <h2 style={sectionHeadingStyle}>1. Responsable del tratamiento</h2>
            <p style={paragraphStyle}>
              El responsable del tratamiento de tus datos personales es <strong>Alimnet</strong>.
              Para cualquier consulta relacionada con tus datos personales, podras contactarnos
              en <strong>info@alimnet.com</strong>.
            </p>

            <div style={dividerStyle} />

            {/* Section 2 */}
            <h2 style={sectionHeadingStyle}>2. Datos que recopilamos</h2>
            <p style={paragraphStyle}>Recopilamos los siguientes datos personales:</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Nombre y apellido</li>
              <li style={listItemStyle}>Direccion de correo electronico</li>
              <li style={listItemStyle}>Foto de perfil (obtenida mediante Google OAuth, si corresponde)</li>
              <li style={listItemStyle}>Informacion de comercio (nombre, descripcion, ubicacion, categoria) si registras un comercio</li>
              <li style={listItemStyle}>Datos de navegacion (paginas visitadas, tiempo de sesion) de forma anonimizada</li>
            </ul>

            <div style={dividerStyle} />

            {/* Section 3 */}
            <h2 style={sectionHeadingStyle}>3. Finalidad del tratamiento</h2>
            <p style={paragraphStyle}>Utilizamos tus datos personales para:</p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Conectar personas con productores y comerciantes de alimentos locales y agroecologicos</li>
              <li style={listItemStyle}>Gestionar tu cuenta de usuario y perfil en la plataforma</li>
              <li style={listItemStyle}>Procesar donaciones voluntarias a traves de los medios de pago habilitados</li>
              <li style={listItemStyle}>Enviarte notificaciones relacionadas con el servicio (previa aceptacion)</li>
            </ul>

            <div style={dividerStyle} />

            {/* Section 4 */}
            <h2 style={sectionHeadingStyle}>4. Base legal del tratamiento</h2>
            <p style={paragraphStyle}>
              El tratamiento de tus datos personales se basa en el <strong>consentimiento</strong> que
              otorgas al momento de registrarte en Alimnet. Podes retirar tu consentimiento en
              cualquier momento escribiendo a info@alimnet.com.
            </p>

            <div style={dividerStyle} />

            {/* Section 5 */}
            <h2 style={sectionHeadingStyle}>5. Terceros que acceden a tus datos</h2>
            <p style={paragraphStyle}>
              Para operar el servicio, compartimos datos con los siguientes proveedores de confianza:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}><strong>Supabase</strong> — almacenamiento de base de datos y autenticacion</li>
              <li style={listItemStyle}><strong>Stripe</strong> y <strong>Mercado Pago</strong> — procesamiento de donaciones y pagos</li>
              <li style={listItemStyle}><strong>Google</strong> — autenticacion mediante OAuth (si elegis iniciar sesion con Google)</li>
              <li style={listItemStyle}><strong>Vercel</strong> — infraestructura de hosting y despliegue de la aplicacion</li>
            </ul>
            <p style={paragraphStyle}>
              Ninguno de estos proveedores esta autorizado a usar tus datos para fines propios.
            </p>

            <div style={dividerStyle} />

            {/* Section 6 */}
            <h2 style={sectionHeadingStyle}>6. Tus derechos (ARCO)</h2>
            <p style={paragraphStyle}>
              De acuerdo con la <strong>Ley 25.326 de Proteccion de los Datos Personales</strong>,
              tenes derecho a:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}><strong>Acceso</strong> — solicitar informacion sobre los datos que tenemos sobre vos</li>
              <li style={listItemStyle}><strong>Rectificacion</strong> — corregir datos inexactos o incompletos</li>
              <li style={listItemStyle}><strong>Cancelacion</strong> — solicitar la eliminacion de tus datos personales</li>
              <li style={listItemStyle}><strong>Oposicion</strong> — oponerte al tratamiento de tus datos para determinadas finalidades</li>
            </ul>
            <p style={paragraphStyle}>
              Para ejercer cualquiera de estos derechos, escribinos a <strong>info@alimnet.com</strong>.
              Responderemos tu solicitud dentro de los plazos previstos por la ley.
            </p>

            <div style={dividerStyle} />

            {/* Section 7 */}
            <h2 style={sectionHeadingStyle}>7. Cookies</h2>
            <p style={paragraphStyle}>
              Alimnet utiliza <strong>cookies de sesion</strong> estrictamente necesarias para
              gestionar la autenticacion de usuarios. No utilizamos cookies publicitarias ni
              de rastreo con fines comerciales. Para mas informacion, consulta nuestra{' '}
              <button
                onClick={() => router.push('/cookies')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5F7D4A',
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                Politica de Cookies
              </button>.
            </p>

            <div style={dividerStyle} />

            {/* Section 8 */}
            <h2 style={sectionHeadingStyle}>8. Retencion de datos</h2>
            <p style={paragraphStyle}>
              Tus datos personales seran almacenados mientras tu cuenta en Alimnet se encuentre
              activa. Una vez que solicites la cancelacion de tu cuenta, procederemos a eliminar
              tus datos en un plazo razonable, salvo que la ley exija su conservacion por un
              periodo mayor.
            </p>

            <div style={dividerStyle} />

            {/* Section 9 */}
            <h2 style={sectionHeadingStyle}>9. Seguridad</h2>
            <p style={paragraphStyle}>
              Implementamos medidas tecnicas y organizativas para proteger tus datos personales
              frente a accesos no autorizados, perdida o alteracion. Esto incluye el uso de
              conexiones cifradas (HTTPS), control de accesos y proveedores de infraestructura
              con certificaciones de seguridad reconocidas.
            </p>

            <div style={dividerStyle} />

            {/* Section 10 */}
            <h2 style={sectionHeadingStyle}>10. Contacto y autoridad de aplicacion</h2>
            <p style={paragraphStyle}>
              Para consultas sobre privacidad, escribinos a <strong>info@alimnet.com</strong>.
            </p>
            <p style={paragraphStyle}>
              Si considerás que tus derechos han sido vulnerados, podés presentar una denuncia
              ante la <strong>Agencia de Acceso a la Informacion Publica (AAIP)</strong>:{' '}
              <a
                href="https://www.argentina.gob.ar/aaip"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#5F7D4A', fontWeight: '700' }}
              >
                www.argentina.gob.ar/aaip
              </a>
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
