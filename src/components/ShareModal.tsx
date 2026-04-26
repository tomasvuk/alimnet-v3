'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Instagram, Facebook, Send, Twitter } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantName: string;
  merchantId: string;
  merchantLogo?: string;
  merchantCategory?: string;
}

export default function ShareModal({ 
  isOpen, 
  onClose, 
  merchantName, 
  merchantId, 
  merchantLogo, 
  merchantCategory 
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/explorar?id=${merchantId}`
    : '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: <Send size={20} style={{ transform: 'rotate(-45deg)', marginLeft: '2px' }} />,
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(`Te comparto este proyecto de alimentos cuidados en Alimnet: ${merchantName} ${shareUrl}`)}`
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      color: '#E4405F',
      url: `https://www.instagram.com/` 
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'X',
      icon: <Twitter size={20} />,
      color: '#000000',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Te comparto este proyecto de alimentos cuidados en Alimnet: ${merchantName}`)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Enlace',
      icon: copied ? <Check size={20} /> : <Copy size={20} />,
      color: '#5F7D4A',
      action: handleCopy
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(45, 58, 32, 0.4)',
              backdropFilter: 'blur(10px)',
              zIndex: 11000,
              cursor: 'pointer'
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 11001,
            pointerEvents: 'none'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '92%',
                maxWidth: '420px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(63, 82, 50, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                pointerEvents: 'auto',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.2rem',
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#3F5232',
                  display: 'flex'
                }}
              >
                <X size={18} />
              </button>

              <h2 style={{ 
                fontSize: '0.75rem', 
                fontWeight: '900', 
                textTransform: 'uppercase', 
                letterSpacing: '0.15em',
                color: 'var(--primary-dark)',
                opacity: 0.8,
                marginTop: '0.5rem'
              }}>
                Compartir
              </h2>

              {/* Merchant Preview */}
              <div style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '24px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(95, 125, 74, 0.1)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  {merchantLogo ? (
                    <img src={merchantLogo} alt={merchantName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>{merchantName[0]}</span>
                  )}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '900', color: 'var(--primary-dark)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {merchantName}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '600' }}>
                    {merchantCategory || 'Proyecto Alimnet'}
                  </p>
                </div>
              </div>

              {/* Icons Grid */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                padding: '0 0.5rem'
              }}>
                {shareOptions.map((option) => (
                  <div 
                    key={option.name}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={option.action || (() => window.open(option.url, '_blank'))}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        background: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: option.color,
                        boxShadow: '0 8px 20px -5px rgba(63, 82, 50, 0.15)',
                        cursor: 'pointer',
                        position: 'relative'
                      }}
                    >
                      {option.icon}
                    </motion.button>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      fontWeight: '800', 
                      color: 'var(--text-secondary)',
                      opacity: 0.7
                    }}>
                      {option.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Future Footer */}
              <p style={{ 
                fontSize: '0.6rem', 
                fontWeight: '700', 
                color: 'var(--text-secondary)', 
                opacity: 0.5,
                marginTop: '0.5rem',
                fontStyle: 'italic'
              }}>
                Próximamente: Compartir con contactos de Alimnet
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
