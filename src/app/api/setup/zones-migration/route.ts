import { NextRequest, NextResponse } from 'next/server'

const EXPECTED_TOKEN = process.env.ADMIN_SETUP_TOKEN || 'dev-token-12345'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') || ''
    const token = authHeader.replace('Bearer ', '')

    if (token !== EXPECTED_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Missing config:', { supabaseUrl: !!supabaseUrl, supabaseAnonKey: !!supabaseAnonKey });
      return NextResponse.json(
        { error: 'Server configuration error - missing Supabase credentials', details: 'Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 500 }
      )
    }

    // Ejecutar SQL statements usando el endpoint /rest/v1/rpc/new (forma antigua)
    // o directamente con el admin API de Supabase si disponible

    const sqlScript = `
      -- Crear tabla zones si no existe
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

      CREATE INDEX IF NOT EXISTS zones_country_province ON zones(country, province);
      CREATE INDEX IF NOT EXISTS zones_slug ON zones(slug);

      -- Crear tabla merchant_delivery_zones
      CREATE TABLE IF NOT EXISTS merchant_delivery_zones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        merchant_id UUID NOT NULL REFERENCES merchants(id) ON DELETE CASCADE,
        zone_id UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(merchant_id, zone_id)
      );

      CREATE INDEX IF NOT EXISTS merchant_delivery_zones_merchant ON merchant_delivery_zones(merchant_id);

      -- RLS
      ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
      ALTER TABLE merchant_delivery_zones ENABLE ROW LEVEL SECURITY;

      CREATE POLICY IF NOT EXISTS "zones_read_all" ON zones FOR SELECT USING (true);
      CREATE POLICY IF NOT EXISTS "mdz_read_all" ON merchant_delivery_zones FOR SELECT USING (true);
    `;

    // Las tablas deben crearse manualmente en Supabase SQL Editor.
    // Este endpoint solo inserta las zonas si las tablas ya existen.
    // Si las tablas no existen, la inserción fallará y dará un error claro.
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

    console.log('Insertando zonas...');
    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/zones?on_conflict=slug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(zones),
    });

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text();
      console.error('Insert error status:', insertResponse.status);
      console.error('Insert error text:', errorText);

      if (errorText.includes('relation "zones" does not exist') || errorText.includes('zones') || errorText.includes('permission')) {
        throw new Error('Las tablas de zonas no existen o no hay permisos. Verifica que el SQL se ejecutó correctamente en Supabase SQL Editor.');
      }

      throw new Error(`Error al insertar zonas (${insertResponse.status}): ${errorText}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Migración de zonas completada',
      zonesCount: zones.length,
    });
  } catch (err) {
    console.error('Migration error:', err);
    return NextResponse.json(
      {
        error: 'Migration failed',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
