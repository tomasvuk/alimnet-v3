import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, ChevronDown, Copy, ExternalLink } from 'lucide-react';

export default function ContactDropdown({ merchant, platform, messageTemplate, onUpdateStatus }: { merchant: any, platform: 'wzp' | 'ig' | 'email', messageTemplate: string, onUpdateStatus: () => void }) {
  const [open, setOpen] = useState(false);

  const getPlatformIcon = () => {
    if (platform === 'wzp') return <MessageCircle size={14} />;
    if (platform === 'ig') return <Instagram size={14} />;
    return <Mail size={14} />;
  };

  const getPlatformColor = () => {
    if (platform === 'wzp') return '#25D366';
    if (platform === 'ig') return '#E1306C';
    return '#2D3A20';
  };

  const handleCopyText = (text: string, label: string) => {
    if (!text) {
      alert(`No hay ${label.toLowerCase()} registrado para este comercio.`);
      return;
    }
    navigator.clipboard.writeText(text);
    alert(`${label} copiado al portapapeles.`);
    onUpdateStatus();
    setOpen(false);
  };

  const contactValue = platform === 'wzp' ? (merchant.whatsapp || merchant.phone) : platform === 'ig' ? merchant.instagram_url : merchant.email;

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ padding: '8px 12px', background: getPlatformColor(), color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontWeight: 900 }}
      >
        {getPlatformIcon()} {platform.toUpperCase()} <ChevronDown size={12} />
      </button>

      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '5px', background: 'white', border: '1px solid #E4EBDD', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '160px', overflow: 'hidden' }}>
            <button 
              onClick={() => handleCopyText(contactValue || '', 'Contacto')}
              style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #F0F4ED', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Copy size={14} color="#666" /> Copiar Contacto
            </button>
            <button 
              onClick={() => handleCopyText(decodeURIComponent(messageTemplate), 'Mensaje')}
              style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', border: 'none', borderBottom: '1px solid #F0F4ED', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <Copy size={14} color="#666" /> Copiar Mensaje
            </button>
            {platform === 'wzp' && contactValue && (
              <button 
                onClick={() => { window.open(`https://wa.me/${contactValue}?text=${messageTemplate}`, '_blank'); onUpdateStatus(); setOpen(false); }}
                style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: '#F8F9F5', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 900, color: '#25D366', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ExternalLink size={14} /> Abrir WhatsApp
              </button>
            )}
            {platform === 'email' && contactValue && (
              <button 
                onClick={() => { window.open(`mailto:${contactValue}?subject=Invitación a Alimnet&body=${decodeURIComponent(messageTemplate)}`, '_blank'); onUpdateStatus(); setOpen(false); }}
                style={{ width: '100%', padding: '10px 15px', textAlign: 'left', background: '#F8F9F5', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 900, color: '#2D3A20', display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ExternalLink size={14} /> Abrir Email
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
