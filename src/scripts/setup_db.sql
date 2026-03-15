-- ALIMNET DATABASE SCHEMA (MVP v2) - FLEXIBLE LOCATIONS

-- 1. EXTENSIONES
create extension if not exists "uuid-ossp";

-- 2. TABLA DE PERFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text,
  last_name text,
  locality text,
  district text,
  province text,
  country text default 'Argentina',
  visibility text default 'public',
  dietary_type text,
  intolerances jsonb default '[]'::jsonb,
  preferences jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABLA DE COMERCIANTES (Identidad)
create table if not exists public.merchants (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  type text not null, -- 'Productor', 'Proveedor', 'Restaurante', 'Chef'
  bio_short text,
  bio_long text,
  email text,
  website_url text,
  instagram_url text,
  status text default 'active',
  tags jsonb default '[]'::jsonb,
  validation_count integer default 0,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TABLA DE UBICACIONES (Geografía Flexible)
create table if not exists public.locations (
  id uuid default uuid_generate_v4() primary key,
  merchant_id uuid references public.merchants(id) on delete cascade not null,
  location_type text not null default 'fixed', -- 'fixed' (local), 'delivery' (punto entrega), 'zone' (área)
  address text,
  locality text,
  district text,
  province text,
  lat float8 not null,
  lng float8 not null,
  coverage_radius integer default 0, -- radio en km si es zona
  is_primary boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. TABLA DE VALIDACIONES
create table if not exists public.validations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  merchant_id uuid references public.merchants(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, merchant_id)
);

-- RLS (Habilitado para todos)
alter table public.profiles enable row level security;
alter table public.merchants enable row level security;
alter table public.locations enable row level security;
alter table public.validations enable row level security;

-- Políticas de lectura
create policy "Lectura pública perfiles" on public.profiles for select using (true);
create policy "Lectura pública comerciantes" on public.merchants for select using (status = 'active');
create policy "Lectura pública ubicaciones" on public.locations for select using (true);
create policy "Usuarios editan su perfil" on public.profiles for update using (auth.uid() = id);

-- Trigger para contador de validaciones
create or replace function public.update_merchant_validation_count()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    update public.merchants set validation_count = validation_count + 1 where id = NEW.merchant_id;
  elsif (TG_OP = 'DELETE') then
    update public.merchants set validation_count = validation_count - 1 where id = OLD.merchant_id;
  end if;
  return null;
end;
$$ language plpgsql security definer;

create trigger on_validation_change
after insert or delete on public.validations
for each row execute function public.update_merchant_validation_count();
