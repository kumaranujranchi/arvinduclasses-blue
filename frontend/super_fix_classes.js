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

  // This regex matches a tag starting with < and its content, correctly handling nested braces for attributes
  // However, for simplicity and safety, let's use a simpler approach:
  // Find all className="..." or className={...} in the entire file and check if they are on the same element
  
  // Actually, let's just use a more aggressive regex for the tag content
  content = content.replace(/<[a-zA-Z0-9]+[^>]*>/g, (tag) => {
    if (!tag.includes('className')) return tag;

    // Find all className attributes
    // This regex handles className="value" and className={expression}
    const classAttrRegex = /className=(?:\{((?:\{[^\}]*\}|[^\}])*)\}|"([^"]*)")/g;
    const attrs = [];
    let match;
    while ((match = classAttrRegex.exec(tag)) !== null) {
      attrs.push({
        full: match[0],
        expr: match[1],
        str: match[2],
        index: match.index
      });
    }

    if (attrs.length > 1) {
      console.log(`Merging ${attrs.length} classNames in a tag in ${filePath}`);
      
      let staticParts = [];
      let dynamicParts = [];

      attrs.forEach(a => {
        if (a.str) staticParts.push(a.str);
        if (a.expr) dynamicParts.push(a.expr);
      });

      let newClassName = '';
      if (dynamicParts.length > 0) {
        // Complex case: mix of static and dynamic
        // Example: className={`static1 static2 ${dynamic1} ${dynamic2}`}
        const staticStr = staticParts.join(' ');
        const dynamicStr = dynamicParts.map(d => {
            // Remove backticks if they exist to merge into one template literal
            if (d.startsWith('`') && d.endsWith('`')) return d.slice(1, -1);
            return `\${${d}}`;
        }).join(' ');
        
        newClassName = `className={\`${staticStr} ${dynamicStr}\`.trim().replace(/\\s+/g, ' ')}`;
      } else {
        newClassName = `className="${staticParts.join(' ')}"`;
      }

      // Replace first occurrence and remove others
      let resultTag = tag;
      // Sort backwards to not mess up indices
      attrs.sort((a, b) => b.index - a.index);
      
      const lastIdx = attrs.length - 1;
      attrs.forEach((a, i) => {
        if (i === lastIdx) {
          // This is the first one in the tag (since we sorted backwards)
          resultTag = resultTag.substring(0, a.index) + newClassName + resultTag.substring(a.index + a.full.length);
        } else {
          // Remove this one and any preceding whitespace
          let start = a.index;
          while (start > 0 && /\s/.test(resultTag[start - 1])) {
            start--;
          }
          resultTag = resultTag.substring(0, start) + resultTag.substring(a.index + a.full.length);
        }
      });
      return resultTag;
    }
    return tag;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Super fixed double className in: ${filePath}`);
  }
});

console.log('Class merge complete');
