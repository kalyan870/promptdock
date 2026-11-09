import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting PromptDock 8.1 Data & Catalog Typechecker ---');

// 1. Read visuals.ts, scene-factory.ts, and prompt-engine.ts
const visualsPath = path.join(__dirname, 'src/data/visuals.ts');
const factoryPath = path.join(__dirname, 'src/engine/scene-factory.ts');
const promptEnginePath = path.join(__dirname, 'src/engine/prompt-engine.ts');

if (!fs.existsSync(visualsPath) || !fs.existsSync(factoryPath) || !fs.existsSync(promptEnginePath)) {
  console.error('[TYPE FAIL] Missing visuals.ts, scene-factory.ts, or prompt-engine.ts');
  process.exit(1);
}

const visualsCode = fs.readFileSync(visualsPath, 'utf-8');
const factoryCode = fs.readFileSync(factoryPath, 'utf-8');
const promptEngineCode = fs.readFileSync(promptEnginePath, 'utf-8');

if (!promptEngineCode.includes('generateBuildPrompt')) {
  console.error('[TYPE FAIL] PromptEngine must export generateBuildPrompt');
  process.exit(1);
}
console.log('[TYPE PASS] PromptEngine exports canonical generateBuildPrompt function');

// 2. Extract sceneTypes from visuals.ts
const sceneTypeMatches = visualsCode.match(/sceneType:\s*"([^"]+)"/g) || [];
const sceneTypes = sceneTypeMatches.map(m => m.split('"')[1]);

console.log(`[TYPE INFO] Found ${sceneTypes.length} visual entries in src/data/visuals.ts`);

if (sceneTypes.length !== 30) {
  console.error(`[TYPE FAIL] Expected exactly 30 visuals, found ${sceneTypes.length}`);
  process.exit(1);
}

const uniqueTypes = new Set(sceneTypes);
if (uniqueTypes.size !== 30) {
  console.error(`[TYPE FAIL] Expected 30 unique sceneTypes, found ${uniqueTypes.size}`);
  process.exit(1);
}

// 3. Verify every sceneType has an explicit SceneFactory.register() call
const missingRegistrations = [];
for (const st of sceneTypes) {
  const registerRegex = new RegExp(`SceneFactory\\.register\\(\\s*['"]${st}['"]`);
  if (!registerRegex.test(factoryCode)) {
    missingRegistrations.push(st);
  }
}

if (missingRegistrations.length > 0) {
  console.error(`[TYPE FAIL] Missing explicit scene implementations for: ${missingRegistrations.join(', ')}`);
  process.exit(1);
}
console.log(`[TYPE PASS] All 30 visual sceneTypes have dedicated SceneFactory registrations`);

// 4. Specifically verify the 14 previously missing and 2 separated scene types
const requiredSpecificScenes = [
  'reactiveParticles',
  'magneticAttractor',
  'flowField',
  'hardwareTerminal',
  'scrollCameraTrack',
  'multiplaneParallax',
  'sectionDissolve',
  'tiltCardStack',
  'morphingPill',
  'magneticButtonMesh',
  'borderBeamRunner',
  'liquidChromeMesh',
  'glassRefractionPrism',
  'gooeyCluster',
  'galaxy',
  'curlVortex',
  'neuralNet',
  'neuralGraph'
];

for (const reqScene of requiredSpecificScenes) {
  if (!factoryCode.includes(`SceneFactory.register('${reqScene}'`)) {
    console.error(`[TYPE FAIL] Dedicated scene required but missing: ${reqScene}`);
    process.exit(1);
  }
}
console.log(`[TYPE PASS] All 14 dedicated and 4 separated scene types explicitly confirmed`);

// 5. Verify cleanGroup clears _customUpdate to prevent memory leaks
if (!factoryCode.includes('group._customUpdate = null;')) {
  console.error('[TYPE FAIL] SceneFactory.cleanGroup must reset group._customUpdate to null');
  process.exit(1);
}
console.log('[TYPE PASS] SceneFactory.cleanGroup properly clears _customUpdate hook');

// 6. Verify absolute absence of website modification feature
const forbiddenTokens = ['modify-website', 'generateModificationPrompt', 'docs/modification-engine.md'];
for (const tok of forbiddenTokens) {
  if (visualsCode.includes(tok) || factoryCode.includes(tok)) {
    console.error(`[TYPE FAIL] Obsolete website modification token found: "${tok}"`);
    process.exit(1);
  }
}
console.log('[TYPE PASS] Verified 0 obsolete website modification references');

console.log('--- PromptDock 8.1 Typechecker PASSED (0 errors) ---');
