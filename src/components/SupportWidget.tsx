'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [lang, setLang] = useState<'es' | 'en'>('es');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let metadata: any = {
        email: user?.email || 'Visita Anónima',
        lang: lang,
      };

      if (user) {
        const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (profile?.full_name) metadata.name = profile.full_name;
      }
      
      const response = await fetch('/api/support/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          lang,
          metadata
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API Error');
      }

      setSent(true);
      setMessage('');
      setTimeout(() => {
        setSent(false);
        setIsOpen(false);
      }, 3000);

    } catch (err) {
      console.error('Error sending message:', err);
      alert(lang === 'es' ? 'Hubo un error. Intenta de nuevo.' : 'Error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ ...widgetContainer, bottom: isMobile ? '20px' : '30px', right: isMobile ? '20px' : '30px' }}>
      {/* Balloon/Dialog */}
      {isOpen && (
        <div style={{ ...chatWindow, width: isMobile ? '280px' : '320px' }}>
          <div style={chatHeader}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#657D51" fill="#657D51" />
                <span style={{ fontWeight: '900', fontSize: '0.8rem', color: '#657D51', textTransform: 'uppercase' }}>Alimnet Support</span>
             </div>
             <button onClick={() => setIsOpen(false)} style={closeBtn}><X size={18} /></button>
          </div>

          <div style={chatBody}>
            {sent ? (
              <div style={successState}>
                <div style={checkCircle}><Check size={28} /></div>
                <h4 style={{ margin: '12px 0 4px', color: '#2D3A20', fontWeight: '900' }}>
                  {lang === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888', fontWeight: '600' }}>
                  {lang === 'es' ? 'Tomás te responderá pronto.' : 'Tomas will reply soon.'}
                </p>
              </div>
            ) : (
              <>
                <p style={welcomeText}>
                  {lang === 'es' 
                    ? '¿Tenés alguna duda o sugerencia? Escribinos y te responderemos personalmente.' 
                    : 'Any questions or suggestions? Write us and we will personally reply.'}
                </p>
                <form onSubmit={handleSubmit}>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={lang === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                    style={textarea}
                    autoFocus
                  />
                  <button 
                    disabled={sending || !message.trim()}
                    style={{ 
                      ...sendBtn, 
                      opacity: sending || !message.trim() ? 0.5 : 1,
                      transform: sending || !message.trim() ? 'scale(1)' : 'scale(1.02)'
                    }}
                  >
                    {sending ? <Loader2 className="animate-spin" size={20} /> : <><Send size={16} /> {lang === 'es' ? 'Enviar' : 'Send'}</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        style={{
          ...floatBtn, 
          width: isMobile ? '50px' : '60px',
          height: isMobile ? '50px' : '60px',
          borderRadius: isMobile ? '16px' : '20px',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
      >
        {isOpen ? <X size={isMobile ? 20 : 24} /> : <MessageSquare size={isMobile ? 20 : 24} />}
      </button>

      {/* VERSION TAG */}
      <div style={{ 
        fontSize: '9px', 
        fontWeight: '900', 
        color: '#2D3A20', 
        opacity: 0.4, 
        paddingRight: '4px',
        pointerEvents: 'none',
        userSelect: 'none'
      }}>
        v4.1.2
      </div>

      <style jsx>{`
        @keyframes floatIn { from { opacity: 0; transform: translateY(20px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .step-fade-in { animation: floatIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
}

// Styles
const widgetContainer: React.CSSProperties = {
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '15px',
};

const floatBtn: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '20px',
  background: '#2D3A20',
  color: 'white',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
};

const chatWindow: React.CSSProperties = {
  width: '320px',
  background: 'white',
  borderRadius: '28px',
  boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
  border: '1px solid #E4EBDD',
  overflow: 'hidden',
  animation: 'floatIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
};

const chatHeader: React.CSSProperties = {
  padding: '16px 20px',
  background: '#F8F9F5',
  borderBottom: '1px solid #E4EBDD',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const chatBody: React.CSSProperties = {
  padding: '20px',
};

const welcomeText: React.CSSProperties = {
  fontSize: '0.85rem',
  color: '#666',
  fontWeight: '600',
  lineHeight: '1.4',
  marginBottom: '15px',
};

const textarea: React.CSSProperties = {
  width: '100%',
  height: '100px',
  padding: '12px',
  borderRadius: '16px',
  border: '1.5px solid #F0F4ED',
  background: '#F8F9F5',
  fontSize: '0.9rem',
  color: '#2D3A20',
  fontWeight: '600',
  outline: 'none',
  resize: 'none',
  marginBottom: '10px',
};

const sendBtn: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  borderRadius: '16px',
  border: 'none',
  background: '#657D51',
  color: 'white',
  fontWeight: '950',
  fontSize: '0.9rem',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  transition: 'all 0.2s',
};

const closeBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#AAA',
  cursor: 'pointer',
};

const successState: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px 0',
};

const checkCircle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  background: '#657D51',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
};
