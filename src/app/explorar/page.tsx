'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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
  Menu,
  Plus,
  Compass,
  Clock,
  Globe,
  Phone,
  Check,
  Sparkles
} from 'lucide-react';
import Header from '@/components/Header';

import OnboardingPremium from '@/components/OnboardingPremium';
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
  claimed: boolean;
  verified: boolean;
  google_maps_url?: string;
}

interface Location {
  id: string;
  merchant_id: string;
  location_type: string;
  locality: string;
  district?: string;
  lat: number;
  lng: number;
  is_primary: boolean;
  country?: string;
  address?: string;
  province?: string;
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

function IdentityWallModal({ isOpen, user, onComplete }: { isOpen: boolean, user: any, onComplete: () => void }) {
  const [formData, setFormData] = useState({ first_name: '', last_name: '' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!formData.first_name || !formData.last_name) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('profiles').update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        full_name: `${formData.first_name} ${formData.last_name}`
      }).eq('id', user.id);
      if (error) throw error;
      onComplete();
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
       <div style={{ width: '92%', maxWidth: '500px', background: 'white', borderRadius: '40px', padding: '3rem', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', border: '1px solid #E4EBDD', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#F0F4ED', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
             <Leaf size={40} color="#5F7D4A" />
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1rem', letterSpacing: '-0.02em' }}>¡Sumate a Alimnet!</h2>
          <p style={{ color: '#666', fontWeight: '750', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '2.5rem' }}>
             Para interactuar con la comunidad y conocer a los productores, necesitamos saber quién eres.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
             <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Nombre</label>
                <input 
                   placeholder="Tu nombre real"
                   value={formData.first_name}
                   onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                   style={{ width: '100%', padding: '1.2rem', borderRadius: '18px', border: '2px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800', fontSize: '1rem', color: '#2D3A20' }}
                />
             </div>
             <div style={{ textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Apellido Oficial</label>
                <input 
                   placeholder="Tu apellido real"
                   value={formData.last_name}
                   onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                   style={{ width: '100%', padding: '1.2rem', borderRadius: '18px', border: '2px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800', fontSize: '1rem', color: '#2D3A20' }}
                />
             </div>
          </div>

          <button 
             onClick={handleSave}
             disabled={!formData.first_name || !formData.last_name || loading}
             style={{ width: '100%', padding: '1.4rem', borderRadius: '22px', background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '1000', fontSize: '1.1rem', cursor: (formData.first_name && formData.last_name) ? 'pointer' : 'not-allowed', opacity: (formData.first_name && formData.last_name) ? 1 : 0.5, boxShadow: '0 10px 25px rgba(95, 125, 74, 0.2)', transition: 'all 0.3s' }}
          >
             {loading ? 'Identificando...' : 'Comenzar a explorar'}
          </button>
          
          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#ADB5BD', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             Unite a la Soberanía Alimentaria
          </p>
       </div>
    </div>
  );
}

function AdvancedFiltersModal({ isOpen, onClose, selectedFilters, toggleFilter, clearAll, resultCount, userProfile, router, isStyleActive, setIsStyleActive, setShowStyleWarning }: { isOpen: boolean, onClose: () => void, selectedFilters: string[], toggleFilter: (f:string)=>void, clearAll: ()=>void, resultCount: number, userProfile: any, router: any, isStyleActive: boolean, setIsStyleActive: (v:boolean)=>void, setShowStyleWarning: (v:boolean)=>void }) {
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
        
        <div style={{ padding: '2rem 2rem 0.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {userProfile?.preferences && userProfile.preferences.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button 
                onClick={() => {
                  if (!userProfile?.preferences || userProfile.preferences.length === 0) {
                    alert("¡Tu radar de estilo está vacío! 🍱\nConfigurá tus preferencias en tu perfil para filtrar con un solo click.");
                    router.push('/mi-cuenta?tab=estilo');
                    onClose();
                    return;
                  }

                  const mapping: Record<string, string> = {
                    'Gluten Free': 'Sin gluten',
                    'Sugar Free': 'Sin azúcar',
                    'Plant Based': 'Plant-based',
                    'Sin Lactosa': 'Sin lactosa',
                    'Keto': 'Keto',
                    'Vegetariano': 'Vegetariano',
                    'Sustentable': 'Sustentable',
                    'Orgánico': 'Orgánico'
                  };
                  
                  if (isStyleActive) {
                    // SI YA ESTÁ: Quitar todo (Volver a neutro)
                    clearAll();
                    setIsStyleActive(false);
                  } else {
                    // VALIDACIÓN: ¿Tiene preferencias?
                    if (!userProfile?.preferences || userProfile.preferences.length === 0) {
                      onClose(); // Cerrar filtros
                      setShowStyleWarning(true); // Abrir aviso
                      return;
                    }

                    // SI NO ESTÁ: Limpiar primero y aplicar EL ESTILO DEL PERFIL PURO
                    clearAll(); 
                    userProfile.preferences.forEach((p: string) => {
                      const mapped = mapping[p] || p;
                      toggleFilter(mapped);
                    });
                    
                    // Si el perfil tiene pocas preferencias, reforzamos con los tipos básicos
                    if (userProfile.preferences.length < 2) {
                      ['Productor', 'Abastecedor', 'Restaurante', 'Chef'].forEach(cat => {
                        if (!selectedFilters.includes(cat)) toggleFilter(cat);
                      });
                    }
                    setIsStyleActive(true);
                  }
                  onClose();
                }}
                style={{
                  width: '100%', padding: '1.2rem', 
                  background: isStyleActive ? '#2D3A20' : '#F8F9F5', 
                  border: isStyleActive ? 'none' : '2px dashed #5F7D4A',
                  borderRadius: '16px', 
                  color: isStyleActive ? 'white' : '#3F5232', 
                  fontWeight: '1000', fontSize: '0.9rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  boxShadow: isStyleActive ? '0 10px 25px rgba(45,58,32,0.2)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {isStyleActive ? <Check size={18} /> : null}
                {isStyleActive ? 'MODO ESTILO ACTIVADO' : '✨ Aplicar mi estilo (acorde a mi perfil)'}
              </button>
              
              <button 
                onClick={() => router.push('/mi-cuenta')}
                style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Configurar mis preferencias en mi perfil
              </button>
            </div>
          )}
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

declare global {
  interface Window {
    google: any;
  }
}

export default function ExplorarPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [potentialDuplicateCandidates, setPotentialDuplicateCandidates] = useState<Merchant[]>([]);
  const [isMerchant, setIsMerchant] = useState(false);
  const [filteredMerchants, setFilteredMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [validators, setValidators] = useState<any[]>([]);
  const [validatedMerchantIds, setValidatedMerchantIds] = useState<Set<string>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  
  // Sincronizar selectedFilters con selectedCategories - INICIO LIMPIO (Sugerido por Tomas)
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const [stickyFilters, setStickyFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'Retiro en local' | 'Entrega a domicilio' | 'Ambas'>('Ambas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');

  // TRIGGER RESIZE PARA LEAFLET (V-9.5.19)
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        console.log("[MAP DEBUG]: Resize triggered for mobile view:", mobileView);
      }, 400); // 400ms para asegurar que la transición de opacidad/display terminó
      return () => clearTimeout(timer);
    }
  }, [mobileView, isMobile]);

  const [isRolesVisible, setIsRolesVisible] = useState(true);
  const [isPillsVisible, setIsPillsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  const [searchCoords, setSearchCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [radiusKm, setRadiusKm] = useState<number>(30);
  const [finalCoords, setFinalCoords] = useState<{ lat: number, lng: number } | null>(null);
  const [showIdentityWall, setShowIdentityWall] = useState(false);
  const [isStyleActive, setIsStyleActive] = useState(false);
  const [showStyleWarning, setShowStyleWarning] = useState(false);
  const [currentMapBounds, setCurrentMapBounds] = useState<L.LatLngBounds | null>(null);
  const merchantsRef = React.useRef<Merchant[]>([]);

  useEffect(() => {
    merchantsRef.current = merchants;
  }, [merchants]);

  // --- LOCALIZACIÓN AUTOMÁTICA (GPS/IP) AL INICIO ---
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation && !searchCoords) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("GPS detected:", latitude, longitude);
          setSearchCoords({ lat: latitude, lng: longitude });
          // Importante: No seteamos finalCoords para NO filtrar la lista al inicio (Tomas V-9.3.2)
          // setFinalCoords({ lat: latitude, lng: longitude }); 
          // Importante: No seteamos searchLocation con texto para dejarlo limpio ("¿A dónde?")
        },
        (error) => {
          console.log("Geolocation error / denied:", error);
          // Fallback al obelisco si falla
          if (!searchCoords) {
            setSearchCoords({ lat: -34.6037, lng: -58.3816 });
            setFinalCoords({ lat: -34.6037, lng: -58.3816 });
          }
        },
        { timeout: 10000 }
      );
    }
  }, []);

  // Sincronizar deliveryType con selectedFilters (Modal -> Buscador)
  useEffect(() => {
    const hasRetiro = selectedFilters.includes('Retiro en local');
    const hasDelivery = selectedFilters.includes('Entrega a domicilio');
    if (hasRetiro && !hasDelivery) setDeliveryType('Retiro en local');
    else if (!hasRetiro && hasDelivery) setDeliveryType('Entrega a domicilio');
    else setDeliveryType('Ambas');
  }, [selectedFilters]);

  // --- MEMOIZACIÓN PARA EVITAR EL SALTO ATRÁS (DERRAPE) ---
  const mapCenter = React.useMemo<[number, number]>(() => {
    return finalCoords ? [finalCoords.lat, finalCoords.lng] : [-34.6037, -58.3816];
  }, [finalCoords?.lat, finalCoords?.lng]);

  const mapZoom = React.useMemo(() => {
    const baseZoom = finalCoords ? (radiusKm > 40 ? 10 : 12) : (isMobile ? 10 : 11);
    return baseZoom;
  }, [finalCoords?.lat, radiusKm, isMobile]);

  const [externalPlaceSelected, setExternalPlaceSelected] = useState<any>(null);
  const resultsRef = React.useRef<HTMLElement>(null);
  const mapSectionRef = React.useRef<HTMLDivElement>(null);
  const touchStartY = React.useRef<number>(0);
  const cumulativeSwipe = React.useRef<number>(0);

  useEffect(() => {
    setHasMounted(true);
    
    // --- INTEGRACIÓN GOOGLE MAPS AUTOCOMPLETE ---
    const loadGoogleMaps = () => {
      if (typeof window === 'undefined') return;
      if (window.google) {
        initAutocomplete();
        return;
      }
      
      // Prevenir múltiples cargas
      if ((window as any).isGoogleMapsLoading) return;
      (window as any).isGoogleMapsLoading = true;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Maps loaded");
        initAutocomplete();
      };
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
      const locationInput = document.getElementById('search-location-input') as HTMLInputElement;
      const mainSearchInput = document.getElementById('search-input') as HTMLInputElement;
      if (!window.google) return;

      // 1. Autocomplete para UBICACIÓN
      if (locationInput) {
        const locationAutocomplete = new window.google.maps.places.Autocomplete(locationInput, {
          types: ['(regions)'],
          componentRestrictions: { country: 'ar' },
          fields: ['formatted_address', 'geometry', 'name']
        });

        locationAutocomplete.addListener('place_changed', () => {
          const place = locationAutocomplete.getPlace();
          if (!place.geometry) return;
          const name = place.formatted_address || place.name;
          setSearchLocation(name);
          setSearchCoords({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
        });
      }

      // 2. Autocomplete para BUSCAR (Inteligente)
      if (mainSearchInput) {
        const mainAutocomplete = new window.google.maps.places.Autocomplete(mainSearchInput, {
          types: ['geocode', 'establishment'],
          componentRestrictions: { country: 'ar' },
          fields: ['formatted_address', 'geometry', 'name']
        });

        mainAutocomplete.addListener('place_changed', () => {
          const place = mainAutocomplete.getPlace();
          if (!place.geometry) return;
          const name = place.name || place.formatted_address || '';
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          
          setSearchQuery(name);
          setSearchCoords({ lat, lng });
          
          // --- AGENTE DE INTELIGENCIA: INSPECTOR DE DUPLICADOS (REFORZADO) ---
          const currentMerchants = merchantsRef.current;
          const matchingMerchants = currentMerchants.filter(m => {
            const mName = normalizeString(m.name);
            const gName = normalizeString(name);
            
            // Similitud 1: Uno contiene al otro (clásico)
            const isSimilarName = mName.includes(gName) || gName.includes(mName);
            
            // Similitud 2: Comparten palabras clave (para casos "Ayni Cocina" vs "Ayni Almacen Organico")
            const mWords = mName.split(' ').filter(w => w.length > 3);
            const gWords = gName.split(' ').filter(w => w.length > 3);
            const sharedWords = mWords.filter(w => gWords.includes(w));
            const hasSharedWords = sharedWords.length >= 2;
            
            return isSimilarName || hasSharedWords;
          });

          if (matchingMerchants.length > 0) {
            // El Agente tiene dudas o encontró un match perfecto
            const exactMatch = matchingMerchants.find(m => {
              const mLoc = m.locations?.[0];
              if (!mLoc?.lat) return false;
              const dist = Math.sqrt(Math.pow(mLoc.lat - lat, 2) + Math.pow(mLoc.lng - lng, 2));
              return dist < 0.005; // 500m
            });

            if (exactMatch) {
              console.log("Inspector: Match exacto (Cercanía) detectado ->", exactMatch.name);
              handleMerchantSelect(exactMatch);
              setExternalPlaceSelected(null);
              setPotentialDuplicateCandidates([]);
            } else {
              // Duda inteligente: Se llaman parecido pero están LEJOS
              console.log("Inspector: Duda Inteligente detectada (Similares pero lejos)");
              setPotentialDuplicateCandidates(matchingMerchants.slice(0, 3));
              setExternalPlaceSelected({
                name,
                address: place.formatted_address,
                lat,
                lng,
                placeId: place.place_id,
                has_potential_duplicates: true
              });
            }
          } else if (place.types?.includes('establishment')) {
            // No hay nada que se le parezca, ofrecer Cargarlo directamente
            setExternalPlaceSelected({
              name,
              address: place.formatted_address,
              lat,
              lng,
              placeId: place.place_id,
              has_potential_duplicates: false
            });
            setPotentialDuplicateCandidates([]);
          } else {
            setExternalPlaceSelected(null);
            setPotentialDuplicateCandidates([]);
          }
          
          trackClick('SEARCH_MAIN_SELECTED', { name, was_duplicate: matchingMerchants.length > 0 });
        });
      }
    };

    loadGoogleMaps();

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleAuthEvent(session);
    };

    // --- DETECTOR DE GOOGLE (IMÁN REACCIÓN RÁPIDA) ---
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("[AUTH EVENT MAPA]:", _event, !!session);
      handleAuthEvent(session);
    });

    const handleAuthEvent = async (session: any) => {
      let activeSession = session;

      // --- [BRUTE FORCE GOOGLE] Si no hay sesión, buscamos la galletita secreta ---
      if (!activeSession) {
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('sb-keagrrvtzmsukcmzxqrl-auth-token='));
        if (authCookie) {
          try {
            const cookieValue = decodeURIComponent(authCookie.split('=')[1]);
            const sessionData = JSON.parse(cookieValue);
            if (sessionData?.access_token && sessionData?.refresh_token) {
              console.log("[GOOGLE BRUTE FORCE]: Restaurando desde galletita...");
              const { data: { session: restoredSession } } = await supabase.auth.setSession({
                access_token: sessionData.access_token,
                refresh_token: sessionData.refresh_token
              });
              if (restoredSession) activeSession = restoredSession;
            }
          } catch (e) { console.error(e); }
        }
      }

      if (activeSession) {
        setIsLoggedIn(true);
        setUser(activeSession.user);
        
        // 1. Perfil
        const { data: pData } = await supabase.from('profiles').select('*').eq('id', activeSession.user.id).single();
        if (pData) {
          setUserProfile(pData);
          // DETECTOR DE IDENTIDAD: Si faltan nombre o apellido, activamos el muro (MANDATORIO)
          if (!pData.first_name || !pData.last_name) {
            setShowIdentityWall(true);
          }
          // Limpiamos la localidad del buscador inicial (Pedida por Tomas V-9.3.0)
          // setInitialLocationFromProfile(pData.locality); -> Obtenida de forma silenciosa por las coordenadas
        } else {
          setShowIdentityWall(true);
        }
        
        // Validaciones
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
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
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
        .select('*, locations(*)');
        // .eq('status', 'active'); // TEMPORALMENTE DESHABILITADO PARA ASEGURAR VISIBILIDAD

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
    // Filtrado por Categorías (Actor) - MÁS FLEXIBLE
    let result = merchants;
    if (selectedCategories.length > 0 && selectedCategories.length < 4) {
      result = merchants.filter(m => {
        const type = (m.type || '').toLowerCase();
        return selectedCategories.some(cat => type.includes(cat));
      });
    }

    // Filtrado por Búsqueda Libre (Nombre, Alimento, Lugar)
    const isRegionalQuery = ['zona norte', 'zona oeste', 'zona sur', 'gba', 'buenos aires'].some(r => normalizeString(searchQuery).includes(r));
    if (searchQuery.trim().length > 0 && !isRegionalQuery) {
      const q = normalizeString(searchQuery);
      result = result.filter(m => 
        normalizeString(m.name).includes(q) || 
        (m.tags || []).some(t => normalizeString(t).includes(q))
      );
    }

    // --- LIMPIEZA DE DATOS: Ocultar puntos mal geolocalizados ---
    result = result.map(m => ({
      ...m,
      locations: m.locations?.filter(l => {
        if (!l.lat || !l.lng) return false;
        
        // 1. Validación de País: Evitar que un "Cordoba, Argentina" termine en España
        // (Solo si el comercio tiene país definido)
        const countryMatch = l.country ? (normalizeString(l.country) === 'argentina' ? 
          (l.lat < -21 && l.lat > -55) : true // Si no es Argentina, confiamos en la coordenada por ahora
        ) : true;

        return countryMatch;
      })
    })).filter(m => (m.locations?.length || 0) > 0);

    // Filtrado por Ubicación (Potenciado con Coordenadas y Regiones)
    let tempCoords = null; 
    let tempRadius = 30; 

    const locText = searchLocation || searchQuery;
    if (locText.trim().length > 0) {
      if (searchCoords) {
        tempCoords = searchCoords;
      }
      const locNorm = normalizeString(locText);
      if (locNorm.includes('zona norte')) {
        tempCoords = { lat: -34.47, lng: -58.55 };
        tempRadius = 40;
      } else if (locNorm.includes('zona oeste')) {
        tempCoords = { lat: -34.65, lng: -58.60 };
        tempRadius = 40;
      } else if (locNorm.includes('zona sur')) {
        tempCoords = { lat: -34.75, lng: -58.35 };
        tempRadius = 40;
      } else if (locNorm.includes('gba') || locNorm.includes('buenos aires')) {
        tempCoords = { lat: -34.60, lng: -58.45 };
        tempRadius = 60;
      }
    }

    setFinalCoords(tempCoords);
    setRadiusKm(tempRadius);

    if (tempCoords) {
      // Usar tempRadius para el filtrado
      const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
          Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
      };

      const nearby = result.filter(m => 
        m.locations?.some(l => getDistance(tempCoords!.lat, tempCoords!.lng, l.lat, l.lng) <= tempRadius)
      );
      
      // Si el filtrado por coordenadas es demasiado estricto (0 resultados), 
      // pero el texto dice algo genérico como Buenos Aires, mantenemos la lista base 
      // para no dejar el mapa vacío, pero centrada en esas coordenadas.
      if (nearby.length > 0) {
        result = nearby;
      }
    } else if (searchLocation.trim().length > 0) {
      const loc = normalizeString(searchLocation);
      if (loc && loc !== 'buenos aires') {
        result = result.filter(m => 
          m.locations?.some(l => normalizeString(l.locality || '').includes(loc))
        );
      }
    }

    // Filtrado por Productos (Verduras, Frutas, Carne...)
    const selectedProducts = selectedFilters.filter(f => PRODUCT_OPTIONS.includes(f));
    if (selectedProducts.length > 0) {
      result = result.filter(m => {
        const merchantTags = m.tags || [];
        return selectedProducts.some(p => merchantTags.includes(p));
      });
    }

    // --- Filtrado por Modalidad (Sincronizado con selectedFilters) ---
    const modalityFilter = selectedFilters.filter(f => ['Retiro en local', 'Entrega a domicilio'].includes(f));
    if (modalityFilter.length === 1) {
      // Si solo hay uno elegido (Solo Retiro o Solo Delivery), filtramos estrictamente
      result = result.filter(m => (m.tags || []).includes(modalityFilter[0]));
    } else {
      // Si están los dos o ninguno, mostramos todo ("Ambas")
    }

    const tagsToFilter = selectedFilters.filter(f => 
      !['Productor', 'Abastecedor', 'Restaurante', 'Chef'].includes(f) &&
      !PRODUCT_OPTIONS.includes(f)
    );

    if (tagsToFilter.length > 0) {
      result = result.filter(m => {
        const merchantTags = (m.tags || []).map(t => t.toLowerCase());
        const normSelected = tagsToFilter.map(f => f.toLowerCase());
        // Usar 'some' en lugar de 'every' para ser inclusivos y no vaciar el mapa
        return normSelected.some(f => merchantTags.includes(f));
      });
    }

    // --- FILTRADO DINÁMICO POR BORDERS DEL MAPA (Tomas V-9.5.0) ---
    if (currentMapBounds) {
      result = result.filter(m => {
        const locations = m.locations || [];
        if (locations.length === 0) return true; // Dejar los que no tienen loc si hay filtros activos
        return locations.some(l => currentMapBounds.contains([l.lat, l.lng]));
      });
    }

    setFilteredMerchants(result);
  }, [selectedCategories, selectedFilters, merchants, searchQuery, searchLocation, searchCoords, deliveryType, currentMapBounds]);

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
    if (!isMobile) {
      setTimeout(() => {
        document.getElementById(`merchant-card-${m.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  const handleValidate = async (merchantId: string) => {
    if (!isLoggedIn || !user) { router.push('/login'); return; }
    
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
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#F0F4ED',
      paddingTop: 0,
      position: 'relative',
      overflow: 'hidden' 
    }}>
      
      <Header />

      <div className={`filter-bar ${stickyFilters ? 'is-sticky' : ''}`} style={{ 
        padding: isMobile ? '70px 1rem 0.8rem' : '72px 1.5rem 0.8rem', 
        background: 'white', 
        borderBottom: '1px solid #E4EBDD',
        zIndex: 1400,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '0.6rem' : '1rem',
        alignItems: 'center',
        position: 'relative',
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
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
                <div 
                  onClick={() => setIsSearchFocused(true)}
                  style={{ 
                    display: 'flex', alignItems: 'center', padding: '0 18px', height: '56px', width: '100%', gap: '14px',
                    background: '#F9FBF7', cursor: 'pointer'
                  }}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    <SearchIcon size={16} strokeWidth={3} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '950', color: '#2D3A20', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {searchQuery || '¿Qué estás buscando?'}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#5F7D4A', fontWeight: '700' }}>
                      {searchLocation || 'Cerca tuyo'} · {deliveryType === 'Retiro en local' ? 'Retiro' : 'Envio'}
                    </p>
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
                    id="search-input"
                    type="text" autoFocus={isMobile}
                    placeholder="Alimentos, lugares..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (e.target.value === '') {
                        setSearchCoords(null);
                        setExternalPlaceSelected(null);
                      }
                    }}
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
                    id="search-location-input"
                    type="text" 
                    placeholder="¿A dónde?" 
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value);
                      if (e.target.value === '') setSearchCoords(null);
                    }}
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
                      onChange={(e) => {
                        const val = e.target.value as any;
                        setDeliveryType(val);
                        // Sincronizar hacia selectedFilters
                        let newFilters = selectedFilters.filter(f => f !== 'Retiro en local' && f !== 'Entrega a domicilio');
                        if (val === 'Retiro en local') newFilters.push('Retiro en local');
                        if (val === 'Entrega a domicilio') newFilters.push('Entrega a domicilio');
                        if (val === 'Ambas') {
                          // Opcional: Podríamos prender ambos o dejar ambos apagados (que es "Ambas")
                          // Dejamos vacío para que sea "Ver todos"
                        }
                        setSelectedFilters(newFilters);
                      }}
                      style={{ width: '100%', border: 'none', outline: 'none', fontSize: isMobile ? '0.95rem' : '0.8rem', fontWeight: '400', background: 'transparent', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="Ambas">Ambas modalidades</option>
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
          maxHeight: '100px',
          opacity: 1,
          transform: 'translateY(0)',
          overflow: 'hidden',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto'
        }}>
          <div style={{ 
            display: 'flex', gap: isMobile ? '6px' : '8px', alignItems: 'center', 
            flexWrap: 'nowrap',
            width: '100%', maxWidth: '850px', justifyContent: 'center',
            overflowX: 'auto', paddingBottom: '4px'
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
      </div>

      {/* 3. CONTENIDO PRINCIPAL - FIXED LAYOUT (DASHBOARD STYLE) */}
      <div className="main-content" style={{ 
        flex: 1, 
        height: '0', // Let flex:1 manage height (Dashboard style)
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'hidden', 
        position: 'relative' 
      }}>
        
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
          onScroll={() => {}}
          style={{ 
            width: isMobile ? '100%' : '35%', 
            minWidth: isMobile ? '0' : '420px', 
            display: (isMobile && mobileView !== 'list') ? 'none' : 'block',
            padding: isMobile ? '1rem' : '0 0 1.5rem 1.5rem', 
            background: '#F8F9F5',
            borderRight: isMobile ? 'none' : '1px solid #E4EBDD', 
            height: '100%', 
            overflowY: 'auto',
            position: 'relative'
          }}
        >
          {/* HEADER DE CONTEO - STICKY Y PEQUEÑO */}
          <div style={{ 
            position: 'sticky',
            top: 0,
            zIndex: 100,
            background: 'white',
            padding: '0.8rem 1.75rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            borderBottom: '1px solid #E4EBDD',
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            width: '100%'
          }}>
            <Compass size={16} color="var(--primary)" />
            <h2 style={{ fontSize: '0.85rem', fontWeight: '1000', color: '#2D3A20', margin: 0, display: 'flex', alignItems: 'center' }}>
              {filteredMerchants.length} {filteredMerchants.length === 1 ? 'proyecto encontrado' : 'proyectos encontrados'}
              <span style={{ color: '#00cc00', marginLeft: '10px', fontSize: '10px', fontWeight: 'bold', background: '#e6ffef', padding: '2px 6px', borderRadius: '4px', border: '1px solid #00cc00' }}>V-9.5.4 (Global)</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {/* OPCIÓN: SUMAR COMERCIO EXTERNO */}
            {externalPlaceSelected && (
              <div 
                onClick={() => {
                  const params = new URLSearchParams();
                  params.set('name', externalPlaceSelected.name);
                  params.set('address', externalPlaceSelected.address || '');
                  params.set('lat', externalPlaceSelected.lat.toString());
                  params.set('lng', externalPlaceSelected.lng.toString());
                  router.push(`/sumar-comercio-vecino?${params.toString()}`);
                }}
                style={{ 
                  padding: '1.25rem', background: '#F0F4ED', borderRadius: '24px', 
                  border: '2px dashed #5F7D4A', cursor: 'pointer', transition: 'all 0.3s',
                  display: 'flex', gap: '15px'
                }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#5F7D4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Plus size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '1000', color: '#2D3A20' }}>{externalPlaceSelected.name} no está en Alimnet</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#5F7D4A', fontWeight: '700' }}>¡Sé el primero en sumarlo a la comunidad!</p>
                </div>
              </div>
            )}

            {/* --- AGENTE DE INTELIGENCIA: SECCIÓN DE DUDA / SUMAR COMERCIO --- */}
            {(filteredMerchants.length === 0 || potentialDuplicateCandidates.length > 0) && searchQuery.trim().length > 3 && (
              <div 
                style={{ 
                  padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', 
                  border: '1.5px dashed #5F7D4A', textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center'
                }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'white', border: '2px solid #5F7D4A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 4px' }}>
                  <Plus size={24} color="#5F7D4A" />
                </div>

                {potentialDuplicateCandidates.length > 0 ? (
                  <div style={{ width: '100%' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '1000', color: '#2D3A20' }}>Encontramos algo parecido en la red...</h4>
                    <p style={{ margin: '6px 0 12px', fontSize: '0.75rem', color: '#888', fontWeight: '700', lineHeight: '1.4' }}>
                      Buscaste "{searchQuery}", ¿es alguno de estos locales?
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                      {potentialDuplicateCandidates.map(pm => (
                        <button 
                          key={pm.id}
                          onClick={() => {
                            setSelectedMerchant(pm);
                            setPotentialDuplicateCandidates([]);
                            setExternalPlaceSelected(null);
                            trackClick('DUPLICATE_RESOLVED_YES', { merchant: pm.name });
                          }}
                          style={{
                            padding: '12px', background: 'var(--primary-dark)', color: 'white', borderRadius: '16px', border: 'none',
                            fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', textAlign: 'left',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '950' }}>{pm.name}</div>
                            <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>{pm.locations?.[0]?.locality || 'Ubicación local'}</div>
                          </div>
                          <ChevronRight size={16} />
                        </button>
                      ))}
                      <button 
                        onClick={() => {
                          trackClick('DUPLICATE_RESOLVED_NO', { name: searchQuery });
                          setPotentialDuplicateCandidates([]);
                        }}
                        style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', textDecoration: 'underline', marginTop: '5px' }}
                      >
                        No, es uno nuevo (Cargar al mapa)
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '1000', color: '#2D3A20' }}>¿No encontraste "{searchQuery}"?</h4>
                    <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: '#666', fontWeight: '600', lineHeight: '1.5' }}>
                      ¡Sumalo vos mismo a nuestra red soberana! Ayudanos a mapear la comida real.
                    </p>
                    <button 
                      onClick={() => {
                        if (externalPlaceSelected) {
                          trackClick('CTA_SUMAR_NEW_GOOGLE', { name: externalPlaceSelected.name });
                          router.push(`/unirse?placeId=${externalPlaceSelected.placeId}&name=${encodeURIComponent(externalPlaceSelected.name)}&address=${encodeURIComponent(externalPlaceSelected.address)}&lat=${externalPlaceSelected.lat}&lng=${externalPlaceSelected.lng}`);
                        } else {
                          trackClick('CTA_SUMAR_NEW_BLANK', { query: searchQuery });
                          router.push(`/unirse?name=${encodeURIComponent(searchQuery)}`);
                        }
                      }}
                      style={{ 
                        marginTop: '1.2rem', padding: '0.9rem 1.8rem', borderRadius: '16px', border: 'none',
                        background: '#5F7D4A', color: 'white', fontWeight: '950', fontSize: '0.85rem', cursor: 'pointer',
                        boxShadow: '0 8px 15px rgba(95, 125, 74, 0.25)'
                      }}>
                      SUMAR COMERCIO
                    </button>
                  </>
                )}
              </div>
            )}

            {filteredMerchants.map(m => (
              <MerchantCard key={m.id} merchant={m} onClick={() => {
                handleMerchantSelect(m);
                if (window.innerWidth < 768) setMobileView('map');
              }} />
            ))}
          </div>
        </section>

        {/* COLUMNA DERECHA: MAPA (FIJO EN DESKTOP) */}
        <section 
          ref={mapSectionRef}
          className="map-section" 
          style={{ 
            flex: 1, 
            position: isMobile ? (selectedMerchant ? 'relative' : 'absolute') : 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            background: '#EAEDE8',
            zIndex: (isMobile && mobileView !== 'map') ? -10 : 100, // Z-Index competitivo en mobile
            opacity: (isMobile && mobileView !== 'map') ? 0 : 1,
            pointerEvents: (isMobile && mobileView !== 'map') ? 'none' : 'auto', // Evitar clics fantasma
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden'
          }}
        >
          {/* BOTÓN SUMAR COMERCIO - TOP CENTER MOBILE PREMIUM */}
          <button 
            onClick={() => router.push('/sumate')}
            style={{
              position: 'absolute', 
              top: isMobile ? '12px' : '20px', 
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1100,
              padding: isMobile ? '0.4rem 1rem' : '0.6rem 1.2rem', 
              borderRadius: '30px', 
              background: '#2D3A20', 
              color: 'white', fontWeight: '900',
              border: 'none',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: 'nowrap'
            }}
          >
            <Plus size={isMobile ? 14 : 18} strokeWidth={3} /> SUMAR COMERCIO
          </button>
          {hasMounted && (
            <MapComponent
              providers={filteredMerchants.flatMap(m => (m.locations || []).map(l => ({
                id: `${m.id}-${l.id}`,
                name: m.name,
                category: m.type,
                type: m.type,
                location_lat: l.lat,
                location_lng: l.lng,
                city_zone: l.locality,
                is_exact_location: true
              })))}
              center={searchCoords ? [searchCoords.lat, searchCoords.lng] : undefined}
              zoom={searchCoords ? 13 : 11}
              onInteraction={(dir) => {
                if (dir === 'up') setStickyFilters(true);
                else setStickyFilters(false);
              }}
              onMarkerClick={(id) => {
                const merchantId = id.split('-')[0];
                const m = merchants.find(mm => mm.id === merchantId);
                if (m) setSelectedMerchant(m);
              }}
              onBoundsChange={(bounds) => setCurrentMapBounds(bounds)}
            />
          )}
        </section>

        {isMobile && selectedMerchant && (
          <div 
            style={{ 
              position: 'fixed', 
              bottom: 0, left: 0, right: 0, 
              zIndex: 10000, 
              height: '65vh',
              background: 'white',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
              borderTopLeftRadius: '32px',
              borderTopRightRadius: '32px',
              overflowY: 'auto',
              padding: '1.5rem',
              animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ width: '40px', height: '5px', background: '#eee', borderRadius: '5px', margin: '0 auto 1.5rem auto' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>{selectedMerchant.name}</h2>
                <p style={{ margin: '5px 0 0 0', color: '#5F7D4A', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase' }}>{selectedMerchant.type}</p>
              </div>
              <button onClick={() => setSelectedMerchant(null)} style={{ background: '#F8F9F7', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ flex: 1, marginTop: '1.5rem' }}>
              <DetailPanel
                merchant={selectedMerchant as Merchant}
                isLoggedIn={isLoggedIn}
                user={user}
                userProfile={userProfile}
                validators={validators}
                hasValidatedInitial={validatedMerchantIds.has(selectedMerchant.id)}
                onClose={() => setSelectedMerchant(null)}
                trackClick={trackClick}
                onValidate={(id) => {
                  setValidatedMerchantIds(prev => {
                    const next = new Set(prev);
                    next.add(id);
                    return next;
                  });
                }}
                isMobile={true}
              />
            </div>
          </div>
        )}


        {/* PANEL LATERAL DESKTOP SOLAMENTE */}
        {!isMobile && selectedMerchant && (
          <DetailPanel
            merchant={selectedMerchant as Merchant}
            isLoggedIn={isLoggedIn}
            user={user}
            userProfile={userProfile}
            validators={validators}
            hasValidatedInitial={selectedMerchant ? validatedMerchantIds.has(selectedMerchant.id) : false}
            onClose={() => setSelectedMerchant(null)}
            trackClick={trackClick}
            onValidate={handleValidate}
            isMobile={false}
          />
        )}
      </div>




      {/* MODAL DE FILTROS AVANZADOS */}
      <AdvancedFiltersModal
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        selectedFilters={selectedFilters}
        toggleFilter={toggleFilter}
        clearAll={() => setSelectedFilters([])}
        resultCount={filteredMerchants.length}
        userProfile={userProfile}
        router={router}
        isStyleActive={isStyleActive}
        setIsStyleActive={setIsStyleActive}
        setShowStyleWarning={setShowStyleWarning}
      />

      {/* MODAL DE AVISO: ARMA TU ESTILO (V-9.5.5) */}
      {showStyleWarning && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(5px)', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'white', borderRadius: '40px', maxWidth: '450px', width: '100%', padding: '2.5rem', textAlign: 'center', position: 'relative', boxShadow: '0 30px 100px rgba(0,0,0,0.3)', animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
             <div style={{ width: '90px', height: '90px', background: '#F0F4ED', borderRadius: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Sparkles size={40} color="#5F7D4A" />
             </div>
             <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1rem', lineHeight: '1.2' }}>¡Armá tu estilo alimenticio! 🥗</h2>
             <p style={{ color: '#666', fontSize: '1rem', fontWeight: '600', marginBottom: '2rem', lineHeight: '1.5' }}>
               Todavía no guardaste tus preferencias en tu perfil. Hacelo ahora para que el mapa se adapte a vos y descubras proyectos a tu medida de forma mágica. ✨
             </p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  onClick={() => {
                    setShowStyleWarning(false);
                    router.push('/mi-cuenta');
                  }}
                  style={{ width: '100%', padding: '1.2rem', borderRadius: '22px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '1000', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 25px rgba(95,125,74,0.3)' }}
                >
                  Configurar mi estilo ahora
                </button>
                <button 
                  onClick={() => setShowStyleWarning(false)}
                  style={{ width: '100%', padding: '1rem', borderRadius: '22px', border: 'none', background: 'transparent', color: '#888', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  Quizás más tarde
                </button>
             </div>
          </div>
        </div>
      )}
      {/* ONBOARDING MODAL PREMIUM */}
      {showOnboarding && user && (
        <OnboardingPremium 
          user={user} 
          onComplete={() => setShowOnboarding(false)} 
        />
      )}
      {/* MURO DE IDENTIDAD (MANDATORY) */}
      <IdentityWallModal 
        isOpen={showIdentityWall} 
        user={user} 
        onComplete={() => {
          setShowIdentityWall(false);
          // Recargar el perfil después de completar
          if (user) {
            supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
              if (data) setUserProfile(data);
            });
          }
        }} 
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
      id={`merchant-card-${merchant.id}`}
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
          }} title="Aval de la Comunidad">
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
              <ShieldCheck size={10} strokeWidth={3} /> AVAL DE LA COMUNIDAD
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
      <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.8, margin: '4px 0 8px 0', lineHeight: '1.4' }}>
        {merchant.bio_short?.substring(0, 85)}...
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '8px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {isDirect && (
            <span style={{ fontSize: '0.65rem', fontWeight: '800', background: '#e8f5e9', color: '#2e7d32', padding: '3px 8px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Leaf size={10} strokeWidth={2.5} /> Del campo
            </span>
          )}
          {visibleOtherTags.slice(0, 2).map(tag => (
            <span key={tag} style={{ fontSize: '0.65rem', fontWeight: '700', background: 'transparent', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: '12px', border: '1px solid #eee' }}>
              {tag}
            </span>
          ))}
        </div>


      </div>
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, user, userProfile, validators, hasValidatedInitial, onClose, trackClick, onValidate, isMobile }: { merchant: Merchant, isLoggedIn: boolean, user: any, userProfile: any, validators: any[], hasValidatedInitial: boolean, onClose: () => void, trackClick: (eventName: string, params?: Record<string, unknown>) => void, onValidate: (id: string) => void, isMobile: boolean }) {
  const router = useRouter();
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
      position: 'absolute', top: 0, left: 0, width: isMobile ? '100%' : '420px', height: '100%', 
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


          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
            {merchant.type?.split(',').map(s => s.trim()).map(t => (
              <span key={t} style={{ padding: '0.3rem 0.8rem', background: 'var(--primary-dark)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase' }}>{t}</span>
            ))}
            <span style={{ padding: '0.3rem 0.8rem', background: 'var(--soft-leaf)', color: 'white', borderRadius: '20px', fontSize: '0.65rem', fontWeight: '900' }}>Aval de la Comunidad</span>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* DIRECCIÓN / ADDRESS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                  <MapPin size={18} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '2px' }}>
                    {merchant.locations?.find((l: any) => l.is_primary)?.address || `${merchant.locations?.[0]?.locality || 'Ubicación local'}`}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {merchant.locations?.[0]?.district ? `${merchant.locations?.[0]?.district}, ` : ''}
                    {merchant.locations?.[0]?.province || 'Argentina'}
                  </p>
                </div>
              </div>

              {/* HORARIOS / HOURS WITH STATUS */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                  <Clock size={18} color="var(--primary)" />
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {merchant.working_hours ? (
                      <>
                        <span style={{ color: '#E47D00', fontWeight: '900' }}>Abre pronto</span>
                        <span style={{ opacity: 0.4 }}>•</span>
                        <span>{merchant.working_hours.split('\n')[0]}</span>
                      </>
                    ) : (
                      <span style={{ color: 'var(--text-secondary)' }}>Consultar horarios</span>
                    )}
                  </p>
                  <button onClick={() => trackClick('VIEW_HOURS', { id: merchant.id })} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '650', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Ver más horas <ChevronRight size={12} />
                  </button>
                </div>
              </div>

              {/* WHATSAPP ACTION */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                  <Globe size={18} color="var(--primary)" />
                </div>
                <div>
                   <a 
                    href={merchant.whatsapp ? `https://wa.me/${merchant.whatsapp.replace(/[^0-9]/g, '')}` : undefined} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (merchant.whatsapp) trackClick('CTA_WHATSAPP', { id: merchant.id, merchant: merchant.name });
                    }}
                    style={{ fontSize: '0.85rem', color: merchant.whatsapp ? 'var(--primary-dark)' : 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', cursor: merchant.whatsapp ? 'pointer' : 'default' }}
                   >
                     {merchant.whatsapp ? "Consultar vía WhatsApp" : "WhatsApp no disponible"}
                   </a>
                </div>
              </div>

              {/* INSTAGRAM (ALIMNET DATA) */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                  <Instagram size={18} color="var(--primary)" />
                </div>
                <div>
                   <a 
                    href={merchant.instagram_url || undefined} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (merchant.instagram_url) trackClick('CTA_INSTAGRAM', { id: merchant.id, merchant: merchant.name });
                    }}
                    style={{ fontSize: '0.85rem', color: merchant.instagram_url ? 'var(--primary-dark)' : 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', cursor: merchant.instagram_url ? 'pointer' : 'default' }}
                   >
                     {merchant.instagram_url ? "Ver Instagram Oficial" : "Sin Instagram cargado"}
                   </a>
                </div>
              </div>

              {/* WEB / TELÉFONO */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                   <Phone size={18} color="var(--primary)" />
                </div>
                <div>
                  <a 
                    href={merchant.phone ? `tel:${merchant.phone.replace(/[^0-9]/g, '')}` : undefined}
                    onClick={() => {
                      if (merchant.phone) trackClick('CTA_PHONE', { id: merchant.id, merchant: merchant.name });
                    }}
                    style={{ fontSize: '0.85rem', color: merchant.phone ? 'var(--primary-dark)' : 'var(--text-secondary)', fontWeight: '600', textDecoration: 'none', cursor: merchant.phone ? 'pointer' : 'default' }}
                  >
                    {merchant.phone ? "Llamar por teléfono" : "Teléfono no disponible"}
                  </a>
                </div>
              </div>

              {/* GOOGLE MAPS LINK */}
              {(() => {
                const loc = merchant.locations?.find((l: any) => l.is_primary) || merchant.locations?.[0];
                if (!loc) return null;
                return (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ padding: '4px', background: 'rgba(95, 125, 74, 0.05)', borderRadius: '8px' }}>
                      <Navigation size={18} color="var(--primary)" />
                    </div>
                    <div>
                      <a
                        href={merchant.google_maps_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(merchant.name)}+${encodeURIComponent(loc.locality || '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick('CTA_GMAPS_FICHA', { id: merchant.id, merchant: merchant.name })}
                        style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '800', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        Ver ficha en Google Maps <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                );
              })()}
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
          <a 
            href={merchant.whatsapp ? `https://wa.me/${merchant.whatsapp.replace(/[^0-9]/g, '')}` : undefined} 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => {
              if (merchant.whatsapp) trackClick('CTA_WHATSAPP_MAIN', { id: merchant.id, merchant: merchant.name });
            }}
            style={{ 
              padding: '1rem', 
              background: merchant.whatsapp ? 'var(--primary)' : '#f0f0f0', 
              color: merchant.whatsapp ? 'white' : '#999', 
              borderRadius: '16px', textAlign: 'center', fontWeight: '950', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
              pointerEvents: merchant.whatsapp ? 'auto' : 'none',
              boxShadow: merchant.whatsapp ? '0 4px 20px rgba(95, 125, 74, 0.25)' : 'none',
              textDecoration: 'none'
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: '900' }}>{merchant.whatsapp ? 'Realizar un pedido' : 'WhatsApp no disponible'}</span>
          </a>
          
          {/* ACCIÓN: SOY EL DUEÑO */}
          {!merchant.claimed && (
            <div style={{ marginTop: '1rem', textAlign: 'center', padding: '0.8rem', background: '#F8F9F5', borderRadius: '16px', border: '1px solid #E4EBDD' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '800', marginBottom: '6px' }}>¿Sos el dueño?</p>
              <button 
                onClick={() => {
                  trackClick('CLAIM_MERCHANT_START', { id: merchant.id, merchant: merchant.name });
                  router.push(`/unirse?merchantId=${merchant.id}`);
                }}
                style={{ 
                  background: 'none', border: '1.5px solid #5F7D4A', color: '#5F7D4A', 
                  padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.75rem', 
                  fontWeight: '900', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#5F7D4A'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#5F7D4A'; }}
              >
                Reivindicar Comercio
              </button>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <div style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(3px)'
          }}>
             <div style={{ 
               padding: isMobile ? '1.8rem 1.2rem' : '2.5rem 2rem', 
               textAlign: 'center', 
               width: isMobile ? '92%' : '90%', 
               background: 'rgba(255, 255, 255, 0.95)', 
               backdropFilter: 'blur(20px)',
               borderRadius: '32px',
               border: '1px solid rgba(255, 255, 255, 0.6)', 
               boxShadow: '0 25px 60px rgba(0,0,0,0.12)' 
             }}>
                <div style={{ fontSize: "1rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                  <Leaf size={20} fill="var(--primary)" fillOpacity={0.2} /> ALIMNET
                </div>
                <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em', lineHeight: '1.2' }}>Sumate a la red</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: isMobile ? '1.5rem' : '2rem', fontSize: isMobile ? '0.8rem' : '0.95rem', lineHeight: '1.5', fontWeight: '600' }}>
                  Hacelo de manera <span style={{ fontWeight: '900', color: 'var(--primary-dark)' }}>fácil y segura</span>. Sin formularios largos ni correos molestos; solo el puente directo hacia alimentos reales.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '280px', margin: '0 auto' }}>
                  <button onClick={() => router.push('/login')} className="button button-primary" style={{ width: '100%', borderRadius: '16px', padding: isMobile ? '0.7rem' : '0.9rem', fontSize: isMobile ? '0.9rem' : '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <LogIn size={isMobile ? 18 : 20} /> Entrar con Gmail
                  </button>
                  <button onClick={() => router.push('/registro')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '0.9rem' }}>Crear cuenta nueva</button>
                </div>
              </div>
          </div>
        )}
      </div>

      <style jsx global>{` 
        /* REMOVE FOCUS OUTLINES AND SQUARES */
        input:focus, select:focus, textarea:focus, button:focus {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent;
        }
        
        .search-capsule input:focus { background: transparent !important; }
        .search-capsule select:focus { background: transparent !important; }
      `}</style>
    </div>
  );
}

function LoginWall() {
  const router = useRouter();
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
            onClick={() => router.push('/login')}
            className="button button-primary"
            style={{ width: '100%', borderRadius: '18px', padding: '1rem', fontSize: '1rem' }}
          >
            Ingresar
          </button>
          <button
            onClick={() => router.push('/registro')}
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
