import React from 'react';
import ContactDropdown from './ContactDropdown';

const COLUMNS = [
  { id: 'sin_contacto', label: 'Sin Contacto', color: '#9CA3AF' },
  { id: 'contactado', label: 'Contactado', color: '#3B82F6' },
  { id: 'en_proceso', label: 'En Proceso', color: '#F59E0B' },
  { id: 'oficializado', label: 'Oficializado', color: '#10B981' },
  { id: 'negado', label: 'Negado', color: '#EF4444' }
];

export default function CrmBoard({ merchants, crmTemplate, updateContactStatus }: { merchants: any[], crmTemplate: string, updateContactStatus: (id: string, status: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', minHeight: '60vh' }} className="no-scrollbar">
      {COLUMNS.map(col => {
        const columnMerchants = merchants.filter(m => (m.contact_status || 'sin_contacto') === col.id);
        
        return (
          <div key={col.id} style={{ flex: '0 0 320px', background: '#F8F9F5', borderRadius: '16px', border: '1px solid #E4EBDD', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '2px solid #E4EBDD', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#2D3A20', margin: 0 }}>{col.label}</h3>
              <span style={{ background: col.color, color: 'white', fontSize: '0.75rem', fontWeight: 900, padding: '2px 8px', borderRadius: '12px' }}>{columnMerchants.length}</span>
            </div>
            
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
              {columnMerchants.map(m => {
                const claimLink = `https://alimnet.com/explorar?id=${m.id}`;
                const message = crmTemplate.replace('{{LINK}}', claimLink);

                return (
                  <div key={m.id} style={{ background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #E4EBDD', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontWeight: 900, color: '#2D3A20', marginBottom: '4px' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginBottom: '12px' }}>{m.type} • {m.locations?.[0]?.locality || 'Sin localidad'}</div>
                    
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', flexWrap: 'wrap' }}>
                      <ContactDropdown merchant={m} platform="wzp" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                      <ContactDropdown merchant={m} platform="ig" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                      <ContactDropdown merchant={m} platform="email" messageTemplate={message} onUpdateStatus={() => updateContactStatus(m.id, 'contactado')} />
                    </div>

                    <select 
                      value={m.contact_status || 'sin_contacto'} 
                      onChange={(e) => updateContactStatus(m.id, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '8px', border: '1px solid #E4EBDD', fontSize: '0.75rem', fontWeight: 800, color: '#666', background: '#F8F9F5' }}
                    >
                      {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label.toUpperCase()}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
