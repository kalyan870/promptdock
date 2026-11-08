import React, { useState, useMemo } from 'react';
import { VISUALS, VisualItem } from '../../data/visuals';

interface VisualComposerProps {
  onCopyToast: (message: string) => void;
}

export const VisualComposerSection: React.FC<VisualComposerProps> = ({ onCopyToast }) => {
  const [primaryId, setPrimaryId] = useState<string>('aurora-hero');
  const [secondaryId, setSecondaryId] = useState<string>('particle-galaxy');

  const primary = useMemo(() => VISUALS.find((v) => v.id === primaryId) || VISUALS[0], [primaryId]);
  const secondary = useMemo(() => VISUALS.find((v) => v.id === secondaryId) || VISUALS[1], [secondaryId]);

  const combinedPrompt = useMemo(() => {
    return `// ============================================================================
// PROMPTDOCK 7.2 COMBINED 3D VISUALS MULTI-EFFECT PROMPT
// Primary Effect: "${primary.name}" (${primary.sceneType})
// Atmospheric Background: "${secondary.name}" (${secondary.sceneType})
// ============================================================================

Act as a Principal Creative Frontend Architect and Senior Three.js Engineer.

Implement a unified, cohesive dual-layer 3D WebGL experience combining two complementary visual effects into a single high-performance canvas.

### 1. DUAL-EFFECT ARCHITECTURE
- Primary Foreground Anchor: "${primary.name}"
  * Scene Architecture: ${primary.sceneType}
  * Role: Interactive central hero element reacting to mouse pointer coordinates.
- Secondary Atmospheric Background: "${secondary.name}"
  * Scene Architecture: ${secondary.sceneType}
  * Role: Ambient particle/field layer providing spatial depth behind the primary anchor.

### 2. UNIFIED RENDER LOOP & GPU THREAD HARMONIZATION
- CRITICAL PERFORMANCE RULE: Do NOT instantiate two separate WebGLRenderer instances.
- Combine both geometries into a single THREE.Scene under two distinct groups:
  * const foregroundGroup = new THREE.Group();
  * const backgroundGroup = new THREE.Group();
  * scene.add(backgroundGroup);
  * scene.add(foregroundGroup);
- Render both groups within a SINGLE requestAnimationFrame render loop to eliminate thread contention and battery drain.

### 3. HARMONIZED LIGHTING & SPECULAR CONTINUITY
- Unified Ambient Light: THREE.AmbientLight(0xffffff, 0.5) illuminating both layers consistently.
- Shared Key Directional Light: THREE.DirectionalLight(0xffffff, 1.2) at vector (5, 8, 5).
- Shared Rim Light: THREE.DirectionalLight(${primary.defaultProps.color || '#5eead4'}, 1.0) at vector (-5, -5, -5).

### 4. Z-INDEX & CAMERA DEPTH SEPARATION
- Camera FOV: 55 degrees, position = (0, 0, 7.5).
- Background Group Z-Position: -4.0 units with low opacity (0.45) so it enhances rather than distracts.
- Foreground Group Z-Position: 0.0 units with crisp specular reflections.

### 5. RESOURCE DISPOSAL & LIFECYCLE
- Bind to a single ResizeObserver.
- On teardown, traverse both groups and cleanly dispose all geometries, materials, and textures.
`;
  }, [primary, secondary]);

  const handleCopy = () => {
    navigator.clipboard.writeText(combinedPrompt);
    onCopyToast(`Combined 3D Prompt for "${primary.name} + ${secondary.name}" copied!`);
  };

  return (
    <section id="combine-visuals" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
          Multi-Effect Synthesis Studio
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Combine 3D Visuals Studio
        </h2>
        <p className="text-sm text-slate-400 mt-2 max-w-2xl font-light">
          Fuse two complementary WebGL effects into a coordinated experience sharing a single render loop, harmonized lighting, and optimized GPU memory budget.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Primary Anchor Selector */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <label className="block text-xs font-mono text-teal-400 uppercase tracking-wider mb-2">
            Primary Foreground Anchor
          </label>
          <select
            value={primaryId}
            onChange={(e) => setPrimaryId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-teal-500"
          >
            {VISUALS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.cat})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2 font-light">
            {primary.desc}
          </p>
        </div>

        {/* Secondary Background Selector */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <label className="block text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            Secondary Atmospheric Layer
          </label>
          <select
            value={secondaryId}
            onChange={(e) => setSecondaryId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
          >
            {VISUALS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.cat})
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-2 font-light">
            {secondary.desc}
          </p>
        </div>
      </div>

      {/* Combined Prompt Output */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/50">
          <span className="text-xs font-mono text-slate-400">
            Coordinated Multi-Effect Implementation Prompt
          </span>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono text-xs hover:bg-indigo-500/30 transition-colors"
          >
            Copy Combined Prompt
          </button>
        </div>
        <pre
          id="combination-output"
          className="p-6 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[380px] scrollbar-thin scrollbar-thumb-slate-700"
        >
          {combinedPrompt}
        </pre>
      </div>
    </section>
  );
};
