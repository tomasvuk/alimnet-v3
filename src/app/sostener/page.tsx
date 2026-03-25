'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Leaf, Heart, ShieldCheck, Users, Mail, Coffee, Instagram, 
  Linkedin, ArrowRight, Sparkles, CheckCircle, Globe 
} from 'lucide-react';

export default function SostenerAlimnetPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Global */}
      <Header />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem' }}>
        
        {/* HERO REFINADO */}
        <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: '0.75rem', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 3.2rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1.1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ 
            fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', 
            margin: '0 auto', lineHeight: '1.7', fontWeight: '550', textAlign: 'center' 
          }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. 
            No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* SECCIÓN 1: SUSTENTABILIDAD Y APOYO (CARDS DINÁMICAS FLOTANTES) */}
        <div style={{ marginBottom: '10rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            
            {/* Aporte Único (DINÁMICA SIMPLE) */}
            <div style={{ 
              background: 'white', padding: '3.5rem', borderRadius: '40px', border: '1.5px solid #E4EBDD',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
            }} className="dynamic-support-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '45px', height: '45px', background: '#F8F9F5', color: 'var(--primary)', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Coffee size={20} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Aporte único</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: '600' }}>
                Si valoras nuestra independencia y quieres apoyarnos con una contribución puntual para sostener el servidor y el código abierto.
              </p>
              <button className="dynamic-cta" style={{ 
                width: 'fit-content', padding: '0.9rem 2.2rem', borderRadius: '12px', 
                background: '#2D3A20', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease' 
              }}>
                Invitar café (Cafecito)
              </button>
            </div>

            {/* Miembro Fundador (GIGANTE DINÁMICA) */}
            <div style={{ 
              background: 'white', padding: '4.5rem 3.5rem', borderRadius: '48px', border: '2px solid var(--primary)',
              boxShadow: '0 40px 80px rgba(45, 58, 32, 0.1)', transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              position: 'relative'
            }} className="dynamic-support-card featured-glow">
              <div style={{ 
                position: 'absolute', top: '2rem', right: '2.5rem', padding: '0.5rem 1rem', 
                background: 'var(--primary)', color: 'white', borderRadius: '30px', 
                fontSize: '0.65rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.08em' 
              }}>
                Recomendado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                 <div style={{ 
                  width: '60px', height: '60px', background: '#F0F4ED', color: 'var(--primary)', 
                  borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Sparkles size={28} />
                </div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Miembro Fundador</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: '600' }}>
                Socio clave. Tu apoyo mensual permite planificar expansiones, mejorar el mapa y seguir mapeando soberanía con independencia total.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={18} /> Reportes de Impacto Trimestrales
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={18} /> Votación de Próximas Funciones
                 </div>
              </div>
              <button className="dynamic-cta" style={{ 
                width: 'fit-content', padding: '1.1rem 2.8rem', borderRadius: '16px', 
                background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(95, 125, 74, 0.3)'
              }}>
                Unirme como Fundador
              </button>
            </div>
          </div>
        </div>

        {/* ACCIÓN COMUNITARIA */}
        <div style={{ marginBottom: '10rem', padding: '4rem', background: '#F8F9F5', borderRadius: '40px', border: '1px solid #E4EBDD' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div>
               <div style={{ width: '45px', height: '45px', background: 'white', color: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #E4EBDD' }}>
                 <ShieldCheck size={22} />
               </div>
               <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>Tu palabra es poder.</h2>
               <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem', fontWeight: '500' }}>
                 Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real, cuidado y honesto. Alimnet se basa en la confianza mutua.
               </p>
               <button 
                onClick={() => window.location.href = '/explorar'}
                className="dynamic-cta"
                style={{ 
                  width: 'fit-content', padding: '0.9rem 2rem', borderRadius: '14px', 
                  border: '2px solid var(--primary)', background: 'transparent', color: 'var(--primary)', 
                  fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer' 
                }}
               >
                 IR AL MAPA Y VALIDAR
               </button>
             </div>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Confianza', text: 'Cada validación eleva el prestigio del productor.' },
                  { label: 'Visibilidad', text: 'Productores validados aparecen primero en el mapa.' },
                  { label: 'Seguridad', text: 'Protegemos a la comunidad de intermediarios.' },
                  { label: 'Crecimiento', text: 'Muestra que somos cada vez más en la red.' }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.2rem', background: 'white', borderRadius: '20px', border: '1px solid #E4EBDD' }}>
                    <div style={{ fontWeight: '1000', color: 'var(--primary-dark)', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                    <p style={{ fontSize: '0.7rem', color: '#888', fontWeight: '600', margin: 0 }}>{item.text}</p>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* QUIENES ESTÁN DETRÁS (EDITORIAL COMPACTO) */}
        <div style={{ marginBottom: '10rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
               <div style={{ 
                 width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', 
                 border: '2px solid var(--primary)', boxShadow: '0 20px 40px rgba(95, 125, 74, 0.1)',
                 background: '#F8F9F5', padding: '6px'
               }}>
                 <img 
                    src="/tomas_profile.jpg" 
                    alt="Tomas Vukojicic" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                  />
               </div>
               <div style={{ marginTop: '2.5rem' }}>
                 {/* NOMBRE MÁS COMPACTO Y ELEGANTE */}
                 <h3 style={{ fontSize: '1.15rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tomas Vukojicic</h3>
                 <p style={{ fontSize: '0.65rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px' }}>Creador de Alimnet</p>
               </div>
            </div>

            <div style={{ maxWidth: '650px' }}>
              <div style={{ 
                background: '#F0F4ED', padding: '2.2rem', borderRadius: '40px 40px 40px 4px', 
                marginBottom: '2.2rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.015)'
              }}>
                <blockquote style={{ display: 'block', fontSize: '1rem', fontWeight: '700', color: 'var(--primary-dark)', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                   "Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. <br /><br />Esa búsqueda fue el punto de partida."
                </blockquote>
              </div>
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', 
                fontSize: '0.95rem', lineHeight: '1.8', fontWeight: '550', paddingLeft: '0.5rem' 
              }}>
                 <p>
                   Tomás Vukojicic tiene más de 15 años de experiencia en gastronomía y en los últimos años trabajó en tecnología dentro del mundo de startups.
                 </p>
                 <p>
                   Hoy impulsa Alimnet como una forma de organizar y facilitar el acceso a una alimentación más consciente, conectando personas con productores alineados a ese cuidado.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* ALIANZAS (VERDE CLARO) */}
        <div style={{ 
          background: '#F0F4ED', borderRadius: '48px', padding: '4.5rem', color: 'var(--primary-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4rem',
          border: '1.5px solid #E4EBDD'
        }}>
           <div style={{ maxWidth: '550px' }}>
              <div style={{ 
                display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--primary)', color: 'white', 
                borderRadius: '8px', fontSize: '0.65rem', fontWeight: '1000', textTransform: 'uppercase', 
                letterSpacing: '0.1em', marginBottom: '1.5rem' 
              }}>
                Alianzas de Impacto
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '950', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>¿Representas a un proyecto?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', fontWeight: '600' }}>
                Buscamos alianzas sutiles con ONGs, gobiernos locales y marcas que busquen fortalecer la soberanía alimentaria regional.
              </p>
           </div>
           <a href="mailto:info@alimnet.com" style={{ 
             padding: '1.1rem 2.2rem', background: '#2D3A20', color: 'white', 
             borderRadius: '16px', fontWeight: '1000', fontSize: '0.85rem', 
             textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px',
             boxShadow: '0 20px 40px rgba(45, 58, 32, 0.15)'
           }} className="dynamic-cta">
             CONTACTAR AL EQUIPO <Mail size={18} /> <ArrowRight size={18} />
           </a>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: '6rem 2rem 4rem', background: 'white', borderTop: '1px solid #E4EBDD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>ALIMNET</div>
              <p style={{ fontSize: '0.85rem', color: '#777', maxWidth: '300px', lineHeight: '1.7', fontWeight: '600' }}>
                Acompañamos la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem' }}>
                <Instagram size={22} color="#AAA" />
                <Linkedin size={22} color="#AAA" />
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#333' }}>Menú</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '800' }}>
                <a href="/explorar" style={{ color: '#888', textDecoration: 'none' }}>Explorar Mapa</a>
                <a href="/sostener" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sostener Alimnet</a>
                <a href="/registro" style={{ color: '#888', textDecoration: 'none' }}>Unirse a la Red</a>
              </nav>
            </div>

            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#333' }}>Legal</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '800' }}>
                <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Privacidad</a>
                <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Términos</a>
              </nav>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #F0F4ED', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#AAA', fontWeight: '600' }}>
            <div>© 2026 Alimnet - Red de Alimentos Cuidados.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
               <span>Argentina</span>
               <span style={{ color: 'var(--primary)' }}>• Propósito Global</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .dynamic-support-card:hover { 
          transform: translateY(-12px); 
          box-shadow: 0 40px 100px rgba(0,0,0,0.06); 
          border-color: var(--primary);
        }
        .featured-glow:hover {
          box-shadow: 0 50px 120px rgba(95, 125, 74, 0.25);
          transform: scale(1.02) translateY(-15px);
        }
        .dynamic-cta:hover { 
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        .dynamic-cta:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
