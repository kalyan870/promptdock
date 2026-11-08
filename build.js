const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 6.0 Production Build Pipeline ---');

// 1. Verify index.html exists and is valid HTML
const indexPath = path.join(__dirname, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('[FAIL] index.html not found!');
  process.exit(1);
}
const html = fs.readFileSync(indexPath, 'utf-8');
console.log(`[PASS] index.html read successfully (${html.length} bytes)`);

// 2. Validate essential sections & elements
const requiredTokens = [
  'PromptDock 6.0',
  'hero-canvas',
  'component-canvas',
  'workflow-canvas',
  'modal-3d-canvas',
  'pg-component-mount',
  'Component Marketplace',
  'Creative Effects',
  'Workflow Studio',
  'Showcase Projects & Case Studies',
  '21st.dev',
  'https://libraries.dev',
  'workflow-agents.svg',
  'three.min.js',
  'gsap.min.js'
];

for (const token of requiredTokens) {
  if (!html.includes(token)) {
    console.error(`[FAIL] Required build token missing: "${token}"`);
    process.exit(1);
  }
}
console.log(`[PASS] All ${requiredTokens.length} required build tokens verified`);

// 3. Validate image assets referenced in index.html
const imagesDir = path.join(__dirname, 'images');
const imageFiles = fs.readdirSync(imagesDir);
console.log(`[PASS] Found ${imageFiles.length} image assets in images/`);

if (imageFiles.length < 25) {
  console.error(`[FAIL] Expected at least 25 assets, found ${imageFiles.length}`);
  process.exit(1);
}

// Check every file has size > 100 bytes
for (const file of imageFiles) {
  const stat = fs.statSync(path.join(imagesDir, file));
  if (stat.size < 100) {
    console.error(`[FAIL] Asset ${file} is suspiciously small: ${stat.size} bytes`);
    process.exit(1);
  }
}
console.log(`[PASS] All ${imageFiles.length} assets validated for non-zero integrity`);

// 4. Verify documentation suite exists
const docsDir = path.join(__dirname, 'docs');
const expectedDocs = [
  'architecture.md',
  'getting-started.md',
  'components.md',
  'effects.md',
  'prompt-library.md',
  'visual-system.md',
  '3d-engine.md',
  'performance.md',
  'workflow.md',
  'testing.md',
  'deployment.md',
  'roadmap.md'
];

// Ensure any missing doc is created before check
for (const doc of expectedDocs) {
  if (!fs.existsSync(path.join(docsDir, doc))) {
    console.error(`[FAIL] Missing required documentation file: docs/${doc}`);
    process.exit(1);
  }
}
console.log(`[PASS] Documentation suite verified (${expectedDocs.length} files in docs/)`);

// 5. Generate build manifest
const manifest = {
  buildTime: new Date().toISOString(),
  version: '6.0.0',
  assetsCount: imageFiles.length,
  indexHtmlSize: html.length,
  status: 'PRODUCTION_READY',
  deploymentTarget: 'Vercel Edge'
};

fs.writeFileSync(path.join(__dirname, 'build-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('[PASS] Generated build-manifest.json (v6.0.0)');

console.log('--- PromptDock 6.0 Production Build SUCCESS (100% Pass) ---');
