import { useState } from 'react';
import { Snowflake, Zap, DollarSign, Calendar } from 'lucide-react';

const AC_WATTS = 2861; // Lennox 13ACXN024: 11.22A compressor + 0.7A fan @ 240V

export default function App() {
  const [dailyHours, setDailyHours] = useState(5);
  const [rate, setRate] = useState(0.15303);
  const [daysPerMonth, setDaysPerMonth] = useState(30);

  const dailyKwh = (AC_WATTS * dailyHours) / 1000;
  const dailyCost = dailyKwh * rate;
  const monthlyKwh = dailyKwh * daysPerMonth;
  const monthlyCost = dailyCost * daysPerMonth;
  const seasonKwh = monthlyKwh * 4; // rough 4-month cooling season
  const seasonCost = monthlyCost * 4;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-1">
          <Snowflake className="w-7 h-7 text-cyan-400" />
          <h1 className="text-2xl font-bold tracking-tight">AC Energy Cost Calculator</h1>
        </div>
        <p className="text-slate-400 text-sm mb-1">Lennox 13ACXN024-230A23 · fixed at {AC_WATTS.toLocaleString()}W</p>
        <p className="text-slate-500 text-xs mb-8">Plug in your Ecobee runtime and get real dollar numbers.</p>

        {/* Runtime */}
        <div className="bg-slate-900 rounded-xl p-5 mb-4 border border-slate-800">
          <label className="text-sm font-semibold text-slate-300 mb-3 block">Daily Compressor Runtime (from Ecobee)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="20"
              step="0.25"
              value={dailyHours}
              onChange={(e) => setDailyHours(parseFloat(e.target.value))}
              className="flex-1 accent-cyan-500"
            />
            <span className="text-cyan-400 font-bold text-base w-20 text-right">{dailyHours} hrs</span>
          </div>
        </div>

        {/* Rate */}
        <div className="bg-slate-900 rounded-xl p-5 mb-6 border border-slate-800">
          <label className="text-sm font-semibold text-slate-300 mb-3 block">Electric Rate ($/kWh)</label>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setRate(0.15303)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${rate === 0.15303 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Summer (Jul–Oct)<br /><span className="font-bold">$0.15303</span>
            </button>
            <button
              onClick={() => setRate(0.1127)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium transition ${rate === 0.1127 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'}`}
            >
              Non-Summer<br /><span className="font-bold">$0.11270</span>
            </button>
          </div>
          <input
            type="number"
            step="0.00001"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-800 rounded-lg px-3 py-2 text-slate-100 text-sm outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-slate-500 mt-2">Loveland Water & Power Schedule R rates, effective Jan 2026. Doesn't include $20.97/mo base charge.</p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Zap className="w-3.5 h-3.5" /> Daily
            </div>
            <p className="text-xl font-bold text-white">{dailyKwh.toFixed(2)} kWh</p>
            <p className="text-cyan-400 text-sm font-medium">${dailyCost.toFixed(2)}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
              <Calendar className="w-3.5 h-3.5" /> Monthly
            </div>
            <p className="text-xl font-bold text-white">{monthlyKwh.toFixed(0)} kWh</p>
            <p className="text-cyan-400 text-sm font-medium">${monthlyCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-950 to-slate-900 rounded-xl p-5 border border-cyan-900/50">
          <div className="flex items-center gap-2 text-cyan-300 text-xs mb-1 font-medium">
            <DollarSign className="w-3.5 h-3.5" /> ~4-Month Cooling Season Estimate
          </div>
          <p className="text-2xl font-bold text-white">${seasonCost.toFixed(0)}</p>
          <p className="text-slate-400 text-xs mt-1">{seasonKwh.toFixed(0)} kWh total, just for AC</p>
        </div>

        <p className="text-xs text-slate-600 mt-6 text-center">
          Just update the runtime slider as your Ecobee average changes week to week.
        </p>
      </div>
    </div>
  );
}
