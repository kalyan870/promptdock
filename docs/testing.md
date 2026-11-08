# Testing & Quality Assurance Suite

PromptDock 7.1 incorporates an enterprise-grade multi-tier verification pipeline guaranteeing 100% test coverage and zero regressions.

## Pipeline Commands

```bash
# Run code linter
npm run lint

# Run schema and lifecycle typechecker
npm run typecheck

# Run unit and filesystem tests
npm test

# Run end-to-end integration tests
npm run test:e2e

# Run production build manifest generator
npm run build

# Run master verification pipeline
npm run validate
```

## Test Suites

1. **Linter (`lint.js`)**:
   - Confirms presence of all required sections (`#gallery`, `#inspector`, `#prompt-generator`, `#combine-visuals`, `#workflow`).
   - Ensures obsolete `#modify-website` elements and scripts are completely absent.
   - Asserts script tags, CDN dependencies, and syntax integrity.

2. **Typechecker (`typecheck.js`)**:
   - Validates all 30 visuals have required schema fields: `id`, `name`, `category`, `sceneType`, `desc`, `tech`, `perf`, `defaultProps`.
   - Verifies all 8 categories are represented.
   - Asserts presence of critical engine lifecycle methods (`IntersectionObserver`, `visibilitychange`, `ResizeObserver`, `performance.now`, `dispose`).

3. **Build & Unit Suite (`test-build.js`)**:
   - Spins up ephemeral HTTP server on port 4897.
   - Tests HTTP 200 delivery of HTML, static assets, and MIME types.
   - Validates asset sizes and manifest data.

4. **End-to-End Suite (`test-e2e.js`)**:
   - Spins up ephemeral HTTP server on port 4898.
   - Tests interactive controls, inspector sliders, active config summary bar, and prompt generation functions.
   - Confirms absence of modification remnants and verifies asset integrity across all 54 assets.
