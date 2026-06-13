'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Save, AlertCircle, Check, Eye } from 'lucide-react';

interface Template {
  subject: string;
  body: string;
}

const TEMPLATE_LABELS: Record<string, string> = {
  recommendation_received: '1. Recomendación Recibida (Agradecimiento + Proceso de Admisión)',
  recommendation_approved: '2. Recomendación Aprobada (Felicitaciones + Publicado)',
};

export default function EmailsTab() {
  const [templates, setTemplates] = useState<Record<string, Template>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('recommendation_received');
  
  // Form fields
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  
  // Status feedback
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch templates
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/emails');
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
        if (data[selectedId]) {
          setSubject(data[selectedId].subject);
          setBody(data[selectedId].body);
        }
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Update form fields when selected template changes
  useEffect(() => {
    if (templates[selectedId]) {
      setSubject(templates[selectedId].subject);
      setBody(templates[selectedId].body);
    }
  }, [selectedId, templates]);

  const handleSave = async () => {
    setSaving(true);
    setAlert(null);
    try {
      const res = await fetch('/api/admin/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedId, subject, body }),
      });
      if (res.ok) {
        const data = await res.json();
        setAlert({ type: 'success', message: data.message || 'Plantilla guardada con éxito' });
        // Update local state
        setTemplates(prev => ({
          ...prev,
          [selectedId]: { subject, body }
        }));
      } else {
        const data = await res.json();
        setAlert({ type: 'error', message: data.error || 'Error al guardar la plantilla' });
      }
    } catch (err: any) {
      setAlert({ type: 'error', message: err.message || 'Error de conexión' });
    } finally {
      setSaving(false);
    }
  };

  // Helper to render live preview HTML
  const getPreviewHtml = () => {
    // 1. Replace variables
    let text = body;
    const vars = {
      userName: 'Mariano',
      merchantName: 'Almacen Natural Coni',
      merchantId: 'ca33884a-c644-492f-b260-6822879beb31',
    };
    Object.entries(vars).forEach(([key, val]) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), val);
    });

    // 2. Format basic markdown bolding
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 3. Line breaks
    const paragraphs = text.split('\n\n');
    const formattedParagraphs = paragraphs.map(p => {
      const withBrs = p.replace(/\n/g, '<br />');
      return `<p style="color: #4b5563; font-size: 14px; line-height: 22px; margin-bottom: 12px; margin-top: 0;">${withBrs}</p>`;
    });

    const bodyHtml = formattedParagraphs.join('');
    const buttonText = selectedId === 'recommendation_received' ? 'Ver el Mapa de Alimnet' : 'Ver Almacen Natural Coni en el Mapa';
    
    return `
      <div style="background-color: #f6f9fc; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; padding: 20px 10px; border-radius: 12px;">
        <div style="background-color: #ffffff; margin: 0 auto; padding: 30px; border-radius: 12px; max-width: 500px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          ${bodyHtml}
          <div style="text-align: center; margin: 24px 0;">
            <a style="background-color: #5F7D4A; border-radius: 8px; color: #fff; font-size: 14px; font-weight: bold; text-decoration: none; padding: 12px 24px; display: inline-block;" href="#">
              ${buttonText}
            </a>
          </div>
        </div>
      </div>
    `;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: '#5F7D4A', fontWeight: 900 }}>
        Cargando plantillas...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', fontFamily: 'system-ui' }}>
      
      {/* Alert toast */}
      {alert && (
        <div style={{
          padding: '1.2rem', borderRadius: '18px',
          background: alert.type === 'error' ? '#FFF2F2' : '#F0F4ED',
          color: alert.type === 'error' ? '#D32F2F' : '#5F7D4A',
          border: `1px solid ${alert.type === 'error' ? '#FFDADA' : '#E4EBDD'}`,
          display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '800', fontSize: '0.9rem'
        }}>
          {alert.type === 'error' ? <AlertCircle size={20} /> : <Check size={20} />}
          {alert.message}
        </div>
      )}

      {/* Editor Grid layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Left Side: Fields Editor */}
        <div style={{ background: 'white', border: '1px solid #E4EBDD', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Seleccionar Plantilla</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '0.95rem', outline: 'none', fontWeight: '800', color: '#2D3A20' }}
            >
              {Object.keys(TEMPLATE_LABELS).map(id => (
                <option key={id} value={id}>{TEMPLATE_LABELS[id]}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Asunto del Email</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ej: ¡Recibimos tu recomendación!"
              style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '0.95rem', outline: 'none', fontWeight: '700', color: '#2D3A20' }}
            />
            <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '6px', fontWeight: '600' }}>💡 Tip: Podés usar <code>{"{{merchantName}}"}</code> para incluir el nombre del comercio automáticamente.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '1000', color: '#2D3A20', marginBottom: '0.6rem', textTransform: 'uppercase' }}>Cuerpo del Email (Texto / Markdown básico)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #F0F4ED', background: '#F8F9F5', fontSize: '0.95rem', outline: 'none', fontWeight: '600', color: '#2D3A20', lineHeight: '1.6', fontFamily: 'monospace', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.7rem', color: '#888', marginTop: '6px', fontWeight: '600' }}>
              <span>💡 Variables disponibles: <code>{"{{userName}}"}</code> (Nombre del vecino), <code>{"{{merchantName}}"}</code> (Nombre del comercio).</span>
              <span>💡 Formato: Usá dos saltos de línea para separar párrafos y <code>**texto**</code> para poner en negrita.</span>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '1rem', borderRadius: '16px', border: 'none',
              background: '#5F7D4A', color: 'white', fontWeight: '1000', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              cursor: 'pointer', boxShadow: '0 8px 15px rgba(95, 125, 74, 0.15)',
              transition: 'all 0.2s', marginTop: '0.5rem'
            }}
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

        {/* Right Side: Live Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2D3A20' }}>
            <Eye size={18} />
            <h3 style={{ margin: 0, fontSize: '0.85rem', fontWeight: '1000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vista Previa en Tiempo Real</h3>
          </div>
          
          <div style={{ background: 'white', border: '1px solid #E4EBDD', padding: '1.5rem', borderRadius: '24px', minHeight: '350px' }}>
            {/* Subject display */}
            <div style={{ borderBottom: '1px solid #F0F4ED', paddingBottom: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '1000', color: '#888', textTransform: 'uppercase' }}>Asunto:</span>
              <div style={{ fontSize: '0.95rem', fontWeight: '1000', color: '#2D3A20', marginTop: '4px' }}>
                {subject.replace(/{{merchantName}}/g, 'Almacen Natural Coni')}
              </div>
            </div>

            {/* Body iframe rendering */}
            <iframe
              title="live-preview"
              srcDoc={getPreviewHtml()}
              style={{ border: 'none', width: '100%', minHeight: '400px', borderRadius: '12px' }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
