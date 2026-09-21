import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Activity, 
  Database, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  HardDrive, 
  PieChart as PieIcon, 
  LineChart as LineIcon,
  ScatterChart,
  RefreshCw,
  Play,
  Pause
} from 'lucide-react';

export const DataScienceDashboard: React.FC = () => {
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [metrics, setMetrics] = useState({
    datasets: 1482,
    activeModels: 32,
    predictionsPerSec: 12480,
    accuracy: 98.7,
    processedDataTB: 84.9,
  });

  // Streaming real-time line data (12 points)
  const [linePoints, setLinePoints] = useState<number[]>([45, 52, 48, 60, 58, 65, 72, 68, 80, 85, 78, 88]);

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        datasets: prev.datasets + (Math.random() > 0.8 ? 1 : 0),
        activeModels: 32,
        predictionsPerSec: 12000 + Math.floor(Math.random() * 1200),
        accuracy: +(98.5 + Math.random() * 0.4).toFixed(1),
        processedDataTB: +(prev.processedDataTB + 0.04).toFixed(1),
      }));

      setLinePoints((prev) => {
        const nextVal = Math.max(30, Math.min(95, prev[prev.length - 1] + (Math.random() - 0.48) * 16));
        return [...prev.slice(1), Math.round(nextVal)];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Model comparison data for Bar Chart
  const modelComparisons = [
    { name: 'LLM Transformer', accuracy: 98.8, latency: '14ms', color: '#00f0ff' },
    { name: 'XGBoost Ensemble', accuracy: 96.4, latency: '2ms', color: '#00ff66' },
    { name: 'CNN ResNet-101', accuracy: 97.2, latency: '8ms', color: '#3b82f6' },
    { name: 'LightGBM Regressor', accuracy: 95.8, latency: '1.5ms', color: '#a855f7' },
    { name: 'Random Forest', accuracy: 93.9, latency: '3ms', color: '#f59e0b' },
  ];

  // Data Distribution for Donut Chart
  const dataDistribution = [
    { type: 'Texto / NLP', percentage: 42, color: '#00f0ff' },
    { type: 'Imágenes / Visión', percentage: 28, color: '#00ff66' },
    { type: 'Datos Tabulares', percentage: 18, color: '#3b82f6' },
    { type: 'Audio / Señales', percentage: 12, color: '#f43f5e' },
  ];

  // Scatter points for t-SNE latent representation
  const scatterClusters = [
    { cx: 45, cy: 50, color: '#00f0ff' },
    { cx: 150, cy: 130, color: '#00ff66' },
    { cx: 230, cy: 70, color: '#3b82f6' },
  ];

  return (
    <section id="dashboard" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-ping" />
              <span>MÓDULO 07 • TELEMETRÍA EN TIEMPO REAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
              DASHBOARD DE <span className="text-cyan-400 text-glow-cyan">DATA SCIENCE</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm font-sans max-w-xl">
              Monitor centralizado de operaciones MLOps, ingesta masiva de datasets, rendimiento inferencial y métricas de precisión analítica.
            </p>
          </div>

          {/* Live streaming status toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all cursor-pointer ${
                isStreaming
                  ? 'bg-emerald-950/70 text-[#00ff66] border-emerald-500/40 shadow-[0_0_15px_rgba(0,255,102,0.2)]'
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}
            >
              {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isStreaming ? 'STREAMING EN VIVO' : 'PAUSADO'}</span>
            </button>
          </div>
        </div>

        {/* 5 Futuristic Dynamic Metrics KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
          {/* DATASETS */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
              <span>DATASETS</span>
              <Database className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {metrics.datasets.toLocaleString('es-ES')}
            </div>
            <div className="text-[10px] font-mono text-cyan-400/80 mt-1">Colecciones activas</div>
          </div>

          {/* MODELOS */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
              <span>MODELOS</span>
              <Cpu className="w-3.5 h-3.5 text-[#00ff66]" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {metrics.activeModels}
            </div>
            <div className="text-[10px] font-mono text-emerald-400/80 mt-1">Servidos en clúster</div>
          </div>

          {/* PREDICCIONES */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
              <span>PREDICCIONES</span>
              <Zap className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {metrics.predictionsPerSec.toLocaleString('es-ES')} <span className="text-xs text-slate-400">/s</span>
            </div>
            <div className="text-[10px] font-mono text-blue-400/80 mt-1">Throughput pico</div>
          </div>

          {/* PRECISIÓN */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
              <span>PRECISIÓN</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {metrics.accuracy}%
            </div>
            <div className="text-[10px] font-mono text-pink-400/80 mt-1">F1-Score ponderado</div>
          </div>

          {/* DATOS PROCESADOS */}
          <div className="glass-panel p-4 rounded-xl border border-cyan-500/20 col-span-2 md:col-span-1">
            <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono mb-1">
              <span>DATOS PROCESADOS</span>
              <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-white">
              {metrics.processedDataTB} <span className="text-xs text-slate-400">TB</span>
            </div>
            <div className="text-[10px] font-mono text-amber-400/80 mt-1">Lakehouse ingest</div>
          </div>
        </div>

        {/* 4 Cyberpunk Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Line Chart (Streaming Throughput) */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LineIcon className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-tech font-bold text-white">
                  GRÁFICO DE LÍNEAS: INFERENCIA Y CARGA DE TRABAJO (REQ/S)
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                Última lectura: {linePoints[linePoints.length - 1]}%
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="w-full h-48 bg-[#070b10] rounded-xl border border-slate-800 p-3 relative flex items-end">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 110 100" preserveAspectRatio="none">
                {/* Horizontal Guide lines */}
                <line x1="0" y1="25" x2="110" y2="25" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="50" x2="110" y2="50" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="75" x2="110" y2="75" stroke="rgba(255,255,255,0.05)" />

                {/* Shaded Area */}
                <path
                  d={`M 0,${100 - linePoints[0]} ${linePoints
                    .map((val, i) => `L ${(i / (linePoints.length - 1)) * 110},${100 - val}`)
                    .join(' ')} L 110,100 L 0,100 Z`}
                  fill="rgba(0, 240, 255, 0.12)"
                />

                {/* Line */}
                <path
                  d={`M 0,${100 - linePoints[0]} ${linePoints
                    .map((val, i) => `L ${(i / (linePoints.length - 1)) * 110},${100 - val}`)
                    .join(' ')}`}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Pulsing leading point */}
                <circle
                  cx={110}
                  cy={100 - linePoints[linePoints.length - 1]}
                  r="3.5"
                  fill="#00f0ff"
                  className="animate-ping"
                />
                <circle
                  cx={110}
                  cy={100 - linePoints[linePoints.length - 1]}
                  r="3"
                  fill="#ffffff"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-3">
              <span>T - 24s</span>
              <span className="text-[#00ff66] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" /> Telemetría regular (0 fallos)
              </span>
              <span>Tiempo Real</span>
            </div>
          </div>

          {/* Chart 2: Bar Chart (Model Performance) */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#00ff66]" />
                <h3 className="text-base font-tech font-bold text-white">
                  GRÁFICO DE BARRAS: PRECISIÓN COMPARATIVA POR MODELO
                </h3>
              </div>
              <span className="text-xs font-mono text-[#00ff66]">TOP 5 MODO PRODUCCIÓN</span>
            </div>

            <div className="space-y-3 my-2">
              {modelComparisons.map((m) => (
                <div key={m.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-200">{m.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400">Lat: {m.latency}</span>
                      <strong className="text-white">{m.accuracy}%</strong>
                    </div>
                  </div>
                  <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${m.accuracy}%`,
                        backgroundColor: m.color,
                        boxShadow: `0 0 10px ${m.color}80`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Métrica de Evaluación: F1-Score Macro</span>
              <span className="text-cyan-400">Validado en test set 100K</span>
            </div>
          </div>

          {/* Chart 3: Circular / Donut Chart (Data Distribution) */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-blue-400" />
                <h3 className="text-base font-tech font-bold text-white">
                  GRÁFICO CIRCULAR: DISTRIBUCIÓN DE DATOS PROCESADOS
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-400">100% PIPELINE</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
              {/* SVG Donut Chart */}
              <div className="w-36 h-36 relative flex items-center justify-center">
                <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0d1117" strokeWidth="6" />
                  
                  {/* Segment 1: Text (42%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#00f0ff"
                    strokeWidth="6"
                    strokeDasharray="42 58"
                    strokeDashoffset="0"
                  />
                  {/* Segment 2: Images (28%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#00ff66"
                    strokeWidth="6"
                    strokeDasharray="28 72"
                    strokeDashoffset="-42"
                  />
                  {/* Segment 3: Tabular (18%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#3b82f6"
                    strokeWidth="6"
                    strokeDasharray="18 82"
                    strokeDashoffset="-70"
                  />
                  {/* Segment 4: Audio (12%) */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#f43f5e"
                    strokeWidth="6"
                    strokeDasharray="12 88"
                    strokeDashoffset="-88"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xs font-mono text-slate-400">TOTAL</span>
                  <span className="text-sm font-mono font-bold text-white">84.9 TB</span>
                </div>
              </div>

              {/* Legends */}
              <div className="space-y-2 text-xs font-mono">
                {dataDistribution.map((item) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300">{item.type}</span>
                    <strong className="text-white ml-auto">{item.percentage}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              Ingesta multivariada procesada mediante Apache Arrow y Parquet.
            </div>
          </div>

          {/* Chart 4: Scatter Plot (Latent Embeddings t-SNE) */}
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/25 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ScatterChart className="w-4 h-4 text-pink-400" />
                <h3 className="text-base font-tech font-bold text-white">
                  DISPERSIÓN DE DATOS: PROYECCIÓN LATENTE t-SNE / PCA
                </h3>
              </div>
              <span className="text-xs font-mono text-pink-400">3 CLUSTERS</span>
            </div>

            {/* SVG Scatter Plot */}
            <div className="w-full h-48 bg-[#070b10] rounded-xl border border-slate-800 p-2 relative overflow-hidden">
              <svg viewBox="0 0 280 160" className="w-full h-full">
                {/* Axes */}
                <line x1="20" y1="140" x2="260" y2="140" stroke="rgba(255,255,255,0.1)" />
                <line x1="20" y1="20" x2="20" y2="140" stroke="rgba(255,255,255,0.1)" />

                {/* Cluster points */}
                {scatterClusters.map((cluster, cIdx) =>
                  Array.from({ length: 14 }).map((_, i) => {
                    const angle = (i / 14) * Math.PI * 2;
                    const r = 8 + Math.sin(i * 3 + cIdx) * 14;
                    const cx = cluster.cx + Math.cos(angle) * r;
                    const cy = cluster.cy + Math.sin(angle) * r;
                    return (
                      <circle
                        key={`sc-${cIdx}-${i}`}
                        cx={cx}
                        cy={cy}
                        r="2.5"
                        fill={cluster.color}
                        opacity="0.8"
                      />
                    );
                  })
                )}
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-3">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00f0ff]" /> Grupo Semántico A</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00ff66]" /> Grupo Semántico B</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3b82f6]" /> Grupo Semántico C</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
