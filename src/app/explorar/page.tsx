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
  validation_count: number;
  status: string;
  tags?: string[];
  locations?: any[];
}

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
      if (mData) {
        setMerchants(mData);
        setFilteredMerchants(mData);
      }
      setLoading(false);
    };
    init();
  }, []);

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
      await supabase.from('validations').insert({ merchant_id: merchantId, user_id: user.id });
      const m = merchants.find(x => x.id === merchantId);
      if (m) {
        const nc = (m.validation_count || 0) + 1;
        await supabase.from('merchants').update({ validation_count: nc }).eq('id', merchantId);
        setValidatedMerchantIds(prev => new Set(prev).add(merchantId));
        setMerchants(prev => prev.map(x => x.id === merchantId ? { ...x, validation_count: nc } : x));
      }
    } catch (e) { console.error(e); }
  };

  // --- TRANSFORMACIÓN PARA EL MAPCOMPONET ---
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
        {[
          { id: 'productor', label: 'Productor', icon: Store },
          { id: 'abastecedor', label: 'Abastecedor', icon: Package },
          { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
          { id: 'chef', label: 'Chef', icon: ChefHat },
        ].map(c => {
          const active = selectedCategories.includes(c.id);
          return <button key={c.id} onClick={() => {
            setSelectedCategories(p => p.includes(c.id) ? p.filter(x => x !== c.id) : [...p, c.id]);
            setSelectedFilters(p => p.includes(c.label) ? p.filter(x => x !== c.label) : [...p, c.label]);
          }} style={{ padding: '0.5rem 1rem', borderRadius: '14px', border: active ? '2px solid #5F7D4A' : '1px solid #ddd', background: active ? '#F0F4ED' : 'white', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>{c.label}</button>
        })}
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

        <section style={{ flex: (isMobile && mobileView === 'list') ? 0 : 1.5, display: (isMobile && mobileView === 'list') ? 'none' : 'block', height: '100%' }}>
          <MapComponent providers={mapProviders} />
        </section>
      </div>

      {isMobile && (
        <button onClick={() => setMobileView(v => v === 'list' ? 'map' : 'list')} style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: '#2D3A20', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: '900', zIndex: 1100, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {mobileView === 'list' ? <><MapIcon size={18} /> Ver Mapa</> : <><List size={18} /> Ver Lista</>}
        </button>
      )}

      {selectedMerchant && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'white', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setSelectedMerchant(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#eee', border: 'none', borderRadius: '50%', padding: '8px' }}><X size={20}/></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '950', marginBottom: '1rem' }}>{selectedMerchant.name}</h2>
            <button 
              onClick={() => handleValidate(selectedMerchant.id)}
              disabled={validatedMerchantIds.has(selectedMerchant.id)}
              style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', background: validatedMerchantIds.has(selectedMerchant.id) ? '#F0F4ED' : '#5F7D4A', color: validatedMerchantIds.has(selectedMerchant.id) ? '#5F7D4A' : 'white', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              {validatedMerchantIds.has(selectedMerchant.id) ? '¡Proyecto Validado!' : 'Validar Proyecto'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
