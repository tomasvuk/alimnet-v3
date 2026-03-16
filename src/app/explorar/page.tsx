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
  List,
  Menu
} from 'lucide-react';

// Carga dinámica del mapa
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

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: (props: any) => <Leaf {...props} /> },
  { id: 'almacen', label: 'Proveedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const CATEGORIES_TAGS = [
  'Agroecológico', 'Orgánico', 'Biodinámico', 'De Pastura', 'Libre de Gluten', 'Libre de Azúcar', 'Vegano', 'Vegetariano', 'Otros'
];

export default function ExplorarPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'almacen', 'restaurante', 'chef']);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFoodDropdown, setShowFoodDropdown] = useState(false);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState<string[]>([]);
  const [activeView, setActiveView] = useState<'list' | 'map'>('list');

  // Load Data
  useEffect(() => {
    async function loadMerchants() {
      setLoading(true);
      const { data, error } = await supabase
        .from('merchants')
        .select('*, locations(*)')
        .eq('status', 'active');

      if (!error && data) {
        setMerchants(data);
        setFilteredMerchants(data);
      }
      setLoading(false);
    }
    loadMerchants();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = merchants.filter(m => selectedCategories.includes(m.type.toLowerCase()));
    
    if (selectedFoodTypes.length > 0) {
      result = result.filter(m => m.tags?.some(t => selectedFoodTypes.includes(t)));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.locations?.some(l => l.locality.toLowerCase().includes(q))
      );
    }
    
    setFilteredMerchants(result);
  }, [selectedCategories, selectedFoodTypes, merchants, searchQuery]);

  const handleValidate = async (merchantId: string) => {
    const currentMerchant = merchants.find(m => m.id === merchantId);
    if (!currentMerchant) return;
    
    const newCount = (currentMerchant.validation_count || 0) + 1;
    await supabase.from('merchants').update({ validation_count: newCount }).eq('id', merchantId);
    await supabase.from('validations').insert([{ merchant_id: merchantId }]);
    
    setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, validation_count: newCount } : m));
    if (selectedMerchant?.id === merchantId) {
      setSelectedMerchant({ ...selectedMerchant, validation_count: newCount });
    }
  };

  return (
    <div className="explorar-container">
      {/* 1. Header Responsivo */}
      <header className="explorar-header">
        <div className="logo" onClick={() => window.location.href = '/'}>
          <Leaf size={24} fill="var(--primary)" fillOpacity={0.2} />
          <span>ALIMNET</span>
        </div>
        
        <div className="header-actions">
          {!isLoggedIn && (
            <button className="simular-btn" onClick={() => setIsLoggedIn(true)}>
              Test
            </button>
          )}
          <button className="join-btn" onClick={() => window.location.href = '/unirse'}>
            <Heart size={14} fill="white" /> <span>Sumar proyecto</span>
          </button>
        </div>
      </header>

      {/* 2. Barra de Filtros */}
      <div className="filter-toolbar">
        <div className="categories-scroll">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              className={`cat-btn ${selectedCategories.includes(cat.id) ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategories(prev => 
                  prev.includes(cat.id) ? prev.filter(c => c !== cat.id) : [...prev, cat.id]
                );
              }}
            >
              <cat.icon size={16} /> {cat.label}
            </button>
          ))}
        </div>
        
        <div className="food-types-filter">
          <button className="food-btn" onClick={() => setShowFoodDropdown(!showFoodDropdown)}>
            <Filter size={16} /> <span>Tipos</span> <ChevronDown size={14} />
          </button>
          
          {showFoodDropdown && (
            <div className="dropdown-menu">
              {CATEGORIES_TAGS.map(tag => (
                <label key={tag} className="dropdown-item">
                  <input 
                    type="checkbox" 
                    checked={selectedFoodTypes.includes(tag)}
                    onChange={(e) => {
                      setSelectedFoodTypes(prev => 
                        e.target.checked ? [...prev, tag] : prev.filter(t => t !== tag)
                      );
                    }}
                  />
                  {tag}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Búsqueda */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por productor o zona..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 4. Split Content (Diferente en Mobile/Desktop vía CSS) */}
      <div className={`main-content ${activeView}`}>
        {/* Sidebar (Lista) */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>{loading ? 'Cargando...' : `${filteredMerchants.length} resultados`}</h3>
          </div>
          <div className="merchants-list">
            {filteredMerchants.map(m => (
              <MerchantCard 
                key={m.id} 
                merchant={m} 
                isActive={selectedMerchant?.id === m.id}
                onClick={() => setSelectedMerchant(m)} 
              />
            ))}
          </div>
        </aside>

        {/* Mapa */}
        <section className="map-section">
          <MapComponent 
            providers={filteredMerchants.map(m => ({
              ...m,
              location_lat: m.locations?.[0]?.lat || -34.45,
              location_lng: m.locations?.[0]?.lng || -58.91,
              is_exact_location: true,
              city_zone: m.locations?.[0]?.locality
            }))}
            center={[-34.45, -58.91]}
            zoom={11}
          />
        </section>
      </div>

      {/* Selector Flotante (Solo Mobile) */}
      <div className="view-selector-floating">
        <button className={activeView === 'list' ? 'active' : ''} onClick={() => setActiveView('list')}>
          <List size={18} /> Lista
        </button>
        <button className={activeView === 'map' ? 'active' : ''} onClick={() => setActiveView('map')}>
          <MapIcon size={18} /> Mapa
        </button>
      </div>

      {/* Detalle del Mercante */}
      {selectedMerchant && (
        <DetailOverlay 
          merchant={selectedMerchant} 
          isLoggedIn={isLoggedIn}
          onClose={() => setSelectedMerchant(null)} 
          onValidate={handleValidate}
        />
      )}

      {/* ESTILOS SCOPED PARA FIXAR MOBILE-FIRST */}
      <style jsx>{`
        .explorar-container { height: 100vh; display: flex; flexDirection: column; background: #F4F1E6; overflow: hidden; }
        
        .explorar-header { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1rem; background: white; border-bottom: 1px solid #eee; }
        .logo { display: flex; align-items: center; gap: 8px; font-weight: 950; color: var(--primary-dark); cursor: pointer; }
        .header-actions { display: flex; gap: 8px; align-items: center; }
        
        .simular-btn { border: 1.5px solid var(--primary); color: var(--primary); background: white; padding: 0.4rem 0.8rem; border-radius: 10px; font-weight: 800; font-size: 0.75rem; cursor: pointer; }
        .join-btn { background: var(--primary); color: white; border: none; padding: 0.5rem 0.8rem; border-radius: 10px; font-weight: 800; font-size: 0.75rem; display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .join-btn span { display: none; }
        @media (min-width: 768px) { .join-btn span { display: inline; } .explorar-header { padding: 1rem 2rem; } }

        .filter-toolbar { display: flex; gap: 10px; padding: 0.6rem 1rem; background: white; border-bottom: 1px solid #eee; }
        .categories-scroll { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; flex: 1; }
        .categories-scroll::-webkit-scrollbar { display: none; }
        .cat-btn { display: flex; align-items: center; gap: 6px; padding: 0.5rem 1rem; border-radius: 12px; border: 1px solid #f0f0f0; background: #f9f9f9; color: #666; font-size: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap; }
        .cat-btn.active { background: var(--primary-dark); color: white; border-color: var(--primary-dark); }
        
        .food-btn { display: flex; align-items: center; gap: 6px; padding: 0.5rem 0.8rem; border-radius: 12px; border: 1.5px solid #eee; background: white; font-size: 0.75rem; font-weight: 800; cursor: pointer; }
        .food-types-filter { position: relative; }
        .dropdown-menu { position: absolute; top: 120%; right: 0; width: 220px; background: white; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 1rem; z-index: 1000; }
        .dropdown-item { display: flex; align-items: center; gap: 10px; padding: 0.4rem 0; cursor: pointer; font-size: 0.85rem; font-weight: 600; }

        .search-bar-container { padding: 0.8rem 1rem; background: white; border-bottom: 1px solid #eee; }
        .search-input-wrapper { position: relative; width: 100%; }
        .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #999; }
        .search-input-wrapper input { width: 100%; padding: 0.7rem 1rem 0.7rem 2.8rem; border-radius: 12px; border: 1.5px solid #f0f0f0; background: #f9f8f3; font-size: 0.9rem; outline: none; font-weight: 600; }

        .main-content { flex: 1; display: flex; overflow: hidden; position: relative; }
        /* Control de vista en Mobile */
        @media (max-width: 1023px) {
          .main-content.list .map-section { display: none; }
          .main-content.map .sidebar { display: none; }
          .sidebar, .map-section { width: 100%; height: 100%; }
        }
        @media (min-width: 1024px) {
          .sidebar { width: 350px; border-right: 1px solid #eee; }
          .map-section { flex: 1; }
        }

        .sidebar { background: white; display: flex; flexDirection: column; overflow: hidden; }
        .sidebar-header { padding: 1rem; border-bottom: 1px solid #f9f9f9; }
        .sidebar-header h3 { font-size: 0.9rem; color: var(--primary-dark); font-weight: 900; }
        .merchants-list { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flexDirection: column; gap: 12px; }

        .view-selector-floating { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--primary-dark); padding: 4px; border-radius: 20px; display: flex; gap: 4px; box-shadow: 0 8px 30px rgba(0,0,0,0.3); z-index: 500; }
        .view-selector-floating button { padding: 8px 20px; border-radius: 16px; border: none; background: transparent; color: white; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .view-selector-floating button.active { background: var(--primary); }
        @media (min-width: 1024px) { .view-selector-floating { display: none; } }

        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        /* Detail Overlay */
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000; animation: fadeIn 0.3s; }
        .panel { position: absolute; bottom: 0; left: 0; width: 100%; height: 90%; background: white; border-radius: 30px 30px 0 0; display: flex; flexDirection: column; animation: slideUp 0.3s; }
        @media (min-width: 768px) {
          .panel { width: 450px; height: 100%; right: 0; left: auto; border-radius: 0; }
        }
      `}</style>
    </div>
  );
}

function MerchantCard({ merchant, isActive, onClick }: { merchant: Merchant, isActive: boolean, onClick: () => void }) {
  return (
    <div 
      className={`card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      style={{
        padding: '1rem', borderRadius: '16px', border: isActive ? '2px solid var(--primary)' : '1px solid #eee',
        background: 'white', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '950', color: 'var(--primary-dark)', margin: 0 }}>{merchant.name}</h4>
          <p style={{ fontSize: '0.75rem', color: '#777', margin: '4px 0', lineBreak: 'anywhere' }}>{merchant.bio_short}</p>
        </div>
        <CheckCircle2 size={16} color="var(--primary)" />
      </div>
      <div style={{ marginTop: '8px', fontSize: '0.7rem', fontWeight: '800', color: 'var(--soft-leaf)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <MapPin size={10} /> {merchant.locations?.[0]?.locality || 'Zona Norte'}
      </div>
    </div>
  );
}

function DetailOverlay({ merchant, isLoggedIn, onClose, onValidate }: { merchant: Merchant, isLoggedIn: boolean, onClose: () => void, onValidate: (id: string) => void }) {
  const [valCount, setValCount] = useState(merchant.validation_count);
  const [hasValidated, setHasValidated] = useState(false);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel" onClick={e => e.stopPropagation()}>
        <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '950', color: 'var(--primary-dark)' }}>{merchant.name}</h2>
          <button onClick={onClose} style={{ background: '#f5f5f5', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer' }}><X size={20} /></button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <div style={{ 
            width: '100%', height: '180px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)', 
            borderRadius: '20px', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' 
          }}>
            <Leaf size={48} />
            <span style={{ fontSize: '0.65rem', fontWeight: '900', marginTop: '10px' }}>PROYECTO VALIDADO</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <span style={{ padding: '0.4rem 0.8rem', background: '#f0f0f0', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800' }}>{merchant.type}</span>
            <span style={{ padding: '0.4rem 0.8rem', background: '#f0f0f0', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800' }}>{valCount} validaciones</span>
          </div>

          <button 
            disabled={hasValidated}
            onClick={() => { setValCount(valCount + 1); setHasValidated(true); onValidate(merchant.id); }}
            style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: 'none', background: hasValidated ? '#f0f0f0' : 'var(--primary)', color: hasValidated ? '#999' : 'white', fontWeight: '900', cursor: 'pointer', marginBottom: '2rem' }}
          >
            {hasValidated ? '¡Gracias por validar!' : 'Validar este productor'}
          </button>

          <h4 style={{ fontSize: '0.75rem', fontWeight: '900', color: '#999', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Sobre nosotros</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>{merchant.bio_long || merchant.bio_short}</p>
          
          <div style={{ marginTop: '2rem', padding: '1.2rem', background: '#f9f8f3', borderRadius: '20px', border: '1px solid #eee' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: '900', marginBottom: '0.5rem' }}>¿Cómo pedir?</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>{merchant.order_instructions || "Contactar directamente vía Instagram o WhatsApp para hacernos tu pedido."}</p>
          </div>
        </div>

        {/* Contacto Flotando al Fondo (Diferente si no está logueado) */}
        {!isLoggedIn ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: '#F4F1E6', borderTop: '1px solid #eee' }}>
            <h4 style={{ fontSize: '1.1rem', fontWeight: '950', marginBottom: '0.5rem' }}>Sumate a la red para contactarlo</h4>
            <button onClick={() => window.location.href='/login'} className="simular-btn" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>Ingresar con Gmail</button>
          </div>
        ) : (
          <div style={{ padding: '1.2rem', display: 'flex', gap: '10px', background: 'white', borderTop: '1px solid #eee' }}>
            <a href={merchant.instagram_url} className="cat-btn active" style={{ flex: 1, textDecoration: 'none', border: 'none', justifyContent: 'center' }}><Instagram size={18} /> Instagram</a>
            <a href={`https://wa.me/${merchant.whatsapp}`} className="cat-btn" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center' }}>WhatsApp</a>
          </div>
        )}
      </div>
    </div>
  );
}
