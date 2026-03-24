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
  Send
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
  const [message, setMessage] = useState('');

  // Estados del Formulario (los conservamos para cuando restauremos la pestaña Perfil)
  const [formData, setFormData] = useState({
    name: '',
    bio_short: '',
    whatsapp: '',
    locality: ''
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

      // 2. Mercante (Detección robusta sin .single() por si hay latencia)
      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', user.id);
      if (mData && mData.length > 0) {
        setMerchant(mData[0]);
        setFormData({
          name: mData[0].name || '',
          bio_short: mData[0].bio_short || '',
          whatsapp: mData[0].whatsapp || '',
          locality: mData[0].locations?.[0]?.locality || ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}>
      <Loader2 className="animate-spin" size={40} color="#5F7D4A" />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexDirection: isMobileView ? 'column' : 'row', gap: '1rem', textAlign: isMobileView ? 'center' : 'left' }}>
              <div>
                <h1 style={{ fontSize: isMobileView ? '1.8rem' : '2.5rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem' }}>Tu Panel Alimnet</h1>
                <p style={{ color: '#666' }}>Hola {profile?.full_name}, aquí tenés el resumen de tu impacto.</p>
              </div>
              <div style={{ padding: '0.8rem 1.5rem', background: '#FEF3C7', color: '#92400E', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', fontWeight: '800' }}>
                <Clock size={16} /> Pendiente de Validación
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { label: 'Validaciones', value: merchant?.validation_count || '0', icon: ShieldCheck, sub: 'Totales en red' },
                { label: 'Vistas Perfil', value: '12', icon: User, sub: 'Estimado mensual' },
                { label: 'Interés IG', value: '8', icon: Instagram, sub: 'Clicks a redes' },
                { label: 'Interés Wzp', value: '5', icon: MessageSquare, sub: 'Inicio de chats' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                    <div style={{ background: '#F0F4ED', color: '#5F7D4A', padding: '8px', borderRadius: '12px' }}>
                      <stat.icon size={20} />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#666' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '950', color: '#2D3A20' }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1.2fr 1fr', gap: '2.5rem' }}>
              <div style={{ background: 'white', borderRadius: '32px', padding: '2.5rem', border: '1px solid #E4EBDD' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1.5rem' }}>Estado de tu Comercio: {merchant?.name || 'Inexistente'}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.9rem' }}>
                  Tu comercio ya está en el mapa. Asegurate de mantener actualizada tu descripción para que los consumidores sepan cómo pedirte.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
                  <button onClick={() => setActiveTab('perfil')} style={{ padding: '0.8rem 1.5rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Editar Datos Públicos</button>
                </div>
              </div>
              <div style={{ background: '#2D3A20', borderRadius: '32px', padding: '2.5rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <Leaf size={150} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.1, transform: 'rotate(-20deg)' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '950', marginBottom: '1rem', position: 'relative' }}>Kit de Prensa ✨</h3>
                <p style={{ opacity: 0.8, marginBottom: '2rem', fontSize: '0.85rem', lineHeight: '1.6', position: 'relative' }}>Descargá los manuales y logos oficiales para compartir en tus historias.</p>
                <button style={{ padding: '0.8rem 1.5rem', background: 'white', color: '#2D3A20', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                  <Download size={18} /> Materiales
                </button>
              </div>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1rem' }}>Editar Perfil Público</h1>
            <p style={{ color: '#666', marginBottom: '3rem' }}>Esta información es la que verán los consumidores en Alimnet.</p>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
              <p style={{ color: '#999', fontSize: '0.9rem' }}>El formulario de edición estará disponible en unos minutos...</p>
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
        <div style={{ background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.8rem 1rem', display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
           {[
            { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
            { id: 'perfil', label: 'Editar Perfil', icon: User },
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
          <div style={{ width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '56px', height: 'calc(100vh - 56px)' }}>
             {[
               { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
               { id: 'perfil', label: 'Editar Perfil', icon: User },
               { id: 'config', label: 'Configuración', icon: Settings }
             ].map(item => (
               <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', borderRadius: '16px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : 'transparent', color: activeTab === item.id ? 'white' : '#666', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}>
                 <item.icon size={20} /> {item.label}
               </button>
             ))}
          </div>
        )}

        {/* MAIN AREA */}
        <div style={{ flex: 1, padding: isMobileView ? '1.5rem' : '3rem', maxWidth: '1200px', overflowY: 'auto' }}>
           {renderContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
