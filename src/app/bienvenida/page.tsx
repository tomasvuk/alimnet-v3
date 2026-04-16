'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AlimnetLoader from '@/components/AlimnetLoader';

export default function BienvenidaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ first_name: '', last_name: '' });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      /* 
      if (!session) {
        router.push('/login');
        return;
      }
      */
      const { data: profile } = session 
        ? await supabase.from('profiles').select('first_name, last_name').eq('id', session.user.id).single() 
        : { data: null };
      
      if (profile?.first_name && profile?.last_name) {
        router.push('/explorar');
      } else {
        setChecking(false);
      }
    };
    checkUser();
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name) return;
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No session');

      const { error } = await supabase.from('profiles').update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        full_name: `${formData.first_name} ${formData.last_name}`
      }).eq('id', session.user.id);
      
      if (error) throw error;

      // Trigger Welcome Email via Notifications table
      const userLang = navigator.language?.startsWith('es') ? 'es' : 'en';
      const { data: notification } = await supabase
        .from('notifications')
        .insert({
          user_id: session.user.id,
          title: userLang === 'es' ? '¡Bienvenido a Alimnet!' : 'Welcome to Alimnet!',
          content: 'Bienvenida personal de Tomás Vukojicic.',
          type: 'WELCOME',
          metadata: {
            name: formData.first_name.trim(),
            email: session.user.email,
            lang: userLang
          }
        }).select().single();

      if (notification) {
        // We trigger the process route
        fetch('/api/notifications/process', {
          method: 'POST',
          body: JSON.stringify({ notificationId: notification.id })
        }).catch(err => console.error('Email process failed:', err));
      }

      router.push('/explorar');
    } catch (e) {
      console.error('Error saving profile:', e);
      setLoading(false);
    }
  };

  if (checking) return <AlimnetLoader fullScreen />;

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9F5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
       <div style={{ maxWidth: '450px', width: '100%', background: 'white', borderRadius: '40px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(63, 82, 50, 0.1)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 2rem', border: '5px solid #F0F4ED' }}>
             <img src="/logo.png" alt="Alimnet Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '950', textAlign: 'center', color: '#2D3A20', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
             ¡Nos alegra que seas parte de esta red!
          </h1>
          <p style={{ textAlign: 'center', color: '#666', fontWeight: '600', marginBottom: '2.5rem' }}>Para conocer a los productores y participar, necesitamos saber quién sos.</p>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block', letterSpacing: '0.05em' }}>Nombre</label>
              <input 
                required
                placeholder="Tu nombre real"
                value={formData.first_name}
                onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                style={{ width: '100%', padding: '1.1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800', fontSize: '1rem', color: '#2D3A20' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: '900', color: '#5F7D4A', textTransform: 'uppercase', marginBottom: '8px', display: 'block', letterSpacing: '0.05em' }}>Apellido</label>
              <input 
                required
                placeholder="Tu apellido real"
                value={formData.last_name}
                onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                style={{ width: '100%', padding: '1.1rem', borderRadius: '16px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', outline: 'none', fontWeight: '800', fontSize: '1rem', color: '#2D3A20' }}
              />
            </div>
            <button 
              type="submit" disabled={loading || !formData.first_name || !formData.last_name}
              style={{ width: '100%', padding: '1.2rem', borderRadius: '20px', background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '1000', fontSize: '1rem', cursor: (loading || !formData.first_name || !formData.last_name) ? 'not-allowed' : 'pointer', opacity: (loading || !formData.first_name || !formData.last_name) ? 0.7 : 1, marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(95, 125, 74, 0.2)', transition: 'all 0.3s' }}
            >
              {loading ? 'Preparando todo...' : 'Empezar a explorar'} <ArrowRight size={20} />
            </button>
          </form>

          <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.7rem', color: '#ADB5BD', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
             Unite a la Soberanía Alimentaria ✨
          </p>
       </div>
    </div>
  );
}
