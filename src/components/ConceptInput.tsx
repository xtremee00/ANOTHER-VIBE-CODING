import React, { useState, useEffect } from 'react';
import { Search, Loader2, ArrowRight, Lightbulb } from 'lucide-react';

interface ConceptInputProps {
  onGenerate: (concept: string) => void;
  isLoading: boolean;
  currentConcept: string;
}

const ALL_IDEAS_POOL = [
  "AI Travel Planner",
  "Uber for dog walkers",
  "Micro-SaaS for local gym managers",
  "Automated email writer for realtors",
  "AI co-pilot for interior designers",
  "Shopify for local bakeries",
  "GitHub for legal contract drafts",
  "Auto-scheduler for mobile detailers",
  "Voice scribe for clinical psychologists",
  "Aesthetic planner for wedding videographers",
  "Substack for video game modders",
  "Stripe for community garden subscriptions",
  "Analytics dashboard for TikTok managers",
  "Inventory manager for vintage boutiques",
  "Copilot for architectural site inspectors",
  "AI estimator for roofing contractors",
  "Smart booking for freelance makeup artists",
  "CRM for craft brewery distributors",
  "Compliance tracker for chemical labs",
  "SaaS for vertical hydroponic farms",
  "Auto-invoicing for fractional CFOs",
  "AI transcription for podcast networks",
  "Custom meal prep builder for local chefs",
  "HR matching for Web3 development teams",
  "Route planner for waste management fleets"
];

export default function ConceptInput({ onGenerate, isLoading, currentConcept }: ConceptInputProps) {
  const [input, setInput] = useState("");
  const [presets, setPresets] = useState<string[]>([]);

  // Function to get 5 random presets from the pool, excluding the current active concept if possible
  const rotatePresets = (excludeConcept?: string) => {
    const filtered = ALL_IDEAS_POOL.filter(
      (idea) => idea.toLowerCase() !== (excludeConcept || "").toLowerCase()
    );
    // Shuffle filtered
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setPresets(shuffled.slice(0, 5));
  };

  // Rotate presets whenever the current concept changes
  useEffect(() => {
    rotatePresets(currentConcept);
    if (currentConcept) {
      setInput(currentConcept);
    }
  }, [currentConcept]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onGenerate(input.trim());
    }
  };

  const handlePresetClick = (preset: string) => {
    if (!isLoading) {
      setInput(preset);
      onGenerate(preset);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            What startup idea are we building today?
          </h2>
          <p className="text-zinc-400 mt-2 text-sm sm:text-base leading-relaxed">
            Type any vertical, micro-niche, or concept. In seconds, we will draft branding, custom SVG logos, landing page copy, financial sheets, and outreach campaigns.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="concept-prompt-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Try typing "AI Travel Planner", "Shopify for local bakeries", etc...'
              disabled={isLoading}
              className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-zinc-950 hover:bg-zinc-950/80 focus:bg-zinc-950 border border-zinc-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/25 rounded-2xl outline-none transition-all text-white placeholder-zinc-500 text-sm sm:text-base shadow-inner font-sans"
            />
          </div>
          <button
            id="generate-button"
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3.5 sm:py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-black rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-sm shrink-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Incubating...</span>
              </>
            ) : (
              <>
                <span>Incubate</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="flex flex-col sm:flex-row sm:items-center space-y-2.5 sm:space-y-0 sm:space-x-3 text-xs">
          <div className="flex items-center space-x-1 text-zinc-500 shrink-0 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Popular ideas (changes every search):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                id={`preset-${preset.replace(/\s+/g, '-').toLowerCase()}`}
                type="button"
                onClick={() => handlePresetClick(preset)}
                disabled={isLoading}
                className={`px-3 py-1.5 rounded-xl border font-medium transition-all cursor-pointer ${
                  currentConcept.toLowerCase() === preset.toLowerCase()
                    ? "border-cyan-500 bg-cyan-950/40 text-cyan-400 font-bold"
                    : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 text-zinc-400"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
