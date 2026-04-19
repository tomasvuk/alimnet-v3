const { Client } = require('pg');

const connectionString = 'postgresql://postgres.keagrrvtzmsukcmzxqrl:k2RwZOynFi45ZgMZ@aws-1-us-east-1.pooler.supabase.com:5432/postgres';

async function runFix() {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    console.log('Connected to Supabase');

    const sql = `
      -- 1. Limpiar TODAS las políticas previas de la tabla merchants para evitar conflictos
      DROP POLICY IF EXISTS "Usuarios autenticados pueden sumar comercios" ON public.merchants;
      DROP POLICY IF EXISTS "Permitir inserción a usuarios autenticados" ON public.merchants;
      DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.merchants;

      -- 2. Crear la política definitiva y ultra-permisiva para INSERT
      CREATE POLICY "Permitir inserción total a autenticados" 
      ON public.merchants FOR INSERT 
      WITH CHECK (auth.uid() IS NOT NULL);

      -- 3. Asegurar que el SELECT sea público para que el código no falle al leer lo insertado
      DROP POLICY IF EXISTS "Lectura pública de comercios" ON public.merchants;
      CREATE POLICY "Lectura pública de comercios" 
      ON public.merchants FOR SELECT 
      USING (true);

      -- 4. Por las dudas, dar permisos de uso de la secuencia (si existiera)
      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
    `;

    await client.query(sql);
    console.log('Migration executed successfully!');
  } catch (err) {
    console.error('Error executing migration:', err);
  } finally {
    await client.end();
  }
}

runFix();
