# PromptDock 7.2 — Premium 3D Visual Prompt Studio

<p align="center">
  <img src="images/comp-hero.svg" alt="PromptDock 7.2 3D Discovery Studio" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Release-7.2.0-38bdf8?style=for-the-badge" alt="Release 7.2.0">
  <img src="https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Three.js-r174-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/21st.dev-Horizon_Hero-c084fc?style=for-the-badge" alt="21st.dev">
  <img src="https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Product Vision

> **"Discover the visual. Copy the prompt. Build it with AI."**

**PromptDock 7.2** is a client-ready, high-performance **3D Website Visual Prompt Studio**. Designed specifically for creative developers and AI coding agents, it brings together an authentic **21st.dev 3D Horizon Hero Section**, 30 curated Three.js WebGL effects across 8 creative disciplines, real-time procedural parameter inspection, parameter-transferred AI build prompts, and multi-effect synthesis.

- **Production Live Platform**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 🚀 What's New in PromptDock 7.2

### 1. 21st.dev 3D Horizon Hero Section Integration
- Integrated the community-acclaimed **Horizon Hero Section** component authored by **Scott Clayton** (`@lovesickfromthe6ix`) under the MIT License from [21st.dev](https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section).
- **Left Side**: PromptDock 7.2 studio branding, typography, CTAs, and coding assistant compatibility indicators (Antigravity, Claude Code, Cursor, Codex, Gemini, ChatGPT, Windsurf).
- **Right Side / Viewport**: The authentic interactive Horizon WebGL canvas featuring:
  - 3-tier twinkling starfield with custom vertex/fragment shaders.
  - Procedural animated nebula plane with elevation wave displacement and dual-color mixing.
  - 4 procedural mountain depth planes with layer parallax.
  - Atmosphere glow sphere with Fresnel rim lighting.
  - Mouse-responsive cursor parallax and scroll-coupled camera progression.

### 2. Complete React 19 + TypeScript + Vite Production Architecture
- Migrated from a monolithic inline file to a clean, modular React + TypeScript + Vite architecture compiling into `dist/`.
- Modular component hierarchy (`src/components/`, `src/engine/`, `src/data/`).
- Full type safety with zero runtime overhead.

### 3. Dedicated Implementations for ALL 30 Visual Scene Types
- Built an explicit, dedicated Three.js scene implementation in `SceneFactory` for every single one of the 30 visuals in the catalog (zero generic fallbacks):
  - **Particles & Physics**: `reactiveParticles` (spring repulsion), `magneticAttractor` (multi-core orbit swarm), `curlVortex` (turbulent fluid swirl), `flowField` (vector streamlines).
  - **3D Products**: `headphone` (curved headband + ear cups), `chronoWatch` (luxury watch tourbillon with moving hands), `hardwareTerminal` (cyberpunk chassis + grid display).
  - **Motion & Scroll**: `scrollCameraTrack` (spline curve with waypoint cameras), `multiplaneParallax` (4 depth layers), `sectionDissolve` (slicing facet transition).
  - **3D UI Components**: `tiltCardStack` (spatial 3D cards), `morphingPill` (dynamic island capsule), `magneticButtonMesh` (specular interactive button), `borderBeamRunner` (perimeter laser beam).
  - **Shaders & Materials**: `liquidChromeMesh` (high-specular fluid mercury), `glassRefractionPrism` (crystal prism with dispersion), `gooeyCluster` (organic merging metaballs).
  - **AI & Tech**: `thinkingOrb` (nested pulsating spheres), `neuralGraph` (distributed signal packets), `voiceRing` (FFT equalizer ring), `telemetryGrid` (cylindrical matrix).
  - **Differentiated Shared Scenes**: Separated `galaxy` (spiral arms with core) from `curlVortex` (turbulent advection), and `neuralNet` (structured lattice) from `neuralGraph` (dynamic packet transmission).

### 4. GPU Memory Leak Prevention & Lifecycle Teardown
- Enhanced `SceneFactory.cleanGroup()`:
  - Clears `group._customUpdate = null` to prevent previous visual animation loops from persisting.
  - Recursively traverses scene hierarchy and disposes all geometries, materials, material arrays, and allocated textures.
  - Guarantees 0 memory leaks when users rapidly switch across 30 scenes in the Inspector.

### 5. Detailed 18-Point AI Build Prompt Generator
- Generates exhaustive 18-point engineering briefs ready for immediate pasting into code agents:
  1. Role & Objective
  2. Reference Visual Specification
  3. Website Placement & Layout Constraints
  4. Exact 3D Scene Architecture & WebGL Renderer
  5. Geometry Configuration & Vertex Density
  6. Material, PBR Specular & Shader Details
  7. Lighting Setup (Ambient, Directional, Rim, Specular)
  8. Camera Perspective, FOV & Distance Coordinates
  9. Continuous Animation Loop & Mathematical Formulas
  10. Pointer & Mouse Parallax Interactions (NDC Lerping)
  11. Scroll-Driven Interactions & Velocity Coupling
  12. Color Palette & Emissive Configurations
  13. Target Framework & Exact Installation Commands
  14. Responsive Layout & Mobile Viewport Rules
  15. GPU Lifecycle, Throttling & Battery Conservation
  16. Memory Disposal Protocol (geometry/material.dispose)
  17. Mandatory Codebase Preservation Directives
  18. Acceptance, Verification & Framerate Criteria

---

## 🔄 The 5-Step Visual Workflow

```
1. DISCOVER 3D VISUAL EFFECT
              ↓
2. PREVIEW & CUSTOMISE IN REAL-TIME 3D INSPECTOR
              ↓
3. GENERATE COMPLETE 18-POINT AI BUILD PROMPT (WITH CUSTOM SETTINGS PRESERVED)
              ↓
4. COPY PROMPT (1-CLICK)
              ↓
5. PASTE INTO ANY AI CODING ASSISTANT & BUILD
```

---

## 🛠️ Verification & Pipeline Commands

```bash
# Start local development server with Vite
npm run dev

# Run code and component linter
npm run lint

# Run schema, catalog, and lifecycle typechecker
npm run typecheck

# Run unit, filesystem, and asset tests (HTTP 200)
npm run test

# Run 30-scene E2E integration test suite
npm run test:e2e

# Run Vite production compiler and build manifest generator
npm run build

# Run master verification pipeline (100% pass required)
npm run validate
```

---

## 📚 Technical Documentation Suite

- [`docs/product-overview.md`](docs/product-overview.md) — Product vision, tagline, and 5-step visual loop.
- [`docs/visual-library.md`](docs/visual-library.md) — 30 curated 3D visuals catalog across 8 categories with `sceneType` mappings.
- [`docs/prompt-engine.md`](docs/prompt-engine.md) — 18-point detailed AI build prompt generator specification.
- [`docs/visual-composer.md`](docs/visual-composer.md) — Combine 3D visuals studio & GPU loop budgeting.
- [`docs/3d-rendering.md`](docs/3d-rendering.md) — WebGL 2.0 rendering engine, `SceneFactory`, and live FPS.
- [`docs/performance.md`](docs/performance.md) — GPU lifecycle and performance optimization.
- [`docs/architecture.md`](docs/architecture.md) — React + TypeScript + Vite system architecture.
- [`docs/testing.md`](docs/testing.md) — Multi-tier verification and 159+ E2E test suites.
- [`docs/deployment.md`](docs/deployment.md) — Vercel Edge CI/CD pipeline.

---

## 📄 License & Attribution

- **PromptDock**: MIT License. Copyright (c) 2026 Kalyan.
- **Horizon Hero Section**: MIT License. Copyright (c) 2025 Scott Clayton (`@lovesickfromthe6ix`), published on [21st.dev](https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section).
