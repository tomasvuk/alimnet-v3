import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env vars from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// We need the service role key to bypass RLS during mass import
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runImport() {
  try {
    const csvPath = path.resolve(process.cwd(), 'base_datos.csv');
    if (!fs.existsSync(csvPath)) {
      console.error(`Error: File not found at ${csvPath}`);
      return;
    }

    const fileContent = fs.readFileSync(csvPath, 'utf-8');

    // Headers mapped from screenshots:
    // [0] Pais, [1] Prov, [2] Zona, [3] Localidad, [4] Nombre, [5] Instagram
    // [6] Web, [7] Linktr, [8] GMaps/Address, [9] Tel, [10] Notas, [11] Tipo P, [12] Tipos S, [13] Modalidad, [14] Calidad
    // [15] Calidad/Prod (Duplicate), [16] Productos, [17] Revisar, [18] Certificaciones
    
    // csv-parse options: no headers in actual file content according to analysis
    const records = parse(fileContent, {
      columns: false,
      skip_empty_lines: true,
      relax_column_count: true, // Handle rows with different counts if any
    });

    console.log(`🚀 Starting import of ${records.length} records...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < records.length; i++) {
      const row = records[i];
      if (!row[4] || row[4].trim() === '') continue; // Skip if no name

      process.stdout.write(`Processing [${i + 1}/${records.length}]: ${row[4]}... `);

      try {
        const merchantData = {
          name: row[4]?.trim(),
          instagram_url: row[5]?.trim() || null,
          website_url: row[6]?.trim() || row[7]?.trim() || null,
          phone: row[9]?.trim() || null,
          whatsapp: row[9]?.trim() || null,
          type: row[11]?.trim() || 'Comercio',
          types_secondary: row[12] ? row[12].split(',').map((t: string) => t.trim()) : [],
          modalidad: row[13]?.trim() || null,
          quality: row[14] ? row[14].split(',').map((t: string) => t.trim()) : [],
          products: row[16] ? row[16].split(',').map((t: string) => t.trim()) : [],
          certifications: row[18] ? row[18].split(',').map((t: string) => t.trim()) : [],
          admin_notes: row[17]?.trim() || null,
          verified: false,
          claimed: false,
          contact_status: 'sin_contacto',
          created_by_type: 'admin',
          status: 'active'
        };

        const { data: merchant, error: mError } = await supabase
          .from('merchants')
          .insert(merchantData)
          .select()
          .single();

        if (mError) throw mError;

        // Insert Location
        const { error: lError } = await supabase.from('locations').insert({
          merchant_id: merchant.id,
          country: row[0]?.trim() || 'Argentina',
          province: row[1]?.trim() || null,
          district: row[2]?.trim() || null,
          locality: row[3]?.trim() || null,
          address: row[8]?.trim() || null,
          location_type: 'fixed',
          lat: -34.6037 + (Math.random() - 0.5) * 0.1, // Slight offset for BA for better map view
          lng: -58.3816 + (Math.random() - 0.5) * 0.1,
          is_primary: true
        });

        if (lError) throw lError;

        successCount++;
        process.stdout.write('✅\n');
      } catch (err: any) {
        errorCount++;
        process.stdout.write(`❌ Error: ${err.message}\n`);
      }
    }

    console.log(`\n🎉 Import completed!`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

  } catch (globalErr: any) {
    console.error(`Critical Global Error: ${globalErr.message}`);
  }
}

runImport();
