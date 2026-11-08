const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 7.0 Code Linter ---');
let errors = 0;

const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('[LINT FAIL] index.html missing!');
  process.exit(1);
}

const html = fs.readFileSync(indexPath, 'utf-8');

// 1. Tag balance check for critical tags
const tagsToCheck = ['html', 'head', 'body', 'header', 'nav', 'main', 'footer'];
for (const tag of tagsToCheck) {
  const openCount = (html.match(new RegExp(`<${tag}[>\\s]`, 'gi')) || []).length;
  const closeCount = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  if (openCount !== closeCount) {
    console.error(`[LINT FAIL] Mismatched tag <${tag}>: opened ${openCount} times, closed ${closeCount} times`);
    errors++;
  } else {
    console.log(`[LINT PASS] Tag balance <${tag}>: ${openCount} open, ${closeCount} close`);
  }
}

// 2. Check for missing alt attributes on images
const imgMatches = html.match(/<img [^>]*>/gi) || [];
let missingAlt = 0;
for (const img of imgMatches) {
  if (!img.includes('alt=')) {
    missingAlt++;
  }
}
if (missingAlt > 0) {
  console.warn(`[LINT WARN] ${missingAlt} <img> tags missing alt attributes`);
} else {
  console.log(`[LINT PASS] All ${imgMatches.length} <img> tags have alt attributes`);
}

// 3. Verify internal anchor references
const hrefMatches = [...html.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)].map(m => m[1]);
const uniqueAnchors = [...new Set(hrefMatches)];
for (const anchor of uniqueAnchors) {
  if (!html.includes(`id="${anchor}"`)) {
    console.error(`[LINT FAIL] Broken anchor link: href="#${anchor}" has no matching id="${anchor}"`);
    errors++;
  }
}
console.log(`[LINT PASS] Verified ${uniqueAnchors.length} internal navigation anchor targets`);

// 4. Verify script tags don't have syntax errors in inline script
const scriptBlocks = [...html.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)];
for (let i = 0; i < scriptBlocks.length; i++) {
  const code = scriptBlocks[i][1];
  try {
    new Function(code);
    console.log(`[LINT PASS] Inline script block #${i + 1} syntax is valid`);
  } catch (err) {
    console.error(`[LINT FAIL] Syntax error in script block #${i + 1}: ${err.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`--- Linter failed with ${errors} error(s) ---`);
  process.exit(1);
} else {
  console.log('--- PromptDock 6.0 Linter PASSED (0 errors) ---');
  process.exit(0);
}
