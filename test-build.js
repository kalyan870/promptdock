const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock 3D Ultra Master Verification Suite ---');

let passed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    passed = false;
  }
}

// 1. Check index.html exists and features
const indexPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(indexPath), 'index.html exists');

const html = fs.readFileSync(indexPath, 'utf-8');
assert(html.includes('<title>PromptDock 3D Ultra'), 'HTML contains correct title');
assert(html.includes('hero-canvas'), 'Hero section contains 3D canvas');
assert(html.includes('ecosystem-canvas'), 'Ecosystem section contains 3D canvas');
assert(html.includes('workflow-canvas'), 'Workflow section contains 3D canvas');
assert(html.includes('modal-3d-canvas'), 'Modal contains 3D inspector canvas');
assert(html.includes('examples-grid'), 'Live Examples section exists');
assert(html.includes('three.min.js'), 'HTML loads Three.js');
assert(html.includes('gsap.min.js'), 'HTML loads GSAP');

// 2. Check 13 Ecosystem Resources with 21st.dev and Libraries.dev
const expectedResources = [
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
  'MotionSites',
  'Spectrum UI',
  'LottieFiles'
];

expectedResources.forEach(resName => {
  assert(html.includes(resName), `Ecosystem resource "${resName}" is present`);
});

// 3. Check All Image Assets Exist
const imagesDir = path.join(__dirname, 'images');
assert(fs.existsSync(imagesDir), 'images directory exists');

const requiredImages = [
  'aurora-hero.svg',
  'nexus-dashboard.svg',
  'ai-generator.svg',
  'orbit-scene.svg',
  'liquid-metal.svg',
  'saas-matrix.svg',
  'tidewave-landing.svg',
  'dynamic-island.svg',
  'folio-dark.svg',
  'shop-rail.svg',
  'kinetic-type.svg',
  'particle-cloud.svg',
  'next-react.svg',
  'motion-physics.svg',
  'glass-cards.svg',
  'agency-one.svg',
  'example-lumina.svg',
  'example-nova.svg',
  'example-cyberfolio.svg',
  'example-chrono.svg',
  'workflow-3d.svg',
  'favicon.svg',
  'og-image.svg'
];

requiredImages.forEach(img => {
  const p = path.join(imagesDir, img);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 50, `Image asset ${img} exists and is valid (${size} bytes)`);
});

// 4. Test HTTP Server and endpoint delivery
const server = http.createServer((req, res) => {
  let file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : 
                        ext === '.svg' ? 'image/svg+xml' : 
                        ext === '.xml' ? 'application/xml' : 
                        ext === '.txt' ? 'text/plain' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4896, async () => {
  console.log('[INFO] Test server listening on http://localhost:4896');
  try {
    const checkUrl = (urlPath) => new Promise((resolve, reject) => {
      http.get(`http://localhost:4896${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, data }));
      }).on('error', reject);
    });

    const homeRes = await checkUrl('/');
    assert(homeRes.statusCode === 200, 'GET / returned HTTP 200');
    assert(homeRes.data.includes('PromptDock 3D Ultra'), 'Home response contains PromptDock 3D Ultra');
    assert(homeRes.data.includes('ecosystem-canvas'), 'Home response contains ecosystem-canvas');
    assert(homeRes.data.includes('workflow-canvas'), 'Home response contains workflow-canvas');

    const luminaRes = await checkUrl('/images/example-lumina.svg');
    assert(luminaRes.statusCode === 200 && luminaRes.data.includes('<svg'), 'GET /images/example-lumina.svg returned valid SVG');

    const workflowRes = await checkUrl('/images/workflow-3d.svg');
    assert(workflowRes.statusCode === 200 && workflowRes.data.includes('<svg'), 'GET /images/workflow-3d.svg returned valid SVG');

    server.close(() => {
      if (!passed) {
        console.error('--- Verification FAILED ---');
        process.exit(1);
      } else {
        console.log('--- ALL Master Suite Verifications PASSED (100% Success) ---');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('[ERROR]', err);
    server.close(() => process.exit(1));
  }
});
