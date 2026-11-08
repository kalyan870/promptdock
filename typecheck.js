const fs = require('fs');
const path = require('path');

console.log('--- Starting PromptDock 6.0 Data & Catalog Typechecker ---');
let errors = 0;

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');

// 1. Verify Prompts Catalog in HTML
const pIdx = html.indexOf('const PROMPTS =');
const cIdx = html.indexOf('const COMPONENTS =');
const eIdx = html.indexOf('const EFFECTS =');
const rIdx = html.indexOf('const RESOURCES =');
const exIdx = html.indexOf('const EXAMPLES =');

if (pIdx === -1 || cIdx === -1 || eIdx === -1 || rIdx === -1 || exIdx === -1) {
  console.error('[TYPE FAIL] Missing one or more catalog definitions in index.html');
  errors++;
} else {
  // 1. Prompts
  try {
    const pCode = html.substring(pIdx + 16, html.lastIndexOf('];', cIdx) + 1);
    const prompts = eval(pCode);
    console.log(`Checking ${prompts.length} PROMPTS tuple schema...`);
    prompts.forEach((p, idx) => {
      if (!Array.isArray(p) || p.length < 7) {
        console.error(`[TYPE FAIL] PROMPTS[${idx}] does not contain all 7 required tuple elements`);
        errors++;
      } else {
        const [title, category, desc, thumb, promptText, stack, code] = p;
        if (!title || !category || !desc || !thumb || !promptText || !code) {
          console.error(`[TYPE FAIL] PROMPTS[${idx}] has empty required field: ${title}`);
          errors++;
        }
      }
    });
    console.log(`[TYPE PASS] All ${prompts.length} PROMPTS tuples conform to schema [title, category, desc, thumb, prompt, stack, code]`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse PROMPTS: ${err.message}`);
    errors++;
  }

  // 2. Components
  try {
    const cCode = html.substring(cIdx + 19, html.lastIndexOf('];', eIdx) + 1);
    const comps = eval(cCode);
    console.log(`Checking ${comps.length} COMPONENTS schema...`);
    comps.forEach((c, idx) => {
      const requiredKeys = ['name', 'cat', 'desc', 'thumb', 'stack', 'status', 'code'];
      requiredKeys.forEach(k => {
        if (!c[k]) {
          console.error(`[TYPE FAIL] COMPONENTS[${idx}] missing required key "${k}"`);
          errors++;
        }
      });
    });
    console.log(`[TYPE PASS] All ${comps.length} COMPONENTS conform to schema [name, cat, desc, thumb, stack, status, code]`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse COMPONENTS: ${err.message}`);
    errors++;
  }

  // 3. Effects (Libraries.dev ecosystem)
  try {
    const eCode = html.substring(eIdx + 16, html.lastIndexOf('];', rIdx) + 1);
    const effects = eval(eCode);
    console.log(`Checking ${effects.length} EFFECTS schema...`);
    effects.forEach((eff, idx) => {
      const requiredKeys = ['name', 'cat', 'desc', 'thumb', 'pkg', 'officialUrl', 'license', 'prompt'];
      requiredKeys.forEach(k => {
        if (!eff[k]) {
          console.error(`[TYPE FAIL] EFFECTS[${idx}] missing required key "${k}"`);
          errors++;
        }
      });
      if (eff.officialUrl !== 'https://libraries.dev') {
        console.error(`[TYPE FAIL] EFFECTS[${idx}] invalid official URL: "${eff.officialUrl}" (must be https://libraries.dev)`);
        errors++;
      }
    });
    console.log(`[TYPE PASS] All ${effects.length} EFFECTS conform to schema and canonical https://libraries.dev`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse EFFECTS: ${err.message}`);
    errors++;
  }

  // 4. Showcase Projects
  try {
    const exEndIdx = html.indexOf('];', exIdx) + 1;
    const exCode = html.substring(exIdx + 17, exEndIdx);
    const projects = eval(exCode);
    console.log(`Checking ${projects.length} Showcase EXAMPLES schema...`);
    projects.forEach((p, idx) => {
      const requiredKeys = ['name', 'thumb', 'desc', 'stack', 'status', 'isLive', 'arch'];
      requiredKeys.forEach(k => {
        if (p[k] === undefined || p[k] === null || p[k] === '') {
          console.error(`[TYPE FAIL] EXAMPLES[${idx}] missing required key "${k}"`);
          errors++;
        }
      });
      if (p.status !== 'Interactive Demonstration' && p.status !== 'Concept Mockup') {
        console.error(`[TYPE FAIL] EXAMPLES[${idx}] has invalid status: "${p.status}"`);
        errors++;
      }
    });
    console.log(`[TYPE PASS] All ${projects.length} showcase projects strictly conform to schema`);
  } catch (err) {
    console.error(`[TYPE FAIL] Failed to parse EXAMPLES: ${err.message}`);
    errors++;
  }
}

// 5. Verify 3D Engine Lifecycle hooks
const lifecycleHooks = ['IntersectionObserver', 'visibilitychange', 'ResizeObserver', 'cancelAnimationFrame', 'webglcontextlost', 'webglcontextrestored'];
lifecycleHooks.forEach(hook => {
  if (!html.includes(hook)) {
    console.error(`[TYPE FAIL] 3D Engine is missing lifecycle hook: "${hook}"`);
    errors++;
  } else {
    console.log(`[TYPE PASS] 3D Engine contains lifecycle hook: "${hook}"`);
  }
});

if (errors > 0) {
  console.error(`--- Typechecker failed with ${errors} error(s) ---`);
  process.exit(1);
} else {
  console.log('--- PromptDock 6.0 Typechecker PASSED (0 errors) ---');
  process.exit(0);
}
