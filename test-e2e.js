const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 7.1 End-to-End (E2E) Test Suite ---');
let passed = 0;
let failed = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`[E2E PASS] ${msg}`);
    passed++;
  } else {
    console.error(`[E2E FAIL] ${msg}`);
    failed++;
  }
}

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
    if (ext === '.json') contentType = 'application/json';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 4898;
server.listen(PORT, async () => {
  console.log(`[E2E INFO] Test server listening on http://localhost:${PORT}`);

  try {
    // 1. Test GET /
    const htmlData = await new Promise((resolve, reject) => {
      http.get(`http://localhost:${PORT}/`, (res) => {
        assert(res.statusCode === 200, 'GET / returned HTTP 200');
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve(body));
      }).on('error', reject);
    });

    // 2. Validate Key 7.1 Elements & Branding
    assert(htmlData.includes('PromptDock 7.1'), 'Page contains PromptDock 7.1 title');
    assert(htmlData.includes('Discover the <span>next dimension</span> of web design.') || htmlData.includes('Discover the next dimension of web design'), 'Headline is present');
    assert(htmlData.includes('"Discover the visual. Copy the prompt. Build it with AI."'), 'Tagline is present');
    assert(htmlData.includes('id="hero-canvas"'), 'Three.js Hero canvas exists');
    assert(htmlData.includes('id="inspector-canvas"'), 'Three.js Inspector canvas exists');

    // 3. Validate Visual Gallery & Search
    assert(htmlData.includes('id="gallery"'), 'Gallery section exists');
    assert(htmlData.includes('id="visual-search"'), 'Search input exists');
    assert(htmlData.includes('id="tech-filter"'), 'Tech dropdown exists');
    assert(htmlData.includes('id="perf-filter"'), 'Performance filter dropdown exists');
    assert(htmlData.includes('id="fav-toggle-btn"'), 'Favorites filter toggle button exists');
    assert(htmlData.includes('id="visuals-grid"'), 'Visuals cards grid container exists');

    // 4. Validate Inspector & Live Parameter Transfer
    assert(htmlData.includes('id="inspector"'), 'Inspector section exists');
    assert(htmlData.includes('id="insp-ctrl-color"'), 'Inspector color picker exists');
    assert(htmlData.includes('id="insp-ctrl-speed"'), 'Inspector speed slider exists');
    assert(htmlData.includes('id="insp-ctrl-density"'), 'Inspector density slider exists');
    assert(htmlData.includes('id="insp-ctrl-glow"'), 'Inspector glow slider exists');
    assert(htmlData.includes('id="insp-ctrl-cam"'), 'Inspector camera zoom slider exists');
    assert(htmlData.includes('id="btn-toggle-wireframe"'), 'Wireframe toggle button exists');
    assert(htmlData.includes('id="fps-display"'), 'Live FPS display element exists');
    assert(htmlData.includes('loadVisualIntoPromptBuilder'), 'loadVisualIntoPromptBuilder function exists');
    assert(htmlData.includes('id="config-summary-bar"'), 'Active Configuration Summary Bar exists');

    // 5. Validate Studios (and verified removal of modification)
    assert(htmlData.includes('id="prompt-generator"'), 'AI Build Prompt Studio exists');
    assert(htmlData.includes('id="prompt-output-display"'), 'Prompt display output box exists');
    assert(htmlData.includes('id="combine-visuals"'), 'Combine 3D Visuals Studio exists');
    assert(htmlData.includes('id="combo-output-display"'), 'Combination output display exists');
    assert(htmlData.includes('id="workflow"'), 'Workflow strip exists');
    assert(htmlData.includes('id="cmd-palette"'), 'Command palette exists');
    assert(!htmlData.includes('id="modify-website"'), 'Confirmed: #modify-website is absent from DOM');

    // 6. Test Key Static Assets over HTTP
    const testAssets = [
      '/images/aurora-hero.svg',
      '/images/orbit-scene.svg',
      '/images/comp-3d.svg',
      '/images/glass-cards.svg',
      '/images/particle-cloud.svg',
      '/images/example-product-3d.svg',
      '/images/example-chrono.svg',
      '/images/comp-buttons.svg',
      '/images/lib-border-beam.svg',
      '/images/lib-thinking-orb.svg',
      '/images/favicon.svg'
    ];

    for (const asset of testAssets) {
      await new Promise((resolve) => {
        http.get(`http://localhost:${PORT}${asset}`, (res) => {
          assert(res.statusCode === 200, `Asset ${asset} returned HTTP 200`);
          assert(res.headers['content-type'] === 'image/svg+xml', `Asset ${asset} has image/svg+xml content-type`);
          resolve();
        });
      });
    }

    console.log(`\n--- E2E Summary: ${passed} passed, ${failed} failed ---`);
    server.close(() => {
      if (failed > 0) {
        console.error('--- E2E Test Suite FAILED ---');
        process.exit(1);
      } else {
        console.log('--- ALL PromptDock 7.1 E2E Tests PASSED (100% Success) ---');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('[E2E CRITICAL ERROR]', err);
    server.close(() => process.exit(1));
  }
});
