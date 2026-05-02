#!/usr/bin/env node
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Faltan credenciales de Supabase en .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const migration = `
-- Nuevos campos en merchants para tracking de revisión
alter table merchants
  add column if not exists admin_reviewed boolean default false,
  add column if not exists review_no_changes boolean default false;

-- Tabla de categorías de tags editables desde el admin
create table if not exists tag_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  tags text[] not null default '{}',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- RLS: solo admins pueden modificar categorías
alter table tag_categories enable row level security;

create policy "tag_categories_read_all" on tag_categories for select using (true);
create policy "tag_categories_admin_write" on tag_categories for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Seed inicial con las categorías de constants.ts + nuevas del plan
insert into tag_categories (name, slug, tags, sort_order) values
  ('Productos', 'productos', array['Verduras','Frutas','Carne','Huevos','Lácteos','Panificados','Masa Madre','Cereales','Frutos secos','Aceites','Elaborados','Verdura congelada','Miel','Cerdo','Pollo','Pescado','Hierbas','Yuyos','Herboristería','Pastelería'], 1),
  ('Calidad y Producción', 'calidad', array['Agroecológico','Orgánico','Regenerativo','Sin agroquímicos','Sin ultraprocesados','Sustentable','Biodinámico','Biodinámica','Fitomedicina'], 2),
  ('Alimentación', 'alimentacion', array['Gluten Free','Sugar Free','Plant Based','Sin Lactosa','Keto','Vegetariano'], 3),
  ('Certificaciones', 'certificaciones', array['Demeter','AABDA','Orgánico Certificado'], 4),
  ('Modalidad de venta', 'modalidad', array['Retiro en local','Entrega a domicilio','Venta directa'], 5),
  ('Producción Animal', 'animal', array['Pastura','Grass-fed','Bienestar animal'], 6)
on conflict (slug) do nothing;
`;

async function applyMigration() {
  try {
    console.log('🔄 Aplicando migración...\n');

    const { error } = await supabase.rpc('exec', { sql: migration });

    if (error) {
      // Si el RPC no existe, intentar con query directo (algunas versiones de Supabase no tienen exec)
      const statements = migration.split(';').filter(s => s.trim());
      for (const stmt of statements) {
        if (!stmt.trim()) continue;
        const { error: stmtError } = await supabase.from('information_schema.tables').select('table_name').limit(0);
        // Solo probamos la conexión, luego ejecutamos via query
      }
      throw new Error(error.message);
    }

    console.log('✅ Migración aplicada exitosamente\n');

    // Verificar que la tabla se creó
    const { data, error: checkError } = await supabase
      .from('tag_categories')
      .select('*');

    if (checkError) {
      console.error('⚠️  Tabla creada pero no se pudo verificar:', checkError.message);
    } else {
      console.log(`✅ tag_categories tabla verificada (${data?.length || 0} categorías insertadas)`);
    }

  } catch (error) {
    console.error('❌ Error al aplicar migración:', error.message);
    console.error('\n💡 Nota: Si ves un error sobre "rpc" no definido, la migración puede haber fallado.');
    console.error('   Intenta aplicarla manualmente en Supabase SQL Editor (https://app.supabase.com)');
    process.exit(1);
  }
}

applyMigration();
