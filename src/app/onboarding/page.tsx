'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User, MapPin, Sparkles, ChevronRight, ChevronLeft, Loader2, CheckCircle, Globe } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [locality, setLocality] = useState('');
  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUserId(user.id);
      
      // Check if profile exists and pre-fill name
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (profile) {
        if (profile.first_name) setFirstName(profile.first_name);
        if (profile.last_name) setLastName(profile.last_name);
        
        // If profile is REALLY complete (name AND locality), skip to map
        if (profile.first_name && profile.locality) {
          router.push('/explorar');
        }
      } else {
        // Fallback to auth metadata if no profile row yet
        const meta = user.user_metadata;
        if (meta?.full_name) {
          const parts = meta.full_name.split(' ');
          setFirstName(parts[0] || '');
          setLastName(parts.slice(1).join(' ') || '');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const togglePreference = (pref: string) => {
    if (preferences.includes(pref)) {
      setPreferences(preferences.filter(p => p !== pref));
    } else {
      setPreferences([...preferences, pref]);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(Math.max(1, step - 1));
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 1 && firstName) handleNext();
      else if (step === 2 && locality) handleNext();
    }
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          locality: locality,
          dietary_preferences: preferences.join(', '),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      router.push('/explorar');
    } catch (err) {
      console.error("Error saving profile:", err);
      setSaving(false);
    }
  };

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F9F5' }}><Loader2 className="animate-spin" color="#5F7D4A" /></div>;

  return (
    <main style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      
      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: '40px', width: '200px', height: '6px', background: '#E4EBDD', borderRadius: '10px', overflow: 'hidden' }}>
         <div style={{ width: `${(step / 3) * 100}%`, height: '100%', background: '#5F7D4A', transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
      </div>

      {/* Back Button (Floating top-left) */}
      {step > 1 && (
        <button 
          onClick={handleBack}
          style={{ position: 'fixed', top: '30px', left: '30px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '800', fontSize: '0.9rem' }}
        >
          <ChevronLeft size={20} /> Volver
        </button>
      )}

      <div style={{ maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        
        {step === 1 && (
          <div key="step1" className="step-fade-in">
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', color: '#5F7D4A' }}>
              <User size={32} />
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>¡Hola, {firstName || 'bienvenido'}! 👋</h1>
            <p style={{ color: '#666', fontWeight: '600', marginBottom: '1rem', lineHeight: '1.4' }}>Queremos conocerte un poco mejor para cuidar tu experiencia.</p>
            <p style={{ color: '#888', fontWeight: '500', marginBottom: '3rem', fontSize: '0.9rem' }}>Validamos tus datos para que tu red Alimnet sea única.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
               <label style={{ fontSize: '0.85rem', fontWeight: '900', color: '#5F7D4A', marginLeft: '1rem' }}>NOMBRE</label>
               <input 
                 type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Ej: Carlos" 
                 style={{ width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', border: '2px solid #E4EBDD', outline: 'none', fontSize: '1.1rem', fontWeight: '500' }}
                 autoFocus
               />
               <label style={{ fontSize: '0.85rem', fontWeight: '900', color: '#5F7D4A', marginLeft: '1rem', marginTop: '1rem' }}>APELLIDO</label>
               <input 
                 type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Ej: Prueba" 
                 style={{ width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', border: '2px solid #E4EBDD', outline: 'none', fontSize: '1.1rem', fontWeight: '500' }}
               />
               
               <button 
                 disabled={!firstName}
                 onClick={handleNext}
                 style={{ marginTop: '2.5rem', padding: '1.2rem', borderRadius: '20px', border: 'none', background: firstName ? '#5F7D4A' : '#E4EBDD', color: 'white', fontWeight: '950', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: firstName ? '0 10px 25px rgba(95, 125, 74, 0.2)' : 'none' }}
               >
                 {firstName === (firstName) ? 'Aceptar y Continuar' : 'Continuar'} <ChevronRight size={20} />
               </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div key="step2" className="step-fade-in">
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', color: '#5F7D4A' }}>
              <MapPin size={32} />
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Tu Radar 🗺️</h1>
            <p style={{ color: '#666', fontWeight: '600', marginBottom: '1rem' }}>¿En qué zona buscás comida real?</p>
            <p style={{ color: '#888', fontWeight: '500', marginBottom: '3rem', fontSize: '0.9rem', lineHeight: '1.4' }}>Centraremos el mapa aquí para arrancar, pero podés viajar y llevar Alimnet con vos a cualquier parte.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
               <input 
                 type="text" value={locality} onChange={(e) => setLocality(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Ej: Pilar, Buenos Aires" 
                 style={{ width: '100%', padding: '1.2rem 1.5rem', borderRadius: '20px', border: '2px solid #E4EBDD', outline: 'none', fontSize: '1.1rem', fontWeight: '500' }}
                 autoFocus
               />
               
               <button 
                 disabled={!locality}
                 onClick={handleNext}
                 style={{ marginTop: '2.5rem', padding: '1.2rem', borderRadius: '20px', border: 'none', background: locality ? '#5F7D4A' : '#E4EBDD', color: 'white', fontWeight: '950', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: locality ? '0 10px 25px rgba(95, 125, 74, 0.2)' : 'none' }}
               >
                 Un paso más <ChevronRight size={20} />
               </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div key="step3" className="step-fade-in">
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', color: '#5F7D4A' }}>
              <Sparkles size={32} />
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '950', color: '#5F7D4A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Tu Estilo 🥗</h1>
            <p style={{ color: '#666', fontWeight: '600', marginBottom: '1rem' }}>¿Alguna preferencia hoy?</p>
            <p style={{ color: '#888', fontWeight: '500', marginBottom: '3rem', fontSize: '0.9rem', lineHeight: '1.4' }}>Tu mapa se adaptará a tus gustos, pero recordá que podés cambiar los filtros cuando quieras.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', textAlign: 'left' }}>
               {['Plant Based', 'Gluten Free', 'Sugar Free', 'Pastura / Grass Fed', 'Orgánico / Agroecológico'].map((pref) => (
                 <button
                   key={pref}
                   onClick={() => togglePreference(pref)}
                   style={{ 
                     padding: '1.2rem 1.5rem', borderRadius: '20px', border: preferences.includes(pref) ? '2px solid #5F7D4A' : '2px solid #E4EBDD',
                     background: preferences.includes(pref) ? '#F0F4ED' : 'white', color: preferences.includes(pref) ? '#5F7D4A' : '#666',
                     fontWeight: '800', fontSize: '1rem', cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                   }}
                 >
                   {pref}
                   {preferences.includes(pref) && <CheckCircle size={18} />}
                 </button>
               ))}

               <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '16px', background: 'rgba(95, 125, 74, 0.05)', border: '1px dashed #5F7D4A', display: 'flex', alignItems: 'center', gap: '12px', color: '#5F7D4A', fontSize: '0.85rem' }}>
                  <Globe size={24} />
                  <span><b>Podés viajar y llevar tu red Alimnet con vos.</b> Siempre encontrarás locales afines a tu filosofía.</span>
               </div>
               
               <button 
                 disabled={saving}
                 onClick={handleFinish}
                 style={{ marginTop: '2.5rem', padding: '1.2rem', borderRadius: '20px', border: 'none', background: '#5F7D4A', color: 'white', fontWeight: '950', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(95, 125, 74, 0.2)' }}
               >
                 {saving ? <Loader2 className="animate-spin" /> : 'Descubrir mi red'}
               </button>
               <button onClick={handleFinish} style={{ background: 'none', border: 'none', color: '#888', marginTop: '1rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>Omitir por ahora</button>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .step-fade-in {
          animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
 Broadway
