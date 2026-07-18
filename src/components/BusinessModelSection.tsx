import React from 'react';
import { BusinessModelAsset } from '../types';
import { Briefcase, Link2, CheckSquare, Users, Coins, TrendingDown, Target } from 'lucide-react';

interface BusinessModelSectionProps {
  model: BusinessModelAsset;
  brandName: string;
}

export default function BusinessModelSection({ model, brandName }: BusinessModelSectionProps) {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
            04 Enterprise Architecture Canvas
          </span>
          <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
            Lean Business Canvas
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl">
            A comprehensive strategic management blueprint framing key partners, core value drivers, monetization streams, and corporate cost layers.
          </p>
        </div>
      </div>

      {/* Lean Canvas Grid Structure */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Key Partners */}
        <div className="md:col-span-1 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400">
            <Link2 className="w-4 h-4" />
            <h3 className="font-display font-bold text-white text-sm tracking-tight">Key Partners</h3>
          </div>
          <p className="text-[11px] text-zinc-500">Strategic alliances and core platform providers needed for distribution and operation.</p>
          <div className="space-y-2.5">
            {model.keyPartners.map((item, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-xs text-zinc-300 font-medium leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Key Activities & Resources */}
        <div className="md:col-span-1 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-indigo-400">
            <CheckSquare className="w-4 h-4" />
            <h3 className="font-display font-bold text-white text-sm tracking-tight">Key Activities</h3>
          </div>
          <p className="text-[11px] text-zinc-500">Core operational processes driving product development, customer success, and sales.</p>
          <div className="space-y-2.5">
            {model.keyActivities.map((item, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-xs text-zinc-300 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition (Centerpiece) */}
        <div className="md:col-span-2 bg-gradient-to-tr from-zinc-950 to-zinc-900 text-white border border-zinc-850 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 mb-3">
              <Target className="w-4.5 h-4.5" />
              <h3 className="font-display font-bold text-sm uppercase tracking-wider">Core Value Proposition</h3>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
              {model.valueProposition}
            </p>
          </div>
          <div className="border-t border-zinc-800 pt-4 mt-6">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Startup Fit Profile</p>
            <p className="text-xs text-cyan-400 font-medium mt-1">Unique Product Market Fit formulated for: {brandName}</p>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="md:col-span-1 bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <Users className="w-4 h-4" />
            <h3 className="font-display font-bold text-white text-sm tracking-tight">Customer Segments</h3>
          </div>
          <p className="text-[11px] text-zinc-500">The primary target personas, businesses, and demographics buying your service.</p>
          <div className="space-y-2.5">
            {model.customerSegments.map((item, idx) => (
              <div key={idx} className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-xs text-zinc-300 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Canvas Row: Costs & Revenues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cost Structure */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-rose-400 border-b border-zinc-800/50 pb-2">
            <TrendingDown className="w-4.5 h-4.5" />
            <h3 className="font-display font-bold text-white text-sm">Cost Structure</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {model.costStructure.map((item, idx) => (
              <div key={idx} className="bg-zinc-950 p-3 rounded-xl text-xs text-zinc-300 border border-zinc-850/50 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-md space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 border-b border-zinc-800/50 pb-2">
            <Coins className="w-4.5 h-4.5" />
            <h3 className="font-display font-bold text-white text-sm">Revenue Streams</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {model.revenueStreams.map((item, idx) => (
              <div key={idx} className="bg-zinc-950 p-3 rounded-xl text-xs text-zinc-300 border border-zinc-850/50 leading-relaxed">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
