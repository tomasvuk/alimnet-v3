'use client';

import React, { useEffect, useState } from 'react';
import { LogIn, User, Map as MapIcon, HelpCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('user_id', user.id)
          .single();
        if (profile) setProfile(profile);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <header style={{ 
      padding: "1rem 2rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderBottom: "1px solid #E4EBDD",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      width: '100%'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => window.location.href = '/'} 
        style={{ fontSize: "1.55rem", fontWeight: "950", color: "#2D3A20", letterSpacing: "-0.05em", cursor: 'pointer' }}
      >
        ALIMNET
      </div>

      {/* Main Navigation */}
      <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-only">
        <a href="/explorar" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: '#666', fontWeight: '800', textDecoration: 'none' }}><MapIcon size={16} /> Explorar</a>
        <a href="/sostener" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: '#666', fontWeight: '800', textDecoration: 'none' }}><HelpCircle size={16} /> Sostener Alimnet</a>
        <a href="/#como-funciona" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", color: '#666', fontWeight: '800', textDecoration: 'none' }}>¿Cómo funciona?</a>
      </nav>

      {/* User Actions / Avatar */}
      <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
        {loading ? (
          <Loader2 className="animate-spin" size={20} color="#5F7D4A" />
        ) : user ? (
          <div 
            onClick={() => window.location.href = '/mi-cuenta'}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
              padding: '6px 12px', borderRadius: '50px', border: '1px solid #E4EBDD',
              background: 'white', transition: 'all 0.3s'
            }}
            className="header-avatar-btn"
          >
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#2D3A20' }} className="desktop-only">
              {profile?.first_name || user.email?.split('@')[0]}
            </span>
            <div style={{ 
              width: '32px', height: '32px', borderRadius: '50%', background: '#F0F4ED',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5F7D4A',
              border: '1.5px solid #5F7D4A', overflow: 'hidden'
            }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
            </div>
          </div>
        ) : (
          <>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{ color: "#2D3A20", fontWeight: "750", background: "none", border: "none", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.85rem" }}
            >
              Ingresar
            </button>
            <button 
              onClick={() => window.location.href = '/registro'}
              style={{ 
                padding: "0.65rem 1.5rem", borderRadius: "14px", fontSize: "0.85rem",
                background: '#5F7D4A', color: 'white', border: 'none', fontWeight: '900',
                cursor: 'pointer', boxShadow: '0 8px 16px rgba(95, 125, 74, 0.2)'
              }}
            >
              Crear cuenta
            </button>
          </>
        )}
      </div>

      <style jsx>{`
        .header-avatar-btn:hover {
          border-color: #5F7D4A;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
