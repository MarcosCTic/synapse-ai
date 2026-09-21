import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  Target, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  PlusCircle, 
  CheckCircle2, 
  Activity,
  Zap
} from 'lucide-react';

interface Point2D {
  x: number;
  y: number;
  cluster?: number;
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

export const AIPlayground: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'clustering' | 'classification' | 'polynomial' | 'anomaly'>('clustering');

  // ===================== K-MEANS STATE =====================
  const [kCount, setKCount] = useState<number>(3);
  const [points, setPoints] = useState<Point2D[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [iterations, setIterations] = useState<number>(0);
  const clusterColors = ['#00f0ff', '#00ff66', '#ffaa00', '#ff0077', '#aa00ff'];

  // Initialize synthetic clustering points
  const generateRandomClusters = (k = kCount) => {
    const pts: Point2D[] = [];
    for (let c = 0; c < k; c++) {
      const centerX = 40 + Math.random() * 220;
      const centerY = 40 + Math.random() * 160;
      for (let i = 0; i < 15; i++) {
        pts.push({
          x: Math.max(15, Math.min(285, centerX + (Math.random() - 0.5) * 55)),
          y: Math.max(15, Math.min(225, centerY + (Math.random() - 0.5) * 55)),
        });
      }
    }
    setPoints(pts);

    // Initial random centroids
    const cents: Centroid[] = [];
    for (let i = 0; i < k; i++) {
      cents.push({
        x: 50 + Math.random() * 200,
        y: 50 + Math.random() * 140,
        color: clusterColors[i % clusterColors.length],
      });
    }
    setCentroids(cents);
    setIterations(0);
  };

  useEffect(() => {
    if (activeMode === 'clustering' && points.length === 0) {
      generateRandomClusters(kCount);
    }
  }, [activeMode]);

  // Execute 1 K-Means Step
  const stepKMeans = () => {
    if (points.length === 0 || centroids.length === 0) return;

    // 1. Assign each point to closest centroid
    const updatedPoints = points.map((p) => {
      let minDist = Infinity;
      let assignedCluster = 0;
      centroids.forEach((c, idx) => {
        const dist = Math.hypot(p.x - c.x, p.y - c.y);
        if (dist < minDist) {
          minDist = dist;
          assignedCluster = idx;
        }
      });
      return { ...p, cluster: assignedCluster };
    });

    // 2. Recompute centroid positions
    const updatedCentroids = centroids.map((c, idx) => {
      const clusterPts = updatedPoints.filter((p) => p.cluster === idx);
      if (clusterPts.length === 0) return c;
      const avgX = clusterPts.reduce((acc, p) => acc + p.x, 0) / clusterPts.length;
      const avgY = clusterPts.reduce((acc, p) => acc + p.y, 0) / clusterPts.length;
      return { ...c, x: avgX, y: avgY };
    });

    setPoints(updatedPoints);
    setCentroids(updatedCentroids);
    setIterations((prev) => prev + 1);
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeMode !== 'clustering') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 300;
    const clickY = ((e.clientY - rect.top) / rect.height) * 240;
    setPoints((prev) => [...prev, { x: clickX, y: clickY }]);
  };

  // ===================== CLASSIFICATION STATE =====================
  const [classModel, setClassModel] = useState<'logistic' | 'rbf' | 'mlp'>('rbf');
  const [decisionThreshold, setDecisionThreshold] = useState<number>(0.5);
  const [dataDist, setDataDist] = useState<'circles' | 'linear'>('circles');

  // ===================== POLYNOMIAL STATE =====================
  const [polyDegree, setPolyDegree] = useState<number>(3);
  const [regularization, setRegularization] = useState<number>(0.1);

  // Compute polynomial curve points
  const polyPoints = [
    { x: 20, y: 180 }, { x: 50, y: 130 }, { x: 90, y: 150 },
    { x: 140, y: 80 }, { x: 190, y: 110 }, { x: 230, y: 40 }, { x: 270, y: 70 }
  ];

  return (
    <section id="playground" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 06 • LABORATORIO EN VIVO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            AI <span className="text-cyan-400 text-glow-cyan">PLAYGROUND</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Experimenta interactivamente con clustering no supervisado, fronteras de decisión no lineales, sobreajuste polinomial y detección de patrones en tiempo real.
          </p>
        </div>

        {/* Playground Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30">
          {/* Modes Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                { id: 'clustering', label: 'K-Means Clustering', icon: Layers },
                { id: 'classification', label: 'Frontera de Clasificación', icon: Target },
                { id: 'polynomial', label: 'Regresión Polinomial', icon: TrendingUp },
                { id: 'anomaly', label: 'Detección de Anomalías', icon: ShieldAlert },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveMode(tab.id as typeof activeMode)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                      activeMode === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bold'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-cyan-400/90 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              <span>RECALCULADO DINÁMICO ACTIVO</span>
            </div>
          </div>

          {/* ================= MODE 1: K-MEANS CLUSTERING ================= */}
          {activeMode === 'clustering' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Interactive SVG Canvas */}
              <div className="lg:col-span-8 bg-[#070b10] rounded-xl border border-cyan-500/20 p-4 relative flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    ESPACIO BIDIMENSIONAL (HAZ CLIC PARA AÑADIR PUNTOS)
                  </span>
                  <span className="text-[#00ff66]">Iteración: #{iterations}</span>
                </div>

                <div className="w-full aspect-[16/10] bg-[#090e15] rounded-lg border border-slate-800 overflow-hidden relative">
                  <svg
                    onClick={handleCanvasClick}
                    viewBox="0 0 300 240"
                    className="w-full h-full cursor-crosshair"
                  >
                    {/* Grid */}
                    <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.03)" />
                    <line x1="0" y1="180" x2="300" y2="180" stroke="rgba(255,255,255,0.03)" />
                    <line x1="100" y1="0" x2="100" y2="240" stroke="rgba(255,255,255,0.03)" />
                    <line x1="200" y1="0" x2="200" y2="240" stroke="rgba(255,255,255,0.03)" />

                    {/* Voronoi / Connection lines from points to centroid */}
                    {points.map((p, idx) => {
                      if (p.cluster === undefined || !centroids[p.cluster]) return null;
                      const c = centroids[p.cluster];
                      return (
                        <line
                          key={`link-${idx}`}
                          x1={p.x}
                          y1={p.y}
                          x2={c.x}
                          y2={c.y}
                          stroke={c.color}
                          strokeWidth="0.5"
                          opacity="0.25"
                        />
                      );
                    })}

                    {/* Data points */}
                    {points.map((p, idx) => {
                      const color = p.cluster !== undefined && centroids[p.cluster] 
                        ? centroids[p.cluster].color 
                        : '#94a3b8';
                      return (
                        <circle
                          key={`pt-${idx}`}
                          cx={p.x}
                          cy={p.y}
                          r="3"
                          fill={color}
                          stroke="#0d1117"
                          strokeWidth="0.8"
                        />
                      );
                    })}

                    {/* Centroids */}
                    {centroids.map((c, idx) => (
                      <g key={`cent-${idx}`}>
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r="9"
                          fill="none"
                          stroke={c.color}
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r="4"
                          fill={c.color}
                        />
                        <text
                          x={c.x}
                          y={c.y - 12}
                          fill={c.color}
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          C{idx + 1}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2">
                  <span>Puntos cargados: <strong className="text-white">{points.length}</strong></span>
                  <span>Haz clic dentro del canvas para agregar observaciones personalizadas.</span>
                </div>
              </div>

              {/* Controls */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Número de Clusters ($K$):</span>
                      <span className="text-cyan-400 font-bold">{kCount}</span>
                    </div>
                    <div className="flex gap-2">
                      {[2, 3, 4, 5].map((k) => (
                        <button
                          key={k}
                          onClick={() => {
                            setKCount(k);
                            generateRandomClusters(k);
                          }}
                          className={`flex-1 py-1.5 rounded-lg font-mono text-xs border cursor-pointer ${
                            kCount === k
                              ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          K={k}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono space-y-2">
                    <span className="text-cyan-400 font-bold block">ALGORITMO DE LLOYD:</span>
                    <p className="text-slate-400 leading-relaxed">
                      1. Asignación: argmin ||x_i - μ_j||²<br />
                      2. Actualización: μ_j = (1 / |S_j|) ∑ x
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={stepKMeans}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-tech font-bold tracking-wider text-base shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>EJECUTAR PASO DE CONVERGENCIA</span>
                  </button>

                  <button
                    onClick={() => generateRandomClusters(kCount)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Regenerar Datos Aleatorios</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 2: CLASSIFICATION BOUNDARY ================= */}
          {activeMode === 'classification' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-8 bg-[#070b10] rounded-xl border border-cyan-500/20 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>FRONTERA DE DECISIÓN HIPERPLANO / KERNEL RBF</span>
                  <span className="text-cyan-400">Umbral: {decisionThreshold.toFixed(2)}</span>
                </div>

                <div className="w-full aspect-[16/10] bg-[#090e15] rounded-lg border border-slate-800 overflow-hidden relative">
                  <svg viewBox="0 0 300 240" className="w-full h-full">
                    {/* Shaded decision background region */}
                    {dataDist === 'circles' ? (
                      <>
                        <circle cx="150" cy="120" r={80 * decisionThreshold + 30} fill="rgba(0, 240, 255, 0.12)" stroke="#00f0ff" strokeWidth="1.5" strokeDasharray="3,3" />
                        <rect x="0" y="0" width="300" height="240" fill="rgba(255, 68, 102, 0.05)" />
                      </>
                    ) : (
                      <>
                        <polygon points={`0,${180 * decisionThreshold + 30} 300,${60 * decisionThreshold + 20} 300,240 0,240`} fill="rgba(0, 240, 255, 0.12)" />
                        <line x1="0" y1={180 * decisionThreshold + 30} x2="300" y2={60 * decisionThreshold + 20} stroke="#00f0ff" strokeWidth="2" strokeDasharray="3,3" />
                      </>
                    )}

                    {/* Class A points (Cyan) */}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const angle = (i / 24) * Math.PI * 2;
                      const rad = dataDist === 'circles' ? 35 + Math.sin(i) * 15 : 60 + (i * 5);
                      const cx = 150 + Math.cos(angle) * rad;
                      const cy = 120 + Math.sin(angle) * rad;
                      return <circle key={`a-${i}`} cx={cx} cy={cy} r="3.5" fill="#00f0ff" />;
                    })}

                    {/* Class B points (Red/Orange) */}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const angle = (i / 24) * Math.PI * 2 + 0.15;
                      const rad = dataDist === 'circles' ? 95 + Math.sin(i * 2) * 18 : 140 + (i * 3);
                      const cx = 150 + Math.cos(angle) * rad;
                      const cy = 120 + Math.sin(angle) * rad;
                      return <circle key={`b-${i}`} cx={cx} cy={cy} r="3.5" fill="#ff4466" />;
                    })}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Clase Positiva (Y=1)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#ff4466]" /> Clase Negativa (Y=0)</span>
                  <span className="text-[#00ff66]">Precisión Global: 96.4%</span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-slate-300 block mb-1.5">Distribución de Datos:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDataDist('circles')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono border cursor-pointer ${
                          dataDist === 'circles' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Círculos Concéntricos
                      </button>
                      <button
                        onClick={() => setDataDist('linear')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-mono border cursor-pointer ${
                          dataDist === 'linear' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        Separable Lineal
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-slate-300 block mb-1.5">Kernel / Algoritmo:</span>
                    <select
                      value={classModel}
                      onChange={(e) => setClassModel(e.target.value as typeof classModel)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      <option value="rbf">Support Vector Machine (Kernel RBF)</option>
                      <option value="mlp">Red Neuronal Multicapa (MLP Classifier)</option>
                      <option value="logistic">Regresión Logística Sigmoide</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-300">Umbral de Decisión ($\tau$):</span>
                      <span className="text-cyan-400 font-bold">{decisionThreshold.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="0.9"
                      step="0.05"
                      value={decisionThreshold}
                      onChange={(e) => setDecisionThreshold(parseFloat(e.target.value))}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Confusion Matrix Card */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 block mb-2 font-bold">MATRIZ DE CONFUSIÓN SIMULADA</span>
                  <div className="grid grid-cols-2 gap-1.5 text-center">
                    <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/30 text-[#00ff66]">
                      <span className="block text-[10px] text-slate-400">Verdaderos Positivos</span>
                      <strong>23 / 24 (95.8%)</strong>
                    </div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      <span className="block text-[10px] text-slate-400">Falsos Positivos</span>
                      <strong>1 / 24</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 3: POLYNOMIAL REGRESSION ================= */}
          {activeMode === 'polynomial' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-8 bg-[#070b10] rounded-xl border border-cyan-500/20 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>AJUSTE POLINOMIAL • GRADO {polyDegree}</span>
                  <span className="text-[#00ff66]">
                    {polyDegree === 1 ? 'Subajuste (Underfitting)' : polyDegree > 4 ? 'Sobreajuste (Overfitting)' : 'Ajuste Óptimo'}
                  </span>
                </div>

                <div className="w-full aspect-[16/10] bg-[#090e15] rounded-lg border border-slate-800 overflow-hidden relative">
                  <svg viewBox="0 0 300 240" className="w-full h-full">
                    {/* Polynomial Curve path based on degree */}
                    <path
                      d={
                        polyDegree === 1
                          ? 'M 10 190 L 290 50'
                          : polyDegree === 2
                          ? 'M 10 190 Q 150 40 290 80'
                          : polyDegree === 3
                          ? 'M 10 190 C 70 90, 180 180, 290 50'
                          : 'M 10 190 C 40 40, 80 230, 140 70 S 230 220, 290 50'
                      }
                      fill="none"
                      stroke={polyDegree > 4 ? '#ff0055' : '#00f0ff'}
                      strokeWidth="2.5"
                    />

                    {/* Data Points */}
                    {polyPoints.map((pt, idx) => (
                      <circle key={idx} cx={pt.x} cy={pt.y} r="4" fill="#00ff66" stroke="#0d1117" strokeWidth="1" />
                    ))}
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-2">
                  <span>MSE Error de Entrenamiento: <strong className="text-white">{(0.45 / polyDegree).toFixed(3)}</strong></span>
                  <span>Error de Test (Generalización): <strong className={polyDegree > 4 ? 'text-rose-400' : 'text-[#00ff66]'}>{(polyDegree > 4 ? 2.41 : 0.48).toFixed(2)}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Grado del Polinomio ($d$):</span>
                    <span className="text-cyan-400 font-bold">Grado {polyDegree}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={polyDegree}
                    onChange={(e) => setPolyDegree(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>1 (Lineal)</span>
                    <span>3 (Cúbico)</span>
                    <span>6 (Sobreajuste)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300">Penalización Ridge ($\lambda$ L2):</span>
                    <span className="text-cyan-400 font-bold">{regularization.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={regularization}
                    onChange={(e) => setRegularization(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono">
                  <span className="text-cyan-300 font-bold block mb-1">COMPROMISO SESGO-VARIANZA:</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Polinomios de orden alto minimizan el sesgo en datos de prueba pero disparan la varianza empírica ante muestras no observadas.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= MODE 4: ANOMALY DETECTION ================= */}
          {activeMode === 'anomaly' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-8 bg-[#070b10] rounded-xl border border-cyan-500/20 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>ISOLATION FOREST • DISTRIBUCIÓN DE ANOMALÍAS</span>
                  <span className="text-rose-400">4 Anomalías Críticas</span>
                </div>

                <div className="w-full aspect-[16/10] bg-[#090e15] rounded-lg border border-slate-800 overflow-hidden relative">
                  <svg viewBox="0 0 300 240" className="w-full h-full">
                    {/* Ellipse of inliers */}
                    <ellipse cx="140" cy="120" rx="90" ry="55" fill="rgba(0, 255, 102, 0.08)" stroke="#00ff66" strokeWidth="1" strokeDasharray="2,2" />

                    {/* Regular data points (inliers) */}
                    {Array.from({ length: 40 }).map((_, i) => {
                      const ang = Math.random() * Math.PI * 2;
                      const radX = Math.random() * 80;
                      const radY = Math.random() * 45;
                      return (
                        <circle
                          key={`inl-${i}`}
                          cx={140 + Math.cos(ang) * radX}
                          cy={120 + Math.sin(ang) * radY}
                          r="2.5"
                          fill="#00ff66"
                          opacity="0.7"
                        />
                      );
                    })}

                    {/* Anomalies (Outliers) */}
                    {[
                      { x: 25, y: 35 },
                      { x: 275, y: 40 },
                      { x: 260, y: 210 },
                      { x: 45, y: 205 },
                    ].map((out, idx) => (
                      <g key={`out-${idx}`}>
                        <circle cx={out.x} cy={out.y} r="8" fill="none" stroke="#ff0055" strokeWidth="1.5" className="animate-ping" />
                        <circle cx={out.x} cy={out.y} r="4" fill="#ff0055" />
                        <text x={out.x} y={out.y - 10} fill="#ff0055" fontSize="8" fontFamily="monospace" textAnchor="middle">ANOMALÍA</text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-xs font-mono text-slate-300 font-bold block">FILTRO DE AISLAMIENTO:</span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Isolation Forest aísla anomalías construyendo árboles de decisión aleatorios: las observaciones atípicas requieren menor profundidad para ser particionadas.
                  </p>
                  <div className="pt-2 border-t border-slate-800 text-xs font-mono text-cyan-300">
                    Puntuación de Contaminación: 0.05 (5%)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
