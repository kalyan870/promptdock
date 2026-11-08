# Comprehensive AI Build Prompt Engine

PromptDock 7.1 dynamically generates exhaustive 18-point engineering briefs tailored to the developer's chosen framework, performance target, and active Inspector parameters.

## Active Parameter Transfer (PromptDock 7.1)
In PromptDock 7.1, when a user customizes any setting in the 3D Inspector:
- **Primary Accent Color** (`color`)
- **Animation Speed** (`speed`)
- **Particle/Mesh Density** (`density`)
- **Lighting & Glow Intensity** (`glow`)
- **Camera Zoom / Distance** (`cam`)
- **Wireframe Mode** (`wireframe`)

These values are instantly synchronized into `customVisualProps[id]`. When the user clicks **"Generate AI Build Prompt"**, the prompt builder dynamically incorporates these exact values into the 18-point brief rather than reverting to defaults. A visible `#config-summary-bar` displays these live settings right above the generated prompt.

## 18-Point Engineering Brief Structure
1. **Role & Objective**: Directs the AI coding agent as a Principal Creative Frontend Architect.
2. **Reference Visual Specification**: Discipline, visual title, aesthetic description, and active custom parameters.
3. **Layout & Placement**: Strict aspect ratio preservation, z-index hierarchy, and zero layout shift.
4. **Exact 3D Scene Architecture**: WebGLRenderer flags (`antialias: true`, `alpha: true`, `powerPreference: "high-performance"`).
5. **Geometry Configuration**: Procedural primitive or buffer mesh details with customized vertex density.
6. **Material & Shader Details**: PBR specular parameters, emissive channels, roughness, metalness, and wireframe state.
7. **Lighting Setup**: Balanced ambient lighting, directional sun highlights, and customizable glow intensity.
8. **Camera Perspective**: FOV, near/far clipping, and active camera zoom coordinates.
9. **Animation Loop**: Base mathematical rotation, translation formulas, and active velocity multipliers.
10. **Pointer & Mouse Parallax**: Normalized device coordinates (NDC) lerping.
11. **Scroll Interaction**: ScrollTrigger or scroll velocity coupling.
12. **Color Palette**: Hex codes for active primary emissive accent, secondary accent, and background.
13. **Framework & Dependencies**: Exact package installation instructions (e.g. `npm install three @react-three/fiber`).
14. **GPU Lifecycle Constraints**: Off-screen pausing, tab visibility pauses, ResizeObserver.
15. **Memory Disposal Protocol**: Explicit `geometry.dispose()` and `material.dispose()`.
16. **WebGL Fallback Strategy**: Graceful 2D canvas or CSS gradient fallbacks.
17. **Codebase Preservation Directive**: Mandatory instruction to inspect existing code and preserve unrelated sections, styles, and routes.
18. **Acceptance & Verification Criteria**: Framerate targets (60 FPS), responsiveness, and zero memory leaks.
