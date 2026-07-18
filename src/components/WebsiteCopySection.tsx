import React, { useState } from 'react';
import { WebsiteCopyAsset, BrandAsset } from '../types';
import {
  Activity,
  Mic,
  Calendar,
  Brain,
  Shield,
  BarChart2,
  Mail,
  Users,
  Star,
  ArrowRight,
  Laptop,
  FileText,
  Copy,
  Check,
  Smartphone,
  Sparkles
} from 'lucide-react';

interface WebsiteCopySectionProps {
  copy: WebsiteCopyAsset;
  brand: BrandAsset;
  logoSvg: string;
}

// Simple map for icons
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Mic,
  Calendar,
  Brain,
  Shield,
  BarChart2,
  Mail,
  Users
};

export default function WebsiteCopySection({ copy, brand, logoSvg }: WebsiteCopySectionProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'raw'>('preview');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getIcon = (iconName: string) => {
    const Component = ICON_MAP[iconName] || Activity;
    return <Component className="w-6 h-6 text-cyan-400" />;
  };

  const rawMarkdown = `
# ${brand.name} - Landing Page Copy

## 1. Hero Section
- **Title**: ${copy.hero.title}
- **Subtitle**: ${copy.hero.subtitle}
- **Call To Action (CTA)**: ${copy.hero.cta}

## 2. Core Features
${copy.features.map((f, i) => `### Feature ${i + 1}: ${f.title}\n- **Description**: ${f.description}\n`).join("\n")}

## 3. Testimonials
${copy.testimonials.map((t, i) => `### Testimonial ${i + 1}\n- **Quote**: "${t.quote}"\n- **Author**: ${t.author} (${t.role})\n`).join("\n")}

## 4. Pricing Context
- **Title**: ${copy.pricingSection.title}
- **Subtitle**: ${copy.pricingSection.subtitle}

## 5. Footer
- **Tagline**: ${copy.footer.tagline}
  `;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Top Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              03 Landing Web Copy
            </span>
            <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
              Website Landing Copy
            </h2>
            <p className="text-zinc-400 mt-2 text-sm max-w-xl">
              Optimized copywriting with high-converting headlines, structured benefit highlights, social proof blocks, and targeted CTA copy.
            </p>
          </div>

          <div className="flex bg-zinc-950 p-1 rounded-xl self-start md:self-center border border-zinc-800">
            <button
              id="copy-view-preview"
              type="button"
              onClick={() => setViewMode('preview')}
              className={`px-4 py-2 text-xs rounded-lg font-medium flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'preview' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Laptop className="w-4.5 h-4.5" />
              <span>Interactive Mockup</span>
            </button>
            <button
              id="copy-view-raw"
              type="button"
              onClick={() => setViewMode('raw')}
              className={`px-4 py-2 text-xs rounded-lg font-medium flex items-center space-x-2 transition-all cursor-pointer ${
                viewMode === 'raw' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <FileText className="w-4.5 h-4.5" />
              <span>Raw Copy Editor</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'preview' ? (
        /* Landing Page Live Mockup Frame */
        <div className="border border-zinc-800 rounded-3xl overflow-hidden bg-zinc-950 shadow-xl">
          {/* Simulated Browser Bar */}
          <div className="bg-zinc-950 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 bg-rose-500 rounded-full inline-block" />
              <span className="w-3 h-3 bg-amber-500 rounded-full inline-block" />
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block" />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-mono px-6 py-1 rounded-lg w-1/3 text-center truncate">
              https://www.{brand.name.toLowerCase().replace(/\s+/g, "")}.com
            </div>
            <div className="flex space-x-2 text-zinc-500">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive Web Page Content */}
          <div className="bg-zinc-950 text-zinc-300 max-h-[600px] overflow-y-auto font-sans">
            {/* Nav */}
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between border-b border-zinc-900">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 text-cyan-400" dangerouslySetInnerHTML={{ __html: logoSvg }} />
                <span className="font-display font-bold text-white text-sm tracking-tight">{brand.name}</span>
              </div>
              <div className="hidden md:flex items-center space-x-6 text-xs font-medium text-zinc-400">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              </div>
              <button
                id="preview-cta-nav"
                type="button"
                className="px-3.5 py-1.5 bg-white hover:bg-zinc-200 text-black rounded-lg text-xs font-bold cursor-pointer shadow-sm transition-colors"
              >
                Get Started
              </button>
            </nav>

            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-6 py-16 text-center space-y-6">
              <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/30 text-cyan-400 rounded-full text-xs font-medium">
                Introducing Dental Intelligence
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1] max-w-3xl mx-auto">
                {copy.hero.title}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-light">
                {copy.hero.subtitle}
              </p>
              <div className="pt-4">
                <button
                  id="preview-cta-hero"
                  type="button"
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-bold text-sm cursor-pointer shadow-lg shadow-cyan-500/10 flex items-center space-x-2 mx-auto transition-all"
                >
                  <span>{copy.hero.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="bg-zinc-950/50 border-t border-zinc-900 py-16 px-6">
              <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center">
                  <h2 className="font-display font-bold text-2xl text-white">Why {brand.name}?</h2>
                  <p className="text-zinc-500 text-xs mt-2 max-w-md mx-auto">
                    A comprehensive system custom-tuned to scale operations and diagnosis with absolute precision.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {copy.features.map((feature, idx) => (
                    <div key={feature.title + idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md space-y-4">
                      <div className="w-12 h-12 bg-cyan-950/45 border border-cyan-800/30 rounded-xl flex items-center justify-center">
                        {getIcon(feature.icon)}
                      </div>
                      <h3 className="font-display font-semibold text-white text-base">{feature.title}</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-16 px-6 bg-zinc-950 border-t border-zinc-900">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold">Active Practice Feedback</span>
                  <h2 className="font-display font-bold text-2xl text-white mt-2">Validated by Leading Professionals</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {copy.testimonials.map((test, idx) => (
                    <div key={test.author + idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
                      <div className="flex space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-zinc-300 text-xs italic leading-relaxed mb-6">
                        "{test.quote}"
                      </p>
                      <div>
                        <p className="text-xs font-semibold text-white">{test.author}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{test.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-950 text-white py-12 px-6 border-t border-zinc-900 text-center">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-6 h-6 text-cyan-400" dangerouslySetInnerHTML={{ __html: logoSvg }} />
                  <span className="font-display font-bold tracking-tight text-sm">{brand.name}</span>
                </div>
                <p className="text-zinc-400 text-xs font-light max-w-sm mx-auto">
                  {copy.footer.tagline}
                </p>
                <div className="border-t border-zinc-900 pt-6 text-[10px] text-zinc-600 font-mono">
                  &copy; {new Date().getFullYear()} {brand.name}. All rights reserved. Registered HIPAA Compliant Cloud Node.
                </div>
              </div>
            </footer>
          </div>
        </div>
      ) : (
        /* Raw markdown editor text blocks */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Raw Copy Blocks</span>
            <button
              id="copy-all-markdown"
              type="button"
              onClick={() => handleCopyText(rawMarkdown, 'all')}
              className="px-3.5 py-1.5 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-zinc-100 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
            >
              {copiedSection === 'all' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied Entire Bundle</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entire Document</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hero Copy Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-white text-sm">Hero Copy Block</h3>
                <button
                  id="copy-hero-only"
                  type="button"
                  onClick={() => handleCopyText(`Title: ${copy.hero.title}\nSubtitle: ${copy.hero.subtitle}\nCTA: ${copy.hero.cta}`, 'hero')}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 rounded-lg cursor-pointer transition-colors"
                >
                  {copiedSection === 'hero' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="font-mono text-zinc-500 uppercase text-[9px] tracking-wider block mb-1">Headline H1</span>
                  <p className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 font-semibold text-zinc-200">{copy.hero.title}</p>
                </div>
                <div>
                  <span className="font-mono text-zinc-500 uppercase text-[9px] tracking-wider block mb-1">Sub-Headline</span>
                  <p className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 font-light text-zinc-400 leading-relaxed">{copy.hero.subtitle}</p>
                </div>
                <div>
                  <span className="font-mono text-zinc-500 uppercase text-[9px] tracking-wider block mb-1">CTA text</span>
                  <p className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-850 font-mono text-cyan-400">{copy.hero.cta}</p>
                </div>
              </div>
            </div>

            {/* Feature Copy Blocks */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-white text-sm">Feature Highlight copy</h3>
                <button
                  id="copy-features-only"
                  type="button"
                  onClick={() => handleCopyText(copy.features.map(f => `${f.title}: ${f.description}`).join("\n"), 'features')}
                  className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 rounded-lg cursor-pointer transition-colors"
                >
                  {copiedSection === 'features' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-3 text-xs max-h-[250px] overflow-y-auto pr-1">
                {copy.features.map((feature, i) => (
                  <div key={feature.title + i} className="bg-zinc-950 p-3 rounded-lg border border-zinc-850 space-y-1">
                    <p className="font-bold text-zinc-200">Feature {i+1}: {feature.title}</p>
                    <p className="text-zinc-400 font-light leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
