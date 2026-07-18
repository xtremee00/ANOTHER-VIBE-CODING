import React from 'react';
import { Sparkles, Cpu, Zap, Feather } from 'lucide-react';

interface HeaderProps {
  currentConcept?: string;
  theme: 'modern' | 'minimalist' | 'bold';
  onThemeChange: (theme: 'modern' | 'minimalist' | 'bold') => void;
}

export default function Header({ 
  currentConcept = "AI Travel Planner",
  theme,
  onThemeChange
}: HeaderProps) {
  const themeOptions = [
    { id: 'modern' as const, label: 'Modern', icon: Sparkles, colorClass: 'text-cyan-400' },
    { id: 'minimalist' as const, label: 'Minimalist', icon: Feather, colorClass: 'text-zinc-300' },
    { id: 'bold' as const, label: 'Bold', icon: Zap, colorClass: 'text-orange-500' },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/20">
            <span className="font-display text-sm">A</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-sm sm:text-base text-white tracking-tight leading-none">
              Acquisition Studio
            </h1>
            <p className="text-[9px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">
              Instant Startup Incubator
            </p>
          </div>
        </div>

        {/* Dynamic Prompt Track Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
          <span className="text-zinc-500 text-xs font-mono">Prompt:</span>
          <span className="text-cyan-400 font-mono text-xs font-semibold">"{currentConcept}"</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1.5 animate-pulse"></div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          {/* Aesthetic Theme Selector Segmented Control */}
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {themeOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = theme === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => onThemeChange(opt.id)}
                  title={`Switch to ${opt.label} aesthetic`}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 text-white shadow-sm font-semibold'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? opt.colorClass : 'text-current'}`} />
                  <span className="hidden sm:inline text-[10px] tracking-tight">{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center space-x-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px]">GEMINI-3.5</span>
          </div>
        </div>
      </div>
    </header>
  );
}

