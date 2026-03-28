'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Heart, ShieldCheck, CheckCircle2, Globe, Users, Package 
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

      <main style={{ 
        flex: 1, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center'
      }}>
        
        {/* HERO SECCTION */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
            background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
            fontSize: 'var(--fs-xs)', fontWeight: '1000', marginBottom: '1.5rem', 
            textTransform: 'uppercase', letterSpacing: '0.08em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.05em', lineHeight: '1' 
          }}>
            Financiá la <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>soberanía.</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--text-secondary)', 
            fontWeight: '600', lineHeight: '1.5', maxWidth: '600px', margin: '0 auto' 
          }}>
            Alimnet no tiene inversores ni publicidad. Somos financiados 100% por personas que valoran la comida real y el software libre.
          </p>
        </div>

        {/* MASTER DONATION BLOCK */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '8rem' }}>
          <DonationHub forcedFrequency="monthly" />
        </div>

        {/* VALORES Y TRANSPARENCIA */}
        <div style={{ 
          width: '100%', 
          maxWidth: '1000px',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '3rem',
          padding: '4rem',
          background: 'white',
          borderRadius: '48px',
          border: '2px solid #E4EBDD'
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <ShieldCheck size={32} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Transparencia Radical</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6' }}>
                  Cada centavo que entra a Alimnet se usa para pagar servidores, desarrollo de código abierto y mapeo de soberanía.
                </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Users size={32} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Comunidad de Miembros</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6' }}>
                  Los miembros mensuales reciben la medalla de "Fundador" y acceso a reportes trimestrales de impacto.
                </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Globe size={32} color="var(--primary)" />
                <h3 style={{ fontSize: '1.4rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>Alcance Global</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6' }}>
                  Aceptamos pagos internacionales (USD) desde cualquier parte del mundo para sostener la red.
                </p>
            </div>
        </div>

      </main>

      <footer style={{ padding: '6rem 2rem', background: 'var(--background)', textAlign: 'center' }}>
        <p style={{ color: '#888', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Alimnet - El Código de la Tierra
        </p>
      </footer>
    </div>
  );
}
