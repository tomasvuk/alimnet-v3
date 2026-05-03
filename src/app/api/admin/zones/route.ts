import { NextRequest, NextResponse } from 'next/server'
import { getZones } from '@/lib/zones'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const country = url.searchParams.get('country') || 'Argentina'

    const zones = await getZones(country)
    return NextResponse.json(zones)
  } catch (err) {
    console.error('zones api error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
