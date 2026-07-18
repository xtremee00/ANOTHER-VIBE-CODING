import React, { useState, useEffect } from 'react';
import { FinancialForecastAsset, YearForecast } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Sliders, TrendingUp, DollarSign, Users, Percent, ShieldCheck } from 'lucide-react';

interface FinancialForecastSectionProps {
  forecast: FinancialForecastAsset;
}

export default function FinancialForecastSection({ forecast }: FinancialForecastSectionProps) {
  // Extract initial values from the generated forecast
  const defaultGrowth = forecast.assumptions.growthRate || 15;
  const defaultCustomers = forecast.assumptions.initialCustomers || 10;
  const defaultArpu = forecast.assumptions.averageRevenuePerCustomer || 600;

  // Sliders state
  const [growthRate, setGrowthRate] = useState(defaultGrowth);
  const [initialCustomers, setInitialCustomers] = useState(defaultCustomers);
  const [arpu, setArpu] = useState(defaultArpu);
  const [computedForecast, setComputedForecast] = useState<YearForecast[]>([]);

  // Dynamically compute the 5-year forecasts based on interactive values
  useEffect(() => {
    const updatedForecasts: YearForecast[] = [];
    let customers = initialCustomers;

    for (let i = 1; i <= 5; i++) {
      if (i > 1) {
        customers = Math.round(customers * (1 + growthRate / 100));
      }
      const revenue = Math.round(customers * arpu * 12);
      // Expenses reflect scaling efficiencies: initially 50%, sliding down to 35% of revenue over 5 years.
      const marginFactor = 0.52 - (i - 1) * 0.04;
      const expenses = Math.round(revenue * Math.max(0.32, marginFactor));
      const profit = revenue - expenses;

      updatedForecasts.push({
        year: i,
        customers,
        revenue,
        expenses,
        profit
      });
    }
    setComputedForecast(updatedForecasts);
  }, [growthRate, initialCustomers, arpu]);

  // Format currency helpers
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value}`;
  };

  const formatLongCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  };

  // Metrics targets for displays
  const year5ARR = computedForecast[4]?.revenue || 0;
  const year5Profit = computedForecast[4]?.profit || 0;
  const averageMargin = computedForecast.length
    ? computedForecast.reduce((acc, curr) => acc + (curr.profit / curr.revenue) * 100, 0) / computedForecast.length
    : 0;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header Info */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div>
          <span className="px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wide rounded-full">
            06 Quantitative Forecast Modeling
          </span>
          <h2 className="font-display font-bold text-3xl text-white mt-3 tracking-tight">
            Financial Projections
          </h2>
          <p className="text-zinc-400 mt-2 text-sm max-w-xl">
            Interactive five-year operating model with dynamic scenario analysis. Modify ARPU, scale acceleration, and base active clients in real time.
          </p>
        </div>
      </div>

      {/* Metrics Summary Panels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-cyan-400 mb-1">
            <DollarSign className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Year 5 ARR Target</span>
          </div>
          <p className="font-display font-bold text-2xl text-white">{formatLongCurrency(year5ARR)}</p>
          <p className="text-[10px] text-zinc-400">Formulated on yearly recurring licensing.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-emerald-400 mb-1">
            <Percent className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Average Net Margin</span>
          </div>
          <p className="font-display font-bold text-2xl text-white">{averageMargin.toFixed(1)}%</p>
          <p className="text-[10px] text-zinc-400">Reflects software operating leverage over 5 years.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl shadow-md space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">Year 5 Profitability</span>
          </div>
          <p className="font-display font-bold text-2xl text-white">{formatLongCurrency(year5Profit)}</p>
          <p className="text-[10px] text-zinc-400">Projected pre-tax enterprise income stream.</p>
        </div>
      </div>

      {/* Main Core Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Sliders Board */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md space-y-6 self-start">
          <div className="flex items-center space-x-2 text-white border-b border-zinc-800 pb-2 mb-4">
            <Sliders className="w-4.5 h-4.5 text-cyan-400" />
            <h3 className="font-display font-bold text-sm">Interactive Parameters</h3>
          </div>

          {/* Slider 1: Initial Customers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-initial-customers" className="text-xs font-semibold text-zinc-300">Initial Customers (Y1)</label>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded-lg">
                {initialCustomers} accounts
              </span>
            </div>
            <input
              id="slider-initial-customers"
              type="range"
              min="2"
              max="50"
              value={initialCustomers}
              onChange={(e) => setInitialCustomers(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-zinc-950 border border-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <span className="text-[10px] text-zinc-500 block">Baseline practice accounts onboarded during Year 1.</span>
          </div>

          {/* Slider 2: ARPU */}
          <div className="space-y-2 border-t border-zinc-800 pt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-arpu" className="text-xs font-semibold text-zinc-300">Monthly Contract Value (ARPU)</label>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/40 border border-indigo-800/40 px-2.5 py-0.5 rounded-lg">
                ${arpu}/mo
              </span>
            </div>
            <input
              id="slider-arpu"
              type="range"
              min="100"
              max="3000"
              step="50"
              value={arpu}
              onChange={(e) => setArpu(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-zinc-950 border border-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[10px] text-zinc-500 block">Average monthly licensing contract fee per physical practice.</span>
          </div>

          {/* Slider 3: Growth Rate */}
          <div className="space-y-2 border-t border-zinc-800 pt-5">
            <div className="flex items-center justify-between">
              <label htmlFor="slider-growth-rate" className="text-xs font-semibold text-zinc-300">Annual Scaling CAGR</label>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-0.5 rounded-lg">
                +{growthRate}% YoY
              </span>
            </div>
            <input
              id="slider-growth-rate"
              type="range"
              min="5"
              max="150"
              value={growthRate}
              onChange={(e) => setGrowthRate(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-zinc-950 border border-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[10px] text-zinc-500 block">The compounded annual customer account growth rate from Year 2 to Year 5.</span>
          </div>
        </div>

        {/* Dynamic Charts Stage */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-md flex flex-col h-[350px]">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4 font-bold">Five-Year Operating Projection Visualizer</span>
          <div className="flex-1 min-h-0 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={computedForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0891b2" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} stroke="#71717a" fontSize={11} />
                <YAxis tickFormatter={formatCurrency} stroke="#71717a" fontSize={11} />
                <Tooltip
                  formatter={(value: number) => [formatLongCurrency(value), ""]}
                  labelFormatter={(label) => `Projection: Year ${label}`}
                  contentStyle={{ backgroundColor: 'var(--color-zinc-950)', borderRadius: '12px', border: '1px solid var(--color-zinc-800)', fontFamily: 'sans-serif', color: '#f4f4f5' }}
                />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', fontFamily: 'sans-serif', paddingTop: '10px', color: '#a1a1aa' }} />
                <Area name="Revenue (ARR)" type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area name="Net Profit" type="monotone" dataKey="profit" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Structured Financial Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800/60 bg-zinc-950/40">
          <h3 className="font-display font-semibold text-white text-sm">Operating Income Statement (P&L)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-500 uppercase font-mono text-[9px] tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3.5">Fiscal Year</th>
                <th className="px-6 py-3.5 text-center">Active Clients</th>
                <th className="px-6 py-3.5">Gross Revenue (ARR)</th>
                <th className="px-6 py-3.5">Operating Expenses</th>
                <th className="px-6 py-3.5 font-bold text-cyan-400">Net profit</th>
                <th className="px-6 py-3.5">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {computedForecast.map((row) => {
                const margin = ((row.profit / row.revenue) * 100).toFixed(0);
                return (
                  <tr key={row.year} className="hover:bg-zinc-950/40">
                    <td className="px-6 py-3.5 font-semibold text-white font-mono">Year {row.year}</td>
                    <td className="px-6 py-3.5 text-center font-medium font-mono text-zinc-100">{row.customers}</td>
                    <td className="px-6 py-3.5 font-mono">{formatLongCurrency(row.revenue)}</td>
                    <td className="px-6 py-3.5 text-zinc-500 font-mono">{formatLongCurrency(row.expenses)}</td>
                    <td className="px-6 py-3.5 font-bold text-cyan-400 font-mono">{formatLongCurrency(row.profit)}</td>
                    <td className="px-6 py-3.5">
                      <span className="inline-block px-2 py-0.5 bg-cyan-950/40 text-cyan-400 border border-cyan-800/30 rounded-md font-mono text-[10px] font-semibold">
                        {margin}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex items-center space-x-3 text-xs text-zinc-400">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
        <span>
          <strong>Unit Economics Guard:</strong> The operating expenditure model maintains standard SaaS scaling parameters with 45% infrastructure-and-GPU cost decay as operations swell, mirroring high-leverage business metrics.
        </span>
      </div>
    </div>
  );
}
