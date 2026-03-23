'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search,
  Map as MapIcon, Loader2, AlertCircle, MessageSquare, 
  ExternalLink, ShieldCheck, LayoutDashboard, History,
  Activity
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// --- Opciones de Configuración ---
const PRODUCTION_OPTIONS = ['Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sin ultraprocesados', 'Sustentable', 'Pastura'];
const DELIVERY_PREFERENCES = ['Retiro y Entrega', 'Solo Entrega', 'Solo Retiro'];

export default function MiCuentaPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState<any>(null);
  const [validationCount, setValidationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    first_name: '',
    locality: '',
    delivery_pref: 'Retiro y Entrega',
    production_interest: [] as string[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          locality: data.locality || '',
          delivery_pref: data.delivery_pref || 'Retiro y Entrega',
          production_interest: data.production_interest || []
        });
      }

      const { count } = await supabase.from('validations').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
      setValidationCount(count || 0);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Mi Actividad', icon: LayoutDashboard },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'validaciones', label: 'Validaciones', icon: Heart },
    { id: 'favoritos', label: 'Favoritos', icon: Star },
    { id: 'configuracion', label: 'Ajustes', icon: Settings },
  ];

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>;

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#F8F9F5', overflow: 'hidden' }}>
      
      {/* SIDEBAR IZQUIERDA */}
      <aside style={{ width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem' }}>
        <div onClick={() => window.location.href = '/'} style={{ cursor: 'pointer', marginBottom: '3rem' }}>
          <span style={{ fontWeight: '950', fontSize: '1.4rem', color: '#2D3A20', letterSpacing: '-0.02em' }}>ALIMNET</span>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{ 
                padding: '1rem', borderRadius: '16px', border: 'none', 
                background: activeTab === item.id ? '#F0F4ED' : 'transparent',
                color: activeTab === item.id ? '#5F7D4A' : '#666',
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                fontWeight: activeTab === item.id ? '900' : '700', fontSize: '0.9rem',
                transition: 'all 0.2s'
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
          style={{ padding: '1rem', borderRadius: '16px', border: 'none', background: 'transparent', color: '#CC4B4B', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800', cursor: 'pointer' }}
        >
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO CENTRAL */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '3rem', position: 'relative' }}>
        
        {/* Header Content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
           <div>
             <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '4px' }}>¡Hola, {profile?.first_name || 'Tomas'}!</h1>
             <p style={{ color: '#888', fontWeight: '600' }}>Bienvenido a tu panel de control alimentario.</p>
           </div>
           <button 
             onClick={() => window.location.href = '/explorar'} 
             style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(95, 125, 74, 0.2)' }}
           >
             <MapIcon size={18} /> Ir al Mapa
           </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {/* Quick Stats */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
              <div style={{ color: '#5F7D4A', marginBottom: '1rem' }}><Award size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>Miembro</h3>
              <p style={{ color: '#888', fontWeight: '700', fontSize: '0.8rem' }}>FUNDADOR</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
              <div style={{ color: '#FF7043', marginBottom: '1rem' }}><Heart size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>{validationCount}</h3>
              <p style={{ color: '#888', fontWeight: '700', fontSize: '0.8rem' }}>VALIDACIONES REALIZADAS</p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
              <div style={{ color: '#FFB74D', marginBottom: '1rem' }}><Star size={32} /></div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>0</h3>
              <p style={{ color: '#888', fontWeight: '700', fontSize: '0.8rem' }}>PROYECTOS FAVORITOS</p>
            </div>

            {/* Activity Timeline Placeholder */}
            <div style={{ gridColumn: 'span 3', background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD', marginTop: '1rem' }}>
               <h3 style={{ fontWeight: '950', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Activity size={20} color="#5F7D4A" /> Actividad Reciente</h3>
               <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#999' }}>
                 <p style={{ fontWeight: '700' }}>Aquí aparecerán tus últimas validaciones y descubrimientos.</p>
               </div>
            </div>
          </div>
        )}

        {/* OTROS TABS (Placeholder para mantener diseño) */}
        {activeTab !== 'dashboard' && (
          <div style={{ background: 'white', padding: '4rem', borderRadius: '32px', border: '1px solid #E4EBDD', textAlign: 'center' }}>
            <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Próximamente: {activeTab.toUpperCase()}</h3>
            <p style={{ color: '#888', marginTop: '1rem' }}>Estamos puliendo esta sección en el checklist de Validaciones.</p>
          </div>
        )}

      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
