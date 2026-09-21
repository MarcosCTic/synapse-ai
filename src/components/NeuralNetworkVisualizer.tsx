import React, { useState, useEffect, useRef } from 'react';
import { Network, Play, RefreshCw, Sliders, Zap, CheckCircle, Info } from 'lucide-react';

export const NeuralNetworkVisualizer: React.FC = () => {
  const [numInputs, setNumInputs] = useState<number>(3);
  const [numHiddenLayers, setNumHiddenLayers] = useState<number>(2);
  const [neuronsPerHidden, setNeuronsPerHidden] = useState<number>(4);
  const [numOutputs, setNumOutputs] = useState<number>(2);
  const [activationFunc, setActivationFunc] = useState<'relu' | 'sigmoid' | 'tanh'>('relu');
  const [weightMultiplier, setWeightMultiplier] = useState<number>(1.2);
  const [isPropagating, setIsPropagating] = useState<boolean>(false);
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(-1);
  const [selectedNode, setSelectedNode] = useState<{ layer: number; index: number; val: number } | null>(null);

  // Activations state across layers
  const [layerActivations, setLayerActivations] = useState<number[][]>([]);

  // Calculate layer structure: e.g. [numInputs, neuronsPerHidden, ..., numOutputs]
  const layerSizes = [
    numInputs,
    ...Array(numHiddenLayers).fill(neuronsPerHidden),
    numOutputs,
  ];

  // Initialize random pseudo-activations based on inputs and weights
  useEffect(() => {
    computeActivations();
  }, [numInputs, numHiddenLayers, neuronsPerHidden, numOutputs, activationFunc, weightMultiplier]);

  const activate = (x: number) => {
    if (activationFunc === 'relu') return Math.max(0, x);
    if (activationFunc === 'sigmoid') return 1 / (1 + Math.exp(-x));
    return Math.tanh(x);
  };

  const computeActivations = () => {
    const acts: number[][] = [];
    // Input layer values (normalized 0.1 - 0.9)
    const inputs = Array.from({ length: numInputs }, (_, i) => +(0.2 + (i * 0.3) % 0.8).toFixed(2));
    acts.push(inputs);

    for (let l = 1; l < layerSizes.length; l++) {
      const prev = acts[l - 1];
      const currentCount = layerSizes[l];
      const currentLayer: number[] = [];
      for (let j = 0; j < currentCount; j++) {
        // Weighted sum of previous activations
        let z = 0;
        for (let k = 0; k < prev.length; k++) {
          const pseudoWeight = (Math.sin((l * 10 + j * 5 + k) * 1.5) * weightMultiplier);
          z += prev[k] * pseudoWeight;
        }
        z += 0.1 * j; // bias
        currentLayer.push(+activate(z).toFixed(2));
      }
      acts.push(currentLayer);
    }
    setLayerActivations(acts);
  };

  const handleForwardPass = () => {
    if (isPropagating) return;
    setIsPropagating(true);
    setActiveLayerIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= layerSizes.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsPropagating(false);
          setActiveLayerIndex(-1);
        }, 600);
      } else {
        setActiveLayerIndex(current);
      }
    }, 450);
  };

  return (
    <section id="redes-neuronales" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            <span>MÓDULO 04 • ARQUITECTURAS CONEXIONISTAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            REDES <span className="text-cyan-400 text-glow-cyan">NEURONALES</span> ARTIFICIALES
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Explora la sinergia entre capas de entrada, representaciones latentes ocultas y salidas predictivas. Modifica la topología y observa la propagación tensorial en tiempo real.
          </p>
        </div>

        {/* Visualizer Shell */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-cyan-500/30">
          {/* Top Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3">
              {/* Activation function picker */}
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Activación:</span>
                {(['relu', 'sigmoid', 'tanh'] as const).map((fn) => (
                  <button
                    key={fn}
                    onClick={() => setActivationFunc(fn)}
                    className={`px-2 py-0.5 rounded uppercase font-bold transition-all cursor-pointer ${
                      activationFunc === fn
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {fn}
                  </button>
                ))}
              </div>

              {/* Weight Multiplier */}
              <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Pesos (W):</span>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={weightMultiplier}
                  onChange={(e) => setWeightMultiplier(parseFloat(e.target.value))}
                  className="w-20 accent-cyan-400 cursor-pointer"
                />
                <span className="text-cyan-400 font-bold">{weightMultiplier}x</span>
              </div>
            </div>

            {/* Forward pass trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={computeActivations}
                className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Aleatorizar</span>
              </button>

              <button
                onClick={handleForwardPass}
                disabled={isPropagating}
                className={`px-5 py-2 rounded-lg font-tech font-bold text-sm tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  isPropagating
                    ? 'bg-cyan-900/60 text-cyan-400 border border-cyan-500/40 animate-pulse cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.35)]'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPropagating ? 'PROPAGANDO...' : 'PROPAGAR SEÑAL (FORWARD PASS)'}</span>
              </button>
            </div>
          </div>

          {/* Architecture Sliders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-slate-800/80 text-xs font-mono">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Entradas:</span>
                <span className="text-cyan-400 font-bold">{numInputs}</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                value={numInputs}
                onChange={(e) => setNumInputs(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-1 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Capas Ocultas:</span>
                <span className="text-[#00ff66] font-bold">{numHiddenLayers}</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={numHiddenLayers}
                onChange={(e) => setNumHiddenLayers(parseInt(e.target.value))}
                className="w-full accent-[#00ff66] h-1 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Neuronas/Capa:</span>
                <span className="text-[#00ff66] font-bold">{neuronsPerHidden}</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                value={neuronsPerHidden}
                onChange={(e) => setNeuronsPerHidden(parseInt(e.target.value))}
                className="w-full accent-[#00ff66] h-1 bg-slate-800 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">Salidas:</span>
                <span className="text-blue-400 font-bold">{numOutputs}</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={numOutputs}
                onChange={(e) => setNumOutputs(parseInt(e.target.value))}
                className="w-full accent-blue-400 h-1 bg-slate-800 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive SVG Network Canvas */}
          <div className="my-6 relative bg-[#070b10] rounded-xl border border-cyan-500/25 p-4 overflow-x-auto min-h-[360px] flex items-center justify-center">
            {/* SVG Canvas for Synaptic Connections and Nodes */}
            <svg
              className="w-full h-[320px] min-w-[500px]"
              viewBox={`0 0 ${layerSizes.length * 120} 320`}
            >
              {/* Draw Synapses (Lines between layers) */}
              {layerSizes.map((layerSize, lIdx) => {
                if (lIdx === layerSizes.length - 1) return null;
                const nextLayerSize = layerSizes[lIdx + 1];
                const x1 = 60 + lIdx * 120;
                const x2 = 60 + (lIdx + 1) * 120;

                const lines = [];
                for (let i = 0; i < layerSize; i++) {
                  const y1 = 160 - ((layerSize - 1) * 45) / 2 + i * 45;
                  for (let j = 0; j < nextLayerSize; j++) {
                    const y2 = 160 - ((nextLayerSize - 1) * 45) / 2 + j * 45;
                    const isSynapseActive = activeLayerIndex === lIdx;
                    const weightVal = Math.sin((lIdx * 10 + j * 5 + i) * 1.5);
                    const strokeColor = weightVal > 0 
                      ? isSynapseActive ? '#00f0ff' : 'rgba(0, 240, 255, 0.22)' 
                      : isSynapseActive ? '#ff4466' : 'rgba(255, 68, 102, 0.18)';
                    const strokeWidth = isSynapseActive ? 2.2 : Math.max(0.6, Math.abs(weightVal) * 1.6);

                    lines.push(
                      <line
                        key={`syn-${lIdx}-${i}-${j}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={isSynapseActive ? '4,2' : undefined}
                      />
                    );
                  }
                }
                return lines;
              })}

              {/* Draw Neurons */}
              {layerSizes.map((layerSize, lIdx) => {
                const x = 60 + lIdx * 120;
                const isCurrentLayerActive = activeLayerIndex === lIdx;

                return Array.from({ length: layerSize }, (_, i) => {
                  const y = 160 - ((layerSize - 1) * 45) / 2 + i * 45;
                  const actVal = layerActivations[lIdx]?.[i] ?? 0;
                  const isOutput = lIdx === layerSizes.length - 1;
                  const isInput = lIdx === 0;

                  const nodeColor = isInput ? '#00f0ff' : isOutput ? '#3b82f6' : '#00ff66';

                  return (
                    <g
                      key={`node-${lIdx}-${i}`}
                      onClick={() => setSelectedNode({ layer: lIdx, index: i, val: actVal })}
                      className="cursor-pointer group"
                    >
                      {/* Outer pulse when active in forward pass */}
                      {isCurrentLayerActive && (
                        <circle
                          cx={x}
                          cy={y}
                          r="18"
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth="1.5"
                          className="animate-ping opacity-60"
                        />
                      )}

                      {/* Main Node Body */}
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="#0d1117"
                        stroke={isCurrentLayerActive ? '#ffffff' : nodeColor}
                        strokeWidth={isCurrentLayerActive ? '2.5' : '1.8'}
                        className="transition-all duration-200 group-hover:scale-125"
                      />

                      {/* Inner activation indicator */}
                      <circle
                        cx={x}
                        cy={y}
                        r={Math.min(9, Math.max(2, actVal * 8))}
                        fill={nodeColor}
                        opacity="0.85"
                      />

                      {/* Value label */}
                      <text
                        x={x}
                        y={y + 3.5}
                        textAnchor="middle"
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="bold"
                        fill="#ffffff"
                      >
                        {actVal}
                      </text>

                      {/* Layer labels at bottom/top */}
                      {i === 0 && (
                        <text
                          x={x}
                          y="25"
                          textAnchor="middle"
                          fontSize="9"
                          fontFamily="monospace"
                          fill={nodeColor}
                          fontWeight="bold"
                        >
                          {isInput ? 'ENTRADA' : isOutput ? 'SALIDA' : `OCULTA ${lIdx}`}
                        </text>
                      )}
                    </g>
                  );
                });
              })}
            </svg>
          </div>

          {/* Node Inspector Footer */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              {selectedNode ? (
                <span className="text-slate-200">
                  Neurona seleccionada: <strong className="text-cyan-300">Capa {selectedNode.layer}, Índice {selectedNode.index}</strong> • Valor de Activación: <strong className="text-[#00ff66]">{selectedNode.val}</strong>
                </span>
              ) : (
                <span className="text-slate-400">
                  Haz clic en cualquier neurona para inspeccionar sus coeficientes y tensor de activación.
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> Entrada
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00ff66]" /> Oculta
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Salida
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
