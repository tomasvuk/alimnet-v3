'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search,
  Map as MapIcon, Loader2, AlertCircle, MessageSquare, 
  ExternalLink, ShieldCheck, LayoutDashboard, History,
  Activity, Users, Share2, Eye, Sparkles
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { 
  OFFICIAL_CATEGORIES, 
  PRODUCTION_ADN_OPTIONS, 
  DIETARY_OPTIONS,
  DELIVERY_PREFERENCES 
} from '@/lib/constants';

// Constants moved to @/lib/constants

// --- COMPONENTE PRINCIPAL CON SUSPENSE (REQUERIDO POR NEXT.JS) ---
export default function MiCuentaPage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>}>
      <MiCuentaContent />
    </Suspense>
  );
}

function MiCuentaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    production_interest: [] as string[],
    display_name_style: 'full' as 'full' | 'initial'
  });
  const [merchantProducts, setMerchantProducts] = useState<any[]>([]); // NUEVO: Estado de Productos
  const [merchantFormData, setMerchantFormData] = useState<any>({
    name: '',
    bio_short: '',
    bio_long: '',
    instagram_url: '',
    whatsapp: '',
    preferred_contact_channel: 'whatsapp',
    tags: [],
    logo_url: '',
    website_url: '',
    display_name_style: 'full' // 'full' (Tomas Vukojicic) or 'initial' (Tomas V.)
  });
  const [validatedMerchants, setValidatedMerchants] = useState<any[]>([]);
  const [merchantData, setMerchantData] = useState<any>(null); // Datos del emprendimiento si es dueño
  const [showSidebar, setShowSidebar] = useState(false);
  const [counts, setCounts] = useState({
    validations: 0,
    referents: 1, // Carlos de base
    saved: 1, // Raíz Vivo de base
    recent: 3,
    contributions: 0
  });
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    } else {
      setActiveTab('dashboard');
    }
  }, [searchParams]);

  // Reset scroll on tab change
  useEffect(() => {
    const handleScrollReset = () => {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) mainContent.scrollTo(0, 0);
      window.scrollTo(0, 0);
    };

    const timer = setTimeout(handleScrollReset, 50);

    if (window.innerWidth <= 900) {
      setShowSidebar(false);
    }
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/mi-cuenta?tab=${tabId}`, { scroll: false });
  };

  const fetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) { router.push('/login'); return; }

      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          locality: data.locality || '',
          delivery_pref: data.delivery_pref || 'Retiro y Entrega',
          production_interest: data.production_interest || [],
          display_name_style: data.display_name_style || 'full'
        });
      }

      const { count } = await supabase.from('validations').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
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

      // --- 3. DETECTAR SI ES PRODUCTOR ---
      const { data: mData } = await supabase
        .from('merchants')
        .select('*')
        .eq('owner_id', user.id)
        .single();
      
      if (mData) {
        setMerchantData(mData);
        setMerchantFormData({
          name: mData.name || '',
          bio_short: mData.bio_short || '',
          bio_long: mData.bio_long || '',
          instagram_url: mData.instagram_url || '',
          whatsapp: mData.whatsapp || '',
          preferred_contact_channel: mData.preferred_contact_channel || 'whatsapp',
          tags: mData.tags || [],
          logo_url: mData.logo_url || '',
          website_url: mData.website_url || ''
        });

        // TRAER PRODUCTOS DEL CATALOGO
        const { data: pData } = await supabase
          .from('merchant_products')
          .select('*')
          .eq('merchant_id', mData.id)
          .order('created_at', { ascending: false });
        if (pData) setMerchantProducts(pData);
      }

        // 4. TRAER CONTRIBUCIONES COMUNITARIAS
        const { data: cData, count: cCount } = await supabase
          .from('merchants')
          .select('*', { count: 'exact' })
          .eq('created_by', user.id)
          .eq('created_by_type', 'neighborhood_recommendation');
        
        if (cData) {
          setContributions(cData);
          setCounts(prev => ({ ...prev, contributions: cCount || 0 }));
        }

      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
  const handleSaveMerchant = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from('merchants').update({
        name: merchantFormData.name,
        bio_short: merchantFormData.bio_short,
        bio_long: merchantFormData.bio_long,
        instagram_url: merchantFormData.instagram_url,
        whatsapp: merchantFormData.whatsapp,
        preferred_contact_channel: merchantFormData.preferred_contact_channel,
        tags: merchantFormData.tags,
        logo_url: merchantFormData.logo_url,
        website_url: merchantFormData.website_url,
        updated_at: new Date().toISOString()
      }).eq('id', merchantData.id);

      if (error) throw error;
      setMerchantData({ ...merchantData, ...merchantFormData });
      setMessage({ type: 'success', text: '¡Datos comerciales actualizados! 🌿' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error al actualizar datos comerciales.' });
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Mi Actividad', icon: LayoutDashboard },
    ...(merchantData ? [{ id: 'mi-emprendimiento', label: 'Mi Emprendimiento', icon: Package }] : []),
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'contribuciones', label: 'Mis Contribuciones', icon: Sparkles },
    { id: 'validaciones', label: 'Validaciones', icon: ShieldCheck },
    { id: 'referentes', label: 'Referentes', icon: Users },
    { id: 'favoritos', label: 'Guardados', icon: Star },
    { id: 'recientes', label: 'Recientes', icon: History },
    { id: 'sostener', label: 'Sostener Alimnet', icon: Heart, special: true },
    { id: 'logout', label: 'Cerrar Sesión', icon: LogOut },
  ];

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8F9F5', overflow: 'hidden', paddingTop: '56px' }}>
      
      <Header />

      {/* SUB-MENU HORIZONTAL (SOLO MÓVIL) */}
      <div className="mobile-only" style={{ 
        background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.8rem 1rem', 
        overflowX: 'auto', whiteSpace: 'nowrap', gap: '10px', display: 'flex',
        scrollbarWidth: 'none', msOverflowStyle: 'none'
      }}>
        {menuItems.filter(item => item.id !== 'logout').map(item => (
          <button 
            key={item.id}
            onClick={() => {
              if (item.id === 'sostener') { router.push('/sostener'); return; }
              if (item.id === 'mi-emprendimiento') { router.push('/perfil'); return; }
              handleTabChange(item.id);
            }}
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.2rem', 
              borderRadius: '14px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : '#F0F4ED',
              color: activeTab === item.id ? 'white' : '#5F7D4A', fontWeight: '900', fontSize: '0.8rem',
              transition: 'all 0.2s', flexShrink: 0
            }}
          >
            <item.icon size={16} /> {item.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        {/* SIDEBAR IZQUIERDA (SOLO ESCRITORIO) */}
        <aside 
          style={{ 
            width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', 
            display: 'flex', flexDirection: 'column', padding: '1.2rem 1.2rem',
            zIndex: 90,
            height: 'calc(100vh - 56px)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="desktop-only"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '950', fontSize: '1.2rem', color: '#2D3A20', letterSpacing: '-0.02em' }}>
                {profile ? `${profile.first_name} ${profile.last_name || ''}` : 'Tomas Vukojicic'}
              </span>
              {merchantData && (
                <span style={{ fontSize: '0.6rem', fontWeight: '950', color: '#5F7D4A', background: '#F0F4ED', padding: '4px 8px', borderRadius: '6px', width: 'fit-content', marginTop: '4px' }}>
                  PRODUCTOR ALIMNET
                </span>
              )}
            </div>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map(item => (
            <button 
              key={item.id}
              onClick={() => { 
                if (item.id === 'sostener') { router.push('/sostener'); return; }
                if (item.id === 'logout') { supabase.auth.signOut().then(() => { router.push('/'); }); return; }
                if (item.id === 'mi-emprendimiento') { router.push('/perfil'); return; }
                handleTabChange(item.id); 
                setShowSidebar(false); 
              }}
              style={{ 
                padding: '0.65rem 1rem', borderRadius: '14px', border: 'none', 
                background: item.special ? '#5F7D4A' : (activeTab === item.id ? '#F0F4ED' : 'transparent'),
                color: item.special ? 'white' : (activeTab === item.id ? '#5F7D4A' : '#666'),
                display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                fontWeight: (activeTab === item.id || item.special) ? '900' : '700', fontSize: '0.85rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', 
                width: '100%', textAlign: 'left',
                marginTop: item.special ? '1.5rem' : '0',
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
      <main className="main-content" style={{ 
        flex: 1, overflowY: 'auto', padding: '3rem 5rem', 
        position: 'relative', width: '100%', minHeight: '100vh'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
          
          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
              
              <div style={{ marginBottom: '1rem' }}>
                 <h1 style={{ fontSize: '2.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0, marginBottom: '4px' }}>¡Hola, {profile?.first_name || 'Tomas'}!</h1>
                 <p style={{ color: '#888', fontWeight: '600' }}>Tu radar de confianza alimentaria.</p>
              </div>

              {/* ALIMNET TIPS - Micro-Educación */}
              <div style={{ 
                background: 'rgba(95, 125, 74, 0.05)', borderRadius: '24px', padding: '1.5rem', 
                border: '1px solid rgba(95, 125, 74, 0.1)', display: 'flex', gap: '1.5rem', 
                alignItems: 'center', position: 'relative', overflow: 'hidden',
                marginBottom: '1rem'
              }}>
                 <div style={{ 
                   background: '#5F7D4A', color: 'white', width: '48px', height: '48px', 
                   borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                   flexShrink: 0
                 }}>
                   <Sparkles size={24} />
                 </div>
                 <div style={{ flex: 1 }}>
                   <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Alimnet Tips</h4>
                   <p style={{ fontSize: '0.95rem', color: '#666', fontWeight: '600', lineHeight: '1.4', margin: 0 }}>
                     {!profile?.locality ? (
                       "¡Tu mapa está esperando! Sumá tu localidad en el perfil para que podamos centrarte automáticamente en tu zona."
                     ) : (
                       "¿Sabías que podés viajar y llevar tu red Alimnet con vos? El mapa siempre te mostrará lo mejor de cada zona estés donde estés."
                     )}
                   </p>
                 </div>
                 <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.1 }}>
                   <Leaf size={80} />
                 </div>
              </div>

              {/* Quick Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '100%' }}>
                <div onClick={() => handleTabChange('validaciones')} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }} className="stat-bar">
                  <div style={{ color: '#5F7D4A' }}><ShieldCheck size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A' }}>{counts.validations}</span>
                    <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase' }}>VALIDACIONES</span>
                  </div>
                </div>
                
                <div onClick={() => handleTabChange('referentes')} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }} className="stat-bar">
                  <div style={{ color: '#8EA87D' }}><Users size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A' }}>{counts.referents}</span>
                    <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase' }}>REFERENTES</span>
                  </div>
                </div>

                <div onClick={() => handleTabChange('favoritos')} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }} className="stat-bar">
                  <div style={{ color: '#5F7D4A' }}><Star size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A' }}>{counts.saved}</span>
                    <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase' }}>GUARDADOS</span>
                  </div>
                </div>

                <div onClick={() => handleTabChange('recientes')} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }} className="stat-bar">
                  <div style={{ color: '#B8C6B1' }}><History size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A' }}>{counts.recent}</span>
                    <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase' }}>RECIENTES</span>
                  </div>
                </div>

                <div onClick={() => handleTabChange('contribuciones')} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '15px' }} className="stat-bar">
                  <div style={{ color: '#5F7D4A' }}><Sparkles size={22} /></div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A' }}>{counts.contributions}</span>
                    <span style={{ color: '#888', fontWeight: '800', fontSize: '0.6rem', textTransform: 'uppercase' }}>APORTES</span>
                  </div>
                </div>
              </div>

              {/* Activity Timeline Placeholder */}
              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', width: '100%', minHeight: '300px' }}>
                 <h3 style={{ fontSize: '1.1rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1.5rem' }}>Actividad Reciente</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', color: '#888' }}>
                   <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>Aquí aparecerán tus últimas validaciones y descubrimientos.</p>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'contribuciones' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', width: '100%' }}>
              <div style={{ gridColumn: '1 / -1', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Mis Contribuciones</h2>
                <p style={{ color: '#888', fontWeight: '600', marginTop: '4px' }}>Proyectos que sumaste a la red Alimnet.</p>
              </div>

              {contributions.length > 0 ? (
                contributions.map(c => (
                  <div 
                    key={c.id}
                    style={{ background: 'white', padding: '2rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ width: '42px', height: '42px', background: '#F0F4ED', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}>
                         <Package size={20} />
                       </div>
                       <span style={{ 
                         fontSize: '0.6rem', fontWeight: '950', padding: '4px 10px', borderRadius: '20px',
                         background: c.status === 'active' ? '#EEF8F1' : '#FFF9E6',
                         color: c.status === 'active' ? '#27AE60' : '#F2994A',
                         textTransform: 'uppercase'
                       }}>
                         {c.status === 'active' ? 'Publicado' : 'Revision'}
                       </span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>{c.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: '#888', fontWeight: '600', marginTop: '4px' }}>{c.instagram_url ? `@${c.instagram_url}` : 'Sin red social'}</p>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#666', fontWeight: '600', lineHeight: '1.4' }}>
                      {c.bio_short || "Sin descripción proporcionada."}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px dashed #E4EBDD' }}>
                  <Sparkles size={48} color="#E4EBDD" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontWeight: '950', color: '#5F7D4A', fontSize: '1.3rem' }}>¿Viste algo nuevo por tu zona?</h3>
                  <p style={{ color: '#888', marginTop: '1rem', maxWidth: '400px', margin: '1rem auto 2.5rem', fontWeight: '600', lineHeight: '1.6' }}>
                    Sumá ese comercio o productor que conocés para que toda la comunidad pueda disfrutarlo.
                  </p>
                  <button 
                    onClick={() => router.push('/sumate')} 
                    style={{ padding: '1rem 2.5rem', borderRadius: '18px', border: 'none', background: '#2D3A20', color: 'white', fontWeight: '950', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    Sumar un Comercio
                  </button>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'validaciones' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Mis Validaciones</h2>
                <p style={{ color: '#888', fontWeight: '600', marginTop: '4px' }}>Los proyectos que apoyaste con tu validación social.</p>
              </div>
              
              {validatedMerchants.length > 0 ? (
                validatedMerchants.map(m => (
                  <div 
                    key={m.id}
                    onClick={() => router.push(`/explorar?id=${m.id}`)}
                    style={{ background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', cursor: 'pointer' }}
                    className="card-hover"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}>
                        <ShieldCheck size={24} />
                      </div>
                      <div style={{ padding: '4px 10px', background: '#2D3A20', color: 'white', borderRadius: '8px', fontSize: '0.6rem', fontWeight: '900' }}>{m.type?.split(',')[0]}</div>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '4px' }}>{m.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '0.8rem', fontWeight: '700' }}>
                      <MapPin size={14} /> {m.locations?.[0]?.locality || 'Zona Norte'}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px dashed #E4EBDD' }}>
                  <Heart size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontWeight: '950', color: '#5F7D4A' }}>Aún no has validado ningún proyecto</h3>
                  <p style={{ color: '#888', marginTop: '1rem' }}>Explorá el mapa y validá a tus productores de confianza.</p>
                  <button onClick={() => router.push('/explorar')} style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '16px', border: 'none', background: '#2D3A20', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Ir al Mapa</button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'referentes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Mis Referentes</h2>
                <p style={{ color: '#888', fontWeight: '600', marginTop: '4px' }}>Los guías en los que confiás para descubrir comida real.</p>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '22px', background: '#F4F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', border: '2px solid #E4EBDD' }}>
                    <User size={32} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Tomas Vukojicic</h3>
                    <p style={{ color: '#5F7D4A', fontWeight: '800', fontSize: '0.7rem' }}>MIEMBRO FUNDADOR</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{ flex: 1, padding: '0.6rem', borderRadius: '12px', background: '#F0F4ED', color: '#5F7D4A', fontWeight: '800', border: 'none' }}>Ver Perfil</button>
                  <button style={{ flex: 1, padding: '0.6rem', borderRadius: '12px', border: '1px solid #E4EBDD', background: 'white', color: '#666', fontWeight: '800' }}>Remover</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'favoritos' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Mis Guardados</h2>
              </div>
              <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', border: '1px dashed #E4EBDD', borderRadius: '32px' }}>
                  <Star size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
                  <h3 style={{ fontWeight: '950', color: '#5F7D4A' }}>¿Todavía no encontraste tu próximo destino?</h3>
                  <button onClick={() => router.push('/explorar')} style={{ marginTop: '2rem', padding: '0.8rem 2rem', borderRadius: '16px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '800' }}>Ir al Mapa</button>
              </div>
            </div>
          )}

          {activeTab === 'recientes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Vistos Recientemente</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Sana Sana', 'Mercado Saludable', 'Cooperativa del Campo'].map((loc, idx) => (
                  <div key={idx} style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Clock size={20} color="#888" />
                      <h4 style={{ margin: 0, fontWeight: '900' }}>{loc}</h4>
                    </div>
                    <ChevronRight size={20} color="#E4EBDD" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mi-emprendimiento' && merchantData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>Gestión de Mi Proyecto</h2>
                <p style={{ color: '#888', fontWeight: '600', marginTop: '4px' }}>Actualizá la información de tu emprendimiento para la comunidad.</p>
              </div>

              <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '22px', background: 'rgba(95, 125, 74, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A' }}>
                      <Package size={32} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '950', color: '#5F7D4A', margin: 0 }}>{merchantData.name}</h3>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: '850', background: '#2D3A20', color: 'white', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>{merchantData.type?.split(',')[0]}</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: '850', background: '#F0F4ED', color: '#5F7D4A', padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>{merchantData.status}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '950', color: '#5F7D4A' }}>{merchantData.validation_count}</div>
                    <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#888', textTransform: 'uppercase' }}>Validaciones Reales</div>
                  </div>
                </div>

                <hr style={{ border: 'none', height: '1px', background: '#E4EBDD', margin: '1rem 0' }} />

                {/* FORMULARIO SIMPLE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Nombre del Proyecto</label>
                      <input 
                        type="text" 
                        value={merchantFormData.name}
                        onChange={(e) => setMerchantFormData({...merchantFormData, name: e.target.value})}
                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Instagram (sin @)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888', fontWeight: '600' }}>@</span>
                        <input 
                          type="text" 
                          value={merchantFormData.instagram_url}
                          onChange={(e) => setMerchantFormData({...merchantFormData, instagram_url: e.target.value})}
                          style={{ width: '100%', padding: '1rem 1rem 1rem 2rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Descripción Corta (Max 80 caracteres)</label>
                    <input 
                      type="text" 
                      value={merchantFormData.bio_short}
                      onChange={(e) => setMerchantFormData({...merchantFormData, bio_short: e.target.value})}
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Historia Completa</label>
                    <textarea 
                      rows={4}
                      value={merchantFormData.bio_long}
                      onChange={(e) => setMerchantFormData({...merchantFormData, bio_long: e.target.value})}
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600', resize: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>WhatsApp (Formato: 1122334455)</label>
                      <input 
                        type="text" 
                        value={merchantFormData.whatsapp}
                        onChange={(e) => setMerchantFormData({...merchantFormData, whatsapp: e.target.value})}
                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Punto de contacto preferido</label>
                      <select 
                        value={merchantFormData.preferred_contact_channel}
                        onChange={(e) => setMerchantFormData({...merchantFormData, preferred_contact_channel: e.target.value})}
                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                      >
                        <option value="whatsapp">WhatsApp</option>
                        <option value="instagram">Instagram</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>

                  {/* ADN Y CATEGORIAS DEL COMERCIO */}
                  <div style={{ padding: '1.5rem', background: '#F0F4ED', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: '1000', color: '#2D3A20', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={18} /> Identidad y ADN del Proyecto
                    </h4>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '0.7rem', color: '#5F7D4A', fontWeight: '900', marginBottom: '1rem', textTransform: 'uppercase' }}>Categorías de Productos (Aparecerás bajo estas en el mapa)</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {OFFICIAL_CATEGORIES.map(cat => (
                          <button 
                            key={cat}
                            onClick={() => {
                              const current = merchantFormData.tags || [];
                              const next = current.includes(cat) ? current.filter((t: string) => t !== cat) : [...current, cat];
                              setMerchantFormData({...merchantFormData, tags: next});
                            }}
                            style={{ 
                              padding: '0.6rem 1rem', borderRadius: '12px', border: '1.5px solid',
                              borderColor: (merchantFormData.tags || []).includes(cat) ? '#5F7D4A' : '#D1DBC7',
                              background: (merchantFormData.tags || []).includes(cat) ? '#5F7D4A' : 'white',
                              color: (merchantFormData.tags || []).includes(cat) ? 'white' : '#5F7D4A',
                              fontWeight: '900', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '0.7rem', color: '#2D3A20', fontWeight: '950', marginBottom: '1rem', textTransform: 'uppercase' }}>Propuesta de Valor y ADN Alimentario</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {[...PRODUCTION_ADN_OPTIONS, ...DIETARY_OPTIONS].map(adn => (
                          <button 
                            key={adn}
                            onClick={() => {
                              const current = merchantFormData.tags || [];
                              const next = current.includes(adn) ? current.filter((t: string) => t !== adn) : [...current, adn];
                              setMerchantFormData({...merchantFormData, tags: next});
                            }}
                            style={{ 
                              padding: '0.6rem 1.1rem', borderRadius: '14px', border: '1.5px solid',
                              borderColor: (merchantFormData.tags || []).includes(adn) ? '#2D3A20' : '#D1DBC7',
                              background: (merchantFormData.tags || []).includes(adn) ? '#2D3A20' : 'white',
                              color: (merchantFormData.tags || []).includes(adn) ? 'white' : '#777',
                              fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            {adn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CATALOGO TOP 3 DESTACADOS */}
                  <div style={{ padding: '2rem', background: 'white', borderRadius: '32px', border: '1px solid #E4EBDD' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Package size={18} /> Mis 3 Productos Estrella (Catálogo)
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem' }}>
                      {[0, 1, 2].map(idx => {
                        const product = merchantProducts[idx];
                        return (
                          <div key={idx} style={{ 
                            padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', border: '1px dashed #D1DBC7',
                            display: 'flex', flexDirection: 'column', gap: '12px'
                          }}>
                            <div style={{ 
                              width: '100%', height: '100px', borderRadius: '16px', 
                              background: product?.image_url ? `url(${product.image_url}) center/cover` : '#E4EBDD', 
                              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)'
                            }}>
                              {!product?.image_url && <Plus size={24} color="#AAA" />}
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <input 
                                type="text" 
                                placeholder="Nombre del producto"
                                value={product?.name || ''}
                                onChange={(e) => {
                                  const newProducts = [...merchantProducts];
                                  if (!newProducts[idx]) newProducts[idx] = { name: '', merchant_id: merchantData.id };
                                  newProducts[idx].name = e.target.value;
                                  setMerchantProducts(newProducts);
                                }}
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #E4EBDD', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '800', outline: 'none' }}
                              />
                              <input 
                                type="text" 
                                placeholder="URL Imagen (Max 1MB)"
                                value={product?.image_url || ''}
                                onChange={(e) => {
                                  const newProducts = [...merchantProducts];
                                  if (!newProducts[idx]) newProducts[idx] = { name: '', merchant_id: merchantData.id };
                                  newProducts[idx].image_url = e.target.value;
                                  setMerchantProducts(newProducts);
                                }}
                                style={{ width: '100%', padding: '0.8rem', border: '1px solid #E4EBDD', borderRadius: '12px', fontSize: '0.7rem', color: '#888', outline: 'none' }}
                              />
                            </div>

                             <button 
                               onClick={async () => {
                                 const prod = merchantProducts[idx];
                                 if (!prod?.name) return;
                                 setSaving(true);
                                 try {
                                   if (prod.id) {
                                      await supabase.from('merchant_products').update({ name: prod.name, image_url: prod.image_url }).eq('id', prod.id);
                                   } else {
                                      const { data } = await supabase.from('merchant_products').insert([{ ...prod, merchant_id: merchantData.id }]).select();
                                      if (data) {
                                        const next = [...merchantProducts];
                                        next[idx] = data[0];
                                        setMerchantProducts(next);
                                      }
                                   }
                                   setMessage({ type: 'success', text: '¡Producto guardado! ✨' });
                                   setTimeout(() => setMessage(null), 2000);
                                 } catch (err) { console.error(err); } finally { setSaving(false); }
                               }}
                               style={{ marginTop: '5px', width: '100%', padding: '0.8rem', borderRadius: '12px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}
                             >
                               GUARDAR PRODUCTO
                             </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* GALERÍA LIVIANA Y WEB */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>URL Logo (Liviano, Max 1MB)</label>
                      <input 
                        type="text" 
                        placeholder="Pega el link de tu logo"
                        value={merchantFormData.logo_url || ''}
                        onChange={(e) => setMerchantFormData({...merchantFormData, logo_url: e.target.value})}
                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                      />
                    </div>
                    <div>
                       <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Web / Linktree</label>
                       <div style={{ position: 'relative' }}>
                         <ExternalLink size={18} style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
                         <input 
                           type="text" 
                           placeholder="https://tuweb.com"
                           value={merchantFormData.website_url || ''}
                           onChange={(e) => setMerchantFormData({...merchantFormData, website_url: e.target.value})}
                           style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '600' }}
                         />
                       </div>
                    </div>
                  </div>

                  {message && (
                    <div style={{ 
                      padding: '1rem', borderRadius: '12px', 
                      background: message.type === 'success' ? 'rgba(95, 125, 74, 0.1)' : 'rgba(255, 0, 0, 0.05)',
                      color: message.type === 'success' ? '#5F7D4A' : '#D32F2F',
                      fontWeight: '700', fontSize: '0.9rem', textAlign: 'center'
                    }}>
                      {message.text}
                    </div>
                  )}

                  <button 
                    onClick={handleSaveMerchant}
                    disabled={saving}
                    style={{ 
                      marginTop: '1rem', padding: '1.2rem', borderRadius: '20px', border: 'none', 
                      background: saving ? '#888' : '#2D3A20', color: 'white', fontWeight: '900', fontSize: '1rem',
                      cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 10px 25px rgba(45, 58, 32, 0.15)', transition: 'all 0.3s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
                    }}
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : null}
                    {saving ? 'GUARDANDO CAMBIOS...' : 'ACTUALIZAR PERFIL COMERCIAL'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {/* BLOQUE 1: IDENTIDAD Y ACCESO */}
              <div>
                <div style={{ marginBottom: '1rem' }}>
                   <h2 style={{ fontSize: '1.4rem', fontWeight: '1000', color: '#5F7D4A', margin: 0 }}>Identidad y Acceso</h2>
                   <p style={{ color: '#888', fontWeight: '600', fontSize: '0.8rem' }}>Tus datos oficiales en la red Alimnet.</p>
                </div>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 900 ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Nombre Completo Oficial</label>
                        <input 
                          type="text" 
                          value={formData.first_name}
                          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                          placeholder="Tomas Vukojicic"
                          style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '750', fontSize: '0.9rem', color: '#2D3A20' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Correo Electrónico (Solo Acceso)</label>
                        <input 
                          type="text" 
                          value={profile?.email || 'petición pendiente...'}
                          readOnly
                          style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: 'none', background: '#F0F4ED', outline: 'none', fontWeight: '750', fontSize: '0.9rem', color: '#888', cursor: 'not-allowed' }}
                        />
                      </div>
                   </div>

                   <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Nombre de Perfil Público</label>
                      <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '1rem', fontWeight: '600' }}>¿Cómo quieres que te vean en validaciones y en el mapa?</p>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {[
                          { id: 'full' as const, label: formData.first_name || 'Nombre Completo' },
                          { id: 'initial' as const, label: (formData.first_name?.split(' ')?.[0] || 'Nombre') + ' ' + (formData.first_name?.split(' ')?.[1]?.[0] || 'A') + '.' }
                        ].map(style => (
                          <button 
                            key={style.id}
                            onClick={() => setFormData({...formData, display_name_style: style.id})}
                            style={{ 
                              padding: '1rem 1.5rem', borderRadius: '18px', border: '1.5px solid',
                              borderColor: formData.display_name_style === style.id ? '#5F7D4A' : '#E4EBDD',
                              background: formData.display_name_style === style.id ? '#F0F4ED' : 'white',
                              color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', flex: 1
                            }}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Ubicación Actual (Radar)</label>
                     <div style={{ position: 'relative' }}>
                       <MapPin size={18} style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#AAA' }} />
                       <input 
                         type="text" 
                         value={formData.locality}
                         onChange={(e) => setFormData({...formData, locality: e.target.value})}
                         placeholder="Ej: San Isidro, Buenos Aires"
                         style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '750', fontSize: '0.9rem', color: '#2D3A20' }}
                       />
                     </div>
                   </div>
                </div>
              </div>

              {/* BLOQUE 2: ADN ALIMENTARIO Y PREFERENCIAS */}
              <div>
                <div style={{ marginBottom: '1rem' }}>
                   <h2 style={{ fontSize: '1.4rem', fontWeight: '1000', color: '#5F7D4A', margin: 0 }}>ADN Alimentario y Preferencias</h2>
                   <p style={{ color: '#888', fontWeight: '600', fontSize: '0.8rem' }}>Tu radar de búsqueda sincronizado con la red.</p>
                </div>

                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                   
                   <div>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Sparkles size={16} /> ADN Alimentario y Preferencias
                  </h4>
                  
                  {/* CATEGORÍAS MADRE */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.03em' }}>¿Qué productos buscás encontrar?</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       {OFFICIAL_CATEGORIES.map(cat => (
                         <button 
                           key={cat}
                           onClick={() => {
                             const current = formData.production_interest;
                             const next = current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat];
                             setFormData({...formData, production_interest: next});
                           }}
                           style={{ 
                             padding: '0.6rem 1.1rem', borderRadius: '14px', border: '1.5px solid',
                             borderColor: formData.production_interest.includes(cat) ? '#5F7D4A' : '#E4EBDD',
                             background: formData.production_interest.includes(cat) ? 'rgba(95, 125, 74, 0.05)' : 'white',
                             color: formData.production_interest.includes(cat) ? '#5F7D4A' : '#888',
                             fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'
                           }}
                         >
                           {cat}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* CALIDAD Y ADN */}
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.03em' }}>Calidad, ADN y Estilo de Vida</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       {PRODUCTION_ADN_OPTIONS.map(adn => (
                         <button 
                           key={adn}
                           onClick={() => {
                             const current = formData.production_interest;
                             const next = current.includes(adn) ? current.filter(c => c !== adn) : [...current, adn];
                             setFormData({...formData, production_interest: next});
                           }}
                           style={{ 
                             padding: '0.6rem 1.1rem', borderRadius: '14px', border: '1.5px solid',
                             borderColor: formData.production_interest.includes(adn) ? '#2D3A20' : '#E4EBDD',
                             background: formData.production_interest.includes(adn) ? 'rgba(45, 58, 32, 0.05)' : 'white',
                             color: formData.production_interest.includes(adn) ? '#2D3A20' : '#AAA',
                             fontWeight: '950', fontSize: '0.7rem', cursor: 'pointer', transition: 'all 0.2s'
                           }}
                         >
                           {adn}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>

                   {/* LOGISTICA MADRE */}
                   <div>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: '950', color: '#5F7D4A', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Truck size={16} /> Logística y Retiro
                      </h4>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {DELIVERY_PREFERENCES.map(pref => (
                          <button 
                            key={pref}
                            onClick={() => setFormData({...formData, delivery_pref: pref})}
                            style={{ 
                              flex: 1, padding: '1rem', borderRadius: '18px', border: '1.5px solid',
                              borderColor: formData.delivery_pref === pref ? '#2D3A20' : '#E4EBDD',
                              background: formData.delivery_pref === pref ? '#F0F4ED' : 'white',
                              color: '#2D3A20', fontWeight: '1000', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            {pref}
                          </button>
                        ))}
                      </div>
                   </div>

                   {/* BOTON DE ACCION UNIFICADO */}
                   <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                      <button 
                        onClick={async () => {
                          setSaving(true);
                          try {
                            const { data: { user } } = await supabase.auth.getUser();
                            if (!user) return;
                            const { error } = await supabase.from('profiles').update({
                              first_name: formData.first_name,
                              locality: formData.locality,
                              delivery_pref: formData.delivery_pref,
                              production_interest: formData.production_interest,
                              display_name_style: formData.display_name_style,
                              updated_at: new Date().toISOString()
                            }).eq('id', user.id);
                            if (error) throw error;
                            setMessage({ type: 'success', text: '¡Cambios guardados correctamente! ✨' });
                            setTimeout(() => setMessage(null), 3000);
                          } catch (err) { console.error(err); } finally { setSaving(false); }
                        }}
                        disabled={saving}
                        style={{ 
                          padding: '1.2rem 3.5rem', background: '#2D3A20', color: 'white', 
                          border: 'none', borderRadius: '24px', fontWeight: '1000', fontSize: '1rem',
                          cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 12px 35px rgba(0,0,0,0.12)',
                          display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.3s'
                        }}
                      >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : null}
                        {saving ? 'GUARDANDO...' : 'GUARDAR TODO'}
                      </button>
                   </div>

                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div style={{ background: 'white', padding: '4rem', borderRadius: '32px', border: '1px solid #E4EBDD', textAlign: 'center' }}>
              <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Próximamente: CONFIGURACIÓN</h3>
              <p style={{ color: '#888', marginTop: '1rem' }}>Estamos puliendo esta sección.</p>
            </div>
          )}

        </div>
      </main>

      <style jsx>{`
        .main-content::-webkit-scrollbar { display: none; }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05);
          border-color: #5F7D4A;
        }
        .stat-bar { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
        .stat-bar:hover {
          transform: translateY(-5px);
          border-color: #5F7D4A;
          box-shadow: 0 10px 20px rgba(0,0,0,0.03);
        }
         @media (max-width: 900px) {
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
          .main-content { padding: 2rem 1rem !important; }
          h1 { font-size: 1.8rem !important; }
        }
        @media (min-width: 901px) {
          .main-content { margin-left: 0; }
          .desktop-only { display: flex !important; }
        }
      `}</style>
      </div>
    </div>
  );
}
