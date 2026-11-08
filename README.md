# PromptDock 7.1 — Premium 3D Visual Prompt Studio

<p align="center">
  <img src="images/comp-hero.svg" alt="PromptDock 7.1 3D Discovery Studio" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Release-7.1.0-38bdf8?style=for-the-badge" alt="Release 7.1.0">
  <img src="https://img.shields.io/badge/Three.js-r128-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/WebGL-2.0-c084fc?style=for-the-badge" alt="WebGL 2.0">
  <img src="https://img.shields.io/badge/License-MIT-a78bfa?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Product Vision

> **"Discover the visual. Copy the prompt. Build it with AI."**

**PromptDock 7.1** is a focused, high-precision **3D Website Visual Prompt Studio**. Visitors discover interactive 3D visual effects, preview and customize them in a real-time WebGL sandbox, and generate complete, framework-aware AI implementation prompts ready to copy and paste into any AI coding assistant.

- **Production Live Platform**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 🔄 The 5-Step Visual Workflow

```
1. DISCOVER 3D VISUAL EFFECT
              ↓
2. PREVIEW & CUSTOMISE IN REAL-TIME 3D INSPECTOR
              ↓
3. GENERATE COMPLETE AI IMPLEMENTATION PROMPT (WITH CUSTOM SETTINGS PRESERVED)
              ↓
4. COPY PROMPT (1-CLICK)
              ↓
5. PASTE INTO ANY AI CODING ASSISTANT & BUILD
```

PromptDock prompts are framework-aware and engineered for all major AI coding assistants:
- **Google Antigravity**
- **Claude 3.7 / Claude Code**
- **Cursor**
- **OpenAI Codex / ChatGPT**
- **Gemini 2.0 Flash**
- **Windsurf**

---

## 🚀 What's New in PromptDock 7.1

1. **Complete Removal of Website Modification Functionality**:
   - Streamlined focus exclusively on 3D visual discovery, preview, parameter tweaking, and AI build prompt generation.
   - Removed all distracting modification UI, inputs, and unused endpoints.
   - Preserved codebase-preservation instructions within the AI build prompt so agents know how to integrate cleanly into existing codebases.

2. **Inspector Parameter Transfer to Prompt Generator**:
   - Tweak primary accent color, speed, density, glow, and camera zoom in the Inspector; the AI Build Prompt Studio immediately incorporates your active custom configuration rather than reverting to defaults.
   - Visible `#config-summary-bar` highlights all active values.

3. **Effect-Specific 3D Scene Factories (`SceneFactory`)**:
   - 30 distinct procedural Three.js scenes mapped through `v.sceneType`:
     - *Aurora plasma waves*, *celestial orbital planets*, *abstract torus knots*, *spatial glass prisms*, *kinetic 3D typography*, *spiral galaxy dust*, *warp speed starfields*, *neural network synapsing meshes*, *cyberpunk procedural wireframe terrain*, *mouse-reactive particles*, *curl vortexes*, *spatial headphones*, *luxury chronograph turntables*, *holographic cyber terminals*, *liquid chrome metaballs*, *AI thinking orbs*, and more.

4. **Live Real-Time FPS Measurement**:
   - Computes real frame delta times using `performance.now()` in the WebGL render loop and displays live FPS in `#fps-display`.

5. **Combine 3D Visuals Studio**:
   - Select multiple complementary 3D visuals to generate a coordinated master prompt with unified `requestAnimationFrame` timing and harmonized lighting.

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

- [`docs/product-overview.md`](docs/product-overview.md) — Product vision, tagline, and 5-step visual loop.
- [`docs/visual-library.md`](docs/visual-library.md) — 30 curated 3D visuals catalog across 8 categories with `sceneType` mappings.
- [`docs/prompt-engine.md`](docs/prompt-engine.md) — AI build prompt specification with parameter transfer.
- [`docs/visual-composer.md`](docs/visual-composer.md) — Combine 3D visuals studio & GPU loop budgeting.
- [`docs/3d-rendering.md`](docs/3d-rendering.md) — WebGL 2.0 rendering engine, `SceneFactory`, and live FPS.
- [`docs/performance.md`](docs/performance.md) — GPU lifecycle and performance optimization.
- [`docs/architecture.md`](docs/architecture.md) — System architecture and topology.
- [`docs/testing.md`](docs/testing.md) — Master verification and E2E test suites.
- [`docs/deployment.md`](docs/deployment.md) — Vercel Edge CI/CD pipeline.

---

## 📄 License

MIT License. Copyright (c) 2026 Kalyan.
