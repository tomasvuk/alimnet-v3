const fs = require('fs');
try {
  let content = fs.readFileSync('src/app/mi-cuenta/page.tsx', 'utf8');
  // simple check
  console.log('Read successfully');
} catch(e) {
  console.log(e);
}
