import React, { useState } from 'react';

// --- 🛠 MOCK DATA & TYPES ---

interface Asset {
  id: string;
  name: string;
  ticker: string;
  type: 'Equity' | 'Mutual Fund' | 'Gold' | 'Bond' | 'Cash';
  invested: number;
  current: number;
  qty: number;
  avgPrice: number;
  risk: 'Low' | 'Medium' | 'High';
}

const MOCK_HOLDINGS: Asset[] = [
  { id: '1', name: 'Reliance Industries', ticker: 'RELIANCE', type: 'Equity', invested: 150000, current: 185000, qty: 60, avgPrice: 2500, risk: 'High' },
  { id: '2', name: 'HDFC Bank', ticker: 'HDFCBANK', type: 'Equity', invested: 200000, current: 195000, qty: 120, avgPrice: 1666, risk: 'Medium' },
  { id: '3', name: 'Parag Parikh Flexi Cap', ticker: 'PPFAS', type: 'Mutual Fund', invested: 300000, current: 420000, qty: 5000, avgPrice: 60, risk: 'Medium' },
  { id: '4', name: 'Sovereign Gold Bond', ticker: 'SGB-2028', type: 'Gold', invested: 100000, current: 135000, qty: 20, avgPrice: 5000, risk: 'Low' },
  { id: '5', name: 'Liquid Bees', ticker: 'LIQUID', type: 'Cash', invested: 50000, current: 52000, qty: 50, avgPrice: 1000, risk: 'Low' },
  { id: '6', name: 'US Tech ETF', ticker: 'MON100', type: 'Equity', invested: 100000, current: 80000, qty: 1000, avgPrice: 100, risk: 'High' },
];

// --- 🧠 ANALYTICS HELPER FUNCTIONS ---

const formatCurrency = (val: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

const calculatePortfolioHealth = (equityPerc: number, diversificationScore: number) => {
  if (diversificationScore > 80 && equityPerc < 75) return { status: 'Healthy', color: 'text-emerald-700', bg: 'bg-emerald-100', border: 'border-emerald-200' };
  if (diversificationScore > 50) return { status: 'Needs Attention', color: 'text-amber-700', bg: 'bg-amber-100', border: 'border-amber-200' };
  return { status: 'High Risk', color: 'text-rose-700', bg: 'bg-rose-100', border: 'border-rose-200' };
};

// --- ⚛️ MAIN COMPONENT ---

export default function Portfolio() {
  const [stressScenario, setStressScenario] = useState<'None' | 'Crash' | 'Bull' | 'RateHike'>('None');
  const [timeTravel, setTimeTravel] = useState<'Now' | '1M' | '6M' | '1Y'>('Now');

  // 1. Core Calculations
  const totalInvested = MOCK_HOLDINGS.reduce((acc, item) => acc + item.invested, 0);
  const totalCurrentReal = MOCK_HOLDINGS.reduce((acc, item) => acc + item.current, 0);

  // 2. Stress Test Simulation Logic
  const getSimulatedValue = (current: number, type: Asset['type']) => {
    switch (stressScenario) {
      case 'Crash':
        if (type === 'Equity' || type === 'Mutual Fund') return current * 0.80;
        if (type === 'Gold') return current * 1.05;
        if (type === 'Bond') return current * 1.02;
        return current;
      case 'Bull':
        if (type === 'Equity' || type === 'Mutual Fund') return current * 1.25;
        if (type === 'Gold') return current * 0.98;
        return current;
      case 'RateHike':
        if (type === 'Bond') return current * 0.95;
        if (type === 'Equity') return current * 0.90;
        if (type === 'Cash') return current * 1.02;
        return current;
      default:
        return current;
    }
  };

  const totalCurrent = MOCK_HOLDINGS.reduce((acc, item) => acc + getSimulatedValue(item.current, item.type), 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPercent = (totalPnL / totalInvested) * 100;

  // 3. Asset Allocation
  const allocation = MOCK_HOLDINGS.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + getSimulatedValue(item.current, item.type);
    return acc;
  }, {} as Record<string, number>);

  // 4. Portfolio DNA & Insights
  const equityExposure = ((allocation['Equity'] || 0) + (allocation['Mutual Fund'] || 0)) / totalCurrent * 100;
  const diversificationScore = Object.keys(allocation).length * 20;
  const health = calculatePortfolioHealth(equityExposure, diversificationScore);

  const insights = [];
  if (equityExposure > 75) insights.push({ type: 'warning', title: 'Equity Overweight', text: 'Over-exposure to Equity (>75%). Consider shifting profits to Debt/Gold.' });
  if (allocation['Gold'] && allocation['Gold'] / totalCurrent < 0.05) insights.push({ type: 'info', title: 'Add Gold', text: 'Gold allocation is low. Add 5% for hedge against crashes.' });
  const volatility = equityExposure * 0.2;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">

      {/* HEADER */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Investor Cockpit</h1>
          <p className="text-slate-500 font-medium">Your financial command center</p>
        </div>
        <div className={`px-4 py-2 rounded-full border ${health.bg} ${health.border} ${health.color} font-bold text-sm shadow-sm flex items-center gap-2`}>
          <span>❤️ Portfolio Health: {health.status}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">

        {/* TOP ROW: NET WORTH & DNA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* NET WORTH CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Net Worth</p>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-5xl font-black text-slate-900 tracking-tight">
                    {formatCurrency(totalCurrent)}
                  </h2>
                  <div className={`flex items-center gap-1 font-bold text-lg ${totalPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    <span>{totalPnL >= 0 ? '▲' : '▼'} {Math.abs(totalPnLPercent).toFixed(2)}%</span>
                  </div>
                </div>
                <p className={`text-sm font-medium mt-1 ${totalPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {totalPnL >= 0 ? '+' : ''}{formatCurrency(totalPnL)}
                </p>
              </div>

              {/* Time Travel Pills */}
              <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                {['Now', '1M', '6M', '1Y'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeTravel(t as any)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${timeTravel === t
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bar */}
            <div className="mt-8">
              <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Asset Distribution</span>
                <span>{equityExposure.toFixed(0)}% Equity</span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-600" style={{ width: `${allocation['Equity'] / totalCurrent * 100}%` }} title="Equity"></div>
                <div className="h-full bg-purple-500" style={{ width: `${allocation['Mutual Fund'] / totalCurrent * 100}%` }} title="MF"></div>
                <div className="h-full bg-amber-400" style={{ width: `${allocation['Gold'] / totalCurrent * 100}%` }} title="Gold"></div>
                <div className="h-full bg-emerald-400" style={{ width: `${allocation['Cash'] / totalCurrent * 100}%` }} title="Cash"></div>
              </div>
            </div>
          </div>

          {/* PORTFOLIO DNA CARD */}
          <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-10 -mt-10 pointer-events-none"></div>

            <div>
              <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-6 flex items-center gap-2">
                🧬 Portfolio DNA
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-medium">Risk Profile</span>
                    <span className="font-bold text-white">{equityExposure > 70 ? 'Aggressive' : 'Balanced'}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-1000"
                      style={{ width: `${Math.min(equityExposure, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-medium">Diversification Score</span>
                    <span className="font-bold text-white">{diversificationScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-1000"
                      style={{ width: `${diversificationScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Volatility Sensitivity</p>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-red-300">Beta: {(volatility / 10).toFixed(2)}</span>
              </div>
              <p className="text-sm font-medium mt-2 text-slate-200">
                If market drops <span className="text-red-400 font-bold">10%</span>, you may drop <span className="text-red-400 font-bold">~{volatility.toFixed(1)}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: INSIGHTS & SIMULATOR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* INTELLIGENT INSIGHTS */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg text-xl">🧠</span>
              Intelligent Insights
            </h3>

            <div className="grid gap-4">
              {insights.map((insight, idx) => (
                <div key={idx} className={`p-4 rounded-xl border-l-4 flex gap-4 items-start ${insight.type === 'warning'
                    ? 'bg-amber-50 border-amber-400 text-amber-900'
                    : 'bg-blue-50 border-blue-400 text-blue-900'
                  }`}>
                  <span className="text-2xl mt-1">{insight.type === 'warning' ? '⚠️' : '💡'}</span>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">{insight.title}</h4>
                    <p className="text-sm font-medium leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              ))}

              {/* Dead Money Card */}
              {MOCK_HOLDINGS.some(h => h.current < h.invested * 0.85) && (
                <div className="p-4 rounded-xl border-l-4 bg-rose-50 border-rose-500 text-rose-900 flex gap-4 items-start">
                  <span className="text-2xl mt-1">📉</span>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide opacity-80 mb-1">Dead Money Detected</h4>
                    <p className="text-sm font-medium leading-relaxed">
                      Some assets are down &gt;15%. Review <span className="font-bold underline decoration-rose-400">US Tech ETF</span> to see if the thesis still holds.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STRESS TEST SIMULATOR */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-600 p-1.5 rounded-lg text-xl">🧪</span>
              Stress Test
            </h3>
            <p className="text-sm text-slate-500 mb-6">Simulate future market conditions.</p>

            <div className="flex-1 space-y-3">
              {[
                { id: 'None', label: 'Normal Market', icon: '🌤️' },
                { id: 'Crash', label: 'Market Crash (-20%)', icon: '⛈️' },
                { id: 'Bull', label: 'Bull Run (+25%)', icon: '🚀' },
                { id: 'RateHike', label: 'Interest Rate Hike', icon: '🏦' },
              ].map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setStressScenario(scene.id as any)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${stressScenario === scene.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md transform scale-[1.02]'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                >
                  <span className="font-semibold text-sm flex items-center gap-3">
                    <span className="text-lg">{scene.icon}</span> {scene.label}
                  </span>
                  {stressScenario === scene.id && <span className="text-xs font-bold bg-indigo-500 px-2 py-1 rounded">ACTIVE</span>}
                </button>
              ))}
            </div>

            {stressScenario !== 'None' && (
              <div className="mt-6 pt-4 border-t border-slate-100 text-center animate-pulse">
                <p className="text-xs text-slate-400 font-bold uppercase">Projected Portfolio Impact</p>
                <p className={`text-2xl font-black mt-1 ${totalCurrent > totalCurrentReal ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {totalCurrent > totalCurrentReal ? '+' : ''}
                  {((totalCurrent - totalCurrentReal) / totalCurrentReal * 100).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ROW: HOLDINGS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Holdings Performance</h3>
            <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {MOCK_HOLDINGS.length} Assets
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Asset Name</th>
                  <th className="px-6 py-4 text-center">Weight</th>
                  <th className="px-6 py-4 text-right">Invested</th>
                  <th className="px-6 py-4 text-right">Current Value</th>
                  <th className="px-6 py-4 text-right">Overall P&L</th>
                  <th className="px-6 py-4 text-center">Risk Tag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_HOLDINGS.sort((a, b) => b.current - a.current).map((asset) => {
                  const simulatedVal = getSimulatedValue(asset.current, asset.type);
                  const pnl = simulatedVal - asset.invested;
                  const pnlPerc = (pnl / asset.invested) * 100;
                  const weight = (simulatedVal / totalCurrent) * 100;

                  return (
                    <tr key={asset.id} className="hover:bg-indigo-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 text-base">{asset.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 font-medium flex gap-2">
                          <span className="bg-slate-100 px-1.5 rounded">{asset.ticker}</span>
                          <span>•</span>
                          <span>{asset.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <span className="text-xs font-bold text-slate-700">{weight.toFixed(1)}%</span>
                          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${weight}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-600">
                        {formatCurrency(asset.invested)}
                      </td>
                      <td className={`px-6 py-4 text-right font-bold text-base ${stressScenario !== 'None' ? 'text-indigo-600' : 'text-slate-800'}`}>
                        {formatCurrency(simulatedVal)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {pnl >= 0 ? '+' : ''}{formatCurrency(pnl)}
                        </div>
                        <div className={`text-xs font-semibold mt-0.5 ${pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {pnlPerc.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border
                          ${asset.risk === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                            asset.risk === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                          {asset.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}