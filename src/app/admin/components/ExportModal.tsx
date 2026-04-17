'use client';

import React, { useState } from 'react';
import { Download, X, FileText, Table as TableIcon } from 'lucide-react';

interface ExportModalProps {
  onClose: () => void;
  data: any[];
}

export default function ExportModal({ onClose, data }: ExportModalProps) {
  const [columns, setColumns] = useState({
    name: true,
    type: true,
    province: true,
    country: true,
    status: true,
    instagram: true,
    website: true,
    validations: true,
    created_at: false
  });

  const toggleColumn = (col: keyof typeof columns) => {
    setColumns(prev => ({ ...prev, [col]: !prev[col] }));
  };

  const handleExportCSV = () => {
    const selectedCols = Object.entries(columns)
      .filter(([_, active]) => active)
      .map(([name]) => name);

    const header = selectedCols.join(',');
    const rows = data.map(m => {
      return selectedCols.map(col => {
        let val = '';
        if (col === 'name') val = m.name;
        if (col === 'type') val = m.type;
        if (col === 'province') val = m.province || m.locations?.[0]?.province;
        if (col === 'country') val = m.locations?.[0]?.country || 'Argentina';
        if (col === 'status') val = m.status;
        if (col === 'instagram') val = m.instagram_url;
        if (col === 'website') val = m.website_url;
        if (col === 'validations') val = m.validation_count || 0;
        if (col === 'created_at') val = m.created_at;
        
        // Escape commas and quotes for CSV
        const finalVal = String(val || '').replace(/"/g, '""');
        return `"${finalVal}"`;
      }).join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `alimnet_reporte_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
       <div style={{ background: 'white', padding: '2.5rem', borderRadius: '32px', width: '90%', maxWidth: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
             <h2 style={{ margin: 0, fontWeight: 1000, color: '#2D3A20', fontSize: '1.5rem' }}>Personalizar Reporte</h2>
             <button onClick={onClose} style={{ background: '#F8F9F5', border: 'none', padding: '8px', borderRadius: '12px', cursor: 'pointer', color: '#B2AC88' }}><X size={20}/></button>
          </div>

          <p style={{ color: '#B2AC88', fontWeight: 800, fontSize: '0.9rem', marginBottom: '2rem' }}>Selecciona los datos que deseas incluir en el archivo de exportación.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '2.5rem' }}>
             {Object.entries(columns).map(([key, active]) => (
                <div 
                  key={key} 
                  onClick={() => toggleColumn(key as any)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', borderRadius: '16px', border: active ? '2px solid #5F7D4A' : '2px solid #F0F4ED',
                    background: active ? '#F0F4ED' : 'white', cursor: 'pointer', transition: 'all 0.2s', userSelect: 'none'
                  }}
                >
                   <div style={{ width: 18, height: 18, borderRadius: 6, border: '2px solid #5F7D4A', background: active ? '#5F7D4A' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {active && <div style={{ width: 8, height: 8, background: 'white', borderRadius: 2 }} />}
                   </div>
                   <span style={{ fontWeight: 900, fontSize: '0.8rem', color: active ? '#2D3A20' : '#B2AC88', textTransform: 'capitalize' }}>
                     {key.replace('_', ' ')}
                   </span>
                </div>
             ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
             <button 
               onClick={handleExportCSV}
               style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '1rem', background: '#5F7D4A', color: 'white', borderRadius: '16px', border: 'none', fontWeight: 1000, cursor: 'pointer' }}
             >
                <TableIcon size={20} /> DESCARGAR CSV
             </button>
             <button 
               onClick={() => alert('PDF report generating... (In progress)')}
               style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '1rem', background: '#2D3A20', color: 'white', borderRadius: '16px', border: 'none', fontWeight: 1000, cursor: 'pointer' }}
             >
                <FileText size={20} /> DESCARGAR PDF
             </button>
          </div>
       </div>
    </div>
  );
}
