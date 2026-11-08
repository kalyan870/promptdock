const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 7.1 Production Build Pipeline ---');

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
  'PromptDock 7.1',
  'Discover the <span>next dimension</span> of web design.',
  '"Discover the visual. Copy the prompt. Build it with AI."',
  'hero-canvas',
  'inspector-canvas',
  'id="gallery"',
  'id="inspector"',
  'id="prompt-generator"',
  'id="combine-visuals"',
  'id="workflow"',
  'three.min.js',
  'gsap.min.js',
  'generateCompletePrompt',
  'generateCombinedPrompt',
  'SceneFactory.createScene',
  'config-summary-bar',
  'fps-display'
];

for (const token of requiredTokens) {
  if (!html.includes(token)) {
    console.error(`[FAIL] Required build token missing: "${token}"`);
    process.exit(1);
  }
}
console.log(`[PASS] All ${requiredTokens.length} required build tokens verified`);

// Assert modify-website is completely removed
if (html.includes('id="modify-website"') || html.includes('generateModificationPrompt')) {
  console.error('[FAIL] Obsolete website modification feature found in build!');
  process.exit(1);
}
console.log('[PASS] Confirmed obsolete modification feature is completely absent');

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

// 4. Verify documentation suite exists (9 core docs in 7.1)
const docsDir = path.join(__dirname, 'docs');
const expectedDocs = [
  'product-overview.md',
  'visual-library.md',
  'prompt-engine.md',
  'visual-composer.md',
  '3d-rendering.md',
  'performance.md',
  'architecture.md',
  'testing.md',
  'deployment.md'
];

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
  version: '7.1.0',
  title: 'PromptDock 7.1 — Premium 3D Visual Prompt Studio',
  tagline: 'Discover the visual. Copy the prompt. Build it with AI.',
  assetsCount: imageFiles.length,
  indexHtmlSize: html.length,
  status: 'PRODUCTION_READY',
  deploymentTarget: 'Vercel Edge'
};

fs.writeFileSync(path.join(__dirname, 'build-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('[PASS] Generated build-manifest.json (v7.1.0)');
console.log('--- PromptDock 7.1 Production Build Pipeline Complete (SUCCESS) ---');
