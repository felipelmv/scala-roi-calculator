"use client";

import React, { useState, useEffect } from "react";
import { DollarSign, MousePointer2, Users, TrendingUp, ArrowRight, Activity } from "lucide-react";

export default function ROICalculator() {
  const [budget, setBudget] = useState(5000);
  const [cpc, setCpc] = useState(2.50);
  const [conversionRate, setConversionRate] = useState(3.5);
  const [closeRate, setCloseRate] = useState(20);
  const [ticket, setTicket] = useState(1500);

  // Animação de números (simplificada)
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
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500/30">
      
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">Scala<span className="text-green-500">.</span>Calculator</span>
          </div>
          <button className="text-sm text-gray-400 hover:text-white transition">Fale com um Especialista</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Coluna Esquerda: Controles */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Simule seu Potencial de <span className="text-green-500">Crescimento</span></h1>
              <p className="text-gray-400 text-lg">Ajuste as métricas abaixo para ver o impacto no seu faturamento.</p>
            </div>

            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              <SliderInput 
                label="Investimento Mensal (Ads)" 
                value={budget} 
                setValue={setBudget} 
                min={1000} 
                max={50000} 
                step={500} 
                prefix="R$" 
              />
              <SliderInput 
                label="Custo por Clique (CPC)" 
                value={cpc} 
                setValue={setCpc} 
                min={0.5} 
                max={50} 
                step={0.1} 
                prefix="R$" 
              />
              <SliderInput 
                label="Taxa de Conversão (Site)" 
                value={conversionRate} 
                setValue={setConversionRate} 
                min={0.1} 
                max={20} 
                step={0.1} 
                suffix="%" 
              />
              <SliderInput 
                label="Taxa de Fechamento (Vendas)" 
                value={closeRate} 
                setValue={setCloseRate} 
                min={1} 
                max={100} 
                step={1} 
                suffix="%" 
              />
              <SliderInput 
                label="Ticket Médio (LTV)" 
                value={ticket} 
                setValue={setTicket} 
                min={100} 
                max={10000} 
                step={50} 
                prefix="R$" 
              />
            </div>
          </div>

          {/* Coluna Direita: Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Big Number: Receita */}
            <div className="bg-gradient-to-br from-green-900/20 to-gray-900 border border-green-500/20 rounded-3xl p-10 text-center relative overflow-hidden group hover:border-green-500/40 transition-all duration-500">
              <div className="absolute inset-0 bg-green-500/5 blur-3xl group-hover:bg-green-500/10 transition-all duration-500"></div>
              <p className="text-gray-400 uppercase tracking-widest text-sm font-semibold mb-4">Receita Projetada / Mês</p>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                {results.revenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </h2>
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium mt-4">
                <Activity size={14} />
                ROI: {((results.revenue - budget) / budget * 100).toFixed(0)}%
              </div>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard label="Cliques" value={results.clicks.toLocaleString()} icon={<MousePointer2 size={16} />} />
              <MetricCard label="Leads" value={results.leads.toLocaleString()} icon={<Users size={16} />} />
              <MetricCard label="Vendas" value={results.sales.toLocaleString()} icon={<TrendingUp size={16} />} />
              <MetricCard label="ROAS" value={`${results.roas.toFixed(1)}x`} icon={<ArrowRight size={16} />} highlight />
            </div>

            {/* Call to Action */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold">Quer alcançar esses números?</h3>
                <p className="text-gray-400 text-sm mt-1">Fale com nossos especialistas de growth.</p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-green-400 transition-colors w-full md:w-auto">
                Agendar Consultoria
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Componentes UI Reutilizáveis

function SliderInput({ label, value, setValue, min, max, step, prefix = "", suffix = "" }) {
  return (
    <div className="group">
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-gray-300 group-hover:text-white transition">{label}</label>
        <span className="text-sm font-mono text-green-400 bg-green-900/20 px-2 rounded">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400"
      />
    </div>
  );
}

function MetricCard({ label, value, icon, highlight }) {
  return (
    <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 ${
      highlight 
        ? "bg-green-500 text-black border-green-400" 
        : "bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800"
    }`}>
      <div className={`mb-2 opacity-70 ${highlight ? "text-black" : "text-gray-400"}`}>{icon}</div>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
      <p className={`text-xs uppercase font-semibold mt-1 ${highlight ? "text-black/60" : "text-gray-500"}`}>{label}</p>
    </div>
  );
}
