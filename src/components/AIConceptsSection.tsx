import React, { useState } from 'react';
import { 
  Brain, 
  History, 
  Binary, 
  Cpu, 
  GitFork, 
  MessageSquareCode, 
  Eye, 
  Sparkles, 
  Bot, 
  ArrowRight,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { AIConcept } from '../types';

export const AIConceptsSection: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<AIConcept | null>(null);
  const [activeHistoryTab, setActiveHistoryTab] = useState<number>(4);

  const concepts: AIConcept[] = [
    {
      id: 'que-es-ia',
      title: '¿Qué es la IA?',
      subtitle: 'Simulación de cognición en silicio',
      category: 'fundamento',
      iconName: 'Brain',
      description: 'Rama de la informática dedicada a construir sistemas computacionales capaces de desempeñar tareas que tradicionalmente requieren inteligencia biológica: razonamiento, deducción, aprendizaje y resolución de problemas.',
      applicationExample: 'Motores de recomendación predictiva, asistentes virtuales y optimización logística en tiempo real.',
      metric: 'Precisión predictiva > 99.2%',
      tags: ['Fundamento', 'Lógica Simbólica', 'Heurística']
    },
    {
      id: 'historia-evolucion',
      title: 'Historia & Evolución',
      subtitle: 'De la prueba de Turing a la Era de los Transformers',
      category: 'fundamento',
      iconName: 'History',
      description: 'Un recorrido apasionante desde 1950 con Alan Turing y el nacimiento formal en Dartmouth (1956), pasando por los "Inviernos de la IA", el auge del Aprendizaje Profundo en 2012, hasta los modelos fundacionales masivos actuales.',
      applicationExample: 'Transición de sistemas basados en reglas rígidas a arquitecturas conexionistas que aprenden de petabytes de datos.',
      metric: '75+ años de evolución teórica',
      tags: ['Timeline', 'Turing 1950', 'Transformers 2017']
    },
    {
      id: 'ia-debil-vs-generativa',
      title: 'IA Estrecha vs Generativa',
      subtitle: 'Especialización puntual frente a síntesis multimodal',
      category: 'fundamento',
      iconName: 'Binary',
      description: 'La IA Débil (ANI) resuelve una tarea específica de manera óptima (como clasificar correos de spam o jugar ajedrez). La IA Generativa sintetiza artefactos enteramente nuevos (texto, imagen, audio, código) comprendiendo distribuciones latentes.',
      applicationExample: 'Clasificador de radiografías (ANI) vs Asistente clínico que redacta informes médicos comprensivos (GenAI).',
      metric: 'Baja latencia especializada vs Flexibilidad creativa',
      tags: ['ANI', 'GenAI', 'AGI Roadmap']
    },
    {
      id: 'machine-learning',
      title: 'Aprendizaje Automático',
      subtitle: 'Aprender de los datos sin programación explícita',
      category: 'arquitectura',
      iconName: 'Cpu',
      description: 'Disciplina del aprendizaje inductivo en la que un algoritmo ajusta sus parámetros matemáticos mediante ejemplos empíricos para minimizar una función de coste o pérdida, permitiendo generalizar ante datos no vistos.',
      applicationExample: 'Scoring crediticio en fintech, detección de fraudes en transferencias y pronóstico de demanda de inventario.',
      metric: 'Minimización de error empírico (Loss → 0)',
      tags: ['Supervisado', 'No Supervisado', 'Gradiente Descendente']
    },
    {
      id: 'redes-neuronales',
      title: 'Redes Neuronales Artificiales',
      subtitle: 'Arquitecturas inspiradas en la neurobiología cortical',
      category: 'arquitectura',
      iconName: 'GitFork',
      description: 'Capas compuestas por unidades nodales interconectadas mediante tensores de pesos sinápticos. Emplean funciones de activación no lineales y retropropagación (backpropagation) para aproximar funciones complejas de alta dimensión.',
      applicationExample: 'Modelos de visión convolucional (CNN) y arquitecturas autoatencionales como el Transformer.',
      metric: 'Capacidad de aproximador universal de funciones',
      tags: ['Backpropagation', 'Pesos & Sesgos', 'Tensores']
    },
    {
      id: 'nlp',
      title: 'Lenguaje Natural (NLP)',
      subtitle: 'Semántica, embeddings y comprensión contextual',
      category: 'aplicacion',
      iconName: 'MessageSquareCode',
      description: 'Técnicas que permiten a las computadoras procesar, desglosar y sintetizar lenguaje humano. Utiliza embeddings vectoriales densos para capturar relaciones de significado en espacios geométricos multidimensionales.',
      applicationExample: 'Traducción simultánea, resumen extractivo y abstracto de contratos jurídicos, y chatbots contextuales.',
      metric: 'Espacios vectoriales de 4096+ dimensiones',
      tags: ['Tokenización', 'Embeddings', 'Semántica Vectorial']
    },
    {
      id: 'computer-vision',
      title: 'Visión por Computadora',
      subtitle: 'Interpretación de señales visuales y mapas espectrales',
      category: 'aplicacion',
      iconName: 'Eye',
      description: 'Algoritmos capaces de extraer información estructurada a partir de matrices bidimensionales de píxeles: detección de objetos con cajas delimitadoras, segmentación semántica a nivel de píxel y estimación de pose.',
      applicationExample: 'Pilotos automáticos de vehículos autónomos, inspección óptica automatizada en fábricas y resonancias magnéticas.',
      metric: 'Segmentación a 60 FPS en tiempo real',
      tags: ['Segmentación', 'Detección', 'CNN & ViT']
    },
    {
      id: 'ia-generativa-core',
      title: 'IA Generativa & Difusión',
      subtitle: 'Muestreo probabilístico en variedades de alta dimensionalidad',
      category: 'aplicacion',
      iconName: 'Sparkles',
      description: 'Modelos como Denoising Diffusion Probabilistic Models (DDPM) y Redes Generativas Antagónicas (GAN) que aprenden a transformar ruido gaussiano aleatorio en artefactos coherentes mediante guiado de atención cruzada.',
      applicationExample: 'Generación de conceptos visuales hiperrealistas, prototipado de diseño UI y síntesis de secuencias de proteínas.',
      metric: 'Espacio latente continuo (Latent Space)',
      tags: ['Difusión', 'Transformers', 'VAE']
    },
    {
      id: 'agentes-inteligentes',
      title: 'Agentes Inteligentes',
      subtitle: 'Autonomía, bucles de razonamiento y uso de herramientas',
      category: 'aplicacion',
      iconName: 'Bot',
      description: 'Sistemas dotados de percepción, memoria de trabajo/largo plazo y capacidad de razonamiento ReAct (Reasoning + Acting) para desglosar metas complejas en subtareas ejecutables e invocar APIs externas de manera autónoma.',
      applicationExample: 'Depuración y despliegue automático de código, orquestación de flujos de trabajo científicos y análisis de mercado autónomo.',
      metric: 'Bucles ReAct / Planificación Multi-paso',
      tags: ['ReAct', 'Herramientas/APIs', 'Memoria Vectorial']
    },
  ];

  const historyMilestones = [
    { year: '1950', title: 'Prueba de Turing', desc: 'Alan Turing propone "¿Pueden las máquinas pensar?" y define el test de imitación.' },
    { year: '1956', title: 'Conferencia de Dartmouth', desc: 'John McCarthy, Marvin Minsky y Claude Shannon acuñan el término "Inteligencia Artificial".' },
    { year: '1986', title: 'Auge de Backpropagation', desc: 'Rumelhart, Hinton y Williams popularizan el algoritmo de retropropagación en redes multicapa.' },
    { year: '1997', title: 'Deep Blue vence a Kaspárov', desc: 'Hito histórico donde una supercomputadora vence al campeón mundial de ajedrez mediante búsqueda heurística.' },
    { year: '2012', title: 'Revolución AlexNet (Deep Learning)', desc: 'Las GPUs y grandes datasets catapultan el Deep Learning al ganar ImageNet por margen abrumador.' },
    { year: '2017', title: 'El Paper "Attention Is All You Need"', desc: 'Google presenta la arquitectura Transformer, transformando para siempre NLP y multimodalidad.' },
    { year: '2024+', title: 'Era Generativa y Agentes Autónomos', desc: 'Modelos multimodales fundacionales (Gemini, GPT) y sistemas de agentes autónomos colaborativos.' },
  ];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Brain': return <Brain className="w-5 h-5 text-cyan-400" />;
      case 'History': return <History className="w-5 h-5 text-[#00ff66]" />;
      case 'Binary': return <Binary className="w-5 h-5 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'GitFork': return <GitFork className="w-5 h-5 text-[#00ff66]" />;
      case 'MessageSquareCode': return <MessageSquareCode className="w-5 h-5 text-purple-400" />;
      case 'Eye': return <Eye className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-emerald-400" />;
      default: return <Brain className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="ia-conceptos" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 01 • FUNDAMENTOS TEÓRICOS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            INTELIGENCIA <span className="text-cyan-400 text-glow-cyan">ARTIFICIAL</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Comprende los pilares conceptuales, la trayectoria histórica y los paradigmas que definen la ciencia computacional moderna.
          </p>
        </div>

        {/* Interactive Evolution Timeline */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl mb-16 border border-cyan-500/20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h3 className="text-lg font-tech font-bold text-white flex items-center gap-2">
                <History className="w-5 h-5 text-[#00ff66]" />
                LÍNEA TEMPORAL: EVOLUCIÓN DE LA INTELIGENCIA ARTIFICIAL
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Selecciona una era para analizar el salto cualitativo de la tecnología.
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/40">
              {historyMilestones[activeHistoryTab].year} • HITO CLAVE
            </span>
          </div>

          {/* Timeline Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-6">
            {historyMilestones.map((item, idx) => (
              <button
                key={item.year}
                onClick={() => setActiveHistoryTab(idx)}
                className={`p-2.5 rounded-lg text-left transition-all border font-mono text-xs cursor-pointer ${
                  activeHistoryTab === idx
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-sm text-white">{item.year}</div>
                <div className="truncate text-[11px] mt-0.5 opacity-80">{item.title}</div>
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="bg-slate-900/90 p-5 rounded-xl border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00ff66]/20 text-[#00ff66] font-mono text-xs font-semibold border border-[#00ff66]/40">
                  {historyMilestones[activeHistoryTab].year}
                </span>
                <h4 className="text-lg font-tech font-bold text-white">
                  {historyMilestones[activeHistoryTab].title}
                </h4>
              </div>
              <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
                {historyMilestones[activeHistoryTab].desc}
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-400/90 whitespace-nowrap bg-cyan-950/60 px-3 py-2 rounded border border-cyan-500/30">
              TRANSICIÓN COMPUTACIONAL #0{activeHistoryTab + 1}
            </div>
          </div>
        </div>

        {/* 9 Interactive Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="ai-concept-cards-grid">
          {concepts.map((concept) => (
            <div
              key={concept.id}
              onClick={() => setSelectedConcept(concept)}
              className="glass-panel p-6 rounded-2xl border border-cyan-500/15 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              {/* Corner tech accent */}
              <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400/40 group-hover:bg-cyan-400 transition-colors" />
              </div>

              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all">
                    {renderIcon(concept.iconName)}
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {concept.category}
                  </span>
                </div>

                <h3 className="text-xl font-tech font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {concept.title}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mb-3">
                  {concept.subtitle}
                </p>

                <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {concept.description}
                </p>
              </div>

              <div>
                {/* Application example badge */}
                <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 mb-4 group-hover:border-cyan-500/30 transition-colors">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#00ff66] flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00ff66]" />
                    <span>Ejemplo de Aplicación</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    {concept.applicationExample}
                  </p>
                </div>

                {/* Footer tags and interactive trigger */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">
                    {concept.tags[0]}
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 group-hover:text-cyan-300">
                    <span>Ver detalles</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for concept deep dive */}
        {selectedConcept && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-400 max-w-2xl w-full shadow-[0_0_40px_rgba(0,240,255,0.25)] relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-400 flex items-center justify-center">
                    {renderIcon(selectedConcept.iconName)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-tech font-bold text-white">
                      {selectedConcept.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400">
                      {selectedConcept.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 font-mono text-xs cursor-pointer"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="space-y-4 my-6 text-sm text-slate-200">
                <p className="leading-relaxed">{selectedConcept.description}</p>
                
                <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                  <div className="text-xs font-mono text-cyan-400 uppercase mb-1">
                    CASO DE USO EN PRODUCCIÓN:
                  </div>
                  <p className="text-slate-300">{selectedConcept.applicationExample}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">MÉTRICA CLAVE</span>
                    <span className="text-[#00ff66] font-bold">{selectedConcept.metric}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block mb-1">CATEGORÍA</span>
                    <span className="text-cyan-400 uppercase font-bold">{selectedConcept.category}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedConcept.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 text-xs font-mono border border-cyan-500/20">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedConcept(null)}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold tracking-wider text-sm cursor-pointer"
                >
                  ENTENDIDO
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
