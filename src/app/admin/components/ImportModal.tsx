'use client';

import React, { useState } from 'react';
import { Upload, X, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onImport: (text: string) => Promise<void>;
  isImporting: boolean;
}

export default function ImportModal({ onClose, onImport, isImporting }: ImportModalProps) {
  const [text, setText] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
       <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', width: '90%', maxWidth: '700px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h2 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.5rem' }}>Importar desde GSheet / Excel</h2>
             <button onClick={onClose} style={{ background: '#F8F9F5', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer', color: '#B2AC88' }}><X size={20}/></button>
          </div>

          <div style={{ background: '#F0F4ED', padding: '1.2rem', borderRadius: '20px', marginBottom: '1.5rem', border: '1.5px solid #E4EBDD' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#5F7D4A', fontWeight: 1000, marginBottom: '8px' }}>
                <HelpCircle size={18} /> INSTRUCCIONES DE FORMATO
             </div>
             <p style={{ margin: 0, fontSize: '0.85rem', color: '#2D3A20', fontWeight: 800, lineHeight: '1.5' }}>
               Copia las columnas directamente de tu Google Sheet. El sistema espera el siguiente orden exacto para que el "match" sea perfecto:
             </p>
             <div style={{ marginTop: '12px', display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                {['Nombre', 'Rubro', 'Provincia', 'Instagram', 'Web'].map(h => (
                  <span key={h} style={{ background: 'white', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 1000, border: '1px solid #E4EBDD', whiteSpace: 'nowrap' }}>
                    {h}
                  </span>
                ))}
             </div>
          </div>

          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Pega aquí el contenido copiado de tu excel (incluyendo cabeceras)..."
            style={{ width: '100%', height: '220px', borderRadius: '24px', border: '2px solid #F0F4ED', padding: '1.5rem', outline: 'none', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1.5rem', background: '#F8F9F5' }}
          />

          <div style={{ display: 'flex', gap: '12px' }}>
             <button 
               onClick={onClose}
               style={{ flex: 1, padding: '1rem', border: 'none', borderRadius: '16px', background: '#F0F4ED', color: '#B2AC88', fontWeight: 1000, cursor: 'pointer' }}
             >
                CANCELAR
             </button>
             <button 
               disabled={isImporting || !text}
               onClick={() => onImport(text)}
               style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '1rem', background: '#5F7D4A', color: 'white', borderRadius: '16px', border: 'none', fontWeight: 1000, cursor: isImporting ? 'not-allowed' : 'pointer', opacity: isImporting ? 0.7 : 1 }}
             >
                <Upload size={20} /> {isImporting ? 'PROCESANDO...' : 'INICIAR IMPORTACIÓN'}
             </button>
          </div>

          {isImporting && (
             <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#5F7D4A', fontWeight: 900, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} className="animate-pulse" /> Validando datos y creando perfiles...
             </div>
          )}
       </div>
    </div>
  );
}
