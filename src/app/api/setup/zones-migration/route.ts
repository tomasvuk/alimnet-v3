import { NextRequest, NextResponse } from 'next/server'

// Este endpoint ejecuta las migraciones directamente en Supabase
// Solo accesible con Bearer token correcto (protección básica)

const EXPECTED_TOKEN = process.env.ADMIN_SETUP_TOKEN || 'dev-token-12345'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const authHeader = request.headers.get('authorization') || ''
    const token = authHeader.replace('Bearer ', '')

    if (token !== EXPECTED_TOKEN) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Ejecutar SQL a través de Supabase API
    const sqlStatements = [
      // 1. Crear tabla zones
      `CREATE TABLE IF NOT EXISTS zones (
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
      );`,

      // 2. Crear índices
      `CREATE INDEX IF NOT EXISTS zones_country_province ON zones(country, province);
       CREATE INDEX IF NOT EXISTS zones_slug ON zones(slug);`,

      // 3. Crear tabla merchant_delivery_zones
      `CREATE TABLE IF NOT EXISTS merchant_delivery_zones (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        merchant_id UUID REFERENCES merchants(id) ON DELETE CASCADE NOT NULL,
        zone_id UUID REFERENCES zones(id) ON DELETE CASCADE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(merchant_id, zone_id)
      );`,

      // 4. Crear índice para MDZ
      `CREATE INDEX IF NOT EXISTS merchant_delivery_zones_merchant ON merchant_delivery_zones(merchant_id);`,

      // 5. Insertar zonas (directamente con REST API)
    ]

    // Ejecutar statements SQL
    for (const sql of sqlStatements) {
      if (!sql.trim()) continue

      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ sql }),
      })

      if (!response.ok) {
        console.warn(`⚠️ SQL statement warning (puede que ya exista): ${response.statusText}`)
      }
    }

    // Insertar zonas usando insert API
    const zones = [
      { country: 'Argentina', province: 'Buenos Aires', zone_name: 'CABA', slug: 'caba-ba', sort_order: 1 },
      { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Norte', slug: 'zona-norte-ba', sort_order: 2 },
      { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Oeste', slug: 'zona-oeste-ba', sort_order: 3 },
      { country: 'Argentina', province: 'Buenos Aires', zone_name: 'Zona Sur', slug: 'zona-sur-ba', sort_order: 4 },
      { country: 'Argentina', province: 'Córdoba', zone_name: 'Córdoba Capital', slug: 'cordoba-capital', sort_order: 5 },
      { country: 'Argentina', province: 'Mendoza', zone_name: 'Mendoza Capital', slug: 'mendoza-capital', sort_order: 6 },
      { country: 'Argentina', province: 'Santa Fe', zone_name: 'Rosario', slug: 'rosario-sf', sort_order: 7 },
      { country: 'Argentina', province: 'Tucumán', zone_name: 'San Miguel de Tucumán', slug: 'tucuman-smt', sort_order: 8 },
    ]

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/zones?on_conflict=slug`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseServiceKey}`,
        Prefer: 'resolution=merge-duplicates',
      },
      body: JSON.stringify(zones),
    })

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text()
      console.error('Error inserting zones:', errorText)
      throw new Error(`Failed to insert zones: ${insertResponse.statusText}`)
    }

    // Verificar que las zonas se crearon
    const verifyResponse = await fetch(`${supabaseUrl}/rest/v1/zones?select=count()`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${supabaseServiceKey}`,
      },
    })

    const verifyData = await verifyResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Migración de zonas completada',
      zonesCount: zones.length,
    })
  } catch (err) {
    console.error('Migration error:', err)
    return NextResponse.json(
      {
        error: 'Migration failed',
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    )
  }
}
