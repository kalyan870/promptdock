const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 6.0 End-to-End (E2E) Test Suite ---');
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

    // 2. Validate Key 6.0 Elements
    assert(htmlData.includes('PromptDock 6.0'), 'Page contains PromptDock 6.0 title');
    assert(htmlData.includes('id="pg-component-mount"'), 'Live Component Playground mount (#pg-component-mount) exists');
    assert(htmlData.includes('id="ctrl-text"'), 'Live Playground Property Text Control (#ctrl-text) exists');
    assert(htmlData.includes('id="ctrl-color"'), 'Live Playground Color Control (#ctrl-color) exists');
    assert(htmlData.includes('id="ctrl-speed"'), 'Live Playground Speed Slider (#ctrl-speed) exists');
    assert(htmlData.includes('id="pg-code-display"'), 'Playground Production Code Display (#pg-code-display) exists');
    assert(htmlData.includes('id="effects-grid"'), 'Creative Effects Registry (#effects-grid) exists');
    assert(htmlData.includes('https://libraries.dev'), 'Verified canonical attribution to https://libraries.dev');
    assert(htmlData.includes('images/workflow-agents.svg'), 'AI Coding Agent Pipeline visual (workflow-agents.svg) referenced');
    assert(htmlData.includes('id="hero-canvas"'), 'Three.js Hero canvas exists');
    assert(htmlData.includes('id="component-canvas"'), 'Three.js Component canvas exists');
    assert(htmlData.includes('id="workflow-canvas"'), 'Three.js Workflow canvas exists');
    assert(htmlData.includes('id="modal-3d-canvas"'), 'Three.js Modal canvas exists');
    assert(htmlData.includes('openProjectModal'), 'Project detail inspection modal function exists');

    // 3. Test Navigation Section Targets
    const requiredSections = [
      'playground',
      'components',
      'effects',
      'library',
      'agents',
      'workflow',
      'examples',
      'resources'
    ];
    requiredSections.forEach(sec => {
      assert(htmlData.includes(`id="${sec}"`), `Section target #${sec} exists in DOM`);
    });

    // 4. Test Key Static Assets over HTTP
    const testAssets = [
      '/images/workflow-agents.svg',
      '/images/res-libraries.svg',
      '/images/res-21st.svg',
      '/images/comp-buttons.svg',
      '/images/comp-cards.svg',
      '/images/lib-border-beam.svg',
      '/images/example-lumina.svg',
      '/images/example-saas-dash.svg',
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
        console.log('--- ALL PromptDock 6.0 E2E Tests PASSED (100% Success) ---');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('[E2E CRITICAL ERROR]', err);
    server.close(() => process.exit(1));
  }
});
