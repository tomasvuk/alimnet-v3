'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Heart, ShieldCheck, Users, User, ArrowRight, Mail, Coffee, Instagram, Linkedin, Menu, X } from 'lucide-react';

export default function SostenerAlimnetPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text-primary)' }}>
      
      {/* Header Responsive */}
      <header style={{ 
        padding: isMobile ? '1rem' : '1.5rem 2rem', 
        background: 'white', 
        borderBottom: '1px solid var(--border)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: isMobile ? "1.1rem" : "1.2rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}
        >
          <Leaf size={isMobile ? 20 : 24} fill="var(--primary)" fillOpacity={0.25} /> ALIMNET
        </div>
        <button 
          onClick={() => window.location.href = '/explorar'} 
          style={{ 
            background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', 
            padding: isMobile ? '0.4rem 0.8rem' : '0.6rem 1.2rem', 
            borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: isMobile ? '0.75rem' : '0.85rem'
          }}
        >
          {isMobile ? "Mapa" : "Volver al Mapa"}
        </button>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '4rem 1.5rem' : '6rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '4rem' : '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Heart size={16} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ fontSize: isMobile ? '1.05rem' : '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.7', fontWeight: '550' }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. No cobramos comisiones ni pautas a los productores. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* Sección 1: Soporte Económico */}
        <div style={{ marginBottom: isMobile ? '4rem' : '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: '900', color: 'var(--primary-dark)' }}>Soporte para la Sustentabilidad</h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Elige cómo ayudarnos a mantener la red activa y libre de publicidad.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: isMobile ? '2rem' : '3rem', borderRadius: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '50px', height: '50px', background: '#F0F4ED', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Coffee size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Aporte por única vez</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                Una pequeña contribución (vía Cafecito) que nos ayuda a solventar los costos de servidores mensuales.
              </p>
              <button onClick={() => window.open('https://cafecito.app/alimnet', '_blank')} className="button button-primary" style={{ width: '100%', borderRadius: '14px', padding: '1rem', fontWeight: '950' }}>Invitar un café (Cafecito)</button>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #1A2419 0%, #3D4F37 100%)', 
              padding: isMobile ? '2rem' : '3.5rem', borderRadius: '40px', color: 'white', position: 'relative', overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(45, 58, 38, 0.25)', border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {!isMobile && <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '950', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recomendado</div>}
              <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', color: 'white', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <Users size={30} />
              </div>
              <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', fontWeight: '950', marginBottom: '1rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>Miembro Fundador</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500' }}>
                Tu aporte mensual nos permite tener un equipo dedicado a la mejora continua de esta comunidad y servidores estables.
              </p>
              <button style={{ 
                width: '100%', borderRadius: '18px', padding: '1.2rem', background: 'white', color: '#1A2419', 
                border: 'none', fontWeight: '1000', cursor: 'pointer', fontSize: '1.1rem',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}>
                Suscribirme Mensual
              </button>
            </div>
          </div>
        </div>

        {/* Sección 2: Acción Comunitaria Responsive */}
        <div style={{ marginBottom: isMobile ? '4rem' : '6rem', background: 'white', borderRadius: isMobile ? '32px' : '50px', padding: isMobile ? '2rem' : '4rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ width: '60px', height: '60px', background: '#F0F4ED', color: 'var(--primary)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <ShieldCheck size={32} />
              </div>
              <h2 style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem' }}>Tu palabra es poder</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '1rem' : '1.1rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Validar a un productor no es solo darle un "like"; es confirmar que su trabajo es real. Alimnet se basa en la confianza mutua.
              </p>
              <button 
                onClick={() => window.location.href = '/explorar'} 
                style={{ width: isMobile ? '100%' : 'auto', padding: '1rem 2rem', background: 'none', border: '2px solid var(--primary)', color: 'var(--primary)', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}
              >
                Ir al Mapa y Validar
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Confianza', text: 'Cada validación eleva el prestigio.' },
                { label: 'Visibilidad', text: 'Aparecen primero en el mapa.' },
                { label: 'Seguridad', text: 'Protegemos a la comunidad.' },
                { label: 'Crecimiento', text: 'Muestra que somos más.' }
              ].map((item, i) => (
                <div key={i} style={{ padding: '1.2rem', background: '#F8F9F5', borderRadius: '20px' }}>
                  <div style={{ fontWeight: '950', color: 'var(--primary-dark)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.3' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección 3: Nuestra Historia Responsive */}
        <div style={{ marginBottom: isMobile ? '4rem' : '6rem', padding: isMobile ? '0' : '0 2rem' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '2rem' : '4rem', alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ 
              width: isMobile ? '200px' : '240px', height: isMobile ? '200px' : '240px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, 
              background: '#F4F1E6', border: '6px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <img src="/tomas_profile_v2.jpg" alt="Tomas Vukojicic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>¿Quiénes están detrás?</h2>
              <div style={{ fontSize: isMobile ? '0.95rem' : '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontWeight: '550' }}>
                <p style={{ marginBottom: '1rem' }}>
                   "Hola, soy <span style={{ color: 'var(--primary-dark)', fontWeight: '900' }}>Tomas Vukojicic</span>, el creador de Alimnet. Este proyecto nació de encontrar alimentos que respeten la biodiversidad."
                </p>
                <p>
                  Creo en la tecnología como herramienta de conexión humana. Gracias por ser parte de este encuentro de conciencia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 4: Impacto Responsive */}
        <div style={{ background: '#F0F4ED', borderRadius: isMobile ? '32px' : '50px', padding: isMobile ? '2rem' : '4rem', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '3rem', alignItems: 'center', textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>¿Impacto?</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', fontSize: '1rem' }}>
              Buscamos alianzas con ONGs y municipios que quieran fortalecer la economía circular.
            </p>
            <a href="mailto:info@alimnet.com" className="button button-primary" style={{ width: isMobile ? '100%' : 'auto', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              Escribinos <Mail size={18} />
            </a>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
             <div style={{ width: '160px', height: '160px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Leaf size={80} color="white" fill="white" fillOpacity={0.2} />
                <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'white', padding: '12px', borderRadius: '18px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                   <span style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)' }}>+1000</span>
                   <div style={{ fontSize: '0.6rem', fontWeight: '800', color: 'var(--text-secondary)' }}>Mapeados</div>
                </div>
             </div>
          </div>
        </div>
      </main>

      <footer style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', textAlign: 'center', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <Instagram size={24} color="var(--primary-dark)" />
          <Heart size={24} color="var(--primary-dark)" />
          <Linkedin size={24} color="var(--primary-dark)" />
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>© 2026 ALIMNET</p>
      </footer>
    </div>
  );
}
