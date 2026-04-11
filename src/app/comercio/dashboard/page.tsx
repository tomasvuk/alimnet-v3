'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Store,
  MapPin,
  Instagram,
  Globe,
  Settings,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Save,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  LogOut,
  ChevronDown,
  Phone,
  MessageCircle,
  Info
} from 'lucide-react';
import Header from '@/components/Header';

// --- Tipos ---
interface Merchant {
  id: string;
  name: string;
  bio_short: string | null;
  bio_long: string | null;
  instagram_url: string | null;
  website_url: string | null;
  phone: string | null;
  whatsapp: string | null;
  status: string;
  verified: boolean;
  type: string;
  owner_id: string | null;
  working_hours: string | null;
  order_instructions: string | null;
  delivery_info: string | null;
}

interface Member {
  id: string;
  user_id: string;
  role: 'owner' | 'member';
  profile?: {
    first_name: string;
    last_name: string;
    full_name: string;
    role: string;
  };
}

interface Location {
  id: string;
  address: string | null;
  locality: string | null;
  province: string | null;
  lat: number;
  lng: number;
  location_type: string;
  is_primary: boolean;
}

export default function MerchantDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState<'perfil' | 'ubicaciones' | 'miembros' | 'config'>('perfil');
  
  // Edit State
  const [editMerchant, setEditMerchant] = useState<Partial<Merchant>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const initDashboard = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.replace('/registro-comercio?redirect=/comercio/dashboard');
        return;
      }
      setUser(authUser);

      // 1. Buscar de qué comercios es miembro
      const { data: memberships, error } = await supabase
        .from('merchant_members')
        .select(`
          merchant_id,
          merchants (*)
        `)
        .eq('user_id', authUser.id);

      if (error) {
        console.error('Error fetching memberships:', error);
        setLoading(false);
        return;
      }

      if (!memberships || memberships.length === 0) {
        // No es miembro de nada. ¿Es Admin?
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', authUser.id).single();
        if (profile?.role === 'admin') {
           // Si es admin puede ver todo, pero por ahora lo mandamos al admin panel
           // router.replace('/admin');
        }
        setLoading(false);
        return;
      }

      const userMerchants = (memberships || []).map((m: any) => m.merchants) as unknown as Merchant[];
      setMerchants(userMerchants);
      
      // Seleccionar el primero por defecto
      if (userMerchants.length > 0) {
        await loadMerchantData(userMerchants[0]);
      } else {
        setLoading(false);
      }
    };

    initDashboard();
  }, []);

  const loadMerchantData = async (merchant: Merchant) => {
    setLoading(true);
    setSelectedMerchant(merchant);
    setEditMerchant(merchant);

    // Cargar Miembros
    const { data: membersData } = await supabase
      .from('merchant_members')
      .select(`
        id,
        user_id,
        role,
        profile:profiles(first_name, last_name, full_name, role)
      `)
      .eq('merchant_id', merchant.id);
    
    setMembers((membersData || []) as any);

    // Cargar Ubicaciones
    const { data: locData } = await supabase
      .from('locations')
      .select('*')
      .eq('merchant_id', merchant.id);
    
    setLocations(locData || []);
    setLoading(false);
  };

  const handleSaveInfo = async () => {
    if (!selectedMerchant || !editMerchant) return;
    setIsSaving(true);
    
    try {
      const { error } = await supabase
        .from('merchants')
        .update({
          name: editMerchant.name,
          bio_short: editMerchant.bio_short,
          bio_long: editMerchant.bio_long,
          instagram_url: editMerchant.instagram_url,
          website_url: editMerchant.website_url,
          phone: editMerchant.phone,
          whatsapp: editMerchant.whatsapp,
          working_hours: editMerchant.working_hours,
          order_instructions: editMerchant.order_instructions,
          delivery_info: editMerchant.delivery_info,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedMerchant.id);

      if (error) throw error;
      
      // Actualizar estado local
      const updatedMerchant = { ...selectedMerchant, ...editMerchant };
      setSelectedMerchant(updatedMerchant);
      setMerchants(prev => prev.map(m => m.id === updatedMerchant.id ? updatedMerchant : m));
      
      alert('¡Información actualizada con éxito!');
    } catch (e: any) {
      alert(`Error al guardar: ${e.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid #5F7D4A', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem' }}></div>
          <p style={{ color: '#5F7D4A', fontWeight: '800' }}>Cargando tu Alimnet...</p>
        </div>
      </div>
    );
  }

  if (merchants.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F9F5' }}>
        <Header />
        <main style={{ maxWidth: '800px', margin: '140px auto 0', padding: '2rem', textAlign: 'center' }}>
          <AlertCircle size={64} color="#B2AC88" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1.5rem' }}>No tienes comercios asociados</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Para gestionar un comercio en Alimnet, primero debes registrarlo o ser invitado por un dueño existente como miembro.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
             <button onClick={() => router.push('/')} style={{ padding: '1rem 2rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '15px', fontWeight: '1000', cursor: 'pointer' }}>Volver al Inicio</button>
             <button onClick={() => router.push('/contacto')} style={{ padding: '1rem 2rem', background: 'white', color: '#2D3A20', border: '1px solid #E4EBDD', borderRadius: '15px', fontWeight: '1000', cursor: 'pointer' }}>Soporte Alimnet</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px' }}>
      <Header />
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        
        {/* TOP NAV / SELECTOR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.05)', border: '1px solid #E4EBDD' }}>
              <Store size={32} color="#5F7D4A" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B2AC88', fontSize: '0.8rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Dashboard del Comercio <ChevronRight size={14} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', margin: 0, letterSpacing: '-0.03em' }}>
                  {selectedMerchant?.name}
                </h1>
                {selectedMerchant?.verified && (
                  <div style={{ background: '#5F7D4A15', color: '#5F7D4A', padding: '4px 10px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '1000', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <ShieldCheck size={14} /> VERIFICADO
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
             {merchants.length > 1 && (
               <div style={{ position: 'relative' }}>
                 <select 
                   value={selectedMerchant?.id} 
                   onChange={(e) => loadMerchantData(merchants.find(m => m.id === e.target.value)!)}
                   style={{ padding: '0.8rem 1.5rem', background: 'white', border: '1px solid #E4EBDD', borderRadius: '16px', fontWeight: '800', cursor: 'pointer', outline: 'none' }}
                 >
                   {merchants.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                 </select>
               </div>
             )}
             <button onClick={() => router.push('/')} style={{ background: 'white', border: '1px solid #E4EBDD', padding: '0.8rem 1.5rem', borderRadius: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
               <LogOut size={18} /> Salir
             </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          
          {/* SIDEBAR */}
          <aside>
             <div style={{ background: 'white', borderRadius: '32px', padding: '1.5rem', border: '1px solid #E4EBDD', position: 'sticky', top: '100px' }}>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                   <SidebarItem active={activeTab === 'perfil'} icon={<Store size={20} />} label="Perfil Público" onClick={() => setActiveTab('perfil')} />
                   <SidebarItem active={activeTab === 'ubicaciones'} icon={<MapPin size={20} />} label="Mapa y Puntos" onClick={() => setActiveTab('ubicaciones')} />
                   <SidebarItem active={activeTab === 'miembros'} icon={<Users size={20} />} label="Miembros" onClick={() => setActiveTab('miembros')} />
                   <SidebarItem active={activeTab === 'config'} icon={<Settings size={20} />} label="Configuración" onClick={() => setActiveTab('config')} />
                </nav>
                
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #F0F4ED' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.5rem 1rem' }}>
                      <div style={{ width: '32px', height: '32px', background: '#F8F9F5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '1000', color: '#5F7D4A', fontSize: '0.7rem' }}>
                         {user?.email?.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: '1000', color: '#2D3A20' }}>Tu Sesión</div>
                        <div style={{ fontSize: '0.7rem', color: '#888' }}>{user?.email}</div>
                      </div>
                   </div>
                </div>
             </div>
          </aside>

          {/* MAIN CONTENT */}
          <section>
             <div style={{ background: 'white', borderRadius: '40px', padding: '3rem', border: '1px solid #E4EBDD', minHeight: '600px' }}>
                
                {activeTab === 'perfil' && (
                  <div style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Perfil del Comercio</h2>
                    <p style={{ color: '#888', marginBottom: '2.5rem', fontWeight: '550' }}>Esta información es la que ven los usuarios en la red Alimnet.</p>
                    
                    <div style={{ display: 'grid', gap: '2rem' }}>
                       <FormGroup label="Nombre del Emprendimiento">
                          <input 
                            type="text" 
                            value={editMerchant.name || ''} 
                            onChange={(e) => setEditMerchant({...editMerchant, name: e.target.value})}
                            style={InputStyle}
                          />
                       </FormGroup>

                       <FormGroup label="Biografía Corta (Una frase)">
                          <input 
                            type="text" 
                            placeholder="Ej: Panadería artesanal con masa madre orgánica."
                            value={editMerchant.bio_short || ''} 
                            onChange={(e) => setEditMerchant({...editMerchant, bio_short: e.target.value})}
                            style={InputStyle}
                          />
                       </FormGroup>

                       <FormGroup label="Biografía Extendida">
                          <textarea 
                            rows={4}
                            value={editMerchant.bio_long || ''} 
                            onChange={(e) => setEditMerchant({...editMerchant, bio_long: e.target.value})}
                            style={TextareaStyle}
                          />
                       </FormGroup>

                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <FormGroup label="Instagram (URL Completa)">
                             <div style={{ position: 'relative' }}>
                               <Instagram size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} />
                               <input 
                                 type="text" 
                                 placeholder="https://instagram.com/tu_usuario"
                                 value={editMerchant.instagram_url || ''} 
                                 onChange={(e) => setEditMerchant({...editMerchant, instagram_url: e.target.value})}
                                 style={{ ...InputStyle, paddingLeft: '3rem' }}
                               />
                             </div>
                          </FormGroup>
                          <FormGroup label="Sitio Web">
                             <div style={{ position: 'relative' }}>
                               <Globe size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} />
                               <input 
                                 type="text" 
                                 placeholder="https://www.tuweb.com"
                                 value={editMerchant.website_url || ''} 
                                 onChange={(e) => setEditMerchant({...editMerchant, website_url: e.target.value})}
                                 style={{ ...InputStyle, paddingLeft: '3rem' }}
                               />
                             </div>
                          </FormGroup>
                       </div>

                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                          <FormGroup label="WhatsApp">
                             <div style={{ position: 'relative' }}>
                               <MessageCircle size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} />
                               <input 
                                 type="text" 
                                 placeholder="+54 9 11 ..."
                                 value={editMerchant.whatsapp || ''} 
                                 onChange={(e) => setEditMerchant({...editMerchant, whatsapp: e.target.value})}
                                 style={{ ...InputStyle, paddingLeft: '3rem' }}
                               />
                             </div>
                          </FormGroup>
                          <FormGroup label="Teléfono de contacto">
                             <div style={{ position: 'relative' }}>
                               <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#B2AC88' }} />
                               <input 
                                 type="text" 
                                 value={editMerchant.phone || ''} 
                                 onChange={(e) => setEditMerchant({...editMerchant, phone: e.target.value})}
                                 style={{ ...InputStyle, paddingLeft: '3rem' }}
                               />
                             </div>
                          </FormGroup>
                       </div>

                       <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F0F4ED', paddingTop: '2rem' }}>
                          <button 
                            onClick={handleSaveInfo}
                            disabled={isSaving}
                            style={{ padding: '1.2rem 3rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '18px', fontWeight: '1000', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(95, 125, 74, 0.3)', opacity: isSaving ? 0.7 : 1 }}
                          >
                            {isSaving ? 'Guardando...' : <><Save size={20} /> Guardar Cambios</>}
                          </button>
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ubicaciones' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Puntos en el Mapa</h2>
                        <p style={{ color: '#888', fontWeight: '550' }}>Gestioná tus locales físicos o puntos de retiro.</p>
                      </div>
                      <button style={{ padding: '0.8rem 1.5rem', background: 'white', border: '2px solid #E4EBDD', borderRadius: '14px', fontWeight: '1000', color: '#2D3A20', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                         <Plus size={18} strokeWidth={3} /> Agregar Punto
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                       {locations.length === 0 ? (
                         <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', background: '#F8F9F5', borderRadius: '25px', border: '2px dashed #E4EBDD' }}>
                            <MapPin size={48} color="#B2AC88" style={{ marginBottom: '1rem' }} />
                            <p style={{ fontWeight: '800', color: '#666' }}>No tienes puntos de venta registrados aún.</p>
                         </div>
                       ) : locations.map(loc => (
                         <div key={loc.id} style={{ background: 'white', padding: '2rem', borderRadius: '28px', border: '1.5px solid #E4EBDD', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                               <button style={{ background: '#F8F9F5', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><Settings size={14} color="#B2AC88" /></button>
                               <button style={{ background: '#FEF2F2', border: 'none', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}><Trash2 size={14} color="#EF4444" /></button>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: '1000', fontSize: '0.75rem', marginBottom: '0.8rem' }}>
                               {loc.location_type === 'fixed' ? 'LOCAL FÍSICO' : 'PUNTO DE RETIRO'}
                               {loc.is_primary && <span style={{ background: '#5F7D4A', color: 'white', padding: '2px 8px', borderRadius: '5px', fontSize: '0.6rem' }}>PRINCIPAL</span>}
                            </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '1000', margin: '0 0 0.4rem 0', color: '#2D3A20' }}>{loc.address}</h3>
                            <div style={{ fontSize: '0.9rem', color: '#888', fontWeight: '600' }}>{loc.locality}, {loc.province}</div>
                            
                            <div style={{ marginTop: '1.5rem', background: '#F8F9F5', borderRadius: '15px', padding: '0.8rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#B2AC88', fontWeight: '900' }}>
                               <MapPin size={14} /> Lat: {loc.lat.toFixed(4)} Lng: {loc.lng.toFixed(4)}
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'miembros' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
                      <div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Miembros del Equipo</h2>
                        <p style={{ color: '#888', fontWeight: '550' }}>Gestioná quiénes pueden editar la información de {selectedMerchant?.name}.</p>
                      </div>
                      <button style={{ padding: '0.8rem 1.5rem', background: 'white', border: '2px solid #E4EBDD', borderRadius: '14px', fontWeight: '1000', color: '#2D3A20', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                         <Plus size={18} strokeWidth={3} /> Invitar Miembro
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '1rem' }}>
                       {members.map(member => (
                         <div key={member.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1.5rem 2rem', borderRadius: '25px', border: '1px solid #E4EBDD' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                               <div style={{ width: '48px', height: '48px', background: '#F0F4ED', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '1000', color: '#5F7D4A' }}>
                                  {member.profile?.first_name?.charAt(0) || 'U'}
                               </div>
                               <div>
                                  <div style={{ fontWeight: '1000', fontSize: '1.1rem', color: '#2D3A20' }}>
                                    {member.profile?.full_name || 'Nuevo Miembro'}
                                    {member.user_id === user.id && <span style={{ marginLeft: '10px', fontSize: '0.7rem', background: '#F8F9F5', padding: '2px 8px', borderRadius: '6px', color: '#B2AC88' }}>TÚ</span>}
                                  </div>
                                  <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: '600' }}>ID: {member.user_id.slice(0, 8)}...</div>
                               </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                               <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '0.7rem', fontWeight: '950', color: '#B2AC88', textTransform: 'uppercase' }}>Rol en Comercio</div>
                                  <div style={{ 
                                    fontSize: '0.9rem', 
                                    fontWeight: '1000', 
                                    color: member.role === 'owner' ? '#5F7D4A' : '#777',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    justifyContent: 'flex-end'
                                  }}>
                                    {member.role === 'owner' ? <ShieldCheck size={16} /> : <Users size={16} />}
                                    {member.role === 'owner' ? 'Dueño' : 'Miembro'}
                                  </div>
                               </div>
                               {member.role !== 'owner' && (
                                 <button style={{ background: '#FFF1F2', border: 'none', padding: '12px', borderRadius: '14px', cursor: 'pointer' }}>
                                    <Trash2 size={18} color="#EF4444" />
                                 </button>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}

                {activeTab === 'config' && (
                  <div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem' }}>Configuración Avanzada</h2>
                    <p style={{ color: '#888', marginBottom: '2.5rem', fontWeight: '550' }}>Opciones de visibilidad y estado de la cuenta.</p>
                    
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                       <div style={{ padding: '2rem', background: '#FEF2F2', borderRadius: '25px', border: '1px solid #FEE2E2' }}>
                          <h3 style={{ color: '#991B1B', margin: '0 0 0.5rem 0', fontWeight: '1000' }}>Panel de Peligro</h3>
                          <p style={{ color: '#B91C1E', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Una vez borrados los datos, no se podrán recuperar. La verificación también se perderá.</p>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                             <button style={{ padding: '0.8rem 1.5rem', background: '#EF4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Eliminar Comercio</button>
                             <button style={{ padding: '0.8rem 1.5rem', background: 'white', color: '#EF4444', border: '1.5px solid #EF4444', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Suspender Temporalmente</button>
                          </div>
                       </div>
                    </div>
                  </div>
                )}
                
             </div>
          </section>
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');
        body { font-family: 'Manrope', sans-serif; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// --- Subcomponentes ---
function SidebarItem({ active, icon, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '0.9rem 1.2rem', 
        width: '100%', 
        border: 'none',
        background: active ? '#5F7D4A10' : 'transparent',
        color: active ? '#5F7D4A' : '#777',
        borderRadius: '16px',
        fontWeight: active ? '1000' : '700',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textAlign: 'left'
      }}
    >
      {icon} {label}
    </button>
  );
}

function FormGroup({ label, children }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
       <label style={{ fontSize: '0.85rem', fontWeight: '1000', color: '#2D3A20', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{label}</label>
       {children}
    </div>
  );
}

const InputStyle = {
  width: '100%',
  padding: '1.1rem 1.2rem',
  borderRadius: '18px',
  border: '1.5px solid #F0F4ED',
  background: '#F8F9F5',
  fontSize: '1rem',
  fontWeight: '700',
  color: '#2D3A20',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const TextareaStyle = {
  ...InputStyle,
  resize: 'vertical' as const,
  fontFamily: 'inherit'
};
