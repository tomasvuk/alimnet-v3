'use client';

import React, { useState } from 'react';
import { User, MapPin, Sparkles, Loader2, X, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface OnboardingPremiumProps {
  user: any;
  onComplete: () => void;
}

export default function OnboardingPremium({ user, onComplete }: OnboardingPremiumProps) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.user_metadata?.full_name?.split(' ')[0] || '');
  const [locality, setLocality] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [gmapsReady, setGmapsReady] = useState(false);

  React.useEffect(() => {
    if (step === 2 && typeof window !== 'undefined') {
      // 1. Force Load Script if not present
      if (!window.google?.maps?.places) {
        console.log("Onboarding: Forzando carga de script Google Maps");
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        document.head.appendChild(script);
      }

      let attempts = 0;
      const initAutocomplete = () => {
        const target = inputRef.current || document.getElementById('onboarding-locality-input') as HTMLInputElement;
        
        if (target && window.google?.maps?.places) {
          console.log("Onboarding: Inicializando Google Places Autocomplete");
          setGmapsReady(true);
          const autocomplete = new window.google.maps.places.Autocomplete(target, {
            types: ['geocode', 'establishment'], 
            componentRestrictions: { country: 'ar' },
            fields: ['formatted_address', 'geometry', 'name']
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            const val = place.formatted_address || place.name;
            if (val) setLocality(val);
          });
          return true;
        }
        return false;
      };

      const interval = setInterval(() => {
        attempts++;
        if (initAutocomplete() || attempts > 50) {
          clearInterval(interval);
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, [step]);

  const togglePreference = (pref: string) => {
    setPreferences(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
  };

  const handleFinish = async () => {
    setSaving(true);
    setError(null);
    try {
      console.log("Onboarding: Intentando guardar perfil para", user.id);
      const { data, error: upsertError } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: firstName, 
        first_name: firstName,
        locality: locality,
        preferences: preferences,
        role: 'consumer',
        email: user.email,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' }).select().single();
      
      if (upsertError) {
        console.error('Onboarding: Upsert Error Details:', JSON.stringify(upsertError, null, 2));
        throw upsertError;
      }
      
      console.log("Onboarding: Perfil guardado con éxito", data);
      onComplete();
    } catch (err: any) {
      console.error('Onboarding: Catch Error:', err);
      const msg = err.message || JSON.stringify(err);
      setError(`Error al guardar: ${msg}`);
      setSaving(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.2)', 
      backdropFilter: 'blur(15px) saturate(180%)', 
      WebkitBackdropFilter: 'blur(15px) saturate(180%)',
      zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' 
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.85)', 
        maxWidth: '480px', width: '100%', borderRadius: '40px', padding: '3.5rem', 
        boxShadow: '0 30px 60px rgba(63, 82, 50, 0.15)', 
        position: 'relative', border: '1px solid rgba(255,255,255,0.5)',
        animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <button 
          onClick={onComplete} 
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#BBB', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#5F7D4A')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#BBB')}
        >
          <X size={24} />
        </button>
        
        {step === 1 && (
          <div className="onboarding-step">
            <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
              <User size={32} />
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>¡Hola!</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: '550' }}>Confirmá tu nombre para ser parte de la red.</p>
            
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
                autoComplete="off"
                placeholder="Tu nombre"
                style={{ 
                  width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', 
                  border: '2px solid #E4EBDD', background: 'white', fontSize: '1.1rem', 
                  outline: 'none', transition: 'border-color 0.2s'
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#E4EBDD')}
              />
            </div>
            
            <button 
              onClick={() => setStep(2)} 
              disabled={!firstName.trim()}
              style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '22px', 
                background: firstName.trim() ? 'var(--primary-dark)' : '#CCC', 
                color: 'white', fontWeight: '850', border: 'none', cursor: firstName.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              Continuar <ChevronRight size={20} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step">
            <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
              <MapPin size={32} />
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Tu Radar</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: '550' }}>¿En qué zona buscás comida real?</p>
            
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input 
                id="onboarding-locality-input"
                ref={inputRef}
                type="text" 
                value={locality} 
                onChange={e => setLocality(e.target.value)}
                autoComplete="new-password"
                placeholder="Ej: Pilar, Buenos Aires"
                style={{ 
                  width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', 
                  border: gmapsReady ? '2px solid #3B82F6' : '2px solid #E4EBDD', 
                  background: 'white', fontSize: '1.1rem', 
                  outline: 'none',
                  boxShadow: gmapsReady ? '0 0 10px rgba(59, 130, 246, 0.2)' : 'none'
                }}
              />
              {gmapsReady && <div style={{ fontSize: '0.7rem', color: '#3B82F6', marginTop: '4px', fontWeight: 'bold' }}>Google Maps conectado</div>}
            </div>
            
            <button 
              onClick={() => setStep(3)} 
              disabled={!locality.trim()}
              style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '22px', 
                background: locality.trim() ? 'var(--primary-dark)' : '#CCC', 
                color: 'white', fontWeight: '850', border: 'none', cursor: locality.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.1rem'
              }}
            >
              Un paso más <ChevronRight size={20} />
            </button>
            <button onClick={() => setStep(3)} style={{ width: '100%', background: 'none', border: 'none', color: '#888', marginTop: '1rem', fontWeight: '700', cursor: 'pointer' }}>Saltar por ahora</button>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step">
            <div style={{ width: '64px', height: '64px', background: 'var(--primary-light)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-dark)', marginBottom: '2rem' }}>
              <Sparkles size={32} />
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Tipo de alimentación</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '550' }}>¿Alguna preferencia alimenticia?</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '2.5rem' }}>
              {['Gluten Free', 'Sugar Free', 'Plant Based', 'Sin Lactosa', 'Keto', 'Vegetariano'].map(p => (
                <button 
                  key={p} 
                  onClick={() => togglePreference(p)} 
                  style={{ 
                    padding: '0.8rem 1.5rem', borderRadius: '30px', 
                    border: preferences.includes(p) ? '2.5px solid var(--primary-dark)' : '2.5px solid #E4EBDD', 
                    background: preferences.includes(p) ? '#F0F4ED' : 'white', 
                    fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s',
                    color: preferences.includes(p) ? 'var(--primary-dark)' : 'var(--text-secondary)'
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleFinish} 
              disabled={saving} 
              style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '22px', 
                background: 'var(--primary-dark)', 
                color: 'white', fontWeight: '850', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.2rem'
              }}
            >
              {saving ? <Loader2 className="animate-spin" /> : 'Descubrir Mi Red'}
            </button>
            {!saving && <button onClick={handleFinish} style={{ width: '100%', background: 'none', border: 'none', color: '#888', marginTop: '1rem', fontWeight: '700', cursor: 'pointer' }}>Saltar</button>}
            
            {error && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#FEE2E2', color: '#B91C1C', borderRadius: '15px', fontSize: '0.9rem', textAlign: 'center', fontWeight: '600', border: '1px solid #FECACA' }}>
                {error}
              </div>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .onboarding-step {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pac-container {
          z-index: 20000 !important;
          border-radius: 12px;
          border: none;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
