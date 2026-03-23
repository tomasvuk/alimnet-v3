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
  { value: '', label: 'Sin especificar' },
  { value: 'omnivoro', label: '🍖 Omnívoro' },
  { value: 'vegetariano', label: '🥬 Vegetariano' },
  { value: 'vegano', label: '🌱 Vegano' },
  { value: 'flexitariano', label: '🥗 Flexitariano' },
  { value: 'celiaco', label: '🌾 Sin Gluten / Celíaco' },
  { value: 'sin_lactosa', label: '🥛 Sin Lactosa' },
  { value: 'keto', label: '🥑 Keto / Low Carb' },
  { value: 'otro', label: '✨ Otro' },
];

const INTOLERANCES_OPTIONS = [
  'Gluten', 'Lactosa', 'Frutos secos', 'Maní', 'Soja', 
  'Huevo', 'Mariscos', 'Pescado', 'Trigo'
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
    delivery_preference: 'ambos',
    preferred_zones: [] as string[],
    intolerances: [] as string[],
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
          delivery_preference: p.delivery_preference || 'ambos',
          preferred_zones: Array.isArray(p.preferred_zones) ? p.preferred_zones : [],
          intolerances: Array.isArray(p.intolerances) ? p.intolerances : [],
        });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);

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
      })
      .eq('id', user.id);

    setSaving(false);
    if (!error) {
      setProfile(prev => prev ? {
        ...prev,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        full_name: `${editForm.first_name} ${editForm.last_name}`.trim(),
        locality: editForm.locality,
        province: editForm.province,
        dietary_type: editForm.dietary_type,
        delivery_preference: editForm.delivery_preference,
        preferred_zones: editForm.preferred_zones,
        intolerances: editForm.intolerances,
      } : null);
      setEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
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

  const toggleIntolerance = (item: string) => {
    setEditForm(prev => ({
      ...prev,
      intolerances: prev.intolerances.includes(item)
        ? prev.intolerances.filter(i => i !== item)
        : [...prev.intolerances, item]
    }));
  };

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

  const deliveryLabel = (v: string | null) => {
    if (v === 'retiro') return '📦 Solo Retiro';
    if (v === 'entrega') return '🚚 Solo Entrega';
    return '📦🚚 Retiro y Entrega';
  };

  const dietaryLabel = (v: string | null) => {
    const opt = DIETARY_OPTIONS.find(o => o.value === v);
    return opt ? opt.label : 'Sin especificar';
  };

  const filteredZones = ZONE_OPTIONS.filter(z => z.toLowerCase().includes(zoneSearch.toLowerCase()));

  // ═══════════════════════════════════════════
  //  RENDER: Profile Tab (HERO SECTION)
  // ═══════════════════════════════════════════
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

      {/* ══════ HERO: PROFILE CARD ══════ */}
      <div style={{ 
        background: 'white', borderRadius: '32px', 
        border: '1px solid #E4EBDD', overflow: 'hidden', marginBottom: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
      }}>
        {/* Banner gradient */}
        <div style={{ 
          height: isMobile ? '100px' : '120px', 
          background: 'linear-gradient(135deg, #2D3A20, #5F7D4A, #7FA05B)',
          position: 'relative'
        }}>
          <Leaf size={120} style={{ position: 'absolute', right: '20px', top: '-20px', opacity: 0.12, color: 'white' }} />
        </div>

        {/* Avatar + Name + Edit Button */}
        <div style={{ padding: isMobile ? '0 1.5rem 1.5rem' : '0 2.5rem 2rem', marginTop: '-45px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.2rem' }}>
              <div style={{ 
                width: '90px', height: '90px', borderRadius: '28px', 
                background: 'linear-gradient(135deg, #5F7D4A, #7FA05B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '2rem', fontWeight: '950', 
                border: '4px solid white', boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                flexShrink: 0
              }}>
                {initials}
              </div>
              <div style={{ paddingBottom: '4px' }}>
                <h1 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: '950', color: '#2D3A20', lineHeight: 1.2 }}>{displayName}</h1>
                <p style={{ color: '#6B7C5E', fontSize: '0.8rem', marginTop: '4px' }}>{user?.email}</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '6px', padding: '3px 10px', borderRadius: '20px', background: '#F0F4ED', fontSize: '0.7rem', fontWeight: '800', color: '#5F7D4A' }}>
                  <Star size={11} fill="#5F7D4A" /> Miembro desde {memberSince}
                </div>
              </div>
            </div>

            {/* ══════ EDIT BUTTON (MUY VISIBLE) ══════ */}
            <button 
              onClick={() => editing ? handleSaveProfile() : setEditing(true)}
              disabled={saving}
              style={{ 
                padding: editing ? '0.8rem 2rem' : '0.8rem 1.8rem', 
                borderRadius: '16px', border: 'none',
                background: editing ? (saving ? '#94a88a' : '#5F7D4A') : 'linear-gradient(135deg, #5F7D4A, #4A6B35)',
                color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem',
                boxShadow: '0 6px 20px rgba(95,125,74,0.3)',
                display: 'flex', alignItems: 'center', gap: '8px',
                transition: 'all 0.2s', flexShrink: 0,
                transform: editing ? 'none' : 'none'
              }}
            >
              {saving ? (
                <><div style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} /> Guardando...</>
              ) : editing ? (
                <><Check size={18} /> Guardar Cambios</>
              ) : (
                <><Edit3 size={18} /> Editar Perfil</>
              )}
            </button>
          </div>

          {editing && (
            <button onClick={() => setEditing(false)} style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700' }}>
              ✕ Cancelar edición
            </button>
          )}
        </div>
      </div>

      {/* ══════ SECTION: DATOS PERSONALES ══════ */}
      <div style={{ 
        background: 'white', borderRadius: '28px', padding: isMobile ? '1.5rem' : '2rem',
        border: '1px solid #E4EBDD', marginBottom: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#F0F4ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} color="#5F7D4A" />
          </div>
          Datos Personales
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.2rem' }}>
          {/* Nombre */}
          <div>
            <label style={labelStyle}>Nombre</label>
            {editing ? (
              <input type="text" value={editForm.first_name} onChange={(e) => setEditForm(p => ({ ...p, first_name: e.target.value }))} placeholder="Tu nombre" style={inputStyle} />
            ) : (
              <p style={valueStyle}>{profile?.first_name || '—'}</p>
            )}
          </div>
          {/* Apellido */}
          <div>
            <label style={labelStyle}>Apellido</label>
            {editing ? (
              <input type="text" value={editForm.last_name} onChange={(e) => setEditForm(p => ({ ...p, last_name: e.target.value }))} placeholder="Tu apellido" style={inputStyle} />
            ) : (
              <p style={valueStyle}>{profile?.last_name || '—'}</p>
            )}
          </div>
          {/* Localidad */}
          <div>
            <label style={labelStyle}>Ubicación</label>
            {editing ? (
              <input type="text" value={editForm.locality} onChange={(e) => setEditForm(p => ({ ...p, locality: e.target.value }))} placeholder="Ej: Pilar, Buenos Aires" style={inputStyle} />
            ) : (
              <p style={valueStyle}>
                <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px', color: '#5F7D4A' }} />
                {profile?.locality || '—'}{profile?.province ? `, ${profile.province}` : ''}
              </p>
            )}
          </div>
          {/* Provincia */}
          <div>
            <label style={labelStyle}>Provincia</label>
            {editing ? (
              <input type="text" value={editForm.province} onChange={(e) => setEditForm(p => ({ ...p, province: e.target.value }))} placeholder="Ej: Buenos Aires" style={inputStyle} />
            ) : (
              <p style={valueStyle}>{profile?.province || '—'}</p>
            )}
          </div>
        </div>
      </div>

      {/* ══════ SECTION: PREFERENCIA DE ENVÍO ══════ */}
      <div style={{ 
        background: 'white', borderRadius: '28px', padding: isMobile ? '1.5rem' : '2rem',
        border: '1px solid #E4EBDD', marginBottom: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#EBF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={16} color="#2563EB" />
          </div>
          ¿Cómo preferís recibir?
        </h3>

        {editing ? (
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {[
              { value: 'retiro', label: '📦 Retiro en local', desc: 'Voy a buscar yo' },
              { value: 'entrega', label: '🚚 Entrega / Delivery', desc: 'Que me lo traigan' },
              { value: 'ambos', label: '📦🚚 Ambos', desc: 'Retiro o entrega' },
            ].map(opt => (
              <button 
                key={opt.value}
                onClick={() => setEditForm(p => ({ ...p, delivery_preference: opt.value }))}
                style={{ 
                  flex: isMobile ? '1 1 100%' : '1',
                  padding: '1rem', borderRadius: '16px', cursor: 'pointer',
                  border: editForm.delivery_preference === opt.value ? '2px solid #5F7D4A' : '1px solid #E4EBDD',
                  background: editForm.delivery_preference === opt.value ? '#F0F4ED' : 'white',
                  textAlign: 'left', transition: 'all 0.15s'
                }}
              >
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#2D3A20', marginBottom: '4px' }}>{opt.label}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7C5E' }}>{opt.desc}</div>
                {editForm.delivery_preference === opt.value && (
                  <Check size={16} color="#5F7D4A" style={{ position: 'absolute', top: '10px', right: '10px' }} />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ 
            padding: '1rem', background: '#F8F9F5', borderRadius: '16px',
            fontSize: '1rem', fontWeight: '700', color: '#2D3A20'
          }}>
            {deliveryLabel(profile?.delivery_preference)}
          </div>
        )}
      </div>

      {/* ══════ SECTION: ZONAS DONDE QUERÉS RECIBIR ══════ */}
      <div style={{ 
        background: 'white', borderRadius: '28px', padding: isMobile ? '1.5rem' : '2rem',
        border: '1px solid #E4EBDD', marginBottom: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={16} color="#D97706" />
          </div>
          Zonas donde querés recibir
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#6B7C5E', marginBottom: '1.2rem' }}>
          Esto nos permite mostrarte locales que hacen envíos a tu zona.
        </p>

        {editing ? (
          <div>
            {/* Search zones */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#aaa' }} />
              <input 
                type="text" value={zoneSearch} onChange={(e) => setZoneSearch(e.target.value)}
                placeholder="Buscar zona..."
                style={{ width: '100%', padding: '0.7rem 0.7rem 0.7rem 2.5rem', borderRadius: '12px', border: '1px solid #E4EBDD', outline: 'none', fontSize: '0.85rem' }}
              />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
              {filteredZones.map(zone => {
                const selected = editForm.preferred_zones.includes(zone);
                return (
                  <button 
                    key={zone} onClick={() => toggleZone(zone)}
                    style={{ 
                      padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer',
                      border: selected ? '2px solid #5F7D4A' : '1px solid #E4EBDD',
                      background: selected ? '#5F7D4A' : 'white',
                      color: selected ? 'white' : '#2D3A20',
                      fontSize: '0.8rem', fontWeight: '700', transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: '4px'
                    }}
                  >
                    {selected && <Check size={12} />} {zone}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(profile?.preferred_zones && profile.preferred_zones.length > 0) 
              ? profile.preferred_zones.map((z: string) => (
                <span key={z} style={{ padding: '0.4rem 1rem', borderRadius: '20px', background: '#F0F4ED', color: '#2D3A20', fontSize: '0.8rem', fontWeight: '700', border: '1px solid #D4E0CC' }}>
                  📍 {z}
                </span>
              ))
              : <p style={{ color: '#999', fontSize: '0.85rem', fontStyle: 'italic' }}>No definiste zonas todavía</p>
            }
          </div>
        )}
      </div>

      {/* ══════ SECTION: TIPO DE ALIMENTACIÓN ══════ */}
      <div style={{ 
        background: 'white', borderRadius: '28px', padding: isMobile ? '1.5rem' : '2rem',
        border: '1px solid #E4EBDD', marginBottom: '1rem',
        boxShadow: '0 2px 12px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#059669" />
          </div>
          Tipo de Alimentación
        </h3>

        {editing ? (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {DIETARY_OPTIONS.filter(o => o.value).map(opt => {
              const selected = editForm.dietary_type === opt.value;
              return (
                <button 
                  key={opt.value} onClick={() => setEditForm(p => ({ ...p, dietary_type: opt.value }))}
                  style={{ 
                    padding: '0.8rem 1rem', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                    border: selected ? '2px solid #059669' : '1px solid #E4EBDD',
                    background: selected ? '#ECFDF5' : 'white',
                    color: '#2D3A20', fontSize: '0.85rem', fontWeight: '700',
                    transition: 'all 0.15s'
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: '1rem', background: '#F8F9F5', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20' }}>
            {dietaryLabel(profile?.dietary_type)}
          </div>
        )}

        {/* Intolerancias */}
        <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#2D3A20', marginTop: '1.5rem', marginBottom: '0.8rem' }}>
          Intolerancias / Alergias
        </h4>
        {editing ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTOLERANCES_OPTIONS.map(item => {
              const selected = editForm.intolerances.includes(item);
              return (
                <button 
                  key={item} onClick={() => toggleIntolerance(item)}
                  style={{ 
                    padding: '0.4rem 0.9rem', borderRadius: '20px', cursor: 'pointer',
                    border: selected ? '2px solid #E11D48' : '1px solid #E4EBDD',
                    background: selected ? '#FEF2F2' : 'white',
                    color: selected ? '#E11D48' : '#6B7C5E',
                    fontSize: '0.8rem', fontWeight: '700', transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: '4px'
                  }}
                >
                  {selected && <X size={12} />} {item}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(profile?.intolerances && profile.intolerances.length > 0)
              ? profile.intolerances.map((i: string) => (
                <span key={i} style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', background: '#FEF2F2', color: '#E11D48', fontSize: '0.8rem', fontWeight: '700', border: '1px solid #FEE2E2' }}>
                  ⚠️ {i}
                </span>
              ))
              : <p style={{ color: '#999', fontSize: '0.85rem', fontStyle: 'italic' }}>Ninguna</p>
            }
          </div>
        )}
      </div>

      {/* ══════ BOTTOM EDIT BUTTON (MOBILE) ══════ */}
      {!editing && isMobile && (
        <button 
          onClick={() => setEditing(true)}
          style={{ 
            width: '100%', padding: '1rem', borderRadius: '18px', border: 'none',
            background: 'linear-gradient(135deg, #5F7D4A, #4A6B35)',
            color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '1rem',
            boxShadow: '0 8px 24px rgba(95,125,74,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginTop: '0.5rem'
          }}
        >
          <Edit3 size={20} /> Editar mi Perfil
        </button>
      )}

      {editing && isMobile && (
        <button 
          onClick={handleSaveProfile}
          disabled={saving}
          style={{ 
            width: '100%', padding: '1rem', borderRadius: '18px', border: 'none',
            background: saving ? '#94a88a' : '#5F7D4A',
            color: 'white', fontWeight: '900', cursor: 'pointer', fontSize: '1rem',
            boxShadow: '0 8px 24px rgba(95,125,74,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginTop: '0.5rem'
          }}
        >
          {saving ? 'Guardando...' : <><Check size={20} /> Guardar Cambios</>}
        </button>
      )}
    </div>
  );

  // ═══════════════════════════════════════════
  //  RENDER: Config Tab
  // ═══════════════════════════════════════════
  const renderConfigTab = () => (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1.5rem' }}>Configuración</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD' }}>
          <h3 style={{ fontWeight: '800', color: '#2D3A20', marginBottom: '0.8rem', fontSize: '0.95rem' }}>Correo Electrónico</h3>
          <div style={{ padding: '0.7rem 1rem', background: '#F8F9F5', borderRadius: '12px', color: '#6B7C5E', fontSize: '0.9rem', fontWeight: '600' }}>{user?.email}</div>
        </div>
        <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD' }}>
          <h3 style={{ fontWeight: '800', color: '#2D3A20', marginBottom: '0.5rem', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={16} /> Notificaciones</h3>
          <p style={{ color: '#6B7C5E', fontSize: '0.8rem' }}>Próximamente: alertas de nuevos productores en tu zona.</p>
        </div>
        <button onClick={handleLogout} style={{ background: 'white', borderRadius: '24px', padding: '1rem 1.5rem', border: '1px solid #E4EBDD', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
          <LogOut size={20} color="#E11D48" /><span style={{ fontWeight: '800', color: '#E11D48', fontSize: '0.9rem' }}>Cerrar Sesión</span>
        </button>
        <div style={{ padding: '1.5rem', borderRadius: '24px', border: '2px solid #FEE2E2', background: '#FEF2F2', marginTop: '0.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#991B1B', marginBottom: '0.5rem' }}>Zona de Peligro</h3>
          <p style={{ fontSize: '0.75rem', color: '#B91C1C', marginBottom: '1rem' }}>Eliminar tu cuenta es permanente.</p>
          <button style={{ padding: '0.6rem 1.2rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>Eliminar mi cuenta</button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
    { id: 'config', label: 'Ajustes', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil': return renderProfileTab();
      case 'favoritos': return (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
          <h2 style={{ fontSize: isMobile ? '1.3rem' : '1.6rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1.5rem' }}>Mis Favoritos</h2>
          <div style={{ background: 'white', borderRadius: '32px', padding: '3rem 2rem', border: '1px solid #E4EBDD', textAlign: 'center' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}><Heart size={30} color="#E11D48" /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '0.5rem' }}>Aún no tenés favoritos</h3>
            <p style={{ color: '#6B7C5E', fontSize: '0.85rem', marginBottom: '1.5rem', maxWidth: '350px', margin: '0 auto 1.5rem' }}>Explorá el mapa y guardá los locales que más te gusten.</p>
            <button onClick={() => window.location.href = '/explorar'} style={{ padding: '0.7rem 1.8rem', borderRadius: '14px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Explorar Mapa</button>
          </div>
        </div>
      );
      case 'config': return renderConfigTab();
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5' }}>
      {/* Header */}
      <header style={{ padding: '0.6rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F4F1E6', borderBottom: '1px solid rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', letterSpacing: '-0.05em' }}>ALIMNET</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => window.location.href = '/explorar'} style={{ background: 'none', border: 'none', color: '#5F7D4A', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}>Explorar</button>
          <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg, #5F7D4A, #7FA05B)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.85rem', fontWeight: '900' }}>{initials}</div>
        </div>
      </header>

      <div style={{ display: 'flex', maxWidth: '1100px', margin: '0 auto', minHeight: 'calc(100vh - 52px)' }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <nav style={{ width: '220px', padding: '2rem 1rem', borderRight: '1px solid #E4EBDD', background: 'white', position: 'sticky', top: '52px', height: 'calc(100vh - 52px)' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#6B7C5E', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 0.5rem', marginBottom: '1rem' }}>Mi Cuenta</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.7rem 1rem', borderRadius: '14px', border: 'none', background: activeTab === tab.id ? '#5F7D4A' : 'transparent', color: activeTab === tab.id ? 'white' : '#6B7C5E', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem', transition: 'all 0.15s', textAlign: 'left', width: '100%' }}>
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.7rem 1rem', borderRadius: '14px', border: 'none', background: 'transparent', color: '#E11D48', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem', width: '100%', textAlign: 'left' }}><LogOut size={16} /> Cerrar Sesión</button>
            </div>
          </nav>
        )}

        {/* Mobile Bottom Tabs */}
        {isMobile && (
          <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-around', padding: '0.5rem 0 calc(0.5rem + env(safe-area-inset-bottom))', zIndex: 100 }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', background: 'none', border: 'none', cursor: 'pointer', color: activeTab === tab.id ? '#5F7D4A' : '#aaa', fontSize: '0.6rem', fontWeight: '800', padding: '4px 8px' }}>
                <tab.icon size={20} /> {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <main style={{ flex: 1, padding: isMobile ? '1.2rem 1rem 5rem' : '2rem 2.5rem', maxWidth: '750px' }}>
          {renderContent()}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
}

// ═══════════════════════
//  Shared Styles
// ═══════════════════════
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.72rem', fontWeight: '900', color: '#6B7C5E',
  marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em'
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '14px',
  border: '2px solid #5F7D4A', background: 'white', outline: 'none',
  fontSize: '0.9rem', fontWeight: '600', color: '#2D3A20',
  transition: 'border-color 0.2s'
};

const valueStyle: React.CSSProperties = {
  fontSize: '1rem', fontWeight: '700', color: '#2D3A20', padding: '0.4rem 0'
};
