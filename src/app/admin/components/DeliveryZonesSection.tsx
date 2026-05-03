'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

interface Zone {
  id: string;
  country: string;
  province?: string;
  district?: string;
  locality?: string;
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

export default function DeliveryZonesSection({
  merchantId,
  initialText,
  initialZoneIds,
  onTextChange,
  onZonesChange,
  availableZones,
}: DeliveryZonesSectionProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('Argentina');
  const [selectedProvinces, setSelectedProvinces] = useState<Set<string>>(new Set());
  const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>(initialZoneIds);

  // Get unique countries from available zones
  const countries = useMemo(() => {
    const uniqueCountries = new Set(availableZones.map(z => z.country));
    return Array.from(uniqueCountries).sort();
  }, [availableZones]);

  // Get provinces for selected country
  const provinces = useMemo(() => {
    return availableZones
      .filter(z => z.country === selectedCountry)
      .map(z => z.province || '')
      .filter((p, i, arr) => p && arr.indexOf(p) === i)
      .sort();
  }, [selectedCountry, availableZones]);

  // Get zones for selected provinces
  const zonesForSelectedProvinces = useMemo(() => {
    return availableZones.filter(
      z => z.country === selectedCountry && selectedProvinces.has(z.province || '')
    );
  }, [selectedCountry, selectedProvinces, availableZones]);

  const toggleProvince = (province: string) => {
    const newProvinces = new Set(selectedProvinces);
    if (newProvinces.has(province)) {
      newProvinces.delete(province);
      // Also remove zones from this province
      const zonesToRemove = availableZones
        .filter(z => z.country === selectedCountry && z.province === province)
        .map(z => z.id);
      setSelectedZoneIds(prev => prev.filter(id => !zonesToRemove.includes(id)));
    } else {
      newProvinces.add(province);
    }
    setSelectedProvinces(newProvinces);
  };

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
      {/* País selector */}
      {countries.length > 1 && (
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '4px' }}>
            País
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedProvinces(new Set());
              setSelectedZoneIds([]);
              onZonesChange([]);
            }}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {/* Provincia selector */}
      {provinces.length > 0 && (
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '4px' }}>
            Provincias (selecciona una o más)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {provinces.map(prov => (
              <label key={prov} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={selectedProvinces.has(prov)}
                  onChange={() => toggleProvince(prov)}
                  style={{ cursor: 'pointer' }}
                />
                {prov}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Zonas checkboxes */}
      {zonesForSelectedProvinces.length > 0 && (
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#666', display: 'block', marginBottom: '4px' }}>
            Zonas de Entrega (selecciona todas las que apliquen)
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
            {zonesForSelectedProvinces.map(zone => (
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
      )}

      {/* Info message */}
      {selectedProvinces.size === 0 && (
        <div style={{ fontSize: '0.85rem', color: '#999', fontStyle: 'italic', padding: '0.8rem', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          Selecciona una provincia para ver sus zonas de entrega disponibles
        </div>
      )}
    </div>
  );
}
