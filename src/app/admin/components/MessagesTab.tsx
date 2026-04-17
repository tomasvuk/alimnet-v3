'use client';

import React from 'react';
import { Mail, MessageSquare, CheckCircle2, Clock, User } from 'lucide-react';

interface Message {
  id: string;
  created_at: string;
  type: 'CHATBOT' | 'CONTACT_FORM';
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
}

interface MessagesTabProps {
  messages: Message[];
  onMarkAsRead: (id: string, type: 'CHATBOT' | 'CONTACT_FORM') => void;
  loading?: boolean;
}

const BadgeStyle = { padding: '6px 12px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '1000' as const };

export default function MessagesTab({ messages, onMarkAsRead, loading }: MessagesTabProps) {
  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando mensajes...</div>;

  const unreadCount = messages.filter(m => m.status === 'unread').length;

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', background: '#F8F9F5', padding: '1.5rem 2rem', borderRadius: '24px', border: '1px solid #F0F4ED' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: unreadCount > 0 ? '#EF4444' : '#5F7D4A', color: 'white', padding: '12px', borderRadius: '16px' }}>
             <Mail size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.3rem' }}>Bandeja de Entrada Unificada</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#B2AC88', fontWeight: 800 }}>Tienes {unreadCount} mensajes pendientes de respuesta</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((m) => (
          <div 
            key={m.id} 
            style={{ 
              background: 'white', 
              padding: '1.5rem', 
              borderRadius: '24px', 
              border: '1px solid #F0F4ED',
              display: 'flex',
              gap: '2rem',
              transition: 'all 0.2s',
              opacity: m.status === 'read' ? 0.7 : 1,
              boxShadow: m.status === 'unread' ? '0 10px 30px rgba(95, 125, 74, 0.05)' : 'none',
              borderLeft: m.status === 'unread' ? '6px solid #5F7D4A' : '1px solid #F0F4ED'
            }}
          >
            <div style={{ width: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ 
                  ...BadgeStyle, 
                  background: m.type === 'CHATBOT' ? '#2D3A20' : '#E4EBDD', 
                  color: m.type === 'CHATBOT' ? 'white' : '#5F7D4A' 
                }}>
                  {m.type === 'CHATBOT' ? '🤖 CHATBOT' : '✉️ WEB FORM'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2D3A20', fontWeight: 1000, fontSize: '0.9rem' }}>
                <User size={14} color="#B2AC88" /> {m.sender_name}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#B2AC88', fontWeight: 800, marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {m.sender_email}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#B2AC88', marginTop: '12px', fontWeight: 900 }}>
                <Clock size={12} /> {new Date(m.created_at).toLocaleDateString()}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: 1000, color: m.status === 'unread' ? '#2D3A20' : '#888' }}>
                {m.subject}
              </h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: '1.6', fontWeight: 600 }}>
                {m.message}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {m.status === 'unread' ? (
                <button 
                  onClick={() => onMarkAsRead(m.id, m.type)}
                  style={{ 
                    background: '#5F7D4A', 
                    color: 'white', 
                    border: 'none', 
                    padding: '12px 24px', 
                    borderRadius: '16px', 
                    fontWeight: 1000, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'transform 0.1s'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <CheckCircle2 size={18} /> MARCAR LEÍDO
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: 1000, fontSize: '0.85rem' }}>
                  <CheckCircle2 size={20} /> GESTIONADO
                </div>
              )}
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div style={{ padding: '5rem', textAlign: 'center', background: 'white', borderRadius: '32px', border: '1px solid #F0F4ED' }}>
            <MessageSquare size={48} color="#E4EBDD" style={{ marginBottom: '1rem' }} />
            <p style={{ color: '#B2AC88', fontWeight: 1000 }}>No hay mensajes nuevos en la bandeja.</p>
          </div>
        )}
      </div>
    </div>
  );
}
