import React, { useState } from 'react';
import { 
  Scale, 
  EyeOff, 
  ShieldAlert, 
  CheckCircle, 
  Users, 
  Sparkles, 
  Compass, 
  FileCheck,
  Cpu,
  ArrowRight
} from 'lucide-react';

export const EthicsFutureSection: React.FC = () => {
  const [activeDilemma, setActiveDilemma] = useState<number>(0);

  const topics = [
    {
      title: 'Ética y Alineamiento con Valores Humanos',
      icon: Scale,
      color: 'text-cyan-400',
      desc: 'Investigación orientada a asegurar que los objetivos intrínsecos de los modelos fundacionales respeten la autonomía, la dignidad y el bienestar colectivo sin desviaciones instrumentales.',
      points: ['Alineamiento RLHF y DPO', 'Constitutional AI', 'Comités de Supervisión Ética']
    },
    {
      title: 'Privacidad y Protección de Datos',
      icon: EyeOff,
      color: 'text-indigo-400',
      desc: 'Garantías criptográficas y técnicas de privacidad diferencial que permiten el entrenamiento sobre información médica o financiera sensible sin exponer registros individuales.',
      points: ['Privacidad Diferencial (DP-SGD)', 'Aprendizaje Federado', 'Cumplimiento RGPD / AI Act']
    },
    {
      title: 'Mitigación de Sesgos Algorítmicos',
      icon: Compass,
      color: 'text-rose-400',
      desc: 'Técnicas de desesgo (debiasing) en representaciones vectoriales para prevenir la amplificación de discriminaciones históricas en contratación, justicia y crédito.',
      points: ['Auditoría de Datasets', 'Métricas de Paridad Demográfica', 'Equalized Odds']
    },
    {
      title: 'Seguridad y Robustez Adversarial',
      icon: ShieldAlert,
      color: 'text-amber-400',
      desc: 'Defensa frente a ataques de inyección de prompts (Jailbreaks), envenenamiento de datos (Data Poisoning) y perturbaciones adversarias imperceptibles al ojo humano.',
      points: ['Red Teaming Continuo', 'Verificación Formal de Redes', 'Defensas contra Backdoors']
    },
    {
      title: 'Transparencia y Explicabilidad (XAI)',
      icon: FileCheck,
      color: 'text-[#00ff66]',
      desc: 'Transición de "cajas negras" opacas a modelos interpretables mediante mapas de saliencia (SHAP, LIME) y trazabilidad completa de cada decisión predictiva.',
      points: ['Valores de Shapley (SHAP)', 'Atribución de Características', 'Tarjetas de Modelo (Model Cards)']
    },
    {
      title: 'Uso Responsable de los Datos',
      icon: CheckCircle,
      color: 'text-teal-400',
      desc: 'Gobernanza transparente sobre la procedencia, derechos de propiedad intelectual y consentimiento explícito en el scraping masivo para preentrenamiento.',
      points: ['Linaje y Proveniencia', 'Licencias de Propiedad Intelectual', 'Mecanismos de Opt-Out']
    },
    {
      title: 'Impacto en el Empleo y Transformación Laboral',
      icon: Users,
      color: 'text-blue-400',
      desc: 'Un enfoque equilibrado: la automatización reemplaza tareas repetitivas a la vez que expande la demanda de colaboración humano-IA (centauros cognitivos) y reskilling.',
      points: ['Aumento de Capacidades Humanas', 'Nuevos Roles (AI Safety, Prompt Eng.)', 'Transición Socioeconómica']
    },
    {
      title: 'Horizontes Futuros: Hacia la AGI',
      icon: Cpu,
      color: 'text-purple-400',
      desc: 'La convergencia entre modelos de lenguaje masivos, robótica móvil, computación cuántica y agentes autónomos capaces de generalización interdominio.',
      points: ['Inteligencia Artificial General (AGI)', 'Modelos del Mundo (World Models)', 'Auto-mejora Recursiva Segura']
    },
  ];

  return (
    <section id="etica-futuro" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>MÓDULO 11 • GOBERNANZA & HORIZONTES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            ÉTICA Y <span className="text-amber-400 text-glow-cyan">FUTURO</span> DE LA IA
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            El avance tecnológico solo adquiere significado cuando está guiado por la responsabilidad, la transparencia y una visión humanocéntrica del porvenir.
          </p>
        </div>

        {/* 8 Balanced Ethical Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {topics.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/15 hover:border-amber-400/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 group-hover:border-amber-400/50 transition-colors">
                    <Icon className={`w-5 h-5 ${t.color}`} />
                  </div>

                  <h3 className="text-base font-tech font-bold text-white mb-2 leading-tight">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {t.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px] font-mono text-slate-400">
                  {t.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-amber-400" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: Manifiesto de Uso Responsable */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-amber-950/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              DECLARACIÓN DE PRINCIPIOS
            </span>
            <h3 className="text-xl sm:text-2xl font-tech font-bold text-white">
              HACIA UNA INTELIGENCIA ARTIFICIAL BENEFICIOSA Y SEGURA
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              La IA no debe considerarse un sustituto de la empatía ni del juicio moral humano, sino un amplificador cognitivo rigurosamente auditado para resolver los desafíos más urgentes de la humanidad: cambio climático, erradicación de enfermedades y democratización del saber.
            </p>
          </div>
          <div className="text-xs font-mono text-amber-300 bg-amber-950/80 border border-amber-500/40 px-4 py-3 rounded-xl whitespace-nowrap">
            ESTÁNDAR: IEEE 7000 & EU AI ACT COMPLIANT
          </div>
        </div>
      </div>
    </section>
  );
};
