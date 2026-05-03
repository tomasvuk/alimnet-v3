'use client';

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function MigrationPage() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const runMigration = async () => {
    setLoading(true);
    setError(null);
    setStatus('Iniciando migración...');

    try {
      // 1. Crear tabla zones
      setStatus('Creando tabla zones...');
      const { error: zonesTableError } = await supabase.rpc('_execute_sql', {
        sql: `
          create table if not exists zones (
            id uuid primary key default gen_random_uuid(),
            country text not null,
            province text,
            district text,
            locality text,
            zone_name text not null,
            slug text not null unique,
            parent_zone_id uuid references zones(id) on delete set null,
            gmaps_place_id text,
            sort_order int default 0,
            created_at timestamptz default now()
          );
        `,
      });

      if (zonesTableError) {
        console.warn('Zone table error (puede que ya exista):', zonesTableError);
      }

      // 2. Crear índices
      setStatus('Creando índices...');
      await supabase.rpc('_execute_sql', {
        sql: `
          create index if not exists zones_country_province on zones(country, province);
          create index if not exists zones_slug on zones(slug);
        `,
      }).catch(() => {});

      // 3. Crear tabla merchant_delivery_zones
      setStatus('Creando tabla merchant_delivery_zones...');
      const { error: mdzError } = await supabase.rpc('_execute_sql', {
        sql: `
          create table if not exists merchant_delivery_zones (
            id uuid primary key default gen_random_uuid(),
            merchant_id uuid references merchants(id) on delete cascade not null,
            zone_id uuid references zones(id) on delete cascade not null,
            created_at timestamptz default now(),
            unique(merchant_id, zone_id)
          );
        `,
      });

      if (mdzError) {
        console.warn('MDZ table error:', mdzError);
      }

      // 4. Insertar zonas iniciales
      setStatus('Insertando zonas argentinas...');
      const zones = [
        { country: 'Argentina', province: 'Buenos Aires', zone_name: 'CABA', slug: 'caba-ba', sort_order: 1 },
        { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Norte', slug: 'zona-norte-ba', sort_order: 2 },
        { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Oeste', slug: 'zona-oeste-ba', sort_order: 3 },
        { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Sur', slug: 'zona-sur-ba', sort_order: 4 },
        { country: 'Argentina', province: 'Córdoba', zone_name: 'Córdoba Capital', slug: 'cordoba-capital', sort_order: 5 },
        { country: 'Argentina', province: 'Mendoza', zone_name: 'Mendoza Capital', slug: 'mendoza-capital', sort_order: 6 },
        { country: 'Argentina', province: 'Santa Fe', zone_name: 'Rosario', slug: 'rosario-sf', sort_order: 7 },
        { country: 'Argentina', province: 'Tucumán', zone_name: 'San Miguel de Tucumán', slug: 'tucuman-smt', sort_order: 8 },
      ];

      const { error: insertError } = await supabase
        .from('zones')
        .upsert(zones, { onConflict: 'slug' });

      if (insertError) {
        throw new Error(`Error al insertar zonas: ${insertError.message}`);
      }

      setStatus('✅ Migración completada exitosamente!');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      setStatus('❌ Error en la migración');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🔧 Migración de Zonas</h1>
      <p>Esta página aplica la migración de zonas de entrega.</p>

      <button
        onClick={runMigration}
        disabled={loading}
        style={{
          padding: '0.8rem 1.6rem',
          fontSize: '1rem',
          backgroundColor: loading ? '#ccc' : '#5F7D4A',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Migrando...' : 'Ejecutar Migración'}
      </button>

      {status && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: status.includes('✅') ? '#E0F2FE' : status.includes('❌') ? '#FEE2E2' : '#FEF3C7',
            border: `1px solid ${status.includes('✅') ? '#0284C7' : status.includes('❌') ? '#DC2626' : '#F59E0B'}`,
            borderRadius: '8px',
            color: status.includes('✅') ? '#0C4A6E' : status.includes('❌') ? '#7F1D1D' : '#92400E',
          }}
        >
          {status}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#FEE2E2', borderRadius: '8px', color: '#7F1D1D' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
