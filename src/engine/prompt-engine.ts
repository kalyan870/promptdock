import type { VisualItem, VisualProps } from '../data/visuals.ts';

export interface PromptOptions {
  framework?: string;
  placement?: string;
  perfTier?: string;
}

interface SceneSpec {
  geometry: string;
  material: string;
  lighting: string;
  animation: string;
  interaction: string;
}

const SCENE_SPECIFIC_MAP: Record<string, (color: string, secColor: string, speed: string, density: number, glow: string) => SceneSpec> = {
  // Aurora Hero
  aurora: (color, secColor, speed, density, glow) => ({
    geometry: `THREE.PlaneGeometry(12, 8, Math.round(Math.sqrt(${density})), Math.round(Math.sqrt(${density}))) oriented diagonally at (-0.4, 0.1, 0) radians with dynamic vertex wave deformation.`,
    material: `THREE.MeshStandardMaterial or Custom ShaderMaterial with double-sided rendering, wireframe: \${wireframeBool}, emissive: "${secColor}" at intensity ${glow}, metalness: 0.2, roughness: 0.35, blending: THREE.AdditiveBlending.`,
    lighting: `Dual directional accent lights: Primary Key (${color}, 1.8) at (5, 6, 4) and Cool Rim (${secColor}, ${glow}) at (-4, -3, -2) for high-contrast chromatic crest highlights.`,
    animation: `Vertex shader displacement: pos.z = sin(pos.x * 0.75 + time * ${speed}) * 0.42 + cos(pos.y * 0.95 + time * ${speed} * 0.7) * 0.38 + sin((pos.x + pos.y) * 0.5 + time * ${speed} * 0.4) * 0.22.`,
    interaction: `Smooth cursor velocity tilt: map pointer.x (-1..1) to mesh.rotation.y (+/- 0.35 rad) and pointer.y to mesh.rotation.x (+/- 0.25 rad) with 0.05 exponential lerp smoothing.`
  }),

  // Chrono Watch
  chronoWatch: (color, secColor, speed, density) => ({
    geometry: `Precision composite mesh hierarchy: Cylindrical titanium bezel (radius 2.1, height 0.4), beveled sapphire crystal lens (CylinderGeometry with transmission), brushed dial plane with 12 radial hour indices, and 3 independent hand meshes (hour, minute, smooth sweep second hand).`,
    material: `Physical PBR stack: Bezel with THREE.MeshStandardMaterial(metalness: 0.95, roughness: 0.18, color: "${color}"), sapphire lens with MeshPhysicalMaterial(transmission: 0.94, roughness: 0.05, ior: 1.77), dial hands with high-reflectivity emissive accents in "${secColor}".`,
    lighting: `Studio 3-point horology lighting: Soft Overhead Softbox (THREE.RectAreaLight or DirectionalLight 2.0 at 0, 8, 2), Grazing Rim Light (${secColor}, 1.4 at -5, 1, -3) catching bezel facets, and Subtle Fill (0.5 at 3, -2, 4).`,
    animation: `Chronometer kinematic loop: Second hand performs continuous micro-stepping sweep (angle = (time * ${speed} * 6.0) % (Math.PI * 2)), minute hand advances smoothly, subtle idle wrist rotation float: rotation.y = sin(time * ${speed} * 0.6) * 0.25.`,
    interaction: `Product showcase orbit: Cursor drag or pointer movement provides 360-degree interactive tilt and inspection angle (+/- 0.8 rad X/Y), revealing dynamic specular reflection across the crystal lens.`
  }),

  // Headphone
  headphone: (color, secColor, speed) => ({
    geometry: `Sculpted acoustic product hierarchy: Curved extruded headband arch (TorusGeometry arc segment), telescoping aluminum slider arms, dual pivoting earcup enclosures (SphereGeometry scaled along Z to form plush circumaural cushions), and mesh sound driver grilles with circular micro-perforations.`,
    material: `Matte soft-touch PBR: Cushion memory-foam material (roughness: 0.75, metalness: 0.05, color: "#11141c"), outer earcup aluminum accents (metalness: 0.92, roughness: 0.15, color: "${color}"), and illuminated driver accent rings (emissive: "${secColor}").`,
    lighting: `Commercial product studio lighting: High-angle key spotlight (1.5) highlighting headband contours, rim kicker (${secColor}, 1.8) casting vivid chromatic rim-light along earcups, and soft ambient ground bounce.`,
    animation: `Continuous presentation turntable orbit: group.rotation.y = time * 0.35 * ${speed}, combined with gentle harmonic floating bobbing: group.position.y = sin(time * 0.8 * ${speed}) * 0.18.`,
    interaction: `Interactive exploded/inspected orientation: Pointer NDC maps to responsive spring-damper rotation, allowing visitors to inspect driver detail and ear-cushion depth.`
  }),

  // Glass Refraction Prism
  glassRefractionPrism: (color, secColor, speed, _, glow) => ({
    geometry: `Extruded equilateral triangular prism (THREE.CylinderGeometry(2.4, 2.4, 3.6, 3)) with chamfered bevel edges, suspended within a focal incident ray path.`,
    material: `Advanced THREE.MeshPhysicalMaterial: transmission: 0.98, opacity: 1.0, transparent: true, roughness: 0.04, ior: 1.52, thickness: 2.2, chromaticAberration: 0.08, attenuationColor: new THREE.Color("${color}"), attenuationDistance: 1.2.`,
    lighting: `High-intensity collimated incident beam (SpotLight angle 0.15, intensity 3.0 at -8, 4, 3) pointing directly into the prism facet, with rainbow spectrum caustics rendered via volumetric sprite fan.`,
    animation: `Slow celestial tumble: rotation.x = time * 0.22 * ${speed}, rotation.y = time * 0.31 * ${speed}, causing internal light total internal reflection (TIR) angles to dynamically flare and disperse.`,
    interaction: `Cursor position alters the incident light vector and focal refraction index dynamically, producing responsive chromatic flare glints across the screen.`
  }),

  // Liquid Chrome Mesh
  liquidChromeMesh: (color, secColor, speed, density, glow) => ({
    geometry: `Dense icosahedron or subdivided sphere (radius 2.0, detail: 64, ~${density} vertices) perturbed via multi-octave 3D simplex or perlin noise vector fields.`,
    material: `Ultra-reflective mirror chrome: THREE.MeshStandardMaterial(metalness: 1.0, roughness: 0.06, color: "${color}", emissive: "${secColor}", emissiveIntensity: ${glow} * 0.2) combined with high-contrast PMREM environment map reflections.`,
    lighting: `Dynamic studio HDRI or 4-point contrasting orbital point lights (${color}, ${secColor}, #ffffff, #38bdf8) orbiting the chrome surface at varying radii to generate sweeping fluid highlights.`,
    animation: `Viscous fluid ripple loop: Vertex positions perturbed along surface normals: offset = noise3D(position * 1.2 + time * ${speed} * 0.5) * 0.45; vertex normals recalculated per-frame for mirror sheen.`,
    interaction: `Cursor velocity acts as a kinetic wake: passing pointer causes localized surface pressure waves that propagate outwards like droplets hitting mercury.`
  }),

  // Galaxy
  galaxy: (color, secColor, speed, density) => ({
    geometry: `THREE.BufferGeometry with ${density} points arranged into 4 logarithmic spiral arms (r = a * exp(b * theta)), with core bulge distribution and random cosmic dust scattering.`,
    material: `Custom THREE.PointsMaterial with circular soft alpha map: size: 0.035, vertexColors: true, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false.`,
    lighting: `Self-illuminated particle emissive cloud; central supermassive core point light (intensity 2.5, color: "${color}") illuminating ambient galactic dust rings.`,
    animation: `Differential Keplerian rotation: inner core particles orbit at higher angular velocity (omega = 1.0 / (radius + 0.3) * ${speed}), generating authentic galactic spiral stability.`,
    interaction: `3D mouse parallax tilts the galactic plane (+/- 45 degrees), revealing cross-sectional galactic disc thickness and stellar density.`
  }),

  // Neural Net
  neuralNet: (color, secColor, speed, density) => ({
    geometry: `Dual topology: Node cloud of ${Math.round(density * 0.25)} 3D point positions interconnected dynamically by dynamic THREE.LineSegments buffer geometry based on proximity distance threshold (< 1.8 units).`,
    material: `Node points: THREE.PointsMaterial(size: 0.08, color: "${color}", blending: THREE.AdditiveBlending). Synaptic line segments: THREE.LineBasicMaterial(color: "${secColor}", transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending).`,
    lighting: `Ambient neural luminescence with transient traveling pulse point lights that traverse connected synaptic pathways.`,
    animation: `Action potential signal propagation: Synaptic electrical impulses travel along lines between nodes at ${speed}x velocity; nodes gently drift within bounded 3D spherical attractor volume.`,
    interaction: `Cursor acts as an active cognitive stimulus: nearby nodes magnetize towards pointer coordinates and trigger cascade signal waves across connected neighbors.`
  }),

  // Thinking Orb
  thinkingOrb: (color, secColor, speed, density, glow) => ({
    geometry: `Multi-shell concentric sphere system: Core crystalline icosahedron (radius 1.2), surrounded by an ethereal plasma wave shell (~${density} vertices), and outer volumetric aura halo.`,
    material: `Dual Fresnel shader material: Inner core with transmission and high refractive dispersion; outer plasma shell with GLSL custom shader evaluating noise ripples and color blending from "${color}" to "${secColor}".`,
    lighting: `Internal glowing core point light (${color}, intensity: ${glow} * 2.5) shining through translucent outer plasma ripples, with external cool rim light.`,
    animation: `Cognitive breathing rhythm: Orb pulses harmonically in scale (1.0 + sin(time * 1.5 * ${speed}) * 0.08), while vertex noise coordinates continuously tumble in 4D space.`,
    interaction: `Pointer proximity accelerates internal thought velocity: moving cursor closer intensifies the pulse frequency and shifts emissive hue towards "${secColor}".`
  })
};

export class PromptEngine {
  /**
   * Generates the canonical, immutable 18-point AI build prompt for any visual.
   */
  static generateBuildPrompt(
    visual: VisualItem,
    customProps: VisualProps,
    options: PromptOptions = {}
  ): string {
    const color = customProps.color || visual.defaultProps.color || '#5eead4';
    const secondaryColor = customProps.secondaryColor || visual.defaultProps.secondaryColor || '#818cf8';
    const speed = (customProps.speed || visual.defaultProps.speed || 1.0).toFixed(1);
    const density = customProps.density || visual.defaultProps.density || 1600;
    const glow = (customProps.glow || visual.defaultProps.glow || 1.2).toFixed(1);
    const cam = (customProps.cam || visual.defaultProps.cam || 5.0).toFixed(1);
    const wireframeBool = customProps.wireframe ? 'true (Wireframe enabled)' : 'false (Solid shaded surface)';

    const framework = options.framework || 'Next.js 15 (App Router) + React Three Fiber';
    const placement = options.placement || visual.placement || 'Hero Section (Split-Screen / Full Width)';
    const perfTier = options.perfTier || visual.perf || 'Lightweight (Integrated GPU, 60 FPS)';

    // Scene-specific specification lookup, with robust fallback
    const specGenerator = SCENE_SPECIFIC_MAP[visual.sceneType] || ((c, sc, sp, den, gl) => ({
      geometry: `Procedural ${visual.sceneType} mesh / buffer geometry with ${den} optimized vertices, explicit normal vectors, and UV coordinates mapped for production stability.`,
      material: `THREE.MeshStandardMaterial(color: "${c}", emissive: "${sc}", emissiveIntensity: ${gl}, metalness: 0.85, roughness: 0.20, wireframe: \${wireframeBool}).`,
      lighting: `Studio lighting rig: Key DirectionalLight (1.2 at 5, 8, 5), Rim DirectionalLight (${c}, ${gl} at -5, -5, -5), and Ambient balance (0.6).`,
      animation: `Kinematic animation loop at ${sp}x speed: time-driven harmonic trigonometric displacement and continuous orientation orbit.`,
      interaction: `Normalized Device Coordinates (NDC) cursor parallax with smooth exponential lerp (damping 0.05) and clamped rotation range.`
    }));

    const spec = specGenerator(color, secondaryColor, speed, density, glow);

    return `// ============================================================================
// PROMPTDOCK 8.0 LOCKED AI BUILD SPECIFICATION (18-POINT ENGINEERING BRIEF)
// Effect: "${visual.name}" | Scene Architecture: [${visual.sceneType}]
// Ecosystem: PromptDock Immutable 3D Visual Library (https://promptdock-eight.vercel.app)
// ============================================================================

Act as a Principal Creative Frontend Architect, Three.js Specialist, and Senior WebGL Engineer.

Implement the production-tested 3D visual effect described in the following 18-point technical brief directly into my application.

Do not ask me to clarify requirements. Every parameter, geometry configuration, shader setting, and performance rule has been locked below.

### 1. ROLE & OBJECTIVE
Deliver a production-ready, performant, and interactive 3D WebGL implementation of "${visual.name}" matching the exact visual aesthetics, material quality, and responsive mechanics specified below.

### 2. REFERENCE VISUAL SPECIFICATION
- Visual Effect: ${visual.name}
- Category: ${visual.cat}
- Scene Architecture: ${visual.sceneType}
- Aesthetic Character: ${visual.desc}
- Primary Interaction: ${visual.interact}

### 3. WEBSITE PLACEMENT & LAYOUT CONSTRAINTS
- Target Container: ${placement}
- Canvas Layout: Relative or fixed container preserving parent aspect ratio without layout shifts.
- Z-Index Layering: Z-Index 0 or 1, positioned beneath interactive HTML content layers.
- Cumulative Layout Shift (CLS): 0.00. The canvas must mount with predetermined dimensions.

### 4. EXACT 3D SCENE ARCHITECTURE & WEBGL RENDERER
- Engine: Three.js WebGLRenderer (WebGL 2.0).
- Renderer Configuration:
  * antialias: true
  * alpha: true (transparent background blending seamlessly with page dark tone)
  * powerPreference: "high-performance"
  * pixelRatio: Math.min(window.devicePixelRatio, 2.0)
- Scene Background: Transparent or dark (#04060b).
- Scene Fog: THREE.FogExp2(0x04060b, 0.0003) for soft depth attenuation.

### 5. GEOMETRY CONFIGURATION & VERTEX DENSITY
- Geometry Architecture: ${spec.geometry}
- Active Vertex / Particle Density: ${density} vertices / points.
- Structure: Optimized buffer attributes with explicit position, normal, and UV coordinates.

### 6. MATERIAL, PBR SPECULAR & SHADER DETAILS
- Shading Mode: ${wireframeBool}
- Material Stack: ${spec.material}
- Primary Accent Tone: ${color}
- Secondary Accent Tone: ${secondaryColor}
- Emissive Channel: ${secondaryColor} at ${glow} multiplier intensity.

### 7. LIGHTING SETUP (AMBIENT, DIRECTIONAL & SPECULAR)
- Rig: ${spec.lighting}
- Ambient Lighting: THREE.AmbientLight(0xffffff, 0.6) for balanced base visibility.
- Key Light: THREE.DirectionalLight(0xffffff, 1.2) at vector (5, 8, 5).
- Rim Light: THREE.DirectionalLight("${color}", ${glow}) at vector (-5, -5, -5) to produce dramatic silhouette edges.
- Specular Glare: Specular highlights calibrated to cursor vector.

### 8. CAMERA PERSPECTIVE, FOV & COORDINATES
- Camera Type: THREE.PerspectiveCamera
- Field of View (FOV): 50 degrees
- Clipping Planes: Near = 0.1, Far = 1000.0
- Active Camera Distance: ${cam} units along the Z-axis.
- Target Focus: (0, 0, 0) with gentle lerped lookAt transitions.

### 9. CONTINUOUS ANIMATION LOOP & MATHEMATICAL FORMULAS
- Animation Velocity: Base speed multiplied by ${speed}x.
- Formula & Kinematics: ${spec.animation}

### 10. POINTER & MOUSE PARALLAX INTERACTIONS (NDC LERPING)
- Coordinate System: Normalized Device Coordinates (NDC) mapped from -1.0 to +1.0.
- Interpolation: Exponential smoothing (lerp) with a damping coefficient of 0.05.
- Mechanical Response: ${spec.interaction}

### 11. SCROLL-DRIVEN INTERACTIONS & VELOCITY COUPLING
- Scroll Relationship: Scroll progress shifts camera depth and rotates primary geometry along Y-axis.
- Scroll Smoothing: Couple camera position smoothly to window.scrollY without jarring layout shifts.

### 12. COLOR PALETTE & EMISSIVE CONFIGURATIONS
- Primary Tone Hex: ${color}
- Secondary Accent Hex: ${secondaryColor}
- Deep Background Tone: #04060b (Void Black)
- Emissive Multiplier: ${glow}

### 13. TARGET FRAMEWORK & EXACT INSTALLATION COMMANDS
- Selected Framework: ${framework}
- Required Package Command:
  \`npm install three @types/three gsap\`
  ${framework.includes('React Three Fiber') ? '\`npm install @react-three/fiber @react-three/drei\`' : ''}

### 14. RESPONSIVE LAYOUT & MOBILE VIEWPORT RULES
- Resize Strategy: Attach ResizeObserver to canvas parent container.
- Mobile GPU Budget: If window.innerWidth < 768px, cap pixelRatio to 1.5 and reduce geometry density by 40%.
- Touch Support: Handle touchmove and touchstart for mobile parity.

### 15. GPU LIFECYCLE, THROTTLING & BATTERY CONSERVATION
- Off-Screen Pausing: Wrap render loop in an IntersectionObserver to cancelAnimationFrame when scrolled out of view.
- Tab Visibility: Listen for document.visibilitychange to halt rendering when the browser tab is hidden.
- Frame Budget: Target rock-solid 60 FPS on integrated laptop GPUs (${perfTier}).

### 16. MEMORY DISPOSAL PROTOCOL
- On Component Unmount:
  * Cancel active requestAnimationFrame ID.
  * Recursively traverse scene: call geometry.dispose() and material.dispose().
  * Dispose any allocated WebGLRenderTarget or textures.
  * Call renderer.dispose() and remove canvas from DOM.

### 17. MANDATORY CODEBASE PRESERVATION DIRECTIVE
- STRICT RULE: Inspect my existing codebase before making any modifications.
- DO NOT overwrite, delete, or break unrelated routes, styling, or existing features.
- Integrate this 3D component cleanly as an isolated modular file or component.

### 18. ACCEPTANCE & VERIFICATION CRITERIA
- Render Test: Canvas mounts cleanly without console errors or WebGL warnings.
- Framerate Test: Sustains steady 60 FPS during cursor movement.
- Teardown Test: Zero memory leaks observed across route changes or re-renders.
`;
  }
}
