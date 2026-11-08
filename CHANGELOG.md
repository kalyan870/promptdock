# Changelog

All notable changes to PromptDock are documented in this file.

## [7.2.0] - 2026-11-08

### Added & Re-Architected
- **21st.dev Horizon Hero Section Integration**: Integrated the official interactive community 3D component authored by Scott Clayton (`@lovesickfromthe6ix`) under the MIT License. Features Three.js WebGL canvas, 3-tier twinkling starfield shaders, procedural sine-wave elevation nebula, 4 atmospheric mountain depth layers, atmosphere Fresnel glow sphere, and mouse/scroll parallax.
- **React 19 + TypeScript + Vite Production Architecture**: Migrated from a single monolithic file into a modular, production-grade React + TypeScript + Vite architecture compiling into `dist/` with zero runtime overhead.
- **Dedicated Implementations for ALL 30 Scene Types**: Built dedicated Three.js scene generators in `SceneFactory` for all 30 visual effects with zero generic fallbacks (`reactiveParticles`, `magneticAttractor`, `flowField`, `hardwareTerminal`, `scrollCameraTrack`, `multiplaneParallax`, `sectionDissolve`, `tiltCardStack`, `morphingPill`, `magneticButtonMesh`, `borderBeamRunner`, `liquidChromeMesh`, `glassRefractionPrism`, `gooeyCluster`).
- **Separated Galaxy vs Curl Vortex & Neural Net vs Neural Graph**:
  - `galaxy`: Multi-arm logarithmic spiral galaxy with core density and orbital rotation.
  - `curlVortex`: Turbulent curl-noise advection swirl with fluid dynamics.
  - `neuralNet`: Structured geometric synaptic node mesh.
  - `neuralGraph`: Distributed autonomous nodes with dynamic travelling signal packets.
- **GPU Memory Leak Elimination**: Improved `SceneFactory.cleanGroup()` to reset `group._customUpdate = null` and recursively dispose all geometries, materials, material arrays, and allocated textures.
- **Exhaustive 18-Point Detailed AI Build Prompt**: Fully structured engineering brief with all 18 numbered technical requirements explicitly articulated.
- **159-Check Multi-Tier Test Suite**: Added comprehensive end-to-end testing validating every single scene implementation, parameter transfer, asset serving, and build artifacts.

## [7.1.0] - 2026-11-08

### Changed & Refined
- **Removed Website Modification Functionality**: Refined the core product to be a pure, high-precision 3D Website Visual Prompt Studio. Streamlined the workflow to a clean 5-step loop (Discover → Preview & Customise → Generate Prompt → Copy → Build with AI).
- **Inspector Parameter Transfer to Build Prompt**: Fixed parameter transfer so active Inspector controls are passed directly into the AI Build Prompt Generator with a real-time `#config-summary-bar`.
- **Live Dynamic FPS Counter**: Implemented real frame delta measurement in the WebGL loop using `performance.now()`.

## [7.0.0] - 2026-11-08

### Added
- **Product Repositioning to 3D Website Prompt Studio**: Re-engineered PromptDock into a dedicated creative technology platform centered around 3D web experiences.
- **Visual Discovery Gallery (30 Curated Visuals across 8 Disciplines)**.
- **Combine 3D Visuals Studio**: Multi-effect composer fusing primary and secondary 3D effects into a unified prompt sharing a single render loop.

## [6.0.0] - 2026-11-08
- Interactive component playground and Libraries.dev integration.

## [5.0.0] - 2026-11-08
- Visual presentation upgrade with visible preview compositions.
