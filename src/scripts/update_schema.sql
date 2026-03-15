-- 1. ACTUALIZAR TABLA DE PERFILES
alter table profiles 
add column if not exists last_name text,
add column if not exists locality text,
add column if not exists district text, -- Partido
add column if not exists province text,
add column if not exists country text default 'Argentina',
add column if not exists address text,
add column if not exists phone text,
add column if not exists birth_date date,
add column if not exists dietary_type text, -- 'omnivoro', 'vegetariano', 'vegano', 'keto'
add column if not exists intolerances jsonb, -- ['sin gluten', 'sin lactosa']
add column if not exists preferences jsonb, -- ['agroecologico', 'organico']
add column if not exists is_public boolean default true;

-- 2. ACTUALIZAR TABLA DE PRODUCTORES (COMERCIANTES)
alter table providers 
add column if not exists last_name_owner text, -- Para trazabilidad
add column if not exists instagram_url text,
add column if not exists website_url text,
add column if not exists phone text,
add column if not exists address text, -- Dirección física si la hay
add column if not exists city_zone text, -- Ej: "Pilar", "Ramos Mejía"
add column if not exists is_exact_location boolean default false,
add column if not exists coverage_radius integer, -- en km
add column if not exists business_hours jsonb,
add column if not exists tags jsonb, -- ['verduras', 'agroecologico']
add column if not exists validation_count integer default 0;

-- 3. TABLA DE VALIDACIONES (NUEVA)
create table if not exists validations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  merchant_id uuid references providers(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, merchant_id) -- Un usuario valida una vez a cada comerciante
);

-- Habilitar RLS para la nueva tabla
alter table validations enable row level security;
create policy "Lectura pública de validaciones" on validations for select using (true);
create policy "Usuarios pueden validar" on validations for insert with check (auth.uid() = user_id);
