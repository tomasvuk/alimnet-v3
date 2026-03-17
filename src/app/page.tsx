'use client';

import React from "react";
import { Leaf, Map as MapIcon, HelpCircle, LogIn, Rocket, UserPlus, MapPin, CheckCircle, Heart, Instagram, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)", color: "var(--text-primary)" }}>
      
      {/* 1. Header Premium (Reducido ~15%) */}
      <header style={{ 
        padding: "1rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
        background: "rgba(244, 241, 230, 0.95)",
        backdropFilter: "blur(10px)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: "1.55rem", fontWeight: "950", color: "var(--primary-dark)", letterSpacing: "-0.05em", display: "flex", alignItems: "center", gap: "8px" }}>
          <Leaf size={28} className="text-primary" fill="var(--primary)" fillOpacity={0.25} />
          ALIMNET
        </div>
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="/explorar" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}><MapIcon size={16} /> Explorar</a>
          <a href="/sostener" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}><HelpCircle size={16} /> Sostener Alimnet</a>
          <a href="#como-funciona" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem" }}>¿Cómo funciona?</a>
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
      </header>

      {/* 2. Hero Principal (Alineado a la IZQUIERDA y reducido ~15%) */}
      <section style={{ 
        padding: "8rem 2.5rem 10rem", 
        position: "relative", 
        overflow: "hidden", 
        textAlign: "left",
        background: "linear-gradient(to bottom, #E7E2D3 0%, var(--background) 80%)"
      }}>
        {/* Imagen Hero Cenital Integrada (Ajustada) */}
        <div style={{ 
          position: "absolute", top: "-30px", right: "-100px", width: "600px", height: "600px", 
          opacity: 0.2, pointerEvents: "none", transform: "rotate(10deg)", filter: "grayscale(20%)"
        }}>
          <img src="/hero-alimnet.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", maskImage: "radial-gradient(circle, black 20%, transparent 80%)" }} />
        </div>

        <div className="container" style={{ maxWidth: "1280px", position: "relative", zIndex: 10, margin: "0" }}>
          <h1 style={{ fontSize: "clamp(3rem, 8.5vw, 4.8rem)", fontWeight: "950", marginBottom: "1.2rem", color: "var(--primary-dark)", maxWidth: "900px" }}>
            Conectamos personas con <br />
            <span style={{ color: "var(--primary)", fontStyle: "italic" }}>Alimentos cuidados.</span>
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", maxWidth: "680px", margin: "0 0 1.2rem", lineHeight: "1.6", fontWeight: "550" }}>
            Descubrí productores, proveedores, restaurantes y chefs que trabajan con alimentos agroecológicos, orgánicos y biodinámicos cerca tuyo.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-start", color: "var(--primary)", fontWeight: "800", fontSize: "0.85rem", marginBottom: "3rem", letterSpacing: "0.05em" }}>
            <span>Productores</span> · <span>Proveedores</span> · <span>Restaurantes</span> · <span>Chefs</span>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-start", marginBottom: "4rem" }}>
            <a href="/explorar" className="button button-primary" style={{ padding: "0.95rem 2.5rem", fontSize: "1rem", textDecoration: "none", textAlign: "center" }}>
              Explorar el mapa
            </a>
            <button 
              onClick={() => window.location.href = '/registro'}
              className="button button-secondary" style={{ padding: "0.95rem 2.5rem", fontSize: "1rem" }}
            >
              Crear cuenta
            </button>
          </div>

          {/* Social Proof (Avatar Circles) */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ 
                  width: "36px", height: "36px", minWidth: "36px", minHeight: "36px", borderRadius: "50%", background: `var(--card-bg)`, 
                  border: "2.5px solid white", marginLeft: i === 1 ? 0 : "-10px", overflow: "hidden",
                  boxShadow: "0 3px 5px rgba(0,0,0,0.1)", flexShrink: 0
                }}>
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
              <div style={{ marginLeft: "0.8rem", fontWeight: "800", fontSize: "0.85rem", color: "var(--primary-dark)" }}>
                Más de <span style={{ color: "var(--primary)" }}>+100 proyectos</span> ya son parte.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sección Cómo funciona (Reducida ~15%) */}
      <section id="como-funciona" style={{ padding: "8rem 2rem", background: "white" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1.2rem" }}>Cómo funciona</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "550px", margin: "0 auto 5rem", fontWeight: "550" }}>
            Tres simples pasos para acercarte a una alimentación cuidada y apoyar redes de producción local.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2.5rem" }}>
            {/* Paso 1 */}
            <div className="card" style={{ padding: "3.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start", textAlign: "left" }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                <UserPlus size={26} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>1. Registrate</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                  Creá tu cuenta en segundos y empezá a explorar la red.
                </p>
              </div>
            </div>
            {/* Paso 2 */}
            <div className="card" style={{ padding: "3.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start", textAlign: "left" }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                <MapPin size={26} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>2. Buscá por zona</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                  Encontrá productores, proveedores, restaurantes y chefs cerca tuyo o con entrega en tu zona.
                </p>
              </div>
            </div>
            {/* Paso 3 */}
            <div className="card" style={{ padding: "3.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "flex-start", textAlign: "left" }}>
              <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                <Rocket size={26} strokeWidth={2.5} />
              </div>
              <div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>3. Descubrí proyectos cuidados</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                  Accedé a más información sobre cada proyecto y elegí con mayor claridad y confianza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sección Mapa Bloqueado (Reducida ~15%) */}
      <section style={{ padding: "6rem 2rem", position: "relative" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div style={{ 
            position: "relative", 
            height: "500px", 
            borderRadius: "40px", 
            overflow: "hidden",
            boxShadow: "0 30px 80px -15px rgba(63, 82, 50, 0.2)"
          }}>
            <img src="/map-preview.png" alt="Mapa Alimnet" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px) brightness(0.9)" }} />
            <div style={{ 
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
              background: "rgba(63, 82, 50, 0.25)", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1.5rem"
            }}>
              <div className="glass-card" style={{ padding: "3.5rem 2.5rem", maxWidth: "550px" }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "1.2rem", color: "var(--primary-dark)" }}>Accedé al mapa de la red</h2>
                <p style={{ fontSize: "1rem", color: "var(--text-primary)", marginBottom: "2.5rem", fontWeight: "600" }}>
                  Sumate a la comunidad para descubrir proyectos, alimentos y comerciantes alineados con una producción más cuidada.
                </p>
                <button 
                  onClick={() => window.location.href = '/explorar'}
                  className="button button-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
                >
                  Unirme a Alimnet
                </button>
                <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "800" }}>
                  Se una de las primeras personas en explorar la red.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA para comerciantes (Reducida ~15%) */}
      <section style={{ padding: "8rem 2rem", background: "var(--primary-dark)", color: "#F4F1E6" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "3rem", marginBottom: "1.2rem", color: "white" }}>¿Tenes un proyecto afín?</h2>
          <p style={{ fontSize: "1.2rem", color: "rgba(244, 241, 230, 0.8)", maxWidth: "600px", margin: "0 auto 3.5rem", fontWeight: "550" }}>
            Sumá tu proyecto a la red y conectá con personas que buscan alimentos cuidados.
          </p>
          <button 
            onClick={() => window.location.href = '/unirse'}
            className="button button-primary" 
            style={{ background: "var(--primary)", color: "white", padding: "1rem 3.5rem", fontSize: "1.1rem" }}
          >
            Registrar mi proyecto
          </button>
        </div>
      </section>

      {/* 7. Sección Comunidad (Reducida ~15%) */}
      <section style={{ padding: "8rem 2rem", background: "var(--card-bg)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <Heart size={40} color="var(--primary)" style={{ marginBottom: "1.5rem" }} fill="var(--primary)" fillOpacity={0.1} />
          <h2 style={{ fontSize: "2.8rem", marginBottom: "1.2rem" }}>Una red sostenida por su comunidad</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3.5rem", lineHeight: "1.8", fontWeight: "500" }}>
            Alimnet crece gracias a personas que creen en una forma más consciente, transparente y cercana de producir y encontrar alimentos.
          </p>
          <button 
            onClick={() => window.location.href = '/sostener'}
            className="button button-secondary" 
            style={{ padding: "0.85rem 2.5rem", borderColor: "var(--primary)", color: "var(--primary)", cursor: "pointer" }}
          >
            Sostener Alimnet
          </button>
        </div>
      </section>

      {/* 8. Footer Premium (Reducido ~15%) */}
      <footer style={{ padding: "6rem 2rem 3rem", background: "white", borderTop: "1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "3.5rem", marginBottom: "5rem" }}>
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ fontSize: "1.9rem", fontWeight: "950", color: "var(--primary-dark)", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>ALIMNET</div>
              <p style={{ fontSize: "1rem", color: "var(--text-secondary)", maxWidth: "350px", lineHeight: "1.8", fontWeight: "550" }}>
                Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: "flex", gap: "1.2rem", marginTop: "2.5rem" }}>
                <Instagram size={24} className="footer-icon" />
                <Linkedin size={24} className="footer-icon" />
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "800", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <Mail size={18} /> info@alimnet.com
                </div>
              </div>
            </div>
            
            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Menu</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", fontWeight: "700", fontSize: "0.9rem" }}>
                <a href="/explorar" className="footer-link">Explorar mapa</a>
                <a href="/sostener" className="footer-link">Sostener Alimnet</a>
                <button onClick={() => window.location.href = '/login'} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', fontWeight: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }}>Ingresar</button>
                <button onClick={() => window.location.href = '/registro'} className="button button-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', width: 'fit-content' }}>Crear cuenta</button>
              </nav>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Explorar</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", fontWeight: "700", fontSize: "0.9rem" }}>
                <a href="#" className="footer-link">Blog</a>
                <a href="#" className="footer-link">Certificaciones</a>
                <a href="#" className="footer-link">Guía estacional</a>
              </nav>
            </div>

            <div>
              <h4 style={{ fontSize: "0.95rem", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Legal</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1rem", fontWeight: "700", fontSize: "0.9rem" }}>
                <a href="#" className="footer-link">Privacidad</a>
                <a href="#" className="footer-link">Términos</a>
                <a href="#" className="footer-link">Cookies</a>
              </nav>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600", opacity: 0.7 }}>
            <div>© 2025 Alimnet. Cultivando redes locales.</div>
            <div style={{ display: "flex", gap: "1.5rem", letterSpacing: "0.02em" }}>
              <span>Argentina</span>
              <span style={{ opacity: 0.8 }}>|</span>
              <span>Propósito Global</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .nav-link { font-weight: 750; color: var(--text-secondary); transition: color 0.2s; text-decoration: none; }
        .nav-link:hover { color: var(--primary); }
        .footer-link { color: var(--text-secondary); transition: all 0.2s; text-decoration: none; }
        .footer-link:hover { color: var(--primary); transform: translateX(5px); }
        .footer-icon { color: var(--text-secondary); cursor: pointer; transition: color 0.2s; }
        .footer-icon:hover { color: var(--primary); }
      `}</style>
    </main>
  );
}
