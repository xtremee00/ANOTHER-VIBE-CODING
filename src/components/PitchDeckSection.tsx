import React, { useState } from 'react';
import { BrandAsset, PitchDeckAsset, PitchSlide } from '../types';
import { ArrowLeft, ArrowRight, Presentation, ShieldAlert, CheckCircle2, Globe, Cpu, Coins, Users, Rocket, BarChart, Download } from 'lucide-react';
import pptxgen from 'pptxgenjs';

interface PitchDeckSectionProps {
  deck: PitchDeckAsset;
  brand: BrandAsset;
}

export default function PitchDeckSection({ deck, brand }: PitchDeckSectionProps) {
  const brandName = brand.name;
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const currentSlide: PitchSlide = deck.slides[currentSlideIdx] || deck.slides[0];

  const handleNext = () => {
    if (currentSlideIdx < deck.slides.length - 1) {
      setCurrentSlideIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx(prev => prev - 1);
    }
  };

  const handleExportPPTX = async () => {
    setIsExporting(true);
    try {
      const pptx = new pptxgen();
      pptx.layout = 'LAYOUT_16x9';

      // Determine brand niche style archetype
      const text = `${brand.name} ${brand.tagline} ${brand.mission}`.toLowerCase();
      let styleArchetype: 'premium' | 'corporate' | 'bold' | 'tech' = 'tech';
      
      if (text.includes('travel') || text.includes('luxury') || text.includes('boutique') || text.includes('editorial') || text.includes('design') || text.includes('premium') || text.includes('art') || text.includes('style') || text.includes('craft') || text.includes('wellness') || text.includes('yoga') || text.includes('curated') || text.includes('voyage')) {
        styleArchetype = 'premium';
      } else if (text.includes('dentist') || text.includes('health') || text.includes('med') || text.includes('care') || text.includes('bank') || text.includes('finance') || text.includes('trust') || text.includes('legal') || text.includes('firm') || text.includes('corp') || text.includes('enterprise') || text.includes('dentai')) {
        styleArchetype = 'corporate';
      } else if (text.includes('bold') || text.includes('brutal') || text.includes('game') || text.includes('play') || text.includes('media') || text.includes('social') || text.includes('creator') || text.includes('sound') || text.includes('studio') || text.includes('vibe') || text.includes('youth') || text.includes('energy')) {
        styleArchetype = 'bold';
      }

      // Helper to clean hex values for pptxgen (remove '#' and upper case)
      const cleanHex = (hexStr: string) => {
        if (!hexStr) return '';
        return hexStr.replace('#', '').trim().toUpperCase();
      };

      const primaryHex = cleanHex(brand.colorPalette[0]?.hex) || '06B6D4';
      const secondaryHex = cleanHex(brand.colorPalette[1]?.hex) || '18181B';
      const thirdHex = cleanHex(brand.colorPalette[2]?.hex || brand.colorPalette[0]?.hex) || 'FFFFFF';

      // Preset dynamic style parameter defaults (Modern Tech)
      let bgColor = '09090B';
      let textColor = 'E4E4E7';
      let titleColor = 'FFFFFF';
      let accentColor = primaryHex;
      let brandTagColor = primaryHex;
      let fontDisplay = 'Arial';
      let fontBody = 'Arial';
      let boxColor = '18181B';
      let boxLineColor = '27272A';
      let footerColor = '71717A';

      if (styleArchetype === 'premium') {
        bgColor = 'FAF8F5'; // warm crisp ivory background
        textColor = '33302E'; // espresso dark body
        titleColor = '1C1A19'; // extra dark headline
        accentColor = primaryHex; // brand main color
        brandTagColor = '8C827A'; // sophisticated warm taupe
        fontDisplay = 'Georgia';
        fontBody = 'Georgia';
        boxColor = 'F5F2EC'; // sand/cream visual container
        boxLineColor = primaryHex;
        footerColor = '8C827A';
      } else if (styleArchetype === 'corporate') {
        bgColor = '0B132B'; // deep navy/slate background
        textColor = 'E2E8F0'; // clean light gray
        titleColor = 'FFFFFF';
        accentColor = primaryHex;
        brandTagColor = thirdHex;
        fontDisplay = 'Trebuchet MS';
        fontBody = 'Calibri';
        boxColor = '1C2541'; // dark corporate box
        boxLineColor = primaryHex;
        footerColor = '64748B';
      } else if (styleArchetype === 'bold') {
        bgColor = '020617'; // absolute slate-950 black
        textColor = 'F1F5F9';
        titleColor = 'FFFFFF';
        accentColor = primaryHex;
        brandTagColor = thirdHex;
        fontDisplay = 'Arial';
        fontBody = 'Courier New';
        boxColor = '0F172A';
        boxLineColor = primaryHex;
        footerColor = '475569';
      }

      // --- ADD 1. COVER / TITLE SLIDE ---
      const coverSlide = pptx.addSlide();
      coverSlide.background = { color: bgColor };

      // Add a dynamic brand visual frame/border shape to the Cover
      if (styleArchetype === 'premium') {
        coverSlide.addShape('rect', {
          x: 0.5,
          y: 0.5,
          w: 9.0,
          h: 4.625,
          fill: { color: 'none' },
          line: { color: accentColor, width: 1.5 }
        });
      } else if (styleArchetype === 'corporate') {
        coverSlide.addShape('rect', {
          x: 0,
          y: 0,
          w: 0.4,
          h: 5.625,
          fill: { color: accentColor }
        });
      } else if (styleArchetype === 'bold') {
        coverSlide.addShape('rect', {
          x: 0.4,
          y: 0.4,
          w: 9.2,
          h: 4.825,
          fill: { color: 'none' },
          line: { color: accentColor, width: 3.0 }
        });
      } else {
        // Modern tech container box
        coverSlide.addShape('roundRect', {
          x: 0.6,
          y: 0.6,
          w: 4.5,
          h: 4.425,
          fill: { color: boxColor },
          line: { color: accentColor, width: 1 }
        });
      }

      coverSlide.addText(brand.name.toUpperCase(), {
        x: 0.8,
        y: 1.4,
        w: 8.4,
        h: 0.8,
        fontSize: 44,
        fontFace: fontDisplay,
        color: titleColor,
        bold: true
      });

      coverSlide.addText(brand.tagline, {
        x: 0.8,
        y: 2.3,
        w: 8.4,
        h: 0.6,
        fontSize: 14,
        fontFace: fontBody,
        color: styleArchetype === 'premium' ? textColor : accentColor,
        italic: styleArchetype === 'premium',
        bold: styleArchetype !== 'premium'
      });

      // Divider line
      coverSlide.addShape('line', {
        x: 0.8,
        y: 3.1,
        w: 3.5,
        h: 0.0,
        line: { color: accentColor, width: 2.0 }
      });

      coverSlide.addText('STUDIO VENTURE BLUEPRINT // INVESTMENT INVITATION', {
        x: 0.8,
        y: 3.3,
        w: 8.4,
        h: 0.3,
        fontSize: 10,
        fontFace: 'Arial',
        color: brandTagColor,
        bold: true
      });

      coverSlide.addText(`Incubated in Acquisition Studio  •  Confidential Slide Deck`, {
        x: 0.8,
        y: 4.6,
        w: 8.4,
        h: 0.3,
        fontSize: 8,
        fontFace: 'Arial',
        color: footerColor
      });

      // --- ADD 2. CONTENT SLIDES ---
      deck.slides.forEach((slide, index) => {
        const pSlide = pptx.addSlide();
        pSlide.background = { color: bgColor };

        // 1. Header brand tag
        pSlide.addText(`${brandName.toUpperCase()} // SEED PRESENTATION`, {
          x: 0.6,
          y: 0.4,
          w: 8.5,
          h: 0.3,
          fontSize: 9,
          fontFace: 'Arial',
          color: brandTagColor,
          bold: true
        });

        // 2. Slide Title
        pSlide.addText(slide.title, {
          x: 0.6,
          y: 0.7,
          w: 8.5,
          h: 0.8,
          fontSize: 26,
          fontFace: fontDisplay,
          color: titleColor,
          bold: true
        });

        // 3. Subtitle / Context descriptor
        pSlide.addText(slide.subtitle, {
          x: 0.6,
          y: 1.5,
          w: 8.5,
          h: 0.6,
          fontSize: 12,
          fontFace: fontBody,
          color: styleArchetype === 'premium' ? textColor : 'A1A1AA', // zinc-400 or premium dark body
          italic: true
        });

        // 4. Bullet Points (Main body content)
        const bulletLines = slide.bullets.map(b => `•  ${b}`).join('\n\n');
        pSlide.addText(bulletLines, {
          x: 0.6,
          y: 2.3,
          w: 5.6,
          h: 3.2,
          fontSize: 11,
          fontFace: fontBody,
          color: textColor,
          align: 'left',
          valign: 'top',
          lineSpacing: 22
        });

        // 5. Context-sensitive Visual Block Box on the right side
        let activeBoxColor = boxColor;
        let activeAccentColor = accentColor;
        let boxTitle = 'KPI TARGETS';
        let line1 = 'Scale Advantage';
        let line2 = 'High Customer ROI';

        if (slide.layoutType === 'problem') {
          activeBoxColor = styleArchetype === 'premium' ? 'FDF2F2' : '450A0A'; // light rose / deep red
          activeAccentColor = 'F43F5E'; // rose-500
          boxTitle = 'CRITICAL MARKET PAINS';
          line1 = 'Administrative Charting: +35% Loss';
          line2 = 'Undetected Anomalies: 15% Omitted';
        } else if (slide.layoutType === 'solution') {
          activeBoxColor = styleArchetype === 'premium' ? 'ECFEFF' : '082F49'; // light sky / deep teal
          activeAccentColor = '0EA5E9'; // sky-500
          boxTitle = `${brandName.toUpperCase()} SOLUTION`;
          line1 = 'Visual Radiographic Vision Flagging';
          line2 = 'Voice Dictation PMS Direct Sync';
        } else if (slide.layoutType === 'market') {
          activeBoxColor = styleArchetype === 'premium' ? 'EEF2FF' : '1E1B4B'; // light indigo / deep indigo
          activeAccentColor = '6366F1'; // indigo-500
          boxTitle = 'TOTAL MARKET CAP';
          line1 = 'TAM: $5.4 Billion Global';
          line2 = 'SAM: $2.1 Billion NA/EU';
        } else if (slide.layoutType === 'ask') {
          activeBoxColor = styleArchetype === 'premium' ? 'ECFDF5' : '064E3B'; // light green / deep emerald
          activeAccentColor = '10B981'; // emerald-500
          boxTitle = 'FUNDRAISING ASK';
          line1 = 'Total Round Ask: $1.5M Seed';
          line2 = '60% Engineering / 40% Growth';
        }

        // Background container shape
        pSlide.addShape('roundRect', {
          x: 6.6,
          y: 2.2,
          w: 2.8,
          h: 3.1,
          fill: { color: activeBoxColor },
          line: { color: activeAccentColor, width: 1.5 }
        });

        // Shape label
        pSlide.addText(boxTitle, {
          x: 6.8,
          y: 2.4,
          w: 2.4,
          h: 0.4,
          fontSize: 9,
          fontFace: fontDisplay === 'Georgia' ? 'Georgia' : 'Courier New',
          color: activeAccentColor,
          bold: true,
          align: 'center'
        });

        // Shape bullets
        pSlide.addText(`${line1}\n\n${line2}`, {
          x: 6.8,
          y: 2.9,
          w: 2.4,
          h: 2.1,
          fontSize: 10,
          fontFace: fontBody,
          color: styleArchetype === 'premium' ? '33302E' : 'FFFFFF',
          align: 'center',
          valign: 'middle'
        });

        // 6. Slide index footer
        pSlide.addText(`Slide ${index + 1} of ${deck.slides.length}`, {
          x: 8.0,
          y: 5.4,
          w: 1.4,
          h: 0.2,
          fontSize: 8,
          fontFace: 'Arial',
          color: footerColor,
          align: 'right'
        });
      });

      // Write presentation out
      const safeName = brandName.toLowerCase().replace(/\s+/g, '-');
      await pptx.writeFile({ fileName: `${safeName}-pitchdeck.pptx` });
    } catch (err) {
      console.error('Error generating PowerPoint file:', err);
    } finally {
      setIsExporting(false);
    }
  };

  // Render a beautiful context-sensitive slide visualizer on the right side of the canvas
  const renderSlideVisual = (layoutType: string) => {
    switch (layoutType) {
      case 'problem':
        return (
          <div className="bg-rose-950/20 border border-rose-900/60 rounded-2xl p-6 h-full flex flex-col justify-between text-rose-200">
            <div>
              <div className="flex items-center space-x-2 text-rose-400 mb-2">
                <ShieldAlert className="w-5 h-5 animate-bounce" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Core Pain Metrics</span>
              </div>
              <h4 className="font-display font-bold text-lg leading-tight text-white">Operating Waste</h4>
              <p className="text-xs text-zinc-400 mt-2">Manual administration drains resources, leading to clinical bottlenecks and patient attrition.</p>
            </div>
            <div className="space-y-3 mt-6">
              <div className="bg-zinc-950 border border-rose-950 p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-sm text-zinc-300">
                <span>Charting Admin Time</span>
                <span className="text-rose-400 font-mono">+35% Loss</span>
              </div>
              <div className="bg-zinc-950 border border-rose-950 p-2.5 rounded-xl flex items-center justify-between text-xs font-semibold shadow-sm text-zinc-300">
                <span>Undetected Caries</span>
                <span className="text-rose-400 font-mono">15% Omitted</span>
              </div>
            </div>
          </div>
        );
      case 'solution':
        return (
          <div className="bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{brandName} Engine</span>
              </div>
              <h4 className="font-display font-bold text-lg leading-tight text-white">Workflow Automation</h4>
              <p className="text-xs text-zinc-400 mt-1">Autonomous workflows operating in the background of your legacy database.</p>
            </div>
            <div className="space-y-2 mt-6">
              <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-[10px] font-mono text-zinc-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block animate-pulse" />
                <span>Diagnostic Image Scan: Finished</span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-xl text-[10px] font-mono text-zinc-300 flex items-center space-x-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full inline-block animate-pulse" />
                <span>Voice Scribe PMS: Direct Sync completed</span>
              </div>
            </div>
          </div>
        );
      case 'market':
        return (
          <div className="bg-indigo-950/20 border border-indigo-900/60 rounded-2xl p-6 h-full flex flex-col justify-between text-indigo-200">
            <div>
              <div className="flex items-center space-x-2 text-indigo-400 mb-2">
                <Globe className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Market Horizons</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Addressable Volume</h4>
            </div>
            <div className="space-y-2.5 mt-4">
              <div className="bg-zinc-950 border border-indigo-950 p-2 rounded-xl text-center shadow-sm">
                <p className="text-[9px] text-zinc-500 font-mono uppercase">TAM (Global Dental)</p>
                <p className="text-base font-bold text-indigo-300">$5.4 Billion</p>
              </div>
              <div className="bg-zinc-950 border border-indigo-950 p-2 rounded-xl text-center shadow-sm">
                <p className="text-[9px] text-zinc-500 font-mono uppercase">SAM (North America / EU)</p>
                <p className="text-sm font-bold text-indigo-300">$2.1 Billion</p>
              </div>
            </div>
          </div>
        );
      case 'product':
        return (
          <div className="bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Cpu className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Integrated pipeline</span>
              </div>
              <h4 className="font-display font-bold text-base leading-tight text-white">Data Integration Gateway</h4>
            </div>
            <div className="flex items-center justify-between text-center text-[10px] mt-6 bg-zinc-900 border border-zinc-800 p-3 rounded-xl">
              <div>
                <p className="font-bold text-cyan-400">PMS DB</p>
                <p className="text-[8px] text-zinc-500 font-mono mt-0.5">Read</p>
              </div>
              <span className="text-zinc-600">➔</span>
              <div>
                <p className="font-bold text-white">DentAI</p>
                <p className="text-[8px] text-zinc-500 font-mono mt-0.5">Diagnose</p>
              </div>
              <span className="text-zinc-600">➔</span>
              <div>
                <p className="font-bold text-cyan-400">SMS Sync</p>
                <p className="text-[8px] text-zinc-500 font-mono mt-0.5">Booked</p>
              </div>
            </div>
          </div>
        );
      case 'businessModel':
        return (
          <div className="bg-amber-950/20 border border-amber-900/60 rounded-2xl p-6 h-full flex flex-col justify-between text-amber-200">
            <div>
              <div className="flex items-center space-x-2 text-amber-400 mb-2">
                <Coins className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Monetization Matrix</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Multi-Tier ARR</h4>
            </div>
            <div className="space-y-2 mt-4 text-[11px] font-semibold">
              <div className="bg-zinc-950 border border-amber-950 p-2.5 rounded-xl flex items-center justify-between shadow-sm text-zinc-300">
                <span>Chair-Licensed SaaS</span>
                <span className="text-amber-400 font-mono">Recurring License</span>
              </div>
              <div className="bg-zinc-950 border border-amber-950 p-2.5 rounded-xl flex items-center justify-between shadow-sm text-zinc-300">
                <span>SMS Recall Bundles</span>
                <span className="text-amber-400 font-mono">Usage Surcharge</span>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="bg-zinc-950 text-white border border-zinc-800 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Founding Synergy</span>
              </div>
              <h4 className="font-display font-bold text-base leading-tight text-white">Venture Cap-Ready Team</h4>
            </div>
            <div className="space-y-3 mt-6">
              <div className="flex items-center space-x-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="w-7 h-7 rounded-lg bg-cyan-400 flex items-center justify-center text-slate-950 font-bold text-xs">MD</div>
                <div>
                  <p className="text-xs font-bold leading-none text-white">Clinical Founder</p>
                  <p className="text-[8px] text-zinc-400 font-mono mt-0.5">DDS / Healthcare Practice Vet</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800">
                <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs">ML</div>
                <div>
                  <p className="text-xs font-bold leading-none text-white">AI Architecture Head</p>
                  <p className="text-[8px] text-zinc-400 font-mono mt-0.5">Computer Science Senior Staff</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ask':
        return (
          <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-2xl p-6 h-full flex flex-col justify-between text-emerald-200">
            <div>
              <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                <Rocket className="w-5 h-5" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Execution Roadmap</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">Allocation of Ask</h4>
            </div>
            <div className="space-y-2 mt-4 text-[11px] font-semibold">
              <div className="bg-zinc-950 border border-emerald-950 p-2.5 rounded-xl flex items-center justify-between shadow-sm text-zinc-300">
                <span>PMS Integrations & Engineering</span>
                <span className="text-emerald-400 font-mono">60%</span>
              </div>
              <div className="bg-zinc-950 border border-emerald-950 p-2.5 rounded-xl flex items-center justify-between shadow-sm text-zinc-300">
                <span>Distributor Partner channels</span>
                <span className="text-emerald-400 font-mono">25%</span>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 h-full flex items-center justify-center">
            <Presentation className="w-12 h-12 text-zinc-700 animate-pulse" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              07 Venture Fundraising Blueprint
            </span>
            <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
              Investor Pitch Deck
            </h2>
            <p className="text-zinc-400 mt-2 text-sm max-w-xl">
              Pitch deck outline structured for venture seeds. Click through slides to inspect narrative structures, corporate problems, and asking allocations.
            </p>
          </div>
          <div className="flex items-center space-x-2 self-start md:self-center flex-wrap gap-y-2">
            <button
              id="pitch-prev-button"
              type="button"
              onClick={handlePrev}
              disabled={currentSlideIdx === 0}
              className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-750 hover:text-white disabled:opacity-30 rounded-xl transition-all cursor-pointer shadow-sm"
              title="Previous Slide"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-zinc-400 px-3 bg-zinc-950 py-2 rounded-xl border border-zinc-800">
              Slide {currentSlideIdx + 1} of {deck.slides.length}
            </span>
            <button
              id="pitch-next-button"
              type="button"
              onClick={handleNext}
              disabled={currentSlideIdx === deck.slides.length - 1}
              className="p-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 hover:border-zinc-750 hover:text-white disabled:opacity-30 rounded-xl transition-all cursor-pointer shadow-sm"
              title="Next Slide"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              id="export-pptx-button"
              type="button"
              onClick={handleExportPPTX}
              disabled={isExporting}
              className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-sm ml-2"
              title="Export Presentation to Microsoft PowerPoint (.pptx)"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Exporting...' : 'Download PPTX'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Slide Canvas Board */}
      <div className="bg-zinc-900 border-2 border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative min-h-[440px] flex flex-col justify-between">
        {/* Slide Title Banner */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5 mb-6">
          <div className="flex items-center space-x-2.5">
            <Presentation className="w-4.5 h-4.5 text-cyan-400" />
            <span className="font-display font-bold text-white text-xs uppercase tracking-widest">{brandName} Seed Presentation</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-md uppercase tracking-wider border border-zinc-800/50">
            Category: {currentSlide.layoutType}
          </span>
        </div>

        {/* Slide Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 items-center">
          {/* Text Left Column (3/5 width) */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none">
                {currentSlide.title}
              </h3>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed font-light">
                {currentSlide.subtitle}
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {currentSlide.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-start space-x-3 text-xs leading-relaxed text-zinc-300">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">■</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Right Column (2/5 width) */}
          <div className="lg:col-span-2 h-full min-h-[220px] lg:min-h-0">
            {renderSlideVisual(currentSlide.layoutType)}
          </div>
        </div>

        {/* Bottom Slide Nav Indicator Row */}
        <div className="border-t border-zinc-800 pt-5 mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            {deck.slides.map((_, sIdx) => (
              <button
                key={sIdx}
                id={`slide-dot-${sIdx}`}
                type="button"
                onClick={() => setCurrentSlideIdx(sIdx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIdx === sIdx ? 'bg-cyan-500 ring-4 ring-cyan-950' : 'bg-zinc-800 hover:bg-zinc-700'
                }`}
                title={`Go to slide ${sIdx + 1}`}
              />
            ))}
          </div>

          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
            Section Progress: {((currentSlideIdx + 1) / deck.slides.length * 100).toFixed(0)}% Finished
          </p>
        </div>
      </div>
    </div>
  );
}
