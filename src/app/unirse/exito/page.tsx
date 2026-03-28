'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  CheckCircle2, 
  ArrowRight, 
  Share2, 
  Instagram, 
  Download, 
  Leaf, 
  MapPin, 
  Star,
  ExternalLink,
  UserCircle
} from 'lucide-react';

function ExitoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Tu Comercio';
  const type = searchParams.get('type') || 'Productor';
  const logoUrl = searchParams.get('logo');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        {/* HEADER ÉXITO CON LOGO */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', animation: 'fadeInDown 0.6s ease-out' }}>
          <div style={{ 
            width: '120px', height: '120px', background: 'white',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            margin: '0 auto 2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: '4px solid var(--primary)', position: 'relative', overflow: 'hidden'
          }}>
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ background: 'var(--primary)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Leaf size={60} fill="white" />
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--primary)', color: 'white', borderRadius: '50%', padding: '4px', border: '2px solid white' }}>
              <CheckCircle2 size={16} />
            </div>
          </div>
          <h1 style={{ fontSize: '3rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>¡Hola {name}!</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>Bienvenido a la red de Alimnet</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Tu propuesta ha sido recibida correctamente. Ya eres parte de la red de alimentos más cuidada del país.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2.5rem' }}>
          
          {/* COLUMNA IZQUIERDA: BADGE Y COMPARTIR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* BADGE DE COMUNIDAD - MEJORADO CONTRASTE */}
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary-dark) 0%, #2D3A24 100%)', 
              borderRadius: '40px', padding: '3rem', color: 'white', position: 'relative', overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'slideRight 0.8s ease-out'
            }}>
              <Leaf size={120} style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.1, transform: 'rotate(-15deg)' }} />
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'white' }}>
                    Miembro Oficial
                  </div>
                </div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: '950', lineHeight: '1', marginBottom: '1.5rem', color: 'white' }}>Somos parte de Alimnet.</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginBottom: '2.5rem', maxWidth: '90%', fontWeight: '500' }}>
                  Impulsando una alimentación transparente, cercana y cuidada desde el origen.
                </p>
                <button style={{ 
                  padding: '1rem 2rem', background: 'white', color: 'var(--primary-dark)', 
                  border: 'none', borderRadius: '16px', fontWeight: '900', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}>
                  <Download size={18} /> Descargar Kit de Prensa
                </button>
              </div>
            </div>

            {/* RRSS COMPARTIR */}
            <div style={{ background: 'white', borderRadius: '32px', padding: '2rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>¡Contale al mundo!</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Compartí en tus redes que ya sos parte de Alimnet.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#F0F4ED', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--primary)' }}><Instagram size={20} /></button>
                <button style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#F0F4ED', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--primary)' }}><Share2 size={20} /></button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: PREVIEW Y PASOS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* PREVIEW DE LA TARJETA - MEJORADO CONTRASTE */}
            <div style={{ opacity: 1 }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Previsualización en el mapa</p>
              <div style={{ padding: '1.5rem', background: 'white', borderRadius: '24px', border: '2px solid var(--primary)', position: 'relative', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {logoUrl && <img src={logoUrl} style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} alt="" />}
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--primary-dark)' }}>{name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '900', marginTop: '2px' }}>
                        <MapPin size={12} fill="var(--primary)" fillOpacity={0.2} /> Pilar, Bs As
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '0.3rem 0.6rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '10px', fontSize: '0.6rem', fontWeight: '900' }}>
                    {type}
                  </div>
                </div>
                <div style={{ height: '44px', background: '#F8F9F5', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '12px', border: '1px solid #eee' }}>
                  <Star size={16} fill="var(--primary)" color="var(--primary)" />
                  <div style={{ height: '8px', width: '60%', background: '#DCE4D5', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>

            {/* PRÓXIMOS PASOS */}
            <div style={{ background: '#F0F4ED', borderRadius: '32px', padding: '2rem', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Próximos pasos:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '28px', height: '28px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '900', flexShrink: 0 }}>1</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--primary-dark)' }}>Validación:</strong> Revisaremos tu info para asegurar la coherencia con la red.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ width: '28px', height: '28px', background: 'white', color: 'var(--primary)', border: '2px solid var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '900', flexShrink: 0 }}>2</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <strong style={{ color: 'var(--primary-dark)' }}>Activación:</strong> Te avisaremos por WhatsApp y aparecerás en el mapa.
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2rem' }}>
                <button 
                  onClick={() => router.push('/perfil')} // Placeholder para la futura página de perfil
                  style={{ 
                    width: '100%', padding: '1rem', background: 'var(--primary-dark)', 
                    color: 'white', border: 'none', borderRadius: '16px', 
                    fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', gap: '8px' 
                  }}
                >
                  <UserCircle size={20} /> Ir a mi perfil
                </button>
                <button 
                  onClick={() => router.push('/explorar')}
                  style={{ 
                    width: '100%', padding: '1rem', background: 'white', 
                    color: 'var(--primary)', border: '2px solid var(--primary)', borderRadius: '16px', 
                    fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', gap: '8px' 
                  }}
                >
                  Ir al Mapa <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function ExitoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ExitoContent />
    </Suspense>
  );
}
