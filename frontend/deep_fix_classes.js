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

  // This regex matches a tag starting with < and its content
  // We'll then look for multiple className attributes inside that tag
  content = content.replace(/<[a-zA-Z0-9]+[^>]*>/g, (tag) => {
    // Find all occurrences of className="..." or className={...}
    const classRegex = /className=(?:\{([^\}]*)\}|"([^"]*)")/g;
    const matches = [];
    let match;
    while ((match = classRegex.exec(tag)) !== null) {
      matches.push({
        full: match[0],
        dynamic: match[1], // If it was className={...}
        static: match[2]   // If it was className="..."
      });
    }

    if (matches.length > 1) {
      // Merge them
      let staticClasses = [];
      let dynamicClasses = [];

      matches.forEach(m => {
        if (m.static) staticClasses.push(m.static);
        if (m.dynamic) dynamicClasses.push(m.dynamic);
      });

      let newClassName = '';
      if (dynamicClasses.length > 0) {
        // If there are dynamic classes, we use a template literal
        const combinedStatic = staticClasses.join(' ');
        const combinedDynamic = dynamicClasses.join('} ${');
        // Simple case: className={`${dynamic} static1 static2`}
        if (combinedStatic) {
           newClassName = `className={\`${dynamicClasses.join(' ')} ${combinedStatic}\`}`;
        } else {
           newClassName = `className={${dynamicClasses.join(' + " " + ')}}`;
        }
      } else {
        // Only static classes
        newClassName = `className="${staticClasses.join(' ')}"`;
      }

      // Replace all occurrences in the tag
      let first = true;
      let finalTag = tag;
      matches.forEach(m => {
        if (first) {
          finalTag = finalTag.replace(m.full, newClassName);
          first = false;
        } else {
          // Remove subsequent classNames and the extra space before them
          const escapedFull = m.full.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const removeRegex = new RegExp(`\\s+${escapedFull}`);
          finalTag = finalTag.replace(removeRegex, '');
          // In case there's no space before it (unlikely)
          finalTag = finalTag.replace(m.full, '');
        }
      });
      return finalTag;
    }
    return tag;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Deep fixed double className in: ${filePath}`);
  }
});

console.log('Class merge complete');
