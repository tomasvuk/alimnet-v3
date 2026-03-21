'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { 
  Search, 
  MapPin, 
  ChevronRight, 
  X, 
  Instagram, 
  ExternalLink, 
  ChevronDown,
  Filter,
  Lock,
  Heart,
  User,
  CheckCircle2,
  ChefHat,
  Store,
  UtensilsCrossed,
  Leaf,
  LogIn,
  UserCircle,
  Map as MapIcon
} from 'lucide-react';

// Carga dinámica del mapa para evitar error "window is not defined" en SSR
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div>
});

// --- Tipos ---
interface Merchant {
  id: string;
  name: string;
  type: string;
  bio_short?: string;
  bio_long?: string;
  instagram_url?: string;
  validation_count: number;
  status: string;
  tags?: string[];
  phone?: string;
  whatsapp?: string;
  website_url?: string;
  preferred_contact_channel?: string;
  order_instructions?: string;
  working_hours?: string;
  delivery_info?: string;
  locations?: Location[];
}

interface Location {
  id: string;
  merchant_id: string;
  location_type: string;
  locality: string;
  lat: number;
  lng: number;
  is_primary: boolean;
}

// --- Iconos Custom ---
const FarmerIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={color}/>
  </svg>
);

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: FarmerIcon },
  { id: 'almacen', label: 'Proveedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const CATEGORIES_TAGS = [
  'Agroecológico',
  'Orgánico',
  'Biodinámico',
  'De Pastura',
  'Libre de Gluten',
  'Libre de Azúcar',
  'Vegano',
  'Vegetariano',
  'Otros'
];

// --- NUEVO LOGO PRO ---
function LogoV3({ size = 40 }: { size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" stroke="#5F7D4A" strokeWidth="0.5" strokeDasharray="1 3" />
        <circle cx="30" cy="30" r="22" stroke="#5F7D4A" strokeWidth="0.5" strokeOpacity="0.4" />
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="950" fill="#1B2414">A</text>
        <defs>
          <radialGradient id="logo_glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(30 30) rotate(90) scale(28)">
            <stop stopColor="#5F7D4A" stopOpacity="0.15"/>
            <stop offset="1" stopColor="#5F7D4A" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#logo_glow)"/>
      </svg>
    </div>
  );
}

export default function ExplorarPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'almacen', 'restaurante', 'chef']);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list'); 
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [stickyFilters, setStickyFilters] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyFilters(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 1. Cargar datos filtrados (Zona Norte Activa)
  const getActiveMerchants = async () => {
    setLoading(true);
    console.log("[SUPABASE] Intentando conectar a:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    try {
      const { data, error } = await supabase
        .from('merchants')
        .select('*, locations(*)')
        .eq('status', 'active');

      if (error) {
        console.error('[SUPABASE ERROR]:', error);
      } else {
        console.log(`[SUPABASE SUCCESS] Datos crudos:`, data?.length);
        setMerchants(data || []);
        if (data) filterData(data, selectedCategories, selectedFoodTypes);
      }
    } catch (err) {
      console.error('[CRITICAL]:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveMerchants();
  }, []);

  // Registro de Clicks (Analytics Agent) -> Supabase
  const trackClick = async (action: string, metadata: any) => {
    console.log(`[ANALYTICS] Action: ${action}`, metadata);
    try {
      await supabase.from('system_events').insert([
        { 
          event_type: action, 
          payload: metadata,
        }
      ]);
    } catch (e) {
      console.error("Error logging event:", e);
    }
  };

  const filterData = (data: Merchant[], categories: string[], types: string[]) => {
    // 1. Filtrar por categorías (Productor, Almacén, etc.)
    let result = data.filter(m => categories.includes((m.type || '').toLowerCase()));
    
    // 2. Filtrar por tipos de alimento (Tags)
    // Solo aplicamos el filtro si el usuario seleccionó algunos tags pero NO TODOS (para evitar el "trap" de borrar todo si no hay tags cargados)
    if (types.length > 0 && types.length < CATEGORIES_TAGS.length) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return types.some(type => merchantTags.includes(type));
      });
    }
    
    console.log(`[DEBUG] Merchants: ${data.length}, Filtered: ${result.length}`);
    setFilteredMerchants(result);
  };

  useEffect(() => {
    filterData(merchants, selectedCategories, selectedFoodTypes);
  }, [selectedCategories, selectedFoodTypes, merchants]);

  const toggleCategory = (id: string) => {
    const newCategories = selectedCategories.includes(id)
      ? selectedCategories.filter(c => c !== id)
      : [...selectedCategories, id];
    
    setSelectedCategories(newCategories);
  };

  const handleMerchantSelect = (m: Merchant) => {
    trackClick('SELECT_MERCHANT', { id: m.id, name: m.name });
    setSelectedMerchant(m);
  };

  const handleValidate = async (merchantId: string) => {
    try {
      const { error: valError } = await supabase
        .from('validations')
        .insert([{ merchant_id: merchantId }]);

      if (valError) throw valError;

      const currentMerchant = merchants.find(m => m.id === merchantId);
      if (currentMerchant) {
        const newCount = (currentMerchant.validation_count || 0) + 1;
        
        await supabase
          .from('merchants')
          .update({ validation_count: newCount })
          .eq('id', merchantId);

        const updatedMerchants = merchants.map(m => 
          m.id === merchantId ? { ...m, validation_count: newCount } : m
        );
        setMerchants(updatedMerchants);
        if (selectedMerchant?.id === merchantId) {
          setSelectedMerchant({ ...selectedMerchant, validation_count: newCount });
        }
        
        trackClick('VALIDATE_MERCHANT', { id: merchantId, name: currentMerchant.name });
      }
    } catch (e) {
      console.error("Error validando:", e);
    }
  };

  // No bloqueamos toda la página, solo el acceso a info sensible

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      
      {/* 1. HEADER PRINCIPAL (Se va con el scroll estilo Argenprop) */}
      <header className="main-header" style={{ 
        padding: "0.8rem 1.5rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        background: "var(--background)",
        zIndex: 1000,
        position: 'relative'
      }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: "1.3rem", fontWeight: "950", color: "var(--primary-dark)", letterSpacing: "-0.05em", display: "flex", alignItems: "center", gap: "10px", cursor: 'pointer' }}
        >
          <LogoV3 size={38} />
          <span className="desktop-only text-primary-dark">ALIMNET</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="desktop-only button button-secondary"
            onClick={() => window.location.href = '/login'}
            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
          >
            Ingresar
          </button>
          <button 
            className="hamburger-btn"
            onClick={() => setShowHamburger(!showHamburger)}
            style={{ background: 'none', border: 'none', color: 'var(--primary-dark)', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}
          >
            <div style={{ width: '22px', height: '2.5px', background: 'currentColor', borderRadius: '10px' }}></div>
            <div style={{ width: '16px', height: '2.5px', background: 'currentColor', borderRadius: '10px' }}></div>
            <div style={{ width: '22px', height: '2.5px', background: 'currentColor', borderRadius: '10px' }}></div>
          </button>
        </div>

        {showHamburger && (
          <div style={{ 
            position: 'absolute', top: 'calc(100% + 10px)', right: '1rem', width: '220px', 
            background: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', 
            padding: '1.2rem', zIndex: 2000, display: 'flex', flexDirection: 'column', gap: '1.2rem',
            border: '1px solid rgba(0,0,0,0.05)', animation: 'slideDown 0.2s ease-out'
          }}>
            <a href="/sostener" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: '800', fontSize: '0.85rem' }}>💎 Sostener Alimnet</a>
            <a href="/explorar" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: '800', fontSize: '0.85rem' }}>🗺️ Explorar Mapa</a>
            <a href="/perfil" style={{ textDecoration: 'none', color: 'var(--primary-dark)', fontWeight: '800', fontSize: '0.85rem' }}>👤 Mi Perfil</a>
            <div style={{ height: '1px', background: '#eee', margin: '0.2rem 0' }}></div>
            <a href="/unirse" style={{ textDecoration: 'none', color: 'var(--primary)', fontWeight: '900', fontSize: '0.85rem' }}>Sumar mi comercio</a>
          </div>
        )}
      </header>

      {/* 2. BARRA DE FILTROS (STICKY) */}
      <div className={`filter-bar ${stickyFilters ? 'is-sticky' : ''}`} style={{ 
        padding: '0.8rem 1.5rem', 
        background: 'rgba(255, 255, 255, 0.98)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        boxShadow: stickyFilters ? '0 8px 25px rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.3s'
      }}>
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
          
          <div className="search-box" style={{ position: 'relative', minWidth: '220px', flexShrink: 0 }}>
            <input 
              type="text" placeholder="Localidad o nombre..." value={searchLocation} 
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.85rem', outline: 'none', background: '#f5f5f5' }} 
            />
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={14} />
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategories.includes(cat.id);
              return (
                <button 
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--border)'),
                    background: isActive ? 'var(--primary)' : 'white',
                    color: isActive ? 'white' : 'var(--primary-dark)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <cat.icon size={12} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. CONTENIDO PRINCIPAL (Split Desktop / Toggle Mobile) */}
      <div className="main-content" style={{ flex: 1, display: 'flex', overflow: 'visible', position: 'relative' }}>
        
        {/* Toggle Flotante Mobile (Estilo Argenprop/Maps) */}
        <button 
          className="mobile-only toggle-view-btn"
          onClick={() => setMobileView(mobileView === 'list' ? 'map' : 'list')}
          style={{ 
            position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 3000, 
            background: '#1B2414', color: 'white', border: 'none', borderRadius: '30px', padding: '1rem 2rem',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '10px',
            fontWeight: '900', fontSize: '0.9rem', letterSpacing: '0.05em', transition: 'all 0.2s'
          }}
        >
          {mobileView === 'list' ? <MapIcon size={18} /> : <Search size={18} />}
          {mobileView === 'list' ? 'VER MAPA' : 'VER LISTADO'}
        </button>

        {/* LISTA DE RESULTADOS */}
        <section className={`results-section ${mobileView === 'list' ? 'visible' : 'hidden'}`} style={{ 
          width: '38%', minWidth: '420px', padding: '1.5rem', background: 'transparent' 
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
            {filteredMerchants.length} Comercios encontrados
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }} className="cards-grid">
            {filteredMerchants.map(m => (
              <MerchantCard key={m.id} merchant={m} onClick={() => {
                handleMerchantSelect(m);
                if (window.innerWidth < 768) setMobileView('map');
              }} />
            ))}
          </div>
        </section>

        {/* MAPA */}
        <section className={`map-section ${mobileView === 'map' ? 'active' : ''}`} style={{ flex: 1, position: 'relative' }}>
          <div style={{ position: 'sticky', top: stickyFilters ? '60px' : '0', height: 'calc(100vh - 60px)', width: '100%' }}>
            <MapComponent 
              providers={(filteredMerchants.length > 1 ? filteredMerchants : merchants).map(m => ({
                id: m.id,
                name: m.name,
                category: m.type,
                type: m.type,
                location_lat: m.locations?.[0]?.lat || -34.4586,
                location_lng: m.locations?.[0]?.lng || -58.9142,
                is_exact_location: true,
                city_zone: m.locations?.[0]?.locality || 'Zona Norte'
              }))} 
              center={[-34.4586, -58.9142]} 
              zoom={11}
            />
          </div>
        </section>
      </div>

      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant as Merchant} 
          isLoggedIn={isLoggedIn}
          onClose={() => setSelectedMerchant(null)} 
          trackClick={trackClick}
          onValidate={handleValidate}
        />
      )}

      <style jsx>{` 
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } 
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .desktop-only { display: inline-flex; }
        .mobile-only { display: none; }

        @media (max-width: 768px) {
          .mobile-only { display: flex; }
          .desktop-only { display: none !important; }
          
          .results-section { width: 100% !important; min-width: 0 !important; }
          .results-section.hidden { display: none; }

          .map-section { display: none; }
          .map-section.active { display: block; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 50; }
          
          .detail-panel { 
            width: 100% !important; 
            height: 94% !important;
            top: 6% !important;
            border-radius: 30px 30px 0 0;
            z-index: 4000;
          }
          .detail-panel { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
          
          .is-sticky { border-bottom: 2px solid var(--primary); }
        }
      `}</style>
    </div>
  );
}

function MerchantCard({ merchant, onClick }: { merchant: Merchant, onClick: () => void }) {
  const IconComponent = CATEGORIES.find(c => c.id === merchant.type?.toLowerCase())?.icon || MapPin;
  
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '1.2rem', borderRadius: '24px', background: 'white', cursor: 'pointer',
        border: '1px solid #eee', boxShadow: '0 8px 20px rgba(0,0,0,0.03)',
        display: 'flex', flexDirection: 'column', gap: '12px', transition: 'all 0.2s'
      }}
      className="merchant-card-pro"
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ 
          width: '45px', height: '45px', borderRadius: '15px', background: '#F0F4ED', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 
        }}>
          <IconComponent size={22} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{merchant.name}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '700' }}>
            📍 {merchant.locations?.[0]?.locality || 'Zona Norte'}
          </p>
        </div>
        <div style={{ fontSize: '0.65rem', fontWeight: '900', background: 'var(--primary-dark)', color: 'white', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
          {merchant.type}
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.7, margin: 0, lineHeight: '1.5' }}>
        {merchant.bio_short?.substring(0, 90)}...
      </p>
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, onClose, trackClick, onValidate }: { merchant: Merchant, isLoggedIn: boolean, onClose: () => void, trackClick: (eventName: string, params?: Record<string, unknown>) => void, onValidate: (id: string) => void }) {
  const [hasValidated, setHasValidated] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSendFeedback = async () => {
    if (!feedback.trim()) return;
    await trackClick('SUGGEST_INFO_UPDATE', { merchant_id: merchant.id, merchant_name: merchant.name, message: feedback });
    setFeedbackSent(true);
    setFeedback('');
    setTimeout(() => setFeedbackSent(false), 3000);
  };

  return (
    <div className="detail-panel" style={{ 
      position: 'absolute', top: 0, left: 0, width: '420px', height: '100%', 
      background: 'white', boxShadow: '0 0 40px rgba(0,0,0,0.1)', zIndex: 1500, 
      display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', background: 'white', zIndex: 10 }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)' }}>{merchant.name}</h2>
        <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}><X size={18} /></button>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Contenido (Desenfocado si no está logueado) */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '1.5rem',
          filter: !isLoggedIn ? 'blur(12px) grayscale(10%)' : 'none',
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          userSelect: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.6 : 1,
          transition: 'all 0.5s ease'
        }}>
          <div style={{ 
            width: '100%', height: '220px', 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
            borderRadius: '24px', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <Leaf size={60} strokeWidth={1} />
            <span style={{ fontSize: '0.7rem', fontWeight: '900', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Alimnet Proyect</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.2rem' }}>
            <span style={{ padding: '0.3rem 0.8rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900' }}>{merchant.type}</span>
            <span style={{ padding: '0.3rem 0.8rem', background: 'var(--soft-leaf)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900' }}>Validado</span>
          </div>

          <button 
            onClick={() => { if (!hasValidated) { onValidate(merchant.id); setHasValidated(true); } }}
            disabled={hasValidated}
            style={{ 
              width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', 
              background: hasValidated ? '#F0F4ED' : 'var(--primary)', 
              color: hasValidated ? 'var(--primary)' : 'white', fontWeight: '900', 
              cursor: hasValidated ? 'default' : 'pointer', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' 
            }}
          >
            {hasValidated ? <CheckCircle2 size={18} /> : <Heart size={18} />}
            {hasValidated ? '¡Proyecto Validado!' : 'Validar este proyecto'}
          </button>

          <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '0.6rem', fontWeight: '900' }}>Historia</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-primary)', marginBottom: '2rem' }}>{merchant.bio_long || merchant.bio_short}</p>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '0.8rem', fontWeight: '900' }}>Logística</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Store size={16} color="var(--primary)" />
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '800' }}>Días y Horarios</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{merchant.working_hours || "Consultar directamente."}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={16} color="var(--primary)" />
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '800' }}>Zona de Reparto / Retiro</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{merchant.delivery_info || "Consultar alcance."}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '1.2rem', background: 'var(--primary-dark)', borderRadius: '20px', color: 'white', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: '900', opacity: 0.8 }}>¿Cómo hacer tu pedido?</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>{merchant.order_instructions || "Contactar directamente para consultar catálogo y envíos."}</p>
          </div>

          {/* SECCIÓN DE AYUDA / FEEDBACK */}
          <div style={{ padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', border: '1px dashed var(--border)', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>¿Nos ayudás a completar la info?</h4>
            {feedbackSent ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}>¡Gracias! Recibimos tu comentario.</p>
            ) : (
              <>
                <textarea 
                  placeholder="Escribí acá si sabés de algún dato que falte..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={{ width: '100%', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px', fontSize: '0.85rem', resize: 'none', height: '80px', marginBottom: '10px', outline: 'none' }}
                />
                <button 
                  onClick={handleSendFeedback}
                  style={{ padding: '0.5rem 1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                >
                  Enviar sugerencia
                </button>
              </>
            )}
          </div>
        </div>

        {/* CONTACTO - Alineado a la paleta Alimnet */}
        <div style={{ 
          padding: '1.5rem', borderTop: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: '10px',
          filter: !isLoggedIn ? 'blur(25px) grayscale(20%)' : 'none',
          pointerEvents: !isLoggedIn ? 'none' : 'auto',
          userSelect: !isLoggedIn ? 'none' : 'auto',
          opacity: !isLoggedIn ? 0.5 : 1,
          transition: 'all 0.4s ease'
        }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a 
              href={merchant.instagram_url || '#'} 
              target={merchant.instagram_url ? "_blank" : undefined} 
              rel="noopener noreferrer" 
              onClick={(e) => {
                if (!merchant.instagram_url) e.preventDefault();
                trackClick('CTA_INSTAGRAM', { id: merchant.id });
              }}
              style={{ 
                flex: 1, padding: '0.7rem', 
                background: merchant.instagram_url ? 'var(--primary-dark)' : '#f0f0f0', 
                color: merchant.instagram_url ? 'white' : '#999', 
                borderRadius: '12px', textAlign: 'center', fontWeight: '900', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                textDecoration: 'none', cursor: merchant.instagram_url ? 'pointer' : 'default'
              }}
            >
              <Instagram size={18} /> {merchant.instagram_url ? 'Instagram' : 'No disponible'}
            </a>
            <a 
              href={merchant.website_url ? (merchant.website_url.startsWith('http') ? merchant.website_url : `https://${merchant.website_url}`) : '#'} 
              target={merchant.website_url ? "_blank" : undefined} 
              rel="noopener noreferrer" 
              onClick={(e) => {
                if (!merchant.website_url) e.preventDefault();
                trackClick('CTA_WEBSITE', { id: merchant.id });
              }}
              style={{ 
                flex: 1, padding: '0.7rem', 
                background: merchant.website_url ? 'white' : '#f0f0f0', 
                color: merchant.website_url ? 'var(--primary-dark)' : '#999', 
                borderRadius: '12px', textAlign: 'center', fontWeight: '900', 
                border: merchant.website_url ? '2px solid var(--border)' : '1px solid transparent',
                pointerEvents: merchant.website_url ? 'auto' : 'none',
                textDecoration: 'none'
              }}
            >
              {merchant.website_url ? 'Web' : 'No disponible'}
            </a>
          </div>
          <a 
            href={merchant.whatsapp ? `https://wa.me/${merchant.whatsapp.replace(/[^0-9]/g, '')}` : '#'} 
            target={merchant.whatsapp ? "_blank" : undefined} 
            rel="noopener noreferrer" 
            onClick={(e) => {
              if (!merchant.whatsapp) e.preventDefault();
              trackClick('CTA_WHATSAPP', { id: merchant.id });
            }}
            style={{ 
              padding: '0.8rem', 
              background: merchant.whatsapp ? 'var(--primary)' : '#f0f0f0', 
              color: merchant.whatsapp ? 'white' : '#999', 
              borderRadius: '12px', textAlign: 'center', fontWeight: '950', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
              pointerEvents: merchant.whatsapp ? 'auto' : 'none',
              boxShadow: merchant.whatsapp ? '0 4px 12px rgba(95, 125, 74, 0.2)' : 'none',
              textDecoration: 'none'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.49l-1.688 6.574 6.726-1.764a11.82 11.82 0 005.626 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            {merchant.whatsapp ? 'WhatsApp de Pedidos' : 'WhatsApp no disponible'}
          </a>
        </div>

        {!isLoggedIn && (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(3px)'
          }}>
             <div style={{ 
               padding: '2.5rem 2rem', textAlign: 'center', width: '90%', 
               background: 'rgba(255, 255, 255, 0.9)', 
               backdropFilter: 'blur(15px)',
               borderRadius: '32px',
               border: '1px solid rgba(255, 255, 255, 0.5)', 
               boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
             }}>
                <div style={{ fontSize: "1.1rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", justifyContent: 'center', gap: '8px', marginBottom: '1.2rem' }}>
                  <Leaf size={24} fill="var(--primary)" fillOpacity={0.2} /> ALIMNET
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Sumate a la red</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: '1.6', fontWeight: '600' }}>
                  Hacelo de manera <span style={{ fontWeight: '900', color: 'var(--primary-dark)' }}>fácil y segura</span>. Sin formularios largos ni correos molestos; solo el puente directo hacia alimentos reales.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px', margin: '0 auto' }}>
                  <button onClick={() => window.location.href = '/login'} className="button button-primary" style={{ width: '100%', borderRadius: '16px', padding: '0.9rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <LogIn size={20} /> Entrar con Gmail
                  </button>
                  <button onClick={() => window.location.href = '/registro'} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' }}>Crear cuenta nueva</button>
                </div>
              </div>
          </div>
        )}
      </div>

      <style jsx>{` 
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } 
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        
        .mobile-only { display: none; }
        .desktop-only { display: inline-flex; }

        @media (max-width: 768px) {
          .mobile-only { display: flex; }
          .desktop-only { display: none !important; }
          
          .main-header { padding: 0.7rem 1.2rem !important; }
          
          .filter-bar { display: none !important; }
          
          .main-content { flex-direction: column; }
          
          .sidebar { 
            width: 300px !important; 
            max-width: 85%;
            height: calc(100% - 10px);
            margin: 5px;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(15px);
            z-index: 2000;
            box-shadow: 10px 0 40px rgba(0,0,0,0.1);
            transform: translateX(-110%);
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 20px;
            display: block !important;
            padding: 1.2rem !important;
          }
          .sidebar.active { transform: translateX(0); }
          
          .map-container { width: 100% !important; height: 100%; border-radius: 0; }
          
          .detail-panel { 
            width: 100% !important; 
            z-index: 3000;
            height: 92% !important;
            top: 8% !important;
            border-radius: 30px 30px 0 0;
          }
          
          @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
          .detail-panel { animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        }
      `}</style>
    </div>
  );
}

function LoginWall() {
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '2rem' }}>
      <div style={{ maxWidth: '450px', width: '100%', padding: '3.5rem', background: 'white', border: '1px solid var(--border)', borderRadius: '40px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', animation: 'slideIn 0.5s ease-out' }}>
        <div style={{ fontSize: "1.4rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", justifyContent: 'center', gap: '8px', marginBottom: '2.5rem' }}>
          <Leaf size={28} fill="var(--primary)" fillOpacity={0.2} /> ALIMNET
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>¡Hola! Sumate a la red.</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontWeight: '550', lineHeight: '1.6' }}>Para ver los puntos de contacto directo con los productores y realizar pedidos, necesitás ser parte de la comunidad.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="button button-primary" 
            style={{ width: '100%', borderRadius: '18px', padding: '1rem', fontSize: '1rem' }}
          >
            Ingresar
          </button>
          <button 
            onClick={() => window.location.href = '/registro'} 
            style={{ 
              width: '100%', borderRadius: '18px', padding: '1rem', background: 'white', 
              border: '2px solid var(--primary)', color: 'var(--primary)', fontWeight: '900',
              cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s'
            }}
          >
            Crear mi cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
