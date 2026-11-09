# PromptDock 8.0 — The Immutable 3D Visual Prompt Ecosystem

<p align="center">
  <img src="images/comp-hero.svg" alt="PromptDock 8.0 3D Discovery Studio" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Release-8.0.0-38bdf8?style=for-the-badge" alt="Release 8.0.0">
  <img src="https://img.shields.io/badge/React-19.0-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8.3-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Three.js-r174-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/21st.dev-Horizon_Hero-c084fc?style=for-the-badge" alt="21st.dev">
  <img src="https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Product Identity & Tagline

> **"See the visual. Copy the prompt. Build the experience."**
> 
> *Discover extraordinary 3D websites. Build yours with AI.*

**PromptDock 8.0** is an immutable **3D Visual Prompt Ecosystem**. It turns exceptional 3D web effects into locked, production-ready AI website-building instructions. 

PromptDock is a curated visual prompt library, not an in-browser prompt editor, not a general chatbot, and not an AI website builder that pretends to deploy websites itself. The visitor discovers the 3D visual, inspects the real WebGL effect, tweaks aesthetic parameters in real time, copies the locked 18-point AI prompt, and pastes it into their chosen AI coding assistant to build the experience.

- **Live Production Platform**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **Canonical GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 🚀 Key Architectural Pillars of PromptDock 8.0

### 1. 🔒 100% Immutable Prompts (Zero In-Browser Editing)
- All prompt containers are rendered strictly inside read-only `<pre id="prompt-display">` elements.
- Absolute zero `<textarea>`, `contenteditable`, or inline modification inputs exist for prompts.
- Eliminates user confusion: PromptDock does not deploy websites internally; it equips developers with deterministic prompts for external AI code agents.

### 2. 🎯 Canonical Single-Source PromptEngine (`src/engine/prompt-engine.ts`)
- Every copy action across the platform—Discovery Gallery, 3D Inspector, Prompt Generator, and Hero—invokes one unified canonical engine.
- Every copy action copies the complete, exhaustive **18-point engineering brief** with active parameter overrides incorporated directly.

### 3. 📐 Scene-Specific Geometry, Shader & Kinematic Tailoring
- Prompts are dynamically customized to the exact scene type rather than generic sine-wave templates:
  - **Horology (`chronoWatch`)**: Cylindrical titanium bezel, beveled sapphire crystal lens with transmission, brushed dial plane, and three kinematic hands with micro-stepping seconds sweep.
  - **Acoustic Audio (`headphone`)**: Sculpted headband arch segment, telescoping slider arms, circumaural cushion PBR materials, and continuous turntable presentation orbit.
  - **Optics & Dispersion (`glassRefractionPrism`)**: Chamfered triangular prism, physical dispersion with chromatic aberration, and collimated beam caustics.
  - **Fluid Dynamics (`liquidChromeMesh`)**: 3D simplex noise vector fields, mirror chrome PBR stack, and interactive cursor wake pressure waves.
  - **Astrophysics (`galaxy`)**: Logarithmic spiral arm distribution with differential Keplerian angular velocities.
  - **Cognitive Systems (`neuralNet` / `thinkingOrb`)**: Proximity-linked synaptic line segments and multi-shell concentric Fresnel pulsing spheres.

### 4. 🌐 Authentic 21st.dev 3D Horizon Hero Integration
- Features Scott Clayton's (`@lovesickfromthe6ix`) interactive 3D WebGL Horizon engine under MIT License.
- Multi-tier twinkling starfield, procedural animated nebula plane, 4 depth planes of procedural mountains, Fresnel atmospheric halo, and cursor parallax.

### 5. 📚 Multi-Ecosystem Reference & Source Audit
- Detailed technical audit (`docs/reference-source-audit.md`) covering:
  - **21st.dev**: Design engineer component registry and Horizon Hero integration.
  - **Libraries.dev**: Dependency analytics and creative classification taxonomy.
  - **Magic UI**: Modern animated UI components and Tailwind token architecture.
  - **Motion.dev**: Physics-driven spring dynamics and 60 FPS loop benchmarks.
  - **Prompt Motion**: Structured natural-language animation prompting schemas.
  - **Skills.sh**: Agentic skill standardization and tool manifest patterns.
  - **Three.js**: WebGL 2.0 rendering engine, buffer geometry management, and resource disposal.

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
    UI --> Gallery["Discovery Gallery (30 Curated Visuals)"]
    UI --> Inspector["Interactive 3D Inspector"]
    UI --> PromptSec["Locked Prompt Studio (Read-Only &lt;pre&gt;)"]
    UI --> Composer["Combine 3D Visuals Studio"]

    Inspector --> SF["SceneFactory (src/engine/scene-factory.ts)"]
    SF --> Teardown["GPU Teardown Protocol (cleanGroup)"]
    SF --> Scenes["30 Dedicated WebGL Scene Creators"]

    Gallery -.->|One-Click Copy| PE["PromptEngine (src/engine/prompt-engine.ts)"]
    Inspector -.->|One-Click Copy| PE
    PromptSec --> PE
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

# Run 30-scene E2E Playwright integration test suite
npm run test:e2e

# Run Vite production build (outputs to dist/)
npm run build

# Master validation pipeline (all checks must pass 100%)
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
- [`docs/testing.md`](docs/testing.md) — Testing strategy, unit tests, and Playwright E2E suites.
- [`docs/deployment.md`](docs/deployment.md) — Vercel production deployment and GitHub Actions CI/CD.

---

## 📄 License & Attribution

- **PromptDock**: MIT License. Copyright (c) 2026 Kalyan.
- **Horizon Hero Section**: MIT License. Copyright (c) 2025 Scott Clayton (`@lovesickfromthe6ix`), published on [21st.dev](https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section).
