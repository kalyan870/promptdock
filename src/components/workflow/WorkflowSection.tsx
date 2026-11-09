import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WorkflowSectionProps {
  onCopyToast?: (msg: string) => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onCopyToast }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [copiedStage4, setCopiedStage4] = useState<boolean>(false);
  const [selectedFramework, setSelectedFramework] = useState<string>('Next.js 15 (App Router) + React Three Fiber');
  const [selectedPlacement, setSelectedPlacement] = useState<string>('Hero Section (Split-Screen / Full Width)');
  const [selectedPerf, setSelectedPerf] = useState<string>('Lightweight (Integrated GPU, 60 FPS)');
  const [selectedAssistant, setSelectedAssistant] = useState<string>('Google Antigravity');
  const [previewWireframe, setPreviewWireframe] = useState<boolean>(false);
  const [previewColor, setPreviewColor] = useState<string>('#5eead4');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage2MeshRef = useRef<THREE.Mesh | null>(null);

  // Setup miniature real-time 3D canvas for Stage 02
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const width = canvas.parentElement?.clientWidth || 320;
    const height = 180;
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const geometry = new THREE.TorusKnotGeometry(1.0, 0.32, 128, 32);
    const material = new THREE.MeshStandardMaterial({
      color: previewColor,
      emissive: previewColor,
      emissiveIntensity: 0.3,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: previewWireframe
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    stage2MeshRef.current = mesh;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    pointLight.position.set(3, 4, 3);
    scene.add(pointLight);

    let animId: number;
    let time = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.015;
      mesh.rotation.x = time * 0.7;
      mesh.rotation.y = time * 0.9;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [previewColor, previewWireframe]);

  const handleStage4Copy = () => {
    const samplePrompt = `// PROMPTDOCK 8.1 LOCKED AI BUILD SPECIFICATION (18-POINT ENGINEERING BRIEF)\n// Effect: "Aurora Plasma 3D Hero" | Preset: ${selectedFramework}\n// Placement: ${selectedPlacement} | Profile: ${selectedPerf}\n\nAct as a Principal Creative Frontend Architect & Three.js Specialist.\nImplement the production-tested 3D WebGL effect into my application...`;
    navigator.clipboard.writeText(samplePrompt);
    setCopiedStage4(true);
    if (onCopyToast) {
      onCopyToast('Sample 18-point locked prompt copied to clipboard!');
    }
    setTimeout(() => setCopiedStage4(false), 2400);
  };

  const stages = [
    {
      step: '01',
      tag: 'DISCOVER',
      title: 'Discover exceptional 3D visuals',
      desc: 'Explore a curated collection of cinematic 3D website experiences, shaders, particles, materials and interactive effects.',
      accent: 'from-teal-400 to-sky-500',
      pillColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10'
    },
    {
      step: '02',
      tag: 'PREVIEW 3D',
      title: 'See every detail in 3D',
      desc: 'Inspect the actual visual experience and see how it behaves before using it in your project.',
      accent: 'from-sky-400 to-indigo-500',
      pillColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
    },
    {
      step: '03',
      tag: 'CONFIG PRESETS',
      title: 'Choose your build configuration',
      desc: 'Select the framework, website placement and performance profile. PromptDock uses these approved options to prepare the correct implementation instructions.',
      accent: 'from-indigo-400 to-purple-500',
      pillColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
    },
    {
      step: '04',
      tag: 'COPY PROMPT',
      title: 'Copy your complete AI prompt',
      desc: 'Get a professionally prepared technical prompt containing the visual specification, implementation details, dependencies, animation, responsiveness and performance rules.',
      accent: 'from-purple-400 to-pink-500',
      pillColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
    },
    {
      step: '05',
      tag: 'BUILD WITH AI',
      title: 'Build it with your preferred AI',
      desc: 'Paste your PromptDock prompt into your coding assistant and let it create the website with the selected 3D visual.',
      accent: 'from-emerald-400 to-teal-500',
      pillColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    }
  ];

  return (
    <section id="workflow" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80 relative">
      {/* Background Decorative Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-64 bg-teal-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 text-xs font-mono text-teal-400 shadow-[0_0_15px_rgba(94,234,212,0.15)] mb-3">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span>Interactive Visual Storyboard</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          From Visual Discovery to Production Website
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-3 font-light leading-relaxed">
          PromptDock is not another ordinary prompt directory. Experience the connected five-stage journey that turns exceptional 3D web effects into locked, production-ready AI building instructions.
        </p>
      </div>

      {/* Interactive Stage Selector Bar */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3 relative z-10">
        {stages.map((st, idx) => {
          const isActive = activeStage === idx;
          return (
            <button
              key={st.step}
              onClick={() => setActiveStage(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-slate-800 text-white border-teal-400 shadow-[0_0_20px_rgba(94,234,212,0.25)] scale-105'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-teal-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {st.step}
              </span>
              <span>{st.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Connected 5-Stage Storyboard Panoramic View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
        {/* Stage 01: Discover */}
        <div
          onClick={() => setActiveStage(0)}
          className={`cursor-pointer rounded-2xl p-5 bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
            activeStage === 0
              ? 'border-teal-400 ring-2 ring-teal-400/20 shadow-[0_0_30px_rgba(94,234,212,0.2)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-teal-400">STAGE 01</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Discovery</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
              {stages[0].title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {stages[0].desc}
            </p>

            {/* Stage 01 Visual Demonstration: Gallery Miniature */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 space-y-2.5 shadow-inner">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search 30 WebGL effects...</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-lg bg-slate-900/90 border border-teal-500/60 shadow-[0_0_8px_rgba(94,234,212,0.25)] relative">
                  <div className="h-10 rounded bg-gradient-to-br from-teal-500/30 to-indigo-600/30 flex items-center justify-center text-[9px] font-mono text-teal-300 font-bold">
                    Aurora 3D
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[8px] text-slate-400">
                    <span>Plasma</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  </div>
                  <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded bg-teal-400 text-slate-950 font-bold text-[7px] uppercase font-mono">
                    Focus
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                  <div className="h-10 rounded bg-gradient-to-br from-sky-500/20 to-purple-600/20 flex items-center justify-center text-[9px] font-mono text-sky-300">
                    Galaxy
                  </div>
                  <div className="flex justify-between items-center mt-1 text-[8px] text-slate-400">
                    <span>Kepler</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-teal-400">
            <span>30 Curated Visuals</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Stage 02: Preview in 3D */}
        <div
          onClick={() => setActiveStage(1)}
          className={`cursor-pointer rounded-2xl p-5 bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
            activeStage === 1
              ? 'border-sky-400 ring-2 ring-sky-400/20 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-sky-400">STAGE 02</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Interactive</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
              {stages[1].title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {stages[1].desc}
            </p>

            {/* Stage 02 Visual Demonstration: Real-time Interactive 3D Viewport */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-2 relative shadow-inner">
              <div className="w-full h-[120px] rounded-lg overflow-hidden relative bg-slate-950">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute top-1.5 left-2 px-1.5 py-0.5 rounded bg-slate-900/80 text-[8px] font-mono text-sky-300 border border-slate-800 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  60 FPS Stable
                </div>
                <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewWireframe(!previewWireframe);
                    }}
                    className={`px-1.5 py-0.5 rounded text-[8px] font-mono border ${
                      previewWireframe ? 'bg-sky-500/20 border-sky-400 text-sky-300' : 'bg-slate-900/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    Wireframe
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 px-1 text-[9px] font-mono text-slate-400">
                <span>Color:</span>
                <div className="flex items-center gap-1">
                  {['#5eead4', '#38bdf8', '#818cf8', '#f43f5e'].map((c) => (
                    <button
                      key={c}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewColor(c);
                      }}
                      className="w-3 h-3 rounded-full border border-slate-700"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-sky-400">
            <span>Real-time Three.js</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Stage 03: Select Implementation */}
        <div
          onClick={() => setActiveStage(2)}
          className={`cursor-pointer rounded-2xl p-5 bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
            activeStage === 2
              ? 'border-indigo-400 ring-2 ring-indigo-400/20 shadow-[0_0_30px_rgba(129,140,248,0.2)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-indigo-400">STAGE 03</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Preset Lock</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
              {stages[2].title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {stages[2].desc}
            </p>

            {/* Stage 03 Visual Demonstration: Controlled Presets Selector */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 space-y-2.5 shadow-inner">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Framework Preset</span>
                <div className="p-1.5 rounded bg-slate-900 border border-indigo-500/40 text-[10px] font-mono text-indigo-300 flex items-center justify-between">
                  <span>Next.js 15 + R3F</span>
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Target Placement</span>
                <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 flex items-center justify-between">
                  <span>Hero Section Split</span>
                  <span className="text-emerald-400 text-xs">✓</span>
                </div>
              </div>
              <div className="p-1 rounded bg-indigo-950/30 border border-indigo-500/20 text-[8px] font-mono text-indigo-300 text-center">
                Deterministic Configuration
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-indigo-400">
            <span>Approved Options</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Stage 04: Copy Locked Prompt */}
        <div
          onClick={() => setActiveStage(3)}
          className={`cursor-pointer rounded-2xl p-5 bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
            activeStage === 3
              ? 'border-purple-400 ring-2 ring-purple-400/20 shadow-[0_0_30px_rgba(192,132,252,0.2)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-purple-400">STAGE 04</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">18-Point Spec</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {stages[3].title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {stages[3].desc}
            </p>

            {/* Stage 04 Visual Demonstration: Read-Only Prompt Panel */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 space-y-2 shadow-inner">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80 text-[8px] font-mono text-slate-400">
                <span className="text-purple-300 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  READ-ONLY BRIEF
                </span>
                <span className="text-slate-500">18 SECTIONS</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800/60 leading-tight space-y-1">
                <div className="text-teal-300">// PROMPTDOCK 8.1 LOCKED BRIEF</div>
                <div>### 1. ROLE & OBJECTIVE</div>
                <div>### 4. WEBGL 2.0 SCENE ENGINE</div>
                <div>### 5. GEOMETRY: 1600 VERTICES</div>
                <div>### 9. KINEMATIC WAVE LOOP</div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStage4Copy();
                }}
                className={`w-full py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all flex items-center justify-center gap-1 ${
                  copiedStage4
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30'
                }`}
              >
                {copiedStage4 ? '✓ Copied Full Brief!' : 'Copy 18-Point Prompt'}
              </button>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-purple-400">
            <span>Locked & Immutable</span>
            <span>&rarr;</span>
          </div>
        </div>

        {/* Stage 05: Build with Your AI */}
        <div
          onClick={() => setActiveStage(4)}
          className={`cursor-pointer rounded-2xl p-5 bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
            activeStage === 4
              ? 'border-emerald-400 ring-2 ring-emerald-400/20 shadow-[0_0_30px_rgba(52,211,153,0.2)]'
              : 'border-slate-800/80 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400">STAGE 05</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Generated App</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
              {stages[4].title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {stages[4].desc}
            </p>

            {/* Stage 05 Visual Demonstration: AI Coding Assistant Terminal + Generated Site */}
            <div className="rounded-xl bg-slate-950/90 border border-slate-800/80 p-3 space-y-2 shadow-inner">
              <div className="flex flex-wrap gap-1 text-[8px] font-mono text-slate-300">
                {['Antigravity', 'Claude', 'Cursor', 'ChatGPT', 'Codex', 'Gemini'].map((name) => (
                  <span
                    key={name}
                    className={`px-1.5 py-0.5 rounded border ${
                      name === 'Antigravity' ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
              <div className="text-[9px] font-mono bg-slate-900 p-2 rounded border border-slate-800 text-slate-300 leading-tight space-y-0.5">
                <div className="text-emerald-400">$ promptdock brief &rarr; build</div>
                <div className="text-slate-400">&gt; Building Next.js 15 site...</div>
                <div className="text-teal-300">&gt; 3D Aurora Hero compiled</div>
                <div className="text-emerald-400 font-bold">✓ Production Ready (60 FPS)</div>
              </div>
              <div className="h-6 rounded bg-gradient-to-r from-teal-500/30 via-sky-500/30 to-indigo-500/30 border border-teal-500/40 flex items-center justify-center text-[9px] font-mono text-teal-200">
                Live Production Experience
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span>Website Generated</span>
            <span>✓</span>
          </div>
        </div>
      </div>
    </section>
  );
};
