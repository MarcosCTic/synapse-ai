import React from 'react';
import { Cpu, Terminal, Shield, ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Conceptos IA', href: '#conceptos' },
    { label: 'Machine Learning', href: '#machine-learning' },
    { label: 'Data Science', href: '#data-science' },
    { label: 'Redes Neuronales', href: '#redes-neuronales' },
    { label: 'IA Generativa', href: '#ia-generativa' },
    { label: 'AI Playground', href: '#playground' },
    { label: 'Dashboard', href: '#dashboard' },
    { label: 'Ciberseguridad', href: '#ciberseguridad' },
    { label: 'Aplicaciones', href: '#aplicaciones' },
    { label: 'Tecnologías', href: '#tecnologias' },
    { label: 'Ética & Futuro', href: '#etica-futuro' },
    { label: 'Terminal CLI', href: '#terminal' },
  ];

  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#06090e] pt-16 pb-12 overflow-hidden">
      {/* Background glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(0,240,255,0.8)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-tech text-2xl font-bold tracking-wider text-white">
                SYNAPSE <span className="text-cyan-400 text-glow-cyan">AI</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md font-sans leading-relaxed">
              Plataforma interactiva de divulgación tecnológica y experimentación en tiempo real para Inteligencia Artificial, Machine Learning y Ciencia de Datos.
            </p>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-cyan-300 inline-block">
              &quot;Construyendo el futuro de la inteligencia artificial, byte a byte.&quot;
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-tech font-bold uppercase tracking-wider text-white">
              NAVEGACIÓN RÁPIDA
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.slice(0, 7).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-cyan-500/50">›</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-tech font-bold uppercase tracking-wider text-white">
              LABORATORIOS & ÉTICA
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              {navLinks.slice(7).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-cyan-500/50">›</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Back to Top button & Credits */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Ing. Marcos Colque Ticona. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              Arquitectura Frontend Cyberpunk v4.0
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-300 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-400 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver Arriba</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
