'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ArrowLeft, Mail } from 'lucide-react';
import Header from '@/components/Header';

export default function PendingPage() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F4F1E6',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      <Header />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '90px',
          paddingBottom: '3rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '40px',
            boxShadow: '0 20px 50px rgba(63, 82, 50, 0.10)',
            padding: 'clamp(2rem, 6vw, 3.5rem)',
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FDF7EE 0%, #F8E9CC 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              flexShrink: 0,
            }}
          >
            <Clock size={40} color="#D4A373" strokeWidth={2.2} />
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FDF7EE',
              color: '#B8832A',
              borderRadius: '30px',
              padding: '0.35rem 1rem',
              fontSize: '0.72rem',
              fontWeight: '1000',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            <Clock size={12} strokeWidth={2.5} />
            Pago pendiente
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              fontWeight: '950',
              color: '#3F5232',
              letterSpacing: '-0.04em',
              lineHeight: '1.15',
              marginBottom: '0.9rem',
            }}
          >
            Tu pago esta en proceso
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: '#5A5A52',
              fontSize: '0.97rem',
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: '1.4rem',
              maxWidth: '380px',
            }}
          >
            Mercado Pago esta verificando tu pago. Esto puede demorar algunos minutos.
          </p>

          {/* Info block */}
          <div
            style={{
              background: '#F8F6F0',
              border: '1.5px solid #E8E2D0',
              borderRadius: '20px',
              padding: '1rem 1.3rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              textAlign: 'left',
              marginBottom: '2rem',
              width: '100%',
            }}
          >
            <Mail size={18} color="#D4A373" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }} />
            <p
              style={{
                color: '#5A5A52',
                fontSize: '0.85rem',
                fontWeight: '600',
                lineHeight: '1.5',
                margin: 0,
              }}
            >
              Recibiras una confirmacion por email cuando se acredite.
            </p>
          </div>

          {/* CTA Button */}
          <div style={{ width: '100%' }}>
            <button
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#5F7D4A',
                color: '#F4F1E6',
                border: 'none',
                borderRadius: '18px',
                padding: '0.9rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '900',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                width: '100%',
                boxShadow: '0 8px 20px rgba(95, 125, 74, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#3F5232';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#5F7D4A';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              Volver al inicio
            </button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}
