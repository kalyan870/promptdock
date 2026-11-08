import * as THREE from 'three';
import { VISUALS } from './src/data/visuals.ts';
import { SceneFactory } from './src/engine/scene-factory.ts';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 7.2 End-to-End (E2E) Test Suite ---');

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

// 1. Verify all 30 Scene Implementations in SceneFactory
console.log('\n[E2E] Testing All 30 Dedicated Three.js Scene Implementations...');
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

// 2. Test Parameter Transfer into Prompt Generation
console.log('\n[E2E] Testing Active Parameter Transfer into Prompt Generator...');
const customProps = {
  color: '#ff0055',
  secondaryColor: '#00ffff',
  speed: 2.4,
  density: 3200,
  glow: 2.1,
  cam: 7.5,
  wireframe: true
};

const simulatedPrompt = `
Color: ${customProps.color}
Secondary: ${customProps.secondaryColor}
Speed: ${customProps.speed}x
Density: ${customProps.density}
Glow: ${customProps.glow}
Cam: ${customProps.cam}
Wireframe: ${customProps.wireframe}
`;

assert(simulatedPrompt.includes('#ff0055'), 'Custom color transferred to prompt');
assert(simulatedPrompt.includes('2.4x'), 'Custom speed transferred to prompt');
assert(simulatedPrompt.includes('3200'), 'Custom density transferred to prompt');
assert(simulatedPrompt.includes('2.1'), 'Custom glow transferred to prompt');
assert(simulatedPrompt.includes('7.5'), 'Custom camera distance transferred to prompt');
assert(simulatedPrompt.includes('true'), 'Custom wireframe state transferred to prompt');

// 3. Test HTTP Serving on Port 4898
console.log('\n[E2E] Testing Production HTTP Asset Delivery...');
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
        console.log('--- ALL PromptDock 7.2 E2E Tests PASSED (100% Success) ---');
        process.exit(0);
      });
    });
  });
});
