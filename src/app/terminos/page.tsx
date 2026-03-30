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

export default function TerminosPage() {
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
              Terminos y Condiciones
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
            <h2 style={sectionHeadingStyle}>1. Aceptacion de los terminos</h2>
            <p style={paragraphStyle}>
              Al acceder y utilizar Alimnet, aceptas de manera plena y sin reservas estos
              Terminos y Condiciones. Si no estas de acuerdo con alguno de los puntos aqui
              establecidos, te pedimos que no uses la plataforma.
            </p>

            <div style={dividerStyle} />

            {/* Section 2 */}
            <h2 style={sectionHeadingStyle}>2. Descripcion del servicio</h2>
            <p style={paragraphStyle}>
              Alimnet es un <strong>directorio en linea de productores y comerciantes de alimentos
              agroecologicos y organicos</strong>. Nuestra plataforma facilita la visibilidad de
              quienes producen y comercializan alimentos con practicas responsables, conectandolos
              con consumidores interesados.
            </p>
            <p style={paragraphStyle}>
              <strong>Alimnet no actua como intermediario en operaciones de compra-venta.</strong> Las
              transacciones comerciales son exclusivamente entre el consumidor y el comerciante,
              sin que Alimnet sea parte de dichos acuerdos.
            </p>

            <div style={dividerStyle} />

            {/* Section 3 */}
            <h2 style={sectionHeadingStyle}>3. Registro y cuenta de usuario</h2>
            <p style={paragraphStyle}>
              Para acceder a ciertas funcionalidades de Alimnet necesitas crear una cuenta
              con datos validos y actualizados. Al registrarte:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Sos responsable de mantener la confidencialidad de tus credenciales de acceso</li>
              <li style={listItemStyle}>Sos responsable de toda actividad que ocurra bajo tu cuenta</li>
              <li style={listItemStyle}>Debes notificarnos de inmediato ante cualquier uso no autorizado de tu cuenta</li>
            </ul>

            <div style={dividerStyle} />

            {/* Section 4 */}
            <h2 style={sectionHeadingStyle}>4. Comerciantes y productores</h2>
            <p style={paragraphStyle}>
              Al registrar tu comercio o emprendimiento en Alimnet, confirmas que:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Toda la informacion provista sobre tu comercio es veraz, precisa y actualizada</li>
              <li style={listItemStyle}>Cumples con la normativa alimentaria vigente en la Republica Argentina aplicable a tu actividad</li>
              <li style={listItemStyle}>Cuentas con las habilitaciones y permisos correspondientes para operar</li>
              <li style={listItemStyle}>Te comprometes a mantener actualizada la informacion de tu perfil comercial</li>
            </ul>
            <p style={paragraphStyle}>
              Alimnet se reserva el derecho de remover perfiles comerciales que incumplan
              estas condiciones.
            </p>

            <div style={dividerStyle} />

            {/* Section 5 */}
            <h2 style={sectionHeadingStyle}>5. Donaciones</h2>
            <p style={paragraphStyle}>
              Alimnet ofrece la posibilidad de realizar <strong>donaciones voluntarias</strong> para
              sostener el proyecto. Al respecto:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Las donaciones son completamente voluntarias y no generan derecho a ningun servicio adicional ni preferencial</li>
              <li style={listItemStyle}>No son reembolsables, salvo en caso de error tecnico debidamente documentado</li>
              <li style={listItemStyle}>Para solicitar un reembolso por error tecnico, escribinos a info@alimnet.com dentro de los 7 dias de realizada la donacion</li>
            </ul>

            <div style={dividerStyle} />

            {/* Section 6 */}
            <h2 style={sectionHeadingStyle}>6. Contenido de los usuarios</h2>
            <p style={paragraphStyle}>
              Al publicar contenido en Alimnet (textos, imagenes, descripciones), te comprometes
              a no incluir:
            </p>
            <ul style={listStyle}>
              <li style={listItemStyle}>Informacion falsa, enganosa o fraudulenta</li>
              <li style={listItemStyle}>Contenido ofensivo, discriminatorio o que incite al odio</li>
              <li style={listItemStyle}>Material que viole derechos de propiedad intelectual de terceros</li>
              <li style={listItemStyle}>Spam o contenido publicitario no autorizado</li>
            </ul>
            <p style={paragraphStyle}>
              Alimnet se reserva el derecho de eliminar contenido que no cumpla estas normas.
            </p>

            <div style={dividerStyle} />

            {/* Section 7 */}
            <h2 style={sectionHeadingStyle}>7. Limitacion de responsabilidad</h2>
            <p style={paragraphStyle}>
              Alimnet actua como plataforma de visibilidad y no garantiza la calidad, seguridad,
              legalidad ni autenticidad de los productos ofrecidos por los comerciantes listados.
              La evaluacion y decision de compra es responsabilidad exclusiva del consumidor.
            </p>
            <p style={paragraphStyle}>
              En ningun caso Alimnet sera responsable por danos directos, indirectos, incidentales
              o consecuentes derivados del uso de la plataforma o de las relaciones comerciales
              entre usuarios y comerciantes.
            </p>

            <div style={dividerStyle} />

            {/* Section 8 */}
            <h2 style={sectionHeadingStyle}>8. Modificaciones a los terminos</h2>
            <p style={paragraphStyle}>
              Alimnet puede modificar estos Terminos y Condiciones en cualquier momento.
              Cuando se realicen cambios significativos, lo notificaremos a los usuarios
              registrados mediante correo electronico. El uso continuado de la plataforma
              tras la notificacion implica la aceptacion de los nuevos terminos.
            </p>

            <div style={dividerStyle} />

            {/* Section 9 */}
            <h2 style={sectionHeadingStyle}>9. Ley aplicable y jurisdiccion</h2>
            <p style={paragraphStyle}>
              Estos Terminos y Condiciones se rigen por la legislacion de la{' '}
              <strong>Republica Argentina</strong>. Para cualquier controversia que surja del
              uso de Alimnet, las partes se someten a la jurisdiccion de los tribunales
              ordinarios de la <strong>Ciudad Autonoma de Buenos Aires</strong>.
            </p>

            <div style={dividerStyle} />

            {/* Section 10 */}
            <h2 style={sectionHeadingStyle}>10. Contacto</h2>
            <p style={paragraphStyle}>
              Para consultas sobre estos terminos, podés escribirnos a{' '}
              <strong>info@alimnet.com</strong>. Te responderemos a la brevedad.
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
                Este documento es informativo y no constituye asesoramiento legal profesional.
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
