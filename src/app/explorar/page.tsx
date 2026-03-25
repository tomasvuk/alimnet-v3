'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { 
  Leaf,
  LogIn,
  UserCircle,
  Map as MapIcon,
  Search as SearchIcon,
  ChevronDown,
  Navigation,
  CheckCircle,
  Wheat,
  Sprout,
  Milk,
  Beef,
  Coffee,
  Sun,
  CloudSun,
  X,
  Store,
  ChefHat,
  UtensilsCrossed,
  MapPin,
  Heart,
  Instagram,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Shield,
  ShieldCheck,
  User,
  Filter,
  Lock,
  Menu
} from 'lucide-react';
import Header from '@/components/Header';
import { 
  OFFICIAL_CATEGORIES, 
  PRODUCTION_ADN_OPTIONS, 
  DIETARY_OPTIONS,
  DELIVERY_PREFERENCES 
} from '@/lib/constants';

// Carga dinámica del mapa para evitar error "window is not defined" en SSR
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando mapa...</div>
});

const normalizeString = (str: string) => {
  return str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
};

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

// --- ICONOGRAFÍA PERSONALIZADA (Inspirada en las imágenes del usuario) ---
const ProductorIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM15.89 8.11C15.5 7.72 14.83 7 13.53 7h-3.06c-1.3 0-1.97.72-2.36 1.11L4 12.25V15h2v-2h1v9h2v-5h2v5h2v-9h1v2h2v-2.75l-4.11-4.14z" fill="currentColor" />
    <path d="M6 14v8h1v-8H6zM18 14v8h-1v-8h1z" fill="currentColor" opacity="0.5" />
    <path d="M5 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const AgroecologicoIcon = ({ size = 16 }: { size?: number }) => <Sprout size={size} />;
const OrganicoIcon = ({ size = 16 }: { size?: number }) => <Sun size={size} />;
const BiodinamicoIcon = ({ size = 16 }: { size?: number }) => <CloudSun size={size} />;
const PasturaIcon = ({ size = 16 }: { size?: number }) => <Wheat size={size} />;

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: ProductorIcon },
  { id: 'abastecedor', label: 'Abastecedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const ADVANCED_CATEGORIES = {
  modalidad: { label: 'Cómo querés recibir', options: DELIVERY_PREFERENCES },
  alimentacion: { label: 'Tipo de alimentación', options: DIETARY_OPTIONS },
  calidad: { label: 'Calidad y Producción', options: PRODUCTION_ADN_OPTIONS },
  animal: { label: 'Producción Animal', options: ['Pastura', 'Grass-fed', 'Bienestar animal'] },
  certificaciones: { label: 'Certificaciones / asociaciones', options: ['Demeter', 'AABDA', 'Orgánico Certificado'] },
  tipo: { label: 'Tipo de actor', options: ['Productor', 'Abastecedor', 'Restaurante', 'Chef'] },
  productos: { label: '¿Qué estás buscando?', options: OFFICIAL_CATEGORIES },
};
const PRODUCT_OPTIONS = OFFICIAL_CATEGORIES;

function AdvancedFiltersModal({ isOpen, onClose, selectedFilters, toggleFilter, clearAll, resultCount }: { isOpen: boolean, onClose: () => void, selectedFilters: string[], toggleFilter: (f:string)=>void, clearAll: ()=>void, resultCount: number }) {
  // --- Soporte para tecla ESC ---
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isPlantBased = selectedFilters.includes('Plant-based') || selectedFilters.includes('Vegetariano');

  const renderSection = (key: keyof typeof ADVANCED_CATEGORIES) => {
    const section = ADVANCED_CATEGORIES[key];
    const isLast = key === 'productos';
    return (
      <div key={key} style={{ padding: '2.2rem 0', borderBottom: isLast ? 'none' : '4px solid #eee' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2D3A20', marginBottom: '1.5rem', letterSpacing: '-0.02em', opacity: 0.9 }}>{section.label}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {section.options.map((opt) => {
            const isCategory = section.label === 'Tipo de actor';
            const isActive = isCategory 
              ? selectedFilters.some(f => f.toLowerCase() === opt.toLowerCase())
              : selectedFilters.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => toggleFilter(opt)}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0.9rem 1.4rem', cursor: 'pointer', borderRadius: '30px',
                  border: '1.5px solid ' + (isActive ? '#3F5232' : 'transparent'),
                  background: isActive ? '#5F7D4A' : '#F0F4ED',
                  color: isActive ? 'white' : '#3F5232',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  fontSize: '0.85rem', fontWeight: '800', textAlign: 'center',
                  width: 'auto', minWidth: 'fit-content'
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        onClick={onClose} 
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 3000, backdropFilter: 'blur(3px)' }} 
      />
      <div 
        onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        tabIndex={0}
        ref={(el) => { if (el && isOpen) el.focus(); }} // Fuerza el foco al abrir
        style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '94%', maxWidth: '780px', height: '85vh', background: 'white', borderRadius: '32px',
        zIndex: 3001, display: 'flex', flexDirection: 'column', boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
        overflow: 'hidden', outline: 'none'
      }}>
        <div style={{ padding: '1.2rem 2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2D3A20', display: 'flex', padding: '8px' }}><X size={20} /></button>
          <h2 style={{ fontSize: '1rem', fontWeight: '950', color: '#2D3A20', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filtros</h2>
          <div style={{ width: '40px' }} />
        </div>
        
        <div style={{ padding: '0 2rem', overflowY: 'auto', flex: 1 }} className="no-scrollbar">
          {renderSection('modalidad')}
          {renderSection('alimentacion')}
          {renderSection('calidad')}
          {!isPlantBased && renderSection('animal')}
          {renderSection('certificaciones')}
          {renderSection('tipo')}
          {renderSection('productos')}
        </div>

        <div style={{ padding: '1.2rem 2rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}>
          <button 
            onClick={clearAll} 
            style={{ background: 'none', border: 'none', color: '#2D3A20', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Quitar todos
          </button>
          <button 
            onClick={onClose} 
            style={{ 
              background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '12px', 
              padding: '1rem 2.5rem', fontWeight: '950', fontSize: '0.9rem', cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(95, 125, 74, 0.2)', transition: 'all 0.2s'
            }}
          >
            Ver {resultCount} locales
          </button>
        </div>
      </div>
    </>
  );
}

// --- NUEVO LOGO PRO (EXACTO: ESFERA DE RED) ---
// (LOGO REMOVIDO POR PEDIDO DEL USUARIO - SE MANTIENE SOLO TEXTO)

export default function ExplorarPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'abastecedor', 'restaurante', 'chef']);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [validators, setValidators] = useState<any[]>([]);
  const [validatedMerchantIds, setValidatedMerchantIds] = useState<Set<string>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  
  // Sincronizar selectedFilters con selectedCategories para el Modal
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Productor', 'Abastecedor', 'Restaurante', 'Chef']);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [stickyFilters, setStickyFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'Retiro en local' | 'Entrega a domicilio'>('Retiro en local');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [isRolesVisible, setIsRolesVisible] = useState(true);
  const [isPillsVisible, setIsPillsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const resultsRef = React.useRef<HTMLElement>(null);
  const mapSectionRef = React.useRef<HTMLDivElement>(null);
  const touchStartY = React.useRef<number>(0);
  const cumulativeSwipe = React.useRef<number>(0);

  useEffect(() => {
    setHasMounted(true);
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        setUser(session.user);
        
        // 1. Perfil
        const { data: pData } = await supabase.from('profiles').select('*').eq('user_id', session.user.id).single();
        if (pData) {
          setUserProfile(pData);
          // --- INTELIGENCIA DE MAPA ALIMNET ---
          // 1. Centrar en localidad si existe
          if (pData.locality) {
            setSearchLocation(pData.locality);
          }
          
          // 2. Traducir y pre-activar filtros del Onboarding
          if (pData.dietary_preferences) {
            const prefs = pData.dietary_preferences.split(',').map((s: string) => s.trim());
            const newFilters = [...selectedFilters];
            
            const mapping: Record<string, string> = {
              'Plant Based': 'Plant-based',
              'Gluten Free': 'Sin gluten',
              'Sugar Free': 'Sin azúcar',
              'Pastura / Grass Fed': 'Pastura',
              'Orgánico / Agroecológico': 'Orgánico'
            };
            
            prefs.forEach((p: string) => {
              const mapped = mapping[p];
              if (mapped && !newFilters.includes(mapped)) {
                newFilters.push(mapped);
              }
            });
            setSelectedFilters(newFilters);
          }
        }
        // Validaciones del usuario
        const { data: vData } = await supabase.from('validations').select('merchant_id').eq('user_id', session.user.id);
        if (vData) setValidatedMerchantIds(new Set(vData.map(v => v.merchant_id)));

        // 2. ¿Es mercante?
        const { data: mData } = await supabase.from('merchants').select('id').eq('owner_id', session.user.id).single();
        if (mData) setIsMerchant(true);
      }
    };
    
    checkSession();
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchValidators = async (merchantId: string) => {
    try {
      const { data } = await supabase
        .from('validations')
        .select(`
          user_id,
          profiles (first_name)
        `)
        .eq('merchant_id', merchantId)
        .limit(3);
      setValidators(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (selectedMerchant) {
      fetchValidators(selectedMerchant.id);
    } else {
      setValidators([]);
    }
  }, [selectedMerchant]);

  useEffect(() => {
    if (!isMobile) return;
    const el = resultsRef.current;
    if (!el) return;
    let prevScrollTop = 0;

    const handleScroll = () => {
      const st = el.scrollTop;
      const goingDown = st > prevScrollTop && st > 10;
      const goingUp = st < prevScrollTop;

      if (goingDown) {
        // Scrolling DOWN (Swiping UP): hide filters only
        if (st > 30) setIsPillsVisible(false);
        if (st > 80) setIsRolesVisible(false);
      } else if (goingUp) {
        // Scrolling UP: restore everything
        setIsRolesVisible(true);
        setIsPillsVisible(true);
      }
      prevScrollTop = st;
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Touch-based swipe detection for mobile MAP view
  useEffect(() => {
    if (!isMobile) return;
    const el = mapSectionRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY; // positive = swiping up
      touchStartY.current = currentY;

      // Accumulate swipe distance
      if (deltaY > 0) {
        // Swiping UP → hide filters
        cumulativeSwipe.current = Math.min(cumulativeSwipe.current + deltaY, 200);
      } else {
        // Swiping DOWN → show filters
        cumulativeSwipe.current = Math.max(cumulativeSwipe.current + deltaY, 0);
      }

      const s = cumulativeSwipe.current;
      if (deltaY > 2) {
        // Swiping UP: hide filters only
        if (s > 20) setIsPillsVisible(false);
        if (s > 60) setIsRolesVisible(false);
      } else if (deltaY < -2) {
        // Swiping DOWN: restore all
        setIsRolesVisible(true);
        setIsPillsVisible(true);
        cumulativeSwipe.current = 0;
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, [isMobile]);

  // Desktop scroll (window-based for sticky shadows)
  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => setStickyFilters(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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
        if (data) filterData(data, selectedCategories, selectedFilters);
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

  // Efecto principal para reactividad de filtros y búsquedas
  useEffect(() => {
    let result = merchants.filter(m => selectedCategories.includes((m.type || '').toLowerCase()));

    // Filtrado por Búsqueda Libre (Nombre, Alimento, Lugar)
    if (searchQuery.trim().length > 0) {
      const q = normalizeString(searchQuery);
      result = result.filter(m => 
        normalizeString(m.name).includes(q) || 
        (m.tags || []).some(t => normalizeString(t).includes(q))
      );
    }

    // Filtrado por Ubicación (Editable)
    if (searchLocation.trim().length > 0) {
      const loc = normalizeString(searchLocation);
      result = result.filter(m => 
        m.locations?.some(l => normalizeString(l.locality).includes(loc))
      );
    }

    // Filtrado por Productos (Verduras, Frutas, Carne...)
    const selectedProducts = selectedFilters.filter(f => PRODUCT_OPTIONS.includes(f));
    if (selectedProducts.length > 0) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return selectedProducts.some(p => merchantTags.includes(p));
      });
    }

    // Filtrado por Modalidad (Delivery vs Retiro)
    if (deliveryType === 'Entrega a domicilio') {
      result = result.filter(m => (m.tags || []).includes('Entrega a domicilio'));
    }

    const tagsToFilter = selectedFilters.filter(f => 
      !['Productor', 'Abastecedor', 'Restaurante', 'Chef'].includes(f) &&
      !PRODUCT_OPTIONS.includes(f)
    );

    if (tagsToFilter.length > 0) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return tagsToFilter.every(f => merchantTags.includes(f));
      });
    }

    setFilteredMerchants(result);
  }, [selectedCategories, selectedFilters, merchants, searchQuery, searchLocation, deliveryType]);

  const filterData = (data: Merchant[], categories: string[], types: string[]) => {
    let result = data.filter(m => {
      let type = (m.type || '').toLowerCase();
      if (type === 'almacen' || type === 'proveedor') type = 'abastecedor';
      return categories.includes((m.type || '').toLowerCase()) || categories.includes(type);
    });
    if (types.length > 0) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return types.some(type => merchantTags.includes(type));
      });
    }
    setFilteredMerchants(result);
  };

  const updateSuggestions = (value: string) => {
    setSearchLocation(value);
    if (value.length > 1) {
      const names = merchants.map(m => m.name);
      const localities = Array.from(new Set(
        merchants.flatMap(m => m.locations?.flatMap(l => (l.locality || '').split(',').map(s => s.trim()).filter(Boolean)) || [])
      ));
      const filtered = [...names, ...localities].filter(s => s?.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      // Si la búsqueda queda vacía, dejamos registro para entender qué borró
      if (value === '') trackClick('SEARCH_CLEARED', {});
    }
  };

  const handleSuggestionClick = (s: string) => {
    setSearchLocation(s);
    setShowSuggestions(false);
    
    // Log in valuable data for missing zones or user intents
    const hasResults = merchants.some(m => 
      m.name.toLowerCase().includes(s.toLowerCase()) || 
      m.locations?.some(l => l.locality.toLowerCase().includes(s.toLowerCase()))
    );
    trackClick('SEARCH_QUERY_SELECTED', { query: s, has_results: hasResults });
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      trackClick('SEARCH_QUERY_ENTER', { query: searchLocation, results_count: filteredMerchants.length });
    }
  };

  const toggleCategory = (id: string) => {
    const normId = id.toLowerCase();
    const newCategories = selectedCategories.includes(normId)
      ? selectedCategories.filter(c => c !== normId)
      : [...selectedCategories, normId];
    
    setSelectedCategories(newCategories);
    
    // También actualizar selectedFilters para el Modal
    const label = id.charAt(0).toUpperCase() + id.slice(1);
    const newFilters = selectedFilters.includes(label)
      ? selectedFilters.filter(f => f !== label)
      : [...selectedFilters, label];
    setSelectedFilters(newFilters);
  };

  const toggleFilter = (type: string) => {
    // Si es una categoría (actor), sincronizar con selectedCategories
    const categoryMatch = CATEGORIES.find(c => c.label.toLowerCase() === type.toLowerCase());
    if (categoryMatch) {
      const normId = categoryMatch.id.toLowerCase();
      const newCategories = selectedCategories.includes(normId)
        ? selectedCategories.filter(c => c !== normId)
        : [...selectedCategories, normId];
      setSelectedCategories(newCategories);
    }

    const newTypes = selectedFilters.includes(type)
      ? selectedFilters.filter(t => t !== type)
      : [...selectedFilters, type];
    setSelectedFilters(newTypes);
  };

  const handleMerchantSelect = (m: Merchant) => {
    trackClick('SELECT_MERCHANT', { id: m.id, name: m.name });
    setSelectedMerchant(m);
  };

  const handleValidate = async (merchantId: string) => {
    if (!isLoggedIn || !user) { window.location.href = '/login'; return; }
    
    try {
      // 1. Guardar con el ID de Tomas real
      const { error: valError } = await supabase
        .from('validations')
        .insert([{ merchant_id: merchantId, user_id: user.id }]);

      if (valError) {
        if (valError.code === '23505') {
          setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
          return;
        }
        throw valError;
      }

      // 2. Incrementar contador en merchants (Persistencia total)
      const currentMerchant = merchants.find(m => m.id === merchantId);
      if (currentMerchant) {
        const newCount = (currentMerchant.validation_count || 0) + 1;
        await supabase.from('merchants').update({ validation_count: newCount }).eq('id', merchantId);

        setMerchants(prev => prev.map(m => m.id === merchantId ? { ...m, validation_count: newCount } : m));
        setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
        if (selectedMerchant?.id === merchantId) {
          setSelectedMerchant({ ...selectedMerchant, validation_count: newCount });
        }
      }
    } catch (e) {
      console.error("Error validando:", e);
    }
  };

  // No bloqueamos toda la página, solo el acceso a info sensible

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      
      <Header />

      {/* 2. BARRA DE FILTROS (FIXED on mobile, STICKY on desktop) */}
      <div className={`filter-bar ${stickyFilters ? 'is-sticky' : ''}`} style={{ 
        padding: isMobile ? '0.6rem 1rem' : '1rem 1.5rem', 
        background: 'rgba(255, 255, 255, 1)', 
        borderBottom: '1px solid var(--border)',
        position: isMobile ? 'fixed' : 'sticky',
        top: '56px', 
        left: isMobile ? 0 : undefined,
        right: isMobile ? 0 : undefined,
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        boxShadow: stickyFilters ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
        alignItems: 'center',
      }}>

        
        {/* LA CÁPSULA AIRBNB CENTRADA */}
        <div style={{ 
          width: '100%', maxWidth: '850px', display: 'flex', gap: isMobile ? '8px' : '12px', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'center'
        }}>
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => isMobile && setIsSearchFocused(true)}
            style={{ 
              flex: 1, position: 'relative', 
              zIndex: isSearchFocused ? 1001 : 100,
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: (isSearchFocused || (isHovered && !isMobile)) ? 'translateY(-2px)' : 'translateY(0)',
              cursor: isMobile ? 'pointer' : 'default'
            }}
          >
            <div style={{ 
              display: 'flex', background: 'white', borderRadius: isMobile ? '30px' : '40px', border: '1px solid #ddd', 
              flexDirection: isMobile ? 'column' : 'row',
              boxShadow: (isSearchFocused || isHovered) ? '0 15px 40px rgba(0,0,0,0.12)' : '0 4px 12px rgba(0,0,0,0.05)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', 
              padding: '1px', 
              alignItems: isMobile ? 'stretch' : 'center',
              overflow: 'hidden',
              maxHeight: isMobile ? (isSearchFocused ? '500px' : '56px') : '1000px'
            }} className="search-capsule">
              
              {/* MOBILE COMPACT VIEW HEADER */}
              {isMobile && !isSearchFocused && (
                <div style={{ 
                  display: 'flex', alignItems: 'center', padding: '0 16px', height: '54px', width: '100%', gap: '12px'
                }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <SearchIcon size={14} strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '850', color: '#2D3A20' }}>¿Qué estás buscando?</p>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{searchQuery || 'Alimentos'} · {searchLocation || 'Cerca tuyo'} · {deliveryType}</p>
                  </div>
                </div>
              )}

              {/* FULL SECTIONS (VISIBLE ON DESKTOP OR EXPANDED MOBILE) */}
              <div style={{ 
                display: (isMobile && !isSearchFocused) ? 'none' : 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                width: '100%'
              }}>
                {/* SECCIÓN 1: BUSCAR */}
                <div style={{ flex: 1.5, position: 'relative', padding: isMobile ? '12px 20px' : '6px 24px', borderRadius: isMobile ? '20px' : '40px', cursor: 'text' }} className="capsule-section">
                  <label style={{ display: 'block', fontSize: isMobile ? '0.6rem' : '0.6rem', fontWeight: '900', color: '#000', marginBottom: '1px', textTransform: 'uppercase' }}>Buscar</label>
                  <input 
                    type="text" autoFocus={isMobile}
                    placeholder="Alimentos, lugares..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => !isMobile && setTimeout(() => setIsSearchFocused(false), 200)}
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: isMobile ? '0.95rem' : '0.8rem', fontWeight: '400', background: 'transparent', boxShadow: 'none' }}
                  />
                </div>

                <div style={{ width: isMobile ? '90%' : '1px', height: isMobile ? '1px' : '24px', background: '#ddd', alignSelf: 'center' }}></div>

                {/* SECCIÓN 2: UBICACIÓN */}
                <div style={{ flex: 1, position: 'relative', padding: isMobile ? '12px 20px' : '6px 24px', borderRadius: isMobile ? '20px' : '40px', cursor: 'text' }} className="capsule-section">
                  <label style={{ display: 'block', fontSize: isMobile ? '0.6rem' : '0.6rem', fontWeight: '900', color: '#000', marginBottom: '1px', textTransform: 'uppercase' }}>Ubicación</label>
                  <input 
                    type="text" 
                    placeholder="¿A dónde?" 
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => !isMobile && setTimeout(() => setIsSearchFocused(false), 200)}
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: isMobile ? '0.95rem' : '0.8rem', fontWeight: '400', background: 'transparent', boxShadow: 'none' }}
                  />
                </div>

                <div style={{ width: isMobile ? '90%' : '1px', height: isMobile ? '1px' : '24px', background: '#ddd', alignSelf: 'center' }}></div>

                {/* SECCIÓN 3: MODALIDAD */}
                <div style={{ 
                  flex: 1.2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                  paddingLeft: isMobile ? '20px' : '24px', paddingRight: '12px', 
                  paddingTop: isMobile ? '12px' : '0', paddingBottom: isMobile ? '12px' : '0' 
                }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: isMobile ? '0.6rem' : '0.6rem', fontWeight: '900', color: '#000', marginBottom: '1px', textTransform: 'uppercase' }}>Modalidad</label>
                    <select 
                      value={deliveryType}
                      onChange={(e) => setDeliveryType(e.target.value as any)}
                      style={{ width: '100%', border: 'none', outline: 'none', fontSize: isMobile ? '0.95rem' : '0.8rem', fontWeight: '400', background: 'transparent', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="Retiro en local">Retiro en local</option>
                      <option value="Entrega a domicilio">Entrega a domicilio</option>
                    </select>
                  </div>
                  
                  <div 
                    onClick={(e) => {
                      if (isMobile && isSearchFocused) {
                        e.stopPropagation();
                        setIsSearchFocused(false);
                      }
                    }}
                    style={{ 
                      width: isMobile ? '40px' : '36px', height: isMobile ? '40px' : '36px', 
                      borderRadius: '50%', background: 'var(--primary)', display: 'flex', 
                      alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' 
                    }}
                  >
                    {isMobile && isSearchFocused ? <CheckCircle size={20} strokeWidth={3} /> : <SearchIcon size={isMobile ? 14 : 16} strokeWidth={3} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowAdvancedFilters(true)}
            style={{ 
              padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem', background: 'white', border: '1px solid #ddd', borderRadius: '12px', 
              fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              justifyContent: 'center'
            }}
          >
            <Filter size={isMobile ? 14 : 16} /> Filtros
          </button>
        </div>
        {/* CONTENEDOR DE ROLES (PROVEEDORES, etc) */}
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'center',
          maxHeight: (isMobile && !isRolesVisible) ? '0' : '100px',
          opacity: (isMobile && !isRolesVisible) ? 0 : 1,
          transform: (isMobile && !isRolesVisible) ? 'translateY(-15px)' : 'translateY(0)',
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: (isMobile && !isRolesVisible) ? 'none' : 'auto'
        }}>
          <div style={{ 
            display: 'flex', gap: isMobile ? '6px' : '8px', alignItems: 'center', 
            flexWrap: isMobile ? 'wrap' : 'nowrap',
            width: '100%', maxWidth: '850px', justifyContent: 'center' 
          }} className="no-scrollbar">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategories.includes(cat.id);
              const CatIcon = cat.id === 'productor' ? ProductorIcon : cat.icon;
              return (
                <button 
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  style={{
                    padding: isMobile ? '0.4rem 0.8rem' : '0.45rem 1rem', 
                    fontSize: isMobile ? '0.7rem' : '0.8rem', 
                    fontWeight: '900', borderRadius: '30px',
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    border: '1.2px solid ' + (isActive ? 'var(--primary-dark)' : '#ddd'),
                    background: isActive ? 'var(--primary-dark)' : 'white',
                    color: isActive ? 'white' : '#2D3A20', whiteSpace: 'nowrap',
                    boxShadow: isActive ? '0 10px 20px rgba(63, 82, 50, 0.15)' : 'none',
                    transform: isActive ? 'translateY(-1px)' : 'translateY(0)'
                  }}
                >
                  <CatIcon size={isMobile ? 14 : 16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENEDOR DE PRODUCTOS (VERDURAS, etc) */}
        <div style={{
          width: '100%', display: 'flex', justifyContent: 'center',
          maxHeight: (isMobile && !isPillsVisible) ? '0' : '200px',
          opacity: (isMobile && !isPillsVisible) ? 0 : 1,
          transform: (isMobile && !isPillsVisible) ? 'translateY(-15px)' : 'translateY(0)',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: (isMobile && !isPillsVisible) ? 'none' : 'auto'
        }}>
          <div style={{ 
            display: 'flex', gap: isMobile ? '4px' : '6px', 
            flexWrap: 'wrap',
            width: '100%', maxWidth: '950px', justifyContent: 'center',
            padding: '0 10px'
          }} className="no-scrollbar">
            {PRODUCT_OPTIONS.map(prod => {
              const isActive = selectedFilters.includes(prod);
              return (
                <button 
                  key={prod} onClick={() => toggleFilter(prod)}
                  style={{
                    padding: isMobile ? '0.3rem 0.7rem' : '0.35rem 0.9rem', 
                    fontSize: isMobile ? '0.7rem' : '0.75rem', 
                    fontWeight: '800', borderRadius: '30px',
                    display: 'flex', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s',
                    border: isActive ? '1.2px solid var(--primary-dark)' : '1px solid #c9d2c4',
                    background: isActive ? 'var(--primary-dark)' : '#eaeee6',
                    color: isActive ? 'white' : 'var(--primary-dark)', whiteSpace: 'nowrap'
                  }}
                >
                  {prod}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <div className="main-content" style={{ flex: 1, display: 'flex', overflow: 'visible', position: 'relative' }}>
        
        {/* Toggle Flotante Mobile SOLAMENTE */}
        <div className="mobile-only" style={{ display: isMobile ? 'flex' : 'none' }}>
          <button 
            className="toggle-view-btn"
            onClick={() => setMobileView(mobileView === 'list' ? 'map' : 'list')}
            style={{ 
              position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 3000, 
              background: '#2D3A20', color: 'white', border: 'none', borderRadius: '30px', padding: '1rem 2rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '10px',
              fontWeight: '900', fontSize: '0.9rem', letterSpacing: '0.05em'
            }}
          >
            {mobileView === 'list' ? <MapIcon size={18} /> : <SearchIcon size={18} />}
            {mobileView === 'list' ? 'VER MAPA' : 'VER LISTADO'}
          </button>
        </div>

        {/* LISTA DE RESULTADOS */}
        <section 
          ref={resultsRef}
          className="results-section" 
          style={{ 
            width: isMobile ? '100%' : '35%', 
            minWidth: isMobile ? '0' : '400px', 
            display: (isMobile && mobileView !== 'list') ? 'none' : 'block',
            padding: '1rem', background: '#F8F9F5',
            borderRight: isMobile ? 'none' : '1px solid var(--border)', 
            height: isMobile ? '100vh' : 'calc(100vh - 120px)', 
            overflowY: 'auto',
            paddingTop: isMobile ? '1rem' : '1rem'
          }}
        >
          <div style={{ 
            marginBottom: '1.2rem', padding: '0.6rem 1rem', background: 'white', borderRadius: '16px', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E4EBDD',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)' 
          }}>
            <h2 style={{ fontSize: '0.85rem', fontWeight: '900', color: '#2D3A20', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {filteredMerchants.length} {filteredMerchants.length === 1 ? 'local encontrado' : 'locales encontrados'}
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {filteredMerchants.map(m => (
              <MerchantCard key={m.id} merchant={m} onClick={() => {
                handleMerchantSelect(m);
                if (window.innerWidth < 768) setMobileView('map');
              }} />
            ))}
          </div>
        </section>

        {/* MAPA */}
        <section 
          className="map-section" 
          style={{ 
            flex: 1, 
            position: isMobile ? (mobileView === 'map' ? 'relative' : 'absolute') : 'relative',
            left: (isMobile && mobileView !== 'map') ? '-9999px' : '0',
            width: '100%',
            height: isMobile ? '600px' : 'calc(100vh - 120px)',
            minHeight: isMobile ? '500px' : 'auto',
            background: '#EAEDE8'
          }}
        >
          {hasMounted && (
            <MapComponent 
              key={`${isMobile ? mobileView : 'desktop'}-${filteredMerchants.length}`}
              onInteraction={(dir) => {
                if (isMobile) {
                  if (dir === 'up') {
                    setIsPillsVisible(false);
                    setIsRolesVisible(false);
                  } else {
                    setIsRolesVisible(true);
                    setIsPillsVisible(true);
                  }
                }
              }}
              providers={(filteredMerchants.length > 0 ? filteredMerchants : merchants).map(m => ({
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
          )}
        </section>
      </div>

      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant as Merchant} 
          isLoggedIn={isLoggedIn}
          user={user}
          userProfile={userProfile}
          validators={validators}
          hasValidatedInitial={validatedMerchantIds.has(selectedMerchant.id)}
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

          .map-section { 
            width: 100%; 
            display: flex;
            flex-direction: column;
          }
          
          .detail-panel { 
            width: 100% !important; 
            height: 94% !important;
            top: 6% !important;
            border-radius: 30px 30px 0 0;
            z-index: 4000;
            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .is-sticky { border-bottom: 2px solid var(--primary); }
        }
      `}</style>

      {/* MODAL DE FILTROS AVANZADOS */}
      <AdvancedFiltersModal
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        clearAll={() => setSelectedFilters([])}
        resultCount={filteredMerchants.length}
      />
    </div>
  );
}

function MerchantCard({ merchant, onClick }: { merchant: Merchant, onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const types = (merchant.type || '').split(',').map(s => s.trim());
  const mainType = types[0] || 'Productor';
  const secondaryType = types.length > 1 ? types[1] : null;

  const IconComponent = CATEGORIES.find(c => c.id === mainType.toLowerCase())?.icon || (mainType.toLowerCase() === 'productor' ? ProductorIcon : Sprout);
  
  const allTags = merchant.tags || [];
  const productOptions = PRODUCT_OPTIONS;
  
  const productTags = allTags.filter(t => productOptions.includes(t));
  const otherTags = allTags.filter(t => !productOptions.includes(t) && t !== 'Venta directa');
  
  // Tag Limiter
  const maxVisibleTags = 3;
  const visibleOtherTags = isHovered ? otherTags : otherTags.slice(0, maxVisibleTags);
  const hiddenTagsCount = otherTags.length - maxVisibleTags;
  
  // Product Icons logic
  const visibleProducts = isHovered ? productTags : productTags.slice(0, 1);
  const hiddenProductsCount = productTags.length - 1;

  const isDirect = mainType.toLowerCase() === 'productor' && allTags.includes('Venta directa');
  
  // Location formatting
  const locations = merchant.locations || [];
  let displayLocation = 'Zona Norte';
  if (locations.length === 1) {
    const loc = locations[0];
    displayLocation = loc.locality || 'Zona Norte'; 
  } else if (locations.length > 1) {
    const firstLocality = locations[0]?.locality?.split(' | ')?.[1] || locations[0]?.locality || 'Zona';
    displayLocation = `${locations.length} sucursales | ${firstLocality}`;
  }

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '1.2rem', borderRadius: '24px', background: 'white', cursor: 'pointer',
        border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
        display: 'flex', flexDirection: 'column', gap: '8px', transition: 'all 0.2s',
      }}
      className="merchant-card-pro"
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ 
            width: '42px', height: '42px', borderRadius: '12px', background: '#F4F1E6', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', flexShrink: 0, marginTop: '2px'
          }}>
            <IconComponent size={20} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#2D3A20', margin: 0, lineHeight: '1.2', marginBottom: '4px' }}>{merchant.name}</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={10} /> {displayLocation}
            </p>
          </div>
        </div>

        {/* --- VALIDATION BADGE --- */}
        {merchant.validation_count > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '10px',
            background: 'rgba(95, 125, 74, 0.08)', border: '1px solid rgba(95, 125, 74, 0.15)',
            color: '#5F7D4A', flexShrink: 0
          }} title="Proyectos validados por la comunidad">
            <ShieldCheck size={14} />
            <span style={{ fontSize: '0.7rem', fontWeight: '900' }}>{merchant.validation_count}</span>
          </div>
        )}
      </div>

      <div style={{ marginTop: '4px' }}>
        {productTags.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '6px' }}>
                {visibleProducts.map(pt => (
                  <span key={pt} style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary-dark)', background: '#f5f5f5', padding: '2px 6px', borderRadius: '6px' }}>
                    {pt}
                  </span>
                ))}
                {!isHovered && hiddenProductsCount > 0 && (
                    <span style={{ fontSize: '0.65rem', fontWeight: '900', color: 'var(--text-secondary)', padding: '2px 4px' }}>
                      +{hiddenProductsCount}
                    </span>
                )}
              </div>
            )}
          </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: '900', background: '#2D3A20', color: 'white', padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase' }}>
            {mainType}
          </div>
          {secondaryType && (
            <div style={{ fontSize: '0.55rem', fontWeight: '800', background: '#5F7D4A15', color: '#5F7D4A', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
              + {secondaryType}
            </div>
          )}
          
          {/* TOMAS'S BADGES: Same line hierarchy */}
          {(merchant.validation_count || 0) > 0 ? (
            <div style={{ 
              fontSize: '0.6rem', fontWeight: '950', background: '#5F7D4A', color: 'white', 
              padding: '3px 10px', borderRadius: '20px', 
              display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap',
              boxShadow: '0 4px 10px rgba(95, 125, 74, 0.2)'
            }}>
              <ShieldCheck size={10} strokeWidth={3} /> VALIDADO +{merchant.validation_count}
            </div>
          ) : (
            <div style={{ 
              fontSize: '0.6rem', fontWeight: '950', background: 'transparent', color: '#5F7D4A', 
              padding: '2px 9px', borderRadius: '20px', border: '1.2px solid #5F7D4A', 
              display: 'flex', alignItems: 'center', gap: '5px', whiteSpace: 'nowrap',
              opacity: 0.85
            }}>
              <Shield size={10} strokeWidth={3} /> VALIDAR
            </div>
          )}
        </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.8, margin: '4px 0 0 0', lineHeight: '1.4' }}>
        {merchant.bio_short?.substring(0, 85)}...
      </p>
      
      {(visibleOtherTags.length > 0 || isDirect) && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {isDirect && (
            <span style={{ fontSize: '0.65rem', fontWeight: '800', background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Leaf size={10} strokeWidth={2.5} /> Del campo a la mesa
            </span>
          )}
          {visibleOtherTags.map(tag => (
            <span key={tag} style={{ fontSize: '0.65rem', fontWeight: '700', background: 'transparent', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: '12px', border: '1px solid #eee' }}>
              {tag}
            </span>
          ))}
          {!isHovered && hiddenTagsCount > 0 && (
            <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#aaa', padding: '3px' }}>+{hiddenTagsCount}</span>
          )}
        </div>
      )}
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, user, userProfile, validators, hasValidatedInitial, onClose, trackClick, onValidate }: { merchant: Merchant, isLoggedIn: boolean, user: any, userProfile: any, validators: any[], hasValidatedInitial: boolean, onClose: () => void, trackClick: (eventName: string, params?: Record<string, unknown>) => void, onValidate: (id: string) => void }) {
  const [hasValidated, setHasValidated] = useState(hasValidatedInitial);
  
  // Lógica inteligente de visualización:
  const displayValidators = [...validators];
  const currentUserName = userProfile?.first_name || 'Tomas';
  
  if (hasValidated && !displayValidators.some(v => v.user_id === user?.id)) {
    displayValidators.unshift({ user_id: user?.id, profiles: { first_name: currentUserName } });
  }

  const othersCount = Math.max(0, (merchant.validation_count || 0) - (displayValidators.length));
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

          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            {merchant.type?.split(',').map(s => s.trim()).map(t => (
              <span key={t} style={{ padding: '0.3rem 0.8rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase' }}>{t}</span>
            ))}
            <span style={{ padding: '0.3rem 0.8rem', background: 'var(--soft-leaf)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900' }}>Validado</span>
          </div>

          <div style={{ background: '#F8F9F5', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', marginBottom: '1rem' }}>
             <div style={{ marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: '950', color: '#5F7D4A', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Validación Comunitaria</span>
                <div style={{ marginTop: '5px', fontSize: '0.85rem', fontWeight: '700', color: '#2D3A20', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="#5F7D4A" /> 
                {displayValidators && displayValidators.length > 0 ? (
                  <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
                    Validado por {displayValidators.map((v: any, i: number) => (
                      <strong key={v.user_id + (v.profiles?.first_name || 'Alimneter') + i} style={{ color: '#5F7D4A' }}>
                        {v.profiles?.first_name || 'Alimneter'}{i < displayValidators.length - 1 ? ', ' : ''}
                      </strong>
                    ))}
                    {othersCount > 0 && <span style={{ color: '#888' }}>{` y ${othersCount} más`}</span>}
                  </span>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>Sin validaciones aún</span>
                )}
                </div>
             </div>
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
          }

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

        /* REMOVE FOCUS OUTLINES AND SQUARES */
        input:focus, select:focus, textarea:focus, button:focus {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Specific Fix for Search Capsule Focus */
        .search-capsule input:focus {
          background: transparent !important;
        }
        
        .search-capsule select:focus {
          background: transparent !important;
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
