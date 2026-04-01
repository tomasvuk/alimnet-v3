const fs = require('fs');
const { parse } = require('csv-parse/sync');

const fileContent = fs.readFileSync('base_datos.csv', 'utf-8');
const records = parse(fileContent, { columns: true, skip_empty_lines: true });

function esc(str) {
  if (!str) return 'NULL';
  return "'" + String(str).replace(/'/g, "''").trim() + "'";
}

function toArr(str) {
  if (!str) return 'ARRAY[]::TEXT[]';
  const parts = str.split(',').map(s => "'" + s.trim().replace(/'/g, "''") + "'");
  return 'ARRAY[' + parts.join(',') + ']::TEXT[]';
}

let sql = 'BEGIN;\n';

records.forEach((row, i) => {
  const name = row['Nombre del Emprendimiento'];
  if (!name) return;
  
  sql += 'DO $m$\nDECLARE m_id UUID;\nBEGIN\n';
  sql += '  INSERT INTO merchants (name, instagram_url, website_url, phone, whatsapp, type, types_secondary, modalidad, quality, products, certifications, admin_notes, verified, claimed, contact_status, created_by_type, status)\n';
  sql += `  VALUES (${esc(name)}, ${esc(row['Instagram'])}, ${esc(row['Sitio Web / Contacto'] || row['Linktr'])}, ${esc(row['Telefono'])}, ${esc(row['Telefono'])}, ${esc(row['Tipo Principal'] || 'Comercio')}, ${toArr(row['Tipos Secundarios'])}, ${esc(row['Modalidad'])}, ${toArr(row['Calidad / Producción'])}, ${toArr(row['Productos'])}, ${toArr(row['Certificaciones / Asociaciones'])}, ${esc(row['⚠️ Revisar'] || row['Notas extra'])}, false, false, 'sin_contacto', 'admin', 'active')\n`;
  sql += '  RETURNING id INTO m_id;\n';
  
  sql += '  INSERT INTO locations (merchant_id, country, province, district, locality, address, location_type, lat, lng, is_primary)\n';
  sql += `  VALUES (m_id, ${esc(row['País'] || 'Argentina')}, ${esc(row['Provincia'])}, ${esc(row['Región/Zona'])}, ${esc(row['Localidad/Barrio'])}, ${esc(row['Google Maps'])}, 'fixed', -34.6037 + (random() - 0.5) * 0.1, -58.3816 + (random() - 0.5) * 0.1, true);\n`;
  sql += 'END $m$;\n';
});

sql += 'COMMIT;';
fs.writeFileSync('import_script.sql', sql);
console.log('SQL script generated successfully.');
