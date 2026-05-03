'use client';

import React from 'react';

interface TabItemProps {
  active: boolean;
  label: string;
  onClick: () => void;
  count?: number;
}

function TabItem({ active, label, onClick, count }: TabItemProps) {
  const isMessages = label === 'Mensajes';
  const hasUnread = isMessages && (count ?? 0) > 0;

  return (
    <div onClick={onClick} style={{
      padding: '0.75rem 0', cursor: 'pointer',
      borderBottom: active ? '3px solid #5F7D4A' : '3px solid transparent',
      color: active ? '#2D3A20' : '#B2AC88',
      fontWeight: 950, display: 'flex', gap: 6, alignItems: 'center',
      whiteSpace: 'nowrap', fontSize: '0.95rem'
    }}>
      {label} 
      {count !== undefined && (
        <span style={{
          fontSize: 10, 
          background: hasUnread ? '#EF4444' : '#F0F4ED', 
          color: hasUnread ? 'white' : '#5F7D4A',
          padding: '2px 8px', 
          borderRadius: 8,
          boxShadow: hasUnread ? '0 0 10px rgba(239, 68, 68, 0.3)' : 'none',
          animation: hasUnread ? 'pulse-unread 1.5s infinite' : 'none'
        }}>
          {count}
        </span>
      )}
      <style>{`
        @keyframes pulse-unread {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  counts: {
    merchants: number;
    pending: number;
    users: number;
    unclaimed: number;
    messages: number;
  };
  onTabChange?: (tab: string) => void;
}

export default function AdminTabs({ activeTab, setActiveTab, counts, onTabChange }: AdminTabsProps) {
  const tabs = [
    { id: 'oficializacion', label: 'Oficialización', count: counts.unclaimed },
    { id: 'analytics', label: 'Analytics' },
    { id: 'mensajes', label: 'Mensajes', count: counts.messages },
    { id: 'comercios', label: 'Comercios', count: counts.merchants },
    { id: 'pendientes', label: 'Por Aprobar', count: counts.pending },
    { id: 'usuarios', label: 'Usuarios', count: counts.users },
    { id: 'pagos', label: 'Pagos' },
    { id: 'categorias', label: 'Categorías' },
  ];

  return (
    <div style={{ display: 'flex', gap: '1.2rem', borderBottom: '1px solid #F0F4ED', marginBottom: '2.5rem', overflowX: 'auto', paddingRight: '1rem' }}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          active={activeTab === tab.id}
          label={tab.label}
          onClick={() => {
            setActiveTab(tab.id);
            if (onTabChange) onTabChange(tab.id);
          }}
          count={tab.count}
        />
      ))}
    </div>
  );
}
