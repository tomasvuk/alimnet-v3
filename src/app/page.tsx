'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import { LogIn, Rocket, UserPlus, MapPin, CheckCircle, Heart, Instagram, Linkedin, Mail, Store, UtensilsCrossed, ChefHat, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
  const router = useRouter();
  const [projectCount, setProjectCount] = React.useState<number>(100);

  React.useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from('merchants')
        .select('*', { count: 'exact', head: true });
      
      if (count) {
        // Lógica de redondeo solicitada:
        // Si < 1000: de 100 en 100 (ej: 246 -> 200)
        // Si >= 1000: de 500 en 500 (ej: 1200 -> 1000, 1600 -> 1500)
        let rounded = 100;
        if (count < 1000) {
          rounded = Math.floor(count / 100) * 100;
        } else {
          rounded = Math.floor(count / 500) * 500;
        }
        setProjectCount(rounded || 100);
      }
    }
    fetchCount();
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)", color: "var(--text-primary)", width: '100vw', overflowX: 'hidden' }}>
      
      <Header />

      {/* 2. HERO PRINCIPAL */}
      <section className="hero-section" style={{ 
        padding: "clamp(8rem, 20vw, 12rem) clamp(1.5rem, 5vw, 3rem) clamp(6rem, 15vw, 10rem)", 
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
          
          <div className="hero-roles-explainer" style={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "3.5rem", 
            width: "fit-content"
          }}>
            {[
              { role: 'Productor', desc: 'crea el alimento', icon: ProductorIcon },
              { role: 'Abastecedor', desc: 'lo acerca', icon: Store },
              { role: 'Restaurante', desc: 'lo transforma', icon: UtensilsCrossed },
              { role: 'Chef', desc: 'lo interpreta', icon: ChefHat }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: "flex", flexDirection: "column", gap: "10px", padding: "1.2rem",
                background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(12px)",
                borderRadius: "16px", border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.03)", alignItems: "center",
                textAlign: "center", transition: "transform 0.2s ease",
                width: "170px", flexShrink: 0
              }}>
                <div style={{ 
                  width: "42px", height: "42px", borderRadius: "12px", background: "#F0F4ED",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)"
                }}>
                  <item.icon size={22} />
                </div>
                <div>
                  <div style={{ color: "var(--primary-dark)", fontWeight: "950", fontSize: "0.95rem", marginBottom: "2px" }}>{item.role}</div>
                  <div style={{ color: "var(--text-secondary)", fontWeight: "600", fontSize: "0.85rem", opacity: 0.85 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-buttons" style={{ display: "flex", gap: "1.5rem", justifyContent: "flex-start", marginBottom: "4rem" }}>
            <a href="/explorar" className="btn-v3-primary" style={{ padding: "1rem 2.8rem", textDecoration: "none", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Explorar el mapa <ArrowRight size={18} />
            </a>
            <button 
              onClick={() => router.push('/registro')}
              className="btn-v3-secondary" style={{ padding: "0.95rem 2.22rem" }}
            >
              Crear cuenta
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[
                "/avatars/v2-front-agronomo.png", 
                "/avatars/v2-front-floricultora.png",
                "/avatars/v2-front-apicultor.png",
                "/avatars/v2-front-hortelana.png",
                "/avatars/v2-front-quesera.png"
              ].map((src, i) => (
                <div key={i} style={{ 
                  width: "40px", height: "40px", borderRadius: "50%", border: "3px solid white", 
                  marginLeft: i === 0 ? 0 : "-12px", overflow: "hidden", 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)", flexShrink: 0,
                  aspectRatio: '1/1'
                }}>
                  <img src={src} alt="Socio Alimnet" style={{ width: "100%", height: "100%", objectFit: "cover", display: 'block' }} />
                </div>
              ))}
              <div style={{ marginLeft: "1.2rem", fontWeight: "950", fontSize: "0.9rem", color: "var(--primary-dark)", letterSpacing: '-0.01em' }}>
                Más de <span style={{ color: "var(--primary)" }}>+{projectCount} proyectos</span> ya son parte.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONA */}
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
              { id: '3', title: 'Descubrí proyectos cuidados', text: 'Accedé a más información sobre cada proyecto y elegí con mayor claridad y confianza.', icon: Rocket }
            ].map((step) => (
              <div key={step.id} style={{ 
                padding: "2rem 1.5rem", borderRadius: "32px", background: "#F8F9F5", border: "1.5px solid #E4EBDD",
                display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "center", textAlign: "center", width: '100%', maxWidth: '350px', margin: '0 auto'
              }}>
                <div style={{ width: "50px", height: "50px", background: "var(--background)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <step.icon size={26} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>{step.id}. {step.title}</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN MAPA REALISTA */}
      <section style={{ padding: "6rem 1.5rem", position: "relative" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <div style={{ 
            position: "relative", 
            height: "clamp(350px, 60vh, 550px)", 
            borderRadius: "40px", 
            overflow: "hidden",
            boxShadow: "0 30px 80px -15px rgba(63, 82, 50, 0.2)"
          }}>
            <img src="/map-preview.png" alt="Mapa Alimnet" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(2px) brightness(0.9)" }} />
            <div className="map-overlay-container" style={{ 
              position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
              background: "rgba(63, 82, 50, 0.15)", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", textAlign: "center", padding: "1.5rem"
            }}>
              <div className="map-glass-card" style={{ 
                padding: "3.5rem 2.5rem", maxWidth: "550px", 
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(15px)", 
                borderRadius: "32px",
                border: "1px solid rgba(255,255,255,0.7)", 
                boxShadow: "0 20px 50px rgba(0,0,0,0.1)"
              }}>
                <h2 style={{ fontSize: "2.4rem", marginBottom: "1.2rem", color: "var(--primary-dark)" }}>Accedé al mapa de la red</h2>
                <p className="mobile-hide" style={{ fontSize: "1rem", color: "var(--text-primary)", marginBottom: "2.5rem", fontWeight: "600" }}>
                  Sumate a la comunidad para descubrir proyectos, alimentos y comerciantes alineados con una producción más cuidada.
                </p>
                <button 
                  onClick={() => router.push('/explorar')}
                  className="button button-primary" style={{ padding: "1rem 3rem", fontSize: "1.1rem" }}
                >
                  Unirme a Alimnet
                </button>
                <div className="mobile-hide" style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "800" }}>
                  Se una de las primeras personas en explorar la red.
                </div>
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
            onClick={() => router.push('/registro-comercio')}
            className="btn-v3-primary"
            style={{ padding: "1.1rem 3.5rem" }}
          >
            Registrar mi proyecto
          </button>
        </div>
      </section>

      {/* 7. SECCIÓN COMUNIDAD */}
      <section style={{ padding: "8rem 2rem", background: "var(--card-bg)" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "700px" }}>
          <Heart size={40} color="var(--primary)" style={{ marginBottom: "1.5rem" }} fill="var(--primary)" fillOpacity={0.1} />
          <h2 style={{ fontSize: "2.8rem", fontWeight: '950', marginBottom: "1.2rem", color: 'var(--primary-dark)' }}>Una red sostenida por su comunidad</h2>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "3.5rem", lineHeight: "1.8", fontWeight: "500" }}>
            Alimnet crece gracias a personas que creen en una forma más consciente, transparente y cercana de producir y encontrar alimentos.
          </p>
          <button 
            onClick={() => router.push('/sostener')}
            className="btn-v3-secondary"
            style={{ padding: "0.85rem 2.5rem" }}
          >
            Sostener Alimnet
          </button>
        </div>
      </section>

      {/* 8. FOOTER REORDENADO INSTITUCIONAL */}
      <footer style={{ padding: "6rem 2rem 4rem", background: "white", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ 
            display: "grid", 
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr", 
            gap: "4rem", 
            marginBottom: "5rem" 
          }}>
            {/* COL 1: MARCA */}
            <div className="footer-col-brand" style={{ maxWidth: "340px" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: "1000", color: "var(--primary-dark)", marginBottom: "1.5rem", letterSpacing: "-0.04em" }}>ALIMNET</div>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.7", fontWeight: "500", marginBottom: "2rem" }}>
                Alimnet acompaña la transición hacia un sistema alimentario más transparente, justo y cercano.
              </p>
              <div style={{ display: "flex", gap: "1.2rem", alignItems: 'center' }}>
                 <a href="https://instagram.com/alimnet" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--primary-dark)', display: 'flex' }}>
                   <Instagram size={22} style={{ cursor: 'pointer' }} />
                 </a>
                 <a href="https://linkedin.com/company/alimnet" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--primary-dark)', display: 'flex' }}>
                   <Linkedin size={22} style={{ cursor: 'pointer' }} />
                 </a>
                 <a href="mailto:info@alimnet.com" style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "900", color: "var(--text-secondary)", fontSize: "0.8rem", textDecoration: 'none' }}>
                    <Mail size={18} /> info@alimnet.com
                 </a>
              </div>
            </div>
            
            {/* COL 2: MENÚ */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h4 style={{ fontSize: "0.75rem", fontWeight: '1000', textTransform: "uppercase", letterSpacing: "0.1em", color: 'var(--primary-dark)' }}>Menú</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontWeight: "800", fontSize: "0.85rem" }}>
                <a href="/explorar" className="footer-link-v3">Explorar mapa</a>
                <a href="/sostener" className="footer-link-v3">Sostener Alimnet</a>
                <a href="/login" className="footer-link-v3">Ingresar</a>
                <button onClick={() => router.push('/registro')} className="btn-v3-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.75rem', width: 'fit-content' }}>Crear cuenta</button>
              </nav>
            </div>

            {/* COL 3: EXPLORAR */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h4 style={{ fontSize: "0.75rem", fontWeight: '1000', textTransform: "uppercase", letterSpacing: "0.1em", color: 'var(--primary-dark)' }}>Explorar</h4>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontWeight: "800", fontSize: "0.85rem" }}>
                <a href="/blog" className="footer-link-v3">Blog</a>
                <a href="/perfil" className="footer-link-v3">Panel Comercial</a>
                <a href="/registro-comercio" className="footer-link-v3">Registrar mi comercio</a>
              </nav>
            </div>

            {/* COL 4: LEGAL */}
            <div className="footer-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h4 style={{ fontSize: "0.75rem", fontWeight: '1000', textTransform: "uppercase", letterSpacing: "0.1em", color: 'var(--primary-dark)' }}>Legal</h4>
              <nav className="footer-nav-legal" style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontWeight: "800", fontSize: "0.85rem" }}>
                <a href="/privacidad" className="footer-link-v3">Privacidad</a>
                <a href="/terminos" className="footer-link-v3">Términos</a>
                <a href="/cookies" className="footer-link-v3">Cookies</a>
              </nav>
            </div>
          </div>

          {/* BARRA INFERIOR FINAL */}
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "2.5rem", display: "flex", justifyContent: "space-between", flexWrap: 'wrap', gap: '1rem', fontSize: "0.75rem", color: "#999", fontWeight: "600" }}>
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

        .footer-link-v3 { color: var(--text-secondary); text-decoration: none; transition: all 0.2s; white-space: nowrap; }
        .footer-link-v3:hover { color: var(--primary); transform: translateX(3px); }

        @media (max-width: 768px) {
          .hero-section { padding: 4rem 1.5rem 6rem !important; }
          .hero-title { font-size: 2.5rem !important; }
          .hero-p { font-size: 1rem !important; }
          .hero-roles-explainer { 
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important; 
            max-width: 100% !important; 
            justify-items: center;
          }
          .hero-roles-explainer > div { 
            width: 100% !important; 
            max-width: 160px !important; 
          }
          
          .hero-buttons { flex-direction: column; width: 100%; gap: 1rem; }
          .btn-v3-primary, .btn-v3-secondary { width: 100% !important; justify-content: center; }

          .map-overlay-container { 
            justify-content: flex-end !important;
            padding: 0 !important;
          }
          .map-glass-card { 
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 0 40px 40px !important;
            padding: 1.5rem !important;
            border: none !important;
            border-top: 1px solid rgba(255,255,255,0.5) !important;
          }
          .map-glass-card h2 { 
            font-size: 1.3rem !important;
            margin-bottom: 1rem !important;
          }
          .map-glass-card .button { 
            width: 100% !important;
            padding: 0.8rem !important;
            font-size: 0.95rem !important;
          }
          .mobile-hide { display: none !important; }

          .footer-grid { 
            grid-template-columns: 1fr 1fr !important; 
            gap: 2.5rem 1rem !important;
            text-align: left;
          }
          .footer-col-brand { grid-column: span 2 !important; max-width: 100% !important; }
          .footer-col { grid-column: span 1 !important; }

          .footer-nav-legal { 
            flex-direction: row !important; 
            gap: 1rem !important; 
            flex-wrap: wrap !important; 
            font-size: 0.75rem !important; 
          }
        }
      `}</style>
    </main>
  );
}
