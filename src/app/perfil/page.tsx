'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Loader2,
  Map as MapIcon,
  Clock,
  ShieldCheck,
  Instagram,
  Download,
  Share2,
  Leaf,
  X,
  Send,
  ExternalLink,
  Smartphone,
  Check,
  Mail
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function MerchantProfilePage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [profile, setProfile] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [emailStatsEnabled, setEmailStatsEnabled] = useState(true);

  // Estados del Formulario
  const [formData, setFormData] = useState({
    name: '',
    bio_short: '',
    bio_long: '',
    type: 'Productor',
    whatsapp: '',
    email_public: '',
    instagram_url: '',
    website_url: '',
    locality: '',
    delivery_info: '',
    working_hours: ''
  });

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    fetchData();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      // 1. Perfil
      const { data: pData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (pData) setProfile(pData);

      // 2. Mercante (Detección robusta)
      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', user.id);
      
      if (mData && mData.length > 0) {
        setMerchant(mData[0]);
        setFormData({
          name: mData[0].name || '',
          bio_short: mData[0].bio_short || '',
          bio_long: mData[0].bio_long || '',
          type: mData[0].type || 'Productor',
          whatsapp: mData[0].whatsapp || '',
          email_public: mData[0].email || '',
          instagram_url: mData[0].instagram_url || '',
          website_url: mData[0].website_url || '',
          locality: mData[0].locations?.[0]?.locality || '',
          delivery_info: mData[0].delivery_info || '',
          working_hours: mData[0].working_hours || ''
        });
      } else {
        // INYECCIÓN DE PRUEBA: Para que Carlos vea cómo queda el panel
        setMerchant({
          name: 'Agroecología La Esperanza 🌿',
          validation_count: 24,
          bio_short: 'Productores de hortalizas orgánicas y miel de monte.',
          website_url: 'https://linktr.ee/esperanza',
          instagram_url: '@huerta_esperanza'
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexDirection: isMobileView ? 'column' : 'row', gap: '1rem', textAlign: isMobileView ? 'center' : 'left' }}>
              <div>
                <h1 style={{ fontSize: isMobileView ? '1.8rem' : '2.5rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>Tu Panel Alimnet</h1>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>Resumen del impacto de <strong>{merchant?.name}</strong> en la red.</p>
              </div>
              <div style={{ padding: '0.8rem 1.5rem', background: '#F0F4ED', color: '#5F7D4A', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: '900', border: '1px solid rgba(95, 125, 74, 0.1)' }}>
                <Check size={16} /> Perfil Validado
              </div>
            </div>

            {/* MÉTRICAS PRINCIPALES */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1.2rem', marginBottom: '3rem' }}>
              {[
                { label: 'Validaciones', value: merchant?.validation_count || '0', icon: ShieldCheck, color: '#5F7D4A' },
                { label: 'Interés IG', value: '18', icon: Instagram, color: '#E1306C' },
                { label: 'Interés Web', value: '24', icon: ExternalLink, color: '#2D3A20' },
                { label: 'Interés Wzp', value: '9', icon: MessageSquare, color: '#25D366' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <div style={{ background: `${stat.color}10`, color: stat.color, padding: '7px', borderRadius: '10px' }}>
                      <stat.icon size={18} />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '850', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '950', color: '#2D3A20' }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1.3fr 1fr', gap: '2rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* PREVISUALIZACIÓN CARD */}
                <div style={{ background: 'white', borderRadius: '40px', padding: '2.5rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <Smartphone size={20} /> Previsualización del Perfil
                  </h3>
                  
                  <div style={{ 
                    border: '1px solid #eee', borderRadius: '28px', overflow: 'hidden', 
                    maxWidth: '400px', margin: isMobileView ? '0 auto' : '0', background: 'white',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
                  }}>
                    <div style={{ height: '140px', background: '#F4F1E6', position: 'relative' }}>
                       <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '15px', fontSize: '0.65rem', fontWeight: '900', color: '#5F7D4A', border: '1px solid rgba(0,0,0,0.05)' }}>
                          VIGENTE
                       </div>
                    </div>
                    <div style={{ padding: '2rem', marginTop: '-50px' }}>
                       <div style={{ width: '90px', height: '90px', background: 'white', borderRadius: '22px', border: '5px solid white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Leaf size={45} color="#5F7D4A" />
                       </div>
                       <h4 style={{ fontSize: '1.5rem', fontWeight: '1000', color: '#2D3A20', marginTop: '1.2rem', marginBottom: '0.4rem' }}>{merchant?.name}</h4>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#5F7D4A', fontSize: '0.85rem', fontWeight: '900' }}>
                          <ShieldCheck size={16} fill="#5F7D4A" color="white" /> {merchant?.validation_count} Validaciones
                       </div>
                       <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '1rem', lineHeight: '1.5' }}>{merchant?.bio_short}</p>
                       
                       <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}><Instagram size={18} /></div>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}><ExternalLink size={18} /></div>
                          <div style={{ flex: 1, padding: '0 1rem', borderRadius: '12px', background: '#5F7D4A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900' }}>PEDIR</div>
                       </div>
                    </div>
                  </div>
                </div>

                {/* KIT DE PRENSA */}
                <div style={{ background: '#2D3A20', borderRadius: '40px', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                  <Leaf size={140} style={{ position: 'absolute', right: '-30px', bottom: '-30px', opacity: 0.1, transform: 'rotate(-15deg)' }} />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '950', marginBottom: '0.8rem' }}>Kit de Prensa de Alimnet</h3>
                  <p style={{ opacity: 0.7, marginBottom: '2rem', fontSize: '0.85rem', lineHeight: '1.6', maxWidth: '300px' }}>Descargá manuales, logos y filtros oficiales para tus redes.</p>
                  <button style={{ padding: '0.8rem 1.6rem', background: 'white', color: '#2D3A20', border: 'none', borderRadius: '14px', fontWeight: '1000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Download size={18} /> Descargar
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA: CONFIGS RÁPIDAS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                 <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid #E4EBDD' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                       <Mail size={20} color="#5F7D4A" />
                       <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2D3A20' }}>Reportes Mensuales</h3>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
                       Recibí un resumen detallado de tu impacto y consejos personalizados para tu comercio cada 30 días.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.2rem', background: '#F8F9F5', borderRadius: '18px' }}>
                       <span style={{ fontSize: '0.85rem', fontWeight: '850', color: '#3F5232' }}>Correo estadístico</span>
                       <div 
                         onClick={() => setEmailStatsEnabled(!emailStatsEnabled)}
                         style={{ 
                           width: '45px', height: '24px', background: emailStatsEnabled ? '#5F7D4A' : '#ccc', 
                           borderRadius: '20px', padding: '4px', cursor: 'pointer', transition: 'all 0.3s',
                           display: 'flex', alignItems: 'center', justifyContent: emailStatsEnabled ? 'flex-end' : 'flex-start'
                         }}
                       >
                         <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                       </div>
                    </div>
                 </div>

                 <div style={{ background: '#F0F4ED', borderRadius: '32px', padding: '2rem', border: '1px solid rgba(95, 125, 74, 0.1)' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.6rem' }}>Próximo Reporte</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '800', fontSize: '1.1rem' }}>
                       <Clock size={20} /> Falta 1 semana
                    </div>
                 </div>
              </div>

            </div>
          </div>
        );
      case 'perfil':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1rem' }}>Editar Perfil Público</h1>
            <p style={{ color: '#666', marginBottom: '3rem' }}>Actualizá tu información para conectar con más consumidores cuidados.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
               <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid #E4EBDD' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                     <div style={{ gridColumn: isMobileView ? 'auto' : 'span 2' }}>
                        <label style={{ display: 'block', fontWeight: '900', color: '#3F5232', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Nombre del Comercio</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', outline: 'none', background: '#F8F9F5' }} />
                     </div>
                     <div style={{ gridColumn: isMobileView ? 'auto' : 'span 2' }}>
                        <label style={{ display: 'block', fontWeight: '900', color: '#3F5232', marginBottom: '0.8rem', fontSize: '0.9rem' }}>Linktree / Web Oficial</label>
                        <input type="text" value={formData.website_url} onChange={(e) => setFormData({...formData, website_url: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', outline: 'none' }} />
                     </div>
                     {/* El resto de campos irían aquí */}
                  </div>
                  <button style={{ marginTop: '2rem', padding: '1.2rem 3rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '18px', fontWeight: '1000', cursor: 'pointer', boxShadow: '0 10px 25px rgba(95, 125, 74, 0.2)' }}>Guardar Cambios ✨</button>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', paddingTop: '56px' }}>
      <Header />
      
      {/* MENÚ MÓVIL SUB-HEADER */}
      {isMobileView && (
        <div style={{ background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.8rem 1rem', display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', position: 'sticky', top: '56px', zIndex: 4000 }}>
           {[
            { id: 'inicio', label: 'Panel', icon: BarChart3 },
            { id: 'perfil', label: 'Perfil', icon: User },
            { id: 'config', label: 'Ajustes', icon: Settings }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', borderRadius: '14px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : '#F0F4ED', color: activeTab === item.id ? 'white' : '#5F7D4A', fontWeight: '900', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              <item.icon size={16} /> {item.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, display: 'flex' }}>
        {/* SIDEBAR ESCRITORIO */}
        {!isMobileView && (
          <div style={{ width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'sticky', top: '56px', height: 'calc(100vh - 56px)' }}>
             {[
               { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
               { id: 'perfil', label: 'Editar Perfil', icon: User },
               { id: 'config', label: 'Configuración', icon: Settings }
             ].map(item => (
               <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem 1.2rem', borderRadius: '18px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : 'transparent', color: activeTab === item.id ? 'white' : '#666', fontWeight: '850', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                 <item.icon size={20} /> {item.label}
               </button>
             ))}
             
             <div style={{ marginTop: 'auto', background: '#F0F4ED', padding: '1.5rem', borderRadius: '24px' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem' }}>Soporte Alimnet</h4>
                <button 
                  onClick={() => setShowChat(true)}
                  style={{ width: '100%', padding: '0.8rem', background: 'white', border: 'none', borderRadius: '12px', color: '#5F7D4A', fontWeight: '950', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}
                >
                  <MessageSquare size={16} /> Abrir Chat
                </button>
             </div>
          </div>
        )}

        {/* MAIN AREA */}
        <div style={{ flex: 1, padding: isMobileView ? '1.5rem' : '3rem', maxWidth: '1280px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
           {renderContent()}
        </div>
      </div>

      {/* CHAT MODAL TEMPORAL */}
      {showChat && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '400px', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.2)', border: '1px solid #E4EBDD', overflow: 'hidden' }}>
             <div style={{ background: '#2D3A20', padding: '1.8rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '950' }}>Soporte Humano ✨</h4>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}><X size={22} /></button>
             </div>
             <div style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  ¿Preferís hablar por WhatsApp? Respondemos en minutos.
                </p>
                <button style={{ marginTop: '1.5rem', width: '100%', padding: '1.2rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                   <MessageSquare size={18} fill="white" /> WHATSAPP SOPORTE
                </button>
             </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
