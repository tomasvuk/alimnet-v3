'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

export default function ErrorPage() {
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
              background: 'linear-gradient(135deg, #FDF0EE 0%, #F8DDD9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              flexShrink: 0,
            }}
          >
            <AlertCircle size={40} color="#BC4B51" strokeWidth={2.2} />
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FDF0EE',
              color: '#BC4B51',
              borderRadius: '30px',
              padding: '0.35rem 1rem',
              fontSize: '0.72rem',
              fontWeight: '1000',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            <AlertCircle size={12} strokeWidth={2.5} />
            Error de pago
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
            Algo salio mal con el pago
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: '#5A5A52',
              fontSize: '0.97rem',
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '380px',
            }}
          >
            No se proceso ningun cargo. Podes intentarlo nuevamente.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              width: '100%',
            }}
          >
            <button
              onClick={() => router.push('/sostener')}
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
              <RefreshCw size={16} strokeWidth={2.5} />
              Intentar de nuevo
            </button>

            <button
              onClick={() => router.push('/')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'transparent',
                color: '#3F5232',
                border: '2px solid #DCD7C5',
                borderRadius: '18px',
                padding: '0.9rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: '900',
                cursor: 'pointer',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#5F7D4A';
                (e.currentTarget as HTMLButtonElement).style.color = '#5F7D4A';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#DCD7C5';
                (e.currentTarget as HTMLButtonElement).style.color = '#3F5232';
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
