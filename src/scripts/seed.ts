import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seed() {
    console.log('🌱 Insertando datos de prueba...')

    const testProviders = [
        {
            name: 'La Huerta Orgánica',
            bio: 'Vegetales frescos cosechados en el día, sin agrotóxicos.',
            category: 'productor',
            location_lat: -34.5833,
            location_lng: -58.4333,
            status: 'approved'
        },
        {
            name: 'Pan Masa Madre Real',
            bio: 'Panadería artesanal con fermentación natural de 48hs.',
            category: 'almacen',
            location_lat: -34.5911,
            location_lng: -58.4111,
            status: 'approved'
        },
        {
            name: 'Chef Eco Gourmet',
            bio: 'Experiencias gastronómicas privadas con productos de estación.',
            category: 'chef',
            location_lat: -34.6037,
            location_lng: -58.3816,
            status: 'pending'
        }
    ]

    const { data, error } = await supabase
        .from('providers')
        .insert(testProviders)
        .select()

    if (error) {
        console.error('❌ Error al insertar datos:', error)
    } else {
        console.log('✅ Datos insertados correctamente:', data.length, 'productores creados.')
    }
}

seed()
