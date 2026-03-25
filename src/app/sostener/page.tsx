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
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: '0.75rem', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.2rem, 5vw, 3rem)', fontWeight: '950', color: 'var(--primary-dark)', 
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
            No cobramos comitivas ni pautas a los productores. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* SECCIÓN 1: SOPORTE ECONÓMICO (IMÁN VISUAL) */}
        <div style={{ 
          marginBottom: '8rem', padding: '4rem', background: 'white', borderRadius: '48px', 
          border: '1px solid #E4EBDD', boxShadow: '0 40px 100px rgba(45, 58, 32, 0.08)',
          position: 'relative', zIndex: 10
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '950', color: '#2D3A20', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Sustentabilidad y Apoyo
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.9rem' }}>
              Elige cómo ayudarnos a mantener la red activa y libre de publicidad.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2.5rem', alignItems: 'center' }}>
            {/* Aporte Único */}
            <div style={{ 
              background: '#F8F9F5', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD',
              display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', opacity: 0.9
            }} className="refined-card">
              <div style={{ 
                width: '45px', height: '45px', background: 'white', color: 'var(--primary)', 
                borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #E4EBDD'
              }}>
                <Coffee size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem' }}>Aporte por única vez</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem', flex: 1 }}>
                Una pequeña contribución (vía Cafecito) para ayudarnos a sostener la infraestructura de red.
              </p>
              <button style={{ 
                width: 'fit-content', padding: '0.8rem 1.8rem', borderRadius: '12px', 
                background: '#2D3A20', color: 'white', border: 'none', fontWeight: '900', 
                fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' 
              }}>
                Invitar café
              </button>
            </div>

            {/* Miembro Fundador (Featured - MÁS GRANDE Y ELEVADA) */}
            <div style={{ 
              background: 'var(--primary-dark)', padding: '3.5rem', borderRadius: '40px', color: 'white',
              display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)', 
              boxShadow: '0 30px 70px rgba(45, 58, 32, 0.4)', transition: 'all 0.3s ease'
            }} className="refined-card featured">
              <div style={{ 
                width: '55px', height: '55px', background: 'rgba(255,255,255,0.15)', color: 'white', 
                borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' 
              }}>
                <Sparkles size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: 'white', marginBottom: '1rem' }}>Miembro Fundador</h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '3rem', flex: 1, fontWeight: '500' }}>
                Sostén la red con un aporte mensual y sé parte activa del equipo que elige el futuro de Alimnet.
              </p>
              <button style={{ 
                width: 'fit-content', padding: '1rem 2.2rem', borderRadius: '14px', 
                background: 'white', color: 'var(--primary-dark)', border: 'none', fontWeight: '1000', 
                fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>
                Unirme como Fundador
              </button>
            </div>
          </div>
        </div>

        {/* ACCIÓN COMUNITARIA (SLIM) */}
        <div style={{ marginBottom: '8rem', padding: '4rem', background: '#F8F9F5', borderRadius: '40px', border: '1px solid #E4EBDD' }}>
           <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
             <div>
               <div style={{ width: '45px', height: '45px', background: 'white', color: 'var(--primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', border: '1px solid #E4EBDD' }}>
                 <ShieldCheck size={22} />
               </div>
               <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>Tu palabra es poder.</h2>
               <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '2rem', fontWeight: '500' }}>
                 Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real, cuidado y honesto. Alimnet se basa en la confianza mutua entre quienes comen y quienes producen.
               </p>
               <button 
                onClick={() => window.location.href = '/explorar'}
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

        {/* QUIENES ESTÁN DETRÁS (OPCIÓN B: CARTA DEL FUNDADOR) */}
        <div style={{ marginBottom: '8rem' }}>
          <div style={{ 
            background: 'white', padding: '4rem', borderRadius: '48px', border: '1px solid #E4EBDD',
            boxShadow: '0 30px 60px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                 <div style={{ 
                   width: '240px', height: '240px', borderRadius: '50%', overflow: 'hidden', 
                   border: '6px solid #F0F4ED', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                 }}>
                   <img src="/tomas_profile.jpg" alt="Tomas Vukojicic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                 </div>
                 <div style={{ marginTop: '1.5rem' }}>
                   <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Tomas Vukojicic</h3>
                   <p style={{ fontSize: '0.7rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Creador de Alimnet</p>
                 </div>
              </div>

              <div>
                <blockquote style={{ display: 'block', fontSize: '1.4rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '2rem', lineHeight: '1.4', fontStyle: 'italic' }}>
                   "Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. <br /><br />Esa búsqueda fue el punto de partida."
                </blockquote>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', fontWeight: '550' }}>
                   <p>
                     Tomás Vukojicic tiene más de 15 años de experiencia en gastronomía y en los últimos años trabajó en tecnología dentro del mundo de startups.
                   </p>
                   <p>
                     Hoy impulsa Alimnet como una forma de organizar y facilitar el acceso a una alimentación más consciente, conectando personas con productores y espacios alineados a ese cuidado.
                   </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', background: '#F8F9F5', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)' }}>
                     <Globe size={16} /> Visión Global
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', background: '#F8F9F5', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)' }}>
                     <ShieldCheck size={16} /> Fundamento Ético
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ALIANZAS Y CONTACTO CIERRE */}
        <div style={{ 
          background: '#2D3A20', borderRadius: '40px', padding: '4rem', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem'
        }}>
           <div style={{ maxWidth: '500px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '950', marginBottom: '1rem' }}>¿Representas a un proyecto de impacto?</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>
                Buscamos alianzas sutiles con ONGs, gobiernos locales y organizaciones que busquen fortalecer la soberanía alimentaria.
              </p>
           </div>
           <a href="mailto:info@alimnet.com" style={{ 
             padding: '1.2rem 2.5rem', background: 'var(--primary)', color: 'white', 
             borderRadius: '16px', fontWeight: '1000', fontSize: '0.9rem', 
             textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px',
             boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
           }}>
             CONTACTAR AL EQUIPO <Mail size={18} />
           </a>
        </div>

        {/* CONTACTO DIRECTO FINAL (Home Style) */}
        <div style={{ padding: '8rem 0 0', textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '15px', 
            padding: '1rem 2rem', background: '#F4F1E6', borderRadius: '40px',
            border: '1px solid #E4EBDD'
          }}>
            <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Mail size={20} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: '0', fontWeight: '900' }}>Consultas directas</p>
              <a href="mailto:info@alimnet.com" style={{ fontSize: '1.1rem', fontWeight: '1000', color: 'var(--primary-dark)', textDecoration: 'none' }}>info@alimnet.com</a>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER PREMIUM REFINADO */}
      <footer style={{ padding: '6rem 2rem 4rem', background: 'white', borderTop: '1px solid #E4EBDD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>ALIMNET</div>
              <p style={{ fontSize: '0.9rem', color: '#777', maxWidth: '300px', lineHeight: '1.7', fontWeight: '500' }}>
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

          <div style={{ borderTop: '1px solid #F0F4ED', paddingTop: '2.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#AAA', fontWeight: '600' }}>
            <div>© 2026 Alimnet. Cultivando redes locales.</div>
            <div>Argentina | Propósito Global</div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .refined-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
        .featured:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(45, 58, 32, 0.25); }
      `}</style>
    </div>
  );
}
