'use client';

import React from 'react';
import { Leaf, Heart, ShieldCheck, Users, User, ArrowRight, Mail, Coffee, Instagram, Linkedin, UserCircle } from 'lucide-react';

export default function SostenerAlimnetPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text-primary)' }}>
      
      {/* Header Unificado */}
      <header style={{ 
        padding: '1.2rem 2rem', background: 'white', borderBottom: '1px solid var(--border)', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' 
      }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: "1.3rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "10px", cursor: 'pointer' }}
        >
          <Leaf size={26} fill="var(--primary)" fillOpacity={0.25} /> ALIMNET
        </div>
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="/explorar" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: '800', fontSize: '0.9rem' }}>Explorar</a>
          <a href="/sostener" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '900', fontSize: '0.9rem' }}>Sostener Alimnet</a>
          <button 
            onClick={() => window.location.href = '/perfil'} 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', background: '#F0F4ED', 
              color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '12px', 
              border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem' 
            }}
          >
            <UserCircle size={18} /> Mi Perfil
          </button>
        </nav>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '6rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Heart size={16} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>Construyamos juntos el futuro <br /><span style={{ color: 'var(--primary)' }}>de nuestra alimentación.</span></h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7', fontWeight: '550', textAlign: 'justify' }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. No cobramos comitivas ni pautas a los productores. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* Sección 1: Soporte Económico */}
        <div style={{ marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary-dark)' }}>Soporte para la Sustentabilidad</h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Elige cómo ayudarnos a mantener la red activa y libre de publicidad.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
            <div style={{ 
              background: '#F9FAF7', padding: '3rem', borderRadius: '50px', border: '1px solid white', 
              boxShadow: '8px 8px 24px rgba(0,0,0,0.04), -8px -8px 24px rgba(255,255,255,0.6)', 
              display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              opacity: 0.85
            }} className="relief-card">
              <div style={{ width: '50px', height: '50px', background: 'white', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', boxShadow: '4px 4px 10px rgba(0,0,0,0.03)' }}>
                <Coffee size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Aporte por única vez</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Una pequeña contribución (vía Cafecito) para ayudarnos a sostener la infraestructura.
              </p>
              <button 
                className="button button-primary" 
                style={{ width: '100%', borderRadius: '16px', padding: '1rem', fontWeight: '950', background: 'var(--text-secondary)', border: 'none' }}
              >
                Invitar café
              </button>
            </div>

            <div style={{ 
              background: 'var(--primary-dark)', padding: '4rem 3.5rem', borderRadius: '50px', color: 'white', position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(27, 36, 20, 0.25), 0 10px 20px rgba(0,0,0,0.2)', 
              border: '2px solid var(--primary)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transform: 'scale(1.05)', zIndex: 10
            }} className="relief-card highlighted">
              <div style={{ position: 'absolute', top: '25px', right: '25px', background: 'white', color: 'var(--primary-dark)', padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Más Impacto</div>
              <div style={{ width: '70px', height: '70px', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
                <Users size={35} />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: '950', marginBottom: '1.2rem', letterSpacing: '-0.02em', color: 'white' }}>Miembro Fundador</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '3rem', fontWeight: '500' }}>
                Sostén la red con un aporte mensual y sé parte activa del equipo que elige el futuro de Alimnet.
              </p>
              <button style={{ 
                width: '100%', borderRadius: '20px', padding: '1.4rem', background: 'white', color: 'var(--primary-dark)', 
                border: 'none', fontWeight: '1000', cursor: 'pointer', fontSize: '1.15rem', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.3)'
              }} className="founder-button">
                Unirme como Fundador
              </button>
            </div>
          </div>
        </div>

        {/* Sección 2: Acción Comunitaria */}
        <div style={{ marginBottom: '6rem', background: 'white', borderRadius: '50px', padding: '4rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ width: '60px', height: '60px', background: '#F0F4ED', color: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem' }}>Tu palabra es poder</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real, cuidado y honesto. Alimnet se basa en la confianza mutua.
              </p>
              <button 
                onClick={() => window.location.href = '/explorar'} 
                style={{ padding: '1rem 2rem', background: 'none', border: '2px solid var(--primary)', color: 'var(--primary)', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}
              >
                Ir al Mapa y Validar
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                { label: 'Confianza', text: 'Cada validación eleva el prestigio del productor.' },
                { label: 'Visibilidad', text: 'Productores validados aparecen primero en el mapa.' },
                { label: 'Seguridad', text: 'Protegemos a la comunidad de intermediarios.' },
                { label: 'Crecimiento', text: 'Muestra que somos cada vez más en la red.' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px' }}>
                  <div style={{ fontWeight: '950', color: 'var(--primary-dark)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.4' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección 3: Nuestra Historia */}
        <div style={{ marginBottom: '6rem', padding: '0 2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <div style={{ 
              width: '280px', height: '280px', borderRadius: '50%', flexShrink: 0, 
              background: '#F4F1E6',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              /* EFECTO TORUS HIPER-REALISTA */
              boxShadow: `
                25px 25px 50px rgba(0,0,0,0.1), 
                -25px -25px 50px rgba(255,255,255,1),
                inset 10px 10px 25px rgba(0,0,0,0.05),
                inset -10px -10px 25px rgba(255,255,255,0.7)
              `,
              padding: '40px'
            }}>
              {/* Sombra interna profunda que rodea la imagen para dar profundidad al "hueco" */}
              <div style={{ 
                position: 'absolute', inset: '40px', borderRadius: '50%', 
                boxShadow: 'inset 8px 8px 15px rgba(0,0,0,0.1), inset -5px -5px 10px rgba(255,255,255,1)',
                zIndex: 1
              }}></div>
              
              {/* Contenedor de la Imagen */}
              <div style={{ 
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', 
                zIndex: 2, position: 'relative',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src="/tomas_profile.jpg" 
                  alt="Tomas Vukojicic" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>¿Quiénes están detrás?</h2>
              <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontWeight: '550' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                   "Hola, soy <span style={{ color: 'var(--primary-dark)', fontWeight: '900' }}>Tomas Vukojicic</span>, el creador de Alimnet. Este proyecto nació de una necesidad personal y familiar: la búsqueda de encontrar alimentos que respeten la biodiversidad, desde quien la consume hasta quienes la trabajan."
                </p>
                <p>
                  Creo en la tecnología como una herramienta de descentralización y conexión humana. Alimnet aspira a ser un lugar de encuentro donde, con conciencia, elegimos lo mejor para nosotros y para nuestro planeta. Gracias por estar acá.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 4: Proyectos de Impacto */}
        <div style={{ background: '#F0F4ED', borderRadius: '50px', padding: '4rem', display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>¿Tienes un proyecto de impacto?</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Buscamos alianzas con ONGs, municipios y marcas que quieran fortalecer la economía circular.
            </p>
            <a 
              href="mailto:info@alimnet.com" 
              style={{ 
                padding: '1rem 2rem', background: 'var(--primary-dark)', color: 'white', border: 'none', 
                borderRadius: '16px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', 
                alignItems: 'center', gap: '10px', textDecoration: 'none' 
              }}
            >
              Envianos un correo <Mail size={18} />
            </a>
          </div>
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
             <div style={{ width: '200px', height: '200px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Leaf size={100} color="white" fill="white" fillOpacity={0.2} />
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'white', padding: '15px', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                   <span style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--primary-dark)' }}>+1000</span>
                   <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)' }}>Mapeados</div>
                </div>
             </div>
          </div>
        </div>

        {/* Contacto Directo Final - Como cierre de página */}
        <div style={{ padding: '6rem 2rem 2rem', textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '15px', 
            padding: '1.2rem 2.5rem', background: '#F4F1E6', borderRadius: '40px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid var(--border)'
          }}>
            <div style={{ width: '45px', height: '45px', background: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
              <Mail size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '2px', fontWeight: '800' }}>Escribinos directamente</p>
              <a href="mailto:info@alimnet.com" style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', textDecoration: 'none' }}>info@alimnet.com</a>
            </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <Instagram size={24} color="var(--primary-dark)" />
          <Heart size={24} color="var(--primary-dark)" />
          <Linkedin size={24} color="var(--primary-dark)" />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>© 2026 ALIMNET - Red de Alimentos Cuidados</p>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .relief-card:hover {
          transform: translateY(-15px) scale(1.05); /* Elevación y escala igual en ambas */
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
          opacity: 1;
        }
        .relief-card.highlighted:hover {
          transform: translateY(-15px) scale(1.05); /* Mantener consistencia */
          box-shadow: 0 50px 100px rgba(27, 36, 20, 0.4);
        }
        .founder-button:hover {
          transform: translateY(-5px) scale(1.05); /* Elevación extra del botón */
          box-shadow: 0 20px 45px rgba(0,0,0,0.5);
          background: #FFFFFF !important;
        }
      `}</style>
    </div>
  );
}
