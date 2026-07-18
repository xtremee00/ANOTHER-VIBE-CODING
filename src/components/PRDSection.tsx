import React, { useState } from 'react';
import { FileText, Copy, Check, Download, Layers, ShieldCheck, ListTodo, Users, Award, Landmark } from 'lucide-react';
import { ProductRequirementAsset } from '../types';

interface PRDSectionProps {
  prd?: ProductRequirementAsset;
  brandName: string;
}

export default function PRDSection({ prd, brandName }: PRDSectionProps) {
  const [copied, setCopied] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState<number>(0);

  if (!prd) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center text-zinc-400">
        No PRD data available. Please trigger a new generation to compile a custom PRD.
      </div>
    );
  }

  const handleCopy = () => {
    const text = `${prd.title}\n\nOVERVIEW:\n${prd.overview}\n\n` + 
      prd.sections.map(s => `${s.heading}\n${'-'.repeat(s.heading.length)}\n${s.content}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `# ${prd.title}\n\n## Overview\n${prd.overview}\n\n` + 
      prd.sections.map(s => `## ${s.heading}\n\n${s.content}`).join('\n\n');
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${brandName.toLowerCase().replace(/\s+/g, '-')}-prd.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Associate icons to the typical 6 sections of PRD dynamically
  const getSectionIcon = (heading: string) => {
    const h = heading.toLowerCase();
    if (h.includes("summary") || h.includes("problem")) return <Award className="w-4 h-4" />;
    if (h.includes("persona") || h.includes("audience")) return <Users className="w-4 h-4" />;
    if (h.includes("functional") || h.includes("moscow")) return <ListTodo className="w-4 h-4" />;
    if (h.includes("stack") || h.includes("architecture")) return <Layers className="w-4 h-4" />;
    if (h.includes("security") || h.includes("compliance")) return <ShieldCheck className="w-4 h-4" />;
    return <Landmark className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              09 Product Requirement Document
            </span>
            <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
              {prd.title || `${brandName} Technical PRD`}
            </h2>
            <p className="text-zinc-400 mt-2 text-sm max-w-2xl leading-relaxed">
              {prd.overview || `Detailed functional specifications, engineering parameters, and integration blueprints defining ${brandName}.`}
            </p>
          </div>
          <div className="flex items-center space-x-2.5 shrink-0 self-start md:self-auto">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all cursor-pointer"
              title="Copy full PRD to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Copied PRD</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy PRD</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer"
              title="Download PRD in Markdown (.md) format"
            >
              <Download className="w-4 h-4" />
              <span>Download MD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main PRD Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-1.5">
          <p className="text-[10px] text-zinc-500 font-mono font-bold tracking-wider uppercase px-2 mb-3">
            DOCUMENT INDEX
          </p>
          <div className="space-y-1">
            {prd.sections.map((section, idx) => {
              const isActive = activeSectionIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSectionIdx(idx)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center space-x-3 cursor-pointer group ${
                    isActive
                      ? 'bg-zinc-800 text-cyan-400 border border-cyan-800/30 font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-950/40 border border-transparent'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all shrink-0 ${
                    isActive ? 'bg-cyan-950 text-cyan-400' : 'bg-zinc-900 text-zinc-500 group-hover:text-zinc-300'
                  }`}>
                    {getSectionIcon(section.heading)}
                  </div>
                  <span className="text-xs truncate">{section.heading}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Section Display */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl flex flex-col min-h-[350px]">
            {/* Window bar */}
            <div className="bg-zinc-950 px-5 py-3.5 border-b border-zinc-850/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 bg-rose-500/80 rounded-full inline-block" />
                <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-full inline-block" />
                <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full inline-block" />
                <span className="text-[10px] text-zinc-500 font-mono pl-4 uppercase font-bold tracking-wider">
                  SYSTEM PRD COMPILER
                </span>
              </div>
              <div className="text-[10px] text-cyan-400 font-mono font-bold uppercase">
                SECTION {activeSectionIdx + 1} OF {prd.sections.length}
              </div>
            </div>

            {/* Document body content with formatting */}
            <div className="p-6 sm:p-8 flex-1 space-y-4 bg-zinc-950/15 overflow-y-auto">
              <h3 className="font-display font-bold text-lg text-white border-b border-zinc-800/80 pb-3 flex items-center space-x-2.5">
                <span className="text-cyan-400">
                  {getSectionIcon(prd.sections[activeSectionIdx].heading)}
                </span>
                <span>{prd.sections[activeSectionIdx].heading}</span>
              </h3>
              
              <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-sans font-light">
                {prd.sections[activeSectionIdx].content.split('\n').map((line, lIdx) => {
                  const trimmed = line.trim();
                  // Format bullet points or lists beautifully
                  if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    return (
                      <div key={lIdx} className="flex items-start space-x-2 my-2.5 pl-2">
                        <span className="text-cyan-400 mt-1 text-[10px]">•</span>
                        <span className="text-zinc-300">{trimmed.substring(2)}</span>
                      </div>
                    );
                  }
                  // Format persona or bold markers (e.g. - **Persona**: text)
                  if (trimmed.startsWith('- **') && trimmed.includes('**')) {
                    const parts = trimmed.split('**');
                    const label = parts[1];
                    const desc = parts.slice(2).join('**');
                    return (
                      <div key={lIdx} className="flex items-start space-x-2 my-3 pl-2">
                        <span className="text-cyan-400 mt-1.5 text-[8px]">■</span>
                        <span className="text-zinc-300">
                          <strong className="text-white font-semibold">{label}</strong>
                          {desc}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <p key={lIdx} className={trimmed ? "mb-4" : "h-2"}>
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Technical Architecture Tip */}
          <div className="bg-cyan-950/20 border border-cyan-800/30 rounded-xl p-4 text-xs text-cyan-300 flex items-start space-x-3">
            <FileText className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="font-semibold text-cyan-200">AI-Generated Product Requirement Document</p>
              <p className="text-cyan-400/80 mt-0.5 font-light leading-relaxed">
                This document lists exact requirements, user behaviors, technical architecture components, and success matrices custom-built to take {brandName} from zero to a fully realized product.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
