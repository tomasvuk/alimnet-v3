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
    <main style={{ minHeight: "100vh", background: "#F4F1E6", color: "var(--text-primary)" }}>
      
      {/* Header */}
      <header style={{ 
        padding: isMobile ? "1rem" : "1rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        background: "white",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}>
        <div style={{ fontSize: "1.2rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }} onClick={() => window.location.href='/'}>
          <Leaf size={24} fill="var(--primary)" fillOpacity={0.2} /> ALIMNET
        </div>

        {!isMobile ? (
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <a href="/explorar" style={{ fontWeight: '700', fontSize: '0.85rem' }}>Explorar</a>
            <a href="/sostener" style={{ fontWeight: '700', fontSize: '0.85rem' }}>Sostener</a>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{ background: 'none', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              Ingresar
            </button>
            <button 
              onClick={() => window.location.href = '/registro'}
              className="join-btn-header"
            >
              Crear cuenta
            </button>
          </nav>
        ) : (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </header>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: '56px', left: 0, width: '100%', height: 'calc(100vh - 56px)', background: 'white', zIndex: 900, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <a href="/explorar" style={{ fontSize: '1.4rem', fontWeight: '900' }}>Explorar el mapa</a>
          <a href="/sostener" style={{ fontSize: '1.4rem', fontWeight: '900' }}>Sostener Alimnet</a>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={() => window.location.href = '/login'} style={{ padding: '1rem', borderRadius: '14px', border: '1.5px solid #eee', background: 'none', fontWeight: '800' }}>Ingresar</button>
            <button onClick={() => window.location.href = '/registro'} style={{ padding: '1rem', borderRadius: '14px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '900' }}>Crear cuenta</button>
          </div>
        </div>
      )}

      {/* Hero */}
      <section style={{ padding: isMobile ? "4rem 1.5rem" : "8rem 2rem", textAlign: isMobile ? "center" : "left" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <h1 style={{ fontSize: isMobile ? "2.5rem" : "5rem", fontWeight: "950", color: "var(--primary-dark)", lineHeight: 1, marginBottom: "1.5rem" }}>
            Alimentos vinculados <br />
            <span style={{ color: "var(--primary)", fontStyle: 'italic' }}>con la tierra.</span>
          </h1>
          <p style={{ fontSize: isMobile ? "1.05rem" : "1.3rem", color: "var(--text-secondary)", maxWidth: "600px", margin: isMobile ? "0 auto 2.5rem" : "0 0 3rem", lineHeight: 1.6, fontWeight: '550' }}>
            Descubrí productores, almacenes y restaurantes agroecológicos cerca tuyo. Sin intermediarios, directo del origen.
          </p>
          
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "1rem", justifyContent: isMobile ? "center" : "flex-start" }}>
            <button onClick={() => window.location.href='/explorar'} style={{ padding: '1.2rem 2.5rem', borderRadius: '16px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>
              Ver Mapa de Productores
            </button>
            <button onClick={() => window.location.href='/registro'} style={{ padding: '1.2rem 2.5rem', borderRadius: '16px', border: '2px solid var(--primary)', background: 'none', color: 'var(--primary)', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}>
              Sumar mi proyecto
            </button>
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer style={{ padding: '4rem 2rem', background: 'white', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '8px', fontWeight: '950', fontSize: '1.1rem' }}>
          <Leaf size={22} fill="var(--primary)" fillOpacity={0.2} /> ALIMNET
        </div>
        <p style={{ color: '#999', fontSize: '0.85rem' }}>© 2026 ALIMNET · Red de Alimentos Cuidados</p>
      </footer>

      <style jsx>{`
        .join-btn-header { background: var(--primary); color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 10px; font-weight: 800; font-size: 0.85rem; cursor: pointer; }
      `}</style>
    </main>
  );
}
