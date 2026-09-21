import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, Play, Menu, X, ShieldCheck, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'ia-conceptos', label: 'IA' },
    { id: 'machine-learning', label: 'ML' },
    { id: 'ciencia-datos', label: 'Data Science' },
    { id: 'redes-neuronales', label: 'Redes Neuronales' },
    { id: 'ia-generativa', label: 'IA Generativa' },
    { id: 'playground', label: 'Playground', highlight: true },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'ciberseguridad', label: 'Ciberseguridad' },
    { id: 'aplicaciones', label: 'Aplicaciones' },
    { id: 'tecnologias', label: 'Tech Stack' },
    { id: 'etica-futuro', label: 'Ética & Futuro' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117]/90 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.7)] py-2.5'
          : 'bg-[#0d1117]/60 backdrop-blur-sm border-b border-cyan-500/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => scrollTo('inicio')}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-brand-logo"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
            <Cpu className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00ff66]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-xl font-bold tracking-widest text-white group-hover:text-cyan-300 transition-colors">
                SYNAPSE<span className="text-cyan-400">.AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                v2.6 Core
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span className="text-emerald-400 font-semibold">NEURAL NET ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1" id="nav-desktop-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all duration-200 ${
                  link.highlight
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 shadow-[0_0_12px_rgba(0,240,255,0.2)] font-semibold'
                    : isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2.5">
          {/* Quick Playground Button for md+ */}
          <button
            onClick={() => scrollTo('playground')}
            id="nav-quick-playground-btn"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-cyan-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-medium shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span>PLAYGROUND</span>
          </button>

          {/* Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            id="nav-terminal-trigger-btn"
            title="Abrir Terminal CLI Interactiva"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-mono hover:shadow-[0_0_15px_rgba(0,255,102,0.25)] transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
            <span className="hidden sm:inline">&gt;_ CLI</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="nav-mobile-toggle-btn"
            className="xl:hidden p-2 rounded bg-slate-800/80 text-cyan-400 border border-cyan-500/30 hover:bg-slate-700/80 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-drawer"
          className="xl:hidden bg-[#0d1117]/95 border-b border-cyan-500/20 px-4 pt-3 pb-5 mt-2 max-h-[80vh] overflow-y-auto"
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left px-3 py-2.5 rounded border transition-colors ${
                  link.highlight
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'bg-slate-900/60 text-slate-200 border-slate-800 hover:border-cyan-500/30 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>KERNEL: ACTIVE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>IDS: SHIELDED</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
