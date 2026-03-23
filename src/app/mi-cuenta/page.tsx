'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search,
  Map as MapIcon, Loader2, AlertCircle, MessageSquare, 
  ExternalLink, ShieldCheck, LayoutDashboard, History,
  Activity, Users, Share2, Eye
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
  const [validatedMerchants, setValidatedMerchants] = useState<any[]>([]);

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

      // Traer los locales validados reales
      const { data: vData } = await supabase
        .from('validations')
        .select(`
          merchant_id,
          merchants (
            id,
            name,
            type,
            locations (locality)
          )
        `)
        .eq('user_id', user.id);
      
      if (vData) {
        setValidatedMerchants(vData.map((v: any) => v.merchants).filter(Boolean));
      }

    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Mi Actividad', icon: LayoutDashboard },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'validaciones', label: 'Validaciones', icon: Heart },
    { id: 'referentes', label: 'Referentes', icon: Users },
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

        {activeTab === 'validaciones' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>Mis Validaciones</h2>
              <p style={{ color: '#888', fontWeight: '600' }}>Los proyectos que apoyaste con tu validación social.</p>
            </div>
            
            {validatedMerchants.length > 0 ? (
              validatedMerchants.map(m => (
                <div 
                  key={m.id}
                  onClick={() => window.location.href = `/explorar?id=${m.id}`}
                  style={{ 
                    background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', 
                    cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex', flexDirection: 'column', gap: '12px',
                    position: 'relative'
                  }}
                  className="card-hover"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}>
                      <ShieldCheck size={24} />
                    </div>
                    <div style={{ padding: '4px 10px', background: '#2D3A20', color: 'white', borderRadius: '8px', fontSize: '0.6rem', fontWeight: '900' }}>{m.type?.split(',')[0]}</div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '4px' }}>{m.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.8rem', fontWeight: '700' }}>
                      <MapPin size={14} /> {m.locations?.[0]?.locality || 'Zona Norte'}
                    </div>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontSize: '0.8rem', fontWeight: '800' }}>
                    Ver en el mapa <ChevronRight size={16} />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px dashed #E4EBDD' }}>
                <Heart size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Aún no has validado ningún proyecto</h3>
                <p style={{ color: '#888', marginTop: '1rem' }}>Explorá el mapa y validá a tus productores de confianza.</p>
                <button 
                  onClick={() => window.location.href = '/explorar'} 
                  style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '16px', border: 'none', background: '#2D3A20', color: 'white', fontWeight: '800', cursor: 'pointer' }}
                >
                  Ir al Mapa
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'referentes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>Mis Referentes</h2>
              <p style={{ color: '#888', fontWeight: '600' }}>Los guías en los que confiás para descubrir comida real.</p>
            </div>
            
            {/* REFERENTE 1: Carlos (Mockup Premium) */}
            <div style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '22px', background: '#F4F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', border: '2px solid #E4EBDD' }}>
                  <User size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>Carlos Prueba</h3>
                  <p style={{ color: '#5F7D4A', fontWeight: '800', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MIEMBRO FUNDADOR</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
                  <button style={{ padding: '0.6rem 1.2rem', borderRadius: '12px', border: 'none', background: '#F0F4ED', color: '#5F7D4A', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}><Eye size={16} style={{ marginRight: '6px' }} /> Ver Perfil</button>
                  <button style={{ padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid #E4EBDD', background: 'white', color: '#666', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>Remover</button>
                </div>
              </div>

              <div style={{ background: '#F8F9F5', padding: '1.5rem', borderRadius: '24px' }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ÚLTIMAS VALIDACIONES DE CARLOS:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {/* Mock de lo que Carlos validó */}
                  {['Sana Sana', 'Feria Itinerante'].map((loc, idx) => (
                    <div key={idx} style={{ background: 'white', padding: '1rem', borderRadius: '18px', border: '1px solid #E4EBDD', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}>
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '950', color: '#2D3A20' }}>{loc}</p>
                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#888', fontWeight: '700' }}>Agroecológico</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BUSCADOR DE REFERENTES */}
            <div style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px dashed #E4EBDD' }}>
               <Users size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
               <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Descubrí nuevos Referentes</h3>
               <p style={{ color: '#888', marginTop: '1rem' }}>Seguí a las personas cuya confianza alimentaria te inspire.</p>
               <div style={{ maxWidth: '400px', margin: '2rem auto 0', position: 'relative' }}>
                 <input type="text" placeholder="Buscar por nombre o ciudad..." style={{ width: '100%', padding: '1rem 1.5rem 1rem 3rem', borderRadius: '16px', border: '1.5px solid #E4EBDD', fontSize: '0.9rem', outline: 'none' }} />
                 <Search size={18} color="#888" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
               </div>
            </div>
          </div>
        )}

        {/* OTROS TABS (Placeholder para mantener diseño) */}
        {['perfil', 'favoritos', 'configuracion'].includes(activeTab) && (
          <div style={{ background: 'white', padding: '4rem', borderRadius: '32px', border: '1px solid #E4EBDD', textAlign: 'center' }}>
            <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Próximamente: {activeTab.toUpperCase()}</h3>
            <p style={{ color: '#888', marginTop: '1rem' }}>Estamos puliendo esta sección en el checklist de Alimnet.</p>
          </div>
        )}

      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .card-hover:hover {
          transform: translateY(-8px);
          boxShadow: 0 20px 40px rgba(0,0,0,0.05);
          border-color: #5F7D4A;
        }
      `}</style>
    </div>
  );
}
