'use client';

import React, { useState, useEffect } from "react";
import { Leaf, Map as MapIcon, HelpCircle, LogIn, Rocket, UserPlus, MapPin, CheckCircle, Heart, Instagram, Linkedin, Mail, Menu, X } from "lucide-react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)", color: "var(--text-primary)" }}>
      
      {/* 1. Header Premium Responsive */}
      <header style={{ 
        padding: isMobile ? "0.8rem 1.2rem" : "1rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
        background: "rgba(244, 241, 230, 0.95)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 2000
      }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: isMobile ? "1.3rem" : "1.55rem", fontWeight: "950", color: "var(--primary-dark)", letterSpacing: "-0.05em", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}
        >
          <Leaf size={isMobile ? 24 : 28} fill="var(--primary)" fillOpacity={0.25} />
          ALIMNET
        </div>

        {!isMobile ? (
          <>
            <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
              <a href="/explorar" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: '700' }}><MapIcon size={16} /> Explorar</a>
              <hr style={{ width: '1px', height: '14px', border: 'none', background: 'var(--border)' }} />
              <a href="/sostener" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: '700' }}><HelpCircle size={16} /> Sostener Alimnet</a>
            </nav>
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
              <button 
                onClick={() => window.location.href = '/login'}
                style={{ color: "var(--primary-dark)", fontWeight: "750", background: "none", border: "none", padding: "0.4rem 0.8rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem" }}
              >
                <LogIn size={16} /> Ingresar
              </button>
              <button 
                onClick={() => window.location.href = '/registro'}
                className="button button-primary" style={{ padding: "0.65rem 1.5rem", borderRadius: "14px", fontSize: "0.85rem" }}
              >
                Crear cuenta
              </button>
            </div>
          </>
        ) : (
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', cursor: 'pointer' }}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && menuOpen && (
        <div style={{ 
          position: 'fixed', top: '55px', left: 0, width: '100%', height: 'calc(100vh - 55px)', 
          background: 'var(--background)', zIndex: 1100, padding: '2rem',
          display: 'flex', flexDirection: 'column', gap: '1.5rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <a href="/explorar" style={{ fontSize: '1.2rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem' }}>Explorar el mapa</a>
          <a href="/sostener" style={{ fontSize: '1.2rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem' }}>Sostener Alimnet</a>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={() => window.location.href = '/login'} className="button button-secondary" style={{ width: '100%' }}>Ingresar</button>
            <button onClick={() => window.location.href = '/registro'} className="button button-primary" style={{ width: '100%' }}>Crear cuenta</button>
          </div>
        </div>
      )}

      {/* 2. Hero Principal Responsive */}
      <section style={{ 
        padding: isMobile ? "5rem 1.5rem" : "8rem 2.5rem 10rem", 
        position: "relative", 
        overflow: "hidden", 
        textAlign: isMobile ? "center" : "left",
        background: "linear-gradient(to bottom, #E7E2D3 0%, var(--background) 80%)"
      }}>
        <div className="container" style={{ position: "relative", zIndex: 10, margin: isMobile ? "0 auto" : "0" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 10vw, 4.8rem)", fontWeight: "950", marginBottom: "1.2rem", color: "var(--primary-dark)", lineHeight: 1 }}>
            Conectamos personas con <br />
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>alimentos cuidados.</span>
          </h1>
          <p style={{ fontSize: isMobile ? "1rem" : "1.15rem", color: "var(--text-secondary)", maxWidth: "680px", margin: isMobile ? "0 auto 1.5rem" : "0 0 1.2rem", lineHeight: "1.6", fontWeight: "550" }}>
            Descubrí productores, proveedores, restaurantes y chefs que trabajan con alimentos agroecológicos, orgánicos y biodinámicos cerca tuyo.
          </p>
          
          <div style={{ display: "flex", gap: "1rem", flexWrap: 'wrap', justifyContent: isMobile ? "center" : "flex-start", marginBottom: "3rem" }}>
            <a href="/explorar" className="button button-primary" style={{ padding: "0.95rem 2.5rem", fontSize: "1rem", minWidth: isMobile ? '100%' : 'auto' }}>
              Explorar el mapa
            </a>
            <button 
              onClick={() => window.location.href = '/registro'}
              className="button button-secondary" style={{ padding: "0.95rem 2.5rem", fontSize: "1rem", minWidth: isMobile ? '100%' : 'auto' }}
            >
              Unirme a la red
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ 
                  width: "36px", height: "36px", borderRadius: "50%", background: `var(--card-bg)`, 
                  border: "2.5px solid white", marginLeft: i === 1 ? 0 : "-10px", overflow: "hidden"
                }}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
              <div style={{ marginLeft: "0.8rem", fontWeight: "800", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                +150 personas ya se sumaron
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Secciones Informativas (Resumidas y Responsivas) */}
      <section id="como-funciona" style={{ padding: isMobile ? "4rem 1.5rem" : "6rem 2rem", background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: "1rem" }}>Un puente directo a la tierra</h2>
            <p style={{ color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", fontWeight: '600' }}>Eliminamos intermediarios innecesarios para que gane el productor y ganes vos.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "2.5rem" }}>
            <div className="card" style={{ padding: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", margin: isMobile ? "0 auto 1.5rem" : "0 0 1.5rem" }}>
                <MapPin size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>Ubicación Inteligente</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: '550' }}>Encontrá productores cerca de tu casa o en tus zonas de movimiento diario.</p>
            </div>
            
            <div className="card" style={{ padding: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", margin: isMobile ? "0 auto 1.5rem" : "0 0 1.5rem" }}>
                <CheckCircle size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>Calidad Validada</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: '550' }}>La comunidad valida cada proyecto, asegurando procesos honestos y transparentes.</p>
            </div>

            <div className="card" style={{ padding: '2rem', textAlign: isMobile ? 'center' : 'left' }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", margin: isMobile ? "0 auto 1.5rem" : "0 0 1.5rem" }}>
                <Heart size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "0.8rem" }}>Apoyo Directo</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: '550' }}>Tu compra sostiene proyectos familiares y regenerativos de escala humana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Responsive */}
      <footer style={{ padding: "4rem 2rem", background: "var(--primary-dark)", color: "white" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: "3rem" }}>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: "950", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Leaf size={24} fill="white" fillOpacity={0.2} /> ALIMNET
            </div>
            <p style={{ opacity: 0.7, maxWidth: "300px", fontSize: "0.9rem" }}>Sosteniendo la red de alimentos más grande de la región. De la tierra a tu mesa, sin vueltas.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Plataforma</h4>
            <a href="/explorar" style={{ opacity: 0.7, fontSize: '0.9rem' }}>Mapa</a>
            <a href="/unirse" style={{ opacity: 0.7, fontSize: '0.9rem' }}>Sumar proyecto</a>
            <a href="/sostener" style={{ opacity: 0.7, fontSize: '0.9rem' }}>Donaciones</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Contacto</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
              <Instagram size={20} style={{ opacity: 0.7 }} />
              <Linkedin size={20} style={{ opacity: 0.7 }} />
              <Mail size={20} style={{ opacity: 0.7 }} />
            </div>
            <p style={{ opacity: 0.7, fontSize: '0.8rem', marginTop: '1rem' }}>v3.0.0-beta · 2026</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .nav-link {
          color: var(--text-primary);
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </main>
  );
}
