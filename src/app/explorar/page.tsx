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
  UserCircle
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
      
      {/* 1. NAVBAR PREMIUM */}
      <header style={{ 
        padding: "0.8rem 2rem", 
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
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          {!isLoggedIn && (
            <button 
              onClick={() => setIsLoggedIn(true)}
              style={{ 
                color: "var(--primary)", fontWeight: "800", background: "white", 
                border: "1px solid var(--primary)", padding: "0.5rem 1rem", borderRadius: "12px", 
                cursor: "pointer", fontSize: "0.85rem" 
              }}
            >
              Simular Ingreso (Modo Test)
            </button>
          )}
          <button 
            style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', 
              fontWeight: '800', color: 'var(--primary)', background: 'rgba(95, 125, 74, 0.1)', 
              padding: '0.5rem 1rem', borderRadius: '12px', border: 'none', cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/unirse'}
          >
            <Heart size={14} fill="var(--primary)" /> Sumar mi comercio
          </button>
          <button 
            onClick={() => window.location.href = '/perfil'}
            style={{ color: "var(--text-secondary)", fontWeight: "750", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", fontSize: "0.85rem" }}
          >
            <UserCircle size={20} /> Mi Perfil
          </button>
        </div>
      </header>

      {/* 2. SUB-TOOLBAR */}
      <div style={{ 
        padding: '1.5rem 2rem', 
        background: 'white', 
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 500
      }}>
        {merchants.length === 0 && !loading && (
          <div style={{ padding: '12px', background: '#FFF4F4', color: '#D32F2F', borderRadius: '16px', fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center', border: '1px solid #FFCDD2', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>⚠️ No se detectan comerciantes. Esto suele pasar si las variables de Supabase no están configuradas en Vercel.</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>URL actual: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurada'}</div>
            <button 
              onClick={getActiveMerchants} 
              style={{ alignSelf: 'center', padding: '4px 12px', borderRadius: '8px', border: '1px solid currentColor', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              Reintentar conexión
            </button>
          </div>
        )}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          
          <div style={{ display: 'flex', gap: '8px', background: '#F8F9F5', padding: '4px', borderRadius: '16px', border: '1px solid #eee', alignItems: 'center' }}>
            <button 
              onClick={() => {
                const allIds = CATEGORIES.map(c => c.id);
                if (selectedCategories.length === allIds.length) {
                  setSelectedCategories([]);
                } else {
                  setSelectedCategories(allIds);
                }
              }}
              style={{
                padding: '0.6rem 1rem',
                fontSize: '0.75rem',
                fontWeight: '900',
                borderRadius: '12px',
                cursor: 'pointer',
                border: 'none',
                background: selectedCategories.length === CATEGORIES.length ? '#1B2414' : '#E0E4D9', // Más oscuro cuando está activo, más grisáceo cuando no
                color: selectedCategories.length === CATEGORIES.length ? 'white' : 'var(--text-secondary)',
                transition: 'all 0.2s',
                boxShadow: 'var(--shadow-sm)',
                marginRight: '4px'
              }}
            >
              {selectedCategories.length === CATEGORIES.length ? 'Deseleccionar todos' : 'Todos'}
            </button>
            <div style={{ width: '1px', height: '20px', background: '#ddd' }}></div>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategories.includes(cat.id);
              return (
                <button 
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    padding: '0.6rem 1.2rem',
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
                    boxShadow: isActive ? '0 4px 12px rgba(63, 82, 50, 0.2)' : 'none',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                    opacity: isActive ? 1 : 0.8
                  }}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div style={{ width: '1px', height: '30px', background: '#eee' }}></div>

          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowFoodDropdown(!showFoodDropdown)}
              style={{
                padding: '0.7rem 1.2rem', borderRadius: '12px', border: '1px solid var(--border)',
                background: 'white', fontSize: '0.85rem', fontWeight: '800', display: 'flex', gap: '8px', cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)', color: 'var(--primary-dark)'
              }}
            >
              <Filter size={16} /> Tipos de Alimento <ChevronDown size={14} />
            </button>
            
            {showFoodDropdown && (
              <div style={{ 
                position: 'absolute', top: '110%', left: 0, width: '250px', 
                background: 'white', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.12)', 
                border: '1px solid var(--border)', padding: '1rem', zIndex: 2000,
                display: 'flex', flexDirection: 'column', gap: '4px'
              }}>
                <button 
                  onClick={() => {
                    if (selectedFoodTypes.length === CATEGORIES_TAGS.length) {
                      setSelectedFoodTypes([]);
                    } else {
                      setSelectedFoodTypes([...CATEGORIES_TAGS]);
                    }
                  }}
                  style={{
                    width: '100%', padding: '0.6rem', background: '#F0F4ED', border: 'none',
                    borderRadius: '10px', fontSize: '0.8rem', fontWeight: '900', color: 'var(--primary-dark)',
                    cursor: 'pointer', marginBottom: '8px', textAlign: 'center'
                  }}
                >
                  {selectedFoodTypes.length === CATEGORIES_TAGS.length ? 'Deseleccionar todos' : 'Seleccionar todos'}
                </button>
                <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
                  {CATEGORIES_TAGS.map(type => (
                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.6rem 0.5rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', borderRadius: '8px', transition: 'background 0.2s' }} className="dropdown-item">
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
              </div>
            )}
          </div>

          <div style={{ position: 'relative', width: '250px' }}>
            <input 
              type="text" placeholder="Localidad o zona..." value={searchLocation} 
              onChange={(e) => setSearchLocation(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem 0.7rem 2.8rem', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '0.9rem', outline: 'none' }} 
            />
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={18} />
          </div>

          <button 
            className="button button-primary" 
            style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', fontWeight: '900', fontSize: '0.85rem' }}
            onClick={() => trackClick('SEARCH_EXECUTE_INTENT', { location: searchLocation, categories: selectedCategories, food_types: selectedFoodTypes })}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* 3. SPLIT CONTENT */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <aside style={{ width: '35%', overflowY: 'auto', padding: '1.5rem', background: 'transparent' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>
            {filteredMerchants.length} resultados en Zona Norte
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredMerchants.map(m => (
              <SlimCard key={m.id} merchant={m} onClick={() => handleMerchantSelect(m)} isActive={selectedMerchant?.id === m.id} />
            ))}
          </div>
        </aside>

        <section style={{ flex: 1, position: 'relative' }}>
          <MapComponent 
            providers={(filteredMerchants.length > 0 ? filteredMerchants : (merchants.length > 0 ? merchants : [])).map(m => ({
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
        </section>
      </div>

      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant} 
          isLoggedIn={isLoggedIn}
          onClose={() => setSelectedMerchant(null)} 
          trackClick={trackClick}
          onValidate={handleValidate}
        />
      )}
    </div>
  );
}

function SlimCard({ merchant, onClick, isActive }: { merchant: Merchant, onClick: () => void, isActive: boolean }) {
  return (
    <div 
      onClick={onClick}
      style={{
        padding: '0.8rem 1rem', borderRadius: '16px', background: 'white', cursor: 'pointer',
        border: isActive ? '2px solid var(--primary)' : '1px solid white', boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--primary-dark)' }}>{merchant.name}</h3>
        <CheckCircle2 size={13} color="var(--primary)" />
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0' }}>{merchant.bio_short}</p>
      <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--soft-leaf)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <MapPin size={10} /> {merchant.locations?.[0]?.locality}
      </div>
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
    <div style={{ 
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

      <style jsx>{` @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } } `}</style>
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
