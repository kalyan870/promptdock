# Changelog

All notable changes to PromptDock are documented in this file.

## [7.1.0] - 2026-11-08

### Changed & Refined
- **Removed Website Modification Functionality**: Refined the core product to be a pure, high-precision 3D Website Visual Prompt Studio. Streamlined the workflow to a clean 5-step loop (Discover → Preview & Customise → Generate Prompt → Copy → Build with AI). Removed all modification section UI, inputs, buttons, and redundant scripts while preserving strict codebase-preservation rules inside the AI Build Prompts.
- **Inspector Parameter Transfer to Build Prompt**: Fixed parameter transfer so active Inspector controls (accent color, animation speed, particle/mesh density, glow intensity, camera distance, wireframe state) are passed directly into the AI Build Prompt Generator rather than resetting to defaults. Added a real-time `#config-summary-bar` displaying the active values above the generated prompt.
- **Dedicated 3D Scene Factories (`SceneFactory`)**: Replaced generic fallback shapes with 30 distinct procedural Three.js scene architectures mapped via `v.sceneType`. Each visual now renders a unique, tailored 3D geometry structure in the Inspector (such as procedural watch dials, curved headphone bands, cyber terrain meshes, galaxy particle clouds, thinking hologram orbs, and glass refraction prisms).
- **Live Dynamic FPS Counter**: Implemented real frame delta measurement in the WebGL loop using `performance.now()`, rendering live measured framerates in `#fps-display`.
- **Documentation Refinement**: Pruned `docs/modification-engine.md` and updated all remaining 9 documentation guides, verifying 100% architectural and functional alignment with PromptDock 7.1.

## [7.0.0] - 2026-11-08

### Added
- **Product Repositioning to 3D Website Prompt Studio**: Re-engineered PromptDock into a dedicated creative technology platform centered entirely around discovering, previewing, customizing, and generating comprehensive AI prompts for 3D web experiences.
- **Visual Discovery Gallery (30 Curated Visuals across 8 Disciplines)**:
  - 3D Hero Experiences (Aurora plasma, celestial planet, kinetic torus, spatial glass, typography 3D).
  - 3D Backgrounds (Particle galaxy vortex, starfield warp, neural synthesis, procedural terrain).
  - Particles and Physics (Mouse-reactive particles, magnetic attractors, curl-noise vortex, flow fields).
  - 3D Product Experiences (Spatial headphones, luxury chrono watch turntable, hardware terminals).
  - Motion and Scroll Experiences (Scroll storytelling cameras, parallax depth layers, cinematic section dissolves).
  - 3D UI Components (Spatial tilt cards, dynamic island nav, magnetic buttons, border beams).
  - Shaders and Materials (Liquid chrome fluid, physical glass refraction, gooey metaballs).
  - AI and Technology Visuals (Thinking hologram orbs, multi-agent neural graphs, audio FFT visualizers, telemetry matrices).
- **Interactive 3D Visual Inspector**: Real-time WebGL 2.0 viewport with live parameter sliders (Color, Velocity, Density, Glow, Camera Distance, Wireframe toggle) that alter the Three.js scene dynamically.
- **Comprehensive 18-Point AI Build Prompt Engine**: Generates exhaustive engineering briefs including geometry, material parameters, lighting, animations, pointer parallax, framework-specific package commands, GPU lifecycle, and strict codebase preservation instructions.
- **Combine 3D Visuals Studio**: Multi-effect composer fusing primary and secondary 3D effects into a unified prompt sharing a single requestAnimationFrame render loop and harmonized lighting.
- **Local Favourites & Deep Linking**: Real-time favorites persistence in `localStorage` and URL hashtag navigation.
- **Engine Lifecycle Protocol**: Off-screen auto-pausing via `IntersectionObserver`, `visibilitychange` suspension on tab switches, `ResizeObserver` container listeners, and WebGL context loss recovery.

## [6.0.0] - 2026-11-08

### Added
- **Live Component Playground Workspace**: DOM/Three.js sandbox with viewport switching and code export.
- **Libraries.dev Integration**: Canonical links to https://libraries.dev and verified open-source packages.
- **AI Coding Agent Workflow**: Dedicated section with visual architecture pipeline.

## [5.0.0] - 2026-11-08

### Added
- **Visual Presentation Upgrade**: Large visible preview compositions across all sections.
