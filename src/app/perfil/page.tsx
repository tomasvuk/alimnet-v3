'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  Loader2,
  MapPin,
  Clock,
  Bookmark,
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
  Plus,
  AlertCircle,
  Bell,
  Fingerprint,
  Shield,
  Eye,
  Image as ImageIcon,
  Palette,
  Upload,
  Heart,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ImageCropper from '@/components/ImageCropper';
import { removeAuthCookie } from '@/lib/auth-utils';
import AlimnetLoader from '@/components/AlimnetLoader';

export default function MerchantProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('inicio');
  const [profile, setProfile] = useState<any>(null);
  const [merchant, setMerchant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deployId] = useState('v.4.1.2 🚀');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [emailStatsEnabled, setEmailStatsEnabled] = useState(true);
  const [showMapValidation, setShowMapValidation] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [croppingImage, setCroppingImage] = useState<{ url: string, type: 'logo' | 'gallery', aspect: number, index?: number } | null>(null);
  const [savedMerchants, setSavedMerchants] = useState<any[]>([]);
  const [likedMerchants, setLikedMerchants] = useState<any[]>([]);
  const officialCategories = [
    'Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 
    'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'
  ];

  // Estados del Formulario
  const [formData, setFormData] = useState<any>({
    name: '',
    bio_short: '',
    bio_long: '',
    types: [], 
    categories: [], 
    custom_category: '', 
    whatsapp: '',
    email_public: '',
    instagram_url: '',
    website_url: '',
    google_maps_url: '',
    locality: '',
    delivery_info: '',
    working_hours: '',
    logo_url: '',
    gallery_images: []
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

  const fetchData = async (retryCount = 0) => {
    try {
      // 1. Intentamos obtener el usuario de forma estándar
      let { data: { user }, error: userError } = await supabase.auth.getUser();
      
      // 2. [BRUTE FORCE PARA MÓVILES] Si falla, buscamos en la cookie
      if (!user) {
        console.log("Buscando sesión en la cookie (Copia de seguridad)...");
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('sb-keagrrvtzmsukcmzxqrl-auth-token='));
        
        if (authCookie) {
          try {
            const cookieValue = decodeURIComponent(authCookie.split('=')[1]);
            const sessionData = JSON.parse(cookieValue);
            if (sessionData?.access_token && sessionData?.refresh_token) {
              console.log("Sesión encontrada en cookie. Restaurando en el motor...");
              const { data: { session }, error: setSessionError } = await supabase.auth.setSession({
                access_token: sessionData.access_token,
                refresh_token: sessionData.refresh_token
              });
              if (session) user = session.user;
            }
          } catch (e) {
            console.error("Error al restaurar sesión desde cookie:", e);
          }
        }
      }

      if (!user) {
        console.log(`Intento ${retryCount + 1}: Perfil no detectó usuario.`);
        if (retryCount < 2) {
          setTimeout(() => fetchData(retryCount + 1), 800);
          return;
        }
      }

      const currentUser = user || (await supabase.auth.getSession()).data.session?.user;
      if (!currentUser) return;

      const { data: pData } = await supabase.from('profiles').select('*').eq('id', currentUser.id).single();
      if (pData) setProfile(pData);

      const { data: mData } = await supabase.from('merchants').select('*, locations(*)').eq('owner_id', currentUser.id);
      
      if (mData && mData.length > 0) {
        setMerchant(mData[0]);
        const dbTypes = mData[0].type ? (typeof mData[0].type === 'string' ? mData[0].type.split(',') : mData[0].type) : [];
        const dbCats = mData[0].categories ? (typeof mData[0].categories === 'string' ? mData[0].categories.split(',').map((c: string) => c.trim()) : mData[0].categories) : [];
        
        setFormData({
          name: mData[0].name || '',
          bio_short: mData[0].bio_short || '',
          bio_long: mData[0].bio_long || '',
          types: dbTypes,
          categories: dbCats,
          custom_category: '',
          whatsapp: mData[0].whatsapp || '',
          email_public: mData[0].email || '',
          instagram_url: mData[0].instagram_url || '',
          website_url: mData[0].website_url || '',
          google_maps_url: mData[0].google_maps_url || '',
          locality: mData[0].locations?.[0]?.locality || '',
          delivery_info: mData[0].delivery_info || '',
          working_hours: mData[0].working_hours || '',
          logo_url: mData[0].logo_url || '',
          gallery_images: mData[0].gallery_images || []
        });
      } else {
        // No hay comercio asociado aún
        setMerchant(null);
      }

      // 4. [NUEVO] Traer Guardados y Me Gusta del Usuario
      const { data: savedData } = await supabase
        .from('user_saved_merchants')
        .select('*, merchants(*)')
        .eq('user_id', currentUser.id);
      
      const { data: likedData } = await supabase
        .from('favorites')
        .select('*, merchants(*)')
        .eq('user_id', currentUser.id);

      if (savedData) setSavedMerchants(savedData.map(s => s.merchants).filter(Boolean));
      if (likedData) setLikedMerchants(likedData.map(l => l.merchants).filter(Boolean));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleType = (id: string) => {
    setFormData((prev: any) => {
      const current = prev.types || [];
      const next = current.includes(id) ? current.filter((t: string) => t !== id) : [...current, id];
      return { ...prev, types: next };
    });
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev: any) => {
      const current = prev.categories || [];
      const next = current.includes(cat) ? current.filter((c: string) => c !== cat) : [...current, cat];
      return { ...prev, categories: next };
    });
  };

  const handleUpdateMerchant = async () => {
    try {
      setSaving(true);
      const targetId = merchant?.id;
      if (!targetId) throw new Error("No hay comercio detectado");
      
      const { error } = await supabase.from('merchants').update({
        name: formData.name,
        bio_short: formData.bio_short,
        bio_long: formData.bio_long,
        type: formData.types,
        categories: formData.categories,
        whatsapp: formData.whatsapp,
        email: formData.email_public,
        instagram_url: formData.instagram_url,
        website_url: formData.website_url,
        google_maps_url: formData.google_maps_url,
        delivery_info: formData.delivery_info,
        working_hours: formData.working_hours
      }).eq('id', targetId);

      if (error) throw error;
      
      setMessage({ type: 'success', text: '¡Perfil comercial actualizado correctamente! 🚀' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: `Error al guardar: ${err.message}` });
    } finally {
      setSaving(false);
    }
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexDirection: isMobileView ? 'column' : 'row', gap: '1rem' }}>
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
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '2px dashed #E4EBDD', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Palette size={20} color="#5F7D4A" />
                       <h3 style={{ fontSize: '0.9rem', fontWeight: '1000', color: '#2D3A20' }}>Recursos Alimnet</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <button style={{ width: '100%', padding: '0.7rem 1rem', background: '#F8F9F5', border: '1px solid #E4EBDD', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A' }}>Logos Oficiales (Kit)</span>
                          <Download size={14} color="#5F7D4A" />
                       </button>
                       <button style={{ width: '100%', padding: '0.7rem 1rem', background: '#F8F9F5', border: '1px solid #E4EBDD', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A' }}>Plantillas Historias IG</span>
                          <ImageIcon size={14} color="#5F7D4A" />
                       </button>
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
               
               {/* NUEVA SECCION MULTIMEDIA */}
               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', marginBottom: '2rem' }}>
                     <ImageIcon size={20} />
                     <h3 style={{ fontSize: '1rem', fontWeight: '950' }}>Identidad Visual</h3>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '150px 1fr', gap: '2rem' }}>
                     <div>
                        <label style={{ display: 'block', fontWeight: '950', color: '#3F5232', marginBottom: '0.8rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Logo Oficial</label>
                        <div 
                          className="hover-scale"
                          style={{ 
                            width: '120px', height: '120px', 
                            background: formData.logo_url ? `url(${formData.logo_url}) center/cover` : '#f8f9f5', 
                            border: '2.5px dashed #E4EBDD', borderRadius: '30px', 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                            color: '#A8C3A2', cursor: 'pointer', transition: 'all 0.2s',
                            position: 'relative', overflow: 'hidden'
                          }}
                        >
                           {!formData.logo_url && <Camera size={24} />}
                           {!formData.logo_url && (
                             <span style={{ fontSize: '0.6rem', fontWeight: '1000', marginTop: '8px', textAlign: 'center' }}>
                               SUBIR LOGO
                             </span>
                           )}
                           {formData.logo_url && (
                             <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} className="hover-overlay-v3">
                               <Upload size={20} />
                             </div>
                           )}

                           {/* INPUT OVERLAY (BALA DE PLATA PARA MÓVILES) */}
                           <input 
                             type="file" 
                             accept="image/*" 
                             onChange={(e) => {
                               const file = e.target.files?.[0];
                               if (!file) return;
                               setSaving(true);
                               setMessage({ type: 'success', text: 'Preparando editor... 🎨' });
                               const url = URL.createObjectURL(file);
                               setCroppingImage({ url, type: 'logo', aspect: 1 });
                               setSaving(false);
                               setMessage(null);
                               e.target.value = '';
                             }}
                             style={{
                               position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 10
                             }}
                           />
                        </div>
                     </div>
                     <div>
                        <label style={{ display: 'block', fontWeight: '950', color: '#3F5232', marginBottom: '0.8rem', fontSize: '0.75rem', textTransform: 'uppercase' }}>Galería de Imágenes (Máx 3)</label>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                           {[0, 1, 2].map(idx => (
                             <div key={idx} style={{ position: 'relative', width: '100px', height: '100px' }}>
                               <div 
                                 className="hover-scale"
                                 style={{ 
                                   width: '100%', height: '100%', 
                                   background: formData.gallery_images?.[idx] ? `url(${formData.gallery_images[idx]}) center/cover` : '#f8f9f5', 
                                   border: '1.5px solid #E4EBDD', borderRadius: '20px', 
                                   display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                   color: '#A8C3A2', cursor: 'pointer', position: 'relative',
                                   overflow: 'hidden'
                                 }}
                               >
                                  {!formData.gallery_images?.[idx] && <Plus size={20} />}

                                  {/* INPUT OVERLAY MOBILES */}
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      setSaving(true);
                                      setMessage({ type: 'success', text: 'Optimizando foto... 🖼️' });
                                      const url = URL.createObjectURL(file);
                                      setCroppingImage({ url, type: 'gallery', aspect: 4/3, index: idx });
                                      setSaving(false);
                                      setMessage(null);
                                      e.target.value = '';
                                    }}
                                    style={{
                                      position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%', zIndex: 10
                                    }}
                                  />
                               </div>
                             </div>
                           ))}
                        </div>
                        <p style={{ fontSize: '0.7rem', color: '#AAA', marginTop: '1rem', fontWeight: '600' }}>Sugerimos imágenes de tus productos o local. Máx 5MB.</p>
                     </div>
                  </div>
               </div>

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

                  <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontWeight: '900', color: '#3F5232', marginBottom: '1rem', fontSize: '0.8rem', textTransform: 'uppercase' }}>Categorías del Mapa</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                       {officialCategories.map(cat => (
                         <div 
                           key={cat}
                           onClick={() => toggleCategory(cat)}
                           style={{ 
                             padding: '0.6rem 1rem', borderRadius: '12px', border: '1.5px solid', 
                             borderColor: formData.categories?.includes(cat) ? '#5F7D4A' : '#f0f0f0',
                             background: formData.categories?.includes(cat) ? '#F0F4ED' : 'white', cursor: 'pointer',
                             transition: 'all 0.1s', fontSize: '0.85rem', fontWeight: '800', color: formData.categories?.includes(cat) ? '#5F7D4A' : '#999'
                           }}
                         >
                            {cat}
                         </div>
                       ))}
                    </div>
                  </div>

                  <InputField label="Descripción" value={formData.bio_short} onChange={(v: string) => setFormData({...formData, bio_short: v})} placeholder="Una frase que te identifique" />
               </div>

               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1.5rem' }}>Contacto y Maps</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1fr 1fr', gap: '1.2rem' }}>
                     <InputField label="WhatsApp" icon={Send} value={formData.whatsapp} onChange={(v: string) => setFormData({...formData, whatsapp: v})} placeholder="+54 9..." />
                     <InputField label="Instagram" icon={Instagram} value={formData.instagram_url} onChange={(v: string) => setFormData({...formData, instagram_url: v})} placeholder="usuario" />
                     <InputField label="Google Maps" icon={MapPin} value={formData.google_maps_url} onChange={(v: string) => setFormData({...formData, google_maps_url: v})} placeholder="https://goo.gl/maps/..." />
                     <InputField label="Web / Linktree" icon={Globe} value={formData.website_url} onChange={(v: string) => setFormData({...formData, website_url: v})} placeholder="https://..." />
                  </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem' }}>
                  <button 
                    onClick={handleUpdateMerchant}
                    disabled={saving}
                    style={{ padding: '1rem 3rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '14px', fontWeight: '1000', cursor: 'pointer', opacity: saving ? 0.7 : 1, width: 'fit-content' }}
                  >
                    {saving ? <AlimnetLoader size={18} /> : 'GUARDAR CAMBIOS'}
                  </button>
               </div>
            </div>
          </div>
        );
      case 'favoritos':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Mi Selección</h1>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Tus comercios favoritos y guardados para consultar pronto.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobileView ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
               {/* CARD DE GUARDADOS */}
               <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                     <div style={{ width: '40px', height: '40px', background: '#F0F4ED', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bookmark size={20} color="#5F7D4A" fill="#5F7D4A" />
                     </div>
                     <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#2D3A20' }}>Mis Guardados</h3>
                        <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '700' }}>{savedMerchants.length} {savedMerchants.length === 1 ? 'comercio' : 'comercios'}</p>
                     </div>
                  </div>
                  
                  {savedMerchants.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#F8F9F5', borderRadius: '18px', border: '1px dashed #E4EBDD' }}>
                       <p style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: '700' }}>Todavía no guardaste ningún comercio.</p>
                       <button onClick={() => router.push('/explorar')} style={{ marginTop: '1rem', background: '#5F7D4A', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer' }}>Explorar Mapa</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {savedMerchants.map((m: any) => (
                        <div key={m.id} onClick={() => router.push(`/explorar?id=${m.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: '#F8F9F5', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
                           <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              {m.logo_url ? <img src={m.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Leaf size={20} color="#CFDDC8" />}
                           </div>
                           <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '0.85rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>{m.name}</p>
                              <p style={{ fontSize: '0.7rem', color: '#888', fontWeight: '700', margin: 0 }}>{m.locations?.[0]?.locality || 'Ubicación local'}</p>
                           </div>
                           <ChevronRight size={16} color="#AAA" />
                        </div>
                      ))}
                    </div>
                  )}
               </div>

               {/* CARD DE ME GUSTA */}
               <div style={{ background: 'white', borderRadius: '24px', padding: '1.5rem', border: '1px solid #E4EBDD', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                     <div style={{ width: '40px', height: '40px', background: '#FFF2F2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={20} color="#FF4D4F" fill="#FF4D4F" />
                     </div>
                     <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: '950', color: '#2D3A20' }}>Mis Favoritos</h3>
                        <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '700' }}>{likedMerchants.length} {likedMerchants.length === 1 ? 'comercio' : 'comercios'}</p>
                     </div>
                  </div>

                  {likedMerchants.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', background: '#FFFDFD', borderRadius: '18px', border: '1px dashed #FFDADA' }}>
                       <p style={{ fontSize: '0.8rem', color: '#AAA', fontWeight: '700' }}>Dale <Heart size={10} /> a los comercios que recomendás.</p>
                       <button onClick={() => router.push('/explorar')} style={{ marginTop: '1rem', background: '#FF4D4F', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer' }}>Ir al mapa</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {likedMerchants.map((m: any) => (
                        <div key={m.id} onClick={() => router.push(`/explorar?id=${m.id}`)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: '#FFFDFD', border: '1px solid #FFEDEE', borderRadius: '16px', cursor: 'pointer', transition: 'transform 0.2s' }}>
                           <div style={{ width: '45px', height: '45px', borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              {m.logo_url ? <img src={m.logo_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Leaf size={20} color="#FFDADA" />}
                           </div>
                           <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '0.85rem', fontWeight: '950', color: '#2D3A20', margin: 0 }}>{m.name}</p>
                              <p style={{ fontSize: '0.7rem', color: '#FF4D4F', fontWeight: '850', margin: 0, opacity: 0.8 }}>{m.validation_count || 0} validaciones</p>
                           </div>
                           <ChevronRight size={16} color="#FFBABA" />
                        </div>
                      ))}
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
      case 'config':
        return (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '950', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Configuración</h1>
            <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Administrá tu cuenta y preferencias de seguridad.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', marginBottom: '1.5rem' }}>
                     <Fingerprint size={20} />
                     <h3 style={{ fontSize: '1rem', fontWeight: '950' }}>Cuenta y Acceso</h3>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem', background: '#F8F9F5', borderRadius: '16px', marginBottom: '1rem' }}>
                     <div>
                        <div style={{ fontSize: '0.7rem', color: '#999', fontWeight: '900', textTransform: 'uppercase' }}>Email de acceso</div>
                        <div style={{ fontSize: '0.9rem', color: '#2D3A20', fontWeight: '700' }}>{profile?.email || 'usuario@alimnet.com'}</div>
                     </div>
                     <button style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #E4EBDD', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A' }}>Cambiar</button>
                  </div>
               </div>

               <div style={{ background: 'white', borderRadius: '24px', padding: '2rem', border: '1px solid #E4EBDD' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', marginBottom: '2rem' }}>
                     <Bell size={20} />
                     <h3 style={{ fontSize: '1rem', fontWeight: '950' }}>Preferencias</h3>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                     <div>
                        <div style={{ fontSize: '0.9rem', color: '#2D3A20', fontWeight: '850' }}>Reportes Estadísticos</div>
                        <div style={{ fontSize: '0.75rem', color: '#777' }}>Recibir un resumen mensual de visitas.</div>
                     </div>
                     <div onClick={() => setEmailStatsEnabled(!emailStatsEnabled)} style={{ width: '45px', height: '24px', background: emailStatsEnabled ? '#5F7D4A' : '#ccc', borderRadius: '20px', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: emailStatsEnabled ? 'flex-end' : 'flex-start' }}><div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} /></div>
                  </div>
               </div>

             <div style={{ border: '1px solid #fee2e2', borderRadius: '24px', padding: '2rem', background: '#fef2f2' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '950', color: '#dc2626', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><LogOut size={18} /> Zona de Peligro</h3>
                <button 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    removeAuthCookie();
                    router.push('/');
                  }}
                  style={{ width: '100%', padding: '1rem', background: 'white', border: '1px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  Cerrar Sesión
                </button>
             </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <AlimnetLoader fullScreen />;

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', paddingTop: '56px' }}>
      <Header />
      
      {/* Etiqueta de Versión para verificar Deploy */}
      <div style={{ position: 'fixed', top: '10px', right: '10px', background: '#2D3A20', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', zIndex: 9999, opacity: 0.8 }}>
        {deployId}
      </div>

      {message && (
        <div style={{ 
          position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 10000, padding: '1rem 2rem', borderRadius: '16px', 
          background: message.type === 'success' ? '#EEF8F1' : '#FFF2F2',
          border: `1px solid ${message.type === 'success' ? '#27AE60' : '#D32F2F'}`,
          color: message.type === 'success' ? '#27AE60' : '#D32F2F',
          fontWeight: '1000', fontSize: '0.9rem', textAlign: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          {message.type === 'success' ? '✨ ' : '⚠️ '}
          {message.text}
        </div>
      )}

      {isMobileView && (
        <div style={{ background: 'white', borderBottom: '1px solid #E4EBDD', padding: '0.6rem 1rem', display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none', position: 'sticky', top: '56px', zIndex: 4000 }}>
           {[
            { id: 'inicio', label: 'Panel', icon: BarChart3 },
            { id: 'favoritos', label: 'Mi Selección', icon: Bookmark },
            { id: 'perfil', label: 'Perfil', icon: User },
            { id: 'config', label: 'Ajustes', icon: Settings }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', background: activeTab === item.id ? '#5F7D4A' : '#F0F4ED', color: activeTab === item.id ? 'white' : '#5F7D4A', fontWeight: '900', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {!isMobileView && (
          <div style={{ display: isMobileView ? 'none' : 'flex', width: '240px', background: 'white', borderRight: '1px solid #E4EBDD', padding: '2rem 1rem', flexDirection: 'column', gap: '0.6rem', position: 'sticky', top: '56px', height: 'calc(100vh - 56px)' }}>
             {[
               { id: 'inicio', label: 'Mi Panel', icon: BarChart3 },
               { id: 'favoritos', label: 'Mi Selección', icon: Bookmark },
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
      {croppingImage && (
        <ImageCropper 
          image={croppingImage.url}
          aspect={croppingImage.aspect}
          onCancel={() => {
             if (croppingImage.url.startsWith('blob:')) URL.revokeObjectURL(croppingImage.url);
             setCroppingImage(null);
          }}
          onCropComplete={async (blob) => {
            try {
              const originalUrl = croppingImage.url;
              setCroppingImage(null);
              setSaving(true);
              
              const targetId = merchant?.id;
      if (!targetId) throw new Error("No hay comercio detectado");
              const fileName = `comm_${Date.now()}.jpg`;
              
              if (croppingImage.type === 'logo') {
                setMessage({ type: 'success', text: 'Sincronizando logo comercial... 🚀' });
                const filePath = `logos/${targetId}/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('merchant_assets').upload(filePath, blob);
                if (uploadError) throw uploadError;
                
                const { data: { publicUrl } } = supabase.storage.from('merchant_assets').getPublicUrl(filePath);
                
                // Actualizar DB
                const { error: updateError } = await supabase.from('merchants').update({ 
                  logo_url: publicUrl 
                }).eq('id', targetId);
                
                if (updateError) throw updateError;
                
                setFormData((prev: any) => ({ ...prev, logo_url: publicUrl }));
                setMessage({ type: 'success', text: '¡LISTO! Logo comercial guardado ✨' });
              } else {
                setMessage({ type: 'success', text: 'Actualizando galería... 📸' });
                const filePath = `gallery/${targetId}/${fileName}`;
                const { error: uploadError } = await supabase.storage.from('merchant_assets').upload(filePath, blob);
                if (uploadError) throw uploadError;
                
                const { data: { publicUrl } } = supabase.storage.from('merchant_assets').getPublicUrl(filePath);
                
                const newGallery = [...(formData.gallery_images || [])];
                newGallery[croppingImage.index!] = publicUrl;
                
                const { error: updateError } = await supabase.from('merchants').update({ 
                  gallery_images: newGallery 
                }).eq('id', targetId);
                
                if (updateError) throw updateError;
                
                setFormData((prev: any) => ({ ...prev, gallery_images: newGallery }));
                setMessage({ type: 'success', text: '¡LISTO! Galería actualizada ✨' });
              }
              
              if (originalUrl.startsWith('blob:')) URL.revokeObjectURL(originalUrl);
              setTimeout(() => setMessage(null), 3000);
            } catch (err: any) {
              setMessage({ type: 'error', text: `Error: ${err.message}` });
              setTimeout(() => setMessage(null), 5000);
            } finally {
              setSaving(false);
            }
          }}
        />
      )}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
const isMicroMobile = false; // dummy
