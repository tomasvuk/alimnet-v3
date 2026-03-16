'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Heart, ShieldCheck, Users, User, ArrowRight, Mail, Coffee, Instagram, Linkedin, X } from 'lucide-react';

export default function SostenerAlimnetPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F1E6', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header style={{ 
        padding: isMobile ? '0.8rem 1rem' : '1rem 2rem', 
        background: 'white', 
        borderBottom: '1px solid #eee', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div onClick={() => window.location.href = '/'} style={{ fontSize: "1.1rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}>
          <Leaf size={24} fill="var(--primary)" fillOpacity={0.25} /> ALIMNET
        </div>
        <button 
          onClick={() => window.location.href = '/explorar'} 
          style={{ background: 'none', border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          {isMobile ? "Ir al Mapa" : "Volver al Mapa"}
        </button>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '5rem 2rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: isMobile ? '3rem' : '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.4rem 1rem', background: 'white', color: 'var(--primary)', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '900', marginBottom: '1rem', border: '1px solid #eee' }}>
            <Heart size={14} fill="var(--primary)" /> SOSTENER ALIMNET
          </div>
          <h1 style={{ fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.2rem', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Construyamos el futuro <br /><span style={{ color: 'var(--primary)' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ fontSize: isMobile ? '1rem' : '1.15rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6', fontWeight: '600' }}>
            Somos una red independiente. No cobramos comitivas. Tu aporte nos permite mantener los servidores y seguir mapeando productores honestos.
          </p>
        </div>

        {/* Cards de Aporte */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '4rem' }}>
          {/* Cafecito */}
          <div style={{ background: 'white', padding: isMobile ? '2rem' : '3rem', borderRadius: '32px', border: '1px solid #eee', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <div style={{ width: '44px', height: '44px', background: '#f9f9f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Coffee size={22} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.8rem' }}>Un café por la red</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>Un aporte único para ayudarnos con los costos de infraestructura del mes.</p>
            <button className="simular-btn" style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', borderRadius: '12px' }}>Invitar un café</button>
          </div>

          {/* Fundador */}
          <div style={{ background: '#3F5232', padding: isMobile ? '2rem' : '3rem', borderRadius: '32px', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', padding: '0.3rem 0.8rem', borderRadius: '10px', fontSize: '0.6rem', fontWeight: '900', marginBottom: '1.2rem', textTransform: 'uppercase' }}>Recomendado</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '950', marginBottom: '0.8rem' }}>Miembro Fundador</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>Aporte mensual para sostener el equipo de desarrollo y auditoría de la red.</p>
            <button style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem', borderRadius: '12px', background: 'white', border: 'none', color: '#3F5232', fontWeight: '900', cursor: 'pointer' }}>Sumarme mensualmente</button>
          </div>
        </div>

        {/* Validación Comunitaria */}
        <div style={{ background: 'white', borderRadius: '32px', padding: isMobile ? '2rem' : '3rem', border: '1px solid #eee', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Tu palabra vale mucho</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>No todo es dinero. Validar a un productor es confirmar su honestidad y darle visibilidad en la comunidad.</p>
            <button onClick={() => window.location.href='/explorar'} style={{ background: 'none', border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Ir al mapa y Validar</button>
          </div>
        </div>

        {/* Creador */}
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '4px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
            <img src="/tomas_profile_v2.jpg" alt="Tomas" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Tomas Vukojicic</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem', lineHeight: '1.6', fontStyle: 'italic' }}>
            "Alimnet nació para conectar personas con alimentos reales. Gracias por ser parte de este puente consciente."
          </p>
        </div>

      </main>

      <footer style={{ padding: '3rem 1.5rem', textAlign: 'center', borderTop: '1px solid #eee', background: 'white' }}>
        <p style={{ color: '#999', fontSize: '0.8rem', fontWeight: '700' }}>© 2026 ALIMNET · info@alimnet.com</p>
      </footer>
    </div>
  );
}
