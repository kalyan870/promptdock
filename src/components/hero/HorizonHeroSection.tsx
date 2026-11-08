/**
 * Horizon Hero Section — 21st.dev Integration
 * 
 * Component: Horizon Hero Section
 * Author: Scott Clayton (@lovesickfromthe6ix)
 * Source: https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section
 * License: MIT License (Scott Clayton)
 * 
 * Adapted for PromptDock 7.2:
 * Left side: PromptDock 7.2 branding, typography, CTAs, and AI assistant badges
 * Right side: Scott Clayton's authentic interactive 3D WebGL Horizon experience
 * featuring procedural mountains, atmospheric glow, animated nebula, and starfields.
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export const HorizonHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060b, 0.00028);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 2500);
    camera.position.set(0, 25, 120);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const state: {
      stars: THREE.Points[];
      mountains: THREE.Mesh[];
      nebula: THREE.Mesh | null;
      atmosphere: THREE.Mesh | null;
      animId: number | null;
      targetCam: { x: number; y: number; z: number };
      curCam: { x: number; y: number; z: number };
    } = {
      stars: [],
      mountains: [],
      nebula: null,
      atmosphere: null,
      animId: null,
      targetCam: { x: 0, y: 25, z: 120 },
      curCam: { x: 0, y: 25, z: 120 }
    };

    // 2. Stars Creation (3 Multi-Depth Twinkling Star Layers)
    const starCount = 3500;
    for (let layer = 0; layer < 3; layer++) {
      const geom = new THREE.BufferGeometry();
      const pos = new Float32Array(starCount * 3);
      const phases = new Float32Array(starCount);

      for (let i = 0; i < starCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 2200;
        pos[i * 3 + 1] = 50 + Math.random() * 800;
        pos[i * 3 + 2] = -300 - Math.random() * 1200;
        phases[i] = Math.random() * Math.PI * 2;
      }

      geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geom.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

      const starMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(layer === 0 ? 0x5eead4 : layer === 1 ? 0x818cf8 : 0xffffff) }
        },
        vertexShader: `
          attribute float phase;
          uniform float time;
          varying float vTwinkle;
          void main() {
            vTwinkle = sin(time * 2.0 + phase) * 0.4 + 0.6;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = (1.5 + float(${layer}) * 0.8) * (300.0 / -mvPosition.z) * vTwinkle;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          varying float vTwinkle;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float alpha = (1.0 - dist * 2.0) * vTwinkle;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const points = new THREE.Points(geom, starMat);
      scene.add(points);
      state.stars.push(points);
    }

    // 3. Procedural Nebula Plane (Elevation Sine Wave Math)
    const nebulaGeom = new THREE.PlaneGeometry(3500, 1800, 80, 80);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0f172a) },
        color2: { value: new THREE.Color(0x06b6d4) },
        color3: { value: new THREE.Color(0x8b5cf6) },
        opacity: { value: 0.35 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elev = sin(pos.x * 0.003 + time * 0.3) * cos(pos.y * 0.003 + time * 0.2) * 45.0;
          pos.z += elev;
          vElevation = elev;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mix1 = sin(vUv.x * 6.0 + time * 0.2) * 0.5 + 0.5;
          float mix2 = cos(vUv.y * 6.0 + time * 0.15) * 0.5 + 0.5;
          vec3 mixed = mix(color1, color2, mix1);
          mixed = mix(mixed, color3, mix2 * 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.8);
          gl_FragColor = vec4(mixed, max(0.0, alpha));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const nebula = new THREE.Mesh(nebulaGeom, nebulaMat);
    nebula.position.set(0, 200, -900);
    scene.add(nebula);
    state.nebula = nebula;

    // 4. Procedural Mountains (4 Depth Layers with Atmospheric Gradient)
    const mountainConfigs = [
      { distance: -60, height: 50, color: 0x070b13, opacity: 1.0 },
      { distance: -120, height: 75, color: 0x09111e, opacity: 0.85 },
      { distance: -180, height: 100, color: 0x0b172a, opacity: 0.65 },
      { distance: -250, height: 130, color: 0x0e1f38, opacity: 0.45 }
    ];

    mountainConfigs.forEach((cfg, idx) => {
      const shapePoints: THREE.Vector2[] = [];
      const steps = 60;
      for (let s = 0; s <= steps; s++) {
        const x = (s / steps - 0.5) * 1200;
        const y = Math.sin(s * 0.18 + idx * 0.5) * cfg.height +
                  Math.sin(s * 0.08) * (cfg.height * 0.4) +
                  Math.cos(s * 0.3) * 8 - 40;
        shapePoints.push(new THREE.Vector2(x, y));
      }
      shapePoints.push(new THREE.Vector2(2000, -300));
      shapePoints.push(new THREE.Vector2(-2000, -300));

      const shape = new THREE.Shape(shapePoints);
      const mGeom = new THREE.ShapeGeometry(shape);
      const mMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        side: THREE.DoubleSide
      });
      const mountain = new THREE.Mesh(mGeom, mMat);
      mountain.position.set(0, cfg.distance * 0.2, cfg.distance);
      mountain.userData = { baseZ: cfg.distance, index: idx };
      scene.add(mountain);
      state.mountains.push(mountain);
    });

    // 5. Atmosphere Glow Sphere (Fresnel Rim Lighting)
    const atmoGeom = new THREE.SphereGeometry(450, 32, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          vec3 glow = vec3(0.2, 0.7, 0.9) * intensity;
          float pulse = sin(time * 1.5) * 0.1 + 0.9;
          gl_FragColor = vec4(glow * pulse, intensity * 0.3);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    const atmosphere = new THREE.Mesh(atmoGeom, atmoMat);
    atmosphere.position.set(0, 100, -600);
    scene.add(atmosphere);
    state.atmosphere = atmosphere;

    // 6. Interactive Cursor Parallax Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      setMousePos({ x, y });
      state.targetCam.x = x * 25;
      state.targetCam.y = 25 + y * 15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Scroll Listener for 3D Camera Depth Progression
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 800;
      const prog = Math.min(scrollY / maxScroll, 1.0);
      state.targetCam.z = 120 - prog * 60;
      state.mountains.forEach((m, idx) => {
        m.position.y = (m.userData.baseZ * 0.2) + prog * (idx + 1) * 8;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 8. Render & Animation Loop
    let lastTime = performance.now();
    const render = () => {
      state.animId = requestAnimationFrame(render);
      const now = performance.now();
      const time = now * 0.001;

      // Update Star Twinkles
      state.stars.forEach((s) => {
        if ((s.material as THREE.ShaderMaterial).uniforms) {
          (s.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      // Update Nebula Waves
      if (state.nebula && (state.nebula.material as THREE.ShaderMaterial).uniforms) {
        (state.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      // Update Atmosphere Pulse
      if (state.atmosphere && (state.atmosphere.material as THREE.ShaderMaterial).uniforms) {
        (state.atmosphere.material as THREE.ShaderMaterial).uniforms.time.value = time;
      }

      // Smooth Camera Lerp
      state.curCam.x += (state.targetCam.x - state.curCam.x) * 0.06;
      state.curCam.y += (state.targetCam.y - state.curCam.y) * 0.06;
      state.curCam.z += (state.targetCam.z - state.curCam.z) * 0.06;

      const idleX = Math.sin(time * 0.4) * 2.0;
      const idleY = Math.cos(time * 0.3) * 1.0;
      camera.position.set(state.curCam.x + idleX, state.curCam.y + idleY, state.curCam.z);
      camera.lookAt(0, 40, -400);

      // Subtle Mountain Sway
      state.mountains.forEach((m, idx) => {
        const factor = 1 + idx * 0.4;
        m.position.x = Math.sin(time * 0.3 * factor) * 3;
      });

      renderer.render(scene, camera);
    };
    render();

    // 9. Resize Observer
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 10. GSAP Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (contentRef.current) {
      tl.fromTo(contentRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.2 });
    }

    // Cleanup
    return () => {
      if (state.animId) cancelAnimationFrame(state.animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      state.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      state.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      if (state.nebula) {
        state.nebula.geometry.dispose();
        (state.nebula.material as THREE.Material).dispose();
      }
      if (state.atmosphere) {
        state.atmosphere.geometry.dispose();
        (state.atmosphere.material as THREE.Material).dispose();
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-[92vh] flex items-center justify-between overflow-hidden bg-[#04060b] border-b border-slate-800/80">
      {/* 3D WebGL Canvas Layer (Scott Clayton Horizon Hero Engine) */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} id="hero-canvas" className="w-full h-full block" />
      </div>

      {/* Atmospheric Vignette Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#04060b] via-[#04060b]/60 to-transparent pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#04060b] to-transparent pointer-events-none z-[1]" />

      {/* Hero Content (PromptDock 7.2 Studio Identity) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Branding, Tagline, CTAs */}
        <div ref={contentRef} className="lg:col-span-7 space-y-6">
          {/* Release Badge with 21st.dev Attribution */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 backdrop-blur-md text-xs font-mono text-teal-300 shadow-[0_0_20px_rgba(94,234,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>PromptDock 7.2 • Powered by 21st.dev & Three.js</span>
          </div>

          {/* Main Headline */}
          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-400 to-indigo-400">next dimension</span> of web design.
          </h1>

          {/* Subtitle / Core Tagline */}
          <p ref={subtitleRef} className="text-lg sm:text-xl text-slate-300 font-light max-w-2xl leading-relaxed">
            &ldquo;Discover the visual. Copy the prompt. Build it with AI.&rdquo;
            <span className="block mt-2 text-sm text-slate-400">
              A curated 3D Website Visual Prompt Studio engineered for modern AI coding assistants. Discover 30 production WebGL effects, preview in real time, tweak parameters, and generate exhaustive 18-point implementation prompts.
            </span>
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#gallery"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-400 to-sky-500 text-slate-950 font-semibold text-sm hover:from-teal-300 hover:to-sky-400 shadow-[0_0_30px_rgba(94,234,212,0.35)] transition-all duration-200 active:scale-95"
            >
              Explore 3D Visuals
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <a
              href="#prompt-generator"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900/90 text-slate-200 font-medium text-sm border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 backdrop-blur-md active:scale-95"
            >
              Create a Prompt
              <svg className="w-4 h-4 ml-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </a>

            <a
              href="#combine-visuals"
              className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-slate-900/50 text-indigo-300 font-medium text-sm border border-indigo-500/30 hover:bg-indigo-950/40 hover:border-indigo-500/50 transition-all duration-200 backdrop-blur-md"
            >
              Combine 3D Effects
            </a>
          </div>

          {/* Supported AI Coding Assistants Strip */}
          <div className="pt-6 border-t border-slate-800/60">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Engineered for all leading AI coding assistants:
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              {['Google Antigravity', 'Claude Code', 'Cursor', 'OpenAI Codex', 'ChatGPT', 'Gemini', 'Windsurf'].map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md bg-slate-900/70 border border-slate-800 text-slate-300 hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Horizon Hero Card & 21st.dev Attribution Notice */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all duration-500" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-teal-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                Live 3D Horizon Experience
              </span>
              <span className="text-xs font-mono text-slate-400">Three.js + GSAP</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Horizon Hero Section
            </h3>
            <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
              Original 21st.dev component by <strong className="text-white">Scott Clayton</strong> (<code className="text-xs text-sky-400">@lovesickfromthe6ix</code>). Featuring real-time procedural mountain geometry, atmospheric rim lighting, wave displacement nebula, and cursor parallax.
            </p>

            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 space-y-1.5 mb-4">
              <div className="flex justify-between">
                <span>Component:</span>
                <span className="text-teal-300">Horizon Hero Section</span>
              </div>
              <div className="flex justify-between">
                <span>License:</span>
                <span className="text-emerald-400">MIT License</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <a href="https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
                  21st.dev Community
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Scroll or move cursor to interact</span>
              <a
                href="#inspector"
                className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1"
              >
                Inspect Visuals &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
