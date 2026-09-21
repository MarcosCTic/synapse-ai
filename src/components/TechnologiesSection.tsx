import React, { useState } from 'react';
import { 
  Terminal, 
  Layers, 
  Database, 
  Cloud, 
  Container, 
  Cpu, 
  Code, 
  BookOpen, 
  Check, 
  Copy,
  ExternalLink 
} from 'lucide-react';
import { TechItem } from '../types';

export const TechnologiesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const technologies: TechItem[] = [
    {
      id: 'python',
      name: 'Python',
      category: 'core',
      color: '#00f0ff',
      ecosystem: 'Lenguaje Núcleo de la IA',
      description: 'Estándar de facto en computación científica y aprendizaje automático por su sintaxis expresiva y rico ecosistema matricial.',
      codeSnippet: `import numpy as np\n# Tensor multidimensional y producto interno\nx = np.array([[1.0, 2.0], [3.0, 4.0]])\nw = np.random.randn(2, 2)\ny = np.dot(x, w)\nprint("Inferencia tensorial completada:", y.shape)`
    },
    {
      id: 'pytorch',
      name: 'PyTorch',
      category: 'ml-framework',
      color: '#ff4466',
      ecosystem: 'Deep Learning & Autograd Dinámico',
      description: 'Framework de tensores acelerados por GPU y grafos computacionales dinámicos, predilecto para investigación y LLMs modernos.',
      codeSnippet: `import torch\nimport torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Linear(128, 64),\n    nn.ReLU(),\n    nn.Linear(64, 10)\n)\ninputs = torch.randn(32, 128)\nlogits = model(inputs)`
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      category: 'ml-framework',
      color: '#ffaa00',
      ecosystem: 'Producción & MLOps a Escala',
      description: 'Plataforma integral de aprendizaje profundo desarrollada por Google para entrenamiento distribuido y despliegue en servidor y edge con TF Lite.',
      codeSnippet: `import tensorflow as tf\n\nmodel = tf.keras.models.Sequential([\n    tf.keras.layers.Dense(64, activation='relu'),\n    tf.keras.layers.Dense(1, activation='sigmoid')\n])\nmodel.compile(optimizer='adam', loss='binary_crossentropy')`
    },
    {
      id: 'scikit-learn',
      name: 'Scikit-learn',
      category: 'ml-framework',
      color: '#3b82f6',
      ecosystem: 'Machine Learning Clásico',
      description: 'Herramienta eficiente para minería de datos y análisis predictivo: algoritmos de regresión, SVMs, clustering y pipelines de preprocesamiento.',
      codeSnippet: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\n\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_train, y_train)\nscore = clf.score(X_test, y_test)`
    },
    {
      id: 'pandas',
      name: 'Pandas',
      category: 'data',
      color: '#a855f7',
      ecosystem: 'Manipulación y Análisis de DataFrames',
      description: 'Estructuras de datos DataFrame de alto rendimiento para limpieza, agregación, pivoteo y análisis de series de tiempo.',
      codeSnippet: `import pandas as pd\n\ndf = pd.read_parquet("telemetria_ia.parquet")\nmetricas = df.groupby("cluster")["accuracy"].agg(["mean", "std"])\nprint(metricas.head())`
    },
    {
      id: 'numpy',
      name: 'NumPy',
      category: 'data',
      color: '#00ff66',
      ecosystem: 'Álgebra Lineal & Arreglos N-Dimensionales',
      description: 'Cálculo numérico vectorial optimizado en C para operaciones matriciales con broadcasting y transformadas rápidas de Fourier.',
      codeSnippet: `import numpy as np\n\nA = np.random.normal(0, 1, (1000, 1000))\n# Descomposición en Valores Singulares (SVD)\nU, S, Vt = np.linalg.svd(A)\nprint(f"Valores singulares superiores: {S[:5]}")`
    },
    {
      id: 'jupyter',
      name: 'Jupyter',
      category: 'core',
      color: '#f97316',
      ecosystem: 'Entornos de Notebooks Interactivos',
      description: 'Cuadernos reproducibles que integran código ejecutable, visualizaciones dinámicas, fórmulas matemáticas LaTeX y texto explicativo.',
      codeSnippet: `%matplotlib inline\nimport matplotlib.pyplot as plt\nplt.style.use('dark_background')\nplt.plot([1, 2, 4, 8, 16], color='#00f0ff')\nplt.title("Evolución de Aprendizaje")`
    },
    {
      id: 'sql',
      name: 'SQL',
      category: 'data',
      color: '#06b6d4',
      ecosystem: 'Bases de Datos & Data Warehouses',
      description: 'Lenguaje universal para consultas relacionales analíticas (OLAP/OLTP) en PostgreSQL, BigQuery, Snowflake y DuckDB.',
      codeSnippet: `SELECT \n    cluster_id,\n    AVG(prediction_latency) AS avg_lat,\n    COUNT(*) AS total_inferences\nFROM ai_inference_logs\nWHERE status = 'SUCCESS'\nGROUP BY cluster_id;`
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'infra',
      color: '#2563eb',
      ecosystem: 'Contenedorización Aislada y Portabilidad',
      description: 'Empaquetado de modelos y dependencias CUDA en microservicios ligeros para despliegue consistente en cualquier nube.',
      codeSnippet: `FROM nvidia/cuda:12.2.0-runtime-ubuntu22.04\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]`
    },
    {
      id: 'apis',
      name: 'APIs REST / gRPC',
      category: 'infra',
      color: '#10b981',
      ecosystem: 'Interfaces de Servicio e Inferencia',
      description: 'Puentes de comunicación asíncrona de alta velocidad con FastAPI y Protocol Buffers para servir predicciones a microservicios cliente.',
      codeSnippet: `from fastapi import FastAPI\napp = FastAPI()\n\n@app.post("/v1/predict")\nasync def infer(payload: FeatureVector):\n    prediction = model.predict(payload.tensor)\n    return {"prediction": prediction.tolist(), "confidence": 0.99}`
    },
    {
      id: 'cloud',
      name: 'Cloud Computing',
      category: 'infra',
      color: '#eab308',
      ecosystem: 'Infraestructura de Supercómputo (GCP / AWS)',
      description: 'Aceleración masiva con clusters de GPUs H100 y TPUs v5, almacenamiento elástico en Data Lakes y orquestación con Kubernetes.',
      codeSnippet: `# Despliegue en Kubernetes Pod con asignación de GPU\nresources:\n  limits:\n    nvidia.com/gpu: 4\n    memory: 64Gi\n    cpu: "16"`
    },
  ];

  const filteredTech = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(t => t.category === activeCategory);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="tecnologias" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 10 • ECOSISTEMA TECNOLÓGICO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            TECNOLOGÍAS Y <span className="text-cyan-400 text-glow-cyan">HERRAMIENTAS</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            El arsenal de ingeniería utilizado por científicos de datos e investigadores para idear, entrenar y desplegar soluciones de Inteligencia Artificial en escala global.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs font-mono">
          {[
            { id: 'all', label: 'Todas las Tecnologías' },
            { id: 'core', label: 'Lenguajes & Entornos' },
            { id: 'ml-framework', label: 'Frameworks ML/DL' },
            { id: 'data', label: 'Manipulación & Datos' },
            { id: 'infra', label: 'Infraestructura & Cloud' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.25)] font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTech.map((tech) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(tech)}
              className="glass-panel p-5 rounded-2xl border border-cyan-500/15 hover:border-cyan-400/50 transition-all transform hover:-translate-y-1.5 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                  />
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 uppercase">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-xl font-tech font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400/80 mb-2">
                  {tech.ecosystem}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400">
                <span>Ver Código & Snippet</span>
                <Code className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Tech Code Snippet */}
        {selectedTech && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-400 max-w-2xl w-full shadow-[0_0_40px_rgba(0,240,255,0.25)] relative">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: selectedTech.color, boxShadow: `0 0 10px ${selectedTech.color}` }}
                    />
                    <h3 className="text-2xl font-tech font-bold text-white">
                      {selectedTech.name}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    {selectedTech.ecosystem}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTech(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-mono text-xs cursor-pointer"
                >
                  ✕ Cerrar
                </button>
              </div>

              <p className="text-sm text-slate-300 mb-4">{selectedTech.description}</p>

              {/* Code Editor Box */}
              <div className="bg-[#070b10] rounded-xl border border-slate-800 p-4 relative mb-4">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 mb-2 border-b border-slate-800">
                  <span>SNIPPET DE DEMOSTRACIÓN</span>
                  <button
                    onClick={() => handleCopy(selectedTech.codeSnippet)}
                    className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copiado' : 'Copiar Código'}</span>
                  </button>
                </div>
                <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  {selectedTech.codeSnippet}
                </pre>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedTech(null)}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-tech font-bold text-sm tracking-wider cursor-pointer"
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
