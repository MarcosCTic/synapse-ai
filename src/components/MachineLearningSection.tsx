import React, { useState, useMemo } from 'react';
import { 
  GitBranch, 
  Layers, 
  RotateCw, 
  Sliders, 
  TrendingUp, 
  Network, 
  ArrowRight,
  Play,
  RefreshCw,
  Award,
  Zap
} from 'lucide-react';

export const MachineLearningSection: React.FC = () => {
  // ML Simulator State
  const [slope, setSlope] = useState<number>(1.8);
  const [noise, setNoise] = useState<number>(18);
  const [sampleCount, setSampleCount] = useState<number>(30);
  const [inputX, setInputX] = useState<number>(65);
  const [rlStep, setRlStep] = useState<number>(0);
  const [rlReward, setRlReward] = useState<number>(120);

  // Generate synthetic points based on parameters
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < sampleCount; i++) {
      const x = (i / (sampleCount - 1)) * 100;
      // deterministic pseudo-noise based on seed/index
      const pseudoRandom = Math.sin(i * 12.9898 + 78.233) * noise;
      const y = Math.max(5, Math.min(95, slope * x * 0.5 + 20 + pseudoRandom));
      pts.push({ x, y });
    }
    return pts;
  }, [slope, noise, sampleCount]);

  // Compute linear regression on synthetic points
  const regression = useMemo(() => {
    const n = points.length;
    if (n === 0) return { m: 0, b: 0, r2: 0, mse: 0 };
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    for (const p of points) {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
    }
    const denom = n * sumX2 - sumX * sumX;
    const m = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
    const b = (sumY - m * sumX) / n;

    // Calculate MSE and R^2
    const meanY = sumY / n;
    let ssTot = 0, ssRes = 0;
    for (const p of points) {
      const pred = m * p.x + b;
      ssRes += Math.pow(p.y - pred, 2);
      ssTot += Math.pow(p.y - meanY, 2);
    }
    const mse = ssRes / n;
    const r2 = ssTot !== 0 ? Math.max(0, 1 - ssRes / ssTot) : 0;

    return { m, b, r2, mse };
  }, [points]);

  // Predicted Y for user slider
  const predictedY = Math.max(0, Math.min(100, regression.m * inputX + regression.b));

  // Step RL simulator
  const handleRlStep = () => {
    setRlStep((prev) => (prev + 1) % 4);
    setRlReward((prev) => prev + Math.floor(Math.random() * 25 + 10));
  };

  const rlStages = [
    { name: '1. Agente Observa Entorno', desc: 'El agente lee el vector de estado actual $S_t$.', badge: 'ESTADO' },
    { name: '2. Selección de Acción', desc: 'Aplica política $\\pi(a|s)$ mediante exploración $\\epsilon$-greedy.', badge: 'ACCIÓN' },
    { name: '3. Transición del Entorno', desc: 'El entorno ejecuta la acción y genera nuevo estado $S_{t+1}$.', badge: 'ENTORNO' },
    { name: '4. Recompensa & Actualización', desc: 'Ajuste de pesos o valores Q: $Q(s,a) \\leftarrow Q + \\alpha \\delta$.', badge: 'RECOMPENSA' },
  ];

  return (
    <section id="machine-learning" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
            <span>MÓDULO 02 • PARADIGMAS COMPUTACIONALES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            MACHINE <span className="text-[#00ff66] text-glow-green">LEARNING</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Taxonomía del aprendizaje automatizado: supervisión guiada, descubrimiento latente no supervisado y políticas adaptativas por refuerzo.
          </p>
        </div>

        {/* 3 Main Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Supervised Learning */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30">
                  Etiquetas: $(X, Y)$
                </span>
              </div>

              <h3 className="text-xl font-tech font-bold text-white">Aprendizaje Supervisado</h3>
              <p className="text-xs font-mono text-cyan-400/80 mb-3">Modelos con datos etiquetados</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                El algoritmo aprende un mapeo funcional $f: X \rightarrow Y$ a partir de pares de entrada y salida conocidos, minimizando la discrepancia de predicción.
              </p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-cyan-300 font-bold block">1. Regresión</span>
                  <span className="text-slate-400">Predicción de variables numéricas continuas (precios, demanda, temperatura).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-cyan-300 font-bold block">2. Clasificación</span>
                  <span className="text-slate-400">Asignación a categorías discretas (spam vs no spam, diagnóstico benigno/maligno).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-cyan-300 font-bold block">3. Predicción</span>
                  <span className="text-slate-400">Pronósticos cuantitativos a futuro basados en series de tiempo y regresores.</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Algoritmos:</span>
              <span className="text-cyan-400">Linear/Ridge, SVM, Random Forest</span>
            </div>
          </div>

          {/* Unsupervised Learning */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-[#00ff66]" />
                </div>
                <span className="text-xs font-mono text-[#00ff66] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                  Sin Etiquetas: $(X)$
                </span>
              </div>

              <h3 className="text-xl font-tech font-bold text-white">Aprendizaje No Supervisado</h3>
              <p className="text-xs font-mono text-[#00ff66]/80 mb-3">Extracción de estructura oculta</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                El sistema detecta patrones geométricos y distribuciones intrínsecas en los datos sin la existencia de respuestas o directrices previas.
              </p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-[#00ff66] font-bold block">1. Clustering</span>
                  <span className="text-slate-400">Agrupamiento natural de entidades similares (K-Means, DBSCAN, jerárquico).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-[#00ff66] font-bold block">2. Reducción de Dimensionalidad</span>
                  <span className="text-slate-400">Compresión de atributos preservando varianza (PCA, t-SNE, UMAP).</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="font-mono text-[#00ff66] font-bold block">3. Detección de Patrones</span>
                  <span className="text-slate-400">Identificación de valores atípicos (Isolation Forest, Autoencoders).</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Algoritmos:</span>
              <span className="text-[#00ff66]">K-Means, PCA, GMM, DBSCAN</span>
            </div>
          </div>

          {/* Reinforcement Learning */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center">
                  <RotateCw className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-xs font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30">
                  Bucle de Recompensa
                </span>
              </div>

              <h3 className="text-xl font-tech font-bold text-white">Aprendizaje por Refuerzo</h3>
              <p className="text-xs font-mono text-blue-400/80 mb-3">Toma secuencial de decisiones</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Un agente interactúa continuamente con un entorno estocástico, optimizando una política acumulativa de premios o penalizaciones.
              </p>

              {/* Visual Loop: Agente -> Acción -> Entorno -> Recompensa */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-blue-500/30 mb-4">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-blue-300 font-bold">BUCLE DINÁMICO (MDP)</span>
                  <span className="text-[10px] text-slate-400">Paso: {rlStep + 1}/4</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-3">
                  <div className={`p-2 rounded border text-center transition-all ${rlStep === 0 ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    AGENTE
                  </div>
                  <div className={`p-2 rounded border text-center transition-all ${rlStep === 1 ? 'bg-[#00ff66]/20 border-[#00ff66] text-[#00ff66]' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    ACCIÓN
                  </div>
                  <div className={`p-2 rounded border text-center transition-all ${rlStep === 2 ? 'bg-blue-500/20 border-blue-400 text-blue-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    ENTORNO
                  </div>
                  <div className={`p-2 rounded border text-center transition-all ${rlStep === 3 ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    RECOMPENSA
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Score acumulado: +{rlReward}</span>
                  </div>
                  <button
                    onClick={handleRlStep}
                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Avanzar Bucle</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Algoritmos:</span>
              <span className="text-blue-400">Q-Learning, PPO, DQN, SAC</span>
            </div>
          </div>
        </div>

        {/* Interactive ML Simulator: Regression & Prediction */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-tech font-bold text-white">
                  LABORATORIO INTERACTIVO: REGRESIÓN Y PREDICCIÓN CONTINUA
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Modifica los hiperparámetros en tiempo real y observa cómo el algoritmo recalcula la recta de ajuste y sus métricas de error.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#00ff66] bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                R² SCORE: {(regression.r2 * 100).toFixed(1)}%
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/40">
                MSE: {regression.mse.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Interactive Graph Canvas/SVG */}
            <div className="lg:col-span-7 bg-[#070b10] p-4 rounded-xl border border-cyan-500/30 relative flex flex-col justify-between">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>PLANO CARTESIANO DE ENTRENAMIENTO [0..100]</span>
                <span className="text-cyan-400">y = {regression.m.toFixed(2)}x + {regression.b.toFixed(1)}</span>
              </div>

              {/* SVG Coordinate Space */}
              <div className="w-full aspect-[16/10] relative bg-[#090e15] rounded-lg border border-slate-800 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="25" y1="0" x2="25" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="75" y1="0" x2="75" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2,2" />

                  {/* Regression Line */}
                  <line
                    x1="0"
                    y1={100 - regression.b}
                    x2="100"
                    y2={100 - (regression.m * 100 + regression.b)}
                    stroke="#00f0ff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  {/* Data Points */}
                  {points.map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={100 - pt.y}
                      r="1.4"
                      fill="#00ff66"
                      stroke="#0d1117"
                      strokeWidth="0.4"
                    />
                  ))}

                  {/* Prediction Point at inputX */}
                  <line
                    x1={inputX}
                    y1="0"
                    x2={inputX}
                    y2="100"
                    stroke="rgba(255, 102, 0, 0.4)"
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />
                  <circle
                    cx={inputX}
                    cy={100 - predictedY}
                    r="2.8"
                    fill="#ffaa00"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00ff66]" />
                  <span>Muestras empíricas ({points.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-0.5 bg-cyan-400" />
                  <span>Línea ajustada OLS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ffaa00]" />
                  <span>Inferencia activa</span>
                </div>
              </div>
            </div>

            {/* Sliders and Parameters Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Slope Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Pendiente de Tendencia (Slope $m$)</span>
                    <span className="text-cyan-400 font-bold">{slope.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={slope}
                    onChange={(e) => setSlope(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Noise Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Varianza de Ruido Gaussiano ($\sigma$)</span>
                    <span className="text-cyan-400 font-bold">{noise}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="45"
                    step="1"
                    value={noise}
                    onChange={(e) => setNoise(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Sample Count Slider */}
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Muestras del Dataset ($N$)</span>
                    <span className="text-cyan-400 font-bold">{sampleCount}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={sampleCount}
                    onChange={(e) => setSampleCount(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Input X for active prediction */}
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/30">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-amber-300 font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" />
                      SIMULAR ENTRADA ($X$):
                    </span>
                    <span className="text-amber-400 font-bold">{inputX}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={inputX}
                    onChange={(e) => setInputX(parseInt(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer my-2"
                  />
                  <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Predicción ŷ (Estimación):</span>
                    <span className="text-lg font-bold text-white bg-amber-500/20 px-2 py-0.5 rounded border border-amber-400/40">
                      {predictedY.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset to baseline button */}
              <button
                onClick={() => {
                  setSlope(1.8);
                  setNoise(15);
                  setSampleCount(30);
                  setInputX(65);
                }}
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-500/40 text-xs font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer Parámetros Óptimos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
