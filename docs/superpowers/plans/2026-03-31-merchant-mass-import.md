# Massive Merchant Import & Dashboard Evolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Import 245 merchants from `base_datos.csv` into Supabase and upgrade the Admin Dashboard to a full CRM/Outreach tool.

**Architecture:** 
1. **Database**: Extend `merchants` table via SQL migration.
2. **Import**: Node.js script using `csv-parse` to handle complex CSV formatting and insert data via Supabase Admin API.
3. **Frontend**: Refactor the monolithic `AdminDashboard` into modular components with advanced searching, filtering, and status management.

**Tech Stack:** Next.js, Supabase, `csv-parse`, Lucide Icons, Vanilla CSS.

---

### Task 1: SQL Migration - Schema Evolution

**Files:**
- Modify: Supabase Database via `apply_migration`

- [ ] **Step 1: Execute SQL Migration**
Run the following SQL to add the necessary columns to `public.merchants`:
```sql
ALTER TABLE public.merchants 
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS claimed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS contact_status TEXT DEFAULT 'sin_contacto',
ADD COLUMN IF NOT EXISTS types_secondary TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS modalidad TEXT,
ADD COLUMN IF NOT EXISTS quality TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS products TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS certifications TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS created_by_type TEXT DEFAULT 'admin';

-- Constraint for contact_status
ALTER TABLE public.merchants 
DROP CONSTRAINT IF EXISTS contact_status_check;

ALTER TABLE public.merchants
ADD CONSTRAINT contact_status_check 
CHECK (contact_status IN ('sin_contacto', 'contactado', 'interesado', 'rechazado'));
```

- [ ] **Step 2: Verify columns**
Run: `supabase db list columns merchants` (if using CLI) or check table structure via MCP.

---

### Task 2: Setup Import Environment

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install `csv-parse`**
Run: `npm install csv-parse`

- [ ] **Step 2: Commit**
```bash
git add package.json package-lock.json
git commit -m "chore: add csv-parse dependency"
```

---

### Task 3: Develop Import Script

**Files:**
- Create: `scripts/import_merchants.ts`

- [ ] **Step 1: Create the import script**
```typescript
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role for bypass RLS
const supabase = createClient(supabaseUrl, supabaseKey);

async function runImport() {
  const csvPath = path.resolve(process.cwd(), 'base_datos.csv');
  const fileContent = fs.readFileSync(csvPath, 'utf-8');

  const records = parse(fileContent, {
    columns: false,
    skip_empty_lines: true,
  });

  console.log(`Starting import of ${records.length} records...`);

  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    
    // Mapping based on screenshots
    // 0: Pais, 1: Prov, 2: Zona, 3: Localidad, 4: Nombre, 5: Instagram
    // 6: Web, 7: Linktr, 8: GMaps, 9: Tel, 10: Notas, 11: Tipo P, 12: Tipos S, 13: Modalidad, 14: Calidad
    // 15: Calidad/Prod (Duplicate?), 16: Productos, 17: Revisar, 18: Certificaciones
    
    const merchantData = {
      name: row[4],
      instagram_url: row[5],
      website_url: row[6] || row[7],
      phone: row[9],
      whatsapp: row[9],
      type: row[11],
      types_secondary: row[12] ? row[12].split(',').map((t: string) => t.trim()) : [],
      modalidad: row[13],
      quality: row[14] ? row[14].split(',').map((t: string) => t.trim()) : [],
      products: row[16] ? row[16].split(',').map((t: string) => t.trim()) : [],
      certifications: row[18] ? row[18].split(',').map((t: string) => t.trim()) : [],
      admin_notes: row[17],
      verified: false,
      claimed: false,
      contact_status: 'sin_contacto',
      created_by_type: 'admin'
    };

    if (!merchantData.name) continue;

    const { data: merchant, error: mError } = await supabase
      .from('merchants')
      .insert(merchantData)
      .select()
      .single();

    if (mError) {
      console.error(`Error row ${i}: ${mError.message}`);
      continue;
    }

    // Insert Location
    await supabase.from('locations').insert({
      merchant_id: merchant.id,
      country: row[0],
      province: row[1],
      district: row[2],
      locality: row[3],
      address: row[8], // Using "Google Maps" column as address
      location_type: 'fixed',
      lat: -34.6037, // Default BA
      lng: -58.3816,
      is_primary: true
    });

    console.log(`[${i+1}/${records.length}] Imported: ${merchantData.name}`);
  }
}

runImport();
```

- [ ] **Step 2: Commit**
```bash
git add scripts/import_merchants.ts
git commit -m "feat: add merchant import script"
```

---

### Task 4: Execute Import

- [ ] **Step 1: Run the script**
Run: `npx ts-node scripts/import_merchants.ts`
Expected: Log showing "Imported: X" for all 245 rows.

---

### Task 5: Refactor Dashboard UI - Components

**Files:**
- Create: `src/components/admin/MerchantTable.tsx`
- Create: `src/components/admin/MerchantFilters.tsx`
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Create filters component**
Implement search and switches for completeness (whatsapp, email, phone).

- [ ] **Step 2: Create table component**
Add columns for:
- Completeness Indicators ( Lucide Icons with 🟢/🔴).
- Provincia & Localidad.
- Contact Status Selector.

---

### Task 6: Implement Filter Logic & Actions

**Files:**
- Modify: `src/app/admin/page.tsx`

- [ ] **Step 1: Connect filters to local state**
- [ ] **Step 2: Implement "Mark as Contacted" and "Toggle Verified" handlers**
These should update the Supabase record and optimistic UI.

---

### Task 7: Final Polish & Verification

- [ ] **Step 1: Verify all 245 merchants appear in dashboard**
- [ ] **Step 2: Test filters (e.g., "Buenos Aires" + "Sin Contacto")**
- [ ] **Step 3: Update `PROJECT_CHECKLIST.md`**
Mark Misión 4 as partially completed.
