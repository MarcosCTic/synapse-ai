import React, { useState, useEffect } from 'react';
import { BrainCircuit, Play, ArrowDown, Sparkles, Activity, ShieldAlert, Database, Cpu, Network } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const [counters, setCounters] = useState({
    models: 14890,
    dataTB: 842.4,
    predictions: 1849200,
    threats: 3418,
  });

  // Dynamic ticking counters to reflect live matrix computation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => ({
        models: prev.models + Math.floor(Math.random() * 2),
        dataTB: +(prev.dataTB + (Math.random() * 0.05)).toFixed(1),
        predictions: prev.predictions + Math.floor(Math.random() * 15 + 5),
        threats: Math.random() > 0.6 ? prev.threats + 1 : prev.threats,
      }));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="inicio" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Glow gradient accent backdrop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top telemetry tag */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            <span>PLATAFORMA INTERACTIVA DE INVESTIGACIÓN Y APRENDIZAJE</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>LATENCIA DE INFERENCIA: ~12ms</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 
            id="hero-main-title"
            className="text-4xl sm:text-6xl md:text-7xl font-tech font-extrabold tracking-tight text-white uppercase"
          >
            <span className="block text-slate-300">PLATAFORMA DE</span>
            <span className="bg-gradient-to-r from-cyan-400 via-[#00ff66] to-blue-500 bg-clip-text text-transparent text-glow-cyan">
              INTELIGENCIA ARTIFICIAL
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-xl md:text-2xl font-mono text-cyan-300/90 font-medium tracking-wide">
            Machine Learning • Data Science • Tecnologías Emergentes
          </p>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explora las fronteras del conocimiento computacional: redes neuronales profundas, modelos generativos, algoritmos de aprendizaje estadístico y ciberdefensa automatizada a través de simulaciones en tiempo real.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('ia-conceptos')}
              id="hero-explore-ai-btn"
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-tech text-lg font-bold tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
            >
              <BrainCircuit className="w-5 h-5 text-slate-950" />
              <span>EXPLORAR IA</span>
            </button>

            <button
              onClick={() => scrollToSection('playground')}
              id="hero-launch-playground-btn"
              className="px-6 py-3.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-cyan-300 border border-cyan-400/50 hover:border-cyan-300 font-tech text-lg font-bold tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              <span>INICIAR PLAYGROUND</span>
            </button>
          </div>
        </div>

        {/* 4 Animated Live Counters */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto" id="hero-live-metrics">
          {/* Models */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Modelos Analizados</span>
              <Cpu className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {counters.models.toLocaleString('es-ES')}
            </div>
            <div className="mt-1 text-[11px] font-mono text-cyan-400/80 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span>Entrenamientos validados</span>
            </div>
          </div>

          {/* Processed Data */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Datos Procesados</span>
              <Database className="w-4 h-4 text-[#00ff66] group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {counters.dataTB.toLocaleString('es-ES')} <span className="text-sm font-normal text-slate-400">TB</span>
            </div>
            <div className="mt-1 text-[11px] font-mono text-emerald-400/80 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Ingesta continua</span>
            </div>
          </div>

          {/* Predictions */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Predicciones Realizadas</span>
              <Network className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {counters.predictions.toLocaleString('es-ES')}
            </div>
            <div className="mt-1 text-[11px] font-mono text-blue-400/80 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Inferencia en vivo</span>
            </div>
          </div>

          {/* Threats */}
          <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Amenazas Detectadas</span>
              <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {counters.threats.toLocaleString('es-ES')}
            </div>
            <div className="mt-1 text-[11px] font-mono text-rose-400/80 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>100% aisladas por IDS</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => scrollToSection('ia-conceptos')}
            className="text-slate-400 hover:text-cyan-400 flex flex-col items-center gap-1 transition-colors group cursor-pointer"
            aria-label="Desplazar hacia abajo"
          >
            <span className="text-[11px] font-mono tracking-widest text-slate-500 group-hover:text-cyan-400">EXPLORAR CONTENIDOS</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
