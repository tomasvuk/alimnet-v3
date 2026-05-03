'use client';

import React, { useState, useEffect } from 'react';
import { Ghost, UserCheck, Settings } from 'lucide-react';

export default function SimulationToggle() {
  const [isSimulated, setIsSimulated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [versionLabel, setVersionLabel] = useState('');

  useEffect(() => {
    // Solo mostrar en puliendo o localhost
    const hostname = window.location.hostname;
    if (hostname.includes('puliendo') || hostname.includes('localhost') || hostname.includes('vercel.app')) {
      setIsVisible(true);
      const saved = localStorage.getItem('social_simulation_mode') === 'true';
      setIsSimulated(saved);
      setVersionLabel(' (CRM + Smart Search)');
      // Disparamos un evento inicial para sincronizar el Header
      window.dispatchEvent(new Event('simulation-change'));
    }
  }, []);

  const toggleSimulation = () => {
    const newState = !isSimulated;
    setIsSimulated(newState);
    localStorage.setItem('social_simulation_mode', newState ? 'true' : 'false');
    // Disparamos un evento global para que otros componentes (Header, etc) se enteren al instante
    window.dispatchEvent(new Event('simulation-change'));
    // Refrescamos para que toda la lógica de auth se resetee
    window.location.reload();
  };

  return (
    <div style={{ 
      position: 'fixed', bottom: '20px', left: '20px', zIndex: 99999,
      display: 'flex', flexDirection: 'column', gap: '8px',
      pointerEvents: 'none'
    }}>
      {isVisible && (
        <div 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '10px',
            background: isSimulated ? '#5F7D4A' : '#2D3A20',
            padding: '8px 15px', borderRadius: '999px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            pointerEvents: 'auto'
          }}
          onClick={toggleSimulation}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isSimulated ? <UserCheck size={16} /> : <Ghost size={16} />}
            <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {isSimulated ? 'Modo: Usuario (SIM)' : 'Modo: Invitado'}
            </span>
          </div>
          <div style={{ 
            width: '32px', height: '18px', background: 'rgba(255,255,255,0.2)', 
            borderRadius: '10px', position: 'relative', transition: 'all 0.3s'
          }}>
            <div style={{ 
              width: '14px', height: '14px', background: 'white', borderRadius: '50%',
              position: 'absolute', top: '2px', 
              left: isSimulated ? '16px' : '2px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }} />
          </div>
        </div>
      )}
      <div style={{ paddingLeft: '15px', fontSize: '10px', fontWeight: '900', color: '#888', letterSpacing: '0.05em', opacity: 0.6 }}>
        v2.1.9{versionLabel}
      </div>
    </div>
  );
}
