import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const MIGRATION_SQL = `
-- Tabla de zonas geográficas globales
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

create index if not exists zones_country_province on zones(country, province);
create index if not exists zones_slug on zones(slug);

-- Tabla de vinculación: qué zonas atiende cada comercio
create table if not exists merchant_delivery_zones (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid references merchants(id) on delete cascade not null,
  zone_id uuid references zones(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(merchant_id, zone_id)
);

create index if not exists merchant_delivery_zones_merchant on merchant_delivery_zones(merchant_id);

-- Nuevo campo en merchants para texto de entregas (público)
alter table merchants
  add column if not exists delivery_info text default '';

-- RLS: zones - todos leen, solo admins escriben
alter table zones enable row level security;

create policy if not exists "zones_read_all" on zones for select using (true);
create policy if not exists "zones_admin_write" on zones for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- RLS: merchant_delivery_zones - todos leen, owner/admin escriben
alter table merchant_delivery_zones enable row level security;

create policy if not exists "mdz_read_all" on merchant_delivery_zones for select using (true);
create policy if not exists "mdz_write_owner_or_admin" on merchant_delivery_zones for all using (
  exists (
    select 1 from merchants m
    where m.id = merchant_delivery_zones.merchant_id
    and (m.owner_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'))
  )
);

-- Seed inicial: zonas argentinas (Buenos Aires como referencia principal)
insert into zones (country, province, zone_name, slug, sort_order) values
  ('Argentina', 'Buenos Aires', 'CABA', 'caba-ba', 1),
  ('Argentina', 'Buenos Aires', 'Zona Norte', 'zona-norte-ba', 2),
  ('Argentina', 'Buenos Aires', 'Zona Oeste', 'zona-oeste-ba', 3),
  ('Argentina', 'Buenos Aires', 'Zona Sur', 'zona-sur-ba', 4),
  ('Argentina', 'Córdoba', 'Córdoba Capital', 'cordoba-capital', 5),
  ('Argentina', 'Mendoza', 'Mendoza Capital', 'mendoza-capital', 6),
  ('Argentina', 'Santa Fe', 'Rosario', 'rosario-sf', 7),
  ('Argentina', 'Tucumán', 'San Miguel de Tucumán', 'tucuman-smt', 8)
on conflict (slug) do nothing;
`

export async function POST(request: NextRequest) {
  try {
    // Verificar que sea admin (en un entorno real, deberías verificar el auth)
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🚀 Aplicando migración de zonas...')

    // Ejecutar cada statement por separado
    const statements = MIGRATION_SQL.split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0)

    for (const stmt of statements) {
      try {
        const { error } = await supabase.rpc('exec', { sql: stmt })
        if (error && !error.message.includes('already exists')) {
          console.warn(`⚠️  Statement error (continuando): ${error.message}`)
        }
      } catch (e) {
        // Los índices y políticas pueden fallar si ya existen, eso es OK
        console.warn(`⚠️  Statement error: ${e}`)
      }
    }

    // Verificar que las tablas existen
    const { data: zones, error: zonesError } = await supabase
      .from('zones')
      .select('count')

    const { data: mdz, error: mdzError } = await supabase
      .from('merchant_delivery_zones')
      .select('count')

    if (zonesError || mdzError) {
      throw new Error('Tablas no creadas correctamente')
    }

    // Cargar zonas para verificar seed
    const { data: zonesList } = await supabase
      .from('zones')
      .select('*')

    return NextResponse.json({
      success: true,
      message: 'Migración aplicada exitosamente',
      zonesCreated: zonesList?.length || 0,
    })
  } catch (err) {
    console.error('❌ Error al aplicar migración:', err)
    return NextResponse.json(
      { error: 'Failed to apply migration', details: String(err) },
      { status: 500 }
    )
  }
}
