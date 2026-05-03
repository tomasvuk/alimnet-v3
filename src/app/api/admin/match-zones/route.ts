import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

interface Zone {
  id: string
  country: string
  province?: string
  zone_name: string
  slug: string
}

interface MatchResult {
  matched: Zone[]
  unmatched: string[]
  suggestions: { [key: string]: Zone[] }
}

async function geocodeLocation(query: string): Promise<any> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${googleMapsApiKey}`
    )
    const data = await response.json()
    return data.results?.[0] || null
  } catch (err) {
    console.error('Geocoding error:', err)
    return null
  }
}

function extractAdminAreas(geoResult: any): {
  country?: string
  province?: string
  district?: string
} {
  const components = geoResult?.address_components || []
  const result: any = {}

  for (const comp of components) {
    if (comp.types.includes('country')) {
      result.country = comp.long_name
    }
    if (comp.types.includes('administrative_area_level_1')) {
      result.province = comp.long_name
    }
    if (comp.types.includes('administrative_area_level_2')) {
      result.district = comp.long_name
    }
  }

  return result
}

async function matchZonesToInput(
  textInput: string,
  country: string = 'Argentina'
): Promise<MatchResult> {
  // Dividir input en snippets (separados por coma, "y", etc.)
  const snippets = textInput
    .split(/[,;y\/]/)
    .map(s => s.trim().toLowerCase())
    .filter(s => s.length > 0)

  // Cargar zonas de la BD
  const { data: zones, error } = await supabase
    .from('zones')
    .select('id, country, province, zone_name, slug')

  if (error || !zones) {
    console.error('Error loading zones:', error)
    return { matched: [], unmatched: snippets, suggestions: {} }
  }

  const matched: Zone[] = []
  const unmatched: string[] = []
  const suggestions: { [key: string]: Zone[] } = {}

  for (const snippet of snippets) {
    // Primero: búsqueda exacta en zona_name o slug
    const exactMatch = zones.find(
      z =>
        z.zone_name.toLowerCase() === snippet ||
        z.slug.toLowerCase() === snippet ||
        z.zone_name.toLowerCase().includes(snippet)
    )

    if (exactMatch) {
      if (!matched.some(m => m.id === exactMatch.id)) {
        matched.push(exactMatch as Zone)
      }
      continue
    }

    // Segundo: geocodificar el snippet con gmaps
    const geoResult = await geocodeLocation(`${snippet}, Argentina`)
    if (geoResult) {
      const { province, district, country: geoCountry } = extractAdminAreas(geoResult)

      // Buscar zonas que coincidan con los componentes geográficos
      const potentialMatches = zones.filter(
        z =>
          (z.country === geoCountry || z.country === 'Argentina') &&
          (z.province === province ||
            z.province === district ||
            z.zone_name.toLowerCase().includes(snippet))
      )

      if (potentialMatches.length > 0) {
        matched.push(...potentialMatches.filter(m => !matched.some(x => x.id === m.id)))
      } else {
        unmatched.push(snippet)
        suggestions[snippet] = zones
          .filter(z => z.country === 'Argentina')
          .filter(z => z.zone_name.toLowerCase().includes(snippet.split(' ')[0]))
      }
    } else {
      unmatched.push(snippet)
    }
  }

  return { matched, unmatched, suggestions }
}

export async function POST(request: NextRequest) {
  try {
    const { text, country = 'Argentina' } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'text field is required' },
        { status: 400 }
      )
    }

    const result = await matchZonesToInput(text, country)
    return NextResponse.json(result)
  } catch (err) {
    console.error('match-zones error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
