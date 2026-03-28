'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Leaf, Heart, ShieldCheck, Users, Mail, Coffee, Instagram, 
  Linkedin, ArrowRight, Sparkles, CheckCircle, Globe 
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
      
      {/* 1. Header Global */}
      <Header />

      <main style={{ 
        flex: 1, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)' 
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
            fontSize: 'clamp(1.8rem, 7vw, 3rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1.1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(0.9rem, 4.5vw, 1rem)', color: 'var(--text-secondary)', maxWidth: '650px', 
            margin: '0 auto', lineHeight: '1.7', fontWeight: '550', textAlign: 'center' 
          }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. 
            No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </div>

        {/* SECCIÓN 1: DONATION HUB INTERACTIVO */}
        <div style={{ marginBottom: 'clamp(4rem, 10vw, 7rem)', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            background: 'white', 
            padding: 'clamp(1.5rem, 5vw, 3rem)', 
            borderRadius: '48px', 
            border: '2.5px solid #E4EBDD',
            boxShadow: '0 40px 100px rgba(0,0,0,0.03)',
            width: '100%',
            maxWidth: '550px'
          }}>
            <DonationHub />
          </div>
        </div>

        {/* ACCIÓN COMUNITARIA */}
        <div style={{ 
          marginBottom: 'clamp(5rem, 10vw, 8rem)', 
          padding: 'clamp(1.5rem, 6vw, 3rem)', 
          background: '#F8F9F5', 
          borderRadius: '48px', 
          border: '1.5px solid #E4EBDD' 
        }}>
           <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2.5rem', 
              alignItems: 'center' 
            }}>
              <div>
                <ShieldCheck size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Tu palabra es poder.</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  Validar a un productor no es solo darle un "like"; es confirmar su trabajo real. Alimnet es confianza mutua.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                 {['Confianza', 'Visibilidad', 'Seguridad', 'Crecimiento'].map((item) => (
                   <div key={item} style={{ padding: '1.5rem', background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', textAlign: 'center' }}>
                     <span style={{ fontWeight: '1000', color: 'var(--primary-dark)', fontSize: '0.75rem', textTransform: 'uppercase' }}>{item}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </main>

      <footer style={{ padding: '4rem 2rem', background: 'white', borderTop: '1px solid #E4EBDD', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '0.8rem', fontWeight: '600' }}>© 2025 Alimnet. Desarrollado con ❤️ para la soberanía alimentaria.</p>
      </footer>
    </div>
  );
}
