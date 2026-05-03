import { createClient } from '@supabase/supabase-js'

export interface Zone {
  id: string
  country: string
  province?: string
  district?: string
  locality?: string
  zone_name: string
  slug: string
  parent_zone_id?: string
  gmaps_place_id?: string
  sort_order: number
}

let zonesCache: Zone[] | null = null
let cacheTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos

export async function getZones(country?: string): Promise<Zone[]> {
  const now = Date.now()

  if (zonesCache && now - cacheTime < CACHE_DURATION) {
    return country
      ? zonesCache.filter(z => z.country === country)
      : zonesCache
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials missing')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('zones')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error

    zonesCache = data as Zone[]
    cacheTime = now

    return country
      ? (zonesCache || []).filter(z => z.country === country)
      : zonesCache || []
  } catch (err) {
    console.error('Error loading zones:', err)
    return []
  }
}

export async function getZonesByCountry(country: string): Promise<Zone[]> {
  return getZones(country)
}

export function clearZonesCache() {
  zonesCache = null
  cacheTime = 0
}
