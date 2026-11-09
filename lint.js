import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 8.1 Code Linter ---');

let errors = 0;

function check(desc, condition) {
  if (condition) {
    console.log(`[LINT PASS] ${desc}`);
  } else {
    console.error(`[LINT FAIL] ${desc}`);
    errors++;
  }
}

// 1. Check index.html
const indexPath = path.join(__dirname, 'index.html');
check('index.html exists', fs.existsSync(indexPath));
const html = fs.readFileSync(indexPath, 'utf-8');

check('index.html contains DOCTYPE', html.includes('<!DOCTYPE html>'));
check('index.html contains PromptDock 8.1 title', html.includes('PromptDock 8.1'));
check('index.html contains root mount div', html.includes('<div id="root"></div>'));
check('index.html loads main.tsx', html.includes('/src/main.tsx'));
check('index.html includes favicon link', html.includes('/images/favicon.svg'));

// Tag balance checks in index.html
const tags = ['html', 'head', 'body'];
for (const t of tags) {
  const openCount = (html.match(new RegExp(`<${t}[^>]*>`, 'gi')) || []).length;
  const closeCount = (html.match(new RegExp(`</${t}>`, 'gi')) || []).length;
  check(`Tag balance <${t}>: ${openCount} open, ${closeCount} close`, openCount === 1 && closeCount === 1);
}

// 2. Check React component tree files
const requiredComponents = [
  'src/App.tsx',
  'src/main.tsx',
  'src/data/visuals.ts',
  'src/engine/scene-factory.ts',
  'src/engine/prompt-engine.ts',
  'src/components/hero/HorizonHeroSection.tsx',
  'src/components/navigation/Header.tsx',
  'src/components/workflow/WorkflowSection.tsx',
  'src/components/gallery/GallerySection.tsx',
  'src/components/inspector/InspectorSection.tsx',
  'src/components/prompt-generator/PromptGeneratorSection.tsx',
  'src/components/visual-composer/VisualComposerSection.tsx',
  'src/components/footer/Footer.tsx'
];

for (const comp of requiredComponents) {
  const p = path.join(__dirname, comp);
  check(`Component exists: ${comp}`, fs.existsSync(p));
}

// 3. Verify 21st.dev Scott Clayton Horizon Hero attribution
const heroCode = fs.readFileSync(path.join(__dirname, 'src/components/hero/HorizonHeroSection.tsx'), 'utf-8');
check('Hero component contains Scott Clayton author credit', heroCode.includes('Scott Clayton'));
check('Hero component contains @lovesickfromthe6ix credit', heroCode.includes('lovesickfromthe6ix'));
check('Hero component contains MIT license attribution', heroCode.includes('MIT'));
check('Hero component contains 21st.dev reference', heroCode.includes('21st.dev'));

// 4. Verify absolute removal of Modify Website feature
const allCode = [
  html,
  heroCode,
  fs.readFileSync(path.join(__dirname, 'src/App.tsx'), 'utf-8'),
  fs.readFileSync(path.join(__dirname, 'src/components/prompt-generator/PromptGeneratorSection.tsx'), 'utf-8')
].join('\n');

check('No modify-website element in application', !allCode.includes('id="modify-website"'));
check('No generateModificationPrompt function in application', !allCode.includes('generateModificationPrompt'));

// 5. Verify Prompt Immutability (zero textareas in PromptGeneratorSection)
const promptGenCode = fs.readFileSync(path.join(__dirname, 'src/components/prompt-generator/PromptGeneratorSection.tsx'), 'utf-8');
check('PromptGeneratorSection has NO <textarea> (strictly immutable)', !promptGenCode.includes('<textarea'));
check('PromptGeneratorSection has NO contenteditable', !promptGenCode.toLowerCase().includes('contenteditable'));

if (errors > 0) {
  console.error(`\n--- PromptDock 8.1 Linter FAILED with ${errors} error(s) ---`);
  process.exit(1);
}

console.log('--- PromptDock 8.1 Linter PASSED (0 errors) ---');
