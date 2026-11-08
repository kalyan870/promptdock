export interface VisualProps {
  color: string;
  speed: number;
  density: number;
  glow: number;
  cam: number;
  wireframe?: boolean;
  secondaryColor?: string;
  size?: number;
  sensitivity?: number;
  roughness?: number;
  metalness?: number;
  [key: string]: any;
}

export interface VisualItem {
  id: string;
  name: string;
  cat: string;
  desc: string;
  thumb: string;
  tech: string;
  anim: string;
  interact: string;
  perf: string;
  perfTier: string;
  placement: string;
  sceneType: string;
  defaultProps: VisualProps;
}

export const CATEGORIES: string[] = [
  "All Visuals",
  "3D Hero Experiences",
  "3D Backgrounds",
  "Particles and Physics",
  "3D Product Experiences",
  "Motion and Scroll Experiences",
  "3D UI Components",
  "Shaders and Materials",
  "AI and Technology Visuals"
];

export const VISUALS: VisualItem[] = [
  // --- A. 3D Hero Experiences ---
  {
    id: "aurora-hero",
    name: "Aurora Plasma 3D Hero",
    cat: "3D Hero Experiences",
    desc: "Procedural glowing 3D plasma mesh with dynamic vertex displacement and smooth cursor parallax.",
    thumb: "images/aurora-hero.svg",
    tech: "Three.js + WebGL 2.0",
    anim: "Procedural Sine Wave Math",
    interact: "Cursor Velocity Parallax",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Hero Section (Split-Screen / Full Width)",
    sceneType: "aurora",
    defaultProps: { color: "#5eead4", secondaryColor: "#818cf8", speed: 1.0, density: 1600, glow: 1.2, cam: 5.0, wireframe: false }
  },
  {
    id: "celestial-planet",
    name: "Celestial Low-Poly Orbit Planet",
    cat: "3D Hero Experiences",
    desc: "Interactive planetary sphere with orbital satellites, soft specular lighting, and scroll-linked rotation.",
    thumb: "images/orbit-scene.svg",
    tech: "Three.js + BufferGeometry",
    anim: "Keplerian Orbital Motion",
    interact: "Scroll Progress & Drag",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Hero Section",
    sceneType: "planet",
    defaultProps: { color: "#818cf8", secondaryColor: "#38bdf8", speed: 0.8, density: 1200, glow: 1.0, cam: 5.5, wireframe: false }
  },
  {
    id: "abstract-sculpture",
    name: "Kinetic Abstract Torus Sculpture",
    cat: "3D Hero Experiences",
    desc: "Intertwined mathematical torus knots executing harmonic gyroscopic rotation with dynamic metallic reflections.",
    thumb: "images/comp-3d.svg",
    tech: "Three.js + MeshStandardMaterial",
    anim: "Gyroscopic Dual-Axis Rotation",
    interact: "Pointer Attraction & Inertia",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Hero Showcase",
    sceneType: "abstractTorus",
    defaultProps: { color: "#c084fc", secondaryColor: "#5eead4", speed: 1.2, density: 2000, glow: 1.5, cam: 4.8, wireframe: false }
  },
  {
    id: "spatial-glass-hero",
    name: "Spatial Glassmorphism Prismatic Hero",
    cat: "3D Hero Experiences",
    desc: "Floating translucent optical glass planes with physical refraction, chromatic dispersion, and depth blur.",
    thumb: "images/glass-cards.svg",
    tech: "Three.js + Physical Transmission",
    anim: "Floating Harmonic Drift",
    interact: "Depth-Based Mouse Parallax",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Hero Section",
    sceneType: "spatialGlass",
    defaultProps: { color: "#38bdf8", secondaryColor: "#5eead4", speed: 0.9, density: 1400, glow: 1.1, cam: 5.2, wireframe: false }
  },
  {
    id: "typography-hero",
    name: "Kinetic Typography 3D Marquee",
    cat: "3D Hero Experiences",
    desc: "Dynamic 3D letterforms projecting along cylindrical curves with scroll-velocity skew and perspective tilt.",
    thumb: "images/kinetic-type.svg",
    tech: "Three.js + CSS 3D Transforms",
    anim: "Velocity-Coupled Marquee",
    interact: "Scroll Velocity & Mouse Skew",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Hero / Section Divider",
    sceneType: "kineticType",
    defaultProps: { color: "#5eead4", secondaryColor: "#38bdf8", speed: 1.4, density: 1000, glow: 1.0, cam: 6.0, wireframe: false }
  },

  // --- B. 3D Backgrounds ---
  {
    id: "particle-galaxy",
    name: "Particle Galaxy Vortex Background",
    cat: "3D Backgrounds",
    desc: "Expansive 30,000-particle logarithmic spiral galaxy with curl-noise velocity fields and deep space falloff.",
    thumb: "images/particle-cloud.svg",
    tech: "Three.js Points + GLSL Shaders",
    anim: "Curl-Noise Spiral Dynamics",
    interact: "Mouse Turbulence Injection",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Full Website Background",
    sceneType: "galaxy",
    defaultProps: { color: "#5eead4", secondaryColor: "#818cf8", speed: 0.7, density: 3000, glow: 1.3, cam: 5.0, wireframe: false }
  },
  {
    id: "starfield-warp",
    name: "Animated Relativistic Starfield Warp",
    cat: "3D Backgrounds",
    desc: "Perspective depth starfield accelerating on scroll velocity with subtle chromatic edge streaking.",
    thumb: "images/halftone-tide.svg",
    tech: "Three.js Instanced Buffer",
    anim: "Z-Axis Infinite Warp Drive",
    interact: "Scroll Velocity Multiplier",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Full Website Background",
    sceneType: "starfieldWarp",
    defaultProps: { color: "#818cf8", secondaryColor: "#c084fc", speed: 1.5, density: 2500, glow: 1.0, cam: 4.5, wireframe: false }
  },
  {
    id: "neural-environment",
    name: "Neural Synthesis Network Background",
    cat: "3D Backgrounds",
    desc: "Interconnected 3D synaptic node mesh with pulsating signal pulses traversing distance-threshold edges.",
    thumb: "images/ai-generator.svg",
    tech: "Three.js LineSegments + Points",
    anim: "Synaptic Signal Propagation",
    interact: "Hover Node Attraction",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Section Background",
    sceneType: "neuralNet",
    defaultProps: { color: "#5eead4", secondaryColor: "#34d399", speed: 1.1, density: 1800, glow: 1.4, cam: 5.2, wireframe: true }
  },
  {
    id: "procedural-terrain",
    name: "Procedural Low-Poly Mountain Terrain",
    cat: "3D Backgrounds",
    desc: "Dynamic Perlin-noise heightmap terrain flying forward with real-time wireframe facet lighting.",
    thumb: "images/example-lumina.svg",
    tech: "Three.js PlaneGeometry + Simplex",
    anim: "Continuous Forward Flight",
    interact: "Mouse Elevation Lerp",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Section / Footer Background",
    sceneType: "terrain",
    defaultProps: { color: "#38bdf8", secondaryColor: "#818cf8", speed: 0.9, density: 2200, glow: 1.1, cam: 4.6, wireframe: true }
  },

  // --- C. Particles and Physics ---
  {
    id: "interactive-particles",
    name: "Mouse-Reactive Particle Dispersion",
    cat: "Particles and Physics",
    desc: "Force-field particle array that repels from the cursor and smoothly re-coalesces via elastic spring physics.",
    thumb: "images/motion-physics.svg",
    tech: "Three.js + Spring Dampers",
    anim: "Verlet Integration Physics",
    interact: "Cursor Repulsion & Magnetic Snap",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Interactive Canvas Hero",
    sceneType: "reactiveParticles",
    defaultProps: { color: "#5eead4", secondaryColor: "#fb7185", speed: 1.2, density: 2400, glow: 1.3, cam: 5.0, wireframe: false }
  },
  {
    id: "magnetic-attractor",
    name: "Magnetic Physics Attractor Field",
    cat: "Particles and Physics",
    desc: "Clustered gravitational nodes orbiting dynamic attractors with smooth velocity dissipation and particle trails.",
    thumb: "images/lib-magnetic.svg",
    tech: "Three.js Point Cloud",
    anim: "N-Body Gravitational Physics",
    interact: "Draggable Attractor Center",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Interactive Visual Section",
    sceneType: "magneticAttractor",
    defaultProps: { color: "#c084fc", secondaryColor: "#818cf8", speed: 1.3, density: 2000, glow: 1.4, cam: 5.4, wireframe: false }
  },
  {
    id: "particle-vortex",
    name: "GPU Curl-Noise Particle Vortex",
    cat: "Particles and Physics",
    desc: "Turbulent fluid vortex generated by 3D curl-noise mathematical fields, rendering 40k instanced sparkles.",
    thumb: "images/particle-cloud.svg",
    tech: "Three.js Custom Vertex Shader",
    anim: "Vector Curl-Noise Advection",
    interact: "Mouse Velocity Swirl",
    perf: "High-Performance GPU",
    perfTier: "High",
    placement: "Hero Visual Anchor",
    sceneType: "curlVortex",
    defaultProps: { color: "#5eead4", secondaryColor: "#38bdf8", speed: 1.5, density: 3500, glow: 1.6, cam: 4.8, wireframe: false }
  },
  {
    id: "flow-field",
    name: "Dynamic Vector Flow Field 3D",
    cat: "Particles and Physics",
    desc: "Smooth continuous streamlines flowing through Perlin potential gradients with colored velocity ribbons.",
    thumb: "images/workflow-3d.svg",
    tech: "Three.js Instanced Lines",
    anim: "Euler Streamline Propagation",
    interact: "Field Direction Manipulation",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Visual Feature Studio",
    sceneType: "flowField",
    defaultProps: { color: "#34d399", secondaryColor: "#5eead4", speed: 1.0, density: 1800, glow: 1.2, cam: 5.2, wireframe: false }
  },

  // --- D. 3D Product Experiences ---
  {
    id: "product-showcase",
    name: "Spatial Headphone 3D Showcase",
    cat: "3D Product Experiences",
    desc: "Interactive 360-degree turntable with exploded planar driver view, material switching, and focal hotspots.",
    thumb: "images/example-product-3d.svg",
    tech: "Three.js GLTF + PBR Materials",
    anim: "Kinematic Exploded Parts Lerp",
    interact: "360° Orbit & Pinch Zoom",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Product Landing Page",
    sceneType: "headphone",
    defaultProps: { color: "#818cf8", secondaryColor: "#5eead4", speed: 0.6, density: 1500, glow: 1.1, cam: 5.5, wireframe: false }
  },
  {
    id: "chrono-turntable",
    name: "Luxury Chrono Watch 3D Turntable",
    cat: "3D Product Experiences",
    desc: "High-precision mechanical watch tourbillon with real-time anisotropic brushed steel and sapphire crystal glass.",
    thumb: "images/example-chrono.svg",
    tech: "Three.js Physical PBR + HDR",
    anim: "Real-time Second-Hand Ticking",
    interact: "Drag Orbit & Crown Pull",
    perf: "High-Performance GPU",
    perfTier: "High",
    placement: "Luxury Ecommerce Hero",
    sceneType: "chronoWatch",
    defaultProps: { color: "#fbbf24", secondaryColor: "#f1f5f9", speed: 0.5, density: 2200, glow: 1.3, cam: 4.6, wireframe: false }
  },
  {
    id: "hardware-gallery",
    name: "Spatial Hardware Terminal Gallery",
    cat: "3D Product Experiences",
    desc: "Floating retro-futuristic holographic console with interactive holographic projection beam and glowing telemetry.",
    thumb: "images/example-cyberfolio.svg",
    tech: "Three.js + Bloom Shaders",
    anim: "Hologram Scanline Oscillation",
    interact: "Hotspot Click & Stage Flip",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Product Feature Grid",
    sceneType: "hardwareTerminal",
    defaultProps: { color: "#5eead4", secondaryColor: "#c084fc", speed: 0.8, density: 1600, glow: 1.4, cam: 5.0, wireframe: false }
  },

  // --- E. Motion and Scroll Experiences ---
  {
    id: "scroll-camera",
    name: "Scroll-Driven 3D Storytelling Camera",
    cat: "Motion and Scroll Experiences",
    desc: "Cinematic spline camera journey swooping through spatial 3D waypoints tightly synchronized with page scroll.",
    thumb: "images/tidewave-landing.svg",
    tech: "Three.js CatmullRomCurve + GSAP",
    anim: "Hermite Spline Camera Path",
    interact: "ScrollTrigger Smooth Scrubber",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Full-Page Narrative Landing",
    sceneType: "scrollCameraTrack",
    defaultProps: { color: "#38bdf8", secondaryColor: "#5eead4", speed: 1.0, density: 1400, glow: 1.0, cam: 5.0, wireframe: false }
  },
  {
    id: "parallax-depth",
    name: "Spatial Multi-Plane Parallax Scene",
    cat: "Motion and Scroll Experiences",
    desc: "Multi-layered depth composition separating foreground UI, midground 3D geometries, and distant nebulas.",
    thumb: "images/folio-dark.svg",
    tech: "Three.js Layer Masks + CSS 3D",
    anim: "Inertial Multi-Axis Lerping",
    interact: "Mouse Gyroscope & Trackpad",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Portfolio Showcase",
    sceneType: "multiplaneParallax",
    defaultProps: { color: "#818cf8", secondaryColor: "#38bdf8", speed: 0.9, density: 1300, glow: 1.1, cam: 5.3, wireframe: false }
  },
  {
    id: "split-transitions",
    name: "Cinematic Section 3D Dissolve",
    cat: "Motion and Scroll Experiences",
    desc: "Full-screen procedural geometry slicing and dissolutions transitioning cleanly between page sections.",
    thumb: "images/split-hero.svg",
    tech: "Three.js Stencil Buffer + GSAP",
    anim: "Voronoi Cell Dissolve Transition",
    interact: "Section In-View Trigger",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Section Divider / Transition",
    sceneType: "sectionDissolve",
    defaultProps: { color: "#c084fc", secondaryColor: "#5eead4", speed: 1.2, density: 1500, glow: 1.3, cam: 4.9, wireframe: false }
  },

  // --- F. 3D UI Components ---
  {
    id: "spatial-tilt-cards",
    name: "Spatial 3D Specular Tilt Cards",
    cat: "3D UI Components",
    desc: "UI cards with real 3D perspective pitch/roll and a cursor-following specular glare highlight.",
    thumb: "images/comp-cards.svg",
    tech: "CSS 3D Transforms + GSAP",
    anim: "Spring Return Physics",
    interact: "Mouse Coordinate Angle Calc",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Features / Pricing Grid",
    sceneType: "tiltCardStack",
    defaultProps: { color: "#5eead4", secondaryColor: "#818cf8", speed: 1.0, density: 1000, glow: 1.2, cam: 5.0, wireframe: false }
  },
  {
    id: "dynamic-island",
    name: "Morphing 3D Dynamic Island Nav",
    cat: "3D UI Components",
    desc: "Compact pill navbar expanding with spring physics into an interactive 3D media tray with status indicators.",
    thumb: "images/dynamic-island.svg",
    tech: "Three.js + Framer Motion Logic",
    anim: "Spring Damped Morphing",
    interact: "Hover Expand & Key Command",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Floating Sticky Navbar",
    sceneType: "morphingPill",
    defaultProps: { color: "#5eead4", secondaryColor: "#38bdf8", speed: 1.1, density: 800, glow: 1.0, cam: 5.5, wireframe: false }
  },
  {
    id: "magnetic-button",
    name: "Magnetic 3D Glow Specular Button",
    cat: "3D UI Components",
    desc: "Interactive CTA button physically attracted to cursor coordinates with border-beam light refraction.",
    thumb: "images/comp-buttons.svg",
    tech: "HTML5 Canvas + GSAP Springs",
    anim: "Elastic Spring Rebound",
    interact: "Cursor Proximity Magnetic Pull",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Call to Action Anchor",
    sceneType: "magneticButtonMesh",
    defaultProps: { color: "#5eead4", secondaryColor: "#818cf8", speed: 1.3, density: 900, glow: 1.4, cam: 5.2, wireframe: false }
  },
  {
    id: "border-beam",
    name: "Border Beam Keyframe Light Runner",
    cat: "3D UI Components",
    desc: "Glowing light runner racing along card perimeters with precision SVG path keyframes. Zero dependencies.",
    thumb: "images/lib-border-beam.svg",
    tech: "CSS Keyframes + SVG Path",
    anim: "Continuous Perimeter Runner",
    interact: "Hover Speed Modulation",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Bento Grid Cards",
    sceneType: "borderBeamRunner",
    defaultProps: { color: "#5eead4", secondaryColor: "#c084fc", speed: 1.0, density: 1100, glow: 1.3, cam: 5.0, wireframe: false }
  },

  // --- G. Shaders and Materials ---
  {
    id: "liquid-chrome",
    name: "WebGL Liquid Chrome Fluid Shader",
    cat: "Shaders and Materials",
    desc: "Real-time procedural fragment shader simulating viscous liquid mercury with cursor ripple shockwaves.",
    thumb: "images/lib-liquid-metal.svg",
    tech: "Three.js GLSL Custom Shader",
    anim: "Navier-Stokes Ripple Simulation",
    interact: "Cursor Pressure & Velocity",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Hero / Section Background",
    sceneType: "liquidChromeMesh",
    defaultProps: { color: "#f1f5f9", secondaryColor: "#5eead4", speed: 1.0, density: 2500, glow: 1.5, cam: 4.8, wireframe: false }
  },
  {
    id: "glass-refraction",
    name: "Physical Glass Optical Refraction",
    cat: "Shaders and Materials",
    desc: "Shader calculating real-time Fresnel reflection, chromatic aberration, and backface refraction distortions.",
    thumb: "images/glass-cards.svg",
    tech: "Three.js MeshPhysicalMaterial",
    anim: "Harmonic Optical Wobble",
    interact: "Cursor Angle Distortion",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Interactive Overlay Cards",
    sceneType: "glassRefractionPrism",
    defaultProps: { color: "#38bdf8", secondaryColor: "#818cf8", speed: 0.8, density: 1600, glow: 1.2, cam: 5.0, wireframe: false }
  },
  {
    id: "gooey-fluids",
    name: "Gooey Metamorphic Fluid Spheres",
    cat: "Shaders and Materials",
    desc: "Metaball fluid clusters smoothly merging and separating with surface-tension threshold filtering.",
    thumb: "images/lib-gooey.svg",
    tech: "Three.js Marching Cubes / SVG",
    anim: "Organic Surface Tension Fusion",
    interact: "Drag & Merge Metaspheres",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "Creative Playground Hero",
    sceneType: "gooeyCluster",
    defaultProps: { color: "#5eead4", secondaryColor: "#fb7185", speed: 1.2, density: 1800, glow: 1.4, cam: 5.2, wireframe: false }
  },

  // --- H. AI and Technology Visuals ---
  {
    id: "thinking-orb",
    name: "AI Holographic Thinking Energy Orb",
    cat: "AI and Technology Visuals",
    desc: "Luminous ethereal orb with swirling volumetric energy strands pulsing in sync with inference thinking cycles.",
    thumb: "images/lib-thinking-orb.svg",
    tech: "Three.js Volumetric Particle Glow",
    anim: "Pulsating Latent Space Resonance",
    interact: "Audio / Hover Energy Spikes",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "AI Copilot / Chat Interface",
    sceneType: "thinkingOrb",
    defaultProps: { color: "#5eead4", secondaryColor: "#818cf8", speed: 1.4, density: 2000, glow: 1.6, cam: 4.6, wireframe: false }
  },
  {
    id: "neural-visualizer",
    name: "Multi-Agent Neural Synthesis Graph",
    cat: "AI and Technology Visuals",
    desc: "Interactive 3D graph depicting autonomous AI agents communicating across real-time weighted directed edges.",
    thumb: "images/ai-generator.svg",
    tech: "Three.js Force-Directed Graph",
    anim: "Dynamic Edge Flow Pulses",
    interact: "Node Selection & Pinning",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "AI Studio Dashboard",
    sceneType: "neuralGraph",
    defaultProps: { color: "#818cf8", secondaryColor: "#5eead4", speed: 1.1, density: 1700, glow: 1.3, cam: 5.1, wireframe: true }
  },
  {
    id: "audio-visualizer",
    name: "Real-time FFT Voice Audio Equalizer",
    cat: "AI and Technology Visuals",
    desc: "3D circular frequency equalizer bar ring reacting dynamically to microphone voice stream or audio buffers.",
    thumb: "images/lib-voice-viz.svg",
    tech: "Three.js + WebAudio FFT",
    anim: "Fourier Transform Bar Heights",
    interact: "Voice Reactive Input",
    perf: "Lightweight (Integrated GPU)",
    perfTier: "Low",
    placement: "Voice AI / Podcast Hero",
    sceneType: "voiceRing",
    defaultProps: { color: "#5eead4", secondaryColor: "#fb7185", speed: 1.3, density: 1500, glow: 1.5, cam: 5.0, wireframe: false }
  },
  {
    id: "telemetry-matrix",
    name: "Spatial Telemetry Observability Matrix",
    cat: "AI and Technology Visuals",
    desc: "High-density 3D data grid with glowing sparkline cylinders and live cluster health metric indicators.",
    thumb: "images/nexus-dashboard.svg",
    tech: "Three.js Instanced Cubes + Canvas",
    anim: "Real-time Metric Stream Lerp",
    interact: "Cluster Cell Hover Inspection",
    perf: "Medium GPU",
    perfTier: "Medium",
    placement: "SaaS Observability Platform",
    sceneType: "telemetryGrid",
    defaultProps: { color: "#38bdf8", secondaryColor: "#5eead4", speed: 0.9, density: 1900, glow: 1.2, cam: 5.3, wireframe: false }
  }
];
