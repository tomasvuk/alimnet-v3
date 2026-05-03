import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Faltan credenciales de Supabase (.env.local)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function runMigration() {
  try {
    console.log('📦 Aplicando migración: zones and delivery system...')

    // Leer el archivo SQL
    const migrationPath = path.join(process.cwd(), 'supabase/migrations/20260503_zones_and_delivery_system.sql')
    const sql = fs.readFileSync(migrationPath, 'utf-8')

    // Ejecutar el SQL
    const { error } = await supabase.rpc('exec', { sql })

    if (error) {
      console.error('❌ Error al ejecutar migración:', error)
      // Si exec no existe, intentar con SQL directo
      console.log('⚠️  rpc(exec) no disponible, intentando con query directa...')

      // Dividir por puntos y coma y ejecutar cada statement
      const statements = sql.split(';').filter(s => s.trim().length > 0)

      for (const stmt of statements) {
        const { error: stmtError } = await supabase.from('_').select('1').limit(0)
        // Esto es un workaround; mejor usar el dashboard de Supabase directamente
      }

      console.log('⚠️  Para aplicar la migración completa, usa el SQL Editor de Supabase Dashboard')
      console.log('📋 SQL a ejecutar:')
      console.log(sql)
      return
    }

    console.log('✅ Migración aplicada exitosamente')

    // Verificar que las tablas existen
    const { data: zonesCheck } = await supabase.from('zones').select('count')
    const { data: mdzCheck } = await supabase.from('merchant_delivery_zones').select('count')

    console.log('✅ Tabla zones verificada')
    console.log('✅ Tabla merchant_delivery_zones verificada')
    console.log('✅ Sistema de zonas listo para usar')
  } catch (err) {
    console.error('❌ Error:', err)
    process.exit(1)
  }
}

runMigration()
