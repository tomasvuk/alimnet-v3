import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ZONAS = [
  { region: 'CABA', count: 20, cities: ['Palermo', 'Belgrano', 'Caballito', 'Almagro', 'Villa Crespo'], baseLat: -34.6037, baseLng: -58.3816 },
  { region: 'Zona Norte (Primer Cordón)', count: 20, cities: ['Vicente López', 'San Isidro', 'San Fernando', 'Tigre'], baseLat: -34.5236, baseLng: -58.4686 },
  { region: 'Zona Norte (Resto)', count: 20, cities: ['Pilar', 'Escobar', 'Zárate', 'Campana'], baseLat: -34.4586, baseLng: -58.9142 },
  { region: 'Zona Oeste', count: 20, cities: ['Ituzaingó', 'Castelar', 'Moreno', 'Merlo'], baseLat: -34.6611, baseLng: -58.6655 },
  { region: 'Rosario', count: 20, cities: ['Rosario Centro', 'Fisherton', 'Alberdi'], baseLat: -32.9468, baseLng: -60.6393 },
  { region: 'Córdoba', count: 20, cities: ['Nueva Córdoba', 'Cerro de las Rosas', 'General Paz'], baseLat: -31.4201, baseLng: -64.1888 }
];

const ROLES = [
  ...Array(40).fill('Productor'),
  ...Array(40).fill('Abastecedor'),
  ...Array(20).fill('Productor, Abastecedor'),
  ...Array(5).fill('Abastecedor, Restaurante'),
  ...Array(5).fill('Restaurante, Abastecedor'),
  ...Array(5).fill('Restaurante'),
  ...Array(5).fill('Chef')
];

const PRODUCTOS = ['Verduras', 'Frutas', 'Carne', 'Huevos', 'Lácteos', 'Panificados', 'Cereales', 'Frutos secos', 'Aceites', 'Elaborados'];
const TAGS_SIMPLES = ['Sin gluten', 'Agroecológico', 'Orgánico', 'Plant-based', 'Sin ultraprocesados'];

const ADJECTIVES = ['Granja', 'Huerta', 'Finca', 'Almacén', 'Cooperativa', 'Mercado', 'Cocina', 'Taller', 'Estación', 'Raíz'];
const NOUNS = ['Sol', 'Verde', 'Norte', 'Vivo', 'Natural', 'Cercano', 'Sur', 'Alegre', 'Tierra', 'Pueblo'];

function randomSample<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName() {
  return `${ADJECTIVES[randomInt(0, ADJECTIVES.length - 1)]} ${NOUNS[randomInt(0, NOUNS.length - 1)]} ${randomInt(1, 99)}`;
}

async function seed() {
  console.log('Borrando datos antiguos...');
  await supabase.from('merchants').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  const merchantsToInsert: any[] = [];
  
  // Distribuir roles aleatoriamente
  const shuffledRoles = [...ROLES].sort(() => 0.5 - Math.random());
  let roleIndex = 0;

  let directSalesCount = 0;

  for (const zona of ZONAS) {
    for (let i = 0; i < zona.count; i++) {
      const type = shuffledRoles[roleIndex++];
      
      const city = zona.cities[randomInt(0, zona.cities.length - 1)];
      const isMultiBranch = (i < 2); // 2 per region are multi-branch
      
      const locations = [];
      const numBranches = isMultiBranch ? randomInt(2, 4) : 1;
      
      for(let b=0; b<numBranches; b++) {
        const offsetLat = (Math.random() - 0.5) * 0.05;
        const offsetLng = (Math.random() - 0.5) * 0.05;
        locations.push({
          city: b === 0 ? city : zona.cities[randomInt(0, zona.cities.length - 1)],
          locality: zona.region,
          lat: zona.baseLat + offsetLat,
          lng: zona.baseLng + offsetLng,
          address: `Calle ${generateName()} ${randomInt(100, 4000)}`
        });
      }

      // Products (1 a 3)
      const selectedProducts = randomSample(PRODUCTOS, randomInt(1, 3));
      
      // Tags (0 a 3 visibles) -> in DB let's just push them all
      const selectedTags = randomSample(TAGS_SIMPLES, randomInt(0, 3));

      if (type.includes('Productor') && directSalesCount < 30 && Math.random() > 0.5) {
        selectedTags.push('Venta directa');
        directSalesCount++;
      }

      // Coverage logic (zonas amplias)
      const allRegions = ZONAS.map(z => z.region);
      const coverage = [];
      if (Math.random() > 0.5) {
        coverage.push(zona.region); // local
      }
      if (Math.random() > 0.7) {
        let other = allRegions[randomInt(0, allRegions.length - 1)];
        if (!coverage.includes(other)) coverage.push(other);
      }
      if (coverage.length === 0) coverage.push('Solo retiro');

      // Add to payload
      merchantsToInsert.push({
        name: generateName(),
        type,
        bio_short: `Somos un proyecto ubicado en ${city} dedicado a brindar los mejores alimentos de la región con un impacto positivo.`,
        tags: [...selectedProducts, ...selectedTags],
        delivery_zones: coverage,
        _locations: locations // temporary store to insert later
      });
    }
  }

  console.log(`Insertando ${merchantsToInsert.length} perfiles ficticios...`);
  
  // Insert in chunks of 40
  for (let i = 0; i < merchantsToInsert.length; i += 40) {
    const chunk = merchantsToInsert.slice(i, i + 40);
    
    // Insert merchants
    const { data: insertedMerchants, error } = await supabase.from('merchants').insert(
      chunk.map(c => {
        const { _locations, ...rest } = c;
        return { ...rest, status: 'active' };
      })
    ).select();

    if (error || !insertedMerchants) {
      console.error('Error insertando chunk:', error);
      continue;
    } 

    // Prepare and insert locations
    const locationsToInsert: any[] = [];
    insertedMerchants.forEach(dbMerchant => {
      const origMerchant = chunk.find(c => c.name === dbMerchant.name && c.type === dbMerchant.type);
      if (origMerchant && origMerchant._locations) {
        origMerchant._locations.forEach((loc: any, idx: number) => {
          locationsToInsert.push({
            merchant_id: dbMerchant.id,
            locality: loc.city + ' | ' + loc.locality,
            lat: loc.lat,
            lng: loc.lng,
            address: loc.address,
            is_primary: idx === 0
          });
        });
      }
    });

    if (locationsToInsert.length > 0) {
      const { error: locError } = await supabase.from('locations').insert(locationsToInsert);
      if (locError) {
        console.error('Error insertando locations:', locError);
      }
    }

    console.log(`Insertados ${i + chunk.length}/${merchantsToInsert.length}`);
  }
  
  console.log('¡Dataset completado con éxito!');
}

seed();
