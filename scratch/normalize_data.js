const { Client } = require('pg');

const connectionString = 'postgresql://postgres.keagrrvtzmsukcmzxqrl:k2RwZOynFi45ZgMZ@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

async function runNormalization() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to Supabase');

    const sql = `
      -- 1. Normalizar tipos a formato Capitalizado (Productor, Abastecedor, etc.)
      UPDATE public.merchants
      SET type = initcap(type)
      WHERE type IS NOT NULL;

      -- 2. Normalizar nombres a formato initcap (opcional, pero mejor solo tipos por ahora)
      -- UPDATE public.merchants SET name = initcap(name);

      -- 3. Intentar corregir provincias faltantes en locations si address contiene la provincia
      -- (Este es un heurístico simple: si address termina en ", Buenos Aires", asignar provincia)
      UPDATE public.locations
      SET province = 'Buenos Aires'
      WHERE (province IS NULL OR province = '') 
      AND (address ILIKE '%Buenos Aires%' OR address ILIKE '%PBA%');

      UPDATE public.locations
      SET province = 'CABA'
      WHERE (province IS NULL OR province = '') 
      AND (address ILIKE '%CABA%' OR address ILIKE '%Capital Federal%');
    `;

    const result = await client.query(sql);
    console.log('Data normalization executed successfully!');
  } catch (err) {
    console.error('Error executing normalization:', err);
  } finally {
    await client.end();
  }
}

runNormalization();
