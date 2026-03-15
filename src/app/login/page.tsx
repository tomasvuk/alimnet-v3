'use client';

import React, { useState } from 'react';
import { Leaf, Mail, Lock, ArrowRight, Instagram, Linkedin } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de login para UX inmediata
    setTimeout(() => {
      window.location.href = '/explorar';
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header simplificado */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'center' }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: "1.4rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer', letterSpacing: '-0.03em' }}
        >
          <Leaf size={28} fill="var(--primary)" fillOpacity={0.25} /> ALIMNET
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ maxWidth: '450px', width: '100%', background: 'white', borderRadius: '40px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(63, 82, 50, 0.1)', animation: 'scaleUp 0.4s ease-out' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>¡Hola de nuevo!</h1>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '550' }}>Ingresá a la red de alimentos cuidados.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Google Login Option */}
            <button 
              type="button"
              onClick={() => window.location.href = '/explorar'}
              style={{ 
                width: '100%', padding: '0.8rem', borderRadius: '16px', border: '1px solid var(--border)', 
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                gap: '10px', fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer', marginBottom: '0.5rem',
                color: 'var(--text-primary)'
              }}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '18px' }} />
              Continuar con Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
              <span style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: '800', textTransform: 'uppercase' }}>o con email</span>
              <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Correo Electrónico</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="ejemplo@correo.com"
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#F8F9F5', outline: 'none', fontSize: '0.95rem' }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contraseña</label>
                <a href="#" style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textDecoration: 'none' }}>¿La olvidaste?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#F8F9F5', outline: 'none', fontSize: '0.95rem' }}
                />
                <Lock size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="button button-primary" 
              style={{ width: '100%', padding: '1rem', borderRadius: '16px', marginTop: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {loading ? 'Ingresando...' : 'Entrar a mi cuenta'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '2.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              ¿Aún no tienes cuenta? <br />
              <button 
                onClick={() => window.location.href = '/registro'} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '1000', cursor: 'pointer', padding: '5px', fontSize: '1.1rem' }}
              >
                Crear cuenta de usuario
              </button>
            </p>
            <div style={{ height: '1px', background: '#eee', width: '60%', margin: '0 auto' }}></div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              ¿Eres productor o comerciante? <br />
              <button 
                onClick={() => window.location.href = '/unirse'} 
                style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', fontWeight: '800', cursor: 'pointer', padding: '5px', fontSize: '0.8rem', textDecoration: 'underline' }}
              >
                Registrar mi comercio en Alimnet
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '700' }}>
        © 2026 Alimnet. Cultivando redes locales en Argentina.
      </footer>

      <style jsx>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
