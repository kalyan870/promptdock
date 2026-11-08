const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock 6.0 Master Verification Suite ---');

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
assert(html.includes('<title>PromptDock 6.0 — The Real Interactive Creative Developer Platform</title>'), 'HTML contains correct PromptDock 6.0 title');

// 2. Section Canvases
assert(html.includes('id="hero-canvas"'), 'Hero section contains 3D canvas (#hero-canvas)');
assert(html.includes('id="component-canvas"'), 'Component section contains 3D canvas (#component-canvas)');
assert(html.includes('id="workflow-canvas"'), 'Workflow section contains 3D canvas (#workflow-canvas)');
assert(html.includes('id="modal-3d-canvas"'), 'Modal contains 3D inspector canvas (#modal-3d-canvas)');

// 3. Section Headers & Discovery Features
assert(html.includes('id="pg-component-mount"'), 'Live Component Playground mount exists');
assert(html.includes('Component Marketplace') || html.includes('Visual Component Marketplace'), 'Component Marketplace section exists');
assert(html.includes('Creative Effects'), 'Creative Effects & Shader Registry exists');
assert(html.includes('Workflow Studio'), 'Workflow Studio section exists');
assert(html.includes('Showcase Projects &amp; Case Studies') || html.includes('Showcase Projects & Case Studies'), 'Showcase Projects section exists');
assert(html.includes('id="cmd-palette"'), 'Global Command Palette exists');
assert(html.includes('images/workflow-agents.svg'), 'AI Coding Agent Pipeline visual referenced');

// 4. Libraries & Scripts
assert(html.includes('three.min.js'), 'HTML loads Three.js');
assert(html.includes('gsap.min.js'), 'HTML loads GSAP');

// 5. Ecosystem & Attribution Checks
const requiredResources = [
  '21st.dev',
  'Libraries.dev',
  'Aceternity UI',
  'Magic UI',
  'shadcn/ui',
  'Three.js',
  'React Three Fiber',
  'GSAP',
  'Motion',
  'Spline',
  'Spectrum UI',
  'LottieFiles'
];

requiredResources.forEach(res => {
  assert(html.includes(res), `Ecosystem resource "${res}" is present`);
});

assert(html.includes('https://libraries.dev'), 'Canonical attribution URL https://libraries.dev is present');

// 6. Image Assets Checks
const imagesDir = path.join(__dirname, 'images');
assert(fs.existsSync(imagesDir), 'images directory exists');

const requiredImages = [
  'comp-hero.svg',
  'comp-navbar.svg',
  'comp-buttons.svg',
  'comp-cards.svg',
  'comp-pricing.svg',
  'comp-bento.svg',
  'comp-chat.svg',
  'comp-forms.svg',
  'comp-text.svg',
  'comp-3d.svg',
  'comp-backgrounds.svg',
  'lib-border-beam.svg',
  'lib-thinking-orb.svg',
  'lib-liquid-metal.svg',
  'lib-gooey.svg',
  'lib-voice-viz.svg',
  'lib-magnetic.svg',
  'res-21st.svg',
  'res-libraries.svg',
  'example-lumina.svg',
  'example-nova.svg',
  'example-cyberfolio.svg',
  'example-chrono.svg',
  'example-saas-dash.svg',
  'example-ai-chat.svg',
  'example-dev-folio.svg',
  'example-product-3d.svg',
  'workflow-pipeline.svg',
  'workflow-agents.svg',
  'architecture-dock.svg',
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
      assert(data.includes('PromptDock 6.0'), 'Home response contains PromptDock 6.0');
      assert(data.includes('hero-canvas'), 'Home response contains hero-canvas');
      assert(data.includes('comp-hero.svg'), 'Home response contains comp-hero.svg');

      http.get('http://localhost:4897/images/workflow-agents.svg', (imgRes) => {
        assert(imgRes.statusCode === 200, 'GET /images/workflow-agents.svg returned valid SVG');

        http.get('http://localhost:4897/images/res-libraries.svg', (wfRes) => {
          assert(wfRes.statusCode === 200, 'GET /images/res-libraries.svg returned valid SVG');

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
