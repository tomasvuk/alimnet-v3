import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const COORDS: any = {
  'pilar': { lat: -34.4586, lng: -58.9142 },
  'tigre': { lat: -34.4251, lng: -58.5796 },
  'san_isidro': { lat: -34.4719, lng: -58.5278 },
  'san_fernando': { lat: -34.4447, lng: -58.5411 },
  'vicente_lopez': { lat: -34.5218, lng: -58.4831 },
  'ramos_mejia': { lat: -34.6461, lng: -58.5255 },
  'moron': { lat: -34.6517, lng: -58.6225 },
  'san_justo': { lat: -34.6775, lng: -58.5636 },
  'florencio_varela': { lat: -34.8239, lng: -58.2758 },
  'avellaneda': { lat: -34.6611, lng: -58.3669 },
  'quilmes': { lat: -34.7246, lng: -58.2526 },
  'cordoba': { lat: -31.4135, lng: -64.1811 },
  'santa_fe': { lat: -31.6333, lng: -60.7000 },
  'rosario': { lat: -32.9468, lng: -60.6393 },
  'trevelin': { lat: -43.0853, lng: -71.4633 },
  'gualeguaychu': { lat: -33.0102, lng: -58.5172 },
  'san_miguel': { lat: -34.5433, lng: -58.7122 },
  'bella_vista': { lat: -34.5667, lng: -58.6833 },
  'adrogue': { lat: -34.8011, lng: -58.3908 },
  'boulogne': { lat: -34.4914, lng: -58.5628 },
  'villa_ballester': { lat: -34.5489, lng: -58.5539 },
  'martinez': { lat: -34.4947, lng: -58.5114 },
  'beccar': { lat: -34.4594, lng: -58.5303 },
  'munro': { lat: -34.5325, lng: -58.5233 },
  'olivos': { lat: -34.5064, lng: -58.4844 },
  'florida': { lat: -34.5372, lng: -58.4878 },
  'nuñez': { lat: -34.5461, lng: -58.4633 },
  'belgrano': { lat: -34.5621, lng: -58.4556 },
  'palermo': { lat: -34.5883, lng: -58.4306 },
}

async function seedFull() {
  console.log('🚀 Iniciando carga masiva EXHAUSTIVA desde Excel...')

  const rawMerchants = [
    // IMAGEN 1 & 2: ZONA NORTE / OESTE
    { name: 'Huerta Madre', city_zone: 'Pilar y Zona Norte', instagram_url: 'https://www.instagram.com/huertamadre/', website_url: 'huertamadre.com', category: 'productor', region: 'Zona Norte', ...COORDS.pilar },
    { name: 'Genjibre Orgánico', city_zone: 'Pilar, Benavidez, Nordelta', instagram_url: 'https://www.instagram.com/genjibreorganico/', category: 'productor', region: 'Zona Norte', ...COORDS.pilar },
    { name: 'Como Siempre Orgánico', city_zone: 'Pilar, Campana, Zarate', instagram_url: 'https://www.instagram.com/comosiempreorganico/', category: 'productor', region: 'Zona Norte', ...COORDS.pilar },
    { name: 'Amaranto Cooperativas', city_zone: 'Pilar, Campana, Zarate', instagram_url: 'https://www.instagram.com/amaranto.coop/', website_url: 'amaranto.ml', category: 'productor', region: 'Zona Norte', ...COORDS.pilar },
    { name: 'Germinar ONG', city_zone: 'San Fernando', instagram_url: 'https://www.instagram.com/germinarong/', category: 'productor', region: 'Zona Norte', ...COORDS.san_fernando },
    { name: 'La Proveeduría Orgánica', city_zone: 'San Isidro y Alrededores', instagram_url: 'https://www.instagram.com/laproveeduriaorganica/', phone: '11 6008-7347', category: 'productor', region: 'Zona Norte', ...COORDS.san_isidro },
    { name: 'Alas de Tigre', city_zone: 'Tigre', instagram_url: 'https://www.instagram.com/alas_de_tigre/', category: 'productor', region: 'Zona Norte', ...COORDS.tigre },
    { name: 'Huerta Grande', city_zone: 'Tigre, San Fernando', instagram_url: 'https://www.instagram.com/huerta.grande/', phone: '1140457369', category: 'productor', region: 'Zona Norte', ...COORDS.tigre },
    { name: 'Medallon Vegetariano', city_zone: 'Tortuguitas', instagram_url: 'https://www.instagram.com/medallonvegetariano/', phone: '11 3557 5142', category: 'almacen', region: 'Zona Norte', lat: -34.4758, lng: -58.7456 },
    { name: 'Come bien BA', city_zone: 'V. Lopez, San Isidro, Tigre', instagram_url: 'https://www.instagram.com/comebienba/', phone: '11 6558-1710', category: 'almacen', region: 'Zona Norte', ...COORDS.vicente_lopez },
    { name: 'Caracoles y Hormigas', city_zone: 'Villa Adelina, Maschwitz', instagram_url: 'https://www.instagram.com/caracolesyhormigas/', category: 'productor', region: 'Zona Norte', lat: -34.5126, lng: -58.5441 },
    { name: 'Ayni Cocina', city_zone: 'Villa Ballester', instagram_url: 'https://www.instagram.com/ayni_cocina/', phone: '11 5322-7151', category: 'restaurante', region: 'Zona Norte', ...COORDS.villa_ballester },
    { name: 'La Isla Florida', city_zone: 'Villa Martelli', instagram_url: 'https://instagram.com/laislaflorida/', phone: '1161503097', category: 'almacen', region: 'Zona Norte', lat: -34.5484, lng: -58.4981 },
    { name: 'Almacén Ciruela', city_zone: 'Bella Vista, Muñiz, San Miguel', instagram_url: 'https://www.instagram.com/almacenciruela/', category: 'almacen', region: 'Zona Norte', ...COORDS.san_miguel },
    { name: 'De Bio Market', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/debiomarket/', category: 'almacen', region: 'Zona Norte', ...COORDS.beccar },
    { name: 'Huerta la Anunciación', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/huertalaanunciacion/', category: 'productor', region: 'Zona Norte', lat: -34.9205, lng: -57.9545 },
    { name: 'Red Rizoma', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/redrizoma/', category: 'productor', region: 'Varias', ...COORDS.palermo },
    { name: 'Nuestra Tierra Orgánicos', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/nuestratierraorganicos/', category: 'productor', region: 'Zona Norte', ...COORDS.olivos },
    { name: 'El Solaz', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/elsolaz/', phone: '11 4417-2311', category: 'productor', region: 'Zona Norte', ...COORDS.san_isidro },
    { name: 'Monteverde', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/monteverdeverdu/', phone: '11 3424-5233', category: 'productor', region: 'Zona Norte', ...COORDS.beccar },

    // ZONA OESTE
    { name: 'BioPandora Mercado Agroecológico', city_zone: 'Ramos Mejia, Haedo, Moron', instagram_url: 'https://www.instagram.com/bio.pandora/', website_url: 'biopandora.com.ar', category: 'almacen', region: 'Zona Oeste', ...COORDS.ramos_mejia },
    { name: 'Demeter Alimento Vital', city_zone: 'Bellavista, Muñiz, San Miguel', instagram_url: 'https://www.instagram.com/demeter.alimentovital/', category: 'productor', region: 'Zona Norte', ...COORDS.bella_vista },
    { name: 'El Almacen Orgánico', city_zone: 'Bellavista, San Miguel', instagram_url: 'https://www.instagram.com/elalmacenorganico/', category: 'almacen', region: 'Zona Norte', ...COORDS.bella_vista },
    { name: 'Sikkim Orgánico', city_zone: 'Castelar, Ituzaingó, Ramos', instagram_url: 'https://www.instagram.com/sikkim.organico/', phone: '1521791201', category: 'productor', region: 'Zona Oeste', lat: -34.6601, lng: -58.6432 },
    { name: 'En Respeto con la Naturaleza', city_zone: 'Ciudad Evita', instagram_url: 'https://www.instagram.com/enrespetoconlanaturaleza/', phone: '11 7369-3206', category: 'productor', region: 'Zona Oeste', lat: -34.7225, lng: -58.5342 },
    { name: 'Eres lo que comes', city_zone: 'De Ramos Mejia hasta Moreno', instagram_url: 'https://www.instagram.com/almacen_eresloquecomes/', website_url: 'eresloquecomes.com.ar', category: 'almacen', region: 'Zona Oeste', ...COORDS.ramos_mejia },
    { name: 'MadreSol', city_zone: 'Ramos Mejia / Ciudadela', instagram_url: 'https://www.instagram.com/madresol_organica/', phone: '1139026360', category: 'productor', region: 'Zona Oeste', ...COORDS.ramos_mejia },
    { name: 'Mercado Transformador', city_zone: 'Ramos Mejia, Haedo, Moron +Varios', instagram_url: 'https://www.instagram.com/mercadotransformador/', website_url: 'mercadotransformador.com', category: 'almacen', region: 'Zona Oeste', ...COORDS.ramos_mejia },
    { name: 'Morón Surco', city_zone: 'Morón', instagram_url: 'https://www.facebook.com/moron.surco.9/', category: 'productor', region: 'Zona Oeste', ...COORDS.moron },

    // ZONA SUR
    { name: 'Agro Primavera', city_zone: 'Florencio Varela', instagram_url: 'https://www.instagram.com/agroprimavera/', phone: '1169346341', category: 'productor', region: 'Zona Sur', ...COORDS.florencio_varela },
    { name: 'Feria Sustentable del Sur', city_zone: 'Adrogué', instagram_url: 'https://www.instagram.com/feriasustentabledelsur/', category: 'productor', region: 'Zona Sur', ...COORDS.adrogue },
    { name: 'Chavo Pastel', city_zone: 'Avellaneda', instagram_url: 'https://www.instagram.com/chavopastel/', category: 'almacen', region: 'Zona Sur', ...COORDS.avellaneda },
    { name: 'Del Campo a la Mesa Brown', city_zone: 'Almirante Brown y toda zona sur', instagram_url: 'https://www.instagram.com/delcampoalamesabrown/', category: 'productor', region: 'Zona Sur', lat: -34.8239, lng: -58.3917 },
    { name: 'Brota Orgánico', city_zone: 'Banfield', instagram_url: 'https://www.instagram.com/brotaorganico/', category: 'productor', region: 'Zona Sur', lat: -34.7431, lng: -58.3962 },
    { name: 'Huerta Trujillo', city_zone: 'El Pato / Berazategui', instagram_url: 'https://www.instagram.com/huerta_trujillo.06/', category: 'productor', region: 'Zona Sur', lat: -34.8812, lng: -58.1925 },
    { name: 'Red Conciencia en el Sur', city_zone: 'Ezeiza', instagram_url: 'https://www.instagram.com/red_conciencia_enelsur/', category: 'productor', region: 'Zona Sur', lat: -34.8532, lng: -58.5204 },

    // CHUBUT / CORDOBA / SANTA FE / TUCUMAN
    { name: 'Alimentos con el Alma', city_zone: 'Rawson, Gaiman, Trevelin, Pto Madryn', instagram_url: 'https://www.instagram.com/alimentos_con_alma/', category: 'productor', region: 'Chubut', ...COORDS.trevelin },
    { name: 'Mercado de la Tierra Amboy', city_zone: 'Amboy', instagram_url: 'https://www.instagram.com/mercadodelatierra.amboy/', category: 'productor', region: 'Cordoba', ...COORDS.cordoba },
    { name: 'Yuyupa Córdoba', city_zone: 'Arguello', instagram_url: 'https://www.instagram.com/yuyupa_cordoba/', category: 'productor', region: 'Cordoba', ...COORDS.cordoba },
    { name: 'Feria Agroecológica CBA', city_zone: 'Córdoba Capital', instagram_url: 'https://www.instagram.com/feriaagroecologicacba/', category: 'productor', region: 'Cordoba', ...COORDS.cordoba },
    { name: 'Y otras yerbas', city_zone: 'Córdoba', instagram_url: 'https://www.instagram.com/_y_otras_yerbas/', phone: '351 701-2770', category: 'almacen', region: 'Cordoba', ...COORDS.cordoba },
    { name: 'Paisano Almancen', city_zone: 'CBA - Barrio Alta Córdoba', instagram_url: 'https://www.instagram.com/paisanoalmacen/', phone: '3513165968', category: 'almacen', region: 'Cordoba', ...COORDS.cordoba },
    { name: 'El Campito Huerta', city_zone: 'Arroyo Seco y zona', instagram_url: 'https://www.instagram.com/el.campito.huerta/', phone: '3402 552-723', category: 'productor', region: 'Santa Fe', ...COORDS.santa_fe },
    { name: 'Broagroecológico', city_zone: 'Esperanza', instagram_url: 'https://www.instagram.com/broagroecologico/', phone: '3496400062', category: 'productor', region: 'Santa Fe', ...COORDS.santa_fe },
    { name: 'Dulces del Jardín', city_zone: 'Rosario, Funes, Roldán', instagram_url: 'https://www.instagram.com/dulcesdeljardinenfunes/', category: 'productor', region: 'Santa Fe', ...COORDS.rosario },
    { name: 'Vitalia Almacen Natural', city_zone: 'Rosario y Gran Rosario', instagram_url: 'https://www.instagram.com/vitalia_almacennatural/', phone: '341 509-0914', category: 'almacen', region: 'Santa Fe', ...COORDS.rosario },
    { name: 'Mercadito Agroecológico Tucuman', city_zone: 'Yerba Buena', instagram_url: 'https://www.instagram.com/mercaditoagroecologicotuc/', category: 'productor', region: 'Tucuman', lat: -26.8167, lng: -65.3167 },
    
    // FALTANTES IDENTIFICADOS
    { name: 'Almacén Nuevo Mundo', city_zone: 'Boulogne', instagram_url: 'https://www.instagram.com/almacen_nuevomundo/', category: 'almacen', region: 'Zona Norte', ...COORDS.boulogne },
  ]

  // Borramos los anteriores para evitar duplicados en el seed
  const { error: deleteError } = await supabase
    .from('providers')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Borra todo

  if (deleteError) {
    console.error('❌ Error limpiando tabla:', deleteError)
  }

  const cleanMerchants = rawMerchants.map((m: any) => ({
    name: m.name,
    city_zone: m.city_zone,
    instagram_url: m.instagram_url,
    website_url: m.website_url,
    phone: m.phone,
    category: m.category,
    status: 'approved',
    is_exact_location: false,
    location_lat: m.lat || -34.6037,
    location_lng: m.lng || -58.3816,
    bio: `Proyecto de alimentos cuidados en ${m.region || 'Argentina'}. Cobertura en ${m.city_zone}.`
  }))

  const { data, error } = await supabase
    .from('providers')
    .insert(cleanMerchants)

  if (error) {
    console.error('❌ Error en la carga masiva:', error)
  } else {
    console.log('✅ CARGA COMPLETA:', rawMerchants.length, 'productores creados y mapeados correctamente.')
  }
}

seedFull()
