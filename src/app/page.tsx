'use client';

import React from "react";
import Header from "@/components/Header";
import { LogIn, Rocket, UserPlus, MapPin, CheckCircle, Heart, Instagram, Linkedin, Mail, Store, UtensilsCrossed, ChefHat, ArrowRight } from "lucide-react";

const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
    <path d="M6 14v8h1v-8H6zM18 14v8h-1v-8h1z" fill="currentColor" opacity="0.5" />
    <path d="M5 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)", color: "var(--text-primary)", width: '100vw', overflowX: 'hidden' }}>
      
      <Header />

      {/* 2. HERO PRINCIPAL */}
      <section className="hero-section" style={{ 
        padding: "clamp(6rem, 15vw, 10rem) clamp(1.5rem, 5vw, 3rem)", 
        position: "relative", 
        overflow: "hidden", 
        textAlign: "left",
        background: "linear-gradient(to bottom, #E7E2D3 0%, var(--background) 80%)"
      }}>
        <div style={{ 
          position: "absolute", top: "-50px", right: "-50px", width: "clamp(400px, 50vw, 700px)", height: "clamp(400px, 50vw, 700px)", 
          opacity: 0.15, pointerEvents: "none", filter: "blur(40px)"
        }}>
           <div style={{ width: '100%', height: '100%', background: 'var(--primary)', borderRadius: '50%' }}></div>
        </div>

        <div className="container" style={{ maxWidth: "1280px", position: "relative", zIndex: 10, margin: "0" }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', background: 'rgba(95, 125, 74, 0.08)', color: 'var(--primary)', borderRadius: '30px', fontSize: '0.65rem', fontWeight: '1000', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Rocket size={14} /> Lanzamiento Friends & Family
          </div>
          <h1 style={{ fontSize: "clamp(2.4rem, 8vw, 4.4rem)", fontWeight: "950", marginBottom: "1.5rem", color: "var(--primary-dark)", maxWidth: "950px", lineHeight: "1.05", letterSpacing: '-0.04em' }}>
            Conectamos personas con <br />
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>alimentos cuidados.</span>
          </h1>
          <p style={{ 
            fontSize: "clamp(1rem, 4vw, 1.15rem)", color: "var(--text-secondary)", maxWidth: "720px", 
            margin: "0 0 3rem", lineHeight: "1.6", fontWeight: "600"
          }}>
            Descubrí productores, abastecedores, restaurantes y chefs que trabajan con alimentos agroecológicos, orgánicos y biodinámicos cerca tuyo.
          </p>
          
          {/* LOS 4 PILARES (DISEÑO SLIM) */}
          <div className="hero-pillars-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", 
            gap: "1rem",
            marginBottom: "4rem", 
            width: "fit-content"
          }}>
            {[
              { role: 'Productor', desc: 'Crea el alimento', icon: ProductorIcon },
              { role: 'Abastecedor', desc: 'Lo acerca', icon: Store },
              { role: 'Restaurante', desc: 'Lo transforma', icon: UtensilsCrossed },
              { role: 'Chef', desc: 'Lo interpreta', icon: ChefHat }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex", gap: "15px", padding: "1.2rem 1.5rem",
                background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)",
                borderRadius: "24px", border: "1.2px solid rgba(255,255,255,0.5)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.03)", alignItems: "center",
                width: "fit-content", transition: 'all 0.3s ease'
              }} className="pillar-card">
                <div style={{ 
                  width: "42px", height: "42px", borderRadius: "14px", background: "#F0F4ED",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", flexShrink: 0
                }}>
                  <item.icon size={22} />
                </div>
                <div>
                  <div style={{ color: "var(--primary-dark)", fontWeight: "1000", fontSize: "0.85rem", textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.role}</div>
                  <div style={{ color: "var(--text-secondary)", fontWeight: "600", fontSize: "0.75rem", opacity: 0.85 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-buttons" style={{ display: "flex", gap: "1.5rem", justifyContent: "flex-start", marginBottom: "4rem" }}>
            <a href="/explorar" className="btn-v3-primary" style={{ padding: "1rem 2.8rem", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Explorar el mapa <ArrowRight size={18} />
            </a>
            <button 
              onClick={() => window.location.href = '/registro'}
              className="btn-v3-secondary" style={{ padding: "0.95rem 2.22rem" }}
            >
              Crear cuenta
            </button>
          </div>

          {/* Social Proof */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ 
                  width: "36px", height: "36px", borderRadius: "50%", border: "3px solid white", 
                  marginLeft: i === 1 ? 0 : "-10px", overflow: "hidden", boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}>
                  <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
              <div style={{ marginLeft: "1rem", fontWeight: "900", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                Más de <span style={{ color: "var(--primary)" }}>+100 proyectos</span> ya son parte.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONA (REFINADO PRO) */}
      <section id="como-funciona" style={{ padding: "clamp(5rem, 10vw, 8rem) 2rem", background: "white" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: '950', marginBottom: "1rem", color: 'var(--primary-dark)', letterSpacing: '-0.02em' }}>Cómo funciona</h2>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto 5rem", fontWeight: "500", lineHeight: '1.7' }}>
            Tres simples pasos para acercarte a una alimentación cuidada y apoyar redes de producción local.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { id: '1', title: 'Registrate', text: 'Creá tu cuenta en segundos y empezá a explorar la red.', icon: UserPlus },
              { id: '2', title: 'Buscá por zona', text: 'Encontrá productores, abastecedores, restaurantes y chefs cerca tuyo.', icon: MapPin },
              { id: '3', title: 'Descubrí proyectos', text: 'Accedé a info sobre cada proyecto y elegí con mayor claridad.', icon: Rocket }
            ].map((step) => (
              <div key={step.id} style={{ 
                padding: "2.5rem", borderRadius: "40px", background: "#F8F9F5", border: "1.5px solid #E4EBDD",
                display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start", textAlign: "left", width: 'fit-content'
              }} className="how-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: "45px", height: "45px", background: "white", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)", border: '1px solid #E4EBDD' }}>
                    <step.icon size={22} strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontSize: "1.3rem", fontWeight: '1000', color: 'var(--primary-dark)', margin: 0 }}>{step.id}. {step.title}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.7", fontWeight: '550', margin: 0 }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN MAPA REALISTA (MOBILE ADAPTED) */}
      <section style={{ padding: "6rem 1.5rem", position: "relative" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div style={{ 
            position: "relative", 
            height: "clamp(350px, 60vh, 550px)", 
            borderRadius: "48px", 
            overflow: "hidden",
            boxShadow: "0 40px 100px -20px rgba(63, 82, 50, 0.25)",
            border: '8px solid white'
          }}>
            {/* SIMULACIÓN DE MAPA REAL ALIMNET (VERDES Y OLIVA) */}
            <div style={{ width: '100%', height: '100%', background: '#EAEDE8', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20%', left: '30%', width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 0 8px rgba(95,125,74,0.1)' }}></div>
              <div style={{ position: 'absolute', top: '45%', left: '60%', width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 0 8px rgba(95,125,74,0.1)' }}></div>
              <div style={{ position: 'absolute', top: '70%', left: '40%', width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 0 8px rgba(95,125,74,0.1)' }}></div>
              
              <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')" }}></div>
            </div>

            <div style={{ 
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
              background: "rgba(63, 82, 50, 0.1)", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1.5rem"
            }}>
              <div className="map-glass-card" style={{ 
                padding: "clamp(1.5rem, 5vw, 3.5rem)", 
                maxWidth: "580px",
                background: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(20px)",
                borderRadius: "40px", border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
              }}>
                <h2 style={{ fontSize: "clamp(1.5rem, 6vw, 2.4rem)", fontWeight: '950', marginBottom: "1rem", color: "var(--primary-dark)" }}>Accedé al mapa de la red</h2>
                <p style={{ fontSize: "clamp(0.85rem, 4vw, 1rem)", color: "var(--text-primary)", marginBottom: "2rem", fontWeight: "600", lineHeight: '1.6' }}>
                  Sumate a la comunidad para descubrir proyectos y alimentos alineados con una producción más cuidada.
                </p>
                <button 
                  onClick={() => window.location.href = '/explorar'}
                  className="btn-v3-primary" style={{ padding: "1rem 3rem", fontSize: "1rem" }}
                >
                  Unirme a Alimnet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA COMERCIANTES */}
      <section style={{ padding: "8rem 2rem", background: "var(--primary-dark)", color: "#F4F1E6", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: '950', marginBottom: "1.2rem", color: "white" }}>¿Tenes un proyecto afín?</h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(244, 241, 230, 0.7)", maxWidth: "600px", margin: "0 auto 3rem", fontWeight: "550" }}>
            Sumá tu proyecto a la red y conectá con personas que buscan alimentos cuidados.
          </p>
          <button 
            onClick={() => window.location.href = '/unirse'}
            className="btn-v3-primary" 
            style={{ padding: "1.1rem 3.5rem" }}
          >
            Registrar mi proyecto
          </button>
        </div>
      </section>

      <footer style={{ padding: "6rem 2rem 4rem", background: "white", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "4rem", marginBottom: "4rem" }}>
            <div style={{ gridColumn: "span 1" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: "950", color: "var(--primary-dark)", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>ALIMNET</div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: "350px", lineHeight: "1.7", fontWeight: "500" }}>
                Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: "flex", gap: "1.2rem", marginTop: "2rem" }}>
                 <Instagram size={22} color="#666" style={{ cursor: 'pointer' }} />
                 <Linkedin size={22} color="#666" style={{ cursor: 'pointer' }} />
                 <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "900", color: "var(--text-secondary)", fontSize: "0.8rem" }}>
                    <Mail size={18} /> info@alimnet.com
                 </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: '1000', marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em", color: 'var(--primary-dark)' }}>Menu</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontWeight: "800", fontSize: "0.85rem" }}>
                <a href="/explorar" style={{ color: '#666', textDecoration: 'none' }}>Explorar mapa</a>
                <a href="/sostener" style={{ color: '#666', textDecoration: 'none' }}>Sostener Alimnet</a>
                <a href="/login" style={{ color: '#666', textDecoration: 'none' }}>Ingresar</a>
                <button className="btn-v3-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', width: 'fit-content' }}>Crear cuenta</button>
              </nav>
            </div>

            <div>
              <h4 style={{ fontSize: "0.75rem", fontWeight: '1000', marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em", color: 'var(--primary-dark)' }}>Explorar</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontWeight: "800", fontSize: "0.85rem" }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Blog</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Certificaciones</a>
                <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Guía estacional</a>
              </nav>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", flexWrap: 'wrap', gap: '1rem', fontSize: "0.75rem", color: "#AAA", fontWeight: "600" }}>
            <div>© 2025 Alimnet. Cultivando redes locales.</div>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <span>Argentina</span>
              <span style={{ color: '#E4EBDD' }}>|</span>
              <span style={{ color: '#888' }}>Propósito Global</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .btn-v3-primary { 
          background: var(--primary); color: white; border: none; border-radius: 16px; 
          font-weight: 1000; font-size: 0.95rem; cursor: pointer; transition: all 0.3s ease;
          width: fit-content; text-align: center;
        }
        .btn-v3-primary:hover { transform: scale(1.03) translateY(-2px); boxShadow: 0 10px 30px rgba(95,125,74,0.3); }
        
        .btn-v3-secondary { 
          background: transparent; color: var(--primary); border: 2px solid var(--primary); border-radius: 16px; 
          font-weight: 1000; font-size: 0.95rem; cursor: pointer; transition: all 0.3s ease;
          width: fit-content;
        }
        .btn-v3-secondary:hover { background: rgba(95,125,74,0.05); transform: scale(1.03); }

        .pillar-card:hover { transform: translateY(-5px); border-color: var(--primary); }
        .how-card:hover { transform: translateY(-5px); border-color: var(--primary); }

        @media (max-width: 768px) {
          .hero-pillars-grid { grid-template-columns: 1fr 1fr !important; width: 100% !important; gap: 0.8rem !important; }
          .pillar-card { width: 100% !important; padding: 1rem !important; flex-direction: column; text-align: center; }
          .pillar-card div { align-items: center; text-align: center; }
          
          .hero-buttons { flex-direction: column; width: 100%; gap: 1rem; }
          .btn-v3-primary, .btn-v3-secondary { width: 100% !important; justify-content: center; }
          
          .map-glass-card { padding: 1.5rem !important; width: 92% !important; border-radius: 30px !important; }
        }
      `}</style>
    </main>
  );
}
