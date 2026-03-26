'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Leaf, Heart, ShieldCheck, Users, Mail, Coffee, Instagram, 
  Linkedin, ArrowRight, Sparkles, CheckCircle, Globe 
} from 'lucide-react';

export default function SostenerAlimnetPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'var(--text-primary)', 
      display: 'flex', 
      flexDirection: 'column',
      width: '100vw',
      overflowX: 'hidden'
    }}>
      
      {/* 1. Header Global */}
      <Header />

      <main style={{ 
        flex: 1, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem)' 
      }}>
        
        {/* HERO REFINADO */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 8vw, 6rem)' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: 'var(--fs-xs)', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(1.8rem, 8vw, 3.2rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1.1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 4vw, 1.05rem)', color: 'var(--text-secondary)', maxWidth: '650px', 
            margin: '0 auto', lineHeight: '1.7', fontWeight: '550', textAlign: 'center' 
          }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. 
            No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* SECCIÓN 1: SUSTENTABILIDAD Y APOYO */}
        <div style={{ marginBottom: 'clamp(5rem, 10vw, 8rem)' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 'clamp(1.5rem, 5vw, 3rem)', 
            alignItems: 'stretch' 
          }}>
            
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Aporte único</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '600' }}>
                Si valoras nuestra independencia y quieres apoyarnos con una contribución puntual para sostener el servidor.
              </p>
              <button className="btn-fit" style={{ 
                padding: '0.9rem 2.2rem', borderRadius: '12px', 
                background: '#2D3A20', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease' 
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
                position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem 1rem', 
                background: 'var(--primary)', color: 'white', borderRadius: '30px', 
                fontSize: '0.65rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.08em' 
              }}>
                Recomendado
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2.5rem' }}>
                 <div style={{ 
                  width: '55px', height: '55px', background: '#F0F4ED', color: 'var(--primary)', 
                  borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Sparkles size={26} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Miembro Fundador</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2.5rem', fontWeight: '600' }}>
                Socio clave. Tu apoyo mensual permite planificar expansiones y seguir mapeando soberanía con independencia.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={18} /> Reportes Trimestrales
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: '950' }}>
                   <CheckCircle size={18} /> Votación de Features
                 </div>
              </div>
              <button className="btn-fit" style={{ 
                padding: '1.1rem 2.8rem', borderRadius: '16px', 
                background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(95, 125, 74, 0.3)'
              }}>
                Unirme como Fundador
              </button>
            </div>
          </div>
        </div>

        {/* ACCIÓN COMUNITARIA */}
        <div style={{ 
          marginBottom: 'clamp(5rem, 10vw, 8rem)', 
          padding: 'clamp(2rem, 8vw, 4rem)', 
          background: '#F8F9F5', 
          borderRadius: '40px', 
          border: '1px solid #E4EBDD' 
        }}>
           <div className="action-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
             <div>
               <div style={{ width: '45px', height: '45px', background: 'white', color: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #E4EBDD' }}>
                 <ShieldCheck size={22} />
               </div>
               <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>Tu palabra es poder.</h2>
               <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '550' }}>
                 Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real y cuidado. Alimnet es confianza mutua.
               </p>
               <button 
                onClick={() => window.location.href = '/explorar'}
                className="btn-fit"
                style={{ 
                  padding: '0.9rem 2.2rem', borderRadius: '14px', 
                  border: '2px solid var(--primary)', background: 'transparent', color: 'var(--primary)', 
                  fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s ease'
                }}
               >
                 IR AL MAPA Y VALIDAR
               </button>
             </div>
             
             {/* PILARES 2X2 REPINADOS (FIT TO TEXT) */}
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: 'fit-content', margin: '0 auto' }}>
                {[
                  { label: 'Confianza', text: 'Prestigio social.' },
                  { label: 'Visibilidad', text: 'Top del mapa.' },
                  { label: 'Seguridad', text: 'Sin intermediarios.' },
                  { label: 'Crecimiento', text: 'Soberanía real.' }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    padding: '1.2rem 1.5rem', background: 'white', borderRadius: '20px', 
                    border: '1px solid #E4EBDD', width: 'fit-content',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ fontWeight: '1000', color: 'var(--primary-dark)', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '2px', letterSpacing: '0.05em' }}>{item.label}</div>
                    <p style={{ fontSize: '0.65rem', color: '#888', fontWeight: '600', margin: 0, lineHeight: '1.2', whiteSpace: 'nowrap' }}>{item.text}</p>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* QUIENES ESTÁN DETRÁS */}
        <div style={{ marginBottom: 'clamp(5rem, 10vw, 8rem)' }}>
          <div className="founder-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
               <div style={{ 
                 width: 'clamp(180px, 40vw, 240px)', height: 'clamp(180px, 40vw, 240px)', 
                 borderRadius: '50%', overflow: 'hidden', 
                 border: '2px solid var(--primary)', boxShadow: '0 20px 40px rgba(95, 125, 74, 0.1)',
                 background: '#F8F9F5', padding: '6px', margin: '0 auto'
               }}>
                 <img 
                    src="/tomas_profile.jpg" 
                    alt="Tomas Vukojicic" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                  />
               </div>
               <div style={{ marginTop: '2.5rem' }}>
                 <h3 style={{ fontSize: '1.15rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tomas Vukojicic</h3>
                 <p style={{ fontSize: '0.65rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '6px' }}>Creador de Alimnet</p>
               </div>
            </div>

            <div style={{ maxWidth: '650px' }}>
              <div style={{ 
                background: '#F0F4ED', padding: 'clamp(1.5rem, 5vw, 2.5rem)', borderRadius: '40px 40px 40px 4px', 
                marginBottom: '2.5rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.015)'
              }}>
                <blockquote style={{ display: 'block', fontSize: 'clamp(0.95rem, 4.5vw, 1.05rem)', fontWeight: '700', color: 'var(--primary-dark)', lineHeight: '1.6', fontStyle: 'italic', margin: 0 }}>
                   "Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. <br /><br />Esa búsqueda fue el punto de partida."
                </blockquote>
              </div>
              <div style={{ 
                display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', 
                fontSize: 'clamp(0.85rem, 4vw, 0.95rem)', lineHeight: '1.8', fontWeight: '550'
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

        {/* ALIANZAS */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ 
            background: '#F0F4ED', borderRadius: '48px', padding: 'clamp(2rem, 8vw, 4.5rem)', color: 'var(--primary-dark)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem',
            border: '1.5px solid #E4EBDD'
          }}>
             <div style={{ maxWidth: '550px' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', fontWeight: '950', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>¿Representas a un proyecto?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 4vw, 1.05rem)', lineHeight: '1.7', fontWeight: '600' }}>
                  Buscamos alianzas sutiles con ONGs, gobiernos locales y marcas que busquen fortalecer la soberanía alimentaria regional.
                </p>
             </div>
             <a href="mailto:info@alimnet.com" style={{ 
               padding: '1.1rem 2.2rem', background: '#2D3A20', color: 'white', 
               borderRadius: '16px', fontWeight: '1000', fontSize: '0.85rem', 
               textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px',
               boxShadow: '0 20px 40px rgba(45, 58, 32, 0.15)',
               width: 'fit-content'
             }} className="btn-fit">
               CONTACTAR <Mail size={18} /> <ArrowRight size={18} />
             </a>
          </div>
        </div>

      </main>

      {/* FOOTER PREMIUM CAPTURA UNIFICADO */}
      <footer style={{ 
        padding: '6rem 2rem 4rem', 
        background: 'white', 
        borderTop: '1px solid #E4EBDD', 
        width: '100%', 
        overflowX: 'hidden' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'clamp(2rem, 5vw, 4rem)', 
            marginBottom: '4rem' 
          }}>
            
            {/* Columna 1: ALIMNET */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>ALIMNET</div>
              <p style={{ fontSize: '0.9rem', color: '#666', maxWidth: '300px', lineHeight: '1.7', fontWeight: '550', marginBottom: '2rem' }}>
                Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                <Instagram size={22} color="#444" style={{ cursor: 'pointer' }} />
                <Linkedin size={22} color="#444" style={{ cursor: 'pointer' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#444', fontSize: '0.85rem', fontWeight: '900' }}>
                   <Mail size={20} /> info@alimnet.com
                </div>
              </div>
            </div>

            {/* Columna 2: MENU */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>MENÚ</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '800' }}>
                <a href="/explorar" style={{ color: '#666', textDecoration: 'none' }}>Explorar mapa</a>
                <a href="/sostener" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sostener Alimnet</a>
                <a href="/ingresar" style={{ color: '#666', textDecoration: 'none' }}>Ingresar</a>
                <button style={{ 
                   width: 'fit-content', padding: '0.6rem 1.2rem', borderRadius: '30px', 
                   border: 'none', background: '#5F7D4A', color: 'white', 
                   fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', marginTop: '0.5rem'
                }}>
                   Crear cuenta
                </button>
              </nav>
            </div>

            {/* Columna 3: EXPLORAR */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>EXPLORAR</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '800' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Blog</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Certificaciones</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Guía estacional</a>
              </nav>
            </div>

            {/* Columna 4: LEGAL */}
            <div>
              <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--primary-dark)' }}>LEGAL</h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', fontWeight: '800' }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacidad</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Términos</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Cookies</a>
              </nav>
            </div>
          </div>

          <div style={{ 
            borderTop: '1px solid #E4EBDD', 
            paddingTop: '2.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            flexWrap: 'wrap', 
            gap: '1rem', 
            fontSize: '0.75rem', 
            color: '#AAA', 
            fontWeight: '600' 
          }}>
            <div>© 2025 Alimnet. Cultivando redes locales.</div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
               <span>Argentina</span>
               <span style={{ color: '#E4EBDD' }}>|</span>
               <span style={{ color: '#888' }}>Propósito Global</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        body { overflow-x: hidden; width: 100vw; position: relative; }
        .dynamic-support-card:hover { transform: translateY(-8px); border-color: var(--primary); }
        .featured-glow:hover { transform: scale(1.02) translateY(-10px); }
        .btn-fit:hover { transform: scale(1.03); filter: brightness(1.1); }
        
        @media (max-width: 600px) {
          .action-grid, .founder-grid { text-align: center; }
          .btn-fit { width: fit-content !important; margin: 0 auto; }
        }
      `}</style>
    </div>
  );
}
