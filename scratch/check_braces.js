
const fs = require('fs');
const content = fs.readFileSync('/Users/tomasvukojicic/Alimnet v3/src/app/admin/page.tsx', 'utf8');
let open = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '{') open++;
  if (content[i] === '}') open--;
}
console.log('Balance:', open);
