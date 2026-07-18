import React, { useState } from 'react';
import { BuyerAcquisitionAsset } from '../types';
import { Mail, Check, Copy, Link2, Key, Target, Sparkles, MessageSquare, ListTodo } from 'lucide-react';

interface BuyerAcquisitionSectionProps {
  acquisition: BuyerAcquisitionAsset;
  brandName: string;
}

export default function BuyerAcquisitionSection({ acquisition, brandName }: BuyerAcquisitionSectionProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(label);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getComplexityBadge = (complexity: string) => {
    const clean = complexity.toLowerCase();
    if (clean.includes("low")) {
      return <span className="inline-block px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">Low</span>;
    }
    if (clean.includes("high")) {
      return <span className="inline-block px-2.5 py-1 bg-rose-950/40 text-rose-400 border border-rose-800/40 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">High</span>;
    }
    return <span className="inline-block px-2.5 py-1 bg-amber-950/40 text-amber-400 border border-amber-800/40 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono">Medium</span>;
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
            08 Go-To-Market (GTM) Playbook
          </span>
          <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
            Acquisition Package
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl">
            Complete high-converting outbound copy templates and organic marketing channels custom-tailored to acquire early pilot customers.
          </p>
        </div>
      </div>

      {/* Outer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Outbound Email Templates (Simulated Client View) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
              <Mail className="w-4.5 h-4.5 text-cyan-400" />
              <span>Cold Outreach Email</span>
            </div>
            <button
              id="copy-cold-email"
              type="button"
              onClick={() => handleCopy(acquisition.coldEmailTemplate, 'email')}
              className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 hover:border-zinc-750 hover:bg-zinc-900 text-zinc-300 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              {copiedType === 'email' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copied Email</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>

          <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900 shadow-md flex flex-col h-[400px]">
            {/* Window bar */}
            <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-850/60 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-rose-500/80 rounded-full inline-block" />
              <span className="w-2.5 h-2.5 bg-amber-500/80 rounded-full inline-block" />
              <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded-full inline-block" />
              <span className="text-[10px] text-zinc-500 font-mono pl-4 uppercase font-bold tracking-wider">B2B Outbox Composer</span>
            </div>
            {/* Headers */}
            <div className="px-4 py-3 border-b border-zinc-850/60 space-y-1.5 text-xs bg-zinc-950/20">
              <p className="text-zinc-500"><span className="font-semibold text-zinc-300">To:</span> prospect@practice-clinic.com</p>
              <p className="text-zinc-500"><span className="font-semibold text-zinc-300">From:</span> sales@{brandName.toLowerCase().replace(/\s+/g, '')}.com</p>
            </div>
            {/* Body */}
            <div className="p-4 overflow-y-auto flex-1 font-sans text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap bg-zinc-950/10">
              {acquisition.coldEmailTemplate}
            </div>
          </div>
        </div>

        {/* LinkedIn direct messages & lead magnets */}
        <div className="space-y-6">
          {/* LinkedIn outreach */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
                <MessageSquare className="w-4.5 h-4.5 text-cyan-400" />
                <span>LinkedIn Connection Template</span>
              </div>
              <button
                id="copy-linkedin-template"
                type="button"
                onClick={() => handleCopy(acquisition.linkedinOutreach, 'linkedin')}
                className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-950 rounded-lg cursor-pointer transition-all border border-transparent hover:border-zinc-850"
                title="Copy LinkedIn Note"
              >
                {copiedType === 'linkedin' ? <Check className="w-4.5 h-4.5 text-cyan-400" /> : <Copy className="w-4.5 h-4.5" />}
              </button>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs text-zinc-300 leading-relaxed italic relative whitespace-pre-wrap">
              "{acquisition.linkedinOutreach}"
            </div>
          </div>

          {/* Lead Magnet Suggestions */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
              <ListTodo className="w-4.5 h-4.5 text-cyan-400" />
              <span>Recommended Lead Magnets</span>
            </div>
            <p className="text-xs text-zinc-500">High-value intellectual offerings designed to capture target customer contacts.</p>
            <div className="space-y-2.5">
              {acquisition.leadMagnetIdeas.map((idea, idx) => (
                <div key={idx} className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl flex items-start space-x-3 shadow-md hover:border-zinc-700 transition-all">
                  <div className="w-5 h-5 bg-cyan-950/40 border border-cyan-800/40 rounded-lg flex items-center justify-center font-bold text-[10px] text-cyan-400 shrink-0 mt-0.5 animate-pulse">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-semibold text-zinc-200 leading-tight">{idea}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Channels Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/60 bg-zinc-950/40">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-semibold text-white text-sm">Active Marketing Channels Matrix</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-500 uppercase font-mono text-[9px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3.5 w-1/4">Promotional Channel</th>
                <th className="px-6 py-3.5 w-12 text-center">Complexity</th>
                <th className="px-6 py-3.5">Rollout Execution Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {acquisition.marketingChannels.map((channel, idx) => (
                <tr key={idx} className="hover:bg-zinc-950/40">
                  <td className="px-6 py-4 font-semibold text-white">{channel.channel}</td>
                  <td className="px-6 py-4 text-center">{getComplexityBadge(channel.complexity)}</td>
                  <td className="px-6 py-4 text-xs text-zinc-400 leading-relaxed font-light">{channel.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
