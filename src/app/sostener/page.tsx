'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Heart, ShieldCheck, Instagram, Linkedin, Mail, Sparkles, Globe 
} from 'lucide-react';
import DonationHub from '@/components/donations/DonationHub';

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
      
      <Header />

      <main style={{ flex: 1, width: '100%' }}>
        
        {/* HERO REFINADO */}
        <section style={{ 
            padding: 'clamp(3rem, 10vw, 5rem) 1rem', 
            textAlign: 'center', 
            maxWidth: '900px', 
            margin: '0 auto' 
        }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.4rem 1rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: 'var(--fs-xs)', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 7vw, 3.2rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.2rem', letterSpacing: '-0.04em', lineHeight: '1.1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '500', maxWidth: '600px', margin: '0 auto', lineHeight: '1.5' }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. 
            No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </section>

        {/* 🚀 BLOQUE UNIFICADO STARTUP STYLE (HORIZONTAL) */}
        <section style={{ padding: '0 1rem 6rem 1rem', display: 'flex', justifyContent: 'center' }}>
            <DonationHub />
        </section>

        {/* ACCIÓN COMUNITARIA: TU PALABRA ES PODER */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1.5rem' }}>
            <div style={{ 
              background: 'white', padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '48px', border: '1.5px solid #E4EBDD',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' 
            }}>
                <div>
                     <ShieldCheck size={36} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                     <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1rem', letterSpacing: '-0.04em' }}>Tu palabra es poder.</h2>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem', fontWeight: '600' }}>
                        Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real, cuidado y honesto. Alimnet se basa en la confianza mutua.
                     </p>
                     <button style={{ 
                        padding: '1rem 2.22rem', borderRadius: '14px', border: '2px solid var(--primary)', 
                        background: 'transparent', color: 'var(--primary)', fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer' 
                     }}>
                        IR AL MAPA Y VALIDAR
                     </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {[
                        { label: 'Confianza', sub: 'Prestigio social.' },
                        { label: 'Visibilidad', sub: 'Top del mapa.' },
                        { label: 'Seguridad', sub: 'Sin intermediarios.' },
                        { label: 'Crecimiento', sub: 'Soberanía real.' }
                    ].map(item => (
                        <div key={item.label} style={{ padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', textAlign: 'center', border: '1px solid #E4EBDD' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '4px', textTransform: 'uppercase' }}>{item.label}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '700' }}>{item.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* BIO: TOMÁS VUKOJICIC (SWAPPED) */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1.5rem' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '220px', height: '220px', borderRadius: '50%', background: '#F0F4ED', padding: '8px', border: '2px solid var(--primary)', margin: '0 auto 2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                        <img 
                            src="/tomas_profile.jpg" 
                            alt="Tomas Vukojicic" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
                        />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: '0 0 5px 0', textTransform: 'uppercase' }}>TOMÁS VUKOJICIC</h3>
                    <p style={{ fontSize: '0.65rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Creador de Alimnet</p>
                </div>
                <div>
                     {/* 1. Trayectoria (Arriba) */}
                     <div style={{ marginBottom: '2.5rem' }}>
                        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontWeight: '600' }}>
                            Tomás Vukojicic tiene más de 15 años de experiencia en gastronomía y en los últimos años trabajó en tecnología dentro del mundo de startups.
                            <br /><br />
                            Hoy impulsa Alimnet como una forma de organizar y facilitar el acceso a una alimentación más consciente, conectando personas con productores alineados a ese cuidado.
                        </p>
                     </div>
                     {/* 2. Cita (Abajo) */}
                     <div style={{ background: '#F0F4ED', padding: '2.5rem', borderRadius: '40px 40px 40px 4px', border: '1.5px solid #E4EBDD' }}>
                         <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '1000', fontStyle: 'italic', lineHeight: '1.5', color: 'var(--primary-dark)' }}>
                            “Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. Esa búsqueda fue el punto de partida.”
                         </p>
                     </div>
                </div>
             </div>
        </section>

        {/* ALIANZAS / PROYECTOS */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1.5rem' }}>
            <div style={{ 
                background: '#F0F4ED', padding: '3.5rem', borderRadius: '48px', 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem',
                border: '1.5px solid #E4EBDD'
            }}>
                <div style={{ maxWidth: '550px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1.2rem' }}>¿Representas a un proyecto?</h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6' }}>Buscamos alianzas sutiles con ONGs, gobiernos locales y marcas que busquen fortalecer la soberanía alimentaria regional.</p>
                </div>
                <button style={{ 
                    padding: '1.2rem 2.8rem', borderRadius: '18px', background: '#2D3A20', color: 'white', 
                    border: 'none', fontWeight: '1000', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                    boxShadow: '0 20px 40px rgba(45, 58, 32, 0.15)'
                }}>
                    CONTACTAR <Mail size={18} />
                </button>
            </div>
        </section>

      </main>

      {/* FOOTER SYNC CON HEADER */}
      <footer style={{ padding: '6rem 2rem 3rem 2rem', background: 'white', borderTop: '1.5px solid #E4EBDD' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            <div style={{ maxWidth: '350px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>ALIMNET</div>
                <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.7', fontWeight: '550', marginBottom: '2rem' }}>
                    Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
                </p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <Instagram size={22} color="var(--primary-dark)" />
                    <Linkedin size={22} color="var(--primary-dark)" />
                    <Mail size={22} color="var(--primary-dark)" />
                </div>
            </div>
            <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>MENÚ</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px', fontSize: '0.88rem', fontWeight: '800' }}>
                    <li><a href="/explorar" style={{ color: '#666', textDecoration: 'none' }}>Explorar mapa</a></li>
                    <li><a href="/sostener" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Sostener Alimnet</a></li>
                    <li><a href="/ingresar" style={{ color: '#666', textDecoration: 'none' }}>Ingresar</a></li>
                    <li><button style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '30px', fontWeight: '1000', fontSize: '0.75rem' }}>Crear cuenta</button></li>
                </ul>
            </div>
            <div>
                 <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>EXPLORAR</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px', fontSize: '0.88rem', fontWeight: '800' }}>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Blog</a></li>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Panel Comercial</a></li>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Registrar mi comercio</a></li>
                </ul>
            </div>
            <div>
                 <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LEGAL</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px', fontSize: '0.88rem', fontWeight: '800' }}>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Privacidad</a></li>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Términos</a></li>
                    <li><a href="#" style={{ color: '#666', textDecoration: 'none' }}>Cookies</a></li>
                </ul>
            </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '5rem auto 0 auto', paddingTop: '2rem', borderTop: '1px solid #F0F4ED', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', color: '#A5B598' }}>
            <div>© 2025 Alimnet. Cultivando redes locales.</div>
            <div style={{ display: 'flex', gap: '25px' }}>
                <span>Argentina</span>
                <span>Impacto Global</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
