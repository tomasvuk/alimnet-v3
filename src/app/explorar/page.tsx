'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';
import { 
  Search, MapPin, Filter, Star, Check, X, 
  ChevronRight, Info, Map as MapIcon, List,
  Heart, Settings, ExternalLink, ArrowRight,
  Leaf, LogIn, CheckCircle, Wheat,
  Sprout, Sun, CloudSun, Store, ChefHat,
  UtensilsCrossed, Package, Truck, Clock
} from 'lucide-react';

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
  validation_count: number;
  status: string;
  tags?: string[];
  working_hours?: string;
  delivery_info?: string;
  locations?: any[];
}

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: Sprout },
  { id: 'abastecedor', label: 'Abastecedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const ADVANCED_CATEGORIES = {
  modalidad: { label: 'Cómo querés recibir', options: ['Retiro en local', 'Entrega a domicilio', 'Retiro y Entrega'] },
  alimentacion: { label: 'Tipo de alimentación', options: ['Sin gluten', 'Sin azúcar', 'Sin lactosa', 'Keto', 'Vegetariano', 'Plant-based'] },
  calidad: { label: 'Calidad y Producción', options: ['Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sin ultraprocesados', 'Sustentable', 'Pastura'] },
  animal: { label: 'Producción Animal', options: ['Pastura', 'Grass-fed', 'Bienestar animal'] },
  certificaciones: { label: 'Certificaciones / asociaciones', options: ['Demeter', 'AABDA', 'Orgánico Certificado'] },
  productos: { label: '¿Qué estás buscando?', options: ['Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'] },
};

export default function ExplorarPage() {
  const [hasMounted, setHasMounted] = useState(false);
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list'); 
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  useEffect(() => {
    let result = merchants.filter(m => selectedCategories.includes((m.type || '').toLowerCase()));
    if (searchLocation.trim().length > 0) {
      const q = normalizeString(searchLocation);
      result = result.filter(m => m.locations?.some(l => normalizeString(l.locality || '').includes(q)));
    }
    if (selectedFilters.length > 0) {
      result = result.filter(m => selectedFilters.every(f => (m.tags || []).includes(f)));
    }
    setFilteredMerchants(result);
  }, [merchants, selectedCategories, selectedFilters, searchLocation]);

  const handleValidate = async (merchantId: string) => {
    if (!user) return;
    try {
      await supabase.from('validations').insert({ merchant_id: merchantId, user_id: user.id });
      setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
      setMerchants(prev => prev.map(m => {
        if (m.id === merchantId) {
          const nc = (m.validation_count || 0) + 1;
          supabase.from('merchants').update({ validation_count: nc }).eq('id', merchantId);
          return { ...m, validation_count: nc };
        }
        return m;
      }));
    } catch (e) { console.error(e); }
  };

  const mapProviders = filteredMerchants.flatMap(m => 
    (m.locations || []).map(l => ({
      id: `${m.id}-${l.id}`,
      name: m.name,
      type: m.type,
      category: m.type,
      city_zone: l.locality,
      location_lat: l.lat || -34.6037,
      location_lng: l.lng || -58.3816,
      is_exact_location: l.location_type === 'fixed'
    }))
  );

  if (loading || !hasMounted) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}>Iniciando Mapa...</div>;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#F0F4ED' }}>
      <header style={{ height: '52px', background: '#F4F1E6', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', zIndex: 1000, transform: (!isHeaderVisible && isMobile) ? 'translateY(-100%)' : 'none', transition: 'transform 0.3s' }}>
        <span onClick={() => window.location.href='/'} style={{ fontWeight: '950', cursor: 'pointer', color: '#2D3A20' }}>ALIMNET</span>
        <div onClick={() => window.location.href='/mi-cuenta'} style={{ cursor: 'pointer' }}>
           {isLoggedIn ? <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#5F7D4A', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' }}>{userProfile?.first_name?.[0] || 'U'}</div> : <LogIn size={20} />}
        </div>
      </header>

      <div style={{ background: 'white', padding: '1rem', borderBottom: '1px solid #eee' }}>
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} placeholder="¿Dónde buscás?" style={{ width: '100%', padding: '0.8rem 2.5rem', borderRadius: '16px', border: '2px solid #F0F4ED', outline: 'none', fontWeight: '600' }} />
        </div>
      </div>

      <div style={{ padding: '0.8rem', background: '#F8F9F5', display: 'flex', gap: '8px', overflowX: 'auto' }} className="no-scrollbar">
        {CATEGORIES.map(cat => {
          const active = selectedCategories.includes(cat.id);
          return (
            <button key={cat.id} onClick={() => setSelectedCategories(p => p.includes(cat.id) ? p.filter(x => x !== cat.id) : [...p, cat.id])} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: active ? '2px solid #5F7D4A' : '1px solid #ddd', background: active ? '#F0F4ED' : 'white', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
              <cat.icon size={16} /> {cat.label}
            </button>
          );
        })}
        <button onClick={() => setShowAdvancedFilters(true)} style={{ padding: '0.6rem 1rem', borderRadius: '14px', border: '1px solid #ddd', background: 'white', fontWeight: '800', fontSize: '0.8rem' }}>+ Filtros</button>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <section style={{ flex: (isMobile && mobileView === 'map') ? 0 : 1, overflowY: 'auto', padding: '1rem', display: (isMobile && mobileView === 'map') ? 'none' : 'block' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredMerchants.map(m => (
              <div key={m.id} onClick={() => setSelectedMerchant(m)} style={{ padding: '1.2rem', background: 'white', borderRadius: '24px', border: '1px solid #E4EBDD', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ fontWeight: '950', color: '#2D3A20' }}>{m.name}</h3>
                  <div style={{ background: '#F0F4ED', color: '#5F7D4A', padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} /> {m.validation_count || 0}
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '6px', lineHeight: '1.4' }}>{m.bio_short}</p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {(m.tags || []).slice(0, 3).map(t => <span key={t} style={{ fontSize: '0.65rem', fontWeight: '800', background: '#F8F9F5', padding: '2px 8px', borderRadius: '6px' }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ flex: (isMobile && mobileView === 'list') ? 0 : 1.5, display: (isMobile && mobileView === 'list') ? 'none' : 'block' }}>
          <MapComponent providers={mapProviders} />
        </section>

        {selectedMerchant && (
           <DetailPanel 
             merchant={selectedMerchant} 
             isLoggedIn={isLoggedIn} 
             hasValidated={validatedMerchantIds.has(selectedMerchant.id)}
             onClose={() => setSelectedMerchant(null)} 
             onValidate={handleValidate} 
           />
        )}
      </div>

      {isMobile && (
        <button onClick={() => setMobileView(v => v === 'list' ? 'map' : 'list')} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#2D3A20', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: '900', zIndex: 1100, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
          {mobileView === 'list' ? <><MapIcon size={18} /> Ver Mapa</> : <><List size={18} /> Ver Lista</>}
        </button>
      )}

      {showAdvancedFilters && (
        <AdvancedFiltersModal 
          selected={selectedFilters} 
          onClose={() => setShowAdvancedFilters(false)} 
          onToggle={f => setSelectedFilters(p => p.includes(f) ? p.filter(x => x !== f) : [...p, f])}
          clearAll={() => setSelectedFilters([])}
          count={filteredMerchants.length}
        />
      )}
    </div>
  );
}

function DetailPanel({ merchant, isLoggedIn, hasValidated, onClose, onValidate }: any) {
  return (
    <div style={{ position: 'absolute', top: 0, right: 0, width: '100%', maxWidth: '420px', height: '100%', background: 'white', zIndex: 1100, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', animation: 'slideIn 0.3s ease-out' }}>
      <div style={{ padding: '1.2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontWeight: '950', fontSize: '1.2rem' }}>{merchant.name}</h2>
        <button onClick={onClose} style={{ padding: '8px', background: '#f5f5f5', borderRadius: '50%', border: 'none' }}><X size={20}/></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        <div style={{ height: '200px', background: 'linear-gradient(135deg, #5F7D4A, #2D3A20)', borderRadius: '24px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Leaf size={60} />
        </div>
        
        <div style={{ background: '#F8F9F5', padding: '1.5rem', borderRadius: '24px', border: '1px solid #E4EBDD', marginBottom: '1.5rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A' }}>VALIDACIÓN COMUNITARIA</span>
              <div style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={16} /> {merchant.validation_count || 0}</div>
           </div>
           <button 
             onClick={() => onValidate(merchant.id)}
             disabled={hasValidated}
             style={{ width: '100%', padding: '1rem', borderRadius: '16px', background: hasValidated ? '#e8f5e9' : '#5F7D4A', color: hasValidated ? '#2E7D32' : 'white', fontWeight: '900', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
           >
             {hasValidated ? <><CheckCircle size={20} /> ¡Proyecto Validado!</> : <><Heart size={20} /> Validar Proyecto</>}
           </button>
        </div>

        <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '950', color: '#999', marginBottom: '0.5rem' }}>Historia</h4>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#2D3A20' }}>{merchant.bio_long || merchant.bio_short}</p>
        
        <div style={{ marginTop: '2rem' }}>
           <h4 style={{ textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '950', color: '#999', marginBottom: '1rem' }}>Logística</h4>
           <div style={{ display: 'flex', gap: '12px', marginBottom: '1rem' }}>
              <Clock size={18} color="#5F7D4A" />
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: '900' }}>Horarios</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{merchant.working_hours || "Consultar directamente."}</p>
              </div>
           </div>
           <div style={{ display: 'flex', gap: '12px' }}>
              <Truck size={18} color="#5F7D4A" />
              <div>
                <p style={{ fontSize: '0.8rem', fontWeight: '900' }}>Entrega / Retiro</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{merchant.delivery_info || "Consultar alcance."}</p>
              </div>
           </div>
        </div>
      </div>
      <style jsx>{` @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } } `}</style>
    </div>
  );
}

function AdvancedFiltersModal({ selected, onClose, onToggle, clearAll, count }: any) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: 'white', width: '100%', maxWidth: '600px', maxHeight: '85vh', borderRadius: '32px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: '1.2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <h3 style={{ fontWeight: '950', fontSize: '1.1rem' }}>Filtros Avanzados</h3>
           <button onClick={onClose}><X/></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }} className="no-scrollbar">
          {Object.entries(ADVANCED_CATEGORIES).map(([key, section]) => (
            <div key={key} style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '1rem' }}>{section.label}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {section.options.map(o => (
                  <button key={o} onClick={() => onToggle(o)} style={{ padding: '0.6rem 1.2rem', borderRadius: '14px', border: selected.includes(o) ? '2.5px solid #5F7D4A' : '1px solid #ddd', background: selected.includes(o) ? '#F0F4ED' : 'white', fontWeight: '800', fontSize: '0.85rem' }}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', display: 'flex', gap: '1rem' }}>
          <button onClick={clearAll} style={{ padding: '1rem', flex: 1, borderRadius: '16px', border: '1px solid #ddd', fontWeight: '800' }}>Limpiar</button>
          <button onClick={onClose} style={{ padding: '1rem', flex: 2, borderRadius: '16px', background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '900' }}>Ver {count} resultados</button>
        </div>
      </div>
    </div>
  );
}
