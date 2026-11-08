# PromptDock 7.0 — The Next-Generation 3D Website Visual Prompt Studio

<p align="center">
  <img src="images/comp-hero.svg" alt="PromptDock 7.0 3D Discovery Studio" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Release-7.0.0-38bdf8?style=for-the-badge" alt="Release 7.0.0">
  <img src="https://img.shields.io/badge/Three.js-r128-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/WebGL-2.0-c084fc?style=for-the-badge" alt="WebGL 2.0">
  <img src="https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Product Vision

> **"Discover the visual. Copy the prompt. Build it with AI."**

**PromptDock 7.0** is an interactive 3D Website Visual Prompt Studio engineered specifically for discovering 3D visual effects, previewing and customizing them in a real-time WebGL sandbox, generating complete 18-point AI implementation briefs, and generating surgical modification prompts to improve existing websites without breaking working features.

- **Production Live Platform**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 🔄 The 10-Step Visual Workflow

```
DISCOVER 3D VISUAL
       ↓
PREVIEW INTERACTIVE EFFECT
       ↓
CUSTOMISE PARAMETERS
       ↓
GENERATE COMPLETE AI PROMPT
       ↓
COPY PROMPT
       ↓
PASTE INTO ANY AI CODING ASSISTANT
       ↓
GENERATE THE WEBSITE
       ↓
RETURN TO PROMPTDOCK
       ↓
GENERATE MODIFICATION PROMPT
       ↓
IMPROVE THE EXISTING WEBSITE
```

PromptDock prompts are framework-aware and engineered for all major AI coding assistants:
- **Google Antigravity**
- **Claude 3.7 / Claude Code**
- **Cursor**
- **OpenAI Codex / ChatGPT**
- **Gemini 2.0 Flash**
- **Windsurf**

---

## 🚀 Core Features & Studio Modules

### 1. 3D Visual Discovery Gallery (30 Curated Visuals)
Organized into 8 specialized creative disciplines:
1. **3D Hero Experiences**: Aurora Plasma, Celestial Planet, Kinetic Torus Sculpture, Spatial Glass, 3D Typography.
2. **3D Backgrounds**: Particle Galaxy Vortex, Starfield Warp, Neural Synthesis, Procedural Terrain.
3. **Particles & Physics**: Mouse-Reactive Particles, Magnetic Attractor, Curl-Noise Vortex, Flow Fields.
4. **3D Product Experiences**: Spatial Headphones, Luxury Chrono Turntable, Holographic Hardware Terminals.
5. **Motion & Scroll Experiences**: Scroll-Driven Camera Splines, Parallax Depth Scenes, Section Dissolves.
6. **3D UI Components**: Spatial Tilt Cards, Dynamic Island Nav, Magnetic Specular Buttons, Border Beams.
7. **Shaders & Materials**: Liquid Chrome Fluid, Physical Glass Refraction, Gooey Metaballs.
8. **AI & Technology Visuals**: Thinking Hologram Orbs, Multi-Agent Neural Graphs, FFT Audio Equalizers, Telemetry Matrices.

### 2. Interactive 3D Visual Inspector
- Real-time Three.js WebGL 2.0 viewport with dynamic geometry rendering (`icosahedron`, `torusKnot`, `galaxy`, `particles`, `terrain`, `thinkingOrb`, `cube`, `sphere`).
- Parameter sliders that **actually alter the 3D scene in real time**:
  - Primary Accent Color (`#color-picker`)
  - Animation Velocity (`0.2x` to `3.0x`)
  - Geometry Density (`400` to `4,000` points)
  - Lighting & Glow Intensity (`0.2` to `2.5`)
  - Camera Distance Zoom (`2.5` to `10.0`)
  - Wireframe / Solid Shading Mode toggle
  - Orbit Drag Controls & Camera Reset

### 3. Comprehensive AI Build Prompt Studio
Produces an exhaustive 18-point engineering brief covering:
- Role & Objective
- Exact 3D Geometry & Material Setup
- Lighting, Speculars, and Camera Coordinates
- Continuous Loops, Pointer Parallax, and Scroll Coupling
- Target Frameworks: Next.js 15, React Three Fiber, Vanilla HTML5 + Three.js r128, Vite + TypeScript
- Target Performance Profile: Low-End Laptop, Mobile-First, Standard Desktop, Workstation GPU
- **Mandatory Codebase Preservation Directive**: Explicitly orders the AI agent to inspect the current codebase and preserve unrelated components, routes, and styles.

### 4. Modify Existing Website Prompt Generator (Unique Differentiator)
- Natural language input for describing requested changes.
- Multi-select preset checklists across 5 categories:
  - 🎨 **Visual**: Vibrant palettes, boosted glow, metallic finishes, glass refraction.
  - ⚡ **Motion**: Cursor parallax, scroll camera journeys, slower elegant rotations, magnetic snap.
  - 📦 **Content**: Floating secondary geometry, particle auras, dynamic island bars.
  - 📱 **Responsive**: Touch gesture optimization, particle budget cuts, 2D canvas fallbacks.
  - 🚀 **Performance**: `IntersectionObserver` pause, explicit GPU disposal, instanced meshes.
- Generates a surgical modification prompt ensuring that the AI tool modifies in-place rather than rewriting from scratch.

### 5. Combine 3D Visuals Studio
- Fuses multiple 3D effects into a single cohesive experience.
- Designates primary anchor visual vs secondary atmospheric background.
- Coordinates both effects under a **single requestAnimationFrame loop** to eliminate thread contention and battery drain.

### 6. Three.js Engine Lifecycle & Performance
- `IntersectionObserver`: Automatically halts off-screen render loops.
- Page Visibility API (`document.hidden`): Suspends rendering on tab switch.
- `ResizeObserver`: Maintains aspect ratio without layout thrashing.
- Explicit GPU cleanup: `geometry.dispose()` and `material.dispose()`.
- WebGL context loss and recovery event handling.

---

## 🛠️ Verification & Pipeline Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Run code linter
npm run lint

# Run catalog & schema typechecker
npm run typecheck

# Run unit & filesystem tests
npm test

# Run end-to-end HTTP integration tests
npm run test:e2e

# Run production build
npm run build

# Run all verification checks (100% pass required)
npm run validate
```

---

## 📚 Technical Documentation Suite

- [`docs/product-overview.md`](docs/product-overview.md) — Product vision, tagline, and 10-step visual loop.
- [`docs/visual-library.md`](docs/visual-library.md) — 30 curated 3D visuals catalog across 8 categories.
- [`docs/prompt-engine.md`](docs/prompt-engine.md) — 18-point build prompt generator specification.
- [`docs/modification-engine.md`](docs/modification-engine.md) — Surgical modification prompt engine.
- [`docs/visual-composer.md`](docs/visual-composer.md) — Combine 3D visuals studio & GPU loop budgeting.
- [`docs/3d-rendering.md`](docs/3d-rendering.md) — WebGL 2.0 rendering engine and primitive shaders.
- [`docs/performance.md`](docs/performance.md) — GPU lifecycle and performance optimization.
- [`docs/architecture.md`](docs/architecture.md) — System architecture and topology.
- [`docs/testing.md`](docs/testing.md) — Master verification and E2E test suites.
- [`docs/deployment.md`](docs/deployment.md) — Vercel Edge CI/CD pipeline.

---

## 📄 License

MIT License. Copyright (c) 2026 Kalyan.
