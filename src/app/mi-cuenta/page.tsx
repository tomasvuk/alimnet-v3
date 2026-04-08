'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search,
  Map as MapIcon, Loader2, AlertCircle, MessageSquare, 
  ExternalLink, ShieldCheck, LayoutDashboard, History,
  Activity, Users, Share2, Eye, Sparkles, ArrowLeft,
  Navigation, Wheat, Cake, Beef
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import AlimnetLoader from '@/components/AlimnetLoader';
import { removeAuthCookie } from '@/lib/auth-utils';
import { 
  OFFICIAL_CATEGORIES, 
  PRODUCTION_ADN_OPTIONS, 
  DIETARY_OPTIONS,
  DELIVERY_PREFERENCES 
} from '@/lib/constants';
import ImageCropper from '@/components/ImageCropper';


// Constants moved to @/lib/constants

// --- COMPONENTE PRINCIPAL CON SUSPENSE (REQUERIDO POR NEXT.JS) ---
export default function MiCuentaPage() {
  return (
    <Suspense fallback={<AlimnetLoader fullScreen />}>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', fontSize: '10px', fontWeight: '1000', color: '#AAA', zIndex: 10000, pointerEvents: 'none' }}>
          v4.1.7-ESFERA-SOLA ✨
        </div>
        <MiCuentaContent />
      </div>
    </Suspense>
  );
}

function MiCuentaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 800);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [validationCount, setValidationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [formData, setFormData] = useState({
    avatar_url: '/avatars/default-alimnet.png',
    first_name: '',
    last_name: '',
    locality: '',
    delivery_pref: 'Retiro y Entrega',
    production_interest: [] as string[],
    display_name_style: 'full' as 'full' | 'initial',
    user_number: '',
    preferences: [] as string[]
  });
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ALIMNET_AVATARS = [
    // 3 MUJERES
    { id: '9', path: '/avatars/v2-front-campesina.png' },
    { id: '10', path: '/avatars/v2-front-floricultora.png' },
    { id: '11', path: '/avatars/v2-front-hortelana.png' },
    // 3 VARONES
    { id: '1', path: '/avatars/v2-front-agronomo.png' },
    { id: '2', path: '/avatars/v2-front-apicultor.png' },
    { id: '3', path: '/avatars/v2-front-jinete.png' },
    // 3 MUJERES
    { id: '13', path: '/avatars/v2-front-quesera.png' },
    { id: '14', path: '/avatars/v2-front-recolectora.png' },
    { id: '15', path: '/avatars/v2-front-tejedora.png' },
    // 3 VARONES
    { id: '4', path: '/avatars/v2-front-pastor.png' },
    { id: '5', path: '/avatars/v2-front-puestero.png' },
    { id: '6', path: '/avatars/v2-front-vinatero.png' },
    // MIXTO / COMPLEMENTARIO
    { id: '12', path: '/avatars/v2-front-polista.png' },
    { id: '7', path: '/avatars/v2-front-alambrador.png' },
    { id: '8', path: '/avatars/v2-front-transportista.png' }
  ];
  const [merchantProducts, setMerchantProducts] = useState<any[]>([]); // NUEVO: Estado de Productos
  const [merchantFormData, setMerchantFormData] = useState<any>({
    avatar_url: '/avatars/default-alimnet.png',
    first_name: '',
    last_name: '',
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
  const [croppingImage, setCroppingImage] = useState<{ url: string, type: 'avatar' | 'merchant_logo', aspect: number } | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const merchantLogoInputRef = useRef<HTMLInputElement>(null);

  const [counts, setCounts] = useState({
    validations: 0,
    referents: 1, // Carlos de base
    saved: 1, // Raíz Vivo de base
    recent: 3,
    contributions: 0
  });
  const [contributions, setContributions] = useState<any[]>([]);

  useEffect(() => {
    // --- DETECTOR DE GOOGLE (RADAR DE CUENTA) ---
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[AUTH EVENT CUENTA]:", _event, !!session);
      if (session) {
        fetchData();
      }
    });

    fetchData();

    return () => {
      subscription.unsubscribe();
    };
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

  // CSS dinámico para reacciones visuales
  useEffect(() => {
    const styleId = 'alimnet-dynamic-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .hover-scale { transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; }
        .hover-scale:hover { transform: scale(1.05); filter: brightness(1.1); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .hover-scale:active { transform: scale(0.95); }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/mi-cuenta?tab=${tabId}`, { scroll: false });
  };

  const fetchData = async (retryCount = 0) => {
    try {
      // 1. Intentamos obtener el usuario de forma estándar
      let { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser();
      let user = supabaseUser;
      
      // 2. [BRUTE FORCE PARA MÓVILES] Si falla, buscamos en la cookie
      if (!user) {
        console.log("Buscando sesión en la cookie (Copia de seguridad)...");
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('sb-keagrrvtzmsukcmzxqrl-auth-token='));
        
        if (authCookie) {
          try {
            const cookieValue = decodeURIComponent(authCookie.split('=')[1]);
            const sessionData = JSON.parse(cookieValue);
            if (sessionData?.access_token && sessionData?.refresh_token) {
              console.log("Sesión encontrada en cookie. Restaurando en el motor...");
              const { data: { session } } = await supabase.auth.setSession({
                access_token: sessionData.access_token,
                refresh_token: sessionData.refresh_token
              });
              if (session) user = session.user;
            }
          } catch (e) {
            console.error("Error al restaurar sesión desde cookie:", e);
          }
        }
      }

      if (!user) {
        console.log(`Intento ${retryCount + 1}: No hay usuario detectado.`);
        if (retryCount < 2) {
          setTimeout(() => fetchData(retryCount + 1), 800);
          return;
        }
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);
      const currentUser = user;

      const { data } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          locality: data.locality || '',
          delivery_pref: data.delivery_pref || 'Retiro y Entrega',
          production_interest: data.production_interest || [],
          display_name_style: data.display_name_style || 'full',
          avatar_url: data.avatar_url || '',
          user_number: data.user_number || '',
          preferences: data.preferences || []
        });
      }

      const { count } = await supabase.from('validations').select('*', { count: 'exact', head: true }).eq('user_id', currentUser.id);
      setCounts(prev => ({ ...prev, validations: count || 0 }));

      // Traer los locales validados reales
      const { data: vData } = await supabase
        .from('validations')
        .select(`
          merchant_id,
          merchants (
            id, name, logo_url, bio_short, locality, average_rating
          )
        `)
        .eq('user_id', currentUser.id)
        .limit(3);
      
      if (vData) {
        setValidatedMerchants(vData.map((v: any) => v.merchants).filter(Boolean));
      }

      // --- 3. DETECTAR SI ES PRODUCTOR ---
      const { data: mData } = await supabase
        .from('merchants')
        .select('*')
        .eq('owner_id', currentUser.id)
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
          website_url: mData.website_url || '',
          display_name_style: mData.display_name_style || 'full'
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
          .eq('created_by', currentUser.id)
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
    { id: 'estilo', label: 'Mi Estilo Alimenticio', icon: Sparkles },
    { id: 'contribuciones', label: 'Mis Contribuciones', icon: Share2 },
    { id: 'validaciones', label: 'Validaciones', icon: ShieldCheck },
    { id: 'referentes', label: 'Referentes', icon: Users },
    { id: 'favoritos', label: 'Guardados', icon: Star },
    { id: 'recientes', label: 'Recientes', icon: History },
    { id: 'sostener', label: 'Sostener Alimnet', icon: Heart, special: true },
    { id: 'logout', label: 'Cerrar Sesión', icon: LogOut },
  ];

  if (loading) return <AlimnetLoader fullScreen />;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F8F9F5', overflow: 'hidden', paddingTop: '56px' }}>
      
      <Header />

      {/* SUB-MENU HORIZONTAL (SOLO MÓVIL) */}
      {isMobile && (
        <div style={{ 
          background: '#F8F9F5', padding: '0.6rem 1.5rem', 
          overflowX: 'auto', whiteSpace: 'nowrap', gap: '10px', display: 'flex',
          alignItems: 'center', scrollbarWidth: 'none', msOverflowStyle: 'none',
          borderBottom: '1px solid rgba(0,0,0,0.03)'
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
                borderRadius: '24px', border: '1.5px solid', 
                borderColor: activeTab === item.id ? '#5F7D4A' : 'transparent',
                background: activeTab === item.id ? '#5F7D4A' : 'white',
                color: activeTab === item.id ? 'white' : '#666', 
                fontWeight: '1000', fontSize: '0.78rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', flexShrink: 0,
                boxShadow: activeTab === item.id ? '0 10px 20px rgba(95, 125, 74, 0.15)' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <item.icon size={15} /> {item.label.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        {/* SIDEBAR IZQUIERDA (SOLO ESCRITORIO) */}
        {!isMobile && (
          <aside 
          style={{ 
            display: isMobile ? 'none' : 'flex',
            width: '280px', background: 'white', borderRight: '1px solid #E4EBDD', 
            flexDirection: 'column', padding: '1.2rem 1.2rem',
            zIndex: 90,
            height: 'calc(100vh - 56px)',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="desktop-only"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '950', fontSize: '1.2rem', color: '#2D3A20', letterSpacing: '-0.02em' }}>
                {profile ? `${profile.first_name} ${profile.last_name || ''}` : (user ? 'Usuario Registrado' : 'Invitado Alimnet')}
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
                if (item.id === 'logout') { 
                  supabase.auth.signOut().then(() => { 
                    removeAuthCookie();
                    router.push('/'); 
                  }); 
                  return; 
                }
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
        )}

      {/* CONTENIDO CENTRAL */}
      <main className="main-content" style={{ 
        flex: 1, 
        overflowY: 'auto', 
        overflowX: 'hidden',
        padding: isMobile ? '1.5rem 1.5rem' : '3rem 5rem', 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh',
        background: '#F8F9F5'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
          
          {message && (
            <div style={{ 
              position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 10000, padding: '1rem 2rem', borderRadius: '16px', 
              background: message.type === 'success' ? '#EEF8F1' : '#FFF2F2',
              border: `1px solid ${message.type === 'success' ? '#27AE60' : '#D32F2F'}`,
              color: message.type === 'success' ? '#27AE60' : '#D32F2F',
              fontWeight: '1000', fontSize: '0.9rem', textAlign: 'center',
              boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
              display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              {message.type === 'success' ? '✨ ' : '⚠️ '}
              {message.text}
            </div>
          )}
          {!user && !loading && (
            <div style={{ 
              marginBottom: '2rem', padding: '1.5rem 2rem', background: 'white', borderRadius: '24px', 
              border: '1px solid #E4EBDD', display: 'flex', alignItems: 'center', gap: '1.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)', borderLeft: '6px solid #F2994A',
              animation: 'slideDown 0.5s ease-out', flexWrap: 'wrap'
            }}>
              <div style={{ width: '45px', height: '45px', background: '#FFF4E5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F2994A', flexShrink: 0 }}>
                <AlertCircle size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '950', color: '#2D3A20' }}>Sesión no detectada</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#666', fontWeight: '600' }}>Iniciá sesión para ver tu actividad y gestionar tu perfil.</p>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => router.push('/login')}
                  className="hover-scale"
                  style={{ background: '#5F7D4A', color: 'white', padding: '0.8rem 1.2rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '900', border: 'none', cursor: 'pointer' }}
                >
                  LOGUEARME
                </button>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
              
              <div style={{ marginBottom: '1rem', marginTop: isMobile ? '0' : '1rem' }}>
                  <h1 style={{ 
                    fontSize: isMobile ? '2rem' : '3.2rem', 
                    fontWeight: '1000', 
                    letterSpacing: isMobile ? '-1px' : '-2.5px', 
                    color: '#2D3A20', 
                    lineHeight: 1.1,
                    margin: 0
                  }}>
                    ¡Hola, {profile?.first_name || 'Alimneter'}! 👋
                  </h1>
                  <div style={{ width: '40px', height: '4px', background: '#5F7D4A', borderRadius: '10px', marginTop: '12px' }}></div>
                  <p style={{ color: '#888', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '0.02em', marginTop: '15px' }}>Tu radar de confianza alimentaria.</p>
              </div>

               {/* ALIMNET TIPS - Fineza Layer */}
               <div style={{ 
                 background: 'white', borderRadius: '28px', padding: '1.5rem', 
                 border: '1px solid rgba(0,0,0,0.03)', display: 'flex', gap: '1.5rem', 
                 alignItems: 'center', position: 'relative', overflow: 'hidden',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
               }}>
                  <div style={{ 
                    background: '#F0F4ED', color: '#5F7D4A', width: '48px', height: '48px', 
                    borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Sparkles size={22} />
                  </div>
                  <div style={{ flex: 1, zIndex: 1 }}>
                    <h4 style={{ fontSize: '0.65rem', fontWeight: '1000', color: '#5F7D4A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Alimnet Tips</h4>
                    <p style={{ fontSize: '0.9rem', color: '#444', fontWeight: '700', lineHeight: '1.5', margin: 0 }}>
                      {!profile?.locality ? (
                        "Tu mapa está esperando. Sumá tu localidad para centrar tu zona automáticamente."
                      ) : (
                        "¿Viajás? Alimnet viaja con vos. El mapa siempre te mostrará lo mejor de cada zona."
                      )}
                    </p>
                  </div>
                  <div style={{ position: 'absolute', right: '-15px', top: '-15px', opacity: 0.03, color: '#5F7D4A' }}>
                    <Leaf size={100} />
                  </div>
               </div>

              {/* Quick Stats Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(140px, 1fr))', 
                gap: isMobile ? '0.8rem' : '1.5rem' 
              }}>
                {[
                  { id: 1, label: 'Contribución', val: counts.contributions, icon: Package, color: '#F0F4ED' },
                  { id: 2, label: 'Validación', val: counts.validations, icon: ShieldCheck, color: '#F4F1E6' },
                  { id: 3, label: 'Favorito', val: counts.saved, icon: Star, color: '#FFF5F5' },
                  { id: 4, label: 'Referente', val: counts.referents, icon: Users, color: '#F0F7FF' }
                ].map(stat => (
                  <div key={stat.id} style={{ 
                    background: 'white', 
                    padding: isMobile ? '1.2rem' : '1.8rem', 
                    borderRadius: '28px', 
                    border: '1px solid #F0F4ED',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.8rem',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      background: stat.color, 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#2D3A20' 
                    }}>
                      <stat.icon size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                      <div style={{ fontSize: isMobile ? '1.4rem' : '1.8rem', fontWeight: '1000', color: '#2D3A20', lineHeight: 1 }}>{stat.val}</div>
                      <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#AAA', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{stat.label}</div>
                    </div>
                  </div>
                )) }
              </div>

               {/* Activity Timeline Placeholder */}
               <div style={{ 
                 background: 'white', padding: isMobile ? '2rem 1.5rem' : '2.5rem', 
                 borderRadius: '32px', border: '1px solid rgba(0,0,0,0.03)', width: '100%', 
                 minHeight: '250px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                 display: 'flex', flexDirection: 'column'
               }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '1000', color: '#2D3A20', margin: 0 }}>ACTIVIDAD RECIENTE</h3>
                    <div style={{ height: '1px', flex: 1, background: 'rgba(0,0,0,0.03)', margin: '0 1.5rem' }}></div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                    <div style={{ width: '50px', height: '50px', background: '#F8F9F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                      <History size={20} />
                    </div>
                    <p style={{ fontWeight: '800', fontSize: '0.8rem', textAlign: 'center', maxWidth: '200px', lineHeight: '1.5' }}>
                      Tus últimos descubrimientos aparecerán aquí.
                    </p>
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
                            padding: '1.2rem', background: '#F8F9F5', borderRadius: '24px', border: '1px dashed #D1DBC7',
                            display: 'flex', flexDirection: 'column', gap: '10px'
                          }}>
                            <div style={{ 
                               width: '100%', height: '80px', borderRadius: '16px', 
                               background: product?.image_url ? `url(${product.image_url}) center/cover` : '#E4EBDD', 
                               display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                               boxShadow: 'inset 0 0 40px rgba(0,0,0,0.05)', position: 'relative'
                            }}>
                               {!product?.image_url && <Plus size={20} color="#AAA" />}
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                               <input 
                                 type="text" 
                                 placeholder="Nombre (ej: Miel de Campo)"
                                 value={product?.name || ''}
                                 onChange={(e) => {
                                   const newProducts = [...merchantProducts];
                                   if (!newProducts[idx]) newProducts[idx] = { name: '', merchant_id: merchantData.id };
                                   newProducts[idx].name = e.target.value;
                                   setMerchantProducts(newProducts);
                                 }}
                                 style={{ width: '100%', padding: '0.7rem', border: '1px solid #E4EBDD', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', outline: 'none' }}
                               />
                               <input 
                                 type="text" 
                                 placeholder="URL de la imagen (JPG/PNG)"
                                 value={product?.image_url || ''}
                                 onChange={(e) => {
                                   const newProducts = [...merchantProducts];
                                   if (!newProducts[idx]) newProducts[idx] = { name: '', merchant_id: merchantData.id };
                                   newProducts[idx].image_url = e.target.value;
                                   setMerchantProducts(newProducts);
                                 }}
                                 style={{ width: '100%', padding: '0.7rem', border: '1px solid #E4EBDD', borderRadius: '10px', fontSize: '0.65rem', color: '#888', outline: 'none' }}
                               />
                               <p style={{ fontSize: '0.52rem', color: '#999', textAlign: 'center', fontWeight: '500', marginTop: '2px' }}>
                                 Recomendado: 1024x1024px. Máx 5MB.
                               </p>
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
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', marginBottom: '8px' }}>Logo del Proyecto (Recomendado 512x512)</label>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                         <div style={{ 
                           width: '50px', height: '50px', borderRadius: '12px', 
                           background: merchantFormData.logo_url ? `url(${merchantFormData.logo_url}) center/cover` : '#F0F4ED',
                           border: '1px solid #E4EBDD', flexShrink: 0
                         }} />
                        <div style={{ flex: 1 }}>
                           <div 
                             className="hover-scale"
                             style={{ 
                               display: 'block', width: '100%', padding: '0.8rem', borderRadius: '12px', border: '1px dashed #5F7D4A', 
                               background: '#F8F9F5', cursor: 'pointer', textAlign: 'center',
                               fontSize: '0.75rem', fontWeight: '800', color: '#5F7D4A',
                               transition: 'all 0.2s'
                             }}
                             onClick={() => document.getElementById('logo-v3-upload')?.click()}
                           >
                             {saving ? 'Cargando...' : 'SUBIR LOGO'}
                             <input 
                               id="logo-v3-upload"
                               type="file" 
                               style={{ display: 'none' }} 
                               accept="image/*" 
                               onChange={(e) => {
                                 const file = e.target.files?.[0];
                                 if (!file) return;
                                 if (file.size > 5 * 1024 * 1024) {
                                   setMessage({ type: 'error', text: '¡Imagen muy pesada! Máximo 5MB.' });
                                   setTimeout(() => setMessage(null), 4000);
                                   return;
                                 }
                                 
                                 setSaving(true);
                                 setMessage({ type: 'success', text: 'Preparando editor... ⏳' });
                                 
                                 try {
                                   const objectUrl = URL.createObjectURL(file);
                                   setCroppingImage({ url: objectUrl, type: 'merchant_logo', aspect: 1 });
                                   setSaving(false);
                                   setMessage(null);
                                 } catch (err) {
                                   console.error("Error creating object URL:", err);
                                   setSaving(false);
                                   setMessage({ type: 'error', text: 'Error al abrir la imagen. Reintentá.' });
                                 }
                                 e.target.value = '';
                               }} 
                             />
                           </div>
                           <p style={{ fontSize: '0.58rem', color: '#888', marginTop: '6px', fontWeight: '600', textAlign: 'center' }}>
                             JPG/PNG, 1024x1024px recom. Máx 5MB.
                           </p>
                        </div>
                      </div>



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
                <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                   <div>
                     <h2 style={{ fontSize: '1.4rem', fontWeight: '1000', color: '#5F7D4A', margin: 0 }}>Identidad y Acceso</h2>
                     <p style={{ color: '#888', fontWeight: '600', fontSize: '0.8rem' }}>Tus datos oficiales en la red Alimnet.</p>
                   </div>
                </div>

                 <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   {/* SELECTOR DE AVATAR / FOTO */}
                   <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', background: '#F8F9F5', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
                      <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowAvatarPicker(true)}>
                         <div style={{ 
                            width: '100px', height: '100px', borderRadius: '35px', 
                            background: formData.avatar_url ? `url(${formData.avatar_url}) center/cover` : '#F4F1E6',
                            border: '3px solid white', boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                         }}>
                            {!formData.avatar_url && <User size={40} color="#5F7D4A" />}
                         </div>
                         <div style={{ 
                            position: 'absolute', bottom: '-5px', right: '-5px', 
                            background: '#2D3A20', color: 'white', width: '32px', height: '32px', 
                            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '3px solid #F8F9F5', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                         }}>
                            <Edit3 size={16} />
                         </div>
                      </div>
                      <div style={{ flex: 1 }}>
                         <h4 style={{ fontSize: '0.9rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '4px' }}>Rostro de Alimnet</h4>
                         <p style={{ fontSize: '0.75rem', color: '#666', fontWeight: '600', lineHeight: '1.4' }}>
                            Elegí un avatar de nuestra colección o subí tu propia foto de perfil.
                         </p>
                         <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                            <button className="button-primary-small" onClick={() => setShowAvatarPicker(true)} style={{ fontSize: '0.7rem', padding: '6px 12px', borderRadius: '10px' }}>Elegir Avatar</button>
                            
                            <div style={{ flex: 1 }}>
                                <div 
                                  className="hover-scale"
                                  style={{ 
                                    display: 'block', cursor: 'pointer', background: '#F0F4ED', color: '#5F7D4A', 
                                    textAlign: 'center', border: 'none', padding: '6px 12px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '1000',
                                    transition: 'all 0.2s'
                                  }}
                                  onClick={() => {
                                    console.log("Click en Avatar (Manual)");
                                    document.getElementById('avatar-v3-upload')?.click();
                                  }}
                                >
                                  {saving ? 'Cargando...' : 'Subir Imagen'}
                                  <input 
                                    id="avatar-v3-upload"
                                    type="file" 
                                    style={{ display: 'none' }} 
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;

                                      // Bloquear subida si no hay perfil (Invitado)
                                      if (!profile?.id) {
                                        setMessage({ type: 'error', text: '⚠️ Debés iniciar sesión para cargar tu foto de perfil.' });
                                        setTimeout(() => setMessage(null), 5000);
                                        return;
                                      }

                                      if (file.size > 5 * 1024 * 1024) {
                                        setMessage({ type: 'error', text: '¡Imagen muy pesada! Máximo 5MB.' });
                                        setTimeout(() => setMessage(null), 4000);
                                        return;
                                      }
                                      
                                      setSaving(true);
                                      setMessage({ type: 'success', text: 'Preparando editor... ⏳' });
                                      
                                      // USAR URL.createObjectURL (Más rápido y estable en móvil)
                                      try {
                                        const objectUrl = URL.createObjectURL(file);
                                        setCroppingImage({ url: objectUrl, type: 'avatar', aspect: 1 });
                                        setSaving(false);
                                        setMessage(null);
                                      } catch (err) {
                                        console.error("Error creating object URL:", err);
                                        setSaving(false);
                                        setMessage({ type: 'error', text: 'Error al abrir la imagen. Reintentá.' });
                                      }
                                      e.target.value = '';
                                    }}
                                  />
                                </div>
                               <p style={{ fontSize: '0.55rem', color: '#888', marginTop: '4px', fontWeight: '600', textAlign: 'center' }}>
                                 Recomendado: 512x512px. Máx 5MB.
                               </p>
                             </div>
                         </div>
                      </div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Nombre</label>
                        <input 
                          type="text" 
                          value={formData.first_name}
                          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                          placeholder="Tu nombre"
                          style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '750', fontSize: '0.94rem', color: '#2D3A20' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Apellido Oficial</label>
                        <input 
                          type="text" 
                          value={formData.last_name || ''}
                          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                          placeholder="Tu apellido"
                          style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: '1px solid #E4EBDD', background: '#F8F9F5', outline: 'none', fontWeight: '750', fontSize: '0.94rem', color: '#2D3A20' }}
                        />
                      </div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Correo Electrónico (Solo Acceso)</label>
                        <input 
                          type="text" 
                          value={profile?.email || 'petición pendiente...'}
                          readOnly
                          style={{ width: '100%', padding: '1rem 1.4rem', borderRadius: '18px', border: 'none', background: '#F0F4ED', outline: 'none', fontWeight: '750', fontSize: '0.9rem', color: '#888', cursor: 'not-allowed' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase' }}>Ubicación Actual (Radar)</label>
                        <div style={{ position: 'relative' }}>
                          <MapPin size={18} style={{ position: 'absolute', right: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
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

                   <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: '950', color: '#666', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Nombre de Perfil Público</label>
                      <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '1.2rem', fontWeight: '600' }}>¿Cómo quieres que te vean en validaciones y en el mapa?</p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                          { id: 'full' as const, label: `${formData.first_name || 'Nombre'} ${formData.last_name || ''}`.trim() || 'Visualización Completa' },
                          { id: 'initial' as const, label: `${formData.first_name || 'Nombre'} ${formData.last_name ? (formData.last_name[0] + '.') : ''}`.trim() || 'Visualización Corta' }
                        ].map(style => (
                          <button 
                            key={style.id}
                            onClick={() => setFormData({...formData, display_name_style: style.id})}
                            style={{ 
                              padding: '1.2rem', borderRadius: '22px', border: '1.8px solid',
                              borderColor: formData.display_name_style === style.id ? '#5F7D4A' : '#E4EBDD',
                              background: formData.display_name_style === style.id ? '#F0F4ED' : 'white',
                              color: '#2D3A20', fontWeight: '1000', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.3s', flex: 1
                            }}
                          >
                            {style.label}
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'estilo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', margin: 0, letterSpacing: '-0.02em' }}>Mi Estilo Alimenticio</h2>
                  <p style={{ color: '#888', fontWeight: '600', fontSize: '1rem', marginTop: '6px' }}>Configurá tu radar para que Alimnet sea tu espejo.</p>
                </div>
                <div style={{ background: '#F0F4ED', padding: '10px 20px', borderRadius: '15px', color: '#5F7D4A', fontWeight: '900', fontSize: '0.85rem' }}>
                   {formData.preferences?.length || 0} preferencias activas
                </div>
              </div>

              <div style={{ background: 'white', padding: '3.5rem', borderRadius: '45px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column', gap: '3.5rem', boxShadow: '0 30px 100px rgba(0,0,0,0.03)' }}>
                
                {[
                  { 
                    title: 'Cómo querés recibir', 
                    icon: <Navigation size={20} />, 
                    options: ['Retiro en local', 'Entrega a domicilio'] 
                  },
                  { 
                    title: 'Tipo de alimentación', 
                    icon: <Heart size={20} />, 
                    options: ['Gluten Free', 'Sugar Free', 'Plant Based', 'Sin Lactosa', 'Keto', 'Vegetariano'] 
                  },
                  { 
                    title: 'Calidad y Producción', 
                    icon: <Leaf size={20} />, 
                    options: ['Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sin ultraprocesados', 'Sustentable', 'Pastura'] 
                  },
                  { 
                    title: 'Producción Animal', 
                    icon: <Beef size={20} />, 
                    options: ['Pastura', 'Grass-fed', 'Bienestar animal'] 
                  },
                  { 
                    title: 'Certificaciones / asociaciones', 
                    icon: <ShieldCheck size={20} />, 
                    options: ['Demeter', 'AABDA', 'Orgánico Certificado'] 
                  },
                  { 
                    title: 'Tipo de actor', 
                    icon: <Users size={20} />, 
                    options: ['Productor', 'Abastecedor', 'Restaurante', 'Chef'] 
                  },
                  { 
                    title: '¿Qué estás buscando?', 
                    icon: <Search size={20} />, 
                    options: ['Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 'Panificados', 'Masa Madre', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'] 
                  }
                ].map((section, idx) => (
                  <div key={idx} style={{ 
                    borderBottom: idx === 6 ? 'none' : '1px solid #F0F4ED', 
                    paddingBottom: idx === 6 ? 0 : '3rem',
                    animation: `fadeInUp 0.5s ease forwards ${idx * 0.1}s`,
                    opacity: 0, transform: 'translateY(20px)'
                  }}>
                    <h4 style={{ 
                      fontSize: '0.9rem', fontWeight: '1000', color: '#5F7D4A', 
                      textTransform: 'uppercase', letterSpacing: '0.12em', 
                      marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' 
                    }}>
                      <div style={{ background: '#F0F4ED', width: '42px', height: '42px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2D3A20' }}>
                        {section.icon}
                      </div>
                      {section.title}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                      {section.options.map(opt => {
                        const isSelected = (formData.preferences || []).includes(opt);
                        return (
                          <button 
                            key={opt}
                            onClick={() => {
                              const current = formData.preferences || [];
                              const next = current.includes(opt) ? current.filter(c => c !== opt) : [...current, opt];
                              setFormData({...formData, preferences: next});
                            }}
                            style={{ 
                              padding: '1.1rem 2rem', borderRadius: '24px', border: '2px solid',
                              borderColor: isSelected ? '#5F7D4A' : '#F0F4ED',
                              background: isSelected ? '#F0F4ED' : 'transparent',
                              color: isSelected ? '#2D3A20' : '#888',
                              fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', 
                              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                              boxShadow: isSelected ? '0 10px 20px rgba(95,125,74,0.1)' : 'none'
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* BOTON GUARDAR ESTILO */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', background: '#F8F9F5', padding: '3rem', borderRadius: '40px' }}>
                  <button 
                    onClick={async () => {
                      setSaving(true);
                      try {
                        const { data: { user } } = await supabase.auth.getUser();
                        if (!user) return;
                        const { error } = await supabase.from('profiles').update({
                          preferences: formData.preferences,
                          updated_at: new Date().toISOString()
                        }).eq('id', user.id);
                        if (error) throw error;
                        setMessage({ type: 'success', text: '¡Tu Estilo Alimenticio ha sido actualizado exponencialmente! ✨🍱' });
                        setTimeout(() => setMessage(null), 3000);
                      } catch (err) { console.error(err); } finally { setSaving(false); }
                    }}
                    disabled={saving}
                    style={{ 
                      padding: '1.5rem 5rem', background: '#2D3A20', color: 'white', 
                      border: 'none', borderRadius: '28px', fontWeight: '1000', fontSize: '1.2rem',
                      cursor: saving ? 'not-allowed' : 'pointer', boxShadow: '0 25px 60px rgba(45,58,32,0.35)',
                      display: 'flex', alignItems: 'center', gap: '15px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {saving ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                    {saving ? 'SINCRONIZANDO ADN...' : 'SAVE MY ALIMNET STYLE'}
                  </button>
                </div>

              </div>
              <style jsx>{`
                @keyframes fadeInUp {
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div style={{ background: 'white', padding: '4rem', borderRadius: '32px', border: '1px solid #E4EBDD', textAlign: 'center' }}>
              <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>Próximamente: CONFIGURACIÓN</h3>
              <p style={{ color: '#888', marginTop: '1rem' }}>Estamos puliendo esta sección.</p>
            </div>
          )}
    {/* MODAL PICKER DE AVATARES */}
    {showAvatarPicker && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
          background: 'rgba(0,0,0,0.5)', zIndex: 5000, display: 'flex', 
          alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' 
        }} onClick={() => setShowAvatarPicker(false)}>
           <div 
             style={{ 
               width: '90%', maxWidth: '600px', background: 'white', borderRadius: '40px', 
               padding: '2.5rem', boxShadow: '0 25px 60px rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.3)',
               maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
             }} 
             onClick={(e) => e.stopPropagation()}
           >
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                 <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '1000', color: '#2D3A20', margin: 0 }}>Gabinete de Identidad</h2>
                    <p style={{ color: '#888', fontWeight: '600', fontSize: '0.85rem' }}>Elegí el rostro que más te represente en Alimnet.</p>
                 </div>
                 <button 
                   onClick={() => setShowAvatarPicker(false)}
                   style={{ background: '#F0F4ED', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 >
                    <X size={18} color="#5F7D4A" />
                 </button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }} className="no-scrollbar">
                 {!previewAvatar ? (
                   <div style={{ 
                     display: 'grid', 
                     gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
                     gap: '1rem' 
                   }}>
                    {ALIMNET_AVATARS.map(avatar => (
                       <div 
                         key={avatar.id}
                         onClick={(e) => {
                           e.stopPropagation();
                           setPreviewAvatar(avatar.path);
                         }}
                         style={{ 
                           textAlign: 'center', cursor: 'pointer', outline: 'none',
                           background: formData.avatar_url === avatar.path ? '#F0F4ED' : 'transparent',
                           padding: '0.8rem', borderRadius: '45px', border: '6px solid',
                           borderColor: formData.avatar_url === avatar.path ? '#5F7D4A' : 'transparent',
                           transition: 'all 0.3s'
                         }}
                       >
                          <div style={{ 
                             width: '100%', aspectRatio: '1/1', borderRadius: '40px', 
                             background: `url(${avatar.path}) center/cover`, 
                             border: '3px solid white', boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
                          }} />
                       </div>
                    ))}
                   </div>
                 ) : (
                   <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '0.2rem', animation: 'fadeIn 0.4s ease', position: 'relative', width: '100%' }}>
                      {/* BOTONES LATERALES NAVEGACION (V-9.5.7: Más compactos para mobile) */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          const idx = ALIMNET_AVATARS.findIndex(a => a.path === previewAvatar);
                          const nextIdx = (idx - 1 + ALIMNET_AVATARS.length) % ALIMNET_AVATARS.length;
                          setPreviewAvatar(ALIMNET_AVATARS[nextIdx].path);
                        }}
                        style={{ position: 'absolute', left: '0px', top: '35%', background: 'white', border: '1px solid #E4EBDD', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      >
                         <ArrowLeft size={18} color="#5F7D4A" />
                      </button>

                      <div 
                        onTouchStart={(e) => {
                          const touch = e.touches[0];
                          (window as any)._touchStartX = touch.clientX;
                        }}
                        onTouchEnd={(e) => {
                          const touch = e.changedTouches[0];
                          const deltaX = touch.clientX - (window as any)._touchStartX;
                          if (Math.abs(deltaX) > 40) {
                            const idx = ALIMNET_AVATARS.findIndex(a => a.path === previewAvatar);
                            const nextIdx = deltaX > 0 
                              ? (idx - 1 + ALIMNET_AVATARS.length) % ALIMNET_AVATARS.length 
                              : (idx + 1) % ALIMNET_AVATARS.length;
                            setPreviewAvatar(ALIMNET_AVATARS[nextIdx].path);
                          }
                        }}
                        style={{ 
                          width: 'min(280px, 75vw)', aspectRatio: '1/1', borderRadius: '60px', border: '10px solid white', 
                          boxShadow: '0 30px 80px rgba(0,0,0,0.18)', background: `url(${previewAvatar}) center/cover`,
                          animation: 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)', cursor: 'grab'
                        }} 
                      />

                      <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           const idx = ALIMNET_AVATARS.findIndex(a => a.path === previewAvatar);
                           const nextIdx = (idx + 1) % ALIMNET_AVATARS.length;
                           setPreviewAvatar(ALIMNET_AVATARS[nextIdx].path);
                         }}
                         style={{ position: 'absolute', right: '0px', top: '35%', background: 'white', border: '1px solid #E4EBDD', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      >
                         <div style={{ transform: 'rotate(180deg)', display: 'flex' }}><ArrowLeft size={18} color="#5F7D4A" /></div>
                      </button>

                      <div style={{ display: 'flex', gap: '0.8rem', width: '100%', maxWidth: '320px', marginTop: '10px' }}>
                        <button 
                          onClick={() => setPreviewAvatar(null)}
                          style={{ flex: 1, padding: '0.85rem', borderRadius: '18px', border: '1px solid #E4EBDD', background: 'white', color: '#666', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem' }}
                        >
                          Volver
                        </button>
                        <button 
                          onClick={() => {
                            setFormData({ ...formData, avatar_url: previewAvatar });
                            setShowAvatarPicker(false);
                            setPreviewAvatar(null);
                          }}
                          style={{ flex: 2, padding: '0.85rem', borderRadius: '18px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '1000', cursor: 'pointer', boxShadow: '0 10px 20px rgba(95,125,74,0.3)', fontSize: '0.85rem' }}
                        >
                          Elegir este rostro
                        </button>
                      </div>
                   </div>
                 )}
              </div>
               <style dangerouslySetInnerHTML={{ __html: `
                 @keyframes scaleIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                 @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                 @media (max-width: 900px) {
                   .desktop-only { display: none !important; }
                   .mobile-only { display: flex !important; }
                   .main-content { padding: 1.5rem 1rem !important; }
                 }
                 @media (min-width: 901px) {
                   .desktop-only { display: flex !important; }
                   .mobile-only { display: none !important; }
                 }
               `}} />
              
              {/* V-9.5.7: ELIMINAMOS EL BOTÓN INFERIOR CUANDO HAY PREVIEW PARA GANAR ESPACIO */}
              {!previewAvatar && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                   <button 
                     className="button-primary" 
                     onClick={() => setShowAvatarPicker(false)}
                     style={{ width: '100%', borderRadius: '25px', padding: '1.2rem', fontSize: '1.1rem', fontWeight: '1000' }}
                   >
                      Listo, este soy yo
                   </button>
                </div>
              )}
           </div>
        </div>
      )}

      {/* MODAL DE CROPPING (ALTO NIVEL PARA Z-INDEX) */}
      {croppingImage && (
        <ImageCropper 
          image={croppingImage.url}
          aspect={croppingImage.aspect}
          circular={croppingImage.type === 'avatar'}
          onCancel={() => {
            if (croppingImage.url.startsWith('blob:')) URL.revokeObjectURL(croppingImage.url);
            setCroppingImage(null);
          }}
          onCropComplete={async (blob) => {
            try {
              if (croppingImage.url.startsWith('blob:')) URL.revokeObjectURL(croppingImage.url);
              setCroppingImage(null);
              setSaving(true);
              
              const fileName = `v3_${Date.now()}.jpg`;
              
              if (croppingImage.type === 'avatar') {
                const targetProfileId = profile?.id;
                if (!targetProfileId) throw new Error("Perfil no detectado.");
                setMessage({ type: 'success', text: 'Procesando tu nuevo rostro... 🎨' });
                const filePath = `avatars/${targetProfileId}/${fileName}`;
                
                const { error: uploadError } = await supabase.storage
                  .from('avatars')
                  .upload(filePath, blob, { cacheControl: '3600', upsert: true });
                if (uploadError) throw uploadError;

                setMessage({ type: 'success', text: 'Sincronizando con Alimnet... ✅' });
                const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
                
                const { error: dbError } = await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', targetProfileId);
                if (dbError) throw dbError;

                setFormData({ ...formData, avatar_url: publicUrl });
                setProfile({ ...profile, avatar_url: publicUrl });
              } else {
                const targetMerchantId = merchantData?.id;
                if (!targetMerchantId) throw new Error("ID de comercio no detectado.");
                setMessage({ type: 'success', text: 'Procesando logo... 🛠️' });
                const filePath = `logos/${targetMerchantId}/${fileName}`;
                
                const { error: uploadError } = await supabase.storage
                  .from('merchant_assets')
                  .upload(filePath, blob, { cacheControl: '3600', upsert: true });
                if (uploadError) throw uploadError;

                setMessage({ type: 'success', text: 'Guardando cambios permanentemente... ✅' });
                const { data: { publicUrl } } = supabase.storage.from('merchant_assets').getPublicUrl(filePath);
                
                const { error: dbError } = await supabase.from('merchants').update({ logo_url: publicUrl }).eq('id', targetMerchantId);
                if (dbError) throw dbError;

                setMerchantFormData({ ...merchantFormData, logo_url: publicUrl });
                setMerchantData({ ...merchantData, logo_url: publicUrl });
              }
              
              setMessage({ type: 'success', text: '¡LISTO! Imagen guardada ✨' });
              setTimeout(() => setMessage(null), 3000);
            } catch (err: any) { 
              console.error("DEBUG UPLOAD ERROR:", err);
              setMessage({ type: 'error', text: `ERROR: ${err.message || 'Error desconocido'}` });
            } finally { 
              setSaving(false); 
            }
          }}
        />
      )}

        </div>
      </main>



    </div>
  </div>
  );
}
