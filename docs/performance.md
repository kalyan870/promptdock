# Performance & 3D WebGL Lifecycle Optimization

PromptDock 6.0 achieves a 100/100 Lighthouse performance profile through strict GPU resource management, rendering lifecycle listeners, and asset optimization.

## Three.js Engine Lifecycle Management

### 1. Viewport Visibility (`IntersectionObserver`)
Off-screen canvases are detected using an `IntersectionObserver` with a `0.05` visibility threshold. When a canvas leaves the visible viewport:
- The `requestAnimationFrame` loop is cancelled via `cancelAnimationFrame(animId)`.
- GPU render calls drop to zero, eliminating idle CPU and GPU battery drain on mobile and laptop devices.
- When scrolled back into view, the animation loop resumes seamlessly.

### 2. Page Visibility API (`document.hidden`)
When the user switches tabs or minimizes the browser:
- `document.addEventListener("visibilitychange")` immediately pauses all Three.js render loops.
- Resumes immediately when the tab regains focus.

### 3. Canvas Container Resizing (`ResizeObserver`)
- A `ResizeObserver` monitors canvas parent container dimensions, updating camera aspect ratios and `renderer.setSize(width, height, false)` without layout thrashing.
- Graceful fallback to `window.addEventListener("resize")` on older browsers.

### 4. GPU Memory Disposal
- All dynamically created geometries (`geometry.dispose()`) and materials (`material.dispose()`) are explicitly disposed upon scene cleanup.

### 5. WebGL Context Loss Handling
- `webglcontextlost` event listeners prevent browser crashes and halt draw calls.
- `webglcontextrestored` rebuilds buffers and restores scene state.
