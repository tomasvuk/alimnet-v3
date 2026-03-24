'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function MerchantRegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/login'; return; }

      const { error } = await supabase.from('merchants').insert([{
        owner_id: user.id,
        name: formData.name,
        bio_short: formData.bio_short,
        type: formData.types,
        categories: formData.categories,
        whatsapp: formData.whatsapp,
        instagram_url: formData.instagram_url,
        google_maps_url: formData.google_maps_url,
        validation_status: 'pending'
      }]);

      if (error) throw error;
      window.location.href = '/perfil';
    } catch (err) {
      console.error(err);
      alert('Hubo un error al registrar el comercio.');
    } finally {
      setLoading(false);
    }
  };

  const InputLabel = ({ title, sub }: any) => (
    <div style={{ marginBottom: '0.8rem' }}>
       <label style={{ display: 'block', fontWeight: '1000', color: '#2D3A20', fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</label>
       {sub && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '80px', paddingBottom: '40px' }}>
      <Header />
      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* PROGRESS INDICATOR (Minimalista) */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem', justifyContent: 'center' }}>
           {[1, 2].map(s => (
             <div key={s} style={{ height: '4px', width: '60px', borderRadius: '10px', background: s <= step ? '#657D51' : '#E4EBDD' }} />
           ))}
        </div>

        <div style={{ background: 'white', borderRadius: '50px', padding: isMobile ? '2.5rem 1.5rem' : '4rem', boxShadow: '0 30px 60px rgba(0,0,0,0.03)', border: '1px solid #E4EBDD' }}>
          
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
               <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.04em' }}>Contanos tu historia</h1>
               <p style={{ color: '#888', fontSize: '1rem', marginBottom: '3.5rem' }}>Identidad visual y categorías de tu comercio.</p>

               {/* MULTIMEDIA (Igual al Screenshot) */}
               <div style={{ display: 'flex', gap: '20px', marginBottom: '3.5rem', flexDirection: isMobile ? 'column' : 'row' }}>
                  <div style={{ width: '130px', height: '130px', background: 'white', border: '1.5px dashed #D1D8CC', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2D3A20', cursor: 'pointer' }}>
                     <Camera size={26} strokeWidth={2.5} />
                     <span style={{ fontSize: '0.7rem', fontWeight: '1000', marginTop: '10px' }}>LOGO</span>
                  </div>
                  <div style={{ flex: 1, minHeight: '130px', background: 'white', border: '1.5px dashed #D1D8CC', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2D3A20', cursor: 'pointer' }}>
                     <Upload size={26} strokeWidth={2.5} />
                     <span style={{ fontSize: '0.7rem', fontWeight: '1000', marginTop: '10px' }}>Galería (Subí hasta 3 Fotos)</span>
                  </div>
               </div>

               {/* CAMPOS BASICOS */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <InputLabel title="Nombre del comercio*" />
                    <input 
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ej: Huerta Madre" 
                      style={{ width: '100%', padding: '1.2rem', background: '#F4F1E660', border: 'none', borderRadius: '18px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
                    />
                  </div>

                  <div>
                    <InputLabel title="Descripción corta (1 línea)*" />
                    <input 
                      value={formData.bio_short} onChange={(e) => setFormData({...formData, bio_short: e.target.value})}
                      placeholder="Ej: Vegetales agroecológicos de estación producidos en Pilar." 
                      style={{ width: '100%', padding: '1.2rem', background: '#F4F1E660', border: 'none', borderRadius: '18px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
                    />
                  </div>

                  {/* IDENTIDAD COMERCIAL (Unificada como el Screen) */}
                  <div>
                    <InputLabel title="¿Qué tipo de comercio eres?" />
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
                       {availableTypes.map(t => (
                         <div 
                           key={t.id} onClick={() => toggleType(t.id)}
                           style={{ padding: '1.2rem', border: '1.5px solid', borderColor: formData.types.includes(t.id) ? '#657D51' : '#F0F4ED', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.1s', background: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}
                         >
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: formData.types.includes(t.id) ? '#657D51' : '#F0F4ED' }} />
                            <span style={{ fontWeight: '1000', fontSize: '0.95rem', color: formData.types.includes(t.id) ? '#2D3A20' : '#AAA' }}>{t.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  <div>
                     <InputLabel title="Categorías*" />
                     <div style={{ position: 'relative' }}>
                        <div 
                          style={{ width: '100%', padding: '1.2rem', background: '#F4F1E660', borderRadius: '18px', display: 'flex', flexWrap: 'wrap', gap: '8px', minHeight: '56px', cursor: 'pointer' }}
                        >
                           {formData.categories.length === 0 ? (
                             <span style={{ color: '#8A9682', fontWeight: '700' }}>Selecciona una o varias categorías...</span>
                           ) : (
                             formData.categories.map((c: string) => (
                               <div key={c} style={{ background: '#657D51', color: 'white', padding: '4px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                 {c} <X size={12} onClick={(e) => { e.stopPropagation(); toggleCategory(c); }} />
                               </div>
                             ))
                           )}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '1rem' }}>
                           {officialCategories.map(cat => (
                             <div 
                               key={cat} onClick={() => toggleCategory(cat)}
                               style={{ padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid', borderColor: formData.categories.includes(cat) ? '#657D51' : '#E4EBDD', background: formData.categories.includes(cat) ? '#F0F4ED' : 'white', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '900', color: formData.categories.includes(cat) ? '#657D51' : '#999' }}
                             >
                                {cat}
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4rem' }}>
                  <button 
                    onClick={handleNext} 
                    disabled={!formData.name || !formData.bio_short || formData.types.length === 0 || formData.categories.length === 0} 
                    style={{ padding: '1.2rem 3rem', background: '#657D51', color: 'white', border: 'none', borderRadius: '24px', fontWeight: '1000', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(101, 125, 81, 0.2)', opacity: (!formData.name || !formData.bio_short || formData.types.length === 0 || formData.categories.length === 0) ? 0.5 : 1 }}
                  >
                    Siguiente <ChevronRight size={20} />
                  </button>
               </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
               <h1 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Contacto y Redes</h1>
               <p style={{ color: '#888', fontSize: '1rem', marginBottom: '3.5rem' }}>¿Cómo quieren los clientes contactarte?</p>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <InputField label="WhatsApp Público" sub="Asegúrate del prefijo +54" value={formData.whatsapp} onChange={(v: string) => setFormData({...formData, whatsapp: v})} placeholder="+54 9 11..." />
                  <InputField label="Instagram" sub="Sin el @ o el link completo" value={formData.instagram_url} onChange={(v: string) => setFormData({...formData, instagram_url: v})} placeholder="usuario" />
                  <InputField label="Link de Google Maps" sub="El enlace de tu ubicación física" value={formData.google_maps_url} onChange={(v: string) => setFormData({...formData, google_maps_url: v})} placeholder="https://goo.gl/maps/..." />
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5rem' }}>
                  <button onClick={handleBack} style={{ padding: '1rem', color: '#2D3A20', background: 'transparent', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronLeft size={18} /> Volver</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ padding: '1.2rem 3.5rem', background: '#2D3A20', color: 'white', border: 'none', borderRadius: '24px', fontWeight: '1000', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                    {loading ? <Loader2 size={24} className="animate-spin" /> : 'FINALIZAR REGISTRO'}
                  </button>
               </div>
            </div>
          )}

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#97A58F', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <ShieldCheck size={20} strokeWidth={2.5} /> Tu información será validada oficialmente.
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const InputField = ({ label, sub, value, onChange, placeholder = '' }: any) => (
  <div>
    <div style={{ marginBottom: '0.8rem' }}>
       <label style={{ display: 'block', fontWeight: '1000', color: '#2D3A20', fontSize: '0.9rem', textTransform: 'uppercase' }}>{label}</label>
       {sub && <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{sub}</p>}
    </div>
    <input 
      type="text" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
      placeholder={placeholder}
      style={{ width: '100%', padding: '1.2rem', background: '#F4F1E660', border: 'none', borderRadius: '18px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none' }} 
    />
  </div>
);
