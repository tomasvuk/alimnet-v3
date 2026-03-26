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

      <main className="container-main" style={{ flex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HERO REFINADO */}
        <div className="hero-section" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: 'var(--fs-xs)', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 className="hero-title" style={{ 
            fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1.1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p className="hero-text" style={{ 
            color: 'var(--text-secondary)', maxWidth: '650px', 
            margin: '0 auto', lineHeight: '1.7', fontWeight: '550', textAlign: 'center' 
          }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. 
            No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* SECCIÓN 1: SUSTENTABILIDAD Y APOYO */}
        <div style={{ marginBottom: '8rem' }}>
          <div className="support-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            
            {/* Aporte Único */}
            <div style={{ 
              background: 'white', padding: '2.5rem', borderRadius: '40px', border: '1.5px solid #E4EBDD',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)', transition: 'all 0.4s ease'
            }} className="dynamic-support-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '45px', height: '45px', background: '#F8F9F5', color: 'var(--primary)', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Coffee size={20} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Aporte único</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '600' }}>
                Si valoras nuestra independencia y quieres apoyarnos con una contribución puntual para sostener el servidor.
              </p>
              <button className="dynamic-cta" style={{ 
                width: 'fit-content', padding: '0.8rem 2rem', borderRadius: '12px', 
                background: '#2D3A20', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.3s ease' 
              }}>
                Invitar café (Cafecito)
              </button>
            </div>

            {/* Miembro Fundador */}
            <div style={{ 
              background: 'white', padding: '3.5rem 2.5rem', borderRadius: '48px', border: '2px solid var(--primary)',
              boxShadow: '0 40px 80px rgba(45, 58, 32, 0.1)', transition: 'all 0.4s ease',
              position: 'relative'
            }} className="dynamic-support-card featured-glow">
              <div style={{ 
                position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.4rem 0.8rem', 
                background: 'var(--primary)', color: 'white', borderRadius: '30px', 
                fontSize: '0.6rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.08em' 
              }}>
                Recomendado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                 <div style={{ 
                  width: '50px', height: '50px', background: '#F0F4ED', color: 'var(--primary)', 
                  borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Miembro Fundador</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '600' }}>
                Socio clave. Tu apoyo mensual permite planificar expansiones y seguir mapeando soberanía con independencia.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={16} /> Reportes Trimestrales
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={16} /> Votación de Features
                 </div>
              </div>
              <button className="dynamic-cta" style={{ 
                width: 'fit-content', padding: '1rem 2.5rem', borderRadius: '14px', 
                background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(95, 125, 74, 0.25)'
              }}>
                Unirme como Fundador
              </button>
            </div>
          </div>
        </div>

        {/* ACCIÓN COMUNITARIA */}
        <div className="action-section" style={{ marginBottom: '8rem', padding: '3.5rem', background: '#F8F9F5', borderRadius: '40px', border: '1px solid #E4EBDD' }}>
           <div className="action-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div>
               <div style={{ width: '45px', height: '45px', background: 'white', color: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #E4EBDD' }}>
                 <ShieldCheck size={22} />
               </div>
               <h2 style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>Tu palabra es poder.</h2>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '550' }}>
                 Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real y cuidado. Alimnet es confianza mutua.
               </p>
               <button 
                onClick={() => window.location.href = '/explorar'}
                className="dynamic-cta"
                style={{ 
                  width: 'fit-content', padding: '0.8rem 1.8rem', borderRadius: '14px', 
                  border: '2px solid var(--primary)', background: 'transparent', color: 'var(--primary)', 
                  fontWeight: '1000', fontSize: '0.8rem', cursor: 'pointer' 
                }}
               >
                 IR AL MAPA Y VALIDAR
               </button>
             </div>
             <div className="traits-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Confianza', text: 'Cada validación eleva el prestigio.' },
                  { label: 'Visibilidad', text: 'Aparecen primero en el mapa.' },
                  { label: 'Seguridad', text: 'Red sin intermediarios.' },
                  { label: 'Crecimiento', text: 'Somos más cada día.' }
                ].map((item, i) => (
                  <div key={i} style={{ padding: '1.2rem', background: 'white', borderRadius: '20px', border: '1px solid #E4EBDD' }}>
                    <div style={{ fontWeight: '1000', color: 'var(--primary-dark)', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.05em' }}>{item.label}</div>
                    <p style={{ fontSize: '0.65rem', color: '#888', fontWeight: '600', margin: 0, lineHeight: '1.3' }}>{item.text}</p>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* QUIENES ESTÁN DETRÁS */}
        <div className="founder-section" style={{ marginBottom: '8rem' }}>
          <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
               <div className="founder-photo-container" style={{ 
                 width: '220px', height: '220px', borderRadius: '50%', overflow: 'hidden', 
                 border: '2px solid var(--primary)', boxShadow: '0 20px 40px rgba(95, 125, 74, 0.1)',
                 background: '#F8F9F5', padding: '5px'
               }}>
                 <img 
                    src="/tomas_profile.jpg" 
                    alt="Tomas Vukojicic" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                  />
               </div>
               <div style={{ marginTop: '2rem' }}>
                 <h3 style={{ fontSize: '1rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tomas Vukojicic</h3>
                 <p style={{ fontSize: '0.6rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px' }}>Creador de Alimnet</p>
               </div>
            </div>

            <div style={{ maxWidth: '650px' }}>
              <div className="quote-box" style={{ 
                background: '#F0F4ED', padding: '1.8rem', borderRadius: '32px 32px 32px 4px', 
                marginBottom: '1.8rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.015)'
              }}>
                <blockquote style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', color: 'var(--primary-dark)', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                   "Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. <br /><br />Esa búsqueda fue el punto de partida."
                </blockquote>
              </div>
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', 
                fontSize: '0.9rem', lineHeight: '1.8', fontWeight: '550'
              }}>
                 <p>
                   Tomás Vukojicic tiene más de 15 años de experiencia en gastronomía y en los últimos años trabajó en tecnología dentro del mundo de startups.
                 </p>
                 <p>
                   Hoy impulsa Alimnet como una forma de facilitar el acceso a una alimentación consciente, conectando personas con productores alineados a ese cuidado.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* ALIANZAS */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="alliances-card" style={{ 
            background: '#F0F4ED', borderRadius: '40px', padding: '3.5rem', color: 'var(--primary-dark)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem',
            border: '1.5px solid #E4EBDD'
          }}>
             <div style={{ maxWidth: '500px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '950', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>¿Representas a un proyecto?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', fontWeight: '600' }}>
                  Buscamos alianzas sutiles con ONGs, gobiernos locales y marcas que busquen fortalecer la soberanía alimentaria regional.
                </p>
             </div>
             <a href="mailto:info@alimnet.com" style={{ 
               padding: '1rem 2rem', background: '#2D3A20', color: 'white', 
               borderRadius: '16px', fontWeight: '1000', fontSize: '0.85rem', 
               textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px',
               boxShadow: '0 20px 40px rgba(45, 58, 32, 0.15)'
             }} className="dynamic-cta">
               CONTACTAR <Mail size={18} />
             </a>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: '6rem 2rem 4rem', background: 'white', borderTop: '1px solid #E4EBDD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            <div className="footer-bio-col" style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>ALIMNET</div>
              <p style={{ fontSize: '0.85rem', color: '#777', maxWidth: '300px', lineHeight: '1.7', fontWeight: '600' }}>
                Acompañamos la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: 'flex', gap: '1.2rem', marginTop: '2rem' }}>
                <Instagram size={22} color="#AAA" />
                <Linkedin size={22} color="#AAA" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .container-main { padding: 8rem 2rem 4rem; }
        
        .hero-title { font-size: 3.2rem; }
        .hero-text { font-size: 1.05rem; }

        .dynamic-support-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 40px 100px rgba(0,0,0,0.06); 
          border-color: var(--primary);
        }
        .featured-glow:hover {
          box-shadow: 0 50px 120px rgba(95, 125, 74, 0.25);
          transform: scale(1.02) translateY(-10px);
        }
        .dynamic-cta:hover { 
          transform: scale(1.03);
          filter: brightness(1.1);
        }

        /* --- MOBILE TUNING --- */
        @media (max-width: 768px) {
          .container-main { padding: 5rem 1.5rem 2rem; }
          .hero-section { margin-bottom: 4rem; }
          .hero-title { font-size: 2.2rem; }
          .hero-text { font-size: 0.95rem; }
          
          .support-grid { gap: 1.5rem; }
          
          .action-grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
          .action-section { padding: 2.5rem 1.8rem; }
          .action-section button { margin: 0 auto; }
          .traits-grid { grid-template-columns: 1fr 1fr; gap: 0.8rem; }
          
          .founder-grid { grid-template-columns: 1fr; gap: 3rem; text-align: center; }
          .founder-photo-container { width: 180px; height: 180px; margin: 0 auto; }
          .quote-box { border-radius: 24px; padding: 1.5rem; }
          
          .alliances-card { padding: 2.5rem 1.8rem; text-align: center; justify-content: center; }
          .alliances-card a { width: 100%; justify-content: center; }
          
          .footer-bio-col { grid-column: span 1; text-align: center; display: flex; flexDirection: column; alignItems: center; }
        }

        @media (max-width: 480px) {
          .hero-title { font-size: 1.8rem; }
          .traits-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
