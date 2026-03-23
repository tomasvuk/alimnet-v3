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

// Carga dinámica del mapa para evitar error "window is not defined"
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', fontWeight: '800' }}>Cargando mapa...</div>
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
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['productor', 'abastecedor', 'restaurante', 'chef']);
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['Productor', 'Abastecedor', 'Restaurante', 'Chef']);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list'); 
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchMode, setSearchMode] = useState<'perfil' | 'libre'>('perfil');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
          setUserProfile(profile);
          if (profile.locality) setSearchLocation(profile.locality);
          
          const { data: vData } = await supabase.from('validations').select('merchant_id').eq('user_id', user.id);
          if (vData) setValidatedMerchantIds(new Set(vData.map(v => v.merchant_id)));
        }
      }

      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('status', 'active');
      if (mData) setMerchants(mData);
      setLoading(false);
    };
    init();
  }, [searchMode]);

  useEffect(() => {
    let result = merchants.filter(m => selectedCategories.includes((m.type || '').toLowerCase()));
    
    if (searchLocation.trim().length > 0) {
      const q = normalizeString(searchLocation);
      result = result.filter(m => m.locations?.some(l => normalizeString(l.locality).includes(q)));
    }

    const tagsToFilter = selectedFilters.filter(f => !['Productor', 'Abastecedor', 'Restaurante', 'Chef'].includes(f));
    if (tagsToFilter.length > 0) {
      result = result.filter(m => tagsToFilter.every(f => (m.tags || []).includes(f)));
    }

    setFilteredMerchants(result);
  }, [merchants, selectedCategories, selectedFilters, searchLocation]);

  const handleValidate = async (merchantId: string) => {
    if (!user) { alert("Iniciá sesión para validar."); window.location.href='/login'; return; }
    if (validatedMerchantIds.has(merchantId)) return;

    try {
      const { error } = await supabase.from('validations').insert({ merchant_id: merchantId, user_id: user.id });
      if (error) throw error;

      const m = merchants.find(x => x.id === merchantId);
      if (m) {
        const nc = (m.validation_count || 0) + 1;
        await supabase.from('merchants').update({ validation_count: nc }).eq('id', merchantId);
        setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
        setMerchants(prev => prev.map(x => x.id === merchantId ? { ...x, validation_count: nc } : x));
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando Alimnet...</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      <header style={{ height: '52px', background: '#F4F1E6', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', zIndex: 1000 }}>
        <span onClick={() => window.location.href='/'} style={{ fontWeight: '950', cursor: 'pointer', color: '#2D3A20' }}>ALIMNET</span>
        <div onClick={() => window.location.href='/mi-cuenta'} style={{ cursor: 'pointer' }}>
           {isLoggedIn ? <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#5F7D4A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>{userProfile?.first_name?.[0] || 'U'}</div> : <LogIn size={20} />}
        </div>
      </header>

      <div style={{ background: 'white', padding: '1rem', borderBottom: '1px solid #eee' }}>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="¿Qué zona buscás?" style={{ width: '100%', padding: '0.8rem 2.5rem', borderRadius: '16px', border: '2px solid #F0F4ED', outline: 'none' }} />
        </div>
      </div>

      <div style={{ background: '#F8F9F5', padding: '0.8rem', display: 'flex', gap: '8px', overflowX: 'auto' }} className="no-scrollbar">
        {CATEGORIES.map(c => {
          const active = selectedCategories.includes(c.id);
          return <button key={c.id} onClick={() => {
            setSelectedCategories(p => p.includes(c.id) ? p.filter(x => x !== c.id) : [...p, c.id]);
            setSelectedFilters(p => p.includes(c.label) ? p.filter(x => x !== c.label) : [...p, c.label]);
          }} style={{ padding: '0.5rem 1rem', borderRadius: '14px', border: active ? '2px solid #5F7D4A' : '1px solid #ddd', background: active ? '#F0F4ED' : 'white', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><c.icon size={16}/> {c.label}</button>
        })}
        <button onClick={() => setShowAdvancedFilters(true)} style={{ padding: '0.5rem 1rem', borderRadius: '14px', border: '1px solid #ddd', background: 'white', fontWeight: '800' }}>+ Filtros</button>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <section style={{ flex: (isMobile && mobileView === 'map') ? 0 : 1, overflowY: 'auto', padding: '1rem', display: (isMobile && mobileView === 'map') ? 'none' : 'block' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredMerchants.map(m => (
              <div key={m.id} onClick={() => setSelectedMerchant(m)} style={{ padding: '1rem', background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontWeight: '950' }}>{m.name}</h3>
                  <div style={{ background: '#F0F4ED', color: '#5F7D4A', padding: '4px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={12} /> {m.validation_count || 0}
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{m.bio_short}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: (isMobile && mobileView === 'list') ? 0 : 1.5, display: (isMobile && mobileView === 'list') ? 'none' : 'block' }}>
          <MapComponent merchants={filteredMerchants} selectedId={selectedMerchant?.id} onMerchantClick={m => setSelectedMerchant(m)} />
        </section>
      </div>

      {isMobile && (
        <button onClick={() => setMobileView(v => v === 'list' ? 'map' : 'list')} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#2D3A20', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: '900', zIndex: 1100, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mobileView === 'list' ? <><MapIcon size={18} /> Ver Mapa</> : <><List size={18} /> Ver Lista</>}
        </button>
      )}

      {selectedMerchant && (
        <DetailPanel 
          merchant={selectedMerchant} 
          isLoggedIn={isLoggedIn} 
          hasValidated={validatedMerchantIds.has(selectedMerchant.id)}
          onClose={() => setSelectedMerchant(null)} 
          onValidate={handleValidate}
        />
      )}

      {showAdvancedFilters && (
        <FiltersModal 
          selected={selectedFilters}
          onClose={() => setShowAdvancedFilters(false)}
          onToggle={f => setSelectedFilters(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f])}
          count={filteredMerchants.length}
        />
      )}
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, hasValidated, onClose, onValidate }: any) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto', animation: 'slideUp 0.3s ease-out' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#eee', border: 'none', borderRadius: '50%', padding: '8px' }}><X size={20}/></button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '950' }}>{merchant.name}</h2>
            <div style={{ display: 'flex', gap: '8px', color: '#5F7D4A', fontWeight: '800', fontSize: '0.85rem', marginTop: '4px' }}>
               <CheckCircle size={16} /> {merchant.validation_count || 0} validaciones comunitarias
            </div>
          </div>
        </div>

        <button 
          onClick={() => onValidate(merchant.id)}
          disabled={hasValidated}
          style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', background: hasValidated ? '#F0F4ED' : '#5F7D4A', color: hasValidated ? '#5F7D4A' : 'white', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem' }}
        >
          {hasValidated ? <><CheckCircle size={20} /> ¡Proyecto Validado!</> : <><Heart size={20} /> Validar Proyecto</>}
        </button>

        <div style={{ marginTop: '2rem' }}>
          <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '950', color: '#999', marginBottom: '0.5rem' }}>Historia y Propósito</h4>
          <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#2D3A20' }}>{merchant.bio_long || merchant.bio_short}</p>
        </div>
      </div>
      <style jsx>{` @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } } `}</style>
    </div>
  );
}

function FiltersModal({ selected, onClose, onToggle, count }: any) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: '500px', borderRadius: '32px', overflow: 'hidden', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee' }}>
           <h3 style={{ fontWeight: '950' }}>Filtros Avanzados</h3>
           <button onClick={onClose}><X/></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {Object.entries(ADVANCED_CATEGORIES).map(([key, section]) => (
            <div key={key} style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{section.label}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {section.options.map(o => (
                  <button key={o} onClick={() => onToggle(o)} style={{ padding: '0.5rem 1rem', borderRadius: '14px', border: selected.includes(o) ? '2px solid #5F7D4A' : '1px solid #ddd', background: selected.includes(o) ? '#F0F4ED' : 'white', fontWeight: '700', fontSize: '0.8rem' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eee' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: '#5F7D4A', color: 'white', fontWeight: '900', border: 'none' }}>Ver {count} resultados</button>
        </div>
      </div>
    </div>
  );
}
