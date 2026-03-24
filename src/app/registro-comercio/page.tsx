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
  Upload
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function MerchantRegistrationPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Categorías y Tipos (Sincronizados con Perfil)
  const officialCategories = [
    'Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 
    'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'
  ];

  const availableTypes = [
    { id: 'Productor', label: 'Productor', sub: 'Producción primaria' },
    { id: 'Abastecedor', label: 'Abastecedor', sub: 'Almacén, dietética, proveedor, distribución' },
    { id: 'Restaurante', label: 'Restaurante', sub: 'Gastronomía con local' },
    { id: 'Chef', label: 'Chef', sub: 'Servicios de cocina' }
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
      if (!user) throw new Error('No user');

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
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* PROGRESS BAR */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem', justifyContent: 'center' }}>
           {[1, 2, 3].map(s => (
             <div key={s} style={{ height: '4px', width: '60px', borderRadius: '10px', background: s <= step ? '#5F7D4A' : '#E4EBDD' }} />
           ))}
        </div>

        <div style={{ background: 'white', borderRadius: '40px', padding: isMobile ? '2rem 1.5rem' : '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #E4EBDD' }}>
          
          {step === 1 && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <h1 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>Contanos tu historia</h1>
               <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '3rem' }}>Identidad visual y categorías de tu comercio.</p>

               <div style={{ display: 'flex', gap: '20px', marginBottom: '3rem', flexDirection: isMobile ? 'column' : 'row' }}>
                  <div style={{ width: '120px', height: '120px', background: '#f8f9f5', border: '2px dashed #E4EBDD', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#A8C3A2', cursor: 'pointer' }}>
                     <Camera size={24} />
                     <span style={{ fontSize: '0.65rem', fontWeight: '1000', marginTop: '8px' }}>LOGO</span>
                  </div>
                  <div style={{ flex: 1, minHeight: '120px', background: '#f8f9f5', border: '2px dashed #E4EBDD', borderRadius: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#A8C3A2', cursor: 'pointer' }}>
                     <Upload size={24} />
                     <span style={{ fontSize: '0.65rem', fontWeight: '1000', marginTop: '8px' }}>GALERÍA (HASTA 3 FOTOS)</span>
                  </div>
               </div>

               <InputLabel title="Nombre del comercio*" />
               <input 
                 value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                 placeholder="Ej: Huerta Madre" 
                 style={{ width: '100%', padding: '1.2rem', background: '#F4F1E680', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none', marginBottom: '2.5rem' }} 
               />

               <InputLabel title="Descripción corta (1 línea)*" />
               <input 
                 value={formData.bio_short} onChange={(e) => setFormData({...formData, bio_short: e.target.value})}
                 placeholder="Ej: Vegetales agroecológicos de estación producidos en Pilar." 
                 style={{ width: '100%', padding: '1.2rem', background: '#F4F1E680', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none', marginBottom: '2rem' }} 
               />

               <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                  <button onClick={handleNext} disabled={!formData.name || !formData.bio_short} style={{ padding: '1.2rem 2.5rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '1000', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: (!formData.name || !formData.bio_short) ? 0.5 : 1 }}>
                    Siguiente <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <h1 style={{ fontSize: '2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '2.5rem', letterSpacing: '-0.03em' }}>ADN Alimnet</h1>

               <InputLabel title="¿Qué tipo de comercio eres?" />
               <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '3rem' }}>
                  {availableTypes.map(t => (
                    <div 
                      key={t.id} onClick={() => toggleType(t.id)}
                      style={{ padding: '1.2rem', border: '2.5px solid', borderColor: formData.types.includes(t.id) ? '#5F7D4A' : '#F0F4ED', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.1s', background: formData.types.includes(t.id) ? '#F0F4ED' : 'white' }}
                    >
                       <span style={{ fontWeight: '1000', fontSize: '1rem', color: formData.types.includes(t.id) ? '#2D3A20' : '#888' }}>{t.label}</span>
                       <p style={{ fontSize: '0.7rem', color: '#AAA', marginTop: '0.2rem' }}>{t.sub}</p>
                    </div>
                  ))}
               </div>

               <InputLabel title="Categorías principales" />
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {officialCategories.map(cat => (
                    <div 
                      key={cat} onClick={() => toggleCategory(cat)}
                      style={{ padding: '0.8rem 1.4rem', borderRadius: '14px', border: '1.5px solid', borderColor: formData.categories.includes(cat) ? '#5F7D4A' : '#f0f0f0', background: formData.categories.includes(cat) ? '#F0F4ED' : 'white', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '900', color: formData.categories.includes(cat) ? '#5F7D4A' : '#999' }}
                    >
                       {cat}
                    </div>
                  ))}
               </div>

               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4rem' }}>
                  <button onClick={handleBack} style={{ padding: '1rem', color: '#2D3A20', background: 'transparent', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronLeft size={18} /> Volver</button>
                  <button onClick={handleNext} disabled={formData.types.length === 0 || formData.categories.length === 0} style={{ padding: '1.2rem 2.5rem', background: '#5F7D4A', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '1000', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', opacity: (formData.types.length === 0 || formData.categories.length === 0) ? 0.5 : 1 }}>
                    Siguiente <ChevronRight size={18} />
                  </button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
               <h1 style={{ fontSize: '2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '2.5rem', letterSpacing: '-0.03em' }}>Contacto y Redes</h1>

               <InputLabel title="WhatsApp Público" sub="Donde los clientes te escribirán" />
               <input 
                 value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                 placeholder="+54 9 11..." 
                 style={{ width: '100%', padding: '1.2rem', background: '#F4F1E680', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none', marginBottom: '2rem' }} 
               />

               <InputLabel title="Instagram" />
               <input 
                 value={formData.instagram_url} onChange={(e) => setFormData({...formData, instagram_url: e.target.value})}
                 placeholder="@usuario" 
                 style={{ width: '100%', padding: '1.2rem', background: '#F4F1E680', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none', marginBottom: '2rem' }} 
               />

               <InputLabel title="Ubicación Google Maps" sub="El enlace que aparece al tocar 'Cómo llegar'" />
               <input 
                 value={formData.google_maps_url} onChange={(e) => setFormData({...formData, google_maps_url: e.target.value})}
                 placeholder="https://goo.gl/maps/..." 
                 style={{ width: '100%', padding: '1.2rem', background: '#F4F1E680', border: 'none', borderRadius: '16px', fontSize: '1rem', fontWeight: '700', color: '#2D3A20', outline: 'none', marginBottom: '2.5rem' }} 
               />

               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <button onClick={handleBack} style={{ padding: '1rem', color: '#2D3A20', background: 'transparent', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}><ChevronLeft size={18} /> Volver</button>
                  <button onClick={handleSubmit} disabled={loading} style={{ padding: '1.2rem 3rem', background: '#2D3A20', color: 'white', border: 'none', borderRadius: '20px', fontWeight: '1000', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    {loading ? <Loader2 size={20} className="animate-spin" /> : 'FINALIZAR REGISTRO'}
                  </button>
               </div>
            </div>
          )}

        </div>
        
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#A8C3A2', fontWeight: '950', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <ShieldCheck size={16} /> Tu información será validada por el equipo de Alimnet.
          </p>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
