const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/app', (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Regex to find double classNames
  // This matches className="part1" followed by some space and another className="part2"
  // It handles multiple spaces/newlines between them
  
  // Case 1: Adjacent classNames
  const doubleRegex = /className="([^"]*)"\s+className="([^"]*)"/g;
  content = content.replace(doubleRegex, 'className="$1 $2"');

  // Case 2: classNames with other attributes in between (harder with regex)
  // Let's stick to the adjacent ones first as they are the most common from my previous script
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed double className in: ${filePath}`);
  }
});

console.log('Class merge complete');
