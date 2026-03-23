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
  const [showSidebar, setShowSidebar] = useState(false);
  const [counts, setCounts] = useState({
    validations: 0,
    referents: 1, // Carlos de base
    saved: 1, // Raíz Vivo de base
    recent: 3
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
      setCounts(prev => ({ ...prev, validations: count || 0 }));

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
    { id: 'validaciones', label: 'Validaciones', icon: ShieldCheck },
    { id: 'referentes', label: 'Referentes', icon: Users },
    { id: 'favoritos', label: 'Guardados', icon: Star },
    { id: 'recientes', label: 'Recientes', icon: History },
    { id: 'sostener', label: 'Sostener Alimnet', icon: Heart, special: true },
    { id: 'logout', label: 'Cerrar Sesión', icon: LogOut },
  ];

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>;

  return (
    <div style={{ height: '100vh', display: 'flex', background: '#F8F9F5', overflow: 'hidden' }}>
      
      {/* BOTÓN HAMBURGUESA UNIFICADO (SÓLO MOBILE) */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        style={{ 
          position: 'fixed', top: '25px', left: '25px', zIndex: 100, 
          background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', 
          padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '5px',
          alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          width: '45px', justifyContent: 'center'
        }}
        className="mobile-only"
      >
        <div style={{ width: showSidebar ? '22px' : '10px', height: '2px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.4s' }}></div>
        <div style={{ width: '16px', height: '2px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.4s' }}></div>
        <div style={{ width: showSidebar ? '10px' : '22px', height: '2px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.4s' }}></div>
      </button>

      {/* SIDEBAR IZQUIERDA (PERSISTENTE EN WEB / COLAPSABLE EN MOBILE) */}
      <aside 
        style={{ 
          width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', 
          display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem',
          zIndex: 90,
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          boxShadow: 'none'
        }}
        className={`sidebar-dashboard ${showSidebar ? 'open' : ''}`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingTop: '4rem' }}>
          <div onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
            <span style={{ fontWeight: '950', fontSize: '1.4rem', color: '#2D3A20', letterSpacing: '-0.02em' }}>ALIMNET</span>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { 
                if (item.id === 'sostener') {
                  window.location.href = '/sostener';
                  return;
                }
                if (item.id === 'logout') {
                  supabase.auth.signOut().then(() => window.location.href = '/');
                  return;
                }
                setActiveTab(item.id); 
                setShowSidebar(false); 
              }}
              style={{ 
                padding: '1rem', borderRadius: '16px', border: 'none', 
                background: item.special ? '#5F7D4A' : (activeTab === item.id ? '#F0F4ED' : 'transparent'),
                color: item.special ? 'white' : (activeTab === item.id ? '#5F7D4A' : '#666'),
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                fontWeight: (activeTab === item.id || item.special) ? '900' : '700', fontSize: '0.9rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                width: '100%', textAlign: 'left',
                marginTop: item.special ? 'auto' : '0',
                boxShadow: item.special ? '0 10px 25px rgba(95, 125, 74, 0.2)' : 'none'
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* CONTENIDO CENTRAL */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '3rem 5rem', 
        position: 'relative', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        width: '100%' 
      }}>
        
        {/* Header Content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', paddingTop: '1rem' }}>
           <div>
             <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '4px' }}>¡Hola, {profile?.first_name || 'Tomas'}!</h1>
             <p style={{ color: '#888', fontWeight: '600' }}>Tu radar de confianza alimentaria.</p>
           </div>
           <button 
             onClick={() => window.location.href = '/explorar'} 
             style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(95, 125, 74, 0.2)' }}
             className="desktop-only"
           >
             <MapIcon size={18} /> Explorar
           </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {/* Quick Stats Grid - Horizontal Elegant Style */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
              
              <div 
                onClick={() => setActiveTab('validaciones')}
                style={{ background: 'white', padding: '0.8rem 1.4rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', width: 'fit-content' }}
                className="stat-bar"
              >
                <div style={{ color: '#5F7D4A', display: 'flex' }}><ShieldCheck size={20} /></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20' }}>{counts.validations}</span>
                  <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>VALIDACIONES</span>
                </div>
              </div>
              
              <div 
                onClick={() => setActiveTab('referentes')}
                style={{ background: 'white', padding: '0.8rem 1.4rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', width: 'fit-content' }}
                className="stat-bar"
              >
                <div style={{ color: '#8EA87D', display: 'flex' }}><Users size={20} /></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20' }}>{counts.referents}</span>
                  <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>REFERENTES</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('favoritos')}
                style={{ background: 'white', padding: '0.8rem 1.4rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', width: 'fit-content' }}
                className="stat-bar"
              >
                <div style={{ color: '#2D3A20', display: 'flex' }}><Star size={20} /></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20' }}>{counts.saved}</span>
                  <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>GUARDADOS</span>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('recientes')}
                style={{ background: 'white', padding: '0.8rem 1.4rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', width: 'fit-content' }}
                className="stat-bar"
              >
                <div style={{ color: '#B8C6B1', display: 'flex' }}><History size={20} /></div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20' }}>{counts.recent}</span>
                  <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>RECIENTES</span>
                </div>
              </div>
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

        {activeTab === 'favoritos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>Mis Guardados</h2>
              <p style={{ color: '#888', fontWeight: '600' }}>Los proyectos que tenés planeado visitar pronto.</p>
            </div>
            
            {/* Ejemplo de Guardado: Raíz Vivo 42 */}
            <div 
              style={{ 
                background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', 
                cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex', flexDirection: 'column', gap: '12px',
                position: 'relative'
              }}
              className="card-hover"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#FFF8F1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF7043' }}>
                  <Star size={24} />
                </div>
                <div style={{ padding: '4px 10px', background: '#FF7043', color: 'white', borderRadius: '8px', fontSize: '0.6rem', fontWeight: '900' }}>PROYECTO</div>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '4px' }}>Raíz Vivo 42</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.8rem', fontWeight: '700' }}>
                  <MapPin size={14} /> Escobar, Prov. Buenos Aires
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', gap: '8px', color: '#FF7043', fontSize: '0.8rem', fontWeight: '800' }}>
                Ver en el mapa <ChevronRight size={16} />
              </div>
              
              <button style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#CC4B4B', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* SECCIÓN VACÍA MÁS ABAJO */}
            <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', border: '1px dashed #E4EBDD', borderRadius: '32px' }}>
                <History size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>¿Todavía no encontraste tu próximo destino?</h3>
                <p style={{ color: '#888', marginTop: '1rem' }}>Explorá el mapa y guardá los proyectos con el ícono de estrella.</p>
                <button 
                  onClick={() => window.location.href = '/explorar'} 
                  style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '16px', border: 'none', background: '#2D3A20', color: 'white', fontWeight: '800', cursor: 'pointer' }}
                >
                  Ir al Mapa
                </button>
            </div>
          </div>
        )}

        {activeTab === 'recientes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>Vistos Recientemente</h2>
              <p style={{ color: '#888', fontWeight: '600' }}>Los locales que exploraste en el mapa durante tu última sesión.</p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid #E4EBDD', paddingLeft: '2rem', marginLeft: '1rem' }}>
              {/* Ejemplo de Historial */}
              {['Proyecto Bio-Sustentable', 'Mercado Saludable', 'Cooperativa del Campo'].map((loc, idx) => (
                <div 
                  key={idx}
                  onClick={() => window.location.href = '/explorar'}
                  style={{ 
                    background: 'white', padding: '1.2rem 1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', 
                    cursor: 'pointer', transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  className="card-hover"
                >
                  <div style={{ position: 'absolute', left: '-2.65rem', top: '50%', transform: 'translateY(-50%)', width: '12px', height: '12px', borderRadius: '50%', background: '#5F7D4A', border: '3px solid white', boxShadow: '0 0 0 4px #F0F4ED' }}></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F8F9F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '900', color: '#2D3A20' }}>{loc}</h4>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#999', fontWeight: '700' }}>Visto hace {idx * 15 + 5} min</p>
                    </div>
                  </div>
                  <ChevronRight size={20} color="#E4EBDD" />
                </div>
              ))}
            </div>

            <div style={{ padding: '3rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px dashed #E4EBDD', marginTop: '1rem' }}>
               <Loader2 size={32} color="#E4EBDD" className="animate-spin" style={{ marginBottom: '1rem' }} />
               <p style={{ color: '#888', fontWeight: '700', fontSize: '0.85rem' }}>Tu historial se actualiza en tiempo real mientras navegás.</p>
            </div>
          </div>
        )}

        {/* OTROS TABS (Placeholder para mantener diseño) */}
        {['perfil', 'configuracion'].includes(activeTab) && (
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
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          border-color: #5F7D4A;
        }
        .stat-bar {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-bar:hover {
          transform: translateX(10px);
          border-color: #5F7D4A;
          box-shadow: 0 10px 20px rgba(0,0,0,0.03);
        }
        .mobile-only { display: none; }
        .desktop-only { display: flex; }

        @media (max-width: 900px) {
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
          .sidebar-dashboard {
             transform: translateX(-100%);
             transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .sidebar-dashboard.open {
             transform: translateX(0);
             box-shadow: 20px 0 60px rgba(0,0,0,0.1);
          }
          .main-content {
             margin-left: 0 !important;
             padding: 5rem 1rem !important; 
          }
          main { 
            overflow-x: hidden !important;
            width: 100vw !important;
          }
          h1 { font-size: 1.8rem !important; }
          .stat-bar { 
            padding: 1rem !important; 
            min-width: 0 !important;
            width: auto !important;
          }
        }
        
        @media (min-width: 901px) {
          .main-content {
            margin-left: 280px;
          }
        }
      `}</style>
    </div>
  );
}
