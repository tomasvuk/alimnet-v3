import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const googleApiKey = process.env.GOOGLE_MAPS_API_KEY!;

if (!supabaseUrl || !supabaseKey || !googleApiKey) {
  console.error("❌ Missing environment variables. Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and GOOGLE_MAPS_API_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function geocode() {
  console.log("🚀 Starting Bulk Geocoding Process...");

  // 1. Fetch all locations and join with merchant names
  const { data: locations, error } = await supabase
    .from('locations')
    .select(`
      id, 
      address, 
      locality, 
      province, 
      country, 
      merchant_id, 
      merchants (name)
    `)
    .eq('country', 'Argentina');

  if (error) {
    console.error("❌ Error fetching locations:", error);
    return;
  }

  console.log(`🔎 Found ${locations.length} locations to verify/geocode.`);

  let successCount = 0;
  let failCount = 0;

  for (const loc of locations) {
    const merchantName = (loc.merchants as any)?.name;
    
    // Construct search query
    // prioritizing: Merchant Name + Locality + Province
    const searchString = `${merchantName}, ${loc.locality || ''}, ${loc.province || ''}, Argentina`.replace(/,,/g, ',');
    
    console.log(`\n📍 [${merchantName}] Searching: ${searchString}`);

    // Call Google Places Text Search (New or Old, using Old Text Search for simple URL)
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchString)}&key=${googleApiKey}`;
    
    try {
      const response = await fetch(url);
      const data: any = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        const formattedAddress = result.formatted_address;

        console.log(`   ✅ Match: ${formattedAddress}`);
        console.log(`      Coordinates: ${lat}, ${lng}`);

        // Update Supabase
        const { error: updateError } = await supabase
          .from('locations')
          .update({
            lat: lat,
            lng: lng,
            address: formattedAddress,
            location_type: 'google_verified'
          })
          .eq('id', loc.id);

        if (updateError) {
          console.error(`   ❌ DB Update failed: ${updateError.message}`);
          failCount++;
        } else {
          successCount++;
        }
      } else {
        console.warn(`   ⚠️ No results found (Status: ${data.status})`);
        
        // Fallback: Geocode by Address + Locality (if merchant name failed)
        const fallbackSearch = `${loc.address || ''}, ${loc.locality || ''}, ${loc.province || ''}, Argentina`.replace(/,,/g, ',');
        if (loc.address && fallbackSearch !== searchString) {
          console.log(`   🔄 Retrying with address only: ${fallbackSearch}`);
          const fbUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(fallbackSearch)}&key=${googleApiKey}`;
          const fbResponse = await fetch(fbUrl);
          const fbData: any = await fbResponse.json();
          
          if (fbData.status === 'OK' && fbData.results.length > 0) {
             const fbResult = fbData.results[0];
             const { lat, lng } = fbResult.geometry.location;
             console.log(`      ✅ Fallback Match: ${fbResult.formatted_address} [${lat}, ${lng}]`);
             
             await supabase
               .from('locations')
               .update({ lat, lng, address: fbResult.formatted_address, location_type: 'google_verified' })
               .eq('id', loc.id);
             successCount++;
             continue;
          }
        }
        failCount++;
      }
    } catch (e: any) {
      console.error(`   ❌ Request error: ${e.message}`);
      failCount++;
    }

    // Delay to play nice with API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log("\n" + "=".repeat(40));
  console.log(`🏁 FINISHED`);
  console.log(`✅ Successfully geocoded: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log("=".repeat(40));
}

geocode();
