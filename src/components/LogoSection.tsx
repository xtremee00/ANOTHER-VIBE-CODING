import React, { useState, useEffect } from 'react';
import { LogoAsset } from '../types';
import { Copy, Check, Download, Image, Layout, Sparkles } from 'lucide-react';

interface LogoSectionProps {
  logo: LogoAsset;
  brandName: string;
}

export default function LogoSection({ logo, brandName }: LogoSectionProps) {
  const [bgType, setBgType] = useState<'light' | 'dark' | 'brand'>('light');
  const [copied, setCopied] = useState(false);
  const [cleanedSvg, setCleanedSvg] = useState("");

  // Process the svgString in case the model wrapped it in markdown or formatting blocks
  useEffect(() => {
    let svg = logo.svgString || "";
    // Remove markdown block if present
    if (svg.includes("```xml")) {
      svg = svg.split("```xml")[1].split("```")[0];
    } else if (svg.includes("```svg")) {
      svg = svg.split("```svg")[1].split("```")[0];
    } else if (svg.includes("```html")) {
      svg = svg.split("```html")[1].split("```")[0];
    } else if (svg.includes("```")) {
      svg = svg.split("```")[1].split("```")[0];
    }
    setCleanedSvg(svg.trim());
  }, [logo.svgString]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(cleanedSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([cleanedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/\s+/g, '_')}_logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              02 Logo Asset Studio
            </span>
            <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
              Corporate Visual Logo
            </h2>
            <p className="text-zinc-400 mt-2 text-sm leading-relaxed max-w-xl">
              An instantly drafted responsive vector brand mark. Fully scalable, cleanly nested, and exportable as high-quality web-ready SVG files.
            </p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              id="copy-svg-code-button"
              type="button"
              onClick={handleCopyCode}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700/80 text-zinc-100 rounded-xl font-medium text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied SVG Code</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy SVG Code</span>
                </>
              )}
            </button>
            <button
              id="download-svg-button"
              type="button"
              onClick={handleDownloadFile}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .SVG</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Logo Viewer Stage */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">Logo Playground Stage</span>
            <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
              <button
                id="toggle-bg-light"
                type="button"
                onClick={() => setBgType('light')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  bgType === 'light' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Light
              </button>
              <button
                id="toggle-bg-dark"
                type="button"
                onClick={() => setBgType('dark')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  bgType === 'dark' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Dark
              </button>
              <button
                id="toggle-bg-brand"
                type="button"
                onClick={() => setBgType('brand')}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition-all cursor-pointer ${
                  bgType === 'brand' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Neon Mint
              </button>
            </div>
          </div>

          <div
            className={`flex-1 min-h-[320px] rounded-2xl flex items-center justify-center p-12 transition-all duration-300 border ${
              bgType === 'light'
                ? 'bg-zinc-100 border-zinc-200 text-zinc-950'
                : bgType === 'dark'
                ? 'bg-zinc-950 border-zinc-850 text-white'
                : 'bg-cyan-950/40 border-cyan-900 text-cyan-400'
            }`}
          >
            <div className="w-48 h-48 flex items-center justify-center relative">
              <div
                className="w-full h-full text-current logo-svg-wrapper flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: cleanedSvg }}
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                <p className="font-display font-semibold text-center tracking-wide text-sm whitespace-nowrap text-zinc-300">
                  {brandName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical details and preview items */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center space-x-2 font-display font-semibold text-white text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Design Concept</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This mark is automatically crafted on mathematical canvas ratios (1:1 bounding grid) to optimize legibility on high-density displays, browser favicons, and corporate merchandise.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md space-y-3">
            <h4 className="text-xs font-semibold text-zinc-200">Why SVG?</h4>
            <ul className="text-xs text-zinc-400 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Infinite scaling without pixel loss or blurriness.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Sub-kilobyte file size ensures lightning-fast load speeds.</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Can be directly styled with CSS variables or Tailwind.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
