import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ConceptInput from './components/ConceptInput';
import BrandSection from './components/BrandSection';
import LogoSection from './components/LogoSection';
import WebsiteCopySection from './components/WebsiteCopySection';
import BusinessModelSection from './components/BusinessModelSection';
import PricingSection from './components/PricingSection';
import FinancialForecastSection from './components/FinancialForecastSection';
import PitchDeckSection from './components/PitchDeckSection';
import BuyerAcquisitionSection from './components/BuyerAcquisitionSection';
import PRDSection from './components/PRDSection';
import { DEFAULT_STARTUP_DATA } from './default_data';
import { StartupAcquisitionData } from './types';
import {
  Award,
  Image as ImageIcon,
  Laptop,
  Briefcase,
  Tags,
  LineChart,
  Presentation,
  Target,
  FileText,
  AlertCircle,
  Loader2,
  Sparkles
} from 'lucide-react';

type TabType = 'brand' | 'logo' | 'website' | 'business' | 'pricing' | 'financials' | 'pitch' | 'acquisition' | 'prd';

export default function App() {
  const [concept, setConcept] = useState<string>("AI Travel Planner");
  const [data, setData] = useState<StartupAcquisitionData>(DEFAULT_STARTUP_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('brand');
  const [error, setError] = useState<string | null>(null);

  const [theme, setTheme] = useState<'modern' | 'minimalist' | 'bold'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('app-theme') as 'modern' | 'minimalist' | 'bold') || 'modern';
    }
    return 'modern';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    const root = document.documentElement;
    
    if (theme === 'modern') {
      root.style.setProperty('--font-sans-family', '"Inter", ui-sans-serif, system-ui, sans-serif');
      root.style.setProperty('--font-display-family', '"Space Grotesk", sans-serif');
      root.style.setProperty('--color-zinc-950', '#09090b');
      root.style.setProperty('--color-zinc-900', '#18181b');
      root.style.setProperty('--color-zinc-800', '#27272a');
      root.style.setProperty('--color-cyan-400', '#22d3ee');
      root.style.setProperty('--color-cyan-500', '#06b6d4');
      root.style.setProperty('--color-cyan-800', '#155e75');
      root.style.setProperty('--color-cyan-950', '#083344');
    } else if (theme === 'minimalist') {
      root.style.setProperty('--font-sans-family', '"Inter", ui-sans-serif, system-ui, sans-serif');
      root.style.setProperty('--font-display-family', '"Playfair Display", Georgia, serif');
      root.style.setProperty('--color-zinc-950', '#0f0f11');
      root.style.setProperty('--color-zinc-900', '#141416');
      root.style.setProperty('--color-zinc-800', '#222225');
      root.style.setProperty('--color-cyan-400', '#fafafa');
      root.style.setProperty('--color-cyan-500', '#e4e4e7');
      root.style.setProperty('--color-cyan-800', '#52525b');
      root.style.setProperty('--color-cyan-950', '#27272a');
    } else if (theme === 'bold') {
      root.style.setProperty('--font-sans-family', '"JetBrains Mono", monospace');
      root.style.setProperty('--font-display-family', '"Outfit", sans-serif');
      root.style.setProperty('--color-zinc-950', '#020617');
      root.style.setProperty('--color-zinc-900', '#0f172a');
      root.style.setProperty('--color-zinc-800', '#334155');
      root.style.setProperty('--color-cyan-400', '#f97316');
      root.style.setProperty('--color-cyan-500', '#ea580c');
      root.style.setProperty('--color-cyan-800', '#9a3412');
      root.style.setProperty('--color-cyan-950', '#431407');
    }
  }, [theme]);

  // Quick action to fetch pre-loaded data or handle custom generations
  const handleGenerate = async (conceptPrompt: string) => {
    setIsLoading(true);
    setError(null);
    setConcept(conceptPrompt);

    try {
      // If the prompt is exactly the default, we can load it instantly!
      const normalizedPrompt = conceptPrompt.toLowerCase().trim();
      if (normalizedPrompt === "ai travel planner" || normalizedPrompt === "ai for dentists" || normalizedPrompt === "") {
        setData(DEFAULT_STARTUP_DATA);
        setActiveTab('brand');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/generate-startup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ concept: conceptPrompt }),
      });

      if (!response.ok) {
        const errPayload = await response.json().catch(() => ({}));
        throw new Error(errPayload.error || "Failed to incubate startup blueprint.");
      }

      const payload = await response.json();
      setData(payload);
      setActiveTab('brand'); // Reset to the first tab on new content
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong while connecting to the incubator server.");
    } finally {
      setIsLoading(false);
    }
  };

  // List of tabs with their titles and icons
  const tabs = [
    { id: 'brand' as TabType, label: '1. Brand', icon: Award },
    { id: 'logo' as TabType, label: '2. Logo', icon: ImageIcon },
    { id: 'website' as TabType, label: '3. Web Copy', icon: Laptop },
    { id: 'business' as TabType, label: '4. Business Model', icon: Briefcase },
    { id: 'pricing' as TabType, label: '5. Pricing', icon: Tags },
    { id: 'financials' as TabType, label: '6. Forecast', icon: LineChart },
    { id: 'pitch' as TabType, label: '7. Pitch Deck', icon: Presentation },
    { id: 'acquisition' as TabType, label: '8. Acquisition', icon: Target },
    { id: 'prd' as TabType, label: '9. Technical PRD', icon: FileText },
  ];

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'brand':
        return <BrandSection brand={data.brand} />;
      case 'logo':
        return <LogoSection logo={data.logo} brandName={data.brand.name} />;
      case 'website':
        return <WebsiteCopySection copy={data.websiteCopy} brand={data.brand} logoSvg={data.logo.svgString} />;
      case 'business':
        return <BusinessModelSection model={data.businessModel} brandName={data.brand.name} />;
      case 'pricing':
        return <PricingSection pricing={data.pricing} brandName={data.brand.name} />;
      case 'financials':
        return <FinancialForecastSection forecast={data.financialForecast} />;
      case 'pitch':
        return <PitchDeckSection deck={data.pitchDeck} brand={data.brand} />;
      case 'acquisition':
        return <BuyerAcquisitionSection acquisition={data.buyerAcquisition} brandName={data.brand.name} />;
      case 'prd':
        return <PRDSection prd={data.prd} brandName={data.brand.name} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <Header currentConcept={concept} theme={theme} onThemeChange={setTheme} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Dynamic Concept Input Controller */}
        <ConceptInput onGenerate={handleGenerate} isLoading={isLoading} currentConcept={concept} />

        {/* Global Error Banner */}
        {error && (
          <div className="bg-rose-950/20 border border-rose-900/60 p-4 rounded-2xl flex items-start space-x-3 text-rose-200 animate-slide-up">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Incubator Generation Error</p>
              <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Studio Loading Overlay Screen */}
        {isLoading ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 flex flex-col items-center justify-center text-center space-y-6 shadow-2xl min-h-[450px]">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-zinc-800 border-t-cyan-500 rounded-full animate-spin" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-2 max-w-md">
              <h3 className="font-display font-bold text-lg text-white tracking-tight">Drafting Startup Assets...</h3>
              <p className="text-xs text-zinc-500 font-mono">
                Triggering Gemini structured generation models to compile 8 complete startup artifacts
              </p>
              <div className="pt-4 flex flex-wrap gap-1.5 justify-center">
                <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">Vector Logo</span>
                <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">P&L Forecast</span>
                <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">Lean Canvas</span>
                <span className="text-[10px] font-mono bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded text-zinc-400">Pitch slides</span>
              </div>
            </div>
          </div>
        ) : (
          /* Main Tabbed Output Workspace */
          <div className="space-y-6">
            <div className="border-b border-zinc-800">
              <div className="flex overflow-x-auto pb-px scrollbar-thin scrollbar-thumb-zinc-800 gap-1 sm:gap-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      id={`tab-button-${tab.id}`}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 border-b-2 font-display text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center space-x-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-cyan-500 text-cyan-400 font-bold'
                          : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
                      }`}
                    >
                      <IconComponent className="w-4.5 h-4.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render Tab Content */}
            <div className="min-h-[400px]">
              {renderActiveSection()}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-900 bg-zinc-900/30 py-8 text-center text-xs text-zinc-500 font-mono mt-auto">
        <p>&copy; {new Date().getFullYear()} AI Acquisition Studio. Powered by Gemini-3.5-Flash.</p>
      </footer>
    </div>
  );
}
