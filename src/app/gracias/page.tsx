'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Heart, ArrowLeft, Compass } from 'lucide-react';
import Header from '@/components/Header';

function GraciasContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('session_id');
  const paymentId = searchParams.get('payment_id');
  const currency = searchParams.get('currency');

  const hasPaymentRef = sessionId || paymentId;

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
              background: 'linear-gradient(135deg, #EAF2E4 0%, #D2E5C7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              flexShrink: 0,
            }}
          >
            <CheckCircle2 size={40} color="#5F7D4A" strokeWidth={2.5} />
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F0F4ED',
              color: '#5F7D4A',
              borderRadius: '30px',
              padding: '0.35rem 1rem',
              fontSize: '0.72rem',
              fontWeight: '1000',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.2rem',
            }}
          >
            <Heart size={12} fill="#5F7D4A" color="#5F7D4A" />
            Donacion recibida
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
              fontWeight: '950',
              color: '#3F5232',
              letterSpacing: '-0.04em',
              lineHeight: '1.1',
              marginBottom: '0.9rem',
            }}
          >
            ¡Gracias por sostener Alimnet!
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: '#5A5A52',
              fontSize: '0.97rem',
              fontWeight: '500',
              lineHeight: '1.6',
              marginBottom: currency ? '1.2rem' : '2rem',
              maxWidth: '380px',
            }}
          >
            Tu aporte hace posible que esta red crezca.
          </p>

          {/* Currency pill */}
          {currency && (
            <div
              style={{
                background: '#F0F4ED',
                border: '1.5px solid #D2E5C7',
                borderRadius: '20px',
                padding: '0.55rem 1.2rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                color: '#5F7D4A',
                marginBottom: '2rem',
              }}
            >
              Recibimos tu donacion en{' '}
              <span style={{ fontWeight: '950' }}>{currency}</span>
            </div>
          )}

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
              width: '100%',
              marginBottom: '1.8rem',
            }}
          >
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

            <button
              onClick={() => router.push('/explorar')}
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
              <Compass size={16} strokeWidth={2.5} />
              Explorar la red
            </button>
          </div>

          {/* Footer note */}
          <p
            style={{
              color: '#A8B8A0',
              fontSize: '0.78rem',
              fontWeight: '600',
              letterSpacing: '0.01em',
            }}
          >
            Se enviara una confirmacion a tu email.
          </p>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            background: '#F4F1E6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Manrope', sans-serif",
            color: '#5F7D4A',
            fontWeight: '700',
          }}
        >
          Cargando...
        </div>
      }
    >
      <GraciasContent />
    </Suspense>
  );
}
