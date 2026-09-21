import React, { useState } from 'react';
import { 
  HeartPulse, 
  GraduationCap, 
  DollarSign, 
  Factory, 
  Sprout, 
  Car, 
  ShieldCheck, 
  Bot, 
  Megaphone, 
  Microscope,
  ArrowRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { SectorApplication } from '../types';

export const ApplicationsSection: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<SectorApplication | null>(null);

  const applications: SectorApplication[] = [
    {
      id: 'medicina',
      title: 'Medicina & Salud',
      icon: 'HeartPulse',
      impact: 'Diagnóstico precoz > 98%',
      description: 'Detección temprana de patologías oncológicas en imágenes de tomografía, secuenciación genética y diseño acelerado de fármacos con modelos de plegamiento proteico.',
      practicalCase: 'AlphaFold predice la estructura 3D de más de 200 millones de proteínas, recortando décadas de investigación en vacunas y tratamientos.',
      techUsed: 'CNNs 3D, Transformers Multimodales, VAEs Moleculares'
    },
    {
      id: 'educacion',
      title: 'Educación Personalizada',
      icon: 'GraduationCap',
      impact: 'Aceleración de aprendizaje +40%',
      description: 'Tutorías inteligentes adaptativas que calibran la dificultad del contenido en tiempo real según el ritmo cognitivo y vacíos conceptuales de cada estudiante.',
      practicalCase: 'Plataformas que generan ejercicios personalizados, retroalimentación socrática y traducción simultánea de material académico.',
      techUsed: 'LLMs con RAG, Knowledge Tracing, Grafos de Conocimiento'
    },
    {
      id: 'finanzas',
      title: 'Finanzas & FinTech',
      icon: 'DollarSign',
      impact: 'Fraude prevenido: $32B anuales',
      description: 'Scoring crediticio automatizado, detección de lavado de dinero en milisegundos y trading algorítmico de alta frecuencia basado en análisis de sentimiento.',
      practicalCase: 'Monitoreo de transacciones bancarias en tiempo real clasificando patrones anómalos antes de que el pago sea liquidado.',
      techUsed: 'Grafos Neuronales (GNN), Gradient Boosting, LSTMs'
    },
    {
      id: 'industria',
      title: 'Industria 4.0 & Manufactura',
      icon: 'Factory',
      impact: 'Reducción de downtime -35%',
      description: 'Mantenimiento predictivo de maquinaria pesada mediante gemelos digitales y sensores acústicos/térmicos, además de control de calidad óptico.',
      practicalCase: 'Cámaras de inspección que detectan microfisuras de 0.05mm en piezas aeronáuticas a velocidades de línea de ensamblaje.',
      techUsed: 'Computer Vision YOLOv10, IoT Telemetry, Gemelos Digitales'
    },
    {
      id: 'agricultura',
      title: 'Agricultura de Precisión',
      icon: 'Sprout',
      impact: 'Ahorro de agua & fertilizante -30%',
      description: 'Inspección aérea con drones multiespectrales para mapeo de estrés hídrico, predicción de cosechas y aplicación focalizada de bioinsumos.',
      practicalCase: 'Tractores autónomos guiados por IA que identifican y fumigan malezas individuales sin afectar el cultivo principal.',
      techUsed: 'Visión Satelital, Redes Convolucionales, Drones Edge-AI'
    },
    {
      id: 'transporte',
      title: 'Transporte & Movilidad',
      icon: 'Car',
      impact: 'Nivel 4 de autonomía alcanzado',
      description: 'Vehículos autónomos con fusión sensorial de LiDAR, radar y cámaras; y optimización de redes de semáforos y flotas logísticas.',
      practicalCase: 'Flotas de robotaxis urbanos que operan sin conductor humano mediante redes neuronales de planificación espacial de extremo a extremo.',
      techUsed: 'Fusión de Sensores, Deep Reinforcement Learning, SLAM'
    },
    {
      id: 'ciberseguridad',
      title: 'Ciberseguridad & Defensa',
      icon: 'ShieldCheck',
      impact: 'Mitigación en < 15 milisegundos',
      description: 'Análisis heurístico de malware polimórfico, aislamiento automático de endpoints comprometidos y simulación de ejercicios Red Team / Blue Team.',
      practicalCase: 'Bloqueo autónomo de campañas de phishing dirigidas mediante análisis de procesamiento de lenguaje natural y entropía.',
      techUsed: 'Isolation Forests, Autoencoders, Clasificadores de Tráfico'
    },
    {
      id: 'robotica',
      title: 'Robótica Avanzada & Exoesqueletos',
      icon: 'Bot',
      impact: 'Manipulación diestra submilimétrica',
      description: 'Brazos robóticos colaborativos (Cobots) y humanoides que aprenden destrezas físicas mediante aprendizaje por imitación y simulación física.',
      practicalCase: 'Robots logísticos en almacenes que empacan y seleccionan miles de paquetes heterogéneos sin requerir reprogramación manual.',
      techUsed: 'Políticas de Refuerzo Sim2Real, Visión Táctil, Cinemática Inversa'
    },
    {
      id: 'marketing',
      title: 'Marketing & Experiencia de Usuario',
      icon: 'Megaphone',
      impact: 'Conversión incrementada +28%',
      description: 'Hiperpersonalización de recomendaciones, generación de creatividades publicitarias dinámicas y modelado de propensión de compra.',
      practicalCase: 'Motores de streaming que recomiendan contenido prediciendo el estado de ánimo y contexto temporal del usuario.',
      techUsed: 'Filtrado Colaborativo Neuronal, Modelos de Difusión, NLP'
    },
    {
      id: 'investigacion',
      title: 'Investigación Científica',
      icon: 'Microscope',
      impact: 'Descubrimiento de materiales x10',
      description: 'Aceleración de simulaciones de física cuántica, modelado climático global y descubrimiento de superconductores y materiales para baterías.',
      practicalCase: 'Redes neuronales que descubren catalizadores para captura directa de carbono y generación de energía de fusión nuclear limpia.',
      techUsed: 'Physics-Informed Neural Networks (PINNs), LLMs Científicos'
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-rose-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-amber-400" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-emerald-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-cyan-400" />;
      case 'Sprout': return <Sprout className="w-5 h-5 text-[#00ff66]" />;
      case 'Car': return <Car className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-purple-400" />;
      case 'Megaphone': return <Megaphone className="w-5 h-5 text-pink-400" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-teal-400" />;
      default: return <Bot className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="aplicaciones" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 09 • IMPACTO EN SECTORES REALES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            APLICACIONES DE <span className="text-cyan-400 text-glow-cyan">LA IA</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Descubre cómo los modelos predictivos y generativos transforman de raíz las industrias globales más críticas.
          </p>
        </div>

        {/* 10 Interactive Sector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              className="glass-panel p-5 rounded-2xl border border-cyan-500/15 hover:border-cyan-400/50 transition-all transform hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                    {getIcon(app.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    ACTIVO
                  </span>
                </div>

                <h3 className="font-tech font-bold text-white text-base group-hover:text-cyan-300 transition-colors mb-1">
                  {app.title}
                </h3>
                <div className="text-[11px] font-mono text-[#00ff66] font-semibold mb-2">
                  {app.impact}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {app.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span>Ver Caso de Uso</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Detailed Practical Case */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-400 max-w-xl w-full shadow-[0_0_40px_rgba(0,240,255,0.25)] relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-400 flex items-center justify-center">
                    {getIcon(selectedApp.icon)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-tech font-bold text-white">
                      {selectedApp.title}
                    </h3>
                    <span className="text-xs font-mono text-[#00ff66]">
                      Impacto comprobado: {selectedApp.impact}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
                >
                  ✕ Cerrar
                </button>
              </div>

              <div className="space-y-4 my-6 text-sm text-slate-200">
                <p className="leading-relaxed">{selectedApp.description}</p>
                
                <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-bold block mb-1">
                    CASO DE ÉXITO PRÁCTICO:
                  </span>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{selectedApp.practicalCase}</p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 block mb-1">STACK TECNOLÓGICO CLAVE:</span>
                  <span className="text-white font-bold">{selectedApp.techUsed}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-sm tracking-wider cursor-pointer"
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
