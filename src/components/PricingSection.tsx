import React, { useState } from 'react';
import { PricingAsset, PricingTier } from '../types';
import { Check, Info, Star } from 'lucide-react';

interface PricingSectionProps {
  pricing: PricingAsset;
  brandName: string;
}

export default function PricingSection({ pricing, brandName }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Calculates discounted price if billed yearly
  const getDisplayPrice = (tier: PricingTier) => {
    const rawPrice = tier.price;
    if (rawPrice.toLowerCase().includes("custom") || rawPrice.toLowerCase().includes("contact")) {
      return { price: "Custom", period: "enterprise" };
    }

    const numericMatch = rawPrice.match(/\d+/);
    if (!numericMatch) {
      return { price: rawPrice, period: tier.period };
    }

    const monthlyValue = parseInt(numericMatch[0], 10);
    if (billingCycle === 'yearly') {
      const discountedMonthly = Math.round(monthlyValue * 0.8); // 20% off
      return { price: `$${discountedMonthly}`, period: 'month, billed yearly' };
    }

    return { price: `$${monthlyValue}`, period: 'month' };
  };

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
              05 Commercial Optimization Model
            </span>
            <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
              Value Pricing Packages
            </h2>
            <p className="text-zinc-400 mt-2 text-sm max-w-xl">
              Tiered subscription structures structured to capture maximum consumer surplus while keeping onboarding friction minimal.
            </p>
          </div>

          {/* Monthly/Yearly Billing Cycle Toggle */}
          <div className="flex items-center space-x-3 self-start md:self-center bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              id="billing-monthly-toggle"
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Billed Monthly
            </button>
            <button
              id="billing-yearly-toggle"
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1.5 text-xs rounded-lg font-bold transition-all cursor-pointer flex items-center space-x-1 ${
                billingCycle === 'yearly' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <span>Billed Yearly</span>
              <span className="bg-cyan-500 text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none">
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricing.tiers.map((tier, idx) => {
          const { price, period } = getDisplayPrice(tier);
          const isPopular = tier.isPopular;

          return (
            <div
              key={tier.name + idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                isPopular
                  ? 'bg-zinc-950 text-white border-2 border-cyan-500 shadow-2xl scale-[1.03] z-10'
                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800 shadow-md hover:border-zinc-700'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-mono text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                  <Star className="w-3 h-3 fill-black" />
                  <span>Practice Pick</span>
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className={`font-display font-bold text-lg ${isPopular ? 'text-cyan-400' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isPopular ? 'text-zinc-300' : 'text-zinc-400'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="my-6 flex items-baseline">
                  <span className={`font-display font-extrabold text-4xl tracking-tight text-white`}>
                    {price}
                  </span>
                  <span className={`text-xs font-light ml-2 font-mono ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    / {period}
                  </span>
                </div>

                <div className="border-t border-zinc-800/60 my-6" />

                <ul className="space-y-3.5">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start space-x-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-cyan-400' : 'text-cyan-500'}`} />
                      <span className={isPopular ? 'text-zinc-100' : 'text-zinc-300'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  id={`select-plan-${idx}`}
                  type="button"
                  className={`w-full py-3 rounded-xl font-bold text-xs text-center tracking-wide uppercase cursor-pointer transition-all ${
                    isPopular
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/10'
                      : 'bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100'
                  }`}
                >
                  Acquire This Tier Blueprint
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex items-start space-x-3 text-xs text-zinc-400">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>HIPAA Compliant Deployments:</strong> Every commercial tier generated is architecture-ready to support patient health records integrations. Pricing tiers can be instantly modified within your custom financial sheets.
        </p>
      </div>
    </div>
  );
}
