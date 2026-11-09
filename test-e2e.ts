import * as THREE from 'three';
import { VISUALS } from './src/data/visuals.ts';
import { SceneFactory } from './src/engine/scene-factory.ts';
import { PromptEngine } from './src/engine/prompt-engine.ts';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 8.1 End-to-End (E2E) Test Suite ---');

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`[E2E PASS] ${message}`);
    passed++;
  } else {
    console.error(`[E2E FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify all 30 Dedicated Scene Implementations in SceneFactory
console.log('\n[E2E 1/4] Testing All 30 Dedicated Three.js Scene Implementations...');
const testGroup = new THREE.Group();

for (const visual of VISUALS) {
  const success = SceneFactory.createScene(visual.sceneType, testGroup, visual.defaultProps);
  assert(success === true, `SceneFactory created dedicated scene: "${visual.sceneType}" (${visual.name})`);
  assert(testGroup.children.length > 0, `Scene "${visual.sceneType}" contains rendered 3D meshes (${testGroup.children.length} objects)`);

  // Verify custom update hook if present
  if ((testGroup as any)._customUpdate) {
    assert(typeof (testGroup as any)._customUpdate === 'function', `Scene "${visual.sceneType}" has valid _customUpdate animation loop`);
    (testGroup as any)._customUpdate(1.0); // test calling animation frame
  }

  // Clean group and verify teardown
  SceneFactory.cleanGroup(testGroup);
  assert(testGroup.children.length === 0, `SceneFactory.cleanGroup cleanly disposed scene: "${visual.sceneType}"`);
  assert((testGroup as any)._customUpdate === null, `SceneFactory.cleanGroup reset _customUpdate hook to null`);
}

// 2. Canonical PromptEngine & 18-Point Verification
console.log('\n[E2E 2/4] Testing Canonical PromptEngine & 18-Point Engineering Brief...');
const customProps = {
  color: '#ff0055',
  secondaryColor: '#00ffff',
  speed: 2.4,
  density: 3200,
  glow: 2.1,
  cam: 7.5,
  wireframe: true
};

const auroraVisual = VISUALS.find(v => v.sceneType === 'aurora')!;
const watchVisual = VISUALS.find(v => v.sceneType === 'chronoWatch')!;
const headphoneVisual = VISUALS.find(v => v.sceneType === 'headphone')!;
const prismVisual = VISUALS.find(v => v.sceneType === 'glassRefractionPrism')!;

const promptAurora = PromptEngine.generateBuildPrompt(auroraVisual, customProps);
const promptWatch = PromptEngine.generateBuildPrompt(watchVisual, customProps);
const promptHeadphone = PromptEngine.generateBuildPrompt(headphoneVisual, customProps);
const promptPrism = PromptEngine.generateBuildPrompt(prismVisual, customProps);

// Verify 18 points exist in all generated prompts
for (let i = 1; i <= 18; i++) {
  assert(promptAurora.includes(`### ${i}.`), `PromptEngine generated Section ### ${i} for Aurora`);
  assert(promptWatch.includes(`### ${i}.`), `PromptEngine generated Section ### ${i} for ChronoWatch`);
}

// Verify custom parameter transfers
assert(promptAurora.includes('#ff0055'), 'Active color transferred to PromptEngine brief');
assert(promptAurora.includes('#00ffff'), 'Active secondaryColor transferred to PromptEngine brief');
assert(promptAurora.includes('2.4x'), 'Active speed multiplier transferred to PromptEngine brief');
assert(promptAurora.includes('3200'), 'Active density transferred to PromptEngine brief');
assert(promptAurora.includes('2.1'), 'Active glow transferred to PromptEngine brief');
assert(promptAurora.includes('7.5'), 'Active camera distance transferred to PromptEngine brief');
assert(promptAurora.includes('true (Wireframe enabled)'), 'Active wireframe state transferred to PromptEngine brief');

// Verify scene-specific tailoring
assert(promptWatch.includes('titanium bezel') || promptWatch.includes('sapphire crystal'), 'ChronoWatch prompt contains horology-specific geometry');
assert(promptHeadphone.includes('headband arch') || promptHeadphone.includes('earcup'), 'Headphone prompt contains acoustic-specific geometry');
assert(promptPrism.includes('triangular prism') || promptPrism.includes('transmission'), 'Prism prompt contains optics-specific dispersion geometry');

// 3. Immutability Verification: Ensure Zero Textareas or Contenteditable in Prompt Generator
console.log('\n[E2E 3/4] Verifying Prompt Immutability (No in-browser prompt editing)...');
const promptGenPath = path.join(__dirname, 'src', 'components', 'prompt-generator', 'PromptGeneratorSection.tsx');
const promptGenSource = fs.readFileSync(promptGenPath, 'utf8');

assert(!promptGenSource.includes('<textarea'), 'PromptGeneratorSection contains ZERO <textarea> tags (strictly read-only)');
assert(!promptGenSource.toLowerCase().includes('contenteditable'), 'PromptGeneratorSection contains ZERO contenteditable attributes');
assert(promptGenSource.includes('<pre'), 'Prompt is rendered inside read-only <pre> container');
assert(promptGenSource.includes('id="prompt-display"'), 'Prompt container has correct id="prompt-display" selector');

// 4. Test HTTP Serving on Port 4898
console.log('\n[E2E 4/4] Testing Production HTTP Asset Delivery...');
const distDir = path.join(__dirname, 'dist');
const server = http.createServer((req, res) => {
  const reqUrl = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(distDir, reqUrl);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';
    else if (filePath.endsWith('.css')) contentType = 'text/css';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4898, () => {
  console.log('[E2E INFO] Test server listening on http://localhost:4898');

  http.get('http://localhost:4898/', (res) => {
    assert(res.statusCode === 200, 'GET / returned HTTP 200');

    http.get('http://localhost:4898/images/aurora-hero.svg', (imgRes) => {
      assert(imgRes.statusCode === 200, 'GET /images/aurora-hero.svg returned HTTP 200');
      assert(imgRes.headers['content-type'] === 'image/svg+xml', 'Asset has image/svg+xml content-type');

      server.close(() => {
        console.log(`\n--- E2E Summary: ${passed} passed, ${failed} failed ---`);
        if (failed > 0) process.exit(1);
        console.log('--- ALL PromptDock 8.1 E2E Tests PASSED (100% Success) ---');
        process.exit(0);
      });
    });
  });
});
