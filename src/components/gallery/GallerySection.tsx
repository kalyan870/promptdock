import React, { useState, useMemo } from 'react';
import { VISUALS, CATEGORIES, VisualItem } from '../../data/visuals';

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

  return (
    <section id="gallery" className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-b border-slate-800/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
            Discovery Catalog ({VISUALS.length} Curated Effects)
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            3D Visual Discovery Gallery
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl font-light">
            Explore 30 production-tested Three.js WebGL effects. Select any card to inspect its geometry in real time or generate an AI prompt.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <input
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 3D effects..."
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/80 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_15px_rgba(94,234,212,0.15)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-300'
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
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500/50"
          >
            <option value="all">All Tech Stacks</option>
            <option value="Three.js">Three.js</option>
            <option value="Shader">Custom GLSL Shader</option>
            <option value="Physics">Physics & Springs</option>
          </select>

          <select
            id="perf-filter"
            value={selectedPerf}
            onChange={(e) => setSelectedPerf(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500/50"
          >
            <option value="all">All GPU Profiles</option>
            <option value="low">Low (Integrated GPU)</option>
            <option value="medium">Medium (Standard GPU)</option>
            <option value="high">High (Discrete GPU)</option>
          </select>

          <button
            id="fav-filter-toggle"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
              showFavoritesOnly
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
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

          <span className="text-xs text-slate-500 ml-auto font-mono">
            Showing {filteredVisuals.length} of {VISUALS.length} visuals
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div id="visuals-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVisuals.map((v) => {
          const isFav = favorites.includes(v.id);
          return (
            <div
              key={v.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-lg"
            >
              {/* Card Header & Preview Image */}
              <div>
                <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800/60 flex items-center justify-center group-hover:border-teal-500/30 transition-colors">
                  <img
                    src={v.thumb}
                    alt={v.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <button
                    onClick={() => onToggleFavorite(v.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
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

                  <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-teal-300 backdrop-blur-md">
                    {v.cat}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors mb-1.5">
                  {v.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-light mb-4 line-clamp-2">
                  {v.desc}
                </p>

                {/* Specs Tags */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono mb-4 text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80">
                    {v.tech}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800/80 text-sky-400">
                    {v.perf}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/60 flex items-center gap-2">
                <a
                  href="#inspector"
                  onClick={() => onSelectVisual(v)}
                  className="flex-1 py-2 px-3 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-medium text-xs text-center hover:bg-teal-500/20 transition-colors"
                >
                  Inspect 3D
                </a>
                <button
                  onClick={() => onCopyPrompt(v)}
                  className="py-2 px-3 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700 hover:text-white transition-colors"
                  title="Generate & Copy Prompt"
                >
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
