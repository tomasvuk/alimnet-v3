'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { PenLine } from 'lucide-react';

export default function BlogPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Manrope', sans-serif; box-sizing: border-box; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#F8F9F5',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
      }}>
        <Header />

        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '70px',
          padding: '70px 1rem 3rem',
        }}>
          <div style={{
            background: 'white',
            borderRadius: '40px',
            padding: 'clamp(2.5rem, 8vw, 4rem) clamp(2rem, 6vw, 3.5rem)',
            maxWidth: '600px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 4px 40px rgba(45, 58, 32, 0.08)',
            border: '1px solid #E8EDE2',
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#F0F4ED',
              color: '#5F7D4A',
              borderRadius: '30px',
              padding: '0.35rem 1rem',
              fontSize: '0.7rem',
              fontWeight: '900',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}>
              Proximamente
            </div>

            {/* Icon */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '32px',
              background: '#F0F4ED',
              margin: '0 auto 1.5rem',
            }}>
              <PenLine size={36} color="#5F7D4A" strokeWidth={2} />
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 6vw, 3rem)',
              fontWeight: '900',
              color: '#2D3A20',
              margin: '0 0 1rem',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Blog
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1rem',
              color: '#6B7C5A',
              fontWeight: '500',
              lineHeight: 1.6,
              margin: '0 0 2.5rem',
              maxWidth: '440px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Estamos preparando contenido sobre alimentacion real, productores locales
              y soberania alimentaria.
            </p>

            {/* Form */}
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  maxWidth: '420px',
                  margin: '0 auto',
                }}
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '0.9rem 1.2rem',
                    borderRadius: '16px',
                    border: '1.5px solid #E4EBDD',
                    fontSize: '0.95rem',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: '500',
                    color: '#2D3A20',
                    background: '#F8F9F5',
                    outline: 'none',
                    width: '100%',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#5F7D4A')}
                  onBlur={(e) => (e.target.style.borderColor = '#E4EBDD')}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.9rem 1.5rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: '#5F7D4A',
                    color: 'white',
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: '800',
                    fontSize: '0.85rem',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'background 0.2s, transform 0.1s',
                    width: '100%',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = '#4A6438')}
                  onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = '#5F7D4A')}
                >
                  Avisame cuando este listo
                </button>
              </form>
            ) : (
              <div style={{
                background: '#F0F4ED',
                borderRadius: '20px',
                padding: '1.2rem 2rem',
                maxWidth: '420px',
                margin: '0 auto',
              }}>
                <p style={{
                  color: '#5F7D4A',
                  fontWeight: '800',
                  fontSize: '1rem',
                  margin: 0,
                }}>
                  Listo! Te avisamos cuando el blog este disponible.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '1.5rem 1rem',
          color: '#9AAB88',
          fontSize: '0.8rem',
          fontWeight: '600',
        }}>
          <span>2026 Alimnet — </span>
          <button
            onClick={() => router.push('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#5F7D4A',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: '700',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            Volver al inicio
          </button>
        </footer>
      </div>
    </>
  );
}
