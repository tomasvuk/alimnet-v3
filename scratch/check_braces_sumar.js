const fs = require('fs');
const content = fs.readFileSync('src/app/sumar-comercio-vecino/page.tsx', 'utf8');
const lines = content.split('\n');

let braceCount = 0;
let insideComp = false;
let startLine = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('function NeighborRecommendationContent')) {
    insideComp = true;
    startLine = i + 1;
  }
  
  if (insideComp) {
    const opening = (line.match(/{/g) || []).length;
    const closing = (line.match(/}/g) || []).length;
    braceCount += opening;
    braceCount -= closing;
    
    if (braceCount === 0 && startLine !== -1) {
      console.log(`NeighborRecommendationContent starts at ${startLine} and ends at line ${i + 1}`);
      insideComp = false;
      startLine = -1;
    }
  }
}
