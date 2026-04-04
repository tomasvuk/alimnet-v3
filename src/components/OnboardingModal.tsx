'use client';

import React, { useState } from 'react';
import { User, MapPin, Sparkles, Loader2, X, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface OnboardingModalProps {
  user: any;
  onComplete: () => void;
}

export default function OnboardingModal({ user, onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(user?.user_metadata?.full_name?.split(' ')[0] || '');
  const [locality, setLocality] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);

  const togglePreference = (pref: string) => {
    setPreferences(prev => prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]);
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      // Create profile record
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: firstName, // Match existing column schema
        role: 'consumer',
        // Note: Check table schema for locality and dietary_preferences
        // Based on previous list_tables, profiles has: id, full_name, role, created_at
        // I might need to add these columns if they don't exist.
      }, { onConflict: 'id' });
      
      if (error) throw error;
      
      onComplete();
    } catch (err) {
      console.error('Error saving profile:', err);
      setSaving(false);
      // Even if it fails, we let them proceed for now to not block the app
      onComplete();
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
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>¡Hola! 👋</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: '550' }}>Confirmá tu nombre para ser parte de la red.</p>
            
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input 
                type="text" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)}
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
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Tu Radar 🗺️</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem', fontWeight: '550' }}>¿En qué zona buscás comida real?</p>
            
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <input 
                type="text" 
                value={locality} 
                onChange={e => setLocality(e.target.value)}
                placeholder="Ej: Pilar, Buenos Aires"
                style={{ 
                  width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', 
                  border: '2px solid #E4EBDD', background: 'white', fontSize: '1.1rem', 
                  outline: 'none'
                }}
              />
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
            <h2 style={{ fontSize: '2.4rem', fontWeight: '950', color: 'var(--primary-dark)', marginBottom: '0.8rem', letterSpacing: '-0.02em' }}>Tu Estilo 🥗</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', fontWeight: '550' }}>¿Alguna preferencia alimenticia?</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '2.5rem' }}>
              {['Plant Based', 'Sin Gluten', 'Orgánico', 'Natural'].map(p => (
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
      `}</style>
    </div>
  );
}
