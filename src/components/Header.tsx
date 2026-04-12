'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, User, Map as MapIcon, HelpCircle, Menu, X, Home, Store, Plus, ShieldCheck, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AlimnetLoader from '@/components/AlimnetLoader';
import { setAuthCookie, removeAuthCookie } from '@/lib/auth-utils';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isMerchant, setIsMerchant] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileView(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const initAuth = async () => {
      let { data: { session } } = await supabase.auth.getSession();
      
      // --- [BRUTE FORCE GOOGLE] Sincronización manual para móviles ---
      if (!session) {
        const cookies = document.cookie.split('; ');
        const authCookie = cookies.find(row => row.startsWith('sb-keagrrvtzmsukcmzxqrl-auth-token='));
        if (authCookie) {
          try {
            const cookieValue = decodeURIComponent(authCookie.split('=')[1]);
            const sessionData = JSON.parse(cookieValue);
            if (sessionData?.access_token && sessionData?.refresh_token) {
              console.log("[HEADER BRUTE FORCE]: Restaurando sesión...");
              const { data: { session: restoredSession } } = await supabase.auth.setSession({
                access_token: sessionData.access_token,
                refresh_token: sessionData.refresh_token
              });
              if (restoredSession) session = restoredSession;
            }
          } catch (e) { console.error(e); }
        }
      }

      handleAuthChange(session);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    initAuth();
    return () => {
      subscription.unsubscribe();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleAuthChange = async (session: any) => {
    if (session?.user) {
      setUser(session.user);
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profile) setProfile(profile);
      
      // Sincronizar cookie proactivamente
      setAuthCookie(session);

      const { data: mData } = await supabase
        .from('merchants')
        .select('id, name')
        .eq('owner_id', session.user.id);
      
      if (mData && mData.length > 0) setIsMerchant(true);
    } else {
      setUser(null);
      setProfile(null);
      setIsMerchant(false);
      // NO borramos la cookie automáticamente aquí. 
      // Solo debe ocurrir en el Logout explícito. 
      // Esto evita que en móviles el Header borre la sesión antes de tiempo.
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
      {/* Brand Logo */}
      <div 
        onClick={() => router.push('/')}
        style={{ fontSize: "1.2rem", fontWeight: "950", color: "#2D3A20", letterSpacing: "-0.05em", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        ALIMNET
      </div>

      {/* Acciones */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        
        <button 
          onClick={() => router.push('/explorar')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', 
            border: 'none', cursor: 'pointer', color: '#5F7D4A', fontWeight: '850', fontSize: '0.8rem'
          }}
        >
          <MapIcon size={18} />
          {!isMobileView && <span>EXPLORAR</span>}
        </button>

        <button 
          onClick={() => router.push('/sumate')}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', background: '#F0F4ED', 
            padding: '8px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer', 
            color: '#5F7D4A', fontWeight: '950', fontSize: '0.8rem'
          }}
        >
          <Plus size={18} strokeWidth={3} />
          {!isMobileView && <span>SUMAR</span>}
        </button>

        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <AlimnetLoader size={18} />
      </div>
        ) : !user ? (
          <button 
            onClick={() => router.push('/login')}
            style={{ padding: '0.4rem 0.8rem', borderRadius: '12px', border: '1.5px solid #5F7D4A', background: 'transparent', color: '#5F7D4A', fontWeight: '900', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            INGRESAR
          </button>
        ) : (
          <div 
            onClick={() => router.push('/mi-cuenta')}
            style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5F7D4A', border: '1px solid #E4EBDD' }}
          >
            <User size={20} />
          </div>
        )}

        {/* HAMBURGUESA BOLD */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          style={{ 
            background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', 
            padding: '10px', display: 'flex', flexDirection: 'column', gap: '4px',
            alignItems: 'center', cursor: 'pointer', width: '42px', height: '36px', justifyContent: 'center'
          }}
        >
          <div style={{ width: showMenu ? '20px' : '15px', height: '2.5px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.3s' }}></div>
          <div style={{ width: '20px', height: '2.5px', background: '#2D3A20', borderRadius: '2px' }}></div>
          <div style={{ width: showMenu ? '15px' : '20px', height: '2.5px', background: '#2D3A20', borderRadius: '2px', transition: 'all 0.3s' }}></div>
        </button>
      </div>

      {/* DROPDOWN JERÁRQUICO */}
      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} style={{ position: 'fixed', inset: 0, zIndex: 4998 }} />
          <div style={{ 
            position: 'absolute', top: 'calc(100% + 10px)', right: '1.5rem', width: '280px', 
            background: 'white', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.15)', 
            padding: '1.2rem 1rem', zIndex: 4999, display: 'flex', flexDirection: 'column', gap: '0.4rem',
            border: '1px solid rgba(0,0,0,0.04)',
            maxHeight: '85vh', overflowY: 'auto', paddingBottom: '2.5rem'
          }}>
            {/* 1. MI PERFIL (DESTACADO B2C - SIMPLIFICADO) */}
             <MenuItem 
                href="/mi-cuenta" 
                icon={<User size={18} />} 
                label="Mi Perfil" 
                onClick={() => setShowMenu(false)} 
                variant="button"
             />

             {/* ADMINISTRACIÓN (SÓLO ADMINS) */}
             {profile?.role === 'admin' && (
               <MenuItem
                 href="/admin"
                 icon={<ShieldCheck size={18} color="#5F7D4A" />}
                 label="Panel de Control"
                 onClick={() => setShowMenu(false)}
               />
             )}
            
            <MenuItem href="/explorar" icon={<MapIcon size={18} />} label="Mapa de Alimentos" onClick={() => setShowMenu(false)} />
            <MenuItem href="/sostener" icon={<HelpCircle size={18} />} label="Sostener Alimnet" onClick={() => setShowMenu(false)} />
            <MenuItem href="/" icon={<Home size={18} />} label="Home" onClick={() => setShowMenu(false)} />
            
            <div style={{ height: '1px', background: '#F0F4ED', margin: '1rem 0.5rem' }} />

            <MenuItem href="/perfil" icon={<MapIcon size={18} />} label="MI PANEL COMERCIAL" onClick={() => setShowMenu(false)} variant="text-only" />
            <MenuItem href="/sumate" icon={<Plus size={18} />} label="REGISTRAR MI COMERCIO" onClick={() => setShowMenu(false)} variant="text-only" />
            
            <div style={{ flex: 1, minHeight: '2rem' }} />

            {/* ACCIONES DE SESIÓN (ESTILO ALIMNET) */}
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                removeAuthCookie();
                window.location.href = '/';
              }}
              style={{ 
                marginTop: '1.5rem', padding: '12px 18px', borderRadius: '18px', border: '1.5px solid #E4EBDD',
                background: '#F8F9F5', color: '#5F7D4A', fontWeight: '950', fontSize: '0.8rem', 
                display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer', textAlign: 'left',
                boxShadow: '0 4px 12px rgba(95, 125, 74, 0.05)',
                transition: 'all 0.2s',
                letterSpacing: '0.02em'
              }}
              className="hover-fade"
            >
              <LogOut size={18} strokeWidth={3} />
              CERRAR SESIÓN
            </button>
            
          </div>
        </>
      )}
    </header>
  );
}

function MenuItem({ href, icon, label, onClick, variant = 'normal' }: { href: string, icon: any, label: string, onClick: () => void, variant?: 'normal' | 'button' | 'text-only' }) {
  const isButton = variant === 'button';
  const isTextOnly = variant === 'text-only';
  
  return (
    <a 
      href={href} 
      onClick={onClick}
      style={{ 
        display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px', 
        borderRadius: '18px', textDecoration: 'none', 
        color: (isButton || isTextOnly) ? '#5F7D4A' : '#2D3A20', 
        fontWeight: (isButton || isTextOnly) ? '950' : '850', 
        fontSize: '0.85rem', transition: 'all 0.2s',
        background: isButton ? '#F0F4ED' : 'transparent',
        whiteSpace: 'nowrap',
        letterSpacing: (isButton || isTextOnly) ? '0.02em' : 'normal'
      }}
    >
      {React.cloneElement(icon, { size: 18, strokeWidth: (isButton || isTextOnly) ? 2.5 : 2 })} 
      {label}
    </a>
  );
}
