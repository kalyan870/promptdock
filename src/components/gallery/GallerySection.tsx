import React, { useState, useMemo } from 'react';
import { VISUALS, CATEGORIES, type VisualItem } from '../../data/visuals.ts';

interface GalleryProps {
  onSelectVisual: (visual: VisualItem) => void;
  onCopyPrompt: (visual: VisualItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const GallerySection: React.FC<GalleryProps> = ({
  onSelectVisual,
  onCopyPrompt,
  favorites,
  onToggleFavorite
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Visuals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedPerf, setSelectedPerf] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'bento' | 'grid'>('bento');

  // Filtered visuals
  const filteredVisuals = useMemo(() => {
    return VISUALS.filter((v) => {
      // Category filter
      if (selectedCategory !== 'All Visuals' && v.cat !== selectedCategory) {
        return false;
      }
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(v.id)) {
        return false;
      }
      // Tech filter
      if (selectedTech !== 'all' && !v.tech.toLowerCase().includes(selectedTech.toLowerCase())) {
        return false;
      }
      // Perf filter
      if (selectedPerf !== 'all' && v.perfTier.toLowerCase() !== selectedPerf.toLowerCase()) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesDesc = v.desc.toLowerCase().includes(q);
        const matchesTech = v.tech.toLowerCase().includes(q);
        const matchesCat = v.cat.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTech && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedTech, selectedPerf, showFavoritesOnly, favorites]);

  // Featured visual IDs for bento highlighting
  const featuredIds = ['aurora-hero', 'liquid-chrome', 'particle-vortex', 'chrono-turntable', 'thinking-orb'];

  return (
    <section id="gallery" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80 relative">
      {/* Background Section Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-500/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 blur-[140px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-teal-500/30 text-xs font-mono text-teal-400 shadow-[0_0_15px_rgba(94,234,212,0.15)] mb-3">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>Curated Visual Catalog ({VISUALS.length} Dedicated Effects)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            3D Visual Discovery Gallery
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-2xl font-light leading-relaxed">
            Discover production-tested Three.js WebGL effects across 8 creative disciplines. Inspect live geometry in the 3D Inspector or copy the locked 18-point AI prompt.
          </p>
        </div>

        {/* Search Bar & View Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 30 WebGL effects..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/80 transition-colors shadow-inner font-mono text-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setViewMode('bento')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'bento' ? 'bg-slate-800 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Bento Showcase Layout"
            >
              Bento
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'grid' ? 'bg-slate-800 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'
              }`}
              title="Standard Grid Layout"
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 mb-10 relative z-10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-teal-500/20 to-sky-500/20 text-teal-300 border border-teal-500/50 shadow-[0_0_20px_rgba(94,234,212,0.2)] font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Dropdowns & Favorites Toggle */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <select
            id="tech-filter"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500/50 font-mono"
          >
            <option value="all">All Tech Stacks</option>
            <option value="Three.js">Three.js</option>
            <option value="Shader">Custom GLSL Shader</option>
            <option value="Physics">Physics & Springs</option>
            <option value="Points">Points / Particles</option>
          </select>

          <select
            id="perf-filter"
            value={selectedPerf}
            onChange={(e) => setSelectedPerf(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500/50 font-mono"
          >
            <option value="all">All GPU Profiles</option>
            <option value="low">Low (Integrated GPU)</option>
            <option value="medium">Medium (Standard GPU)</option>
            <option value="high">High (Discrete GPU)</option>
          </select>

          <button
            id="fav-filter-toggle"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
              showFavoritesOnly
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favorites ({favorites.length})
          </button>

          <span className="text-xs text-slate-400 ml-auto font-mono">
            Showing <strong className="text-teal-400">{filteredVisuals.length}</strong> of {VISUALS.length} effects
          </span>
        </div>
      </div>

      {/* Cards Showcase: Bento Grid Layout */}
      <div
        id="visuals-cards-grid"
        className={`grid gap-6 relative z-10 ${
          viewMode === 'bento' && selectedCategory === 'All Visuals' && !searchQuery
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {filteredVisuals.map((v) => {
          const isFav = favorites.includes(v.id);
          const isFeatured = featuredIds.includes(v.id) && viewMode === 'bento' && selectedCategory === 'All Visuals' && !searchQuery;

          return (
            <div
              key={v.id}
              className={`p-5 rounded-2xl bg-slate-900/70 border transition-all duration-300 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
                isFeatured
                  ? 'md:col-span-2 lg:col-span-2 border-teal-500/40 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 shadow-[0_0_30px_rgba(94,234,212,0.12)] hover:border-teal-400'
                  : 'border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/90 shadow-lg'
              }`}
            >
              {/* Card Header & Preview Image */}
              <div>
                <div className={`relative w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800/60 flex items-center justify-center group-hover:border-teal-500/40 transition-colors ${
                  isFeatured ? 'h-56 sm:h-64' : 'h-44'
                }`}>
                  <img
                    src={v.thumb}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Favorite Button */}
                  <button
                    onClick={() => onToggleFavorite(v.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-400 hover:text-amber-400 transition-colors shadow-md"
                    title={isFav ? 'Remove Favorite' : 'Save to Favorites'}
                  >
                    <svg
                      className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : 'fill-none text-slate-400'}`}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>

                  {/* Category & Featured Badge */}
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-slate-950/90 border border-slate-800 text-[10px] font-mono text-teal-300 backdrop-blur-md">
                      {v.cat}
                    </span>
                    {isFeatured && (
                      <span className="px-2 py-0.5 rounded-lg bg-teal-400 text-slate-950 font-bold text-[9px] font-mono uppercase shadow-sm">
                        Featured Highlight
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className={`font-bold text-white group-hover:text-teal-300 transition-colors mb-1.5 ${
                  isFeatured ? 'text-xl sm:text-2xl' : 'text-lg'
                }`}>
                  {v.name}
                </h3>
                <p className={`text-xs text-slate-400 leading-relaxed font-light mb-4 ${
                  isFeatured ? 'line-clamp-3 text-sm' : 'line-clamp-2'
                }`}>
                  {v.desc}
                </p>

                {/* Technical Specifications Bar */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono mb-4 text-slate-400">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800/80">
                    {v.tech}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800/80 text-sky-400">
                    {v.perf}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800/80 text-indigo-400">
                    {v.anim}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2">
                <a
                  href="#inspector"
                  onClick={() => onSelectVisual(v)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold text-xs text-center hover:bg-teal-500/20 hover:border-teal-500/50 transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview 3D
                </a>
                <button
                  onClick={() => onCopyPrompt(v)}
                  className="py-2.5 px-3 rounded-xl bg-slate-800/90 text-slate-300 border border-slate-700/80 font-medium text-xs hover:bg-slate-700 hover:text-white transition-all flex items-center gap-1.5"
                  title="Copy 18-Point AI Implementation Prompt"
                >
                  <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy Prompt
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
