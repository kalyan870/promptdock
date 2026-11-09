# Testing & Quality Assurance Suite — PromptDock 8.1

PromptDock 8.1 features a comprehensive two-tier testing pipeline combining fast Node-based unit/scene verifications with full Playwright automated browser E2E testing in headless Chromium.

## Pipeline Commands

```bash
# 1. Code & Component Linter
npm run lint

# 2. Schema, Catalog & Scene Typechecker
npm run typecheck

# 3. HTTP Delivery & Static Asset Unit Tests
npm test

# 4. 30-Scene SceneFactory Unit & Teardown Suite
npm run test:e2e

# 5. Playwright Real Browser E2E Suite (28 Interactions & Screenshots)
npm run test:browser

# 6. Vite Production Compiler
npm run build

# Master Verification Pipeline (all 6 stages must pass 100%)
npm run validate
```

---

## Test Suites

### 1. Linter (`lint.js`)
- Validates `index.html` structure, doctype, title (`PromptDock 8.1`), and tag balance.
- Asserts presence of all core React components.
- Verifies Scott Clayton 21st.dev MIT license attribution.
- Enforces prompt immutability: zero `<textarea>` or `contenteditable` elements.
- Confirms absence of obsolete website modification tokens.

### 2. Typechecker (`typecheck.js`)
- Validates all 30 visuals in `src/data/visuals.ts` have unique registered `sceneType` handlers in `SceneFactory`.
- Verifies `SceneFactory.cleanGroup` properly clears `_customUpdate` hooks to prevent GPU memory leaks.
- Asserts canonical `PromptEngine.generateBuildPrompt` export.

### 3. Build & Static Asset Suite (`test-build.js`)
- Verifies compiled assets in `dist/`.
- Asserts 54 image assets with non-zero integrity.
- Tests HTTP 200 delivery and correct MIME types on an ephemeral local server.

### 4. SceneFactory Unit Suite (`test-e2e.ts`)
- Programmatically instantiates all 30 Three.js scenes, traverses meshes, runs custom animation ticks, and verifies recursive GPU resource teardown.
- Tests parameter transfer into canonical 18-point prompts.

### 5. Playwright Browser E2E Suite (`test-browser-e2e.ts`)
Executes 28 live browser interactions in real headless Chromium:
1. Homepage HTTP 200 and title verification.
2. Hero `#hero-canvas` WebGL rendering.
3. 5-stage interactive workflow storyboard rendering.
4. Workflow responsive tab switching.
5. Gallery search input filtering.
6. Category filter pills.
7. Card preview images (positive dimensions).
8. Scene selection & smooth scroll into Inspector.
9. Inspector parameter sliders (speed, density, glow, camera).
10. Inspector WebGL canvas mounting & live FPS telemetry.
11. Read-only prompt container `<pre id="prompt-display">`.
12. Zero `<textarea>` elements across DOM.
13. Zero `contenteditable` elements across DOM.
14. Zero website modification elements.
15. 18-point brief structure verification (`### 1.` through `### 18.`).
16. Card "Copy Prompt" action.
17. Prompt Generator "Copy Prompt" action.
18. Clipboard header correctness.
19. Markdown export button.
20. Combine Visuals studio cards.
21. Favorite filter toggle and count persistence.
22. Mobile navigation & header.
23. Mobile layout (zero horizontal overflow at 375px).
24. `prefers-reduced-motion: reduce` emulation.
25. WebGL canvas context resilience.
26. Zero uncaught browser console errors.
27. Zero broken image requests (404/500).
28. Zero failed network requests.
- Captures and saves all 7 authentic application screenshots to `docs/assets/screenshots/`.
