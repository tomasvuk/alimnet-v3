'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  Leaf, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Upload, 
  Camera, 
  MapPin, 
  Clock, 
  ShoppingBag, 
  Instagram, 
  Globe, 
  Phone,
  Store,
  ChefHat,
  UtensilsCrossed,
  X,
  Mail, 
  Loader2
} from 'lucide-react';
import ImageCropper from '@/components/ImageCropper';


// Reusando el Granjero
const FarmerIcon = ({ size = 20, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill={color}/>
  </svg>
);

const CATEGORIES = [
  { id: 'productor', label: 'Productor', icon: FarmerIcon },
  { id: 'almacen', label: 'Proveedor', icon: Store },
  { id: 'restaurante', label: 'Restaurante', icon: UtensilsCrossed },
  { id: 'chef', label: 'Chef', icon: ChefHat },
];

const CATEGORIES_OPTIONS = [
  'Agroecológico', 
  'Orgánico', 
  'Biodinámico', 
  'De Pastura', 
  'Libre de Gluten', 
  'Libre de Azúcar',
  'Vegano',
  'Vegetariano',
  'Otro'
];

export default function JoinPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    bio_short: '',
    bio_long: '',
    type: [] as string[],
    tags: [] as string[],
    locality: '',
    delivery_info: '',
    working_hours: '',
    order_instructions: '',
    whatsapp: '',
    email: '',
    instagram_url: '',
    website_url: '',
    preferred_contact: 'whatsapp'
  });

  const [logo, setLogo] = useState<{file: File, url: string} | null>(null);
  const [gallery, setGallery] = useState<{file: File, url: string}[]>([]);
  const [isDragging, setIsDragging] = useState<{ logo: boolean, gallery: boolean }>({ logo: false, gallery: false });
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [croppingImage, setCroppingImage] = useState<{ url: string, type: 'logo' | 'gallery', index?: number } | null>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);


  const FILE_SIZE_LIMIT = 2 * 1024 * 1024; // 2MB

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'gallery') => {
    const files = e.target.files;
    if (!files) return;
    
    const file = files[0];
    if (!file) return;

    if (file.size > FILE_SIZE_LIMIT) {
      setUploadError(`El archivo "${file.name}" es muy pesado. Máximo 2MB.`);
      return;
    }

    if (type === 'logo') {
       const reader = new FileReader();
       reader.onload = () => setCroppingImage({ url: reader.result as string, type: 'logo' });
       reader.readAsDataURL(file);
    } else {
       // Para galería simplemente los agregamos por ahora, o podríamos croppear uno por uno
       processFiles(Array.from(files), type);
    }
  };

  const processFiles = (files: File[], type: 'logo' | 'gallery') => {
    setUploadError(null);
    const validFiles = files.filter(file => {
      if (file.size > FILE_SIZE_LIMIT) {
        setUploadError(`El archivo "${file.name}" es muy pesado. Máximo 2MB.`);
        return false;
      }
      return true;
    });

    if (type === 'logo') {
      const file = validFiles[0];
      if (file) setLogo({ file, url: URL.createObjectURL(file) });
    } else {
      const remainingSlots = 3 - gallery.length;
      const newFiles = validFiles.slice(0, remainingSlots).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setGallery([...gallery, ...newFiles]);
    }
  };


  const uploadImage = async (file: File, path: string) => {
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const fullPath = `${path}/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('merchant_assets')
      .upload(fullPath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('merchant_assets')
      .getPublicUrl(fullPath);

    return publicUrl;
  };

  const onDragOver = (e: React.DragEvent, type: 'logo' | 'gallery') => {
    e.preventDefault();
    setIsDragging({ ...isDragging, [type]: true });
  };

  const onDragLeave = (type: 'logo' | 'gallery') => {
    setIsDragging({ ...isDragging, [type]: false });
  };

  const onDrop = (e: React.DragEvent, type: 'logo' | 'gallery') => {
    e.preventDefault();
    setIsDragging({ ...isDragging, [type]: false });
    const files = Array.from(e.dataTransfer.files);
    processFiles(files, type);
  };

  const removeImage = (index: number, type: 'logo' | 'gallery') => {
    if (type === 'logo') setLogo(null);
    else setGallery(gallery.filter((_, i) => i !== index));
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleCategory = (id: string) => {
    const current = formData.type;
    setFormData({
      ...formData,
      type: current.includes(id) ? current.filter(c => c !== id) : [...current, id]
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'Otro') {
      setShowOtherCategory(true);
    } else {
      setShowOtherCategory(false);
      if (value && !formData.tags.includes(value)) {
        setFormData({ ...formData, tags: [...formData.tags, value] });
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Subir imágenes
      let logoUrl = '';
      if (logo) {
        logoUrl = await uploadImage(logo.file, 'logos');
      }

      const galleryUrls = [];
      for (const item of gallery) {
        const url = await uploadImage(item.file, 'gallery');
        galleryUrls.push(url);
      }

      const finalTags = [...formData.tags];
      if (showOtherCategory && otherCategory) {
        finalTags.push(`OTRO: ${otherCategory}`);
      }

      // 2. Inserción en merchants
      const { data: merchantData, error: merchantError } = await supabase.from('merchants').insert([{
        name: formData.name,
        type: formData.type[0] || 'productor',
        bio_short: formData.bio_short,
        bio_long: formData.bio_long,
        tags: finalTags,
        whatsapp: formData.whatsapp,
        email: formData.email,
        instagram_url: formData.instagram_url,
        website_url: formData.website_url,
        preferred_contact_channel: formData.preferred_contact,
        order_instructions: formData.order_instructions,
        working_hours: formData.working_hours,
        delivery_info: formData.delivery_info,
        logo_url: logoUrl,
        images: galleryUrls,
        status: 'pending'
      }]).select().single();

      if (merchantError) throw merchantError;

      // 3. Crear Alerta para el Admin (Tomás) - Nueva Propuesta de Owner
      try {
        const { data: adminNotif } = await supabase.from('notifications').insert([{
          title: 'Nueva Propuesta de Comercio (Owner)',
          content: `Un nuevo dueño ha registrado su proyecto: ${formData.name}. Revisar para validación.`,
          type: 'ADMIN_ALERT',
          metadata: {
            merchant_name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            type: formData.type[0]
          }
        }]).select().single();

        if (adminNotif) {
          fetch('/api/notifications/process', {
            method: 'POST',
            body: JSON.stringify({ notificationId: adminNotif.id })
          }).catch(console.error);
        }
      } catch (err) {
        console.error('Error al crear alerta admin de propuesta:', err);
      }
      
      router.push(`/unirse/exito?name=${encodeURIComponent(formData.name)}&type=${encodeURIComponent(formData.type[0] || 'productor')}&logo=${encodeURIComponent(logoUrl)}`);
    } catch (e) {
      console.error(e);
      alert("Error al enviar el formulario. Por favor revisa los datos.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', padding: '2rem' }}>
        <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '40px', boxShadow: 'var(--shadow-xl)' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Check size={40} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '950', marginBottom: '1rem', color: 'var(--primary-dark)' }}>¡Propuesta enviada!</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Gracias por querer ser parte de la red Alimnet. Nuestro equipo de curación revisará la información y te contactará por WhatsApp para validar el perfil.
          </p>
          <button onClick={() => router.push('/explorar')} className="button button-primary" style={{ width: '100%', borderRadius: '16px' }}>Regresar al Mapa</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', flexDirection: 'column' }}>
      {/* Header Fijo */}
      <header style={{ padding: '1.5rem 2rem', background: 'white', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
        <div 
          onClick={() => router.push('/')}
          style={{ fontSize: "1.2rem", fontWeight: "950", color: "var(--primary-dark)", display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}
        >
          <Leaf size={24} fill="var(--primary)" fillOpacity={0.25} /> ALIMNET
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: '30px', height: '6px', borderRadius: '3px', background: i <= step ? 'var(--primary)' : '#eee', transition: 'all 0.3s' }}></div>
          ))}
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ maxWidth: '700px', width: '100%', background: 'white', borderRadius: '40px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ padding: '3rem' }}>
            {step === 1 && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Contanos tu historia</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Identidad visual y categorías de tu comercio.</p>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem' }}>
                  {/* LOGO UPLOAD */}
                  <div 
                    onDragOver={(e) => onDragOver(e, 'logo')}
                    onDragLeave={() => onDragLeave('logo')}
                    onDrop={(e) => onDrop(e, 'logo')}
                    onClick={() => logoInputRef.current?.click()}

                    style={{ 
                      width: '120px', height: '120px', 
                      background: logo ? 'white' : (isDragging.logo ? '#F0F4ED' : '#F8F9F5'), 
                      border: isDragging.logo ? '2px solid var(--primary)' : '2px dashed var(--border)', 
                      borderRadius: '32px', display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', justifyContent: 'center', cursor: 'pointer', 
                      color: 'var(--text-secondary)', position: 'relative', overflow: 'hidden',
                      transition: 'all 0.2s'
                    }}
                  >
                    {logo ? (
                      <>
                        <img src={logo.url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div onClick={(e) => { e.stopPropagation(); removeImage(0, 'logo'); }} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '4px' }}><X size={12} /></div>
                      </>
                    ) : (
                      <>
                        <Camera size={24} />
                        <span style={{ fontSize: '0.7rem', fontWeight: '800', marginTop: '8px' }}>LOGO</span>
                      </>
                    )}
                  </div>
                  <input 
                    ref={logoInputRef}
                    type="file" 
                    style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', zIndex: -1 }}
                    accept="image/*" 
                    onChange={(e) => {
                      console.log("Onboarding Logo triggered");
                      handleFileSelect(e, 'logo');
                      e.target.value = '';
                    }} 
                  />


                  {/* GALLERY UPLOAD */}
                  <div 
                    onDragOver={(e) => onDragOver(e, 'gallery')}
                    onDragLeave={() => onDragLeave('gallery')}
                    onDrop={(e) => onDrop(e, 'gallery')}
                    onClick={() => gallery.length < 3 && galleryInputRef.current?.click()}

                    style={{ 
                      flex: 1, minHeight: '120px', 
                      background: isDragging.gallery ? '#F0F4ED' : '#F8F9F5', 
                      border: isDragging.gallery ? '2px solid var(--primary)' : '2px dashed var(--border)', 
                      borderRadius: '32px', display: 'flex', flexWrap: 'wrap', 
                      gap: '10px', padding: '10px', alignItems: 'center', 
                      justifyContent: gallery.length === 0 ? 'center' : 'flex-start',
                      cursor: gallery.length < 3 ? 'pointer' : 'default',
                      transition: 'all 0.2s'
                    }}
                  >
                    {gallery.length === 0 ? (
                      <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <Upload size={24} style={{ margin: '0 auto' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: '800', marginTop: '8px', display: 'block' }}>Galería (Subí hasta 3 Fotos)</span>
                      </div>
                    ) : (
                      <>
                        {gallery.map((img, idx) => (
                          <div key={idx} style={{ width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                            <img src={img.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div onClick={(e) => { e.stopPropagation(); removeImage(idx, 'gallery'); }} style={{ position: 'absolute', top: '3px', right: '3px', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '2px' }}><X size={10} /></div>
                          </div>
                        ))}
                        {gallery.length < 3 && (
                          <div style={{ width: '80px', height: '80px', border: '1px dashed var(--border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--border)' }}>
                            <Upload size={20} />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <input 
                    ref={galleryInputRef}
                    type="file" 
                    style={{ position: 'absolute', opacity: 0, width: '1px', height: '1px', zIndex: -1 }}
                    multiple 
                    accept="image/*" 
                    onChange={(e) => {
                      console.log("Onboarding Gallery triggered");
                      handleFileSelect(e, 'gallery');
                      e.target.value = '';
                    }} 
                  />

                </div>

                {uploadError && (
                  <div style={{ padding: '1rem', background: '#FFF5F5', color: '#C53030', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <X size={16} /> {uploadError}
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Nombre del Comercio*</label>
                  <input 
                    type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ej: Huerta Madre" 
                    style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)', fontSize: '1rem', outline: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Descripción Corta (1 Línea)*</label>
                  <input 
                    type="text" value={formData.bio_short} onChange={(e) => setFormData({...formData, bio_short: e.target.value})}
                    placeholder="Ej: Vegetales agroecológicos de estación producidos en Pilar." 
                    style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)', fontSize: '0.95rem' }}
                  />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>¿Qué tipo de comercio eres?</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat.id} onClick={() => toggleCategory(cat.id)}
                        style={{ padding: '1rem', borderRadius: '16px', border: formData.type.includes(cat.id) ? '2px solid var(--primary)' : '1px solid var(--border)', background: formData.type.includes(cat.id) ? '#F0F4ED' : 'white', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '0.2s' }}
                      >
                        <cat.icon size={18} color={formData.type.includes(cat.id) ? "var(--primary)" : "#999"} />
                        <span style={{ fontWeight: '800', color: formData.type.includes(cat.id) ? 'var(--primary-dark)' : 'var(--text-secondary)', fontSize: '0.9rem' }}>{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Categorías*</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <select 
                      onChange={handleCategoryChange}
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)', fontSize: '0.95rem', outline: 'none', cursor: 'pointer' }}
                    >
                      <option value="">Selecciona una categoría...</option>
                      {CATEGORIES_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    {showOtherCategory && (
                      <input 
                        type="text" 
                        value={otherCategory}
                        onChange={(e) => setOtherCategory(e.target.value)}
                        placeholder="Escribe tu categoría..."
                        style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--primary)', background: 'white', fontSize: '0.95rem', outline: 'none', animation: 'fadeIn 0.3s ease-out' }}
                      />
                    )}

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
                      {formData.tags.map(tag => (
                        <span 
                          key={tag} 
                          onClick={() => removeTag(tag)}
                          style={{ padding: '0.5rem 1rem', borderRadius: '20px', background: 'var(--primary-dark)', color: 'white', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          {tag} <X size={12} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Logística y Zonas</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>¿Dónde te encontramos y cómo entregas?</p>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>UBICACIÓN PRINCIPAL (PARTIDO/LOCALIDAD)*</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" value={formData.locality} onChange={(e) => setFormData({...formData, locality: e.target.value})}
                      placeholder="Ej: Tigre, Buenos Aires" 
                      style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)' }}
                    />
                    <MapPin size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>ZONAS DE REPARTO / ENVÍO</label>
                  <textarea 
                    value={formData.delivery_info} onChange={(e) => setFormData({...formData, delivery_info: e.target.value})}
                    placeholder="Ej: Repartimos en Zona Norte (San Isidro, Tigre) y CABA los Martes y Jueves." 
                    style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)', height: '100px', resize: 'none' }}
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.8rem' }}>DÍAS Y HORARIOS</label>
                  <div style={{ padding: '1.5rem', background: '#F8F9F5', borderRadius: '24px', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                      <Clock size={18} color="var(--primary)" />
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--primary-dark)' }}>Formato sugerido:</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                      Lun a Vier de 9 a 14hs y 17 a 20hs. Sábados de 8 a 13hs.
                    </p>
                    <textarea 
                      value={formData.working_hours} onChange={(e) => setFormData({...formData, working_hours: e.target.value})}
                      placeholder="Completá aquí tus horarios..."
                      style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid white', background: 'white', minHeight: '80px', outline: 'none' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>Ventas y Contacto</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>¿Cómo quieren que te compren?</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>WHATSAPP DE VENTAS*</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        placeholder="Ej: 1122334455" 
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)' }}
                      />
                      <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>EMAIL DE CONTACTO*</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Ej: contacto@huerta.com" 
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)' }}
                      />
                      <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>INSTAGRAM</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" value={formData.instagram_url} onChange={(e) => setFormData({...formData, instagram_url: e.target.value})}
                        placeholder="Usuario" 
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)' }}
                      />
                      <Instagram size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '900', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>WEB / LINKTREE</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" value={formData.website_url} onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                        placeholder="URL" 
                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', background: 'var(--background)' }}
                      />
                      <Globe size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '1rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '1rem' }}>
                    ¿Cómo hacer tu pedido?
                  </label>
                  <div style={{ background: 'var(--primary-dark)', padding: '2rem', borderRadius: '24px', color: 'white' }}>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '1rem', fontWeight: '800', textTransform: 'uppercase', color: '#F4F1E6' }}>Instrucciones para la comunidad</p>
                    <textarea 
                      value={formData.order_instructions} onChange={(e) => setFormData({...formData, order_instructions: e.target.value})}
                      placeholder="Ej: Mandanos un WhatsApp con tu zona y te enviamos el catálogo actualizado..."
                      style={{ 
                        width: '100%', padding: '1rem', borderRadius: '16px', border: 'none', 
                        background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '1rem', 
                        minHeight: '120px', outline: 'none' 
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer del Formulario */}
          <div style={{ padding: '2rem 3rem', background: '#F8F9F5', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {step > 1 ? (
              <button onClick={handleBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                <ArrowLeft size={18} /> Anterior
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <button 
                onClick={handleNext} 
                className="button button-primary" 
                style={{ borderRadius: '16px', padding: '0.8rem 2.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                disabled={step === 1 && !formData.name}
              >
                Siguiente <ArrowRight size={18} />
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                className="button button-primary" 
                style={{ borderRadius: '16px', padding: '0.8rem 2.5rem' }}
                disabled={loading || !formData.whatsapp}
              >
                {loading ? 'Enviando...' : 'Finalizar Registro'}
              </button>
            )}
          </div>

        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea::placeholder {
          color: rgba(244, 241, 230, 0.6) !important;
        }
      `}</style>
      {croppingImage && (
        <ImageCropper 
          image={croppingImage.url}
          aspect={1}
          onCancel={() => setCroppingImage(null)}
          onCropComplete={(blob) => {
            const file = new File([blob], "logo.jpg", { type: "image/jpeg" });
            setLogo({ file, url: URL.createObjectURL(file) });
            setCroppingImage(null);
          }}
        />
      )}
    </div>
  );
}

