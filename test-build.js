import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 7.2 Master Verification Suite ---');

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

// 1. Verify build output exists
const distDir = path.join(__dirname, 'dist');
assert(fs.existsSync(distDir), 'dist directory exists');

const distIndex = path.join(distDir, 'index.html');
assert(fs.existsSync(distIndex), 'dist/index.html exists');

const html = fs.readFileSync(distIndex, 'utf-8');
assert(html.includes('PromptDock 7.2'), 'dist/index.html contains PromptDock 7.2');
assert(html.includes('id="root"'), 'dist/index.html contains root mount div');

// 2. Verify all 54 image assets in dist/images
const imagesDir = path.join(distDir, 'images');
assert(fs.existsSync(imagesDir), 'dist/images directory exists');

const files = fs.readdirSync(imagesDir);
assert(files.length >= 50, `Found ${files.length} image assets in dist/images (expected >= 50)`);

for (const f of files) {
  const stat = fs.statSync(path.join(imagesDir, f));
  assert(stat.size > 100, `Asset dist/images/${f} size is valid (${stat.size} bytes)`);
}

// 3. Start Ephemeral HTTP Server on Port 4897 to test real asset serving
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

server.listen(4897, () => {
  console.log('[INFO] Test server listening on http://localhost:4897');

  // Request root /
  http.get('http://localhost:4897/', (res) => {
    assert(res.statusCode === 200, 'GET / returned HTTP 200');
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      assert(data.includes('PromptDock 7.2'), 'Response contains PromptDock 7.2');
      assert(data.includes('root'), 'Response contains root div');

      // Request an image asset
      http.get('http://localhost:4897/images/aurora-hero.svg', (imgRes) => {
        assert(imgRes.statusCode === 200, 'GET /images/aurora-hero.svg returned HTTP 200');
        assert(imgRes.headers['content-type'] === 'image/svg+xml', 'Asset has image/svg+xml content-type');

        server.close(() => {
          console.log(`\n--- Test Summary: ${passed} passed, ${failed} failed ---`);
          if (failed > 0) process.exit(1);
          console.log('--- ALL Master Suite Verifications PASSED (100% Success) ---');
          process.exit(0);
        });
      });
    });
  });
});
