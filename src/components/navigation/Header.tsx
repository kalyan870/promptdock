import React, { useState } from 'react';

interface HeaderProps {
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#04060b]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(94,234,212,0.3)] group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-slate-950 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-teal-300 transition-colors">
              PromptDock
            </span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
              v8.0
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#workflow" className="hover:text-teal-300 transition-colors">
            Workflow
          </a>
          <a href="#gallery" className="hover:text-teal-300 transition-colors">
            Discovery Gallery
          </a>
          <a href="#inspector" className="hover:text-teal-300 transition-colors">
            3D Inspector
          </a>
          <a href="#prompt-generator" className="hover:text-teal-300 transition-colors">
            AI Prompt Studio
          </a>
          <a href="#combine-visuals" className="hover:text-teal-300 transition-colors">
            Combine Visuals
          </a>
        </nav>

        {/* Right Action Icons & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/kalyan870/promptdock"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          <a
            href="#prompt-generator"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold hover:bg-teal-500/20 transition-all"
          >
            <span>Generate Prompt</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#04060b] px-6 py-4 space-y-3">
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-300 font-medium py-1"
          >
            Workflow
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-300 font-medium py-1"
          >
            Discovery Gallery
          </a>
          <a
            href="#inspector"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-300 font-medium py-1"
          >
            3D Inspector
          </a>
          <a
            href="#prompt-generator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-300 font-medium py-1"
          >
            AI Prompt Studio
          </a>
          <a
            href="#combine-visuals"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-teal-300 font-medium py-1"
          >
            Combine Visuals
          </a>
        </div>
      )}
    </header>
  );
};
