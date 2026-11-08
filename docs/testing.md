# Testing & Quality Assurance Suite

PromptDock 5.0 incorporates a comprehensive automated test runner (`test-build.js`) executing 35+ verification checks.

## Running Tests

```bash
npm test
```

## Test Coverage

1. **DOM Structure & Metadata**:
   - Verification of `index.html` presence, title, OpenGraph tags, and favicon.
2. **WebGL Canvases**:
   - Verification of `#hero-canvas`, `#component-canvas`, `#workflow-canvas`, and `#modal-3d-canvas`.
3. **Ecosystem & Attribution**:
   - Verification of `21st.dev` and `Libraries.dev` entries, links, and licenses.
4. **Asset Validation**:
   - Verification of all 53 SVG assets on disk with minimum file-size assertions.
5. **Local HTTP Delivery**:
   - Spins up an ephemeral local HTTP server and verifies HTTP 200 responses for root `/` and static image assets.
