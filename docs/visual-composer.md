# Visual Composer (Combine Visuals Studio)

The **Combine 3D Visuals Studio** allows developers to fuse multiple 3D effects into a single cohesive experience without causing GPU contention.

## Core Rules for Multi-Effect Composition

### 1. Unified Render Loop
Launching multiple independent `requestAnimationFrame` loops on a single page leads to thread contention, battery drain, and thermal throttling. The combined prompt strictly instructs the agent to synchronize all 3D geometries under a single animation loop.

### 2. Harmonized Lighting & Shadow Rigs
When combining a foreground interactive subject (e.g. Kinetic Torus Sculpture) with a deep background atmosphere (e.g. Particle Galaxy Vortex), both must share directional light angles and specular color palettes.

### 3. Layering Patterns
- **Dual-Canvas Layered**: Fixed background WebGL canvas behind HTML content + interactive foreground canvas.
- **Single Scene Unified**: Both geometries reside in the same Three.js `Scene` instance.
- **Split-Screen Hybrid**: Left-side 3D subject with right-side dynamic particle advection.
