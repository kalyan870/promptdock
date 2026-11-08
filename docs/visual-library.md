# 3D Visual Discovery Library Specification

The PromptDock 7.1 visual catalog contains 30 production-tested 3D website visual effects across 8 distinct categories, each mapped to a dedicated procedural scene generator in `SceneFactory`.

## Categories & Visual Index

### 1. 3D Hero Experiences
- **Aurora Plasma 3D Hero** (`sceneType: aurora`): Procedural glowing 3D plasma mesh with sine wave vertex displacement.
- **Celestial Orbit Planet** (`sceneType: planet`): Interactive low-poly celestial sphere with Keplerian satellite orbits.
- **Kinetic Abstract Torus Sculpture** (`sceneType: abstractTorus`): Intertwined mathematical torus knots executing gyroscopic rotation.
- **Spatial Glassmorphism Prismatic Hero** (`sceneType: spatialGlass`): Translucent optical glass planes with physical refraction.
- **Kinetic Typography 3D Marquee** (`sceneType: kineticType`): Dynamic 3D letterforms projecting along cylindrical curves.

### 2. 3D Backgrounds
- **Particle Galaxy Vortex** (`sceneType: galaxy`): Logarithmic spiral galaxy with curl-noise dynamics.
- **Animated Starfield Warp** (`sceneType: starfieldWarp`): Relativistic depth starfield accelerating on scroll velocity.
- **Neural Synthesis Network** (`sceneType: neuralNet`): Interconnected 3D synaptic node mesh with traversing pulse signals.
- **Procedural Low-Poly Terrain** (`sceneType: terrain`): Perlin-noise heightmap terrain flying forward with wireframe facet lighting.

### 3. Particles & Physics
- **Mouse-Reactive Particle Dispersion** (`sceneType: reactiveParticles`): Force-field particle array that repels from cursor with spring physics.
- **Magnetic Physics Attractor Field** (`sceneType: magneticAttractor`): Gravitational nodes orbiting dynamic draggable attractors.
- **GPU Curl-Noise Particle Vortex** (`sceneType: curlVortex`): Vector curl-noise advection rendering instanced particles.
- **Dynamic Vector Flow Field 3D** (`sceneType: flowField`): Continuous streamlines flowing through Perlin potential gradients.

### 4. 3D Product Experiences
- **Spatial Headphone 3D Showcase** (`sceneType: headphone`): 360-degree turntable with procedural curved headband and ear cups.
- **Luxury Chrono Watch Turntable** (`sceneType: chronoWatch`): High-precision mechanical watch tourbillon with anisotropic steel and moving hands.
- **Spatial Hardware Terminal Gallery** (`sceneType: hardwareTerminal`): Retro-futuristic holographic console with interactive grid lines.

### 5. Motion and Scroll Experiences
- **Scroll-Driven 3D Storytelling Camera** (`sceneType: scrollCameraTrack`): Spline camera journey swooping through spatial waypoints.
- **Spatial Multi-Plane Parallax Scene** (`sceneType: multiplaneParallax`): Multi-layered depth composition with inertial lerping.
- **Cinematic Section 3D Dissolve** (`sceneType: sectionDissolve`): Procedural geometry slicing and transitions between sections.

### 6. 3D UI Components
- **Spatial 3D Specular Tilt Cards** (`sceneType: tiltCardStack`): UI cards with real 3D perspective pitch/roll and specular glare.
- **Morphing 3D Dynamic Island Nav** (`sceneType: morphingPill`): Compact pill navbar expanding into a 3D media tray.
- **Magnetic 3D Glow Specular Button** (`sceneType: magneticButtonMesh`): CTA button physically attracted to cursor coordinates.
- **Border Beam SVG Keyframe Runner** (`sceneType: borderBeamRunner`): Glowing light runner racing along card perimeters.

### 7. Shaders and Materials
- **WebGL Liquid Chrome Fluid Shader** (`sceneType: liquidChromeMesh`): High-specular organic fluid mesh with metallic chrome reflections.
- **Physical Glass Optical Refraction** (`sceneType: glassRefractionPrism`): Real-time Fresnel reflection and chromatic dispersion prism.
- **Gooey Metamorphic Fluid Spheres** (`sceneType: gooeyCluster`): Metaball fluid clusters smoothly merging with surface tension.

### 8. AI and Technology Visuals
- **AI Holographic Thinking Energy Orb** (`sceneType: thinkingOrb`): Ethereal concentric wireframe spheres pulsating with AI processing phases.
- **Multi-Agent Neural Synthesis Graph** (`sceneType: neuralGraph`): Interactive 3D force-directed graph depicting agent messages.
- **Real-time FFT Voice Audio Equalizer** (`sceneType: voiceRing`): Circular frequency equalizer bar ring reacting to voice input.
- **Holographic System Telemetry Matrix** (`sceneType: telemetryGrid`): Dynamic cylindrical data matrix with rotating coordinate markers.
