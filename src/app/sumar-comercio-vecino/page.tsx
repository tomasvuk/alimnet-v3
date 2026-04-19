'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  MapPin, 
  Instagram, 
  Send, 
  Check, 
  Loader2,
  Plus,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import AlimnetLoader from '@/components/AlimnetLoader';

function NeighborRecommendationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);


  useEffect(() => {
    // Si venimos de Explorar con un comercio sugerido
    const name = searchParams.get('name');
    const address = searchParams.get('address');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (name) {
      setFormData(prev => ({
        ...prev,
        name: name || prev.name,
        address: address || prev.address,
        lat: lat ? parseFloat(lat) : prev.lat,
        lng: lng ? parseFloat(lng) : prev.lng
      }));
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    name: '',
    contact: '', // WhatsApp o Instagram
    locality: '',
    address: '',
    type: '', // Rubro
    lat: 0,
    lng: 0,
    reason: '', // ¿Por qué lo recomendas?
    delivery_info: '', // Área de entrega / Logística
  });

  const [confirmNoContact, setConfirmNoContact] = useState(false);

  // --- INTEGRACIÓN GOOGLE MAPS AUTOCOMPLETE ---
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof window === 'undefined') return;
      if (window.google) {
        initAutocomplete();
        return;
      }

      if ((window as any).isGoogleMapsLoading) return;
      (window as any).isGoogleMapsLoading = true;

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initAutocomplete();
      document.head.appendChild(script);
    };

    const initAutocomplete = () => {
      const input = document.getElementById('merchant-name-input') as HTMLInputElement;
      if (!input || !window.google) return;

      const autocomplete = new window.google.maps.places.Autocomplete(input, {
        types: ['establishment'],
        componentRestrictions: { country: 'ar' },
        fields: ['formatted_address', 'geometry', 'name', 'address_components']
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        // Extraer localidad de address_components
        const locality = place.address_components?.find((c: any) => c.types.includes('locality'))?.long_name || '';
        
        setFormData(prev => ({
          ...prev,
          name: place.name || prev.name,
          address: place.formatted_address || '',
          locality: locality,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }));
      });
    };

    loadGoogleMaps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login?redirect=/sumar-comercio-vecino');
        return;
      }

      // El campo 'contact' lo mapeamos dinámicamente si parece un Instagram (lleva @ o es una palabra)
      const isInstagram = formData.contact.includes('@') || /[a-zA-Z]/.test(formData.contact);
      
      console.log("Iniciando inserción de comercio recomendado por:", user.email);

      const { data: merchantData, error } = await supabase.from('merchants').insert([{
        name: formData.name,
        type: formData.type || 'comunidad',
        instagram_url: isInstagram ? formData.contact.replace('@', '') : null,
        whatsapp: !isInstagram ? formData.contact.replace(/\s/g, '') : null,
        status: 'pending',
        created_by: user.id,
        created_by_type: 'neighborhood_recommendation',
        bio_short: formData.reason,
        delivery_info: formData.delivery_info,
        claimed: false
      }]).select().single();

      if (error) {
        console.error("Error inserting merchant:", error);
        throw new Error(`Error en base de datos: ${error.message}`);
      }

      console.log("Comercio insertado con éxito:", merchantData.id);

      // 3. Crear Alerta para el Admin (Tomás)
      try {
        const { data: adminNotif, error: notifError } = await supabase.from('notifications').insert([{
          user_id: user.id,
          title: 'Nueva Recomendación de Vecino',
          content: `${user.email} ha recomendado un comercio: ${formData.name}.`,
          type: 'ADMIN_ALERT',
          metadata: {
            merchant_name: formData.name,
            locality: formData.locality,
            category: formData.type,
            reason: formData.reason,
            delivery_info: formData.delivery_info,
            email: user.email
          }
        }]).select().single();

        if (notifError) console.warn("Error creating notification:", notifError);

        if (adminNotif) {
          fetch('/api/notifications/process', {
            method: 'POST',
            body: JSON.stringify({ notificationId: adminNotif.id })
          }).catch(console.error);
        }
      } catch (err) {
        console.error('Error al crear alerta admin:', err);
      }

      // Insertar locación si tenemos datos
      if (merchantData && (formData.lat !== 0 || formData.address)) {
        const { error: locError } = await supabase.from('locations').insert([{
          merchant_id: merchantData.id,
          address: formData.address,
          locality: formData.locality,
          lat: formData.lat || -34.6,
          lng: formData.lng || -58.4,
          location_type: 'fixed',
          is_primary: true
        }]);
        if (locError) console.warn("Error inserting location:", locError);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/explorar');
      }, 3000);

    } catch (err: any) {
      console.error("Error global en recomendación:", err);
      setAlert({ 
        type: 'error', 
        message: err.message || 'Error al enviar la recomendación. Por favor, reintentá luego.' 
      });
    } finally {
      setLoading(false);
    }

  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <Header />
        <div style={{ maxWidth: '500px', width: '100%', textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '80px', height: '80px', background: '#5F7D4A', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <Check size={40} strokeWidth={3} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '1rem' }}>¡Gracias por sumar!</h1>
          <p style={{ color: '#888', fontWeight: '600', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Tu recomendación está en proceso de revisión. En breve aparecerá en el mapa para ayudar a otros vecinos.
          </p>
          <div style={{ fontSize: '0.8rem', color: '#5F7D4A', fontWeight: '800' }}>Redirigiendo al mapa...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', paddingTop: '80px', paddingBottom: '40px' }}>
      <Header />
      
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 1.2rem' }}>
        <button 
          onClick={() => router.push('/sumate')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#888', fontWeight: '800', cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9rem' }}
        >
          <ChevronLeft size={18} /> Volver
        </button>

        <div style={{ background: 'white', borderRadius: '40px', padding: '3rem', border: '1px solid #E4EBDD', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
             <div style={{ width: '60px', height: '60px', background: '#F0F4ED', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', margin: '0 auto 1.5rem' }}>
               <Sparkles size={28} />
             </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: '1000', color: '#2D3A20', margin: 0, letterSpacing: '-0.03em' }}>Recomendar</h1>
              <p style={{ color: '#888', fontWeight: '600', marginTop: '8px' }}>Ayudanos a mapear la comida real.</p>
          </div>

          {alert && (
            <div style={{ 
              padding: '1.2rem', borderRadius: '20px', marginBottom: '2rem',
              background: alert.type === 'error' ? '#FFF2F2' : '#F0F4ED',
              color: alert.type === 'error' ? '#D32F2F' : '#5F7D4A',
              border: `1px solid ${alert.type === 'error' ? '#FFDADA' : '#E4EBDD'}`,
              display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800', fontSize: '0.9rem'
            }}>
              {alert.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Nombre del Comercio / Productor</label>
              <input 
                id="merchant-name-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ej: La huerta de Don Juan"
                style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20' }}
              />
              <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '6px', fontWeight: '600' }}>💡 Sugerencia: Empezá a escribir para buscarlo en Google Maps.</p>
            </div>

            {formData.address && (
              <div style={{ padding: '1rem', background: '#F0F4ED', borderRadius: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={16} color="#5F7D4A" />
                <div style={{ fontSize: '0.8rem', color: '#5F7D4A', fontWeight: '800' }}>
                   {formData.address}
                </div>
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Rubro / Categoría</label>
              <select 
                required
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20', appearance: 'none' }}
              >
                <option value="">Seleccionar rubro...</option>
                <option value="productor">Productor / Huerta</option>
                <option value="abastecedor">Abastecedor / Almacén</option>
                <option value="restaurante">Restaurante / Café</option>
                <option value="chef">Chef / Cocinero</option>
                <option value="comunidad">Comunidad / Otros</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Instagram o WhatsApp (Opcional)</label>
              <div style={{ position: 'relative' }}>
                <input 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  placeholder="@usuario o 112233..."
                  style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20' }}
                />
                <Instagram size={18} style={{ position: 'absolute', right: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              </div>
              {!formData.contact && (
                <p style={{ fontSize: '0.7rem', color: '#E5A500', marginTop: '6px', fontWeight: '800' }}>⚠️ Recomendado para que podamos contactarlo.</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Área de Entrega / Logística (Opcional)</label>
              <input 
                value={formData.delivery_info}
                onChange={(e) => setFormData({...formData, delivery_info: e.target.value})}
                placeholder="Ej: Entrega en CABA y GBA Norte los Martes"
                style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Localidad / Provincia</label>
              <div style={{ position: 'relative' }}>
                <input 
                  value={formData.locality}
                  onChange={(e) => setFormData({...formData, locality: e.target.value})}
                  placeholder="Ej: Beccar, San Isidro"
                  style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20' }}
                />
                <MapPin size={18} style={{ position: 'absolute', right: '1.1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>¿Qué productos ofrece?</label>
              <textarea 
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Ej: Tiene los mejores huevos de pastura de la zona."
                style={{ width: '100%', padding: '1.1rem', borderRadius: '18px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '1rem', outline: 'none', fontWeight: '600', color: '#2D3A20', minHeight: '100px', resize: 'none' }}
              />
            </div>

            {!formData.contact && !confirmNoContact ? (
              <button 
                type="button"
                onClick={() => setConfirmNoContact(true)}
                style={{ 
                  marginTop: '1rem', padding: '1.2rem', borderRadius: '20px', border: 'none', 
                  background: '#B2AC88', color: 'white', fontWeight: '1000', fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                <AlertTriangle size={20} /> ENVIAR SIN CONTACTO
              </button>
            ) : (
              <button 
                type="submit"
                disabled={loading}
                style={{ 
                  marginTop: '1rem', padding: '1.2rem', borderRadius: '20px', border: 'none', 
                  background: '#5F7D4A', color: 'white', fontWeight: '1000', fontSize: '1.1rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', 
                  cursor: 'pointer', boxShadow: '0 10px 20px rgba(95, 125, 74, 0.15)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? <AlimnetLoader size={24} /> : <><Send size={20} /> {confirmNoContact ? 'SÍ, ENVIAR IGUAL' : 'ENVIAR RECOMENDACIÓN'}</>}
              </button>
            )}
          </form>
        </div>

        <div style={{ marginTop: '3rem', background: '#F0F4ED', padding: '1.5rem', borderRadius: '24px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
           <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A', flexShrink: 0 }}>
             <UserCheck size={20} />
           </div>
           <div>
             <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '950', color: '#2D3A20' }}>Validación Comunitaria</h4>
             <p style={{ margin: 0, fontSize: '0.75rem', color: '#5F7D4A', fontWeight: '700' }}>Luego de revisar los datos, el comercio aparecerá en el mapa marcado como "Sugerido por la comunidad".</p>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function NeighborRecommendationPage() {
  return (
    <Suspense fallback={<AlimnetLoader fullScreen />}>
      <NeighborRecommendationContent />
    </Suspense>
  );
}
