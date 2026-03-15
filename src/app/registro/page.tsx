'use client';

import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de registro
    setTimeout(() => {
      window.location.href = '/explorar';
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
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
            <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Únete a la Red</h1>
            <p style={{ color: 'var(--text-secondary)', fontWeight: '550' }}>Sé parte de la comunidad que elige alimentos reales.</p>
          </div>

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Google Signup */}
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
              Registrarme con Google
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
              <span style={{ fontSize: '0.7rem', color: '#aaa', fontWeight: '800', textTransform: 'uppercase' }}>o con email</span>
              <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nombre Completo</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" required
                  placeholder="Tu nombre"
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#F8F9F5', outline: 'none', fontSize: '0.95rem' }}
                />
                <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Correo Electrónico</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="email" required
                  placeholder="ejemplo@correo.com"
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: '#F8F9F5', outline: 'none', fontSize: '0.95rem' }}
                />
                <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" required
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
              {loading ? 'Creando cuenta...' : 'Crear mi cuenta'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              ¿Ya tienes una cuenta? <br />
              <button 
                onClick={() => window.location.href = '/login'} 
                style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '900', cursor: 'pointer', padding: '5px' }}
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </main>

      <div style={{ background: 'white', padding: '3rem 2rem', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {[
            'Apoyo a productores locales',
            'Alimentos sin ultraprocesados',
            'Comunidad consciente',
            'Acceso a precios justos'
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontSize: '0.85rem', fontWeight: '800' }}>
              <CheckCircle2 size={16} color="var(--primary)" /> {text}
            </div>
          ))}
        </div>
      </div>

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
