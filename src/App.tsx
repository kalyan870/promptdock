import React, { useState, useEffect } from 'react';
import { VISUALS, type VisualItem, type VisualProps } from './data/visuals.ts';
import { PromptEngine } from './engine/prompt-engine.ts';
import { Header } from './components/navigation/Header.tsx';
import { HorizonHeroSection } from './components/hero/HorizonHeroSection.tsx';
import { WorkflowSection } from './components/workflow/WorkflowSection.tsx';
import { GallerySection } from './components/gallery/GallerySection.tsx';
import { InspectorSection } from './components/inspector/InspectorSection.tsx';
import { PromptGeneratorSection } from './components/prompt-generator/PromptGeneratorSection.tsx';
import { VisualComposerSection } from './components/visual-composer/VisualComposerSection.tsx';
import { Footer } from './components/footer/Footer.tsx';

export const App: React.FC = () => {
  const [selectedVisual, setSelectedVisual] = useState<VisualItem>(VISUALS[0]);
  const [customPropsByVisual, setCustomPropsByVisual] = useState<Record<string, VisualProps>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('promptdock_favs');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch {
      // fallback if localStorage restricted
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('promptdock_favs', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Get active custom props for currently selected visual
  const activeCustomProps: VisualProps =
    customPropsByVisual[selectedVisual.id] || { ...selectedVisual.defaultProps };

  const handlePropsChange = (newProps: VisualProps) => {
    setCustomPropsByVisual((prev) => ({
      ...prev,
      [selectedVisual.id]: newProps
    }));
  };

  const handleSelectVisual = (visual: VisualItem) => {
    setSelectedVisual(visual);
    // Smooth scroll to Inspector
    const inspectorElem = document.getElementById('inspector');
    if (inspectorElem) {
      inspectorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyPromptFromGallery = (visual: VisualItem) => {
    setSelectedVisual(visual);
    const props = customPropsByVisual[visual.id] || visual.defaultProps;
    const prompt = PromptEngine.generateBuildPrompt(visual, props);
    navigator.clipboard.writeText(prompt);
    showToast(`Full 18-point AI build prompt for "${visual.name}" copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-[#04060b] text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Header />

      <main className="flex-1">
        {/* 1. 21st.dev Horizon Hero Section */}
        <HorizonHeroSection />

        {/* 2. 5-Step Visual Loop Workflow Strip */}
        <WorkflowSection />

        {/* 3. 3D Visual Discovery Gallery (30 Curated Visuals) */}
        <GallerySection
          onSelectVisual={handleSelectVisual}
          onCopyPrompt={handleCopyPromptFromGallery}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* 4. Interactive 3D Visual Inspector */}
        <InspectorSection
          selectedVisual={selectedVisual}
          customProps={activeCustomProps}
          onChangeProps={handlePropsChange}
          onNavigateToPrompt={() => {
            const promptElem = document.getElementById('prompt-generator');
            if (promptElem) promptElem.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 5. Detailed AI Build Prompt Studio (18-Point Engineering Brief) */}
        <PromptGeneratorSection
          selectedVisual={selectedVisual}
          customProps={activeCustomProps}
          onCopyToast={showToast}
        />

        {/* 6. Combine 3D Visuals Studio */}
        <VisualComposerSection onCopyToast={showToast} />
      </main>

      <Footer />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 border border-teal-500/40 text-teal-300 text-xs font-mono shadow-2xl flex items-center gap-2.5 animate-bounce">
          <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
export default App;
