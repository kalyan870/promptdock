import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VisualItem, VisualProps } from '../../data/visuals';
import { SceneFactory } from '../../engine/scene-factory';

interface InspectorProps {
  selectedVisual: VisualItem;
  customProps: VisualProps;
  onChangeProps: (newProps: VisualProps) => void;
  onNavigateToPrompt: () => void;
}

export const InspectorSection: React.FC<InspectorProps> = ({
  selectedVisual,
  customProps,
  onChangeProps,
  onNavigateToPrompt
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fps, setFps] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  // Three.js internal references
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    group: THREE.Group;
    animId: number | null;
    isDragging: boolean;
    prevMouse: { x: number; y: number };
  } | null>(null);

  // Initialize Three.js scene once
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x060911);

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(0, 0, customProps.cam || 5.0);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Lighting Setup
      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambient);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(5, 8, 5);
      scene.add(dirLight);

      const backLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
      backLight.position.set(-5, -5, -5);
      scene.add(backLight);

      const group = new THREE.Group();
      scene.add(group);

      threeRef.current = {
        scene,
        camera,
        renderer,
        group,
        animId: null,
        isDragging: false,
        prevMouse: { x: 0, y: 0 }
      };

      // Orbit Drag Handlers
      const onMouseDown = (e: MouseEvent) => {
        if (!threeRef.current) return;
        threeRef.current.isDragging = true;
        threeRef.current.prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!threeRef.current || !threeRef.current.isDragging) return;
        const dx = e.clientX - threeRef.current.prevMouse.x;
        const dy = e.clientY - threeRef.current.prevMouse.y;
        threeRef.current.group.rotation.y += dx * 0.008;
        threeRef.current.group.rotation.x += dy * 0.008;
        threeRef.current.prevMouse = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        if (threeRef.current) threeRef.current.isDragging = false;
      };

      // Touch Orbit Handlers for Mobile Devices
      const onTouchStart = (e: TouchEvent) => {
        if (!threeRef.current || e.touches.length === 0) return;
        threeRef.current.isDragging = true;
        threeRef.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const onTouchMove = (e: TouchEvent) => {
        if (!threeRef.current || !threeRef.current.isDragging || e.touches.length === 0) return;
        const dx = e.touches[0].clientX - threeRef.current.prevMouse.x;
        const dy = e.touches[0].clientY - threeRef.current.prevMouse.y;
        threeRef.current.group.rotation.y += dx * 0.008;
        threeRef.current.group.rotation.x += dy * 0.008;
        threeRef.current.prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      };

      const onTouchEnd = () => {
        if (threeRef.current) threeRef.current.isDragging = false;
      };

      const canvas = canvasRef.current;
      canvas.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      canvas.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onTouchEnd);

      // Render Loop with Real-Time FPS Calculation
      let lastTime = performance.now();
      let frameCount = 0;
      let lastFpsUpdate = performance.now();

      const animate = () => {
        threeRef.current!.animId = requestAnimationFrame(animate);
        const now = performance.now();
        frameCount++;

        if (now - lastFpsUpdate >= 500) {
          const calculatedFps = Math.round((frameCount * 1000) / (now - lastFpsUpdate));
          setFps(calculatedFps);
          frameCount = 0;
          lastFpsUpdate = now;
        }

        const delta = (now - lastTime) * 0.001;
        lastTime = now;

        if (isPlaying && threeRef.current?.group) {
          const customUpdate = (threeRef.current.group as any)._customUpdate;
          if (typeof customUpdate === 'function') {
            customUpdate(now * 0.001);
          } else {
            // Default continuous idle rotation if no custom update hook
            threeRef.current.group.rotation.y += delta * (customProps.speed || 1.0) * 0.5;
          }
        }

        renderer.render(scene, camera);
      };
      animate();

      // Resize Observer
      const resizeObserver = new ResizeObserver(() => {
        if (!containerRef.current || !threeRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        if (threeRef.current?.animId) cancelAnimationFrame(threeRef.current.animId);
        canvas.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
        resizeObserver.disconnect();
        SceneFactory.cleanGroup(group);
        renderer.dispose();
      };
    } catch (err) {
      console.error('WebGL Initialization Failed:', err);
      setWebglSupported(false);
    }
  }, []);

  // Whenever selectedVisual or customProps change, re-create the scene in the group
  useEffect(() => {
    if (!threeRef.current || !webglSupported) return;
    const { group, camera } = threeRef.current;

    // Update camera distance
    if (camera) {
      camera.position.z = customProps.cam || 5.0;
    }

    // Call SceneFactory to build the explicit 3D scene
    SceneFactory.createScene(selectedVisual.sceneType, group, customProps);
  }, [selectedVisual, customProps, webglSupported]);

  // Handle individual control updates
  const handlePropChange = (key: keyof VisualProps, value: any) => {
    onChangeProps({
      ...customProps,
      [key]: value
    });
  };

  const handleResetView = () => {
    if (threeRef.current) {
      threeRef.current.group.rotation.set(0, 0, 0);
      threeRef.current.camera.position.set(0, 0, selectedVisual.defaultProps.cam || 5.0);
    }
    onChangeProps({ ...selectedVisual.defaultProps });
  };

  return (
    <section id="inspector" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
            Real-Time WebGL 2.0 Viewport
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Interactive 3D Visual Inspector
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl font-light">
            Live procedural rendering sandbox. Adjust parameters in real time—the 3D geometry responds instantly and passes your active configuration into the AI prompt generator.
          </p>
        </div>

        {/* Live FPS Telemetry Pill */}
        <div id="fps-display" className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-teal-500/30 text-teal-300 font-mono text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(94,234,212,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{fps} FPS • WebGL 2.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D WebGL Canvas Viewport */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div
            ref={containerRef}
            className="w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative shadow-2xl group"
          >
            {webglSupported ? (
              <canvas ref={canvasRef} id="inspector-canvas" className="w-full h-full block cursor-grab active:cursor-grabbing" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-slate-900">
                <svg className="w-12 h-12 text-amber-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h4 className="text-lg font-bold text-white mb-1">WebGL 2.0 Hardware Acceleration Unavailable</h4>
                <p className="text-sm text-slate-400 max-w-md">
                  Your browser does not have WebGL enabled. You can still customize parameters and generate prompts below.
                </p>
              </div>
            )}

            {/* Overlay Viewport Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-xs font-mono text-teal-300 backdrop-blur-md">
                {selectedVisual.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-950/60 text-[10px] font-mono text-slate-400 backdrop-blur-md">
                Scene: {selectedVisual.sceneType}
              </span>
            </div>

            {/* Viewport Overlay Controls (Bottom Right) */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-white hover:bg-slate-800 backdrop-blur-md transition-colors"
                title={isPlaying ? 'Pause Animation' : 'Resume Animation'}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>

              <button
                onClick={handleResetView}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-colors"
                title="Reset Camera & Parameters"
              >
                ↺ Reset View
              </button>

              <button
                onClick={() => {
                  if (!containerRef.current) return;
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    containerRef.current.requestFullscreen?.();
                  }
                }}
                className="p-2 rounded-lg bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-colors"
                title="Toggle Fullscreen 3D View"
              >
                ⛶ Fullscreen
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-2">
            <span>Drag canvas to orbit 3D camera</span>
            <span>Framework: {selectedVisual.tech}</span>
          </div>
        </div>

        {/* Right: Inspector Parameter Controls Panel */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 backdrop-blur-md space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Scene Parameters</span>
              <span className="text-xs font-mono text-teal-400">{selectedVisual.sceneType}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1 font-light">
              Modifications immediately update the 3D scene and pass to the AI Prompt Generator.
            </p>
          </div>

          {/* Color Control */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label htmlFor="color-picker" className="font-medium text-slate-300">Accent Color</label>
              <span className="font-mono text-slate-400 uppercase">{customProps.color || '#5eead4'}</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="color-picker"
                value={customProps.color || '#5eead4'}
                onChange={(e) => handlePropChange('color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-slate-950 border border-slate-700"
              />
              <div className="flex gap-1.5 flex-1">
                {['#5eead4', '#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#10b981'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePropChange('color', preset)}
                    className="w-6 h-6 rounded-md border border-slate-700 hover:scale-110 transition-transform"
                    style={{ backgroundColor: preset }}
                    title={preset}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Speed Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label htmlFor="speed-slider" className="font-medium text-slate-300">Animation Velocity</label>
              <span className="font-mono text-slate-400">{(customProps.speed || 1.0).toFixed(1)}x</span>
            </div>
            <input
              type="range"
              id="speed-slider"
              min="0.2"
              max="3.0"
              step="0.1"
              value={customProps.speed || 1.0}
              onChange={(e) => handlePropChange('speed', parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Density Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label htmlFor="density-slider" className="font-medium text-slate-300">Density / Vertex Count</label>
              <span className="font-mono text-slate-400">{customProps.density || 1600} pts</span>
            </div>
            <input
              type="range"
              id="density-slider"
              min="400"
              max="4000"
              step="200"
              value={customProps.density || 1600}
              onChange={(e) => handlePropChange('density', parseInt(e.target.value, 10))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Glow / Emissive Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label htmlFor="glow-slider" className="font-medium text-slate-300">Glow & Specular Intensity</label>
              <span className="font-mono text-slate-400">{(customProps.glow || 1.2).toFixed(1)}</span>
            </div>
            <input
              type="range"
              id="glow-slider"
              min="0.2"
              max="2.5"
              step="0.1"
              value={customProps.glow || 1.2}
              onChange={(e) => handlePropChange('glow', parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Camera Distance Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <label htmlFor="cam-slider" className="font-medium text-slate-300">Camera Zoom Distance</label>
              <span className="font-mono text-slate-400">{(customProps.cam || 5.0).toFixed(1)}</span>
            </div>
            <input
              type="range"
              id="cam-slider"
              min="2.5"
              max="10.0"
              step="0.5"
              value={customProps.cam || 5.0}
              onChange={(e) => handlePropChange('cam', parseFloat(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Wireframe Toggle */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs font-medium text-slate-300">Wireframe Shading</span>
            <button
              id="wireframe-toggle"
              onClick={() => handlePropChange('wireframe', !customProps.wireframe)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                customProps.wireframe
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {customProps.wireframe ? 'ON (Wireframe)' : 'OFF (Solid)'}
            </button>
          </div>

          {/* Action CTA: Move to Prompt Generator */}
          <div className="pt-4 border-t border-slate-800">
            <a
              href="#prompt-generator"
              onClick={onNavigateToPrompt}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-sky-500 text-slate-950 font-semibold text-xs flex items-center justify-center gap-2 hover:from-teal-300 hover:to-sky-400 transition-all shadow-[0_0_20px_rgba(94,234,212,0.25)]"
            >
              <span>Generate AI Build Prompt with these Settings</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
