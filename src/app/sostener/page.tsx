'use client';

import React, { useState, useRef } from 'react';
import Header from '@/components/Header';
import { 
  Heart, Coffee, Sparkles, ShieldCheck, CheckCircle2, 
  MapPin, MessageSquare, ArrowRight, Instagram, Linkedin, Mail, ExternalLink
} from 'lucide-react';
import DonationHub from '@/components/donations/DonationHub';
import { motion, AnimatePresence } from 'framer-motion';

export default function SostenerAlimnetPage() {
  const [initialFreq, setInitialFreq] = useState<'once' | 'monthly' | null>(null);
  const hubRef = useRef<HTMLDivElement>(null);

  const scrollToHub = (freq: 'once' | 'monthly') => {
    setInitialFreq(freq);
    setTimeout(() => {
        hubRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#F0F4ED', 
      color: 'var(--text-primary)', 
      display: 'flex', 
      flexDirection: 'column',
      width: '100vw',
      overflowX: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }}>
      
      <Header />

      <main style={{ flex: 1, width: '100%' }}>
        
        {/* HERO SECTION - CLON DEL ORIGINAL */}
        <section style={{ 
            padding: 'clamp(4rem, 10vw, 6rem) 1rem', 
            textAlign: 'center', 
            maxWidth: '1000px', 
            margin: '0 auto' 
        }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.4rem 1rem', 
            color: 'var(--primary)', fontSize: '0.65rem', fontWeight: '1000', marginBottom: '1rem', 
            textTransform: 'uppercase', letterSpacing: '0.1em' 
          }}>
            <Heart size={14} fill="var(--primary)" /> Sostener alimnet
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 8vw, 3.8rem)', fontWeight: '950', color: 'var(--primary-dark)', 
            marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1' 
          }}>
            Construyamos juntos el futuro <br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>de nuestra alimentación.</span>
          </h1>
          <p style={{ 
              color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '600', 
              maxWidth: '650px', margin: '0 auto', lineHeight: '1.5' 
          }}>
            Alimnet es una plataforma independiente que busca descentralizar el acceso a comida real. No cobramos comitivas ni pautas. Nuestro crecimiento depende de la comunidad.
          </p>
        </section>

        {/* LAS DOS TARJETAS DE ENTRADA */}
        <section style={{ maxWidth: '1100px', margin: '0 auto 6rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Tarjeta Aporte Único */}
            <div style={{ 
              background: 'white', padding: '3rem', borderRadius: '48px', border: '1.5px solid #E4EBDD',
              boxShadow: '0 20px 40px rgba(0,0,0,0.02)', transition: 'all 0.4s ease',
              cursor: 'pointer', position: 'relative'
            }} onClick={() => scrollToHub('once')}>
              <div style={{ background: '#F8F9F5', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <Coffee size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Aporte único</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '600' }}>
                Si valorás nuestra independencia y querés apoyarnos con una contribución puntual para sostener el servidor.
              </p>
              <button style={{ 
                padding: '0.9rem 2.5rem', borderRadius: '14px', 
                background: '#2D3A20', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.85rem', cursor: 'pointer'
              }}>
                Invitar café (Cafecito)
              </button>
            </div>

            {/* Tarjeta Miembro Fundador */}
            <div style={{ 
              background: 'white', padding: '3rem', borderRadius: '48px', border: '2.5px solid var(--primary)',
              boxShadow: '0 40px 80px rgba(45, 58, 32, 0.08)', transition: 'all 0.4s ease',
              position: 'relative', cursor: 'pointer'
            }} onClick={() => scrollToHub('monthly')}>
               <div style={{ 
                position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.5rem 1rem', 
                background: 'var(--primary)', color: 'white', borderRadius: '30px', 
                fontSize: '0.6rem', fontWeight: '1000', textTransform: 'uppercase'
              }}>
                Recomendado
              </div>
              <div style={{ background: '#F0F4ED', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                <Sparkles size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1rem' }}>Miembro Fundador</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '600' }}>
                Socio clave. Tu apoyo mensual permite planificar expansiones y seguir mapeando soberanía con independencia.
              </p>
              <button style={{ 
                padding: '1rem 3rem', borderRadius: '16px', 
                background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '1000', 
                fontSize: '0.9rem', cursor: 'pointer'
              }}>
                Unirme como Fundador
              </button>
            </div>
        </section>

        {/* MOTOR DE PAGO (APARECE AL CLICKEAR) */}
        <AnimatePresence>
            {initialFreq && (
                <motion.section 
                    ref={hubRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '8rem', display: 'flex', justifyContent: 'center', padding: '0 1rem' }}
                >
                    <div style={{ background: 'white', padding: '4rem', borderRadius: '54px', border: '2px solid #E4EBDD', boxShadow: '0 40px 100px rgba(0,0,0,0.05)', maxWidth: '600px', width: '100%' }}>
                        <DonationHub forcedFrequency={initialFreq} />
                    </div>
                </motion.section>
            )}
        </AnimatePresence>

        {/* SECCIÓN: TU PALABRA ES PODER */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1rem' }}>
            <div style={{ 
              background: 'white', padding: '4rem', borderRadius: '48px', border: '2px solid #E4EBDD',
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'
            }}>
                <div>
                     <ShieldCheck size={40} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                     <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1rem', letterSpacing: '-0.04em' }}>Tu palabra es poder.</h2>
                     <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '600' }}>
                        Validar a un productor no es solo darle un "like"; es confirmar su trabajo real. Alimnet es confianza mutua.
                     </p>
                     <button style={{ padding: '1rem 2.5rem', borderRadius: '14px', border: '1.5px solid #E4EBDD', background: 'transparent', color: 'var(--primary-dark)', fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer' }}>
                        IR AL MAPA Y VALIDAR
                     </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {[
                        { title: 'CONFIANZA', sub: 'Prestigio social.' },
                        { title: 'VISIBILIDAD', sub: 'Tus del mapa.' },
                        { title: 'SEGURIDAD', sub: 'Sin intermediarios.' },
                        { title: 'CRECIMIENTO', sub: 'Soberanía real.' }
                    ].map(item => (
                        <div key={item.title} style={{ padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '4px' }}>{item.title}</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{item.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* SECCIÓN: TOMÁS VUKOJICIC (CON LA CITA) */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1rem' }}>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden', margin: '0 auto 2rem' }}>
                        <img src="https://alimnet-v3.vercel.app/tomas.jpg" alt="Tomas Vukojicic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '1000', color: 'var(--primary-dark)', margin: '0 0 5px 0' }}>TOMAS VUKOJICIC</h3>
                    <p style={{ fontSize: '0.65rem', fontWeight: '1000', color: 'var(--primary)', textTransform: 'uppercase' }}>Creador de Alimnet</p>
                </div>
                <div>
                     <div style={{ background: '#F0F4ED', padding: '3rem', borderRadius: '48px', position: 'relative', marginBottom: '2rem' }}>
                         <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: '950', fontStyle: 'italic', lineHeight: '1.5', color: 'var(--primary-dark)' }}>
                            “Alimnet nace de una necesidad real que viví con mi familia: dedicar mucho tiempo a encontrar alimentos que estén cuidados desde su origen hasta el momento de consumirlos. Esa búsqueda fue el punto de partida.”
                         </p>
                     </div>
                     <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7', fontWeight: '600' }}>
                        Tomás Vukojicic tiene más de 15 años de experiencia en gastronomía y en los últimos años trabajó en tecnología dentro del mundo de startups.<br /><br />
                        Hoy impulsa Alimnet como una forma de organizar y facilitar el acceso a una alimentación más consciente, conectando personas con productores alineados a ese cuidado.
                     </p>
                </div>
             </div>
        </section>

        {/* SECCIÓN: ¿REPRESENTAS A UN PROYECTO? */}
        <section style={{ maxWidth: '1000px', margin: '0 auto 8rem auto', padding: '0 1rem' }}>
            <div style={{ 
                background: '#F0F4ED', padding: '3rem 4rem', borderRadius: '48px', 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' 
            }}>
                <div style={{ maxWidth: '500px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1rem' }}>¿Representas a un proyecto?</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Buscamos alianzas sutiles con ONGs, gobiernos locales y marcas que busquen fortalecer la soberanía alimentaria regional.</p>
                </div>
                <button style={{ 
                    padding: '1.2rem 2.8rem', borderRadius: '18px', background: '#2D3A20', color: 'white', 
                    border: 'none', fontWeight: '1000', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' 
                }}>
                    CONTACTAR <Mail size={18} />
                </button>
            </div>
        </section>

      </main>

      {/* FOOTER CLON DEL ORIGINAL */}
      <footer style={{ padding: '6rem 2rem 3rem 2rem', background: 'white', borderTop: '1.5px solid #E4EBDD' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
            <div style={{ maxWidth: '300px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '1000', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>ALIMNET</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: '600', marginBottom: '2rem' }}>
                    Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
                </p>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <Instagram size={20} color="var(--primary-dark)" />
                    <Linkedin size={20} color="var(--primary-dark)" />
                    <Mail size={20} color="var(--primary-dark)" />
                </div>
            </div>
            <div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase' }}>MENÚ</h4>
                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <li>Explorar mapa</li>
                    <li style={{ color: 'var(--primary)' }}>Sostener Alimnet</li>
                    <li>Ingresar</li>
                    <li><button style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '1000', fontSize: '0.7rem' }}>Crear cuenta</button></li>
                </ul>
            </div>
            <div>
                 <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase' }}>EXPLORAR</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <li>Blog</li>
                    <li>Panel Comercial</li>
                    <li>Registrar mi comercio</li>
                </ul>
            </div>
            <div>
                 <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#A5B598', marginBottom: '1.5rem', textTransform: 'uppercase' }}>LEGAL</h4>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <li>Privacidad</li>
                    <li>Términos</li>
                    <li>Cookies</li>
                </ul>
            </div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '4rem auto 0 auto', paddingTop: '2rem', borderTop: '1px solid #F0F4ED', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: '800', color: '#A5B598' }}>
            <div>© 2025 Alimnet. Cultivando redes locales.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <span>Argentina</span>
                <span>Proyecto Social</span>
            </div>
        </div>
      </footer>
    </div>
  );
}
