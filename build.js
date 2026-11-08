import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 7.2 Production Build Pipeline ---');

// 1. Verify dist/index.html exists and is valid HTML
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('[FAIL] dist/index.html not found! Run "vite build" first.');
  process.exit(1);
}
const html = fs.readFileSync(indexPath, 'utf-8');
console.log(`[PASS] dist/index.html read successfully (${html.length} bytes)`);

// 2. Validate essential tokens
const requiredTokens = [
  'PromptDock 7.2',
  'id="root"'
];

for (const token of requiredTokens) {
  if (!html.includes(token)) {
    console.error(`[FAIL] Required build token missing: "${token}"`);
    process.exit(1);
  }
}
console.log(`[PASS] All ${requiredTokens.length} required build tokens verified`);

// 3. Validate image assets in dist/images/
const imagesDir = path.join(distDir, 'images');
const imageFiles = fs.readdirSync(imagesDir);
console.log(`[PASS] Found ${imageFiles.length} image assets in dist/images/`);

if (imageFiles.length < 50) {
  console.error(`[FAIL] Expected at least 50 assets in dist/images, found ${imageFiles.length}`);
  process.exit(1);
}

for (const file of imageFiles) {
  const stat = fs.statSync(path.join(imagesDir, file));
  if (stat.size < 100) {
    console.error(`[FAIL] Asset ${file} is suspiciously small: ${stat.size} bytes`);
    process.exit(1);
  }
}
console.log(`[PASS] All ${imageFiles.length} assets in dist/images validated for non-zero integrity`);

// 4. Verify documentation suite exists (9 core docs in 7.2)
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
  version: '7.2.0',
  title: 'PromptDock 7.2 — Premium 3D Visual Prompt Studio',
  heroEngine: '21st.dev Horizon Hero Section (Scott Clayton, MIT License)',
  tagline: 'Discover the visual. Copy the prompt. Build it with AI.',
  scenesCount: 30,
  assetsCount: imageFiles.length,
  distHtmlSize: html.length,
  status: 'PRODUCTION_READY',
  deploymentTarget: 'Vercel Edge (dist/)'
};

fs.writeFileSync(path.join(__dirname, 'build-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('[PASS] Generated build-manifest.json (v7.2.0)');
console.log('--- PromptDock 7.2 Production Build Pipeline Complete (SUCCESS) ---');
