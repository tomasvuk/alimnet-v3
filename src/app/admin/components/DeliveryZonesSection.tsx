'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface Zone {
  id: string;
  country: string;
  province?: string;
  zone_name: string;
  slug: string;
}

interface DeliveryZonesSectionProps {
  merchantId: string;
  initialText: string;
  initialZoneIds: string[];
  onTextChange: (text: string) => void;
  onZonesChange: (zoneIds: string[]) => void;
  availableZones: Zone[];
}

interface MatchResult {
  matched: Zone[];
  unmatched: string[];
  suggestions: { [key: string]: Zone[] };
}

export default function DeliveryZonesSection({
  merchantId,
  initialText,
  initialZoneIds,
  onTextChange,
  onZonesChange,
  availableZones,
}: DeliveryZonesSectionProps) {
  const [deliveryText, setDeliveryText] = useState(initialText);
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>(initialZoneIds);
  const [suggestedZones, setSuggestedZones] = useState<Zone[]>([]);
  const [matchLoading, setMatchLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [unmatched, setUnmatched] = useState<string[]>([]);

  const handleTextChange = useCallback(
    (value: string) => {
      setDeliveryText(value);
      onTextChange(value);
    },
    [onTextChange]
  );

  const triggerAutoMatch = useCallback(async () => {
    if (!deliveryText.trim()) return;

    setMatchLoading(true);
    try {
      const response = await fetch('/api/admin/match-zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: deliveryText, country: 'Argentina' }),
      });

      if (!response.ok) throw new Error('Failed to match zones');

      const result: MatchResult = await response.json();
      setSuggestedZones(result.matched);
      setUnmatched(result.unmatched);

      // Auto-apply suggested zones
      const newZoneIds = result.matched.map(z => z.id);
      setSelectedZoneIds(prev => {
        const combined = new Set([...prev, ...newZoneIds]);
        return Array.from(combined);
      });

      setShowSuggestions(true);
    } catch (err) {
      console.error('Auto-match error:', err);
    } finally {
      setMatchLoading(false);
    }
  }, [deliveryText]);

  const toggleZone = useCallback(
    (zoneId: string) => {
      setSelectedZoneIds(prev => {
        const updated = prev.includes(zoneId)
          ? prev.filter(id => id !== zoneId)
          : [...prev, zoneId];
        onZonesChange(updated);
        return updated;
      });
    },
    [onZonesChange]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {/* Sección de Texto Libre */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666' }}>
          Zonas de Entrega (Descripción)
        </label>
        <textarea
          value={deliveryText}
          onChange={e => handleTextChange(e.target.value)}
          placeholder="Ej: CABA, Zona Norte, Zona Oeste · Lunes a viernes 9-18hs"
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '10px 12px',
            fontSize: '0.9rem',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
        <button
          onClick={triggerAutoMatch}
          disabled={matchLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.8rem',
            fontWeight: '600',
            backgroundColor: '#5F7D4A',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: matchLoading ? 'not-allowed' : 'pointer',
            opacity: matchLoading ? 0.6 : 1,
            alignSelf: 'flex-start',
          }}
        >
          <Sparkles size={14} />
          {matchLoading ? 'Buscando...' : 'Auto-detectar zonas'}
        </button>
      </div>

      {/* Sección de Checkboxes de Zonas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666' }}>
          Zonas del Sistema (Selecciona todas las que apliquen)
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '0.6rem',
            padding: '0.8rem',
            backgroundColor: '#f9fafb',
            borderRadius: '6px',
            border: '1px solid #e5e7eb',
          }}
        >
          {availableZones.map(zone => (
            <label
              key={zone.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              <input
                type="checkbox"
                checked={selectedZoneIds.includes(zone.id)}
                onChange={() => toggleZone(zone.id)}
                style={{ cursor: 'pointer' }}
              />
              <span>{zone.zone_name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Feedback: Zonas no encontradas */}
      {showSuggestions && unmatched.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            padding: '0.8rem',
            backgroundColor: '#FEF3C7',
            border: '1px solid #FCD34D',
            borderRadius: '6px',
            fontSize: '0.85rem',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0, color: '#D97706' }} />
          <div>
            <strong>⚠️ No encontradas:</strong> {unmatched.join(', ')}
            <br />
            <span style={{ fontSize: '0.75rem', color: '#666' }}>
              Edita el texto o selecciona manualmente de las opciones arriba
            </span>
          </div>
        </div>
      )}

      {/* Feedback: Zonas sugeridas aplicadas */}
      {showSuggestions && suggestedZones.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            padding: '0.8rem',
            backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0',
            borderRadius: '6px',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ color: '#10B981', fontWeight: '600' }}>✅ Zonas detectadas:</span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {suggestedZones.map(z => (
              <span
                key={z.id}
                style={{
                  padding: '0.2rem 0.6rem',
                  backgroundColor: '#D1FAE5',
                  borderRadius: '3px',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                }}
              >
                {z.zone_name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
