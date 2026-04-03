import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const googleMapsKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function geocode(address: string) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsKey}`
  const res = await fetch(url)
  const data: any = await res.json()
  if (data.status === 'OK') {
    const { lat, lng } = data.results[0].geometry.location
    return { lat, lng }
  }
  return null
}

async function run() {
  console.log('🌎 INICIANDO RESCATE DE COMERCIOS: GEOLOCALIZACIÓN PROFUNDA...')
  
  const { data: locations, error } = await supabase
    .from('locations')
    .select('id, address, locality, lat, lng, province')

  if (error) {
    console.error('❌ Error al obtener ubicaciones:', error)
    return
  }

  console.log(`🔍 Encontradas ${locations.length} ubicaciones para procesar.`)

  for (const loc of locations) {
    // Armamos la consulta para Google
    const fullQuery = [loc.address, loc.locality, loc.province, 'Argentina']
      .filter(Boolean)
      .join(', ')

    // Evitamos re-procesar si ya es "exacto" (esto es opcional, pero mejor refrescar todo una vez)
    console.log(`📍 Procesando: ${fullQuery}...`)
    
    const coords = await geocode(fullQuery)
    if (coords) {
      const { error: updateError } = await supabase
        .from('locations')
        .update({ lat: coords.lat, lng: coords.lng })
        .eq('id', loc.id)

      if (updateError) {
        console.error(`❌ Error al actualizar ${loc.id}:`, updateError.message)
      } else {
        console.log(`✅ [COORDENADAS] ${coords.lat}, ${coords.lng}`)
      }
    } else {
      console.warn(`⚠️ [FALLO] No se pudo geolocalizar: ${fullQuery}`)
    }
    
    // Respetamos los límites de la API de Google
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  console.log('✨ RESCATE COMPLETADO. Mapas limpios y exactos.')
}

run()
