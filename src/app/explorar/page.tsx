'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, Filter, Star, ChevronDown, Check, X, 
  ChevronRight, Info, Shield, Map as MapIcon, List,
  Menu, User, LogOut, Heart, Settings, Bell, 
  Trash2, ExternalLink, ArrowRight, Instagram, Linkedin,
  ChevronLeft, LayoutGrid, Clock, Package, Truck, ArrowUpRight,
  Leaf, LogIn, UserCircle, Navigation, CheckCircle, Wheat,
  Sprout, Milk, Beef, Coffee, Sun, CloudSun, Store, ChefHat,
  UtensilsCrossed
} from 'lucide-react';

// Carga dinámica del mapa
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div>
});

const normalizeString = (str: string) => {
  return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

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

const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
    <path d="M6 14v8h1v-8H6zM18 14v8h-1v-8h1z" fill="currentColor" opacity="0.5" />
    <path d="M5 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: ProductorIcon },
  { id: 'abastecedor', label: 'Abastecedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const PRODUCT_OPTIONS = ['Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'];

const ADVANCED_CATEGORIES = {
  modalidad: { label: 'Cómo querés recibir', options: ['Retiro en local', 'Entrega a domicilio', 'Retiro y Entrega'] },
  alimentacion: { label: 'Tipo de alimentación', options: ['Sin gluten', 'Sin azúcar', 'Sin lactosa', 'Keto', 'Vegetariano', 'Plant-based'] },
  calidad: { label: 'Calidad y Producción', options: ['Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sin ultraprocesados', 'Sustentable', 'Pastura'] },
  animal: { label: 'Producción Animal', options: ['Pastura', 'Grass-fed', 'Bienestar animal'] },
  certificaciones: { label: 'Certificaciones / asociaciones', options: ['Demeter', 'AABDA', 'Orgánico Certificado'] },
  tipo: { label: 'Tipo de actor', options: ['Productor', 'Abastecedor', 'Restaurante', 'Chef'] },
  productos: { label: '¿Qué estás buscando?', options: PRODUCT_OPTIONS },
};

export default function ExplorarPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [validatedMerchantIds, setValidatedMerchantIds] = useState<Set<string>>(new Set());
  const [searchMode, setSearchMode] = useState<'perfil' | 'libre'>('perfil');
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'abastecedor', 'restaurante', 'chef']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Productor', 'Abastecedor', 'Restaurante', 'Chef']);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list'); 
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Header Visibility States (Mobile)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isRolesVisible, setIsRolesVisible] = useState(true);
  const [isPillsVisible, setIsPillsVisible] = useState(true);
  
  const resultsRef = useRef<HTMLElement>(null);
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const cumulativeSwipe = useRef<number>(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auth & Profile Fetch
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        
        // Cargar Perfil
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setUserProfile(profile);
          if (profile.locality && searchMode === 'perfil') setSearchLocation(profile.locality);
          
          // Cargar Validaciones realizadas por este usuario
          const { data: vData } = await supabase
            .from('validations')
            .select('merchant_id')
            .eq('user_id', user.id);
          
          if (vData) setValidatedMerchantIds(new Set(vData.map(v => v.merchant_id)));
        }
      }
    };
    checkAuth();
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchMerchants = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('merchants').select('*, locations(*)').eq('status', 'active');
      if (data) setMerchants(data);
      setLoading(false);
    };
    fetchMerchants();
  }, []);

  // Filtering Logic
  useEffect(() => {
    let result = merchants.filter(m => selectedCategories.includes((m.type || '').toLowerCase()));

    if (searchLocation.trim().length > 0) {
      const loc = normalizeString(searchLocation);
      result = result.filter(m => m.locations?.some(l => normalizeString(l.locality).includes(loc)));
    }

    const tagsToFilter = selectedFilters.filter(f => 
       !['Productor', 'Abastecedor', 'Restaurante', 'Chef'].includes(f)
    );

    if (tagsToFilter.length > 0) {
      result = result.filter(m => tagsToFilter.every(f => (m.tags || []).includes(f)));
    }

    setFilteredMerchants(result);
  }, [selectedCategories, selectedFilters, merchants, searchLocation]);

  const handleValidate = async (merchantId: string) => {
    if (!user) {
      alert("Debes iniciar sesión para validar proyectos.");
      window.location.href = '/login';
      return;
    }

    if (validatedMerchantIds.has(merchantId)) return;

    try {
      const { error: valError } = await supabase
        .from('validations')
        .insert([{ merchant_id: merchantId, user_id: user.id }]);

      if (valError) throw valError;

      const currentMerchant = merchants.find(m => m.id === merchantId);
      if (currentMerchant) {
        const newCount = (currentMerchant.validation_count || 0) + 1;
        await supabase.from('merchants').update({ validation_count: newCount }).eq('id', merchantId);
        
        setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
        setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, validation_count: newCount } : m));
        if (selectedMerchant?.id === merchantId) setSelectedMerchant({ ...selectedMerchant, validation_count: newCount });
      }
    } catch (e) {
      console.error("Error validando:", e);
    }
  };

  const toggleCategory = (id: string) => {
    const normId = id.toLowerCase();
    const isCurrentlySelected = selectedCategories.includes(normId);
    
    setSelectedCategories(prev => isCurrentlySelected ? prev.filter(c => c !== normId) : [...prev, normId]);
    
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    setSelectedFilters(prev => isCurrentlySelected ? prev.filter(f => f !== label) : [...prev, label]);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      
      {/* 1. HEADER */}
      <header style={{ 
        padding: "0.6rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F4F1E6", 
        height: '52px', borderBottom: '1px solid #ddd', zIndex: 1000, 
        position: 'relative'
      }}>
        <span onClick={() => window.location.href = '/'} style={{ fontSize: "1.1rem", fontWeight: "950", color: "#2D3A20", cursor: 'pointer' }}>ALIMNET</span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {isLoggedIn ? (
            <div onClick={() => window.location.href = '/mi-cuenta'} style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#5F7D4A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', cursor: 'pointer' }}>
               {userProfile?.first_name?.[0] || 'U'}
            </div>
          ) : (
            <button onClick={() => window.location.href = '/login'} style={{ background: '#2D3A20', color: 'white', padding: '6px 15px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800', border: 'none' }}>Entrar</button>
          )}
        </div>
      </header>

      {/* 2. BARRA DE BÚSQUEDA & FILTROS */}
      <div style={{ padding: '0.8rem 1rem', background: 'white', borderBottom: '1px solid #eee' }}>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input 
            type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)}
            placeholder="¿En qué zona buscás?" 
            style={{ width: '100%', padding: '0.8rem 0.8rem 0.8rem 2.5rem', borderRadius: '16px', border: '2px solid #F0F4ED', outline: 'none', fontWeight: '600' }}
          />
        </div>
      </div>

      {/* 3. ROLES (CATEGORÍAS) */}
      <div style={{ padding: '0.8rem 1rem', background: '#F8F9F5', display: 'flex', gap: '8px', overflowX: 'auto' }} className="no-scrollbar">
        {CATEGORIES.map(cat => {
          const active = selectedCategories.includes(cat.id);
          return (
            <button key={cat.id} onClick={() => toggleCategory(cat.id)} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: active ? '2px solid #5F7D4A' : '1px solid #ddd', background: active ? '#F0F4ED' : 'white', color: '#2D3A20', fontWeight: '800', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <cat.icon size={16} /> {cat.label}
            </button>
          );
        })}
        <button onClick={() => setShowAdvancedFilters(true)} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: '1px solid #ddd', background: 'white', color: '#2D3A20', fontWeight: '800' }}>+ Filtros</button>
      </div>

      {/* 4. CONTENIDO PRINCIPAL (LISTA/MAPA) */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* LISTA */}
        <section className="no-scrollbar" style={{ flex: mobileView === 'list' || !isMobile ? 1 : 0, overflowY: 'auto', padding: '1rem', background: 'white', display: mobileView === 'map' && isMobile ? 'none' : 'block' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
             <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#999', marginBottom: '1rem' }}>{filteredMerchants.length} locales encontrados</p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {filteredMerchants.map(m => (
                 <div key={m.id} onClick={() => setSelectedMerchant(m)} style={{ padding: '1rem', borderRadius: '24px', border: '1px solid #E4EBDD', cursor: 'pointer' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>{m.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: '800', color: '#5F7D4A', background: '#F0F4ED', padding: '2px 8px', borderRadius: '10px' }}>
                        <CheckCircle size={12} /> {m.validation_count || 0}
                      </div>
                   </div>
                   <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{m.bio_short}</p>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* MAPA */}
        <section style={{ flex: mobileView === 'map' || !isMobile ? 1.5 : 0, display: mobileView === 'list' && isMobile ? 'none' : 'block' }}>
          <MapComponent 
            merchants={filteredMerchants} 
            selectedId={selectedMerchant?.id} 
            onMerchantClick={(m) => setSelectedMerchant(m)}
          />
        </section>
      </div>

      {/* TOOGLE MÓVIL (MAPA/LISTA) */}
      {isMobile && (
        <button onClick={() => setMobileView(prev => prev === 'list' ? 'map' : 'list')} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#2D3A20', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: '900', zIndex: 1100, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
          {mobileView === 'list' ? <><MapIcon size={18} /> Ver Mapa</> : <><List size={18} /> Ver Lista</>}
        </button>
      )}

      {/* FICHA DETALLE */}
      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant} 
          isLoggedIn={isLoggedIn} 
          hasValidated={validatedMerchantIds.has(selectedMerchant.id)}
          onClose={() => setSelectedMerchant(null)} 
          onValidate={handleValidate}
        />
      )}

      {/* MODAL FILTROS */}
      {showAdvancedFilters && (
        <AdvancedFiltersModal 
          isOpen={showAdvancedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          selectedFilters={selectedFilters}
          toggleFilter={(f) => setSelectedFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])}
          clearAll={() => setSelectedFilters([])}
          resultCount={filteredMerchants.length}
        />
      )}
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, hasValidated, onClose, onValidate }: { merchant: Merchant, isLoggedIn: boolean, hasValidated: boolean, onClose: () => void, onValidate: (id: string) => void }) {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '420px', height: '100%', background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
      <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
        <h2 style={{ fontWeight: '950' }}>{merchant.name}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none' }}><X /></button>
      </div>
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <div style={{ background: 'linear-gradient(135deg, #5F7D4A, #2D3A20)', height: '180px', borderRadius: '20px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Leaf size={60} />
        </div>
        
        <div style={{ background: '#F8F9F5', padding: '1.2rem', borderRadius: '24px', marginBottom: '1.5rem', border: '1px solid #E4EBDD' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A' }}>VALIDACIÓN COMUNITARIA</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '900', color: '#2D3A20' }}>
               <CheckCircle size={18} color="#5F7D4A" /> {merchant.validation_count || 0}
            </div>
          </div>
          <button 
            onClick={() => onValidate(merchant.id)}
            disabled={hasValidated}
            style={{ 
              width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', 
              background: hasValidated ? '#F0F4ED' : '#5F7D4A', 
              color: hasValidated ? '#5F7D4A' : 'white', fontWeight: '900',
              cursor: hasValidated ? 'default' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            {hasValidated ? <><CheckCircle size={18} /> Proyecto Validado</> : <><Heart size={18} /> Validar Proyecto</>}
          </button>
          {hasValidated && <p style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '10px', color: '#6B7C5E', fontWeight: '700' }}>¡Gracias por validar la calidad de este proyecto!</p>}
        </div>

        <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '950', color: '#999', marginBottom: '0.5rem' }}>Bio y Propósito</h4>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#2D3A20' }}>{merchant.bio_long || merchant.bio_short}</p>
      </div>
    </div>
  );
}

function AdvancedFiltersModal({ isOpen, onClose, selectedFilters, toggleFilter, clearAll, resultCount }: any) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '80vh', borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
           <h2 style={{ fontWeight: '950' }}>Filtros Avanzados</h2>
           <button onClick={onClose}><X /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {Object.entries(ADVANCED_CATEGORIES).map(([key, section]) => (
            <div key={key} style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '1rem', color: '#5F7D4A' }}>{section.label}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {section.options.map(opt => (
                  <button key={opt} onClick={() => toggleFilter(opt)} style={{ padding: '0.6rem 1rem', borderRadius: '15px', border: selectedFilters.includes(opt) ? '2px solid #5F7D4A' : '1px solid #ddd', background: selectedFilters.includes(opt) ? '#F0F4ED' : 'white', fontSize: '0.8rem', fontWeight: '700' }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={clearAll} style={{ fontWeight: '800', color: '#999', textDecoration: 'underline' }}>Limpiar todos</button>
          <button onClick={onClose} style={{ background: '#5F7D4A', color: 'white', padding: '0.8rem 2rem', borderRadius: '15px', fontWeight: '900' }}>Ver {resultCount} resultados</button>
        </div>
      </div>
    </div>
  );
}
