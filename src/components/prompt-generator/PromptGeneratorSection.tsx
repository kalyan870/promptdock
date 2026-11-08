import React, { useState, useMemo } from 'react';
import { VisualItem, VisualProps } from '../../data/visuals';

interface PromptGeneratorProps {
  selectedVisual: VisualItem;
  customProps: VisualProps;
  onCopyToast: (message: string) => void;
}

export const PromptGeneratorSection: React.FC<PromptGeneratorProps> = ({
  selectedVisual,
  customProps,
  onCopyToast
}) => {
  const [targetFramework, setTargetFramework] = useState<string>('Next.js 15 (App Router) + React Three Fiber');
  const [targetPlacement, setTargetPlacement] = useState<string>('Hero Section (Split-Screen / Full Width)');
  const [targetPerf, setTargetPerf] = useState<string>('Lightweight (Integrated GPU, 60 FPS)');

  // Generate Exhaustive 18-Point Detailed AI Build Prompt
  const generatedPrompt = useMemo(() => {
    const color = customProps.color || selectedVisual.defaultProps.color || '#5eead4';
    const secondaryColor = customProps.secondaryColor || selectedVisual.defaultProps.secondaryColor || '#818cf8';
    const speed = (customProps.speed || selectedVisual.defaultProps.speed || 1.0).toFixed(1);
    const density = customProps.density || selectedVisual.defaultProps.density || 1600;
    const glow = (customProps.glow || selectedVisual.defaultProps.glow || 1.2).toFixed(1);
    const cam = (customProps.cam || selectedVisual.defaultProps.cam || 5.0).toFixed(1);
    const wireframe = customProps.wireframe ? 'true (Wireframe enabled)' : 'false (Solid shaded surface)';

    return `// ============================================================================
// PROMPTDOCK 7.2 DETAILED AI BUILD PROMPT (18-POINT ENGINEERING BRIEF)
// Reference Effect: "${selectedVisual.name}" (${selectedVisual.sceneType})
// ============================================================================

Act as a Principal Creative Frontend Architect, Three.js Specialist, and Senior WebGL Engineer.

Implement the production-tested 3D visual effect described in the following 18-point technical brief into my existing application.

### 1. ROLE & OBJECTIVE
Deliver a production-ready, performant, and interactive 3D WebGL implementation of "${selectedVisual.name}" matching the exact visual aesthetics, material quality, and responsive mechanics specified below.

### 2. REFERENCE VISUAL SPECIFICATION
- Visual Effect: ${selectedVisual.name}
- Category: ${selectedVisual.cat}
- Scene Architecture: ${selectedVisual.sceneType}
- Aesthetic Character: ${selectedVisual.desc}
- Primary Interaction: ${selectedVisual.interact}

### 3. WEBSITE PLACEMENT & LAYOUT CONSTRAINTS
- Target Container: ${targetPlacement}
- Canvas Layout: Relative or fixed container preserving parent aspect ratio.
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
- Geometry Type: Procedural mesh / buffer geometry mapped to "${selectedVisual.sceneType}".
- Active Vertex / Particle Density: ${density} vertices / points.
- Structure: Optimized buffer attributes with explicit position, normal, and UV coordinates.

### 6. MATERIAL, PBR SPECULAR & SHADER DETAILS
- Shading Mode: ${wireframe}
- Primary Accent Tone: ${color}
- Secondary Accent Tone: ${secondaryColor}
- PBR Properties:
  * Metalness: 0.85
  * Roughness: 0.20
  * Transmission / Opacity: 0.88
  * Emissive Channel: ${secondaryColor} at ${glow} intensity

### 7. LIGHTING SETUP (AMBIENT, DIRECTIONAL & SPECULAR)
- Ambient Lighting: THREE.AmbientLight(0xffffff, 0.6) for balanced base visibility.
- Key Light: THREE.DirectionalLight(0xffffff, 1.2) at vector (5, 8, 5).
- Rim Light: THREE.DirectionalLight(${color}, ${glow}) at vector (-5, -5, -5) to produce dramatic silhouette edges.
- Specular Glare: Specular highlights calibrated to cursor vector.

### 8. CAMERA PERSPECTIVE, FOV & COORDINATES
- Camera Type: THREE.PerspectiveCamera
- Field of View (FOV): 50 degrees
- Clipping Planes: Near = 0.1, Far = 1000.0
- Active Camera Distance: ${cam} units along the Z-axis.
- Target Focus: (0, 0, 0) with gentle lerped lookAt transitions.

### 9. CONTINUOUS ANIMATION LOOP & MATHEMATICAL FORMULAS
- Animation Velocity: Base speed multiplied by ${speed}x.
- Formula: Time-driven continuous trigonometric motion:
  * Primary wave: sin(x * 0.8 + time * ${speed}) * cos(y * 0.6 + time * ${speed} * 0.8)
  * Idle rotation: group.rotation.y += delta * 0.4 * ${speed}

### 10. POINTER & MOUSE PARALLAX INTERACTIONS (NDC LERPING)
- Coordinate System: Normalized Device Coordinates (NDC) mapped from -1.0 to +1.0.
- Interpolation: Exponential smoothing (lerp) with a damping coefficient of 0.05.
- Parallax Range: Maximum camera tilt offset of +/- 0.4 radians along X/Y axes.

### 11. SCROLL-DRIVEN INTERACTIONS & VELOCITY COUPLING
- Scroll Relationship: Scroll progress shifts camera depth and rotates primary geometry along Y-axis.
- Scroll Smoothing: Couple camera position smoothly to window.scrollY without jarring layout shifts.

### 12. COLOR PALETTE & EMISSIVE CONFIGURATIONS
- Primary Glow Hex: ${color}
- Secondary Accent Hex: ${secondaryColor}
- Deep Background Tone: #04060b (Void Black)
- Emissive Multiplier: ${glow}

### 13. TARGET FRAMEWORK & EXACT INSTALLATION COMMANDS
- Selected Framework: ${targetFramework}
- Required Package Command:
  \`npm install three @types/three gsap\`
  ${targetFramework.includes('React Three Fiber') ? '\`npm install @react-three/fiber @react-three/drei\`' : ''}

### 14. RESPONSIVE LAYOUT & MOBILE VIEWPORT RULES
- Resize Strategy: Attach ResizeObserver to canvas parent container.
- Mobile GPU Budget: If window.innerWidth < 768px, cap pixelRatio to 1.5 and reduce geometry density by 40%.
- Touch Support: Handle touchmove and touchstart for mobile parity.

### 15. GPU LIFECYCLE, THROTTLING & BATTERY CONSERVATION
- Off-Screen Pausing: Wrap render loop in an IntersectionObserver to cancelAnimationFrame when scrolled out of view.
- Tab Visibility: Listen for document.visibilitychange to halt rendering when the browser tab is hidden.
- Frame Budget: Target rock-solid 60 FPS on integrated laptop GPUs (${targetPerf}).

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
  }, [selectedVisual, customProps, targetFramework, targetPlacement, targetPerf]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    onCopyToast(`Detailed AI Build Prompt for "${selectedVisual.name}" copied to clipboard!`);
  };

  const handleExportMarkdown = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `promptdock-${selectedVisual.id}-build-prompt.md`;
    link.click();
    URL.revokeObjectURL(url);
    onCopyToast(`Exported markdown file: promptdock-${selectedVisual.id}-build-prompt.md`);
  };

  return (
    <section id="prompt-generator" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
          AI Code Agent Bridge
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Detailed AI Build Prompt Studio
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl font-light">
          Generates an exhaustive 18-point engineering brief. Every custom parameter tweaked in the 3D Inspector is preserved and directly incorporated below.
        </p>
      </div>

      {/* Active Configuration Summary Bar */}
      <div id="config-summary-bar" className="p-4 rounded-xl bg-slate-900/80 border border-teal-500/30 backdrop-blur-md mb-8 flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span className="text-teal-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Active Settings Transferred:
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Effect: <strong className="text-white">{selectedVisual.name}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1">
            Color: <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: customProps.color || '#5eead4' }} />
            <strong className="text-white uppercase">{customProps.color || '#5eead4'}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Speed: <strong className="text-white">{(customProps.speed || 1.0).toFixed(1)}x</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Density: <strong className="text-white">{customProps.density || 1600} pts</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Glow: <strong className="text-white">{(customProps.glow || 1.2).toFixed(1)}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Cam: <strong className="text-white">{(customProps.cam || 5.0).toFixed(1)}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
            Wireframe: <strong className="text-white">{customProps.wireframe ? 'ON' : 'OFF'}</strong>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors shadow-[0_0_15px_rgba(94,234,212,0.3)] flex items-center gap-1.5 ml-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy 18-Point Prompt
        </button>
      </div>

      {/* Target Engineering Options Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Framework</label>
          <select
            value={targetFramework}
            onChange={(e) => setTargetFramework(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="Next.js 15 (App Router) + React Three Fiber">Next.js 15 + React Three Fiber</option>
            <option value="Vanilla HTML5 + Three.js r128 (Zero Build)">Vanilla HTML5 + Three.js r128</option>
            <option value="Vite + React + TypeScript + Three.js">Vite + React + TypeScript</option>
            <option value="Pure WebGL 2.0 / Custom Shaders">Pure WebGL 2.0 Shaders</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Target Placement</label>
          <select
            value={targetPlacement}
            onChange={(e) => setTargetPlacement(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="Hero Section (Split-Screen / Full Width)">Hero Section (Split-Screen)</option>
            <option value="Background Atmospheric Canvas (Full Viewport)">Background Atmospheric Canvas</option>
            <option value="Interactive Component Viewport / Bento Card">Interactive Bento Card</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Performance Profile</label>
          <select
            value={targetPerf}
            onChange={(e) => setTargetPerf(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
          >
            <option value="Lightweight (Integrated GPU, 60 FPS)">Lightweight (Integrated GPU, 60 FPS)</option>
            <option value="Standard Laptop GPU Profile">Standard Laptop GPU Profile</option>
            <option value="High-Performance Workstation GPU Profile">High-Performance Workstation GPU</option>
          </select>
        </div>
      </div>

      {/* Generated Prompt Output Box */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500/60" />
            <span>Generated AI Implementation Brief (18 Explicit Specifications)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700 transition-colors"
            >
              Export .MD
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-500/40 font-mono text-xs hover:bg-teal-500/30 transition-colors flex items-center gap-1"
            >
              Copy Prompt
            </button>
          </div>
        </div>

        <pre
          id="prompt-display"
          className="p-6 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[520px] scrollbar-thin scrollbar-thumb-slate-700"
        >
          {generatedPrompt}
        </pre>
      </div>
    </section>
  );
};
