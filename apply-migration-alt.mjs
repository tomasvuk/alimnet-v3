import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Faltan credenciales de Supabase');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function applyMigration() {
  console.log('📝 Leyendo archivo de migración...');

  const migrationFile = new URL('../supabase/migrations/20260502_merchant_review_and_tag_categories.sql', import.meta.url);
  let sql = fs.readFileSync(migrationFile, 'utf-8');

  // Dividir en statements individuales
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));

  console.log(`📋 ${statements.length} statements encontrados\n`);

  for (const [i, stmt] of statements.entries()) {
    try {
      console.log(`⏳ [${i + 1}/${statements.length}] Ejecutando...`);

      const { error } = await supabase.rpc('sql_execute', { sql: stmt });

      if (error) {
        // Algunos Supabase projects no tienen sql_execute RPC
        // Intentar via REST si es posible
        throw error;
      }

      console.log(`✅ OK\n`);
    } catch (error) {
      console.error(`❌ Error: ${error.message}\n`);
    }
  }

  // Verificar tabla creada
  console.log('\n🔍 Verificando...');
  try {
    const { data, error } = await supabase
      .from('tag_categories')
      .select('*');

    if (error) throw error;
    console.log(`✅ tag_categories tabla existe con ${data.length} categorías`);
  } catch (e) {
    console.error(`⚠️  No se pudo verificar: ${e.message}`);
    console.error('\n💡 La tabla puede haberse creado igual. Verifica en Supabase Dashboard.');
  }
}

applyMigration();
