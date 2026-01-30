"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, MousePointer2, Users, TrendingUp, BarChart3 } from "lucide-react";

export default function ROICalculator() {
  const [budget, setBudget] = useState(5000);
  const [cpc, setCpc] = useState(2.50);
  const [conversionRate, setConversionRate] = useState(3.5); // %
  const [closeRate, setCloseRate] = useState(20); // %
  const [ticket, setTicket] = useState(1500);

  const [results, setResults] = useState({
    clicks: 0,
    leads: 0,
    sales: 0,
    revenue: 0,
    roas: 0,
  });

  useEffect(() => {
    const clicks = cpc > 0 ? budget / cpc : 0;
    const leads = clicks * (conversionRate / 100);
    const sales = leads * (closeRate / 100);
    const revenue = sales * ticket;
    const roas = budget > 0 ? revenue / budget : 0;

    setResults({
      clicks: Math.floor(clicks),
      leads: Math.floor(leads),
      sales: Math.floor(sales),
      revenue: revenue,
      roas: roas,
    });
  }, [budget, cpc, conversionRate, closeRate, ticket]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Left: Inputs */}
        <div className="p-8 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-green-400 mb-2">Scala Ventures</h1>
            <p className="text-gray-400">Simulador de ROI - Google Ads</p>
          </div>

          <div className="space-y-4">
            <InputGroup label="Investimento Mensal (R$)" icon={<DollarSign size={18} />} value={budget} onChange={setBudget} step={100} />
            <InputGroup label="CPC Médio (R$)" icon={<MousePointer2 size={18} />} value={cpc} onChange={setCpc} step={0.10} />
            <InputGroup label="Taxa de Conversão do Site (%)" icon={<BarChart3 size={18} />} value={conversionRate} onChange={setConversionRate} step={0.1} />
            <InputGroup label="Taxa de Fechamento de Vendas (%)" icon={<Users size={18} />} value={closeRate} onChange={setCloseRate} step={1} />
            <InputGroup label="Ticket Médio / LTV (R$)" icon={<TrendingUp size={18} />} value={ticket} onChange={setTicket} step={50} />
          </div>
        </div>

        {/* Right: Results */}
        <div className="bg-gray-900 p-8 flex flex-col justify-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 className="text-2xl font-semibold mb-4 z-10">Projeção de Resultados</h2>
          
          <div className="grid grid-cols-2 gap-4 z-10">
            <ResultCard label="Cliques Estimados" value={results.clicks.toLocaleString()} color="text-blue-400" />
            <ResultCard label="Leads Gerados" value={results.leads.toLocaleString()} color="text-yellow-400" />
            <ResultCard label="Vendas Fechadas" value={results.sales.toLocaleString()} color="text-purple-400" />
            <ResultCard label="ROAS" value={`${results.roas.toFixed(1)}x`} color="text-white" highlight />
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 z-10">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Receita Projetada</p>
            <p className="text-5xl font-bold text-green-400">
              {results.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, icon, value, onChange, step }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1 flex items-center gap-2">
        {icon} {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none"
      />
      <input
        type="range"
        min="0"
        max={value * 2 || 100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        step={step}
        className="w-full mt-2 accent-green-500 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function ResultCard({ label, value, color, highlight = false }) {
  return (
    <div className={`p-4 rounded-xl ${highlight ? "bg-green-600/20 border border-green-500/50" : "bg-gray-800 border border-gray-700"}`}>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
