'use client';

import React, { useEffect, useState } from 'react';
import { LogIn, User, Map as MapIcon, HelpCircle, Loader2, Menu, X, Home } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isMerchant, setIsMerchant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleAuthChange(session);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    initAuth();
    return () => subscription.unsubscribe();
  }, []);

  const handleAuthChange = async (session: any) => {
    if (session?.user) {
      setUser(session.user);
      
      // 1. Perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      if (profile) setProfile(profile);

      // 2. ¿Es mercante? (Soporte Multi-Comercio)
      const { data: mData } = await supabase
        .from('merchants')
        .select('id, name')
        .eq('owner_id', session.user.id);
      
      if (mData && mData.length > 0) setIsMerchant(true);
    } else {
      setUser(null);
      setProfile(null);
      setIsMerchant(false);
    }
    setLoading(false);
  };

  return (
    <header style={{ 
      padding: "0.6rem 1.5rem", 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      borderBottom: "1px solid #E4EBDD",
      background: "#F4F1E6", 
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 5000,
      width: '100%',
      height: '56px'
    }}>
      {/* Brand Logo (IZQUIERDA) */}
      <div 
        onClick={() => window.location.href = '/'} 
        style={{ fontSize: "1.2rem", fontWeight: "950", color: "#2D3A20", letterSpacing: "-0.05em", cursor: 'pointer' }}
      >
        ALIMNET
      </div>

      {/* Acciones (DERECHA) */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        
        {/* 1. EXPLORAR / MAPA */}
        <button 
          onClick={() => window.location.href = '/explorar'}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', 
            border: 'none', cursor: 'pointer', color: '#5F7D4A', fontWeight: '850', fontSize: '0.8rem'
          }}
        >
          <MapIcon size={18} />
          <span className="desktop-only">EXPLORAR</span>
        </button>

        {/* 2. PERSONITA / LOGIN */}
        {loading ? (
          <Loader2 className="animate-spin" size={18} color="#5F7D4A" />
        ) : !user ? (
          <button 
            onClick={() => window.location.href = '/login'} 
            style={{ padding: '0.4rem 0.8rem', borderRadius: '12px', border: '1.5px solid #5F7D4A', background: 'transparent', color: '#5F7D4A', fontWeight: '900', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            INGRESAR
          </button>
        ) : (
          <div 
            onClick={() => window.location.href = '/mi-cuenta'} 
            style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5F7D4A', border: '1px solid #E4EBDD' }}
          >
            <User size={20} />
          </div>
        )}

        {/* 3. HAMBURGUESA */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          style={{ 
            background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', 
            padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px',
            alignItems: 'center', cursor: 'pointer', width: '42px', height: '36px', justifyContent: 'center'
          }}
        >
          <div style={{ width: showMenu ? '20px' : '12px', height: '2px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.3s' }}></div>
          <div style={{ width: '18px', height: '2px', background: '#2D3A20', borderRadius: '2px' }}></div>
          <div style={{ width: showMenu ? '12px' : '20px', height: '2px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.3s' }}></div>
        </button>
      </div>

      {/* DROPDOWN HAMBURGUESA */}
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 4998 }} />
          <div style={{ 
            position: 'absolute', top: 'calc(100% + 10px)', right: '1.5rem', width: '240px', 
            background: 'white', borderRadius: '24px', boxShadow: '0 15px 50px rgba(0,0,0,0.15)', 
            padding: '1rem', zIndex: 4999, display: 'flex', flexDirection: 'column', gap: '0.5rem',
            border: '1px solid rgba(0,0,0,0.05)', animation: 'slideDown 0.2s ease-out'
          }}>
            <MenuItem href="/" icon={<Home size={16} />} label="Home" onClick={() => setShowMenu(false)} />
            <MenuItem href="/sostener" icon={<HelpCircle size={16} />} label="Sostener Alimnet" onClick={() => setShowMenu(false)} />
            <MenuItem href="/mi-cuenta" icon={<User size={16} />} label="Mi Perfil" onClick={() => setShowMenu(false)} />
            {user && (
              <MenuItem href="/perfil" icon={<MapIcon size={16} />} label="MI PERFIL COMERCIAL ✨" onClick={() => setShowMenu(false)} highlight />
            )}
            <div style={{ height: '1px', background: '#f0f0f0', margin: '0.5rem 0' }} />
            {!isMerchant && (
              <MenuItem href="/unirse" icon={<LogIn size={16} />} label="Sumar mi comercio" onClick={() => setShowMenu(false)} />
            )}
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .desktop-only { display: none !important; } }
      `}</style>
    </header>
  );
}

function MenuItem({ href, icon, label, onClick, highlight = false }: { href: string, icon: any, label: string, onClick: () => void, highlight?: boolean }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', 
        borderRadius: '16px', textDecoration: 'none', color: highlight ? 'var(--primary)' : '#2D3A20', 
        fontWeight: highlight ? '900' : '750', fontSize: '0.85rem', transition: 'all 0.2s',
        background: highlight ? 'rgba(95, 125, 74, 0.05)' : 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
      onMouseLeave={(e) => e.currentTarget.style.background = highlight ? 'rgba(95, 125, 74, 0.05)' : 'transparent'}
    >
      {icon} {label}
    </a>
  );
}
