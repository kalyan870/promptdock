import React from 'react';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover 3D Visual',
      desc: 'Browse 30 curated WebGL effects across 8 creative disciplines.',
      icon: (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      num: '02',
      title: 'Preview & Customise',
      desc: 'Inspect real-time 3D geometry, tweak colors, velocity, density & glow.',
      icon: (
        <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      num: '03',
      title: 'Generate AI Prompt',
      desc: 'Produces an exhaustive 18-point brief with active parameters preserved.',
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      num: '04',
      title: 'Copy Prompt (1-Click)',
      desc: 'Instant clipboard copy ready for immediate pasting into code agents.',
      icon: (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )
    },
    {
      num: '05',
      title: 'Build with AI Assistant',
      desc: 'Paste into Antigravity, Claude Code, Cursor, Codex, or Gemini to build.',
      icon: (
        <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section id="workflow" className="py-16 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
          The 5-Step Visual Loop
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
          From Discovery to Production in Seconds
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 font-light">
          A seamless flow designed to eliminate guessing Three.js parameters. Customize visually, generate the exact engineering prompt, and integrate directly with any modern AI coding assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {steps.map((s, idx) => (
          <div
            key={s.num}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 relative group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                  {s.icon}
                </span>
                <span className="text-xs font-mono text-slate-500 group-hover:text-teal-400 transition-colors">
                  {s.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600">
                &rarr;
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
