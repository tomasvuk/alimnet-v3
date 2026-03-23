'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, Package, Truck,
  Bell, Award, TrendingUp, Check, X, Plus, Search,
  Map as MapIcon, Loader2, AlertCircle, MessageSquare, 
  ExternalLink, ShieldCheck
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

// --- Constantes / Opciones ---
const PRODUCTION_OPTIONS = ['Agroecológico', 'Orgánico', 'Regenerativo', 'Sin agroquímicos', 'Sin ultraprocesados', 'Sustentable', 'Pastura'];
const PREFERENCE_OPTIONS = ['Frutas y Verduras', 'Cereales y Legumbres', 'Lácteos y Quesos', 'Carnes de Pastura', 'Huevos de campo', 'Aceites y Condimentos', 'Panificados y Pastelería', 'Bebidas Fermentadas'];
const DIETARY_OPTIONS = ['Celiaco / Sin Gluten', 'Vegano', 'Vegetariano', 'Keto / Low Carb', 'Paleo', 'Sin Azúcar', 'Sin Lactosa'];
const DELIVERY_PREFERENCES = [
  { id: 'Retiro y Entrega', label: 'Retiro y Entrega', description: 'Ambas modalidades disponibles' },
  { id: 'Solo Entrega', label: 'Solo Entrega', description: 'Recibir en mi domicilio' },
  { id: 'Solo Retiro', label: 'Solo Retiro', description: 'Retiro por el local' }
];

export default function MiCuentaPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    locality: '',
    delivery_pref: 'Retiro y Entrega',
    dietary_type: [] as string[],
    categories_interest: [] as string[],
    production_interest: [] as string[]
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          locality: data.locality || '',
          delivery_pref: data.delivery_pref || 'Retiro y Entrega',
          dietary_type: data.dietary_type || [],
          categories_interest: data.categories_interest || [],
          production_interest: data.production_interest || []
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;
      
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Perfil actualizado con éxito 🌿' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Error al guardar los cambios' });
    } finally {
      setSaving(false);
    }
  };

  const toggleOption = (field: keyof typeof formData, value: string) => {
    const current = formData[field] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}>
      <Loader2 className="animate-spin" size={40} color="#5F7D4A" />
      <p style={{ marginTop: '1rem', fontWeight: '800', color: '#5F7D4A' }}>Cargando tu cuenta...</p>
    </div>
  );

  const initials = profile?.first_name ? profile.first_name[0].toUpperCase() : 'U';

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingBottom: '80px' }}>
      {/* Header */}
      <header style={{ padding: '1rem 1.5rem', background: '#F4F1E6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
        <span onClick={() => window.location.href = '/'} style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', cursor: 'pointer', letterSpacing: '-0.02em' }}>ALIMNET</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <button 
            onClick={() => window.location.href = '/explorar'} 
            style={{ 
              background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '12px', 
              padding: '0.5rem 1rem', fontWeight: '800', fontSize: '0.85rem', 
              display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' 
            }}
          >
            <MapIcon size={16} /> Mapa
          </button>
          <div style={{ width: '38px', height: '38px', borderRadius: '14px', background: '#2D3A20', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '950' }}>{initials}</div>
        </div>
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>¡Hola, {profile?.first_name || 'Alimneter'}!</h1>
          <p style={{ color: '#666', fontWeight: '600', marginTop: '4px' }}>Gestionar tus preferencias y actividad.</p>
        </div>

        {message && (
          <div style={{ 
            padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem', 
            background: message.type === 'success' ? '#E8F5E9' : '#FFEBEE',
            color: message.type === 'success' ? '#2E7D32' : '#C62828',
            display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '0.9rem'
          }}>
            {message.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        {/* Action List (Carlos Profile) */}
        {!isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
                 <div style={{ color: '#5F7D4A', marginBottom: '8px' }}><Award size={24} /></div>
                 <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>Miembro</div>
                 <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '700' }}>FUNDADOR</div>
              </div>
              <div style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD' }}>
                 <div style={{ color: '#FF7043', marginBottom: '8px' }}><Heart size={24} /></div>
                 <div style={{ fontSize: '1.2rem', fontWeight: '950' }}>0</div>
                 <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '700' }}>VALIDACIONES</div>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#F0F4ED', padding: '10px', borderRadius: '12px', color: '#5F7D4A' }}><User size={20} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800' }}>Editar Perfil</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Nombre, lugar y alimentación</div>
                  </div>
               </div>
               <ChevronRight size={18} color="#999" />
            </button>

            <button style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#F0F4ED', padding: '10px', borderRadius: '12px', color: '#5F7D4A' }}><Clock size={20} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800' }}>Locales Visitados</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Últimas búsquedas y aperturas</div>
                  </div>
               </div>
               <ChevronRight size={18} color="#999" />
            </button>

            <button style={{ background: 'white', padding: '1.2rem', borderRadius: '24px', border: '1px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#F0F4ED', padding: '10px', borderRadius: '12px', color: '#5F7D4A' }}><Star size={20} /></div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: '800' }}>Favoritos</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Tus proyectos guardados</div>
                  </div>
               </div>
               <ChevronRight size={18} color="#999" />
            </button>

            <button onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')} style={{ marginTop: '2rem', background: 'transparent', border: '1px solid #FFCDD2', color: '#D32F2F', padding: '1rem', borderRadius: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
               <LogOut size={18} /> Cerrar Sesión
            </button>
          </div>
        ) : (
          /* EDIT FORM */
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '32px', border: '1px solid #E4EBDD', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '950' }}>Editar Información</h2>
              <button onClick={() => setIsEditing(false)} style={{ background: '#F5F5F5', border: 'none', borderRadius: '50%', padding: '6px' }}><X size={18}/></button>
            </div>

            {/* Basic Info */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#999', marginBottom: '8px', textTransform: 'uppercase' }}>Nombre</label>
              <input 
                type="text" 
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '2px solid #F0F4ED', fontSize: '1rem', fontWeight: '700', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#999', marginBottom: '8px', textTransform: 'uppercase' }}>Ubicación (Donde quiero recibir)</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#5F7D4A' }} />
                <input 
                  type="text" 
                  value={formData.locality}
                  onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                  placeholder="Ej: Nordelta, Tigre..."
                  style={{ width: '100%', padding: '1rem 1rem 1rem 2.5rem', borderRadius: '16px', border: '2px solid #F0F4ED', fontSize: '1rem', fontWeight: '700', outline: 'none' }}
                />
              </div>
            </div>

            {/* Delivery Preferences */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#999', marginBottom: '12px', textTransform: 'uppercase' }}>Preferencia de Entrega</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {DELIVERY_PREFERENCES.map(pref => (
                  <button 
                    key={pref.id}
                    onClick={() => setFormData({ ...formData, delivery_pref: pref.id })}
                    style={{ 
                      padding: '1rem', borderRadius: '16px', border: '2px solid', 
                      borderColor: formData.delivery_pref === pref.id ? '#5F7D4A' : '#F0F4ED',
                      background: formData.delivery_pref === pref.id ? '#F0F4ED' : 'white',
                      textAlign: 'left', cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: '800', color: '#2D3A20' }}>{pref.label}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{pref.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality Preference */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#999', marginBottom: '12px', textTransform: 'uppercase' }}>Calidad y Producción</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {PRODUCTION_OPTIONS.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => toggleOption('production_interest', opt)}
                    style={{ 
                      padding: '0.6rem 1rem', borderRadius: '12px', border: '1.5px solid',
                      borderColor: formData.production_interest.includes(opt) ? '#5F7D4A' : '#F0F4ED',
                      background: formData.production_interest.includes(opt) ? '#5F7D4A' : 'white',
                      color: formData.production_interest.includes(opt) ? 'white' : '#2D3A20',
                      fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button 
              onClick={handleSave}
              disabled={saving}
              style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '20px', border: 'none',
                background: '#2D3A20', color: 'white', fontWeight: '950', fontSize: '1.1rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
