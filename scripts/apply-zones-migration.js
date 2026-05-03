#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createZonesTable() {
  console.log('📦 Creando tabla zones...');
  const { error } = await supabase.rpc('exec', {
    query: `
      CREATE TABLE IF NOT EXISTS zones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        country TEXT NOT NULL,
        province TEXT,
        district TEXT,
        locality TEXT,
        zone_name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        parent_zone_id UUID REFERENCES zones(id) ON DELETE SET NULL,
        gmaps_place_id TEXT,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `
  });
  if (error) console.warn('⚠️ zones table:', error.message);
}

async function createMDZTable() {
  console.log('📦 Creando tabla merchant_delivery_zones...');
  const { error } = await supabase.rpc('exec', {
    query: `
      CREATE TABLE IF NOT EXISTS merchant_delivery_zones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE NOT NULL,
        zone_id UUID REFERENCES zones(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(merchant_id, zone_id)
      );
    `
  });
  if (error) console.warn('⚠️ merchant_delivery_zones table:', error.message);
}

async function insertZones() {
  console.log('📍 Insertando zonas argentinas...');
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

  const { error, data } = await supabase
    .from('zones')
    .upsert(zones, { onConflict: 'slug' });

  if (error) {
    console.error('❌ Error insertando zonas:', error.message);
    return false;
  }

  console.log(`✅ ${zones.length} zonas insertadas`);
  return true;
}

async function main() {
  try {
    console.log('🚀 Iniciando migración de zonas...\n');

    // Intenta crear las tablas (puede fallar si ya existen, eso es OK)
    await createZonesTable();
    await createMDZTable();

    // Inserta las zonas (esto debería funcionar siempre)
    const success = await insertZones();

    if (success) {
      console.log('\n✅ ¡Migración completada exitosamente!');
      console.log('📍 Las zonas están listas en la BD');
    } else {
      console.log('\n⚠️ Hubo un error, pero las tablas pueden estar creadas');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();
