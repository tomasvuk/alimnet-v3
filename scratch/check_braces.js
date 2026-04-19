const fs = require('fs');
const content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');
const lines = content.split('\n');

let braceCount = 0;
let insideAdmin = false;
let startLine = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('export default function AdminDashboard')) {
    insideAdmin = true;
    startLine = i + 1;
  }
  
  if (insideAdmin) {
    const opening = (line.match(/{/g) || []).length;
    const closing = (line.match(/}/g) || []).length;
    braceCount += opening;
    braceCount -= closing;
    
    if (braceCount === 0 && startLine !== -1) {
      console.log(`AdminDashboard starts at ${startLine} and ends at line ${i + 1}`);
      insideAdmin = false;
      startLine = -1;
    }
  }
}
