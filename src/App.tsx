import React, { useState, useEffect } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AIConceptsSection } from './components/AIConceptsSection';
import { MachineLearningSection } from './components/MachineLearningSection';
import { DataScienceSection } from './components/DataScienceSection';
import { NeuralNetworkVisualizer } from './components/NeuralNetworkVisualizer';
import { GenerativeAISection } from './components/GenerativeAISection';
import { AIPlayground } from './components/AIPlayground';
import { DataScienceDashboard } from './components/DataScienceDashboard';
import { CybersecuritySection } from './components/CybersecuritySection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { TechnologiesSection } from './components/TechnologiesSection';
import { EthicsFutureSection } from './components/EthicsFutureSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Footer } from './components/Footer';

export default function App() {
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('inicio');

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'inicio',
      'ia-conceptos',
      'machine-learning',
      'ciencia-datos',
      'redes-neuronales',
      'ia-generativa',
      'playground',
      'dashboard',
      'ciberseguridad',
      'aplicaciones',
      'tecnologias',
      'etica-futuro',
      'terminal',
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut (Backquote or T) to toggle CLI modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '`' || e.key === '~') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsTerminalModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300 relative font-sans overflow-x-hidden">
      {/* Dynamic 2D Canvas Neural & Particle Matrix Background */}
      <CyberBackground />

      {/* Floating Header Navbar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections Flow */}
      <main className="relative z-10">
        {/* 01. Hero Section with Live Matrix Telemetry */}
        <HeroSection />

        {/* 02. Fundamentos de Inteligencia Artificial & Timeline Histórica */}
        <AIConceptsSection />

        {/* 03. Machine Learning (Supervisado, No Supervisado, RL & Simulador de Regresión) */}
        <MachineLearningSection />

        {/* 04. Ciencia de Datos (Pipeline de 7 Pasos & Matriz de Correlación) */}
        <DataScienceSection />

        {/* 05. Red Neuronal Interactiva (Forward-Pass & Capas Configurables) */}
        <NeuralNetworkVisualizer />

        {/* 06. Inteligencia Artificial Generativa (Multimodal, LLM Stream & Difusión) */}
        <GenerativeAISection />

        {/* 07. AI Playground (K-Means, Frontera de Decisión, Polinomios & Anomalías) */}
        <AIPlayground />

        {/* 08. Dashboard de Data Science (KPIs en Vivo, Gráficos de Líneas, Barras, Torta & Dispersión) */}
        <DataScienceDashboard />

        {/* 09. IA y Ciberseguridad (SOC en Vivo, Ataques Simulados & 6 Pilares) */}
        <CybersecuritySection />

        {/* 10. Aplicaciones de la IA por Sector (Medicina, Educación, Finanzas, etc.) */}
        <ApplicationsSection />

        {/* 11. Tecnologías y Herramientas (Python, PyTorch, TF, Docker, SQL, etc.) */}
        <TechnologiesSection />

        {/* 12. Ética y Futuro de la IA (Sesgos, Privacidad, XAI, Gobernanza & AGI) */}
        <EthicsFutureSection />

        {/* 13. Terminal Interactiva CLI Embebida */}
        <InteractiveTerminal />
      </main>

      {/* Footer */}
      <Footer />

      {/* Popup CLI Terminal Modal (Triggered by Navbar or shortcut `) */}
      {isTerminalModalOpen && (
        <InteractiveTerminal
          isModal={true}
          onClose={() => setIsTerminalModalOpen(false)}
        />
      )}
    </div>
  );
}
