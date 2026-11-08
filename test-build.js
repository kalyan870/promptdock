const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('--- Starting PromptDock Comprehensive Production Verification Suite ---');

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
assert(html.includes('<title>PromptDock'), 'HTML contains correct title');
assert(html.includes('images/favicon.svg'), 'HTML links to favicon');
assert(html.includes('images/og-image.svg'), 'HTML includes social meta preview image');
assert(html.includes('id="resources"'), 'HTML includes Free Resources section');
assert(html.includes('21st.dev'), 'HTML includes 21st.dev integration');
assert(html.includes('Libraries.dev'), 'HTML includes Libraries.dev integration');
assert(html.includes('tab-prompt') && html.includes('tab-specs') && html.includes('tab-code'), 'HTML includes modal tabs (Prompt, Specs, Code)');
assert(html.includes('fav-btn'), 'HTML includes Favorites / bookmarking system');
assert(html.includes('checkHash()'), 'HTML includes URL deep-linking support');

// 2. Check Repository Meta & Open Source files
assert(fs.existsSync(path.join(__dirname, 'CONTRIBUTING.md')), 'CONTRIBUTING.md exists');
assert(fs.existsSync(path.join(__dirname, 'SECURITY.md')), 'SECURITY.md exists');
assert(fs.existsSync(path.join(__dirname, 'robots.txt')), 'robots.txt exists');
assert(fs.existsSync(path.join(__dirname, 'sitemap.xml')), 'sitemap.xml exists');
assert(fs.existsSync(path.join(__dirname, '.github/workflows/ci.yml')), 'GitHub Actions CI workflow exists');

// 3. Check all 16 prompt images + meta images exist
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
  'liquid-metal.svg',
  'dynamic-island.svg',
  'kinetic-type.svg',
  'particle-cloud.svg',
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

server.listen(4894, async () => {
  console.log('[INFO] Test server listening on http://localhost:4894');
  try {
    const checkUrl = (urlPath) => new Promise((resolve, reject) => {
      http.get(`http://localhost:4894${urlPath}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, data }));
      }).on('error', reject);
    });

    const homeRes = await checkUrl('/');
    assert(homeRes.statusCode === 200, 'GET / returned HTTP 200');
    assert(homeRes.data.includes('21st.dev'), 'Home response contains 21st.dev');
    assert(homeRes.data.includes('Libraries.dev'), 'Home response contains Libraries.dev');

    const sitemapRes = await checkUrl('/sitemap.xml');
    assert(sitemapRes.statusCode === 200 && sitemapRes.data.includes('<urlset'), 'GET /sitemap.xml returned valid XML');

    const robotsRes = await checkUrl('/robots.txt');
    assert(robotsRes.statusCode === 200 && robotsRes.data.includes('User-agent'), 'GET /robots.txt returned valid text');

    const imgRes = await checkUrl('/images/liquid-metal.svg');
    assert(imgRes.statusCode === 200 && imgRes.data.includes('<svg'), 'GET /images/liquid-metal.svg returned valid SVG');

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
