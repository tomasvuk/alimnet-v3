import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

interface Coord {
  lat: number;
  lng: number;
}

const COORDS: Record<string, Coord> = {
  'pilar': { lat: -34.4586, lng: -58.9142 },
  'tigre': { lat: -34.4251, lng: -58.5796 },
  'san_isidro': { lat: -34.4719, lng: -58.5278 },
  'san_fernando': { lat: -34.4447, lng: -58.5411 },
  'vicente_lopez': { lat: -34.5218, lng: -58.4831 },
  'ramos_mejia': { lat: -34.6461, lng: -58.5255 },
  'moron': { lat: -34.6517, lng: -58.6225 },
  'avellaneda': { lat: -34.6611, lng: -58.3669 },
  'cordoba': { lat: -31.4135, lng: -64.1811 },
  'santa_fe': { lat: -31.6333, lng: -60.7000 },
  'rosario': { lat: -32.9468, lng: -60.6393 },
  'trevelin': { lat: -43.0853, lng: -71.4633 },
  'adrogue': { lat: -34.8011, lng: -58.3908 },
  'villa_ballester': { lat: -34.5489, lng: -58.5539 },
  'caseros': { lat: -34.6069, lng: -58.5644 },
  'hurlingham': { lat: -34.5914, lng: -58.6358 },
  'ezeiza': { lat: -34.8532, lng: -58.5204 },
  'banfield': { lat: -34.7431, lng: -58.3962 },
  'tucuman': { lat: -26.8167, lng: -65.3167 },
  'san_juan': { lat: -31.5375, lng: -68.5364 },
  'san_luis': { lat: -33.3017, lng: -66.3378 },
  'rawson': { lat: -43.3002, lng: -65.1023 },
  'parana': { lat: -31.7333, lng: -60.5333 },
  'corrientes': { lat: -27.4692, lng: -58.8306 },
  'gualeguaychu': { lat: -33.0102, lng: -58.5172 },
}

async function seedMega() {
  console.log('🚀 Iniciando CARGA MEGA (~100 productores)...')

  const merchantsData = [
    { name: 'Huerta Madre', city_zone: 'Pilar y Zona Norte', instagram_url: 'https://www.instagram.com/huertamadre/', website_url: 'huertamadre.com', category: 'productor', ...COORDS.pilar },
    { name: 'Genjibre Orgánico', city_zone: 'Pilar, Benavidez, Nordelta', instagram_url: 'https://www.instagram.com/genjibreorganico/', category: 'productor', ...COORDS.pilar },
    { name: 'Como Siempre Orgánico', city_zone: 'Pilar, Campana, Zarate', instagram_url: 'https://www.instagram.com/comosiempreorganico/', category: 'productor', ...COORDS.pilar },
    { name: 'Amaranto Cooperativas', city_zone: 'Pilar, Campana, Zarate', instagram_url: 'https://www.instagram.com/amaranto.coop/', category: 'productor', ...COORDS.pilar },
    { name: 'Germinar ONG', city_zone: 'San Fernando', instagram_url: 'https://www.instagram.com/germinarong/', category: 'productor', ...COORDS.san_fernando },
    { name: 'La Proveeduría Orgánica', city_zone: 'San Isidro y Alrededores', instagram_url: 'https://www.instagram.com/laproveeduriaorganica/', phone: '11 6008-7347', category: 'productor', ...COORDS.san_isidro },
    { name: 'Alas de Tigre', city_zone: 'Tigre', instagram_url: 'https://www.instagram.com/alas_de_tigre/', category: 'productor', ...COORDS.tigre },
    { name: 'Huerta Grande', city_zone: 'Tigre, San Fernando', instagram_url: 'https://www.instagram.com/huerta.grande/', phone: '1140457369', category: 'productor', ...COORDS.tigre },
    { name: 'Medallon Vegetariano', city_zone: 'Tortuguitas', instagram_url: 'https://www.instagram.com/medallonvegetariano/', phone: '11 3557 5142', category: 'productor', lat: -34.4758, lng: -58.7456 },
    { name: 'Come bien BA', city_zone: 'V. Lopez, San Isidro, Tigre', instagram_url: 'https://www.instagram.com/comebienba/', phone: '11 6558-1710', category: 'almacen', ...COORDS.vicente_lopez },
    { name: 'Caracoles y Hormigas', city_zone: 'Villa Adelina, Maschwitz', instagram_url: 'https://www.instagram.com/caracolesyhormigas/', category: 'productor', lat: -34.5126, lng: -58.5441 },
    { name: 'Ayni Cocina', city_zone: 'Villa Ballester', instagram_url: 'https://www.instagram.com/ayni_cocina/', phone: '11 5322-7151', category: 'restaurante', ...COORDS.villa_ballester },
    { name: 'La Isla Florida', city_zone: 'Villa Martelli', instagram_url: 'https://instagram.com/laislaflorida/', phone: '1161503097', category: 'almacen', lat: -34.5484, lng: -58.4981 },
    { name: 'Almacén Ciruela', city_zone: 'Bella Vista, Muñiz, San Miguel', instagram_url: 'https://www.instagram.com/almacenciruela/', category: 'almacen', lat: -34.5433, lng: -58.7122 },
    { name: 'De Bio Market', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/debiomarket/', category: 'almacen', ...COORDS.vicente_lopez },
    { name: 'Huerta la Anunciación', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/huertalaanunciacion/', category: 'productor', lat: -34.9205, lng: -57.9545 },
    { name: 'Red Rizoma', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/redrizoma/', category: 'productor', lat: -34.5883, lng: -58.4306 },
    { name: 'Nuestra Tierra Orgánicos', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/nuestratierraorganicos/', category: 'productor', lat: -34.5064, lng: -58.4844 },
    { name: 'El Solaz', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/elsolaz/', phone: '11 4417-2311', category: 'productor', ...COORDS.san_isidro },
    { name: 'Monteverde', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/monteverdeverdu/', phone: '11 3424-5233', category: 'productor', lat: -34.4594, lng: -58.5303 },
    { name: 'Tierra Organicos', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/tierraorganicos/', category: 'productor', ...COORDS.pilar },
    { name: 'Red Orgánica', city_zone: 'ver zonas en ig', instagram_url: 'https://www.instagram.com/redorganica/', category: 'productor', lat: -34.6037, lng: -58.3816 },
    { name: 'BioPandora Mercado Agroecológico', city_zone: 'Ramos Mejia, Moron, CABA', instagram_url: 'https://www.instagram.com/bio.pandora/', website_url: 'biopandora.com.ar', category: 'almacen', ...COORDS.ramos_mejia },
    { name: 'Demeter Alimento Vital', city_zone: 'Bellavista, San Miguel', instagram_url: 'https://www.instagram.com/demeter.alimentovital/', category: 'productor', lat: -34.5667, lng: -58.6833 },
    { name: 'El Almacen Orgánico', city_zone: 'Bellavista, San Miguel', instagram_url: 'https://www.instagram.com/elalmacenorganico/', category: 'almacen', lat: -34.5667, lng: -58.6833 },
    { name: 'Sikkim Orgánico', city_zone: 'Castelar, Ituzaingo, Ramos', instagram_url: 'https://www.instagram.com/sikkim.organico/', phone: '1521791201', category: 'productor', lat: -34.6601, lng: -58.6432 },
    { name: 'En Respeto con la Naturaleza', city_zone: 'Ciudad Evita', instagram_url: 'https://www.instagram.com/enrespetoconlanaturaleza/', phone: '11 7369-3206', category: 'productor', lat: -34.7225, lng: -58.5342 },
    { name: 'Eres lo que comes', city_zone: 'De Ramos Mejia hasta Moreno', instagram_url: 'https://www.instagram.com/almacen_eresloquecomes/', category: 'almacen', ...COORDS.ramos_mejia },
    { name: 'MadreSol', city_zone: 'Ramos Mejia / Ciudadela', instagram_url: 'https://www.instagram.com/madresol_organica/', phone: '1139026360', category: 'productor', ...COORDS.ramos_mejia },
    { name: 'Mercado Transformador', city_zone: 'Haedo, Moron, Liniers, Ramos', instagram_url: 'https://www.instagram.com/mercadotransformador/', website_url: 'mercadotransformador.com', category: 'almacen', ...COORDS.ramos_mejia },
    { name: 'Morón Surco', city_zone: 'Morón', instagram_url: 'https://www.facebook.com/moron.surco.9/', category: 'productor', ...COORDS.moron },
    { name: 'Cultivarte Orgánico', city_zone: 'Ramos Mejia', instagram_url: 'https://www.instagram.com/cultivarte_organico/', website_url: 'home.cultivarteorganico.com.ar', category: 'productor', ...COORDS.ramos_mejia },
    { name: 'Orgánico MyM', city_zone: 'San Justo, Ramos, Moron', instagram_url: 'https://www.instagram.com/organicomym/', category: 'productor', lat: -34.6775, lng: -58.5636 },
    { name: 'Agro Primavera', city_zone: 'Florencio Varela', instagram_url: 'https://www.instagram.com/agroprimavera/', phone: '1169346341', category: 'productor', lat: -34.8239, lng: -58.2758 },
    { name: 'Feria Sustentable del Sur', city_zone: 'Adrogué', instagram_url: 'https://www.instagram.com/feriasustentabledelsur/', category: 'productor', ...COORDS.adrogue },
    { name: 'Chavo Pastel', city_zone: 'Avellaneda', instagram_url: 'https://www.instagram.com/chavopastel/', category: 'almacen', ...COORDS.avellaneda },
    { name: 'Del Campo a la Mesa Brown', city_zone: 'Almirante Brown', instagram_url: 'https://www.instagram.com/delcampoalamesabrown/', category: 'productor', lat: -34.8239, lng: -58.3917 },
    { name: 'Brota Orgánico', city_zone: 'Banfield', instagram_url: 'https://www.instagram.com/brotaorganico/', category: 'productor', ...COORDS.banfield },
    { name: 'Huerta Trujillo', city_zone: 'El Pato / Berazategui', instagram_url: 'https://www.instagram.com/huerta_trujillo.06/', category: 'productor', lat: -34.8812, lng: -58.1925 },
    { name: 'Nodo de la UTT Gutierrez', city_zone: 'Berazategui', instagram_url: 'https://www.instagram.com/nodo.utt.gutierrez/', category: 'productor', lat: -34.8519, lng: -58.2044 },
    { name: 'Reverdecer Ecotienda Saludable', city_zone: 'Bernal, Quilmes', instagram_url: 'https://www.instagram.com/reverdecer.ecotiendasaludable/', category: 'almacen', lat: -34.7081, lng: -58.2811 },
    { name: 'Red Conciencia en el Sur', city_zone: 'Ezeiza', instagram_url: 'https://www.instagram.com/red_conciencia_enelsur/', category: 'productor', ...COORDS.ezeiza },
    { name: 'El Patio de las Rosas', city_zone: 'Lomas de Zamora', instagram_url: 'https://www.instagram.com/elpatiodelasrosas/', category: 'productor', lat: -34.7578, lng: -58.4042 },
    { name: 'Verdores Almacén Vivero', city_zone: 'Lomas de Zamora', instagram_url: 'https://www.instagram.com/verdores.almacen.vivero/', category: 'almacen', lat: -34.7578, lng: -58.4042 },
    { name: 'Alimentos con el Alma', city_zone: 'Rawson, Trevelin, Madryn', instagram_url: 'https://www.instagram.com/alimentos_con_alma/', category: 'productor', ...COORDS.trevelin },
    { name: 'Mercado de la Tierra Amboy', city_zone: 'Amboy', instagram_url: 'https://www.instagram.com/mercadodelatierra.amboy/', category: 'productor', ...COORDS.cordoba },
    { name: 'Yuyupa Córdoba', city_zone: 'Arguello', instagram_url: 'https://www.instagram.com/yuyupa_cordoba/', category: 'productor', ...COORDS.cordoba },
    { name: 'Bioterra Orgánicos', city_zone: 'Arroyito', instagram_url: 'https://www.instagram.com/bioterra.organicos/', phone: '3576 65-1776', category: 'productor', ...COORDS.cordoba },
    { name: 'Feria Agroecológica CBA', city_zone: 'Córdoba Capital', instagram_url: 'https://www.instagram.com/feriaagroecologicacba/', category: 'productor', ...COORDS.cordoba },
    { name: 'Gratiam Orgánicos', city_zone: 'Córdoba Capital', instagram_url: 'https://www.instagram.com/organicos_gratiam/', category: 'productor', ...COORDS.cordoba },
    { name: 'Orgánicos de mi tierra', city_zone: 'Córdoba Capital', instagram_url: 'https://facebook.com/organicosdemitierra', category: 'productor', ...COORDS.cordoba },
    { name: 'Y otras yerbas', city_zone: 'Córdoba', instagram_url: 'https://www.instagram.com/_y_otras_yerbas/', phone: '351 701-2770', category: 'almacen', ...COORDS.cordoba },
    { name: 'Paisano Almancen', city_zone: 'Barrio Alta Córdoba', instagram_url: 'https://www.instagram.com/paisanoalmacen/', phone: '3513165968', category: 'almacen', ...COORDS.cordoba },
    { name: 'ramona mercado autogestivo', city_zone: 'Barrio Güemes', instagram_url: 'https://www.instagram.com/ramonamercadoautogestivo/', category: 'almacen', ...COORDS.cordoba },
    { name: 'Wahe Guru Sustentable', city_zone: 'Embalse', instagram_url: 'https://www.instagram.com/waheguru.sustentable/', category: 'productor', ...COORDS.cordoba },
    { name: 'Destino Verdes', city_zone: 'Los Reartes', instagram_url: 'https://www.instagram.com/destinoverdes/', category: 'productor', ...COORDS.cordoba },
    { name: 'Reina Mora', city_zone: 'Nono, Traslasierra', instagram_url: 'https://www.instagram.com/reina.mora.natural/', category: 'productor', ...COORDS.cordoba },
    { name: 'Valle Sagrado Chacra Agroecológica', city_zone: 'Potrero de Garay', instagram_url: 'https://www.instagram.com/vallesagrado_chacraagroecologic/', category: 'productor', ...COORDS.cordoba },
    { name: 'Productor Lucamaría', city_zone: 'Rio Segundo, Pilar, Oncativo', instagram_url: 'https://www.instagram.com/productorlucamaria/', phone: '351 226-5403', category: 'productor', ...COORDS.cordoba },
    { name: 'Huerta Las Abejas', city_zone: 'Valle de Punilla', instagram_url: 'https://www.instagram.com/huerta_las_abejas/', category: 'productor', ...COORDS.cordoba },
    { name: 'Mascabo Organico', city_zone: 'Villa Allende', instagram_url: 'https://www.instagram.com/mascaborganicos/', phone: '3512410852', category: 'productor', ...COORDS.cordoba },
    { name: 'All Natural VGB', city_zone: 'Villa General Belgrano', instagram_url: 'https://www.instagram.com/allnaturalvgb/', category: 'productor', ...COORDS.cordoba },
    { name: 'Feria Agroecológica VGB', city_zone: 'Villa General Belgrano', instagram_url: 'https://www.instagram.com/feriaagroecologicavgb/', category: 'productor', ...COORDS.cordoba },
    { name: 'De La Pacha Huerto', city_zone: 'Villa María', instagram_url: 'https://www.instagram.com/delapachahuerto/', category: 'productor', ...COORDS.cordoba },
    { name: 'Subtropical Vivarium', city_zone: 'Corrientes', instagram_url: 'https://www.instagram.com/subtropical_vivarium/', category: 'productor', ...COORDS.corrientes },
    { name: 'Naturveda Corrientes', city_zone: 'Corrientes', instagram_url: 'https://www.instagram.com/naturvedacorrientes/', category: 'productor', ...COORDS.corrientes },
    { name: 'Cooperativa Agroecológica yvy Maraney', city_zone: 'Corrientes', instagram_url: 'https://www.instagram.com/coop_agroecologica_yvy_maraney/', category: 'productor', ...COORDS.corrientes },
    { name: 'Skinny Waffles Gualeguaychu', city_zone: 'Gualeguaychu', instagram_url: 'https://www.instagram.com/skinnywafflesgualeguaychu/', category: 'almacen', ...COORDS.gualeguaychu },
    { name: 'Alimenta Paraná', city_zone: 'Paraná', instagram_url: 'https://www.instagram.com/alimentaparana/', category: 'productor', ...COORDS.parana },
    { name: 'Vive la Huerta Trevelin', city_zone: 'Trevelin', instagram_url: 'https://www.instagram.com/vive_la_huerta_trevelin/', category: 'productor', ...COORDS.trevelin },
    { name: 'Colectivo Agroecologico', city_zone: 'Viedma', instagram_url: 'https://www.instagram.com/colectivoagroecologico/', category: 'productor', lat: -40.8135, lng: -62.9961 },
    { name: 'Granja Tía Nora', city_zone: 'Albardón', instagram_url: 'https://www.instagram.com/granjatianora/', phone: '2644365391', category: 'productor', ...COORDS.san_juan },
    { name: 'La Huertita SL', city_zone: 'San Luis Capital', instagram_url: 'https://www.instagram.com/lahuertitasl/', website_url: 'lahuertita.cstore.app', category: 'productor', ...COORDS.san_luis },
    { name: 'El Campito Huerta', city_zone: 'Arroyo Seco', instagram_url: 'https://www.instagram.com/el.campito.huerta/', phone: '3402 552-723', category: 'productor', ...COORDS.santa_fe },
    { name: 'Broagroecológico', city_zone: 'Esperanza', instagram_url: 'https://www.instagram.com/broagroecologico/', phone: '3496400062', category: 'productor', ...COORDS.santa_fe },
    { name: 'Benjamín Santiago', city_zone: 'Hughes', instagram_url: 'https://www.instagram.com/samtiago.moru/', phone: '542473-46-9103', category: 'productor', ...COORDS.santa_fe },
    { name: 'Dulces del Jardín', city_zone: 'Rosario, Funes', instagram_url: 'https://www.instagram.com/dulcesdeljardinenfunes/', category: 'productor', ...COORDS.rosario },
    { name: 'Suelo Común', city_zone: 'Rosario', instagram_url: 'https://www.instagram.com/latiendadesuelocomun/', category: 'almacen', ...COORDS.rosario },
    { name: 'Trabajo en Tierra Viva', city_zone: 'Rosario, Granadero Baigorria', instagram_url: 'https://www.instagram.com/trabajoentierraviva/', category: 'productor', ...COORDS.rosario },
    { name: 'Biodemarg', city_zone: 'Rosario', instagram_url: 'https://www.instagram.com/biodemarg/', category: 'productor', ...COORDS.rosario },
    { name: 'Vitalia Almacen Natural', city_zone: 'Rosario', instagram_url: 'https://www.instagram.com/vitalia_almacennatural/', phone: '341 509-0914', category: 'almacen', ...COORDS.rosario },
    { name: 'Feria Agroecológica Santa Fé', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/feriaagroecologicasf/', category: 'productor', ...COORDS.santa_fe },
    { name: 'Verdecita 2020', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/verdecita2020/', category: 'productor', ...COORDS.santa_fe },
    { name: 'La Huerta Delivery', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/la_huerta_delivery/', phone: '342 549-9608', category: 'productor', ...COORDS.santa_fe },
    { name: 'Establecimiento la Quinta', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/establecimientolaquinta/', category: 'productor', ...COORDS.santa_fe },
    { name: 'Tierra Noble', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/tierranoble.ok/', category: 'productor', ...COORDS.santa_fe },
    { name: 'Cosecha Agroecológica', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/cosecha_agroecologica/', category: 'productor', ...COORDS.santa_fe },
    { name: 'Amma 100 Agroecología', city_zone: 'Santa Fé Capital', instagram_url: 'https://www.instagram.com/amma100agroecologica/', phone: '3425008482', category: 'productor', ...COORDS.santa_fe },
    { name: 'Mercadito Agroecológico Tucuman', city_zone: 'Yerba Buena', instagram_url: 'https://www.instagram.com/mercaditoagroecologicotuc/', category: 'productor', ...COORDS.tucuman },
    { name: 'Almacén Nuevo Mundo', city_zone: 'Boulogne', instagram_url: 'https://www.instagram.com/almacen_nuevomundo/', category: 'almacen', lat: -34.4914, lng: -58.5628 },
  ]

  // Limpiamos tabla
  await supabase.from('providers').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  const finalMerchants = merchantsData.map(m => {
    const { lat, lng, ...rest } = m as any;
    return {
      ...rest,
      status: 'approved',
      is_exact_location: false,
      location_lat: lat || -34.6037,
      location_lng: lng || -58.3816,
      bio: `Proyecto de alimentos cuidados en ${m.city_zone}.`
    };
  });

  const { error } = await supabase.from('providers').insert(finalMerchants)

  if (error) console.error('❌ Error:', error)
  else console.log('✅ MEGA CARGA COMPLETA:', merchantsData.length, 'productores activos.')
}

seedMega().catch(console.error)
