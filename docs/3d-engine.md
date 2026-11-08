# 3D & WebGL Engine Documentation

PromptDock 5.0 integrates Three.js r128 with custom shaders, procedural geometries, and performance safeguards.

## Canvases & Scenes

1. **`#hero-canvas` (Hero 3D Showcase)**:
   - Wireframe `IcosahedronGeometry(7, 1)` with `MeshStandardMaterial`.
   - Concentric `TorusKnotGeometry(4, 0.45, 100, 16)`.
   - Orbital `TorusGeometry(11, 0.12, 16, 100)`.
   - 450 star particles in `BufferGeometry` reacting to cursor momentum.

2. **`#component-canvas` (Component Marketplace)**:
   - Rotating wireframe 3D Box and Dodecahedron geometries symbolizing modular design system primitives.

3. **`#workflow-canvas` (Workflow Assembly Pipeline)**:
   - Three crystalline `OctahedronGeometry` nodes representing Idea, AI Synthesis, and Edge Deployment connected with dynamic lights.

4. **`#modal-3d-canvas` (Interactive Inspector Viewport)**:
   - Real-time WebGL canvas embedded directly inside the modal dialog allowing users to drag and examine 3D models.

## Performance & Optimization

- **Adaptive Quality**: Capped pixel ratio (`Math.min(window.devicePixelRatio, 2)`).
- **Reduced Motion Support**: Disables heavy transforms if `prefers-reduced-motion` is active.
- **Graceful Fallback**: Automatically renders standard CSS transforms and high-resolution SVG mockups if WebGL 2.0 is unavailable on the client device.
