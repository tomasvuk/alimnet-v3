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
  Map as MapIcon,
  List
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

export default function ExplorarPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'almacen', 'restaurante', 'chef']);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulado
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setActiveView('list'); // Default for desktop layout
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Cargar datos filtrados (Zona Norte Activa)
  useEffect(() => {
    async function getActiveMerchants() {
      setLoading(true);
      const { data, error } = await supabase
        .from('merchants')
        .select('*, locations(*)')
        .eq('status', 'active');

      if (error) {
        console.error('Error:', error);
      } else {
        setMerchants(data || []);
      }
      setLoading(false);
    }
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
    let result = data.filter(m => categories.includes(m.type.toLowerCase()));
    
    // Filtrado por tipos de alimento (Tags)
    if (types.length > 0) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return types.some(type => merchantTags.includes(type));
      });
    }

    // Filtrado por búsqueda de texto
    if (searchLocation) {
        result = result.filter(m => 
            m.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
            m.locations?.some(l => l.locality.toLowerCase().includes(searchLocation.toLowerCase()))
        );
    }
    
    setFilteredMerchants(result);
  };

  useEffect(() => {
    filterData(merchants, selectedCategories, selectedFoodTypes);
  }, [selectedCategories, selectedFoodTypes, merchants, searchLocation]);

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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      
      {/* 1. NAVBAR PREMIUM RESPONSIVE */}
      <header style={{ 
        padding: isMobile ? "0.6rem 1rem" : "0.8rem 2rem", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid var(--border)",
        background: "rgba(244, 241, 230, 0.98)",
        backdropFilter: "blur(10px)",
        zIndex: 1000
      }}>
        <div 
          onClick={() => window.location.href = '/'}
          style={{ fontSize: "1.3rem", fontWeight: "950", color: "var(--primary-dark)", letterSpacing: "-0.05em", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}
        >
          <Leaf size={24} fill="var(--primary)" fillOpacity={0.25} />
          ALIMNET
        </div>
        <div style={{ display: "flex", gap: isMobile ? "0.8rem" : "1.2rem", alignItems: "center" }}>
          {!isLoggedIn && (
            <button 
              onClick={() => setIsLoggedIn(true)}
              style={{ 
                color: "var(--primary)", fontWeight: "800", background: "white", 
                border: "1px solid var(--primary)", padding: "0.5rem 0.8rem", borderRadius: "12px", 
                cursor: "pointer", fontSize: isMobile ? "0.7rem" : "0.85rem" 
              }}
            >
              {isMobile ? "Test" : "Simular Ingreso"}
            </button>
          )}
          <button 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: isMobile ? '0.7rem' : '0.8rem', 
              fontWeight: '800', color: 'var(--primary)', background: 'rgba(95, 125, 74, 0.1)', 
              padding: isMobile ? '0.5rem 0.8rem' : '0.5rem 1rem', borderRadius: '12px', border: 'none', cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/unirse'}
          >
            <Heart size={14} fill="var(--primary)" /> {isMobile ? "Unirme" : "Sumar mi comercio"}
          </button>
          {!isMobile && (
            <button 
              onClick={() => window.location.href = '/perfil'}
              style={{ color: "var(--text-secondary)", fontWeight: "750", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem" }}
            >
              <UserCircle size={20} /> Mi Perfil
            </button>
          )}
        </div>
      </header>

      {/* 2. SUB-TOOLBAR CON FILTROS INTELIGENTES */}
      <div style={{ 
        padding: isMobile ? "0.6rem 1rem" : "0.6rem 2rem", 
        display: "flex", 
        gap: "0.8rem", 
        borderBottom: "1px solid var(--border)", 
        background: "white",
        overflowX: 'auto',
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none' 
      }}>
        <style jsx>{` div::-webkit-scrollbar { display: none; } `}</style>
        <div style={{ display: 'flex', gap: '8px', background: '#F8F9F5', padding: '4px', borderRadius: '16px', border: '1px solid #eee' }}>
          {CATEGORIES.map(cat => {
            const isActive = selectedCategories.includes(cat.id);
            return (
              <button 
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                style={{
                  padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1.2rem',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: 'none',
                  background: isActive ? 'var(--primary-dark)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  whiteSpace: 'nowrap'
                }}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setShowFoodDropdown(!showFoodDropdown)}
            style={{
              padding: isMobile ? '0.5rem 0.8rem' : '0.6rem 1.2rem',
              borderRadius: '12px', border: '1px solid var(--border)',
              background: 'white', fontSize: '0.8rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', whiteSpace: 'nowrap'
            }}
          >
            <Filter size={14} /> {isMobile ? "Tipos" : "Categorías de alimento"} <ChevronDown size={14} />
          </button>
          
          {showFoodDropdown && (
            <div style={{ 
              position: 'absolute', top: '120%', right: 0, width: '220px', 
              background: 'white', border: '1px solid var(--border)', borderRadius: '16px', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '1rem', zIndex: 2000 
            }}>
              {CATEGORIES_TAGS.map(type => (
                <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.5rem 0', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedFoodTypes.includes(type)}
                    onChange={(e) => {
                      const newTypes = e.target.checked ? [...selectedFoodTypes, type] : selectedFoodTypes.filter(t => t !== type);
                      setSelectedFoodTypes(newTypes);
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. BARRA DE BÚSQUEDA */}
      <div style={{ 
        padding: isMobile ? "0.8rem 1rem" : "1rem 2rem", 
        display: "flex", 
        gap: "1rem", 
        alignItems: "center", 
        background: "white", 
        borderBottom: "1px solid var(--border)" 
      }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} size={18} />
          <input 
            type="text" 
            placeholder="¿Qué buscás hoy? (Ej: Pan, Tomates, Tigre...)" 
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            style={{ 
              width: "100%", padding: "0.8rem 1rem 0.8rem 2.8rem", borderRadius: "14px", 
              border: "1.5px solid var(--border)", outline: "none", fontSize: "0.9rem",
              background: '#F9F8F3', color: 'var(--primary-dark)', fontWeight: '600'
            }} 
          />
        </div>
      </div>

      {/* 4. CONTENIDO PRINCIPAL: SIDEBAR + MAPA */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Sidebar (Lista) */}
        <aside style={{ 
          width: isMobile ? '100%' : '35%', 
          height: '100%',
          borderRight: isMobile ? 'none' : "1px solid var(--border)", 
          background: "white", 
          overflowY: "auto",
          padding: '1.5rem',
          display: isMobile && activeView !== 'list' ? 'none' : 'block'
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
            {filteredMerchants.length} resultados encontrados
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredMerchants.map(m => (
              <SlimCard key={m.id} merchant={m} onClick={() => handleMerchantSelect(m)} isActive={selectedMerchant?.id === m.id} />
            ))}
          </div>
        </aside>

        {/* Mapa */}
        <section style={{ 
          flex: 1, 
          position: "relative",
          height: '100%',
          display: isMobile && activeView !== 'map' ? 'none' : 'block'
        }}>
          <MapComponent 
            providers={filteredMerchants.map(m => ({
              ...m,
              location_lat: m.locations?.[0]?.lat || -34.4586,
              location_lng: m.locations?.[0]?.lng || -58.9142,
              is_exact_location: true,
              city_zone: m.locations?.[0]?.locality
            }))} 
            center={[-34.4586, -58.9142]} 
            zoom={11}
          />
        </section>
      </div>

      {/* Selector Flotante Móvil (Mapa / Lista) */}
      {isMobile && !selectedMerchant && (
        <div style={{ 
          position: 'fixed', 
          bottom: '24px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          zIndex: 2000,
          background: 'var(--primary-dark)',
          padding: '4px',
          borderRadius: '24px',
          display: 'flex',
          gap: '4px',
          boxShadow: '0 8px 32px rgba(63, 82, 50, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <button 
            onClick={() => setActiveView('list')}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '20px', 
              border: 'none', 
              background: activeView === 'list' ? 'var(--primary)' : 'transparent',
              color: 'white',
              fontWeight: '800',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            <List size={18} /> Lista
          </button>
          <button 
            onClick={() => setActiveView('map')}
            style={{ 
              padding: '10px 20px', 
              borderRadius: '20px', 
              border: 'none', 
              background: activeView === 'map' ? 'var(--primary)' : 'transparent',
              color: 'white',
              fontWeight: '800',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s'
            }}
          >
            <MapIcon size={18} /> Mapa
          </button>
        </div>
      )}

      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant} 
          isLoggedIn={isLoggedIn}
          onClose={() => setSelectedMerchant(null)} 
          trackClick={trackClick}
          onValidate={handleValidate}
          isMobile={isMobile}
        />
      )}

      <style jsx>{` 
        @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } 
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

function SlimCard({ merchant, onClick, isActive }: { merchant: Merchant, onClick: () => void, isActive: boolean }) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '0.8rem 1rem', borderRadius: '16px', background: 'white', cursor: 'pointer',
        border: isActive ? '2px solid var(--primary)' : '1px solid #eee', boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--primary-dark)' }}>{merchant.name}</h3>
        <CheckCircle2 size={13} color="var(--primary)" />
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{merchant.bio_short}</p>
      <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--soft-leaf)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <MapPin size={10} /> {merchant.locations?.[0]?.locality || 'Zona Norte'}
      </div>
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, onClose, trackClick, onValidate, isMobile }: { 
    merchant: Merchant, 
    isLoggedIn: boolean, 
    onClose: () => void, 
    trackClick: (eventName: string, params?: Record<string, unknown>) => void, 
    onValidate: (id: string) => void,
    isMobile: boolean
}) {
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
    <div style={{ 
      position: 'absolute', top: 0, right: 0, width: isMobile ? '100%' : '420px', height: '100%', 
      background: 'white', boxShadow: '0 0 40px rgba(0,0,0,0.1)', zIndex: 3000, 
      display: 'flex', flexDirection: 'column', 
      animation: isMobile ? 'slideUp 0.3s ease-out' : 'slideIn 0.3s ease-out'
    }}>
      <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--primary-dark)' }}>{merchant.name}</h2>
        <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}><X size={20} /></button>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ 
          padding: '1.5rem',
          filter: !isLoggedIn ? 'blur(8px)' : 'none',
          opacity: !isLoggedIn ? 0.6 : 1,
        }}>
          <div style={{ 
            width: '100%', height: '180px', 
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
            borderRadius: '20px', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', 
            alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <Leaf size={48} strokeWidth={1} />
            <span style={{ fontSize: '0.6rem', fontWeight: '900', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Alimnet Proyect</span>
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

          <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '0.4rem', fontWeight: '900' }}>Historia</h4>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{merchant.bio_long || merchant.bio_short}</p>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--soft-leaf)', marginBottom: '0.6rem', fontWeight: '900' }}>Logística</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Store size={14} color="var(--primary)" />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><span style={{ fontWeight: '800' }}>Horarios:</span> {merchant.working_hours || "Consultar."}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={14} color="var(--primary)" />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><span style={{ fontWeight: '800' }}>Zona:</span> {merchant.delivery_info || "Consultar alcance."}</p>
              </div>
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'var(--primary-dark)', borderRadius: '16px', color: 'white' }}>
            <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: '900', opacity: 0.8 }}>¿Cómo pedir?</h4>
            <p style={{ fontSize: '0.8rem' }}>{merchant.order_instructions || "Contactar directamente para consultar catálogo."}</p>
          </div>
        </div>

        {/* Contacto */}
        <div style={{ 
          padding: '1.5rem', borderTop: '1px solid #eee', marginTop: 'auto',
          filter: !isLoggedIn ? 'blur(8px)' : 'none',
          opacity: !isLoggedIn ? 0.5 : 1,
        }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <a 
              href={merchant.instagram_url || '#'} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: '0.8rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Instagram size={18} /> Instagram
            </a>
            <a 
              href={merchant.website_url || '#'} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, padding: '0.8rem', background: 'white', color: 'var(--primary-dark)', borderRadius: '12px', textAlign: 'center', fontWeight: '900', border: '1.5px solid var(--border)' }}
            >
              Web
            </a>
          </div>
          <a 
            href={merchant.whatsapp ? `https://wa.me/${merchant.whatsapp}` : '#'} target="_blank" rel="noopener noreferrer"
            style={{ width: '100%', padding: '0.8rem', background: '#25D366', color: 'white', borderRadius: '12px', textAlign: 'center', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
          >
            WhatsApp de Pedidos
          </a>
        </div>

        {!isLoggedIn && (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(4px)'
          }}>
             <div style={{ 
               padding: '2rem', textAlign: 'center', width: '90%', background: 'white', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)'
             }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem' }}>Sumate a la red</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Para ver los datos de contacto y realizar pedidos, necesitás ingresar a la comunidad.</p>
                <button onClick={() => window.location.href = '/login'} className="button button-primary" style={{ width: '100%', borderRadius: '14px', marginBottom: '10px' }}>Entrar con Gmail</button>
                <button onClick={() => window.location.href = '/registro'} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}>Crear cuenta</button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
