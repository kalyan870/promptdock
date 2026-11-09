import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#020408] border-t border-slate-800/80 py-12 px-6 sm:px-8 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center font-bold text-slate-950 text-xs">
              PD
            </div>
            <span className="text-lg font-bold text-white">PromptDock 8.0</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm font-light leading-relaxed">
            &ldquo;See the visual. Copy the prompt. Build the experience.&rdquo; A curated 3D visual prompt library turning exceptional web effects into ready-to-use AI website-building instructions.
          </p>
          <div className="text-[11px] font-mono text-slate-500 pt-2">
            3D Hero Section adapted from <a href="https://21st.dev/@lovesickfromthe6ix/components/horizon-hero-section" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">Scott Clayton</a> under MIT License.
          </div>
        </div>

        {/* Studio Sections */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
            Studio Sections
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#hero" className="hover:text-teal-300 transition-colors">3D Horizon Hero</a></li>
            <li><a href="#workflow" className="hover:text-teal-300 transition-colors">5-Step Visual Loop</a></li>
            <li><a href="#gallery" className="hover:text-teal-300 transition-colors">Discovery Gallery (30)</a></li>
            <li><a href="#inspector" className="hover:text-teal-300 transition-colors">Interactive 3D Inspector</a></li>
            <li><a href="#prompt-generator" className="hover:text-teal-300 transition-colors">Detailed AI Prompt Studio</a></li>
            <li><a href="#combine-visuals" className="hover:text-teal-300 transition-colors">Combine 3D Visuals</a></li>
          </ul>
        </div>

        {/* Ecosystem & Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
            Ecosystem
          </h4>
          <ul className="space-y-2 text-xs">
            <li><a href="https://github.com/kalyan870/promptdock" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">GitHub Repository</a></li>
            <li><a href="https://promptdock-eight.vercel.app" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">Live Production Web</a></li>
            <li><a href="https://21st.dev" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">21st.dev Community</a></li>
            <li><a href="https://threejs.org" target="_blank" rel="noreferrer" className="hover:text-teal-300 transition-colors">Three.js Engine</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
        <span>&copy; 2026 PromptDock. MIT Licensed Open Source.</span>
        <span>Version 7.2.0 • Built with React 19, Three.js & Vite</span>
      </div>
    </footer>
  );
};
