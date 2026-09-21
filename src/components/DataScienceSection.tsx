import React, { useState } from 'react';
import { 
  Database, 
  Filter, 
  Search, 
  BarChart3, 
  Binary, 
  LineChart as LineIcon, 
  CheckSquare, 
  ArrowRight,
  TrendingDown,
  Sparkles,
  PieChart
} from 'lucide-react';
import { DataScienceStage } from '../types';

export const DataScienceSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [cleanedView, setCleanedView] = useState<boolean>(false);
  const [hoveredCorr, setHoveredCorr] = useState<{ feat1: string; feat2: string; r: number } | null>(null);

  const stages: DataScienceStage[] = [
    {
      step: 1,
      name: 'Recolección de Datos',
      shortDesc: 'Ingesta de fuentes heterogéneas',
      fullDesc: 'Extracción continua desde Data Lakes, APIs REST/GraphQL, bases de datos SQL/NoSQL, telemetría IoT y streaming Kafka.',
      tools: ['Apache Kafka', 'DuckDB', 'AWS S3', 'Airflow', 'Snowflake'],
      output: 'Raw Data Lakehouse estructurado y semiestructurado',
      iconName: 'Database'
    },
    {
      step: 2,
      name: 'Limpieza & Transformación',
      shortDesc: 'Curación, normalización e imputación',
      fullDesc: 'Filtrado de duplicados, imputación por KNN de valores nulos, eliminación de outliers IQR y escalado estándar (Z-score).',
      tools: ['Pandas', 'Polars', 'dbt', 'PySpark', 'NumPy'],
      output: 'Dataset curado, balanceado y tipificado',
      iconName: 'Filter'
    },
    {
      step: 3,
      name: 'Análisis Exploratorio (EDA)',
      shortDesc: 'Descubrimiento y profiling estadístico',
      fullDesc: 'Inspección de sesgos de distribución, correlaciones multivariables, matrices de dispersión y análisis de componentes principales.',
      tools: ['Seaborn', 'YData Profiling', 'Matplotlib', 'Jupyter'],
      output: 'Reporte diagnóstico y mapa de correlaciones',
      iconName: 'Search'
    },
    {
      step: 4,
      name: 'Estadística & Inferencia',
      shortDesc: 'Validación rigurosa de hipótesis',
      fullDesc: 'Test A/B, pruebas t de Student, ANOVA, análisis bayesiano, intervalos de confianza al 95% y modelado probabilístico.',
      tools: ['SciPy', 'Statsmodels', 'R Studio', 'PyMC'],
      output: 'Significancia estadística confirmada (p-value < 0.01)',
      iconName: 'Binary'
    },
    {
      step: 5,
      name: 'Modelado Predictivo',
      shortDesc: 'Entrenamiento y validación cruzada',
      fullDesc: 'Búsqueda de hiperparámetros (Optuna), K-Fold Cross Validation, ensamblado de modelos y evaluación con ROC-AUC y F1-Score.',
      tools: ['Scikit-learn', 'XGBoost', 'LightGBM', 'MLflow'],
      output: 'Artefactos de modelo serializados (.onnx / .pkl)',
      iconName: 'BarChart3'
    },
    {
      step: 6,
      name: 'Visualización & BI',
      shortDesc: 'Comunicación de hallazgos accionables',
      fullDesc: 'Construcción de dashboards interactivos, visualizaciones de series temporales y tableros explicativos para stakeholders.',
      tools: ['D3.js', 'Plotly', 'PowerBI', 'Tableau', 'Grafana'],
      output: 'Dashboards dinámicos en tiempo real',
      iconName: 'LineIcon'
    },
    {
      step: 7,
      name: 'Decisión & Despliegue',
      shortDesc: 'Impacto estratégico en producción',
      fullDesc: 'Integración del modelo en pipelines MLOps con monitoreo de data drift y adopción de decisiones orientadas por datos.',
      tools: ['FastAPI', 'Docker', 'Kubernetes', 'Evidently AI'],
      output: 'Retorno de Inversión (ROI) y valor operativo cuantificado',
      iconName: 'CheckSquare'
    },
  ];

  // Correlation matrix mockup
  const features = ['Edad', 'Ingresos', 'Gasto', 'Score', 'Frecuencia'];
  const corrMatrix = [
    [1.00, 0.42, -0.15, 0.28, 0.05],
    [0.42, 1.00, 0.76, 0.65, 0.31],
    [-0.15, 0.76, 1.00, 0.52, 0.88],
    [0.28, 0.65, 0.52, 1.00, 0.41],
    [0.05, 0.31, 0.88, 0.41, 1.00],
  ];

  return (
    <section id="ciencia-datos" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 03 • PIPELINE DE DATA SCIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            CIENCIA DE <span className="text-cyan-400 text-glow-cyan">DATOS</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            El ciclo end-to-end de valor: desde la ingesta cruda y el análisis exploratorio riguroso hasta la visualización y la toma de decisiones empresariales.
          </p>
        </div>

        {/* 7-Step Pipeline Breadcrumb Navigation */}
        <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 mb-8 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[760px] gap-2">
            {stages.map((st, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={st.step}
                  onClick={() => setActiveStep(idx)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-mono mb-1">
                    <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                      {st.step}
                    </span>
                    <span className="truncate">{st.name.split(' ')[0]}</span>
                  </div>
                  <div className="text-xs font-tech font-bold text-white truncate">
                    {st.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Inspector */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-500/40 font-bold">
                  ETAPA 0{stages[activeStep].step} DE 07
                </span>
                <span className="text-xs font-mono text-[#00ff66]">
                  FASE: {stages[activeStep].shortDesc}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-tech font-bold text-white mb-3">
                {stages[activeStep].name}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {stages[activeStep].fullDesc}
              </p>

              {/* Tools Stack */}
              <div className="mb-6">
                <span className="text-xs font-mono text-slate-400 block mb-2">HERRAMIENTAS & FRAMEWORKS UTILIZADOS:</span>
                <div className="flex flex-wrap gap-2">
                  {stages[activeStep].tools.map(tool => (
                    <span key={tool} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Deliverable */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#00ff66] block">
                  ENTREGABLE DE LA FASE
                </span>
                <p className="text-xs sm:text-sm font-tech font-bold text-white">
                  {stages[activeStep].output}
                </p>
              </div>
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % stages.length)}
                className="px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Siguiente Fase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Interactive SVG Charts Showcase */}
          <div className="lg:col-span-5 bg-[#070b10] p-5 rounded-xl border border-cyan-500/20 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                SIMULACIÓN VISUAL DEL DATASET
              </span>
              <button
                onClick={() => setCleanedView(!cleanedView)}
                className={`px-2 py-0.5 rounded text-[11px] border transition-colors cursor-pointer ${
                  cleanedView 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {cleanedView ? '✓ Curado (Sin Ruido)' : 'Datos Crudos (Raw)'}
              </button>
            </div>

            {/* SVG Distribution Plot */}
            <div className="my-4">
              <div className="text-[11px] font-mono text-slate-400 mb-1 flex justify-between">
                <span>Campana de Gauss / Distribución Normal</span>
                <span className="text-cyan-400">{cleanedView ? 'σ = 1.0 (Normalizada)' : 'σ = 2.4 (Con Outliers)'}</span>
              </div>
              <div className="w-full h-32 bg-[#090e15] rounded-lg border border-slate-800 relative overflow-hidden flex items-end px-2">
                <svg className="w-full h-full" viewBox="0 0 200 80" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="200" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                  
                  {/* Curve */}
                  <path
                    d={
                      cleanedView
                        ? 'M 10 75 Q 60 70, 80 50 Q 100 10, 120 50 Q 140 70, 190 75'
                        : 'M 10 75 Q 30 20, 50 65 Q 100 15, 130 55 Q 170 30, 190 75'
                    }
                    fill="none"
                    stroke={cleanedView ? '#00ff66' : '#00f0ff'}
                    strokeWidth="2"
                  />
                  {/* Area fill */}
                  <path
                    d={
                      cleanedView
                        ? 'M 10 75 Q 60 70, 80 50 Q 100 10, 120 50 Q 140 70, 190 75 L 190 80 L 10 80 Z'
                        : 'M 10 75 Q 30 20, 50 65 Q 100 15, 130 55 Q 170 30, 190 75 L 190 80 L 10 80 Z'
                    }
                    fill={cleanedView ? 'rgba(0, 255, 102, 0.15)' : 'rgba(0, 240, 255, 0.15)'}
                  />

                  {/* Outlier markers when raw */}
                  {!cleanedView && (
                    <>
                      <circle cx="30" cy="20" r="3" fill="#ff4466" />
                      <circle cx="170" cy="30" r="3" fill="#ff4466" />
                      <text x="35" y="22" fill="#ff4466" fontSize="6" fontFamily="monospace">Outlier #1</text>
                      <text x="140" y="32" fill="#ff4466" fontSize="6" fontFamily="monospace">Outlier #2</text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            {/* Interactive Correlation Heatmap Preview */}
            <div>
              <div className="text-[11px] font-mono text-slate-400 mb-1 flex justify-between">
                <span>Matriz de Correlación de Pearson ($r$)</span>
                {hoveredCorr ? (
                  <span className="text-[#00ff66] font-bold">
                    {hoveredCorr.feat1} ↔ {hoveredCorr.feat2}: r = {hoveredCorr.r.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-slate-500">Pasa el cursor por las celdas</span>
                )}
              </div>

              <div className="grid grid-cols-5 gap-1 p-2 bg-[#090e15] rounded-lg border border-slate-800">
                {corrMatrix.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const absVal = Math.abs(val);
                    const isPositive = val >= 0;
                    const bgOpacity = Math.max(0.15, absVal * 0.85);
                    const bgColor = isPositive 
                      ? `rgba(0, 240, 255, ${bgOpacity})` 
                      : `rgba(255, 68, 102, ${bgOpacity})`;
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        onMouseEnter={() => setHoveredCorr({ feat1: features[rIdx], feat2: features[cIdx], r: val })}
                        onMouseLeave={() => setHoveredCorr(null)}
                        style={{ backgroundColor: bgColor }}
                        className="aspect-square flex items-center justify-center rounded text-[10px] font-mono font-bold text-white border border-slate-900 hover:border-white transition-all cursor-pointer"
                      >
                        {val.toFixed(1)}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
