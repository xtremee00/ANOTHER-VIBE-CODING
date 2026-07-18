import React, { useState } from 'react';
import { BrandAsset } from '../types';
import { Copy, Check, Shield, Volume2, Target, Eye } from 'lucide-react';

interface BrandSectionProps {
  brand: BrandAsset;
}

export default function BrandSection({ brand }: BrandSectionProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Top Banner Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              01 Brand Identity
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
              {brand.name}
            </h2>
            <p className="text-zinc-300 text-lg sm:text-xl font-light mt-2 max-w-2xl leading-relaxed">
              {brand.tagline}
            </p>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl shadow-inner self-start md:self-center">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Recommended Typography</p>
            <div className="mt-2 space-y-1.5">
              <div>
                <span className="text-xs text-zinc-400 font-medium">Headings: </span>
                <span className="text-sm font-semibold text-white font-display">{brand.typography.display}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 font-medium">Body Text: </span>
                <span className="text-sm font-medium text-zinc-300 font-sans">{brand.typography.body}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Brand Brief Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md space-y-6">
            <div className="flex items-start space-x-3">
              <div className="bg-cyan-950/40 p-2 rounded-xl text-cyan-400 mt-0.5 border border-cyan-800/30">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-white text-base">Corporate Mission</h3>
                <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">{brand.mission}</p>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-950/40 p-2 rounded-xl text-amber-400 mt-0.5 border border-amber-900/30">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base">Brand Voice Guidelines</h3>
                  <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">{brand.brandVoice}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-6">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-950/40 p-2 rounded-xl text-indigo-400 mt-0.5 border border-indigo-900/30">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base">Aesthetic Positioning</h3>
                  <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
                    A premium hybrid structure pairing absolute professional reliability with ultra-clean digital aesthetics, highlighting trust and instant accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Color Swatches */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-white mb-4">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-semibold text-base">Color System</h3>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed mb-6">
              Primary and secondary hues recommended for your digital marketing platforms, applications, and offline corporate assets.
            </p>
          </div>

          <div className="space-y-3">
            {brand.colorPalette.map((color, index) => (
              <div
                key={color.hex + index}
                className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-10 h-10 rounded-lg shadow-inner border border-zinc-800"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{color.name}</p>
                    <p className="text-xs font-mono text-zinc-500 mt-0.5">{color.hex}</p>
                  </div>
                </div>
                <button
                  id={`copy-color-${index}`}
                  type="button"
                  onClick={() => copyToClipboard(color.hex, index)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-all cursor-pointer"
                  title="Copy Hex"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
