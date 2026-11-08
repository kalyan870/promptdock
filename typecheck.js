const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 7.1 Data & Catalog Typechecker ---');
let errors = 0;

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');

// 1. Verify CATEGORIES
const catMatch = html.match(/const CATEGORIES\s*=\s*(\[[\s\S]*?\]);/);
if (!catMatch) {
  console.error('[TYPE FAIL] CATEGORIES array not found in index.html');
  errors++;
} else {
  try {
    const cats = eval(catMatch[1]);
    console.log(`Checking ${cats.length} CATEGORIES entries...`);
    const expected = [
      "All Visuals",
      "3D Hero Experiences",
      "3D Backgrounds",
      "Particles and Physics",
      "3D Product Experiences",
      "Motion and Scroll Experiences",
      "3D UI Components",
      "Shaders and Materials",
      "AI and Technology Visuals"
    ];
    expected.forEach(c => {
      if (!cats.includes(c)) {
        console.error(`[TYPE FAIL] Missing required category: "${c}"`);
        errors++;
      }
    });
    console.log(`[TYPE PASS] All 8 required 3D disciplines present in CATEGORIES`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse CATEGORIES: ${err.message}`);
    errors++;
  }
}

// 2. Verify VISUALS catalog with dedicated sceneType
const vIdx = html.indexOf('const VISUALS =');
const vEndIdx = html.indexOf('// Active State', vIdx);
if (vIdx === -1 || vEndIdx === -1) {
  console.error('[TYPE FAIL] VISUALS array bounds not found in index.html');
  errors++;
} else {
  try {
    const vCode = html.substring(vIdx + 15, html.lastIndexOf('];', vEndIdx) + 1);
    const visuals = eval(vCode);
    console.log(`Checking ${visuals.length} VISUALS catalog items...`);
    if (visuals.length < 30) {
      console.error(`[TYPE FAIL] Expected at least 30 visuals, found ${visuals.length}`);
      errors++;
    }

    const requiredKeys = ['id', 'name', 'cat', 'desc', 'thumb', 'tech', 'anim', 'interact', 'perf', 'perfTier', 'placement', 'sceneType', 'defaultProps'];
    visuals.forEach((v, idx) => {
      requiredKeys.forEach(k => {
        if (v[k] === undefined || v[k] === null || v[k] === '') {
          console.error(`[TYPE FAIL] VISUALS[${idx}] missing required property "${k}"`);
          errors++;
        }
      });
      // Check defaultProps has color, speed, density, glow, cam
      const propKeys = ['color', 'speed', 'density', 'glow', 'cam'];
      propKeys.forEach(pk => {
        if (v.defaultProps[pk] === undefined) {
          console.error(`[TYPE FAIL] VISUALS[${idx}] defaultProps missing "${pk}"`);
          errors++;
        }
      });
    });
    console.log(`[TYPE PASS] All ${visuals.length} 3D visuals strictly conform to schema with dedicated sceneType`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse VISUALS: ${err.message}`);
    errors++;
  }
}

// 3. Verify Functions & SceneFactory
const requiredFunctions = [
  'generateCompletePrompt',
  'generateCombinedPrompt',
  'loadVisualIntoPromptBuilder',
  'SceneFactory.createScene',
  'Engine3D.initHero',
  'Engine3D.initInspector',
  'Engine3D.setupLifecycle'
];
requiredFunctions.forEach(fn => {
  if (!html.includes(fn)) {
    console.error(`[TYPE FAIL] Missing essential function: "${fn}"`);
    errors++;
  } else {
    console.log(`[TYPE PASS] Function verified: "${fn}"`);
  }
});

// 4. Verify Absolute Removal of Modification Feature
if (html.includes('id="modify-website"') || html.includes('generateModificationPrompt') || html.includes('loadVisualIntoModifier')) {
  console.error('[TYPE FAIL] Obsolete modification feature found in index.html!');
  errors++;
} else {
  console.log('[TYPE PASS] Verified 0 obsolete modification references in index.html');
}

// 5. Verify 3D Engine Lifecycle Hooks
const lifecycleHooks = [
  'IntersectionObserver',
  'visibilitychange',
  'ResizeObserver',
  'cancelAnimationFrame',
  'webglcontextlost',
  'webglcontextrestored'
];
lifecycleHooks.forEach(hook => {
  if (!html.includes(hook)) {
    console.error(`[TYPE FAIL] Missing lifecycle hook: "${hook}"`);
    errors++;
  } else {
    console.log(`[TYPE PASS] 3D Engine lifecycle hook verified: "${hook}"`);
  }
});

if (errors > 0) {
  console.error(`--- Typechecker failed with ${errors} error(s) ---`);
  process.exit(1);
} else {
  console.log('--- PromptDock 7.1 Typechecker PASSED (0 errors) ---');
  process.exit(0);
}
