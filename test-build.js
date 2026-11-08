const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock 7.0 Master Verification Suite ---');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Filesystem & Core HTML Checks
const indexPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(indexPath), 'index.html exists');

const html = fs.readFileSync(indexPath, 'utf-8');
assert(html.includes('<title>PromptDock 7.0 — 3D Website Visual Prompt Studio</title>'), 'HTML contains correct PromptDock 7.0 title');
assert(html.includes('"Discover the visual. Copy the prompt. Build it with AI."'), 'HTML contains core product tagline');

// 2. Section Canvases & Interactive WebGL Viewports
assert(html.includes('id="hero-canvas"'), 'Hero section contains 3D canvas (#hero-canvas)');
assert(html.includes('id="inspector-canvas"'), 'Inspector section contains 3D canvas (#inspector-canvas)');

// 3. Core Studios & Functional Modules
assert(html.includes('id="gallery"'), '3D Visual Discovery Library section exists (#gallery)');
assert(html.includes('id="inspector"'), '3D Visual Inspector section exists (#inspector)');
assert(html.includes('id="prompt-generator"'), 'AI Build Prompt Studio section exists (#prompt-generator)');
assert(html.includes('id="modify-website"'), 'Modify Existing Website section exists (#modify-website)');
assert(html.includes('id="combine-visuals"'), 'Combine 3D Visuals section exists (#combine-visuals)');
assert(html.includes('id="workflow"'), 'End-to-end workflow section exists (#workflow)');
assert(html.includes('id="cmd-palette"'), 'Global Command Palette exists (#cmd-palette)');
assert(html.includes('id="toast"'), 'Toast notification element exists (#toast)');

// 4. Libraries & Scripts
assert(html.includes('three.min.js'), 'HTML loads Three.js CDN');
assert(html.includes('gsap.min.js'), 'HTML loads GSAP CDN');

// 5. Ecosystem & References
const ecosystem = [
  'Three.js',
  'React Three Fiber',
  'Libraries.dev',
  '21st.dev'
];
ecosystem.forEach(res => {
  assert(html.includes(res), `Ecosystem reference "${res}" is present`);
});

// 6. Image Assets Checks
const imagesDir = path.join(__dirname, 'images');
assert(fs.existsSync(imagesDir), 'images directory exists');

const requiredImages = [
  'aurora-hero.svg',
  'orbit-scene.svg',
  'comp-3d.svg',
  'glass-cards.svg',
  'kinetic-type.svg',
  'particle-cloud.svg',
  'halftone-tide.svg',
  'ai-generator.svg',
  'example-lumina.svg',
  'motion-physics.svg',
  'lib-magnetic.svg',
  'workflow-3d.svg',
  'example-product-3d.svg',
  'example-chrono.svg',
  'example-cyberfolio.svg',
  'tidewave-landing.svg',
  'folio-dark.svg',
  'split-hero.svg',
  'comp-cards.svg',
  'dynamic-island.svg',
  'comp-buttons.svg',
  'lib-border-beam.svg',
  'lib-liquid-metal.svg',
  'lib-gooey.svg',
  'lib-thinking-orb.svg',
  'lib-voice-viz.svg',
  'nexus-dashboard.svg',
  'favicon.svg',
  'og-image.svg'
];

requiredImages.forEach(img => {
  const p = path.join(imagesDir, img);
  const exists = fs.existsSync(p);
  if (exists) {
    const size = fs.statSync(p).size;
    assert(size > 100, `Image asset ${img} exists and is valid (${size} bytes)`);
  } else {
    assert(false, `Image asset ${img} is missing`);
  }
});

// 7. Local HTTP Server Integration Verification
const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? 'index.html' : req.url;
  reqPath = reqPath.split('?')[0];
  const filePath = path.join(__dirname, reqPath);

  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    if (ext === '.html') contentType = 'text/html';
    if (ext === '.svg') contentType = 'image/svg+xml';
    if (ext === '.js') contentType = 'text/javascript';
    if (ext === '.css') contentType = 'text/css';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4897, () => {
  console.log('[INFO] Test server listening on http://localhost:4897');

  http.get('http://localhost:4897/', (res) => {
    assert(res.statusCode === 200, 'GET / returned HTTP 200');

    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      assert(data.includes('PromptDock 7.0'), 'Home response contains PromptDock 7.0');
      assert(data.includes('hero-canvas'), 'Home response contains hero-canvas');
      assert(data.includes('inspector-canvas'), 'Home response contains inspector-canvas');

      http.get('http://localhost:4897/images/aurora-hero.svg', (imgRes) => {
        assert(imgRes.statusCode === 200, 'GET /images/aurora-hero.svg returned valid SVG');

        http.get('http://localhost:4897/images/orbit-scene.svg', (orbitRes) => {
          assert(orbitRes.statusCode === 200, 'GET /images/orbit-scene.svg returned valid SVG');

          server.close(() => {
            console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
            if (failed > 0) {
              console.error('Master Suite encountered failures!');
              process.exit(1);
            } else {
              console.log('--- ALL Master Suite Verifications PASSED (100% Success) ---');
              process.exit(0);
            }
          });
        });
      });
    });
  }).on('error', (err) => {
    console.error('Server request error:', err);
    server.close();
    process.exit(1);
  });
});
