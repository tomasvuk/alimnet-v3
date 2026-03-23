'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ZONE_OPTIONS = [
  'Pilar', 'Escobar', 'Tigre', 'San Isidro', 'Vicente López', 'San Fernando',
  'San Martín', 'Tres de Febrero', 'Morón', 'Ituzaingó', 'Hurlingham',
  'Capital Federal', 'La Plata', 'Quilmes', 'Lanús', 'Avellaneda',
  'Campana', 'Zárate', 'Luján', 'San Miguel', 'José C. Paz', 'Malvinas Argentinas'
];

const DIETARY_OPTIONS = [
  { value: 'sin_gluten', label: 'Sin gluten' },
  { value: 'sin_azucar', label: 'Sin azúcar' },
  { value: 'sin_lactosa', label: 'Sin lactosa' },
  { value: 'keto', label: 'Keto' },
  { value: 'vegetariano', label: 'Vegetariano' },
  { value: 'plant_based', label: 'Plant-based' },
];

const PRODUCTION_OPTIONS = [
  'Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sustentable', 'Sin ultraprocesados', 'Pastura'
];

const PRODUCT_CATEGORIES = [
  'Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'
];

const DELIVERY_OPTIONS = [
  'Retiro en local', 'Entrega a domicilio', 'Retiro y Entrega'
];

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  locality: string | null;
  district: string | null;
  province: string | null;
  country: string | null;
  role: string | null;
  dietary_type: string | null;
  intolerances: string[];
  preferences: string[];
  is_public: boolean;
  delivery_preference: string | null;
  preferred_zones: string[];
  search_radius_km: number | null;
  categories_interest: string[];
}

export default function MiCuentaPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('perfil');
  const [isMobile, setIsMobile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [zoneSearch, setZoneSearch] = useState('');
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    locality: '',
    province: '',
    dietary_type: '',
    delivery_preference: 'Retiro y Entrega',
    preferred_zones: [] as string[],
    intolerances: [] as string[],
    preferences: [] as string[],
    categories_interest: [] as string[],
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        const p = profileData as UserProfile;
        setProfile(p);
        setEditForm({
          first_name: p.first_name || '',
          last_name: p.last_name || '',
          locality: p.locality || '',
          province: p.province || '',
          dietary_type: p.dietary_type || '',
          delivery_preference: p.delivery_preference || 'Retiro y Entrega',
          preferred_zones: Array.isArray(p.preferred_zones) ? p.preferred_zones : [],
          intolerances: Array.isArray(p.intolerances) ? p.intolerances : [],
          preferences: Array.isArray(p.preferences) ? p.preferences : [],
          categories_interest: Array.isArray(p.categories_interest) ? p.categories_interest : [],
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          full_name: `${editForm.first_name} ${editForm.last_name}`.trim(),
          locality: editForm.locality,
          province: editForm.province,
          dietary_type: editForm.dietary_type,
          delivery_preference: editForm.delivery_preference,
          preferred_zones: editForm.preferred_zones,
          intolerances: editForm.intolerances,
          preferences: editForm.preferences,
          categories_interest: editForm.categories_interest,
        })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => prev ? {
        ...prev,
        ...editForm,
        full_name: `${editForm.first_name} ${editForm.last_name}`.trim()
      } : null);
      
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Hubo un problema al guardar. Intentá de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const toggleZone = (zone: string) => {
    setEditForm(prev => ({
      ...prev,
      preferred_zones: prev.preferred_zones.includes(zone)
        ? prev.preferred_zones.filter(z => z !== zone)
        : [...prev.preferred_zones, zone]
    }));
  };

  const filteredZones = ZONE_OPTIONS.filter(z => z.toLowerCase().includes(zoneSearch.toLowerCase()));

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', border: '4px solid #E4EBDD', borderTopColor: '#5F7D4A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: '#6B7C5E', fontWeight: '700' }}>Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : user?.email?.split('@')[0] || 'Usuario';
  const initials = profile?.first_name ? `${profile.first_name[0]}${profile.last_name?.[0] || ''}`.toUpperCase() : 'U';
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }) : 'Reciente';

  const renderProfileTab = () => (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Success Toast */}
      {saveSuccess && (
        <div style={{ 
          position: 'fixed', top: '70px', left: '50%', transform: 'translateX(-50%)',
          background: '#065F46', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '16px',
          fontWeight: '800', fontSize: '0.85rem', zIndex: 999, display: 'flex', alignItems: 'center', gap: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'slideDown 0.3s ease-out'
        }}>
          <Check size={18} /> ¡Perfil actualizado correctamente!
        </div>
      )}

      {/* HERO: PROFILE CARD */}
      <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #E4EBDD', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ height: isMobile ? '100px' : '120px', background: 'linear-gradient(135deg, #2D3A20, #5F7D4A, #7FA05B)', position: 'relative' }}>
          <Leaf size={120} style={{ position: 'absolute', right: '20px', top: '-20px', opacity: 0.12, color: 'white' }} />
        </div>
        <div style={{ padding: isMobile ? '0 1.5rem 1.5rem' : '0 2.5rem 2rem', marginTop: '-45px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.2rem' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '28px', background: 'linear-gradient(135deg, #5F7D4A, #7FA05B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: '950', border: '4px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', flexShrink: 0 }}>{initials}</div>
              <div style={{ paddingBottom: '4px' }}>
                <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: '950', color: '#2D3A20', lineHeight: 1.2 }}>{displayName}</h1>
                <p style={{ color: '#6B7C5E', fontSize: '0.8rem', marginTop: '4px' }}>{user?.email}</p>
              </div>
            </div>
            <button onClick={() => editing ? handleSaveProfile() : setEditing(true)} disabled={saving} style={{ padding: '0.8rem 1.8rem', borderRadius: '16px', border: 'none', background: editing ? (saving ? '#94a88a' : '#5F7D4A') : 'linear-gradient(135deg, #5F7D4A, #4A6B35)', color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', boxShadow: '0 6px 20px rgba(95,125,74,0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', flexShrink: 0 }}>
              {saving ? 'Guardando...' : editing ? <><Check size={18} /> Guardar</> : <><Edit3 size={18} /> Editar Perfil</>}
            </button>
          </div>
          {editing && <button onClick={() => setEditing(false)} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>✕ Cancelar edición</button>}
        </div>
      </div>

      {/* DATOS PERSONALES */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}><User size={16} color="#5F7D4A" /> Datos Personales</h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.2rem' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            {editing ? <input type="text" value={editForm.first_name} onChange={(e) => setEditForm(p => ({ ...p, first_name: e.target.value }))} style={inputStyle} /> : <p style={valueStyle}>{profile?.first_name || '—'}</p>}
          </div>
          <div>
            <label style={labelStyle}>Apellido</label>
            {editing ? <input type="text" value={editForm.last_name} onChange={(e) => setEditForm(p => ({ ...p, last_name: e.target.value }))} style={inputStyle} /> : <p style={valueStyle}>{profile?.last_name || '—'}</p>}
          </div>
          <div>
            <label style={labelStyle}>Ubicación</label>
            {editing ? <input type="text" value={editForm.locality} onChange={(e) => setEditForm(p => ({ ...p, locality: e.target.value }))} style={inputStyle} /> : <p style={valueStyle}><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> {profile?.locality || '—'}</p>}
          </div>
          <div>
            <label style={labelStyle}>Provincia</label>
            {editing ? <input type="text" value={editForm.province} onChange={(e) => setEditForm(p => ({ ...p, province: e.target.value }))} style={inputStyle} /> : <p style={valueStyle}>{profile?.province || '—'}</p>}
          </div>
        </div>
      </div>

      {/* ENTREGA */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}><Truck size={16} color="#2563EB" /> ¿Cómo preferís recibir?</h3>
        {editing ? (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {DELIVERY_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setEditForm(p => ({ ...p, delivery_preference: opt }))} style={{ padding: '0.8rem 1rem', borderRadius: '12px', border: editForm.delivery_preference === opt ? '2px solid #5F7D4A' : '1px solid #E4EBDD', background: editForm.delivery_preference === opt ? '#F0F4ED' : 'white', cursor: 'pointer', fontWeight: '800', fontSize: '0.85rem' }}>{opt}</button>
            ))}
          </div>
        ) : (
          <p style={valueStyle}>{profile?.delivery_preference || 'No especificado'}</p>
        )}
      </div>

      {/* ZONAS */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}><MapPin size={16} color="#D97706" /> Zonas de entrega</h3>
        {editing ? (
          <div>
             <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
              <input type="text" value={zoneSearch} onChange={(e) => setZoneSearch(e.target.value)} placeholder="Buscar zona..." style={{ width: '100%', padding: '0.5rem' , paddingLeft: '2rem', borderRadius: '10px', border: '1px solid #ddd' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {filteredZones.map(z => (
                <button key={z} onClick={() => toggleZone(z)} style={{ padding: '0.4rem 0.8rem', borderRadius: '20px', border: editForm.preferred_zones.includes(z) ? '2px solid #5F7D4A' : '1px solid #ddd', background: editForm.preferred_zones.includes(z) ? '#F0F4ED' : 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}>{z}</button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {profile?.preferred_zones.map(z => <span key={z} style={{ padding: '0.3rem 0.8rem', background: '#F0F4ED', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>{z}</span>)}
          </div>
        )}
      </div>

      {/* ALIMENTACIÓN & OTROS */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}><Leaf size={16} color="#059669" /> Preferencias y Alimentación</h3>
        
        <label style={labelStyle}>Mi Alimentación</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem' }}>
          {editing ? DIETARY_OPTIONS.map(opt => {
            const sel = editForm.intolerances.includes(opt.label);
            return <button key={opt.value} onClick={() => setEditForm(p => ({ ...p, intolerances: sel ? p.intolerances.filter(i=>i!==opt.label) : [...p.intolerances, opt.label] }))} style={{ padding: '0.4rem 0.8rem', borderRadius: '14px', border: sel ? '2px solid #059669' : '1px solid #ddd', background: sel ? '#ECFDF5' : 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}>{opt.label}</button>
          }) : profile?.intolerances.map(i => <span key={i} style={{ padding: '0.3rem 0.8rem', background: '#ECFDF5', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>{i}</span>)}
        </div>

        <label style={labelStyle}>Producción</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {editing ? PRODUCTION_OPTIONS.map(opt => {
            const sel = editForm.preferences.includes(opt);
            return <button key={opt} onClick={() => setEditForm(p => ({ ...p, preferences: sel ? p.preferences.filter(i=>i!==opt) : [...p.preferences, opt] }))} style={{ padding: '0.4rem 0.8rem', borderRadius: '14px', border: sel ? '2px solid #5F7D4A' : '1px solid #ddd', background: sel ? '#F0F4ED' : 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}>{opt}</button>
          }) : profile?.preferences.map(i => <span key={i} style={{ padding: '0.3rem 0.8rem', background: '#F0F4ED', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700' }}>{i}</span>)}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'perfil') return renderProfileTab();
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Próximamente...</div>;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingBottom: '80px' }}>
      <header style={{ padding: '1rem', background: '#F4F1E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span onClick={()=>window.location.href='/'} style={{ fontWeight: '950', cursor:'pointer' }}>ALIMNET</span>
        <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#5F7D4A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900' }}>{initials}</div>
      </header>
      
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {['perfil', 'favoritos', 'config'].map(t => <button key={t} onClick={()=>setActiveTab(t)} style={{ padding: '0.5rem 1rem', borderRadius: '12px', border: 'none', background: activeTab === t ? '#5F7D4A' : 'transparent', color: activeTab === t ? 'white' : '#6B7C5E', fontWeight: '800', cursor: 'pointer' }}>{t.toUpperCase()}</button>)}
        </div>
        {renderContent()}
      </main>

      <style jsx>{` @keyframes spin { to { transform: rotate(360deg); } } `}</style>
    </div>
  );
}

const sectionStyle: React.CSSProperties = { background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD', marginBottom: '1rem' };
const sectionTitleStyle: React.CSSProperties = { fontSize: '0.9rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' };
const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.65rem', fontWeight: '900', color: '#6B7C5E', marginBottom: '0.3rem', textTransform: 'uppercase' };
const inputStyle: React.CSSProperties = { width: '100%', padding: '0.5rem', borderRadius: '10px', border: '1px solid #ddd' };
const valueStyle: React.CSSProperties = { fontSize: '0.95rem', fontWeight: '700', color: '#2D3A20' };
