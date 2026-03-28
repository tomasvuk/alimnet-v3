'use client';

import React from 'react';
import Header from '@/components/Header';
import { 
  Heart, ShieldCheck, CheckCircle2, Globe, Users, Sparkles, 
  Leaf, Info, ArrowDown, Share2, Award
} from 'lucide-react';
import DonationHub from '@/components/donations/DonationHub';
import { motion } from 'framer-motion';

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

      <main style={{ flex: 1, width: '100%' }}>
        
        {/* SECTION 1: HERO IMPACTO ARRIBA */}
        <section style={{ 
          padding: 'clamp(5rem, 15vw, 10rem) 1rem', 
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
              background: '#F0F4ED', color: 'var(--primary)', borderRadius: '30px', 
              fontSize: '0.7rem', fontWeight: '1000', marginBottom: '2rem', 
              textTransform: 'uppercase', letterSpacing: '0.1em' 
            }}
          >
            <Sparkles size={14} /> El Código de la Tierra
          </motion.div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '2rem', letterSpacing: '-0.06em', lineHeight: '0.95' 
          }}>
            Alimnet no existe <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>sin vos.</span>
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.4rem)', color: 'var(--text-secondary)', 
            fontWeight: '600', lineHeight: '1.5', maxWidth: '700px', margin: '0 auto' 
          }}>
            Estamos construyendo la mayor red de soberanía alimentaria del mundo. Sin inversores, sin publicidad, sin rastreadores. Solo humanos recuperando el control de su comida.
          </p>
          <div style={{ marginTop: '3rem', color: '#A5B598' }}><ArrowDown className="animate-bounce" /></div>
        </section>

        {/* SECTION 2: LA MÍSTICA DEL FUNDADOR (LO QUE HABÍAMOS PERDIDO) */}
        <section style={{ 
          background: 'white', 
          padding: 'clamp(4rem, 12vw, 8rem) 1rem',
          borderTop: '2.5px solid #E4EBDD',
          borderBottom: '2.5px solid #E4EBDD'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
                 <div style={{ background: 'var(--primary)', color: 'white', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    <Award size={28} />
                 </div>
                 <h2 style={{ fontSize: '2.5rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
                    Convertite en <br/> Miembro Fundador.
                 </h2>
                 <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.7', marginBottom: '2rem' }}>
                    Los miembros fundadores son el 1% que sostiene al otro 99%. Tu aporte mensual no solo paga servidores; garantiza que Alimnet siga siendo un proyeto de **impacto social** libre de influencia corporativa.
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      'Medalla exclusiva de "Fundador" en tu perfil público.',
                      'Acceso a reportes trimestrales de avance y transparencia.',
                      'Voto prioritario en futuras funcionalidades.',
                      'La satisfacción de ser el motor de este cambio.'
                    ].map(item => (
                      <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontWeight: '800', color: 'var(--primary-dark)', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={18} color="var(--primary)" /> {item}
                      </li>
                    ))}
                 </ul>
            </div>
            <div style={{ 
                background: '#F0F4ED', 
                borderRadius: '48px', 
                padding: '3rem', 
                position: 'relative' as const,
                border: '1.5px solid #E4EBDD'
            }}>
                <div style={{ fontSize: '1.1rem', color: 'var(--primary-dark)', fontWeight: '950', fontStyle: 'italic', lineHeight: '1.4' }}>
                   "En un mundo donde nos venden ultraprocesados como alimento, la independencia de Alimnet es nuestra única herramienta de resistencia."
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                    <div>
                        <div style={{ fontWeight: '1000', fontSize: '0.9rem' }}>Equipo Alimnet</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)' }}>Soberanía Digital</div>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: EL SELECTOR (EL MOTR DE ACCIÓN) */}
        <section style={{ 
            padding: '8rem 1rem',
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            background: 'var(--background)'
        }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '3rem', textAlign: 'center' }}>
                Elegí tu nivel de <span style={{ color: 'var(--primary)' }}>impacto.</span>
            </h2>
            <DonationHub forcedFrequency="monthly" />
        </section>

        {/* SECTION 4: IMPACTO GLOBAL */}
        <section style={{ 
            padding: '6rem 1rem', 
            background: 'white', 
            textAlign: 'center',
            borderTop: '2px solid #E4EBDD'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <Globe size={40} color="var(--primary)" style={{ margin: '0 auto 2rem' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Impacto Global, <br/> Corazón Local.</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '600', lineHeight: '1.6', marginBottom: '3rem' }}>
                    No importa dónde estés. Alimnet está mapeando la soberanía alimentaria desde Argentina para el mundo. Tu aporte internacional en USD nos permite escalar la infraestructura para proteger este legado.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '1000', color: 'var(--primary)' }}>+500</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#A5B598' }}>Productores Mapaedos</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', fontWeight: '1000', color: 'var(--primary)' }}>100%</div>
                        <div style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: '#A5B598' }}>Libre de Publicidad</div>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer style={{ padding: '6rem 2rem', background: 'var(--primary-dark)', color: 'white', textAlign: 'center', borderRadius: '48px 48px 0 0' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          Alimnet - El Código de la Tierra
        </p>
      </footer>
    </div>
  );
}
