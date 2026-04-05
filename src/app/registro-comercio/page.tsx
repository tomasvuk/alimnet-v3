'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRight, 
  ChevronLeft, 
  Camera, 
  Leaf, 
  ShieldCheck, 
  MapPin, 
  Instagram, 
  Send, 
  Check, 
  Loader2,
  X,
  AlertCircle,
  Plus,
  Upload,
  Globe
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import ImageCropper from '@/components/ImageCropper';

export default function MerchantRegistrationPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Estados para Imágenes
  const [logo, setLogo] = useState<any>(null);
  const [gallery, setGallery] = useState<any[]>([]);
  const [croppingImage, setCroppingImage] = useState<{ url: string, type: 'logo' | 'gallery', aspect: number, index?: number } | null>(null);

  // Categorías y Tipos (Sincronizados)
  const officialCategories = [
    'Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 
    'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'
  ];

  const availableTypes = [
    { id: 'Productor', label: 'Productor', sub: 'Producción primaria' },
    { id: 'Abastecedor', label: 'Abastecedor', sub: 'Distribución, almacén' },
    { id: 'Restaurante', label: 'Restaurante', sub: 'Gastronomía' },
    { id: 'Chef', label: 'Chef', sub: 'Cocina personal' }
  ];

  const [formData, setFormData] = useState<any>({
    name: '',
    bio_short: '',
    types: [],
    categories: [],
    whatsapp: '',
    instagram_url: '',
    google_maps_url: '',
    website_url: '',
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleType = (id: string) => {
    const current = formData.types;
    const next = current.includes(id) ? current.filter((t: string) => t !== id) : [...current, id];
    setFormData({ ...formData, types: next });
  };

  const toggleCategory = (cat: string) => {
    const current = formData.categories;
    const next = current.includes(cat) ? current.filter((c: string) => c !== cat) : [...current, cat];
    setFormData({ ...formData, categories: next });
  };

  const parseGoogleMapsUrl = (url: string) => {
    if (!url) return null;
    // Regex para capturar @-34.12345,-58.12345 o !3d-34.12345!4d-58.12345
    const regex1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regex2 = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;
    
    const match1 = url.match(regex1);
    const match2 = url.match(regex2);
    
    if (match1) return { lat: parseFloat(match1[1]), lng: parseFloat(match1[2]) };
    if (match2) return { lat: parseFloat(match2[1]), lng: parseFloat(match2[2]) };
    return null;
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    const url = URL.createObjectURL(file);
    setCroppingImage({ url, type, aspect: type === 'logo' ? 1 : 4/3, index: type === 'gallery' ? gallery.length : undefined });
  };

  const onCropComplete = async (blob: Blob) => {
    if (!croppingImage) return;
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No auth');

      const fileName = `${Date.now()}-${croppingImage.type}.jpg`;
      const bucket = 'merchant_assets';
      const folder = croppingImage.type === 'logo' ? 'logos' : 'gallery';
      const filePath = `${folder}/${user.id}/${fileName}`;
      
      const { data, error } = await supabase.storage.from(bucket).upload(filePath, blob, { contentType: 'image/jpeg' });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (croppingImage.type === 'logo') {
        setLogo(publicUrl);
        setFormData((prev: any) => ({ ...prev, logo_url: publicUrl }));
      } else {
        const newGallery = [...gallery, publicUrl];
        setGallery(newGallery);
        setFormData((prev: any) => ({ ...prev, gallery_images: newGallery }));
      }
    } catch (err) {
      console.error(err);
      setUploadError('Error al subir imagen. Reintentá.');
    } finally {
      setSaving(false);
      setCroppingImage(null);
    }
  };

  const removeImage = (index: number, type: 'logo' | 'gallery') => {
    if (type === 'logo') {
      setLogo(null);
      setFormData((prev: any) => ({ ...prev, logo_url: null }));
    } else {
      const newGallery = gallery.filter((_, i) => i !== index);
      setGallery(newGallery);
      setFormData((prev: any) => ({ ...prev, gallery_images: newGallery }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      // 1. Crear el comercio
      const { data: merchantData, error: merchantError } = await supabase.from('merchants').insert([{
        owner_id: user.id,
        name: formData.name,
        bio_short: formData.bio_short,
        type: formData.types,
        categories: formData.categories,
        whatsapp: formData.whatsapp,
        instagram_url: formData.instagram_url,
        google_maps_url: formData.google_maps_url,
        website_url: formData.website_url,
        logo_url: logo, // AGREGADO
        gallery_images: gallery, // AGREGADO
        status: 'pending'
      }]).select().single();

      if (merchantError) throw merchantError;

      // 3. Crear Alerta para el Admin (Tomás)
      try {
        const { data: adminNotif } = await supabase.from('notifications').insert([{
          user_id: user.id, // El que lo crea
          title: 'Nuevo Comercio Registrado (Dueño)',
          content: `${user.email} ha registrado un nuevo comercio: ${formData.name}.`,
          type: 'ADMIN_ALERT',
          metadata: {
            merchant_name: formData.name,
            categories: formData.categories.join(', '),
            type: formData.types.join(', '),
            email: user.email
          }
        }]).select().single();

        if (adminNotif) {
          // Disparar proceso de mail en background
          fetch('/api/notifications/process', {
            method: 'POST',
            body: JSON.stringify({ notificationId: adminNotif.id })
          }).catch(console.error);
        }
      } catch (err) {
        console.error('Error al crear alerta admin:', err);
      }

      // 2. Si hay link de Google Maps, intentar crear la ubicación
      const coords = parseGoogleMapsUrl(formData.google_maps_url);
      if (coords && merchantData) {
        await supabase.from('locations').insert([{
          merchant_id: merchantData.id,
          location_type: 'fixed',
          lat: coords.lat,
          lng: coords.lng,
          is_primary: true,
          locality: 'Detectada via link',
          country: 'Argentina'
        }]);
      }

      router.push('/perfil');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al registrar el comercio.');
    } finally {
      setLoading(false);
    }
  };

  const InputLabel = ({ title, sub }: any) => (
    <div style={{ marginBottom: '0.6rem' }}>
       <label style={{ display: 'block', fontWeight: '1000', color: '#2D3A20', fontSize: '0.8rem', textTransform: 'uppercase' }}>{title}</label>
       {sub && <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.1rem' }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '70px', paddingBottom: '30px' }}>
      <Header />
      <div style={{ maxWidth: '650px', margin: '0 auto', padding: '0 1.2rem' }}>
        
        {/* PROGRESS INDICATOR (Compacto) */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '2rem', justifyContent: 'center' }}>
           {[1, 2].map(s => (
             <div key={s} style={{ height: '3px', width: '40px', borderRadius: '10px', background: s <= step ? '#657D51' : '#E4EBDD' }} />
           ))}
        </div>

        <div style={{ background: 'white', borderRadius: '40px', padding: isMobile ? '2rem 1.2rem' : '3rem', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #E4EBDD' }}>
          
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
               <div style={{ position: 'relative' }}>
                  <h1 style={{ fontSize: isMobile ? '1.8rem' : '2.1rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.4rem', letterSpacing: '-0.04em', textAlign: 'center' }}>Contanos tu historia</h1>
                  <div style={{ position: 'absolute', top: '-20px', right: '0', background: '#FFD700', color: '#000', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '10px', fontWeight: '1000', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                     v4.0.0-REGISTRO-FIX 🚀
                  </div>
               </div>
               <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2.5rem', textAlign: 'center' }}>Identidad visual y categorías de tu comercio.</p>

               {/* MULTIMEDIA (INTERACTIVO CON OVERLAY) */}
               <div style={{ display: 'flex', gap: '15px', marginBottom: '2.5rem', flexDirection: isMobile ? 'column' : 'row' }}>
                  
                  {/* LOGO BOX */}
                  <div style={{ 
                     width: '110px', height: '110px', background: logo ? 'white' : 'white', 
                     border: '1.5px dashed #D1D8CC', borderRadius: '30px', 
                     display: 'flex', flexDirection: 'column', alignItems: 'center', 
                     justifyContent: 'center', color: '#2D3A20', cursor: 'pointer',
                     position: 'relative', overflow: 'hidden'
                  }}>
                     {logo ? (
                        <>
                          <img src={logo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div onClick={(e) => { e.stopPropagation(); removeImage(0, 'logo'); }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '4px', zIndex: 20 }}><X size={12} /></div>
                        </>
                     ) : (
                        <>
                          <Camera size={22} strokeWidth={2.5} />
                          <span style={{ fontSize: '0.6rem', fontWeight: '1000', marginTop: '8px' }}>LOGO</span>
                        </>
                     )}
                     <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, 'logo')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
                  </div>

                  {/* GALLERY BOX */}
                  <div style={{ 
                     flex: 1, minHeight: '110px', background: 'white', 
                     border: '1.5px dashed #D1D8CC', borderRadius: '30px', 
                     display: 'flex', flexWrap: 'wrap', gap: '10px', 
                     padding: '10px', alignItems: 'center', 
                     justifyContent: gallery.length === 0 ? 'center' : 'flex-start',
                     color: '#2D3A20', cursor: 'pointer', position: 'relative'
                  }}>
                     {gallery.length === 0 ? (
                        <>
                          <Upload size={22} strokeWidth={2.5} />
                          <span style={{ fontSize: '0.6rem', fontWeight: '1000', marginTop: '8px' }}>Galería (Subí hasta 3 Fotos)</span>
                        </>
                     ) : (
                        <>
                          {gallery.map((img, idx) => (
                             <div key={idx} style={{ width: '70px', height: '70px', borderRadius: '15px', overflow: 'hidden', position: 'relative' }}>
                                <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div onClick={(e) => { e.stopPropagation(); removeImage(idx, 'gallery'); }} style={{ position: 'absolute', top: '3px', right: '3px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '2px', zIndex: 20 }}><X size={10} /></div>
                             </div>
                          ))}
                          {gallery.length < 3 && (
                             <div style={{ width: '70px', height: '70px', border: '1px dashed #D1D8CC', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={20} color="#D1D8CC" />
                             </div>
                          )}
                        </>
                     )}
                     {gallery.length < 3 && (
                        <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e, 'gallery')} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 10 }} />
                     )}
                  </div>
               </div>

               {/* VISIBILIDAD DE ERRORES */}
               {uploadError && (
                 <div style={{ marginBottom: '2rem', padding: '1rem', background: '#FFF2F2', border: '1px solid #D32F2F', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '10px', color: '#D32F2F', fontSize: '0.85rem', fontWeight: '850', animation: 'fadeIn 0.3s ease-out' }}>
                    <AlertCircle size={18} />
                    {uploadError}
                 </div>
               )}

               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <InputLabel title="Nombre del comercio*" />
                    <input 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej: Huerta Madre" 
                      style={{ width: '100%', padding: '1rem', background: '#F4F1E660', border: 'none', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
                    />
                  </div>

                  <div>
                    <InputLabel title="Descripción corta (1 línea)*" />
                    <input 
                      value={formData.bio_short} onChange={(e) => setFormData({...formData, bio_short: e.target.value})}
                      placeholder="Ej: Vegetales agroecológicos de estación." 
                      style={{ width: '100%', padding: '1rem', background: '#F4F1E660', border: 'none', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
                    />
                  </div>

                  <div>
                    <InputLabel title="¿Qué comercio eres?" />
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                       {availableTypes.map(t => (
                         <div 
                           key={t.id} onClick={() => toggleType(t.id)}
                           style={{ padding: '1rem', border: '1.5px solid', borderColor: formData.types.includes(t.id) ? '#657D51' : '#F0F4ED', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.1s', background: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}
                         >
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: formData.types.includes(t.id) ? '#657D51' : '#F0F4ED' }} />
                            <span style={{ fontWeight: '1000', fontSize: '0.85rem', color: formData.types.includes(t.id) ? '#2D3A20' : '#AAA' }}>{t.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div>
                     <InputLabel title="Categorías*" />
                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                           {officialCategories.map(cat => (
                             <div 
                               key={cat} onClick={() => toggleCategory(cat)}
                               style={{ padding: '0.5rem 0.9rem', borderRadius: '10px', border: '1px solid', borderColor: formData.categories.includes(cat) ? '#657D51' : '#E4EBDD', background: formData.categories.includes(cat) ? '#F0F4ED' : 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '900', color: formData.categories.includes(cat) ? '#657D51' : '#999' }}
                             >
                                {cat}
                             </div>
                           ))}
                     </div>
                  </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                  <button 
                    onClick={handleNext} 
                    disabled={!formData.name || !formData.bio_short || formData.types.length === 0 || formData.categories.length === 0} 
                    style={{ padding: '1rem 2.5rem', background: '#657D51', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '1000', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(101, 125, 81, 0.15)', opacity: (!formData.name || !formData.bio_short || formData.types.length === 0 || formData.categories.length === 0) ? 0.5 : 1 }}
                  >
                    Siguiente <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
               <h1 style={{ fontSize: '1.8rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.3rem', letterSpacing: '-0.03em', textAlign: 'center' }}>Contacto y Redes</h1>
               <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2.5rem', textAlign: 'center' }}>¿Cómo quieren los clientes contactarte?</p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <InputField label="WhatsApp Público" sub="Con prefijo +54" value={formData.whatsapp} onChange={(v: string) => setFormData({...formData, whatsapp: v})} placeholder="+54 9 11..." />
                  <InputField label="Instagram" sub="Sin el @ o link completo" value={formData.instagram_url} onChange={(v: string) => setFormData({...formData, instagram_url: v})} placeholder="usuario" />
                  <InputField label="Web / Linktree" sub="Tu portal oficial o catálogo" value={formData.website_url} onChange={(v: string) => setFormData({...formData, website_url: v})} placeholder="https://..." />
                  <InputField label="Google Maps" sub="Link de tu ubicación" value={formData.google_maps_url} onChange={(v: string) => setFormData({...formData, google_maps_url: v})} placeholder="https://goo.gl/maps/..." />
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
                  <button onClick={handleBack} style={{ padding: '0.8rem', color: '#2D3A20', background: 'transparent', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}><ChevronLeft size={16} /> Volver</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ padding: '1rem 2.5rem', background: '#2D3A20', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '1000', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
                    {loading ? <Loader2 size={20} className="animate-spin" /> : 'FINALIZAR'}
                  </button>
               </div>
            </div>
          )}

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#A8C3A2', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={18} strokeWidth={2.5} /> Validación oficial Alimnet garantizada.
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      
      {/* EDITOR DE IMÁGENES */}
      {croppingImage && (
        <ImageCropper
          image={croppingImage.url}
          aspect={croppingImage.aspect}
          onCropComplete={onCropComplete}
          onCancel={() => setCroppingImage(null)}
        />
      )}

      {/* OVERLAY DE CARGA */}
      {(saving || loading) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
           <Loader2 size={40} className="animate-spin" color="#657D51" />
           <p style={{ marginTop: '15px', fontWeight: '1000', color: '#2D3A20' }}>Procesando {saving ? 'Imagen' : 'Registro'}... ⏳</p>
        </div>
      )}
    </div>
  );
}

const InputField = ({ label, sub, value, onChange, placeholder = '' }: any) => (
  <div>
    <div style={{ marginBottom: '0.5rem' }}>
       <label style={{ display: 'block', fontWeight: '1000', color: '#2D3A20', fontSize: '0.75rem', textTransform: 'uppercase' }}>{label}</label>
       {sub && <p style={{ fontSize: '0.65rem', color: '#AAA', marginTop: '0.1rem' }}>{sub}</p>}
    </div>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
      style={{ width: '100%', padding: '0.9rem', background: '#F4F1E660', border: 'none', borderRadius: '14px', fontSize: '0.85rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
    />
  </div>
);
