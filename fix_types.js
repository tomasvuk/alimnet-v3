require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('merchants').select('id, type');
  if (error) {
    console.error(error);
    return;
  }
  
  let updated = 0;
  for (const merchant of data) {
    if (merchant.type) {
      // capitalizamos la primera letra de toda la cadena (asumiendo que es "abastecedor", etc)
      const parts = merchant.type.split(',').map(s => s.trim());
      let modified = false;
      const newParts = parts.map(p => {
        if (!p) return p;
        const capitalized = p.charAt(0).toUpperCase() + p.slice(1);
        if (capitalized !== p) modified = true;
        return capitalized;
      });
      
      if (modified) {
        const newType = newParts.join(', ');
        await supabase.from('merchants').update({ type: newType }).eq('id', merchant.id);
        updated++;
        console.log(`Updated ${merchant.id}: ${merchant.type} -> ${newType}`);
      }
    }
  }
  console.log(`Finished. Updated ${updated} merchants.`);
}

main();
