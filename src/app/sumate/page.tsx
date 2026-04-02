'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Leaf, 
  Store, 
  MapPin, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  Compass,
  Heart
} from 'lucide-react';
import Header from '@/components/Header';

export default function SumatePage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '80px', paddingBottom: '40px' }}>
      <Header />
      
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '1rem', background: '#F0F4ED', padding: '8px 16px', borderRadius: '30px' }}>
            <Heart size={16} fill="#5F7D4A" fillOpacity={0.2} /> Sumate a la Red
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '1000', color: '#2D3A20', margin: 0, letterSpacing: '-0.04em' }}>Expandamos la comunidad</h1>
          <p style={{ color: '#888', fontSize: '1.2rem', fontWeight: '600', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
            Elegí cómo querés participar hoy en Alimnet. Cada aporte fortalece nuestra soberanía alimentaria.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* OPCIÓN 1: VECINO / COLABORADOR */}
          <div 
            onClick={() => router.push('/sumar-comercio-vecino')}
            style={{ 
              background: 'white', borderRadius: '40px', padding: '3rem', border: '1px solid #E4EBDD', 
              cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden'
            }}
            className="card-choice secondary"
          >
            <div style={{ width: '70px', height: '70px', borderRadius: '24px', background: '#5F7D4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Plus size={32} strokeWidth={3} />
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.8rem' }}>Soy vecino y quiero recomendar</h2>
              <p style={{ color: '#666', lineHeight: '1.6', fontWeight: '600', fontSize: '1.05rem' }}>
                ¿Conocés un productor, abastecedor, restaurante o chef que no está en el mapa? Sumá la información básica para que otros vecinos puedan conocerlo.
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <MapPin size={18} /> Carga rápida (solo datos básicos)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <Activity size={18} /> Aportá a la construcción colectiva
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <Sparkles size={18} /> Ayudá a otros a comer mejor
              </li>
            </ul>

            <button style={{ 
              marginTop: '1rem', padding: '1.2rem', borderRadius: '20px', border: '1.5px solid #5F7D4A', 
              background: 'white', color: '#5F7D4A', fontWeight: '1000', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer'
            }}>
              RECOMENDAR <ArrowRight size={20} />
            </button>
          </div>

          {/* OPCIÓN 2: DUEÑO / PRODUCTOR */}
          <div 
            onClick={() => router.push('/unirse')}
            style={{ 
              background: 'white', borderRadius: '40px', padding: '3rem', border: '1px solid #E4EBDD', 
              cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden'
            }}
            className="card-choice"
          >
            <div style={{ width: '70px', height: '70px', borderRadius: '24px', background: '#2D3A20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Store size={32} strokeWidth={2.5} />
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.8rem' }}>Soy Productor o Dueño</h2>
              <p style={{ color: '#666', lineHeight: '1.6', fontWeight: '600', fontSize: '1.05rem' }}>
                Registrá tu proyecto, gestioná tu perfil oficial, recibí validaciones y conectate directamente con tu comunidad local.
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <ShieldCheck size={18} /> Perfil oficial validado
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <Compass size={18} /> Aparición destacada en el mapa
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem' }}>
                <Users size={18} /> Gestión de catálogo y contacto
              </li>
            </ul>

            <button style={{ 
              marginTop: '1rem', padding: '1.2rem', borderRadius: '20px', border: 'none', 
              background: '#2D3A20', color: 'white', fontWeight: '1000', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer'
            }}>
              REGISTRAR MI COMERCIO <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={18} strokeWidth={2.5} /> Alimnet cura cada propuesta para garantizar la calidad de la red.
          </p>
        </div>
      </main>

      <style jsx>{`
        .card-choice:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(45, 58, 32, 0.08);
          border-color: #5F7D4A;
        }
        .card-choice.secondary:hover {
          box-shadow: 0 30px 60px rgba(95, 125, 74, 0.08);
        }
      `}</style>
    </div>
  );
}

const Activity = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
);

const Sparkles = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
);
