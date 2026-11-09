# PromptDock 8.1 Implementation Plan

## Objective
Execute a substantial visual redesign of PromptDock, transforming it from a text/card-dominated site into a premium, interactive 3D creative developer platform.

## Target Version
PromptDock 8.1

---

## 1. Architectural Strategy & Component Redesigns

### Task 1: Complete Redesign of WorkflowSection.tsx (Interactive Visual Storyboard)
- Replace the 5 simple text boxes with a cinematic, connected 5-stage interactive visual storyboard.
- Desktop: Horizontal connected sequence with illuminated track lines and animated stage connectors.
- Mobile: Elegant vertical timeline with step badges and expandable interactive previews.
- Each stage must feature a real visual demonstration:
  - **Stage 01 (Discover)**: Gallery miniature with searchable filters, category pills, miniature 3D visual cards with active glow focus on Aurora.
  - **Stage 02 (Preview in 3D)**: Interactive WebGL Inspector viewport simulator with real-time reactive sphere/mesh, orbit/camera indicator, wireframe toggle, dynamic color switcher, and live FPS telemetry.
  - **Stage 03 (Select Build Presets)**: Controlled preset selector panel for Frameworks (Next.js 15, R3F, Vite, Three.js Vanilla), Placement (Hero, Background, Bento Card), and GPU profiles (Integrated, Standard, High-perf).
  - **Stage 04 (Copy Locked Prompt)**: Read-only terminal card with PromptDock 8.1 header, 18-point brief preview, copy trigger with feedback, and zero editable fields.
  - **Stage 05 (Build with Your AI)**: Visual flow connecting PromptDock to AI assistants (Google Antigravity, Claude, ChatGPT, Codex, Gemini, Cursor) generating the production website.

### Task 2: Substantial Redesign of GallerySection.tsx (Curated Visual Showcase)
- Move away from uniform 3-column SVG cards to a dynamic bento-style visual discovery layout:
  - Featured prominent hero visual card (Aurora Plasma 3D Hero) spanning wider aspect.
  - Category-grouped visual badges with distinct visual preview styles (plasma meshes, starfields, product assemblies, prism caustics, fluid chrome).
  - Quick-action buttons on every card: "Preview 3D" (triggers Inspector smooth scroll & load), "Copy 18-Pt Prompt" (copies full canonical brief directly), and "Favorite" (persists to localStorage).
  - High-fidelity visual cards with subtle gradient backdrop, reactive cursor hover glow, and live performance tier badges.

### Task 3: Premium Inspector Experience (InspectorSection.tsx)
- Large, dedicated 3D canvas viewport with HUD overlay:
  - Real-time FPS telemetry and render status.
  - Reset camera orientation button.
  - Wireframe and Lighting quick-toggles.
  - Interactive parameter sliders (Color, Speed, Density, Glow, Camera Distance).
  - Mobile touch support and drag-to-orbit controls.

### Task 4: Prompts Single Source of Truth & Copy Robustness
- Guarantee `src/engine/prompt-engine.ts` is the sole canonical source for all copy triggers across the site.
- Clipboard operations handled asynchronously with proper clipboard permissions and fallback.
- Read-only `<pre id="prompt-display">` enforcement.

### Task 5: Prominent Horizon Hero Experience (HorizonHeroSection.tsx)
- Balance the left-side typography with an expansive, uninterrupted 3D Horizon canvas.
- Scott Clayton's procedural mountain planes, starfield, and nebula shaders given maximum visual priority.

### Task 6: Visual Documentation & Real Screenshots
- Capture authentic webp screenshots via Playwright from the running application:
  - `docs/assets/screenshots/desktop-home.webp`
  - `docs/assets/screenshots/workflow-storyboard.webp`
  - `docs/assets/screenshots/discovery-gallery.webp`
  - `docs/assets/screenshots/visual-inspector.webp`
  - `docs/assets/screenshots/locked-prompt-studio.webp`
  - `docs/assets/screenshots/combine-visuals.webp`
  - `docs/assets/screenshots/mobile-home.webp`
- Update `README.md` with real screenshots, Mermaid diagrams, and release notes for 8.1.
- Update `Footer.tsx` and all metadata to PromptDock 8.1.

### Task 7: Playwright Automated Browser E2E Testing
- Create `test-browser-e2e.ts` using Playwright to test all 28 required user interactions in real Chromium:
  - Hero rendering, workflow storyboard interaction, gallery search/filtering, inspector 3D canvas, prompt immutability, copy actions, combine visuals, and mobile navigation.
