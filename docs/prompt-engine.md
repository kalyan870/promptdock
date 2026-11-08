# Comprehensive AI Build Prompt Engine

PromptDock 7.0 dynamically generates exhaustive 18-point engineering briefs tailored to the developer's chosen framework and placement constraints.

## 18-Point Engineering Brief Structure
1. **Role & Objective**: Directs the AI coding agent as a Principal Creative Frontend Architect.
2. **Reference Visual Specification**: Discipline, visual title, and aesthetic description.
3. **Layout & Placement**: Strict aspect ratio preservation, z-index hierarchy, and zero layout shift.
4. **Exact 3D Scene Architecture**: WebGLRenderer flags (`antialias: true`, `alpha: true`).
5. **Geometry Configuration**: Procedural primitive or buffer mesh details with vertex count.
6. **Material & Shader Details**: PBR specular parameters, emissive channels, roughness, metalness.
7. **Lighting Setup**: Balanced ambient lighting, directional sun highlights, and cursor point light.
8. **Camera Perspective**: FOV, near/far clipping, and initial vector coordinates.
9. **Animation Loop**: Base mathematical rotation and translation formulas.
10. **Pointer & Mouse Parallax**: Normalized device coordinates (NDC) lerping.
11. **Scroll Interaction**: ScrollTrigger or scroll velocity coupling.
12. **Color Palette**: Hex codes for primary emissive, secondary accent, and background.
13. **Framework & Dependencies**: Exact package installation instructions (e.g. `npm install three @react-three/fiber`).
14. **GPU Lifecycle Constraints**: Off-screen pausing, tab visibility pauses, ResizeObserver.
15. **Memory Disposal Protocol**: Explicit `geometry.dispose()` and `material.dispose()`.
16. **WebGL Fallback Strategy**: Graceful 2D canvas or CSS gradient fallbacks.
17. **Codebase Preservation Directive**: Mandatory instruction to inspect existing code and preserve unrelated sections.
18. **Acceptance & Verification Criteria**: Framerate targets, responsiveness, and zero memory leaks.
