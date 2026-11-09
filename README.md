# PromptDock 8.1 — The Immutable 3D Visual Prompt Ecosystem

<p align="center">
  <img src="docs/assets/screenshots/desktop-home.webp" alt="PromptDock 8.1 Desktop Experience" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Release-8.1.0-38bdf8?style=for-the-badge" alt="Release 8.1.0">
  <img src="https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Three.js-r174-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/Playwright-E2E_Verified-22c55e?style=for-the-badge&logo=playwright&logoColor=white" alt="Playwright Verified">
  <img src="https://img.shields.io/badge/21st.dev-Horizon_Hero-c084fc?style=for-the-badge" alt="21st.dev">
  <img src="https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Product Identity & Tagline

> **"See the visual. Copy the prompt. Build the experience."**
> 
> *Discover extraordinary 3D websites. Build yours with AI.*

**PromptDock 8.1** is a curated, immutable **3D Visual Prompt Ecosystem**. It transforms exceptional 3D web effects into locked, production-ready AI website-building instructions. 

PromptDock is a curated visual prompt library, not an in-browser prompt editor, not a generic AI chatbot, and not an AI website builder that pretends to deploy websites itself. The visitor discovers the 3D visual, inspects the real WebGL effect, tweaks aesthetic parameters in real time, copies the locked 18-point AI prompt, and pastes it into their chosen AI coding assistant to build the experience.

- **Live Production Platform**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **Canonical GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 📸 Real Visual Showcase (Captured from Live Application)

### 1. Interactive Visual Storyboard (5 Connected Stages)
<p align="center">
  <img src="docs/assets/screenshots/workflow-storyboard.webp" alt="PromptDock 8.1 Interactive Visual Storyboard" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>
A connected five-stage journey: Visual Discovery &rarr; Real-Time 3D Preview with embedded WebGL Torus &rarr; Preset Configuration &rarr; Locked 18-Point Prompt Copy &rarr; AI Assistant Build Pipeline.

### 2. Curated Bento Discovery Gallery
<p align="center">
  <img src="docs/assets/screenshots/discovery-gallery.webp" alt="PromptDock 8.1 Curated Bento Discovery Gallery" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>
Curated Bento showcase presenting 30 dedicated Three.js effects across 8 creative categories with prominent featured cards, instant search, tech stack filtering, and direct prompt copying.

### 3. Interactive 3D Visual Inspector & Parameter HUD
<p align="center">
  <img src="docs/assets/screenshots/visual-inspector.webp" alt="PromptDock 8.1 Visual Inspector" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>
Live procedural rendering sandbox with real-time FPS telemetry, orbit drag/touch controls, camera reset, wireframe toggles, and instant parameter transfer into the AI prompt generator.

### 4. Locked Read-Only AI Build Prompt Studio
<p align="center">
  <img src="docs/assets/screenshots/locked-prompt-studio.webp" alt="PromptDock 8.1 Locked Prompt Studio" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>
Strictly read-only prompt studio generating comprehensive 18-point engineering briefs. Absolute zero textareas or contenteditable fields—prompts are pre-authored and locked for code agent execution.

### 5. Multi-Effect Visual Composer
<p align="center">
  <img src="docs/assets/screenshots/combine-visuals.webp" alt="PromptDock 8.1 Combine Visuals Studio" width="100%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>

### 6. Mobile Viewport Parity
<p align="center">
  <img src="docs/assets/screenshots/mobile-home.webp" alt="PromptDock 8.1 Mobile Viewport" width="45%" style="border-radius: 12px; border: 1px solid #1e293b;" />
</p>

---

## 🚀 Key Architectural Pillars of PromptDock 8.1

### 1. 🎬 Interactive Visual Storyboard (`src/components/workflow/WorkflowSection.tsx`)
- Completely replaced simple text cards with a panoramic 5-stage connected interactive storyboard.
- Features real-time 3D canvas rendering for Stage 02, interactive gallery miniature for Stage 01, preset lock indicators for Stage 03, read-only prompt preview for Stage 04, and AI coding assistant pipeline for Stage 05.

### 2. 🎴 Bento-Style Discovery Gallery (`src/components/gallery/GallerySection.tsx`)
- Curated Bento showcase featuring prominent cards for top creative disciplines (Aurora Hero, Liquid Chrome, Curl-Noise Vortex, Chrono Watch, Thinking Orb).
- 30 production WebGL effects, live search, multi-factor filtering, and responsive view switcher (Bento vs Grid).

### 3. 🔒 100% Immutable Prompts (Zero In-Browser Editing)
- All prompt containers are rendered strictly inside read-only `<pre id="prompt-display">` elements.
- Absolute zero `<textarea>`, `contenteditable`, or inline modification inputs exist for prompts.
- Eliminates user confusion: PromptDock does not deploy websites internally; it equips developers with deterministic prompts for external AI code agents.

### 4. 🎯 Canonical Single-Source PromptEngine (`src/engine/prompt-engine.ts`)
- Every copy action across the platform—Discovery Gallery, 3D Inspector, Prompt Generator, and Hero—invokes one unified canonical engine.
- Every copy action copies the complete, exhaustive **18-point engineering brief** with active parameter overrides incorporated directly.

### 5. 📐 Scene-Specific Geometry, Shader & Kinematic Tailoring
- Prompts are dynamically customized to the exact scene type rather than generic sine-wave templates:
  - **Horology (`chronoWatch`)**: Cylindrical titanium bezel, beveled sapphire crystal lens with transmission, brushed dial plane, and three kinematic hands with micro-stepping seconds sweep.
  - **Acoustic Audio (`headphone`)**: Sculpted headband arch segment, telescoping slider arms, circumaural cushion PBR materials, and continuous turntable presentation orbit.
  - **Optics & Dispersion (`glassRefractionPrism`)**: Chamfered triangular prism, physical dispersion with chromatic aberration, and collimated beam caustics.
  - **Fluid Dynamics (`liquidChromeMesh`)**: 3D simplex noise vector fields, mirror chrome PBR stack, and interactive cursor wake pressure waves.
  - **Astrophysics (`galaxy`)**: Logarithmic spiral arm distribution with differential Keplerian angular velocities.
  - **Cognitive Systems (`neuralNet` / `thinkingOrb`)**: Proximity-linked synaptic line segments and multi-shell concentric Fresnel pulsing spheres.

### 6. 🌐 Authentic 21st.dev 3D Horizon Hero Integration
- Features Scott Clayton's (`@lovesickfromthe6ix`) interactive 3D WebGL Horizon engine under MIT License.
- Multi-tier twinkling starfield, procedural animated nebula plane, 4 depth planes of procedural mountains, Fresnel atmospheric halo, and cursor parallax.

---

## 🔄 The 5-Step Visual Loop

```mermaid
flowchart LR
    A["1. Discover 3D Visual<br/>(30 Curated Effects)"] --> B["2. Preview & Customise<br/>(Real-Time WebGL Inspector)"]
    B --> C["3. Select Target Presets<br/>(Framework & Viewport)"]
    C --> D["4. Copy Locked Prompt<br/>(18-Point Engineering Brief)"]
    D --> E["5. Build with AI Agent<br/>(Antigravity / Claude / Cursor)"]
    
    style A fill:#0f172a,stroke:#5eead4,stroke-width:2px,color:#fff
    style B fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff
    style C fill:#0f172a,stroke:#818cf8,stroke-width:2px,color:#fff
    style D fill:#0f172a,stroke:#c084fc,stroke-width:2px,color:#fff
    style E fill:#0f172a,stroke:#34d399,stroke-width:2px,color:#fff
```

---

## 🏗️ Architecture

```mermaid
graph TD
    UI["React 19 + Tailwind CSS Frontend"]
    UI --> Hero["21st.dev Horizon Hero (Three.js + GSAP)"]
    UI --> Storyboard["Interactive Visual Storyboard (5 Connected Stages)"]
    UI --> Gallery["Bento Discovery Gallery (30 Curated Visuals)"]
    UI --> Inspector["Interactive 3D Inspector"]
    UI --> PromptSec["Locked Prompt Studio (Read-Only &lt;pre&gt;)"]
    UI --> Composer["Combine 3D Visuals Studio"]

    Inspector --> SF["SceneFactory (src/engine/scene-factory.ts)"]
    SF --> Teardown["GPU Teardown Protocol (cleanGroup)"]
    SF --> Scenes["30 Dedicated WebGL Scene Creators"]

    Gallery -.->|One-Click Copy| PE["PromptEngine (src/engine/prompt-engine.ts)"]
    Inspector -.->|One-Click Copy| PE
    PromptSec --> PE
    Storyboard -.->|Sample Copy| PE
    PE --> LockedBrief["18-Point Immutable AI Prompt"]
```

---

## 🛠️ Verification & Pipeline Commands

```bash
# Start local development server
npm run dev

# Run ESLint validation
npm run lint

# Run schema, catalog, and scene typechecker
npm run typecheck

# Run unit tests and static asset verification
npm run test

# Run 30-scene E2E SceneFactory test suite
npm run test:e2e

# Run Playwright real browser E2E test suite (28 assertions & screenshots)
npm run test:browser

# Run Vite production build (outputs to dist/)
npm run build

# Master validation pipeline (all 6 checks must pass 100%)
npm run validate
```

---

## 📚 Technical Documentation Suite

- [`docs/reference-source-audit.md`](docs/reference-source-audit.md) — Comprehensive technical audit of 21st.dev, Libraries.dev, Magic UI, Motion.dev, Prompt Motion, Skills.sh, and Three.js.
- [`docs/scene-engine.md`](docs/scene-engine.md) — 3D scene engine architecture, `SceneFactory`, and GPU lifecycle.
- [`docs/licence-and-attribution.md`](docs/licence-and-attribution.md) — MIT license and Scott Clayton / 21st.dev attribution.
- [`docs/prompt-engine.md`](docs/prompt-engine.md) — 18-point locked prompt generation engine specification.
- [`docs/visual-library.md`](docs/visual-library.md) — Complete 30-effect visual catalog across 8 creative categories.
- [`docs/product-overview.md`](docs/product-overview.md) — Product identity, principles, and audience definition.
- [`docs/architecture.md`](docs/architecture.md) — React 19 + TypeScript + Vite system architecture.
- [`docs/workflow.md`](docs/workflow.md) — Connected 5-stage interactive visual storyboard specification.
- [`docs/testing.md`](docs/testing.md) — Playwright real browser testing suite and 28-point interaction verification.
- [`docs/deployment.md`](docs/deployment.md) — Vercel production deployment and GitHub Actions CI/CD.

---

## 📄 License & Attribution

- **PromptDock**: MIT License. Copyright (c) 2026 Kalyan.
- **Horizon Hero Section**: MIT License. Copyright (c) 2025 Scott Clayton (`@lovesickfromthe6ix`), published on [21st.dev](https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section).
