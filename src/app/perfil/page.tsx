'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Loader2,
  MapPin,
  Clock,
  ShieldCheck,
  Instagram,
  Download,
  Share2,
  Leaf,
  X,
  Send,
  ExternalLink,
  Smartphone,
  Check,
  Mail,
  Camera,
  Globe,
  Truck,
  Plus
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function MerchantProfilePage() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [profile, setProfile] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [emailStatsEnabled, setEmailStatsEnabled] = useState(true);

  // Estados del Formulario (Completo)
  const [formData, setFormData] = useState<any>({
    name: '',
    bio_short: '',
    bio_long: '',
    types: [], 
    categories: '',
    whatsapp: '',
    email_public: '',
    instagram_url: '',
    website_url: '',
    google_maps_url: '', // Nuevo campo
    locality: '',
    delivery_info: '',
    working_hours: ''
  });

  const availableTypes = [
    { id: 'Productor', label: 'Productor', sub: 'Producción primaria' },
    { id: 'Abastecedor', label: 'Abastecedor', sub: 'Almacén, dietética, proveedor, distribución' },
    { id: 'Restaurante', label: 'Restaurante', sub: 'Gastronomía con local' },
    { id: 'Chef', label: 'Chef', sub: 'Servicios de cocina' }
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    fetchData();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { data: pData } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (pData) setProfile(pData);

      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', user.id);
      
      if (mData && mData.length > 0) {
        setMerchant(mData[0]);
        const dbTypes = mData[0].type ? (typeof mData[0].type === 'string' ? mData[0].type.split(',') : mData[0].type) : [];
        
        setFormData({
          name: mData[0].name || '',
          bio_short: mData[0].bio_short || '',
          bio_long: mData[0].bio_long || '',
          types: dbTypes,
          categories: mData[0].categories || '',
          whatsapp: mData[0].whatsapp || '',
          email_public: mData[0].email || '',
          instagram_url: mData[0].instagram_url || '',
          website_url: mData[0].website_url || '',
          google_maps_url: mData[0].google_maps_url || '',
          locality: mData[0].locations?.[0]?.locality || '',
          delivery_info: mData[0].delivery_info || '',
          working_hours: mData[0].working_hours || ''
        });
      } else {
        setMerchant({
          name: 'Agroecología La Esperanza',
          validation_count: 24,
          bio_short: 'Productores de hortalizas orgánicas y miel de monte.',
          website_url: 'https://linktr.ee/esperanza',
          instagram_url: '@huerta_esperanza',
          google_maps_url: 'https://goo.gl/maps/example',
          type: ['Productor']
        });
        setFormData((prev: any) => ({ 
          ...prev, 
          types: ['Productor'],
          google_maps_url: 'https://goo.gl/maps/example'
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (id: string) => {
    setFormData((prev: any) => {
      const current = prev.types || [];
      const next = current.includes(id) 
        ? current.filter((t: string) => t !== id)
        : [...current, id];
      return { ...prev, types: next };
    });
  };

  const InputField = ({ label, value, onChange, placeholder = '', icon: Icon }: any) => (
    <div style={{ marginBottom: '1.2rem' }}>
      <label style={{ display: 'block', fontWeight: '900', color: '#3F5232', marginBottom: '0.6rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
         {Icon && <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#A8C3A2' }} />}
         <input 
           type="text" 
           value={value} 
           onChange={(e) => onChange(e.target.value)} 
           placeholder={placeholder}
           style={{ 
             width: '100%', padding: Icon ? '0.8rem 0.8rem 0.8rem 2.8rem' : '0.8rem', 
             borderRadius: '12px', border: '1.5px solid #F0F4ED', outline: 'none', 
             background: '#F8F9F5', fontSize: '0.9rem', fontWeight: '700', color: '#2D3A20'
           }} 
         />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'inicio':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexDirection: isMobileView ? 'column' : 'row', gap: '1rem', textAlign: isMobileView ? 'center' : 'left' }}>
              <div>
                <h1 style={{ fontSize: isMobileView ? '1.5rem' : '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>Mi Panel</h1>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>Resumen del impacto de <strong>{merchant?.name}</strong>.</p>
              </div>
              <div style={{ padding: '0.6rem 1.2rem', background: '#F0F4ED', color: '#5F7D4A', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '900' }}>
                <Check size={14} /> Perfil Validado
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Validaciones', value: merchant?.validation_count || '0', icon: ShieldCheck, color: '#5F7D4A' },
                { label: 'Interés IG', value: '18', icon: Instagram, color: '#E1306C' },
                { label: 'Interés Web', value: '24', icon: ExternalLink, color: '#2D3A20' },
                { label: 'Interés Wzp', value: '9', icon: MessageSquare, color: '#25D366' }
              ].map((stat, i) => (
                <div key={i} style={{ background: 'white', padding: '1.2rem', borderRadius: '20px', border: '1px solid #E4EBDD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.8rem' }}>
                    <div style={{ background: `${stat.color}10`, color: stat.color, padding: '6px', borderRadius: '8px' }}>
                      <stat.icon size={14} />
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: '850', color: '#888', textTransform: 'uppercase' }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '950', color: '#2D3A20' }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1.3fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '950', color: '#2D3A20', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Smartphone size={18} /> Previsualización</h3>
                  <div style={{ border: '1px solid #eee', borderRadius: '20px', overflow: 'hidden', maxWidth: '300px', margin: isMobileView ? '0 auto' : '0', background: 'white' }}>
                    <div style={{ height: '100px', background: '#F4F1E6' }}></div>
                    <div style={{ padding: '1.5rem', marginTop: '-40px' }}>
                       <div style={{ width: '70px', height: '70px', background: 'white', borderRadius: '18px', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Leaf size={35} color="#5F7D4A" /></div>
                       <h4 style={{ fontSize: '1.2rem', fontWeight: '1000', color: '#2D3A20', marginTop: '1rem', marginBottom: '0.3rem' }}>{merchant?.name}</h4>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5F7D4A', fontSize: '0.75rem', fontWeight: '900' }}><ShieldCheck size={14} fill="#5F7D4A" color="white" /> {merchant?.validation_count} Validaciones</div>
                       <p style={{ color: '#666', fontSize: '0.75rem', marginTop: '0.8rem', lineHeight: '1.4' }}>{merchant?.bio_short}</p>
                       <div style={{ display: 'flex', gap: '8px', marginTop: '1.2rem' }}>
                          <Instagram size={16} color="#A8C3A2" />
                          <ExternalLink size={16} color="#A8C3A2" />
                          <MapPin size={16} color="#A8C3A2" />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#2D3A20', marginBottom: '1rem' }}>Reportes</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.8rem 1rem', background: '#F8F9F5', borderRadius: '14px' }}>
                       <span style={{ fontSize: '0.75rem', fontWeight: '850', color: '#3F5232' }}>Correo mensual</span>
                       <div onClick={() => setEmailStatsEnabled(!emailStatsEnabled)} style={{ width: '40px', height: '20px', background: emailStatsEnabled ? '#5F7D4A' : '#ccc', borderRadius: '20px', padding: '3px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: emailStatsEnabled ? 'flex-end' : 'flex-start' }}><div style={{ width: '14px', height: '14px', background: 'white', borderRadius: '50%' }} /></div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'perfil':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Editar Perfil</h1>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Asegúrate de que tus datos estén al día.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <InputField label="Nombre Oficial" value={formData.name} onChange={(v: string) => setFormData({...formData, name: v})} placeholder="Nombre de tu negocio" />
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontWeight: '900', color: '#3F5232', marginBottom: '0.8rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Tipo de comercio</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       {availableTypes.map(type => (
                         <div 
                           key={type.id}
                           onClick={() => toggleType(type.id)}
                           style={{ 
                             padding: '0.8rem 1.2rem', borderRadius: '14px', border: '2.5px solid', 
                             borderColor: formData.types?.includes(type.id) ? '#5F7D4A' : '#F0F4ED',
                             background: formData.types?.includes(type.id) ? '#F0F4ED' : 'white', cursor: 'pointer',
                             transition: 'all 0.1s', width: 'fit-content'
                           }}
                         >
                            <span style={{ fontWeight: '950', color: formData.types?.includes(type.id) ? '#2D3A20' : '#888', fontSize: '0.9rem' }}>{type.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1.5fr 1fr', gap: '1.2rem' }}>
                     <InputField label="Descripción" value={formData.bio_short} onChange={(v: string) => setFormData({...formData, bio_short: v})} placeholder="Una frase que te identifique" />
                     <InputField label="Categorías" value={formData.categories} onChange={(v: string) => setFormData({...formData, categories: v})} placeholder="Ej: Miel, Verduras" />
                  </div>
               </div>

               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1.5rem' }}>Redes y Contacto</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1fr 1fr', gap: '1.2rem' }}>
                     <InputField label="WhatsApp" icon={Send} value={formData.whatsapp} onChange={(v: string) => setFormData({...formData, whatsapp: v})} placeholder="+54 9..." />
                     <InputField label="Instagram" icon={Instagram} value={formData.instagram_url} onChange={(v: string) => setFormData({...formData, instagram_url: v})} placeholder="@usuario" />
                     <InputField label="Web / Linktree" icon={Globe} value={formData.website_url} onChange={(v: string) => setFormData({...formData, website_url: v})} placeholder="https://..." />
                     <InputField label="Enlace Google Maps" icon={MapPin} value={formData.google_maps_url} onChange={(v: string) => setFormData({...formData, google_maps_url: v})} placeholder="https://goo.gl/maps/..." />
                  </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
                  <button 
                    disabled={saving}
                    style={{ padding: '1rem 3rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '1000', cursor: 'pointer', opacity: saving ? 0.7 : 1, width: 'fit-content' }}
                  >
                    {saving ? <Loader2 className="animate-spin" size={18} /> : 'GUARDAR CAMBIOS'}
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
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', paddingTop: '56px' }}>
      <Header />
      {isMobileView && (
        <div style={{ background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.6rem 1rem', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', position: 'sticky', top: '56px', zIndex: 4000 }}>
           {[
            { id: 'inicio', label: 'Panel', icon: BarChart3 },
            { id: 'perfil', label: 'Perfil', icon: User },
            { id: 'config', label: 'Ajustes', icon: Settings }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : '#F0F4ED', color: activeTab === item.id ? 'white' : '#5F7D4A', fontWeight: '900', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex' }}>
        {!isMobileView && (
          <div style={{ width: '240px', background: 'white', borderRight: '1px solid #E4EBDD', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'sticky', top: '56px', height: 'calc(100vh - 56px)' }}>
             {[
               { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
               { id: 'perfil', label: 'Editar Perfil', icon: User },
               { id: 'config', label: 'Configuración', icon: Settings }
             ].map(item => (
               <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0.8rem 1rem', borderRadius: '14px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : 'transparent', color: activeTab === item.id ? 'white' : '#777', fontWeight: '850', cursor: 'pointer', fontSize: '0.85rem' }}>
                 <item.icon size={18} /> {item.label}
               </button>
             ))}
             <div style={{ marginTop: 'auto', padding: '1rem', borderTop: '1px solid #eee' }}>
                <button onClick={() => setShowChat(true)} style={{ width: '100%', padding: '0.7rem', background: '#F0F4ED', border: 'none', borderRadius: '10px', color: '#5F7D4A', fontWeight: '950', fontSize: '0.75rem', cursor: 'pointer' }}>
                  Chat Soporte
                </button>
             </div>
          </div>
        )}
        <div style={{ flex: 1, padding: isMobileView ? '1rem' : '2.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%', overflowY: 'auto' }}>
           {renderContent()}
        </div>
      </div>
      {showChat && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', width: '100%', maxWidth: '350px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
             <div style={{ background: '#2D3A20', padding: '1.2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '950' }}>Soporte</h4>
                <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: 'white' }}><X size={20} /></button>
             </div>
             <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                <button style={{ width: '100%', padding: '1rem', background: '#25D366', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '950', fontSize: '0.9rem' }}>
                   WHATSAPP
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
