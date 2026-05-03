'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function SetupZonesMigration() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const runMigration = async () => {
    setStatus('loading');
    setMessage('Aplicando migración de zonas...');

    try {
      const response = await fetch('/api/setup/zones-migration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer dev-token-12345`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setStatus('success');
      setMessage(`✅ Migración exitosa. ${data.zonesCount} zonas creadas.`);
    } catch (err) {
      setStatus('error');
      setMessage(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div
      style={{
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        border: '2px dashed #e5e7eb',
        borderRadius: '8px',
        marginTop: '1rem',
      }}
    >
      <h3 style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', fontWeight: '700', color: '#1f2937' }}>
        ⚙️ Setup: Migración de Zonas
      </h3>
      <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#6b7280' }}>
        Crea las tablas de zonas y merchant_delivery_zones en la BD.
      </p>

      <button
        onClick={runMigration}
        disabled={status === 'loading'}
        style={{
          padding: '0.6rem 1.2rem',
          fontSize: '0.9rem',
          fontWeight: '600',
          backgroundColor: status === 'success' ? '#10b981' : status === 'error' ? '#ef4444' : '#5f7d4a',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        {status === 'loading' && <Loader size={16} className="animate-spin" />}
        {status === 'success' && <CheckCircle size={16} />}
        {status === 'error' && <AlertCircle size={16} />}
        {status === 'loading' ? 'Migrando...' : status === 'success' ? 'Completado' : 'Ejecutar Migración'}
      </button>

      {message && (
        <div
          style={{
            marginTop: '1rem',
            padding: '0.8rem',
            backgroundColor: status === 'success' ? '#d1fae5' : status === 'error' ? '#fee2e2' : '#fef3c7',
            border: `1px solid ${status === 'success' ? '#6ee7b7' : status === 'error' ? '#fca5a5' : '#fcd34d'}`,
            borderRadius: '6px',
            fontSize: '0.85rem',
            color: status === 'success' ? '#065f46' : status === 'error' ? '#7f1d1d' : '#92400e',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
