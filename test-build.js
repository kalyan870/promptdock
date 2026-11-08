const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock 3D Ultra Comprehensive Verification Suite ---');

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
assert(html.includes('three.min.js'), 'HTML includes Three.js CDN');
assert(html.includes('gsap.min.js'), 'HTML includes GSAP CDN');
assert(html.includes('ScrollTrigger.min.js'), 'HTML includes GSAP ScrollTrigger');
assert(html.includes('hero-canvas'), 'HTML includes 3D hero canvas');
assert(html.includes('card-glare'), 'HTML includes 3D perspective glare effect');
assert(html.includes('id="resources"'), 'HTML includes 3D & Animation Ecosystem resources section');

// 2. Check Master Prompt Ecosystem Resources
const expectedResources = [
  '21st.dev',
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
  'LottieFiles',
  'Libraries.dev'
];

expectedResources.forEach(resName => {
  assert(html.includes(resName), `Resource "${resName}" is present in ecosystem directory`);
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

server.listen(4895, async () => {
  console.log('[INFO] Test server listening on http://localhost:4895');
  try {
    const checkUrl = (urlPath) => new Promise((resolve, reject) => {
      http.get(`http://localhost:4895${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, data }));
      }).on('error', reject);
    });

    const homeRes = await checkUrl('/');
    assert(homeRes.statusCode === 200, 'GET / returned HTTP 200');
    assert(homeRes.data.includes('Three.js'), 'Home response contains Three.js');
    assert(homeRes.data.includes('React Three Fiber'), 'Home response contains React Three Fiber');
    assert(homeRes.data.includes('Spline'), 'Home response contains Spline');
    assert(homeRes.data.includes('21st.dev'), 'Home response contains 21st.dev');

    const imgRes = await checkUrl('/images/nexus-dashboard.svg');
    assert(imgRes.statusCode === 200 && imgRes.data.includes('<svg'), 'GET /images/nexus-dashboard.svg returned valid SVG');

    server.close(() => {
      if (!passed) {
        console.error('--- Production Verification FAILED ---');
        process.exit(1);
      } else {
        console.log('--- ALL PromptDock 3D Ultra Verifications PASSED (100% Success) ---');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('[ERROR]', err);
    server.close(() => process.exit(1));
  }
});
