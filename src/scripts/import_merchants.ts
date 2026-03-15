import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

function getSimilarity(s1: string, s2: string): number {
  const set1 = new Set(s1.toLowerCase().split(/\s+/))
  const set2 = new Set(s2.toLowerCase().split(/\s+/))
  const intersection = new Set([...set1].filter(x => set2.has(x)))
  const union = new Set([...set1, ...set2])
  return intersection.size / union.size
}

const RAW_DATA = [
  { name: 'Huerta Madre', city_zone: 'Pilar y Zona Norte', category: 'Productor', lat: -34.4586, lng: -58.9142, ig: 'huertamadre' },
  { name: 'Genjibre Orgánico', city_zone: 'Pilar, Benavidez, Nordelta', category: 'Productor', lat: -34.4586, lng: -58.9142, ig: 'genjibreorganico' },
  { name: 'Como Siempre Orgánico', city_zone: 'Pilar, Campana, Zarate', category: 'Productor', lat: -34.4586, lng: -58.9142, ig: 'comosiempreorganico' },
  { name: 'Amaranto Cooperativas', city_zone: 'Pilar, Campana, Zarate', category: 'Productor', lat: -34.4586, lng: -58.9142, ig: 'amaranto.coop' },
  { name: 'Germinar ONG', city_zone: 'San Fernando', category: 'Productor', lat: -34.4447, lng: -58.5411, ig: 'germinarong' },
  { name: 'Almacén Nuevo Mundo', city_zone: 'Boulogne', category: 'Restaurante', lat: -34.4914, lng: -58.5628, ig: 'almacen_nuevomundo' },
  // ... Este script es una demostración de la lógica de ubicación flexible
]

async function importMerchants() {
  console.log('📦 DATA ENTRY AGENT: Procesando ingesta con ubicaciones flexibles...')

  // 1. Obtener comerciantes existentes (desde la nueva tabla merchants)
  const { data: existingMerchants } = await supabase.from('merchants').select('name')
  
  for (const item of RAW_DATA) {
    let isDuplicate = false
    
    if (existingMerchants) {
      for (const existing of existingMerchants) {
        const similarity = getSimilarity(item.name, existing.name)
        if (similarity >= 0.7) {
          console.warn(`⚠️ BLOQUEADO POR DUPLICADO: "${item.name}" coincide con "${existing.name}".`)
          isDuplicate = true
          break
        }
      }
    }
    
    if (!isDuplicate) {
      // A. Insertar en Merchants
      const { data: merchant, error: mError } = await supabase
        .from('merchants')
        .insert({
          name: item.name,
          type: item.category,
          instagram_url: `https://instagram.com/${item.ig}`,
          status: 'active',
          bio_short: `${item.name} es un proyecto de ${item.category} en ${item.city_zone}.`
        })
        .select()
        .single()

      if (mError) {
        console.error(`❌ Error al crear comerciante ${item.name}:`, mError.message)
        continue
      }

      // B. Insertar Ubicación Primaria
      const { error: lError } = await supabase
        .from('locations')
        .insert({
          merchant_id: merchant.id,
          locality: item.city_zone,
          lat: item.lat,
          lng: item.lng,
          location_type: 'fixed',
          is_primary: true
        })

      if (lError) {
        console.error(`❌ Error al crear ubicación para ${item.name}:`, lError.message)
      } else {
        console.log(`✅ ${item.name} importado exitosamente con su ubicación.`)
      }
    }
  }
}

importMerchants()
