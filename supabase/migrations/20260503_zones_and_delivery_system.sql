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

create index zones_country_province on zones(country, province);
create index zones_slug on zones(slug);

-- Tabla de vinculación: qué zonas atiende cada comercio
create table if not exists merchant_delivery_zones (
  id uuid primary key default gen_random_uuid(),
  merchant_id uuid references merchants(id) on delete cascade not null,
  zone_id uuid references zones(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(merchant_id, zone_id)
);

create index merchant_delivery_zones_merchant on merchant_delivery_zones(merchant_id);

-- Nuevo campo en merchants para texto de entregas (público)
alter table merchants
  add column if not exists delivery_info text default '';

-- RLS: zones - todos leen, solo admins escriben
alter table zones enable row level security;

create policy "zones_read_all" on zones for select using (true);
create policy "zones_admin_write" on zones for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- RLS: merchant_delivery_zones - todos leen, owner/admin escriben
alter table merchant_delivery_zones enable row level security;

create policy "mdz_read_all" on merchant_delivery_zones for select using (true);
create policy "mdz_write_owner_or_admin" on merchant_delivery_zones for all using (
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
