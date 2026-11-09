# PromptDock 8.0 Reference Source & Ecosystem Audit

This document provides a comprehensive technical audit of the external creative platforms, UI component registries, motion ecosystems, and WebGL frameworks that inspire, benchmark, or integrate into PromptDock 8.0.

---

## 1. 21st.dev (The NPM for Design Engineers)

- **Official URL**: [https://21st.dev](https://21st.dev)
- **Primary Focus**: Curated registry of modern React, Tailwind, and WebGL UI components built by top creative engineers.
- **Integrated Component**: **Horizon Hero Section** by **Scott Clayton** (`@lovesickfromthe6ix`).
- **Source Link**: [https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section](https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section)
- **Dependencies**: `three`, `gsap`, `react`, `react-dom`
- **License**: MIT License (Scott Clayton).
- **Attribution & Usage in PromptDock**: PromptDock integrates Scott Clayton's authentic 3D WebGL Horizon Engine directly into the hero section with visible credit badges, MIT license notices, and direct repository linking.

---

## 2. Libraries.dev

- **Official URL**: [https://libraries.dev](https://libraries.dev) (and Libraries.dev component catalogues)
- **Primary Focus**: Creative developer benchmarks, open-source library analytics, and package dependency indexes.
- **Reference Scope**: Evaluated for library discovery ergonomics, package categorization patterns, and framework installation commands.
- **License**: Open Source attribution.
- **Usage in PromptDock**: Informs PromptDock's categorization schema across 8 creative disciplines (Hero, Background, Particles, Product, Motion, UI, Shaders, AI).

---

## 3. Magic UI

- **Official URL**: [https://magicui.design](https://magicui.design)
- **Primary Focus**: Production-grade animated React components built with Tailwind CSS and Framer Motion / Motion.dev.
- **Reference Components**: Border Beam, Marquee, Meteors, Particles, Bento Grid, Shimmer Button.
- **Package / Dependencies**: `clsx`, `tailwind-merge`, `framer-motion` / `motion`
- **License**: MIT License.
- **Usage in PromptDock**: Inspires PromptDock's 3D UI component models (e.g. `borderBeamRunner`, `tiltCardStack`, `magneticButtonMesh`) and clean bento styling tokens.

---

## 4. Motion.dev (formerly Framer Motion)

- **Official URL**: [https://motion.dev](https://motion.dev)
- **Primary Focus**: The complete animation library for the web — smooth hardware-accelerated spring animations, layout transitions, and gesture recognizers.
- **Package**: `motion` (or `framer-motion`)
- **License**: MIT License.
- **Usage in PromptDock**: Benchmarked for smooth spring damping coefficients, physics-driven micro-interactions, and 60 FPS animation loop constraints.

---

## 5. Prompt Motion

- **Official URL**: Prompt Motion creative repositories & animation prompt formats
- **Primary Focus**: Structured natural-language prompt syntax for instructing AI models to generate interactive web animations.
- **Usage in PromptDock**: Benchmark for PromptDock's 18-point locked engineering prompt format, ensuring AI coding agents receive complete, non-ambiguous mathematical formulas and constraints.

---

## 6. Skills.sh

- **Official URL**: [https://skills.sh](https://skills.sh)
- **Primary Focus**: Agentic developer skills directory, standardizing tool-use protocols and AI workflow definitions.
- **Usage in PromptDock**: Adopts agent-first instructions, strict idempotency, and explicit installation manifests for code generation agents.

---

## 7. Three.js & WebGL 2.0 Ecosystem

- **Official URL**: [https://threejs.org](https://threejs.org)
- **Primary Focus**: Industry-standard JavaScript 3D library and WebGL scene graph renderer.
- **Package**: `three`, `@types/three`
- **License**: MIT License (Ricardo Cabello / Mr.doob and Three.js authors).
- **Usage in PromptDock**: The core 3D engine driving PromptDock's 30 curated real-time scenes, SceneFactory architecture, WebGLRenderer configuration, geometry disposal protocol, and live FPS telemetry.

---

## Summary of Intellectual Property & Attribution Governance

| Ecosystem | Role in PromptDock | License | Direct Attribution |
| :--- | :--- | :--- | :--- |
| **21st.dev** / Scott Clayton | 3D Horizon Hero Section | MIT | Featured badge, hero card, footer, and doc links |
| **Three.js** | Core 3D WebGL Engine | MIT | Engine headers, package.json, documentation |
| **Magic UI** | UI Component Inspiration | MIT | Component architecture benchmarks |
| **Motion.dev** | Physics & Damping Tokens | MIT | Interpolation constants |
| **Prompt Motion** | Prompt Structure Schema | Community | 18-point engineering brief design |
| **Libraries.dev** | Catalog & Taxonomy Models | Open Data | Categorization system |
| **Skills.sh** | Agent Instruction Schema | Open Source | AI Agent installation commands |
