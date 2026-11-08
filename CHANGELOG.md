# Changelog

All notable changes to PromptDock are documented in this file.

## [6.0.0] - 2026-11-08

### Added
- **Live Component Playground Workspace**: A real interactive sandbox inspired by 21st.dev with real DOM/Three.js mounting, responsive viewport switcher (Desktop 100%, Tablet 768px, Mobile 375px), theme switcher (dark/light), canvas background pattern switcher, live parameter controls (text, accent color, speed, glow intensity, border radius) with instant preview recalculation, complete production-ready copyable code, and reset controls.
- **Accurate Libraries.dev Integration**: Canonical link to `https://libraries.dev`, verified open-source package installations (`motion`, `three`, `simplex-noise`), and interactive effects playground with parameter sliders.
- **Three.js Engine Lifecycle Architecture**:
  - `IntersectionObserver` auto-pauses off-screen canvases (`cancelAnimationFrame`), reducing idle GPU draw to 0%.
  - Page Visibility API (`document.hidden`) automatically suspends rendering when tabs are switched or minimized.
  - `ResizeObserver` dynamically handles container size transitions without layout thrashing.
  - Context loss listeners (`webglcontextlost`, `webglcontextrestored`) handle GPU failures gracefully.
  - Explicit GPU resource disposal (`geometry.dispose()`, `material.dispose()`).
- **AI Coding Agent Workflow Section**: Dedicated section with an original visual architecture diagram (`workflow-agents.svg`) and copy-pasteable prompt specifications tailored for Google Antigravity, Claude Code, Cursor, Codex, and Gemini.
- **Showcase Projects Inspection & Status Clarification**: 8 showcase projects with dedicated "View Details" interactive modal, detailed architecture breakdowns, tech stack badges, and explicit production designations ("Interactive Demonstration" vs "Concept Mockup").
- **Production Engineering Pipeline**: Added `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, and `npm run validate`.
- **Extended Documentation Suite**: Added `docs/effects.md`, `docs/prompt-library.md`, and `docs/performance.md`.

## [5.0.0] - 2026-11-08

### Added
- **Visual Presentation Upgrade**: Every major section displays large visible preview compositions.
- **Split-Screen 3D Hero**: Redesigned hero with headline, tech indicators, and Three.js WebGL canvas overlaid with realistic floating browser preview.
- **21st.dev Component Marketplace**: Visual component discovery section with 11 component classes.
- **Libraries.dev Effects Registry**: Creative effects and shader registry.
- **Showcase Projects**: 8 comprehensive case studies.
- **Global Command Palette**: `Ctrl + K` quick search across prompts, components, libraries, and resources.
