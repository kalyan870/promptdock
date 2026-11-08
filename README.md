# PromptDock 5.0 — The Creative Developer Platform

<p align="center">
  <img src="images/comp-hero.svg" alt="PromptDock 5.0 Split-Screen 3D Hero Preview" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);" />
</p>

<p align="center">
  <a href="https://promptdock-eight.vercel.app"><img src="https://img.shields.io/badge/Production-Live-5eead4?style=for-the-badge&logo=vercel&logoColor=04060b" alt="Production Vercel"></a>
  <a href="https://github.com/kalyan870/promptdock/actions"><img src="https://img.shields.io/badge/CI-Passing-10b981?style=for-the-badge&logo=githubactions&logoColor=white" alt="CI Status"></a>
  <img src="https://img.shields.io/badge/Three.js-r128-818cf8?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  <img src="https://img.shields.io/badge/WebGL-2.0-c084fc?style=for-the-badge" alt="WebGL 2.0">
  <img src="https://img.shields.io/badge/License-MIT-38bdf8?style=for-the-badge" alt="MIT License">
</p>

---

## 🌟 Executive Overview

**PromptDock 5.0** is an interactive creative developer platform engineered for high-performance 3D WebGL interfaces, AI prompt discovery, **21st.dev** component marketplace synchronization, and **Libraries.dev** open-source dependency exploration.

Every major section visibly demonstrates its technology with **large, high-resolution preview compositions, real-time WebGL canvases, and copy-paste code snippets**.

- **Production Live Website**: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- **GitHub Repository**: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)

---

## 🎨 Visual Showcase & Feature Architecture

```mermaid
graph TD
    User["Creative Developer"] --> Client["PromptDock 5.0 Client"]
    
    subgraph Showcase ["Visible Visual Showcases"]
      Hero3D["Split-Screen Hero 3D (Three.js Icosahedron + Torus Knot)"]
      Comp21["21st.dev Component Marketplace (Bento, Dynamic Island, Hero)"]
      Prompts16["AI Prompt Discovery (16 Categories + Specular 3D Tilt)"]
      LibFX["Creative Effects & Shader Registry (Border Beam, Thinking Orb)"]
      WorkFlow["Workflow Studio (8-Stage Interactive Visual Pipeline)"]
      CaseStudies["Showcase Projects (8 Production Case Studies)"]
    end
    
    subgraph Engine ["3D & Motion Engine"]
      WebGL2["Three.js WebGL 2.0 Engine"]
      GSAPMotion["GSAP 3 Elastic Spring Physics & Magnetic Pull"]
      Intersection["IntersectionObserver (Pauses Off-Screen Scenes)"]
      TiltEngine["3D Perspective Tilt Physics with Specular Glare"]
    end
    
    Client --> Showcase
    Showcase --> Engine
    Engine --> Vercel["Global Vercel Production Edge CDN"]
```

---

## 🧩 Visual Component Marketplace (21st.dev-Inspired)

| Component | Category | Preview Asset | Stack |
| :--- | :--- | :--- | :--- |
| **Split Screen 3D Hero** | Hero | `images/comp-hero.svg` | React 19 + Three.js + Tailwind |
| **Dynamic Island Dock** | Navigation | `images/comp-navbar.svg` | Framer Motion + Tailwind |
| **Interactive Button Suite** | Buttons | `images/comp-buttons.svg` | GSAP 3 + CSS Keyframes |
| **3D Perspective Tilt Cards** | Cards | `images/comp-cards.svg` | CSS 3D Transforms + Vanilla JS |
| **Glassmorphic Pricing Table** | Pricing | `images/comp-pricing.svg` | Tailwind + Framer Motion |
| **Asymmetrical Bento Grid** | Bento | `images/comp-bento.svg` | CSS Grid + Canvas2D |
| **AI Copilot Chat Interface** | AI Chat | `images/comp-chat.svg` | React + Lucide Icons |
| **Multi-Step Inquiry Form** | Forms | `images/comp-forms.svg` | React Hook Form + Zod |
| **Kinetic Variable Typography** | Animated Text | `images/comp-text.svg` | CSS Variable Fonts + GSAP |
| **Three.js 3D Viewport** | 3D Viewport | `images/comp-3d.svg` | Three.js WebGL Canvas |
| **Mesh Gradient & Starfield** | Backgrounds | `images/comp-backgrounds.svg` | GLSL Fragment Shader |

---

## ⚡ Creative Effects Registry (Libraries.dev-Inspired)

| Effect | Category | Preview Asset | Install Command | License |
| :--- | :--- | :--- | :--- | :--- |
| **Border Beam Effect** | Shader & Border FX | `images/lib-border-beam.svg` | `npm i @promptdock/border-beam` | MIT |
| **AI Thinking Orb** | 3D Shader FX | `images/lib-thinking-orb.svg` | `npm i @promptdock/thinking-orb` | MIT |
| **Liquid Metal Chrome** | WebGL Normal Maps | `images/lib-liquid-metal.svg` | `npm i @promptdock/liquid-chrome` | MIT |
| **Gooey Fluid Blob** | SVG Filters | `images/lib-gooey.svg` | `npm i @promptdock/gooey-blob` | MIT |
| **Audio Spectrum Bars** | WebAudio Visualizer | `images/lib-voice-viz.svg` | `npm i @promptdock/voice-spectrum` | MIT |
| **Magnetic Spring Physics** | Motion & Physics | `images/lib-magnetic.svg` | `npm i @promptdock/magnetic-ui` | MIT |

---

## 🚀 8-Stage Interactive Workflow

<p align="center">
  <img src="images/workflow-pipeline.svg" alt="PromptDock 5.0 End-to-End Production Pipeline Diagram" width="100%" style="border-radius: 14px;" />
</p>

1. **Idea & Specifications**: Define requirements, 3D interaction models, and tech choices.
2. **Prompt Discovery**: Select tested 3D and animation prompts from the catalog.
3. **Component Selection**: Browse 21st.dev-inspired UI recipes.
4. **AI Code Generation**: Execute prompt in Claude, GPT-4o, or Gemini inside your IDE.
5. **Local Development**: Live-reload testing on `http://localhost:3000`.
6. **Automated QA**: Run `npm test && npm run build` for 63+ assertions and asset checks.
7. **GitHub Push**: Trigger multi-version Node.js matrix GitHub Actions CI.
8. **Vercel Deploy**: Deploy globally to Vercel edge with immutable asset caching.

---

## 📁 Project Structure

```
promptdock/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Node.js 18.x, 20.x, 22.x CI Matrix
├── docs/
│   ├── architecture.md            # System architecture & Mermaid flowcharts
│   ├── getting-started.md         # Local setup & keyboard shortcuts
│   ├── components.md              # 21st.dev component marketplace reference
│   ├── visual-system.md           # Visual hierarchy & design tokens
│   ├── 3d-engine.md               # Three.js WebGL scenes & shader pipelines
│   ├── workflow.md                # 8-stage interactive engineering pipeline
│   ├── testing.md                 # Automated QA & test runner specs
│   ├── deployment.md              # Vercel global edge CDN configuration
│   └── roadmap.md                 # Upcoming features (5.1 & WebGPU)
├── images/                        # 53 Production Vector SVG Assets
├── index.html                     # Core PromptDock 5.0 application
├── package.json                   # Project metadata & npm scripts
├── build.js                       # Production build compilation script
├── test-build.js                  # Master 63-point automated test suite
├── vercel.json                    # Edge headers & caching configuration
├── CHANGELOG.md                   # Version history
└── README.md                      # Platform documentation
```

---

## 🛠️ Local Development & Production Build

```bash
# 1. Install dependencies (zero external node packages required)
npm install

# 2. Run the automated test runner (63 assertions)
npm test

# 3. Run production build validation
npm run build

# 4. Start the local server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the application locally.

---

## 📜 License

MIT License &copy; 2026 Kalyan. All community resources attributed to their respective owners.
