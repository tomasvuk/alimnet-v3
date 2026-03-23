'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, Settings, Heart, MapPin, LogOut, ChevronRight, 
  Edit3, Shield, Star, Clock, Leaf, ExternalLink, 
  Bell, Bookmark, Award, TrendingUp
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
}

export default function MiCuentaPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inicio');
  const [isMobile, setIsMobile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    locality: '',
    province: '',
    dietary_type: '',
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
      
      if (!user) {
        window.location.href = '/login';
        return;
      }
      
      setUser(user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) {
        setProfile(profileData as UserProfile);
        setEditForm({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          locality: profileData.locality || '',
          province: profileData.province || '',
          dietary_type: profileData.dietary_type || '',
        });
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const handleSaveProfile = async () => {
    if (!user) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        full_name: `${editForm.first_name} ${editForm.last_name}`.trim(),
        locality: editForm.locality,
        province: editForm.province,
        dietary_type: editForm.dietary_type,
      })
      .eq('id', user.id);

    if (!error) {
      setProfile(prev => prev ? {
        ...prev,
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        full_name: `${editForm.first_name} ${editForm.last_name}`.trim(),
        locality: editForm.locality,
        province: editForm.province,
        dietary_type: editForm.dietary_type,
      } : null);
      setEditing(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', background: '#F8F9F5', 
        display: 'flex', alignItems: 'center', justifyContent: 'center' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', height: '50px', border: '4px solid #E4EBDD', 
            borderTopColor: 'var(--primary)', borderRadius: '50%', 
            animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' 
          }} />
          <p style={{ color: 'var(--text-secondary)', fontWeight: '700' }}>Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  const displayName = profile?.first_name 
    ? `${profile.first_name} ${profile.last_name || ''}`.trim() 
    : user?.email?.split('@')[0] || 'Usuario';

  const initials = profile?.first_name 
    ? `${profile.first_name[0]}${profile.last_name?.[0] || ''}`.toUpperCase()
    : displayName[0]?.toUpperCase() || 'U';

  const memberSince = user?.created_at 
    ? new Date(user.created_at).toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })
    : 'Reciente';

  const tabs = [
    { id: 'inicio', label: 'Mi Resumen', icon: TrendingUp },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
    { id: 'favoritos', label: 'Favoritos', icon: Heart },
    { id: 'config', label: 'Configuración', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            {/* Welcome Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2D3A20, #4A6B35)',
              borderRadius: '32px', padding: isMobile ? '2rem 1.5rem' : '3rem',
              color: 'white', marginBottom: '2rem', position: 'relative', overflow: 'hidden'
            }}>
              <Leaf size={200} style={{ position: 'absolute', right: '-30px', bottom: '-50px', opacity: 0.08 }} />
              <h1 style={{ fontSize: isMobile ? '1.6rem' : '2.2rem', fontWeight: '950', marginBottom: '0.5rem', position: 'relative' }}>
                ¡Hola, {profile?.first_name || 'amigo'}! 👋
              </h1>
              <p style={{ opacity: 0.85, fontSize: '0.95rem', lineHeight: '1.6', maxWidth: '500px', position: 'relative' }}>
                Bienvenido a tu espacio en la red de alimentos cuidados. Desde acá podés explorar, guardar favoritos y conectar con productores locales.
              </p>
            </div>

            {/* Quick Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', 
              gap: '1rem', marginBottom: '2rem' 
            }}>
              {[
                { label: 'Favoritos', value: '0', icon: Heart, color: '#E11D48' },
                { label: 'Validaciones', value: '0', icon: Shield, color: '#059669' },
                { label: 'Locales Visitados', value: '0', icon: MapPin, color: '#2563EB' },
                { label: 'Miembro desde', value: memberSince.split(' ')[0] || 'Mar', icon: Clock, color: '#D97706' },
              ].map((stat, i) => (
                <div key={i} style={{ 
                  background: 'white', padding: isMobile ? '1.2rem' : '1.5rem', borderRadius: '24px', 
                  border: '1px solid #E4EBDD', boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  transition: 'transform 0.2s'
                }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '14px', 
                    background: `${stat.color}15`, display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', marginBottom: '0.8rem' 
                  }}>
                    <stat.icon size={20} color={stat.color} />
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7C5E', marginTop: '2px' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1rem' }}>Acciones Rápidas</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1rem' }}>
              <button 
                onClick={() => window.location.href = '/explorar'}
                style={{ 
                  background: 'white', border: '1px solid #E4EBDD', borderRadius: '20px', 
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                }}
              >
                <div style={{ background: '#F0F4ED', padding: '10px', borderRadius: '14px' }}>
                  <MapPin size={20} color="#5F7D4A" />
                </div>
                <div>
                  <div style={{ fontWeight: '800', color: '#2D3A20', fontSize: '0.9rem' }}>Explorar Mapa</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7C5E', marginTop: '2px' }}>Descubrí productores cerca tuyo</div>
                </div>
                <ChevronRight size={18} color="#aaa" style={{ marginLeft: 'auto' }} />
              </button>
              
              <button 
                onClick={() => window.location.href = '/sostener'}
                style={{ 
                  background: 'white', border: '1px solid #E4EBDD', borderRadius: '20px', 
                  padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '14px',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                }}
              >
                <div style={{ background: '#FEF3C7', padding: '10px', borderRadius: '14px' }}>
                  <Award size={20} color="#D97706" />
                </div>
                <div>
                  <div style={{ fontWeight: '800', color: '#2D3A20', fontSize: '0.9rem' }}>Ser Miembro Fundador</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B7C5E', marginTop: '2px' }}>Sostené la red con tu apoyo</div>
                </div>
                <ChevronRight size={18} color="#aaa" style={{ marginLeft: 'auto' }} />
              </button>
            </div>
          </div>
        );

      case 'perfil':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.3rem' }}>Mi Perfil</h1>
                <p style={{ color: '#6B7C5E', fontSize: '0.85rem' }}>Tu información personal en Alimnet.</p>
              </div>
              <button 
                onClick={() => editing ? handleSaveProfile() : setEditing(true)}
                style={{ 
                  padding: '0.7rem 1.5rem', borderRadius: '14px', border: 'none',
                  background: editing ? '#5F7D4A' : 'white', 
                  color: editing ? 'white' : '#2D3A20',
                  fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem',
                  boxShadow: editing ? '0 4px 12px rgba(95,125,74,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
                  border: editing ? 'none' : '1px solid #E4EBDD',
                  display: 'flex', alignItems: 'center', gap: '8px'
                }}
              >
                <Edit3 size={16} /> {editing ? 'Guardar Cambios' : 'Editar'}
              </button>
            </div>

            {/* Profile Card */}
            <div style={{ 
              background: 'white', borderRadius: '32px', padding: isMobile ? '1.5rem' : '2.5rem',
              border: '1px solid #E4EBDD', marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: '1.5rem', marginBottom: '2rem', flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ 
                  width: '80px', height: '80px', borderRadius: '24px', 
                  background: 'linear-gradient(135deg, #5F7D4A, #7FA05B)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '1.8rem', fontWeight: '950', flexShrink: 0
                }}>
                  {initials}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '950', color: '#2D3A20' }}>{displayName}</h2>
                  <p style={{ color: '#6B7C5E', fontSize: '0.85rem', marginTop: '4px' }}>{user?.email}</p>
                  <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '6px', 
                    marginTop: '8px', padding: '4px 12px', borderRadius: '20px',
                    background: '#F0F4ED', fontSize: '0.75rem', fontWeight: '800', color: '#5F7D4A'
                  }}>
                    <Star size={12} fill="#5F7D4A" /> Consumidor Alimnet
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: '#6B7C5E', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nombre</label>
                  {editing ? (
                    <input 
                      type="text" value={editForm.first_name} 
                      onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid #5F7D4A', background: 'white', outline: 'none', fontSize: '0.9rem' }}
                    />
                  ) : (
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3A20' }}>{profile?.first_name || '—'}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: '#6B7C5E', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apellido</label>
                  {editing ? (
                    <input 
                      type="text" value={editForm.last_name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid #5F7D4A', background: 'white', outline: 'none', fontSize: '0.9rem' }}
                    />
                  ) : (
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3A20' }}>{profile?.last_name || '—'}</p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: '#6B7C5E', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Localidad</label>
                  {editing ? (
                    <input 
                      type="text" value={editForm.locality}
                      onChange={(e) => setEditForm(prev => ({ ...prev, locality: e.target.value }))}
                      placeholder="Ej: Pilar, Buenos Aires"
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid #5F7D4A', background: 'white', outline: 'none', fontSize: '0.9rem' }}
                    />
                  ) : (
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3A20' }}>
                      <MapPin size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                      {profile?.locality || '—'}{profile?.province ? `, ${profile.province}` : ''}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '900', color: '#6B7C5E', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo de Alimentación</label>
                  {editing ? (
                    <select 
                      value={editForm.dietary_type}
                      onChange={(e) => setEditForm(prev => ({ ...prev, dietary_type: e.target.value }))}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid #5F7D4A', background: 'white', outline: 'none', fontSize: '0.9rem' }}
                    >
                      <option value="">Sin especificar</option>
                      <option value="omnivoro">Omnívoro</option>
                      <option value="vegetariano">Vegetariano</option>
                      <option value="vegano">Vegano</option>
                      <option value="flexitariano">Flexitariano</option>
                      <option value="celiaco">Celíaco</option>
                    </select>
                  ) : (
                    <p style={{ fontSize: '1rem', fontWeight: '700', color: '#2D3A20', textTransform: 'capitalize' }}>{profile?.dietary_type || 'Sin especificar'}</p>
                  )}
                </div>
              </div>

              {editing && (
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => setEditing(false)}
                    style={{ padding: '0.7rem 1.5rem', borderRadius: '14px', border: '1px solid #E4EBDD', background: 'white', color: '#6B7C5E', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {/* Member Since Card */}
            <div style={{ 
              background: '#F0F4ED', borderRadius: '24px', padding: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem'
            }}>
              <Clock size={20} color="#5F7D4A" />
              <div>
                <p style={{ fontWeight: '800', color: '#2D3A20', fontSize: '0.9rem' }}>Miembro desde {memberSince}</p>
                <p style={{ color: '#6B7C5E', fontSize: '0.75rem', marginTop: '2px' }}>Gracias por ser parte de la comunidad 🌿</p>
              </div>
            </div>
          </div>
        );

      case 'favoritos':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem' }}>Mis Favoritos</h1>
            <p style={{ color: '#6B7C5E', fontSize: '0.85rem', marginBottom: '2rem' }}>Los comercios que guardaste para acceder rápidamente.</p>
            
            {/* Empty State */}
            <div style={{ 
              background: 'white', borderRadius: '32px', padding: '4rem 2rem',
              border: '1px solid #E4EBDD', textAlign: 'center'
            }}>
              <div style={{ 
                width: '80px', height: '80px', borderRadius: '50%', 
                background: '#FEF2F2', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', margin: '0 auto 1.5rem'
              }}>
                <Heart size={36} color="#E11D48" />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#2D3A20', marginBottom: '0.5rem' }}>Aún no tenés favoritos</h3>
              <p style={{ color: '#6B7C5E', fontSize: '0.85rem', marginBottom: '2rem', maxWidth: '350px', margin: '0 auto 2rem' }}>
                Explorá el mapa y guardá los locales que más te gusten para volver a ellos fácilmente.
              </p>
              <button 
                onClick={() => window.location.href = '/explorar'}
                style={{ 
                  padding: '0.8rem 2rem', borderRadius: '16px', border: 'none',
                  background: '#5F7D4A', color: 'white', fontWeight: '800', 
                  cursor: 'pointer', fontSize: '0.9rem',
                  display: 'inline-flex', alignItems: 'center', gap: '8px'
                }}
              >
                <MapPin size={16} /> Explorar Mapa
              </button>
            </div>
          </div>
        );

      case 'config':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem' }}>Configuración</h1>
            <p style={{ color: '#6B7C5E', fontSize: '0.85rem', marginBottom: '2rem' }}>Gestioná tu cuenta y preferencias.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email */}
              <div style={{ 
                background: 'white', borderRadius: '24px', padding: '1.5rem',
                border: '1px solid #E4EBDD'
              }}>
                <h3 style={{ fontWeight: '800', color: '#2D3A20', marginBottom: '1rem', fontSize: '1rem' }}>Correo Electrónico</h3>
                <div style={{ 
                  padding: '0.8rem 1rem', background: '#F8F9F5', borderRadius: '14px',
                  color: '#6B7C5E', fontSize: '0.9rem', fontWeight: '600'
                }}>
                  {user?.email}
                </div>
              </div>

              {/* Notifications */}
              <div style={{ 
                background: 'white', borderRadius: '24px', padding: '1.5rem',
                border: '1px solid #E4EBDD'
              }}>
                <h3 style={{ fontWeight: '800', color: '#2D3A20', marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={18} /> Notificaciones
                </h3>
                <p style={{ color: '#6B7C5E', fontSize: '0.85rem' }}>
                  Próximamente podrás configurar alertas de nuevos productores en tu zona.
                </p>
              </div>

              {/* Cerrar Sesión */}
              <button 
                onClick={handleLogout}
                style={{ 
                  background: 'white', borderRadius: '24px', padding: '1.2rem 1.5rem',
                  border: '1px solid #E4EBDD', display: 'flex', alignItems: 'center', 
                  gap: '12px', cursor: 'pointer', width: '100%', textAlign: 'left'
                }}
              >
                <LogOut size={20} color="#E11D48" />
                <span style={{ fontWeight: '800', color: '#E11D48', fontSize: '0.9rem' }}>Cerrar Sesión</span>
              </button>

              {/* Danger Zone */}
              <div style={{ 
                padding: '1.5rem', borderRadius: '24px', 
                border: '2px solid #FEE2E2', background: '#FEF2F2', marginTop: '1rem'
              }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#991B1B', marginBottom: '0.5rem' }}>Zona de Peligro</h3>
                <p style={{ fontSize: '0.8rem', color: '#B91C1C', marginBottom: '1rem' }}>
                  Eliminar tu cuenta es permanente y borrará toda tu información de Alimnet.
                </p>
                <button style={{ 
                  padding: '0.6rem 1.2rem', background: '#EF4444', color: 'white', 
                  border: 'none', borderRadius: '10px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' 
                }}>
                  Eliminar mi cuenta
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5' }}>

      {/* Header */}
      <header style={{ 
        padding: '0.6rem 1.5rem', display: 'flex', justifyContent: 'space-between', 
        alignItems: 'center', background: '#F4F1E6', borderBottom: '1px solid rgba(0,0,0,0.05)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div onClick={() => window.location.href = '/'} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: '950', color: '#2D3A20', letterSpacing: '-0.05em' }}>ALIMNET</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => window.location.href = '/explorar'}
            style={{ background: 'none', border: 'none', color: '#5F7D4A', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Explorar
          </button>
          <div style={{ 
            width: '36px', height: '36px', borderRadius: '12px', 
            background: 'linear-gradient(135deg, #5F7D4A, #7FA05B)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '0.85rem', fontWeight: '900'
          }}>
            {initials}
          </div>
        </div>
      </header>

      <div style={{ 
        display: 'flex', 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: 'calc(100vh - 52px)'
      }}>
        {/* Sidebar / Mobile Tab Bar */}
        {!isMobile ? (
          <nav style={{ 
            width: '250px', padding: '2rem 1rem', 
            borderRight: '1px solid #E4EBDD', background: 'white',
            position: 'sticky', top: '52px', height: 'calc(100vh - 52px)'
          }}>
            <div style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6B7C5E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mi Cuenta</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '0.8rem 1rem',
                    borderRadius: '14px', border: 'none', 
                    background: activeTab === tab.id ? '#5F7D4A' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#6B7C5E',
                    fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem',
                    transition: 'all 0.15s', textAlign: 'left', width: '100%'
                  }}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <button 
                onClick={handleLogout}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '0.8rem 1rem',
                  borderRadius: '14px', border: 'none', background: 'transparent',
                  color: '#E11D48', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem',
                  width: '100%', textAlign: 'left'
                }}
              >
                <LogOut size={18} /> Cerrar Sesión
              </button>
            </div>
          </nav>
        ) : (
          /* Mobile bottom tab bar */
          <nav style={{ 
            position: 'fixed', bottom: 0, left: 0, right: 0, 
            background: 'white', borderTop: '1px solid #E4EBDD',
            display: 'flex', justifyContent: 'space-around', padding: '0.6rem 0 calc(0.6rem + env(safe-area-inset-bottom))',
            zIndex: 100
          }}>
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{ 
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: activeTab === tab.id ? '#5F7D4A' : '#aaa',
                  fontSize: '0.65rem', fontWeight: '800', padding: '4px 8px'
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <main style={{ 
          flex: 1, padding: isMobile ? '1.5rem 1rem 6rem' : '2rem 3rem', 
          maxWidth: '800px'
        }}>
          {renderContent()}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
