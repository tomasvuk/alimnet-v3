const fs = require('fs');
const content = fs.readFileSync('import_script.sql', 'utf-8');
const blocks = content.match(/DO \$m\$[\s\S]*?END \$m\$;/g);

if (!blocks) {
  console.error("No se encontraron bloques para importar.");
  process.exit(1);
}

const CHUNK_SIZE = 50;
for (let i = 0; i < blocks.length; i += CHUNK_SIZE) {
  const chunk = 'BEGIN;\n' + blocks.slice(i, i + CHUNK_SIZE).join('\n') + '\nCOMMIT;';
  fs.writeFileSync(`chunk_${i/CHUNK_SIZE}.sql`, chunk);
}
console.log(`Creados ${Math.ceil(blocks.length / CHUNK_SIZE)} archivos de carga.`);
