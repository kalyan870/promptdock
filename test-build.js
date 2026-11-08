const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock Production Verification Suite ---');

let passed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
  } else {
    console.error(`[FAIL] ${message}`);
    passed = false;
  }
}

// 1. Check index.html exists
const indexPath = path.join(__dirname, 'index.html');
assert(fs.existsSync(indexPath), 'index.html exists');

const html = fs.readFileSync(indexPath, 'utf-8');
assert(html.includes('<title>PromptDock'), 'HTML contains correct title');
assert(html.includes('images/favicon.svg'), 'HTML links to favicon');
assert(html.includes('images/og-image.svg'), 'HTML includes social meta preview image');
assert(html.includes('id="resources"'), 'HTML includes Free Resources section');
assert(html.includes('21st.dev'), 'HTML includes 21st.dev integration');
assert(html.includes('Libraries.dev'), 'HTML includes Libraries.dev integration');

// 2. Check all 12 prompt images + meta images exist
const imagesDir = path.join(__dirname, 'images');
assert(fs.existsSync(imagesDir), 'images directory exists');

const requiredImages = [
  'aurora-hero.svg',
  'tidewave-landing.svg',
  'folio-dark.svg',
  'shop-rail.svg',
  'orbit-scene.svg',
  'mesh-glow.svg',
  'halftone-tide.svg',
  'split-hero.svg',
  'agency-one.svg',
  'gallery-wall.svg',
  'menu-board.svg',
  'glass-cards.svg',
  'favicon.svg',
  'og-image.svg'
];

requiredImages.forEach(img => {
  const p = path.join(imagesDir, img);
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  assert(exists && size > 50, `Image asset ${img} exists and is valid (${size} bytes)`);
});

// 3. Test HTTP Server and endpoint delivery
const server = http.createServer((req, res) => {
  let file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const ext = path.extname(filePath);
    const contentType = ext === '.html' ? 'text/html' : ext === '.svg' ? 'image/svg+xml' : 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4893, async () => {
  console.log('[INFO] Test server listening on http://localhost:4893');
  try {
    const checkUrl = (urlPath) => new Promise((resolve, reject) => {
      http.get(`http://localhost:4893${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, data }));
      }).on('error', reject);
    });

    const homeRes = await checkUrl('/');
    assert(homeRes.statusCode === 200, 'GET / returned HTTP 200');
    assert(homeRes.data.includes('21st.dev'), 'Home response contains 21st.dev');
    assert(homeRes.data.includes('Libraries.dev'), 'Home response contains Libraries.dev');

    const imgRes = await checkUrl('/images/aurora-hero.svg');
    assert(imgRes.statusCode === 200, 'GET /images/aurora-hero.svg returned HTTP 200');
    assert(imgRes.data.includes('<svg'), 'Image endpoint returned valid SVG data');

    server.close(() => {
      if (!passed) {
        console.error('--- Production Verification FAILED ---');
        process.exit(1);
      } else {
        console.log('--- ALL Production Verifications PASSED (100% Success) ---');
        process.exit(0);
      }
    });
  } catch (err) {
    console.error('[ERROR]', err);
    server.close(() => process.exit(1));
  }
});
