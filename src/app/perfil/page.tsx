'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Loader2,
  Map as MapIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function MerchantProfilePage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [profile, setProfile] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

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

      const { data: pData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (pData) setProfile(pData);

      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', user.id).single();
      if (mData) setMerchant(mData);
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

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', paddingTop: '56px' }}>
      <Header />
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '950', color: '#3F5232', marginBottom: '1rem' }}>
          ¡Bienvenido, {profile?.full_name || 'Comerciante'}! 🌿
        </h1>
        
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #E4EBDD', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '850', color: '#5F7D4A', marginBottom: '1rem' }}>Estado de tu Comercio: {merchant?.name || 'Cargando...'}</h2>
          <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Estamos terminando de ajustar los paneles de estadísticas y edición de perfil para que tu experiencia sea perfecta. 
            Muy pronto podrás ver tus métricas de validación y actualizar tus datos aquí mismo.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '1.5rem', background: '#F0F4ED', borderRadius: '20px', flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#5F7D4A', fontWeight: '900', fontSize: '1.5rem' }}>{merchant?.validation_count || 0}</div>
              <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '700' }}>Validaciones en Alimnet</div>
            </div>
            <div style={{ padding: '1.5rem', background: '#F0F4ED', borderRadius: '20px', flex: 1, minWidth: '200px' }}>
              <div style={{ color: '#5F7D4A', fontWeight: '900', fontSize: '1.5rem' }}>Verde</div>
              <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: '700' }}>Estado de sincronización</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '30px', right: '30px' }}>
        <button style={{ width: '60px', height: '60px', background: '#5F7D4A', border: 'none', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
}
