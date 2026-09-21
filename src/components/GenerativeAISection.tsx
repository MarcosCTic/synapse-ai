import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  FileText, 
  Image as ImageIcon, 
  Code2, 
  Music, 
  Layers, 
  Send, 
  Sliders, 
  Volume2, 
  Copy, 
  Check, 
  Play, 
  Cpu
} from 'lucide-react';

export const GenerativeAISection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image' | 'code' | 'audio'>('text');
  const [prompt, setPrompt] = useState<string>('Generar arquitectura de un modelo Transformer para clasificación');
  const [temperature, setTemperature] = useState<number>(0.7);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [outputContent, setOutputContent] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [tokensCount, setTokensCount] = useState<number>(0);
  const [diffusionStep, setDiffusionStep] = useState<number>(100);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Preset prompts
  const presets = {
    text: [
      'Explicar el mecanismo de Auto-Atención (Self-Attention)',
      '¿Cuál es la diferencia entre difusión latente y GANs?',
      'Estrategias de mitigación de alucinaciones en LLMs',
    ],
    image: [
      'Ciudad ciberpunk con redes neuronales flotantes y lluvia de neón',
      'Cerebro biomecánico conectado a un supercomputador cuántico',
      'Matriz de datos multidimensionales en el espacio latente',
    ],
    code: [
      'Clase en Python para implementar Attention Layer',
      'Script de detección de anomalías con Isolation Forest',
      'Función de pérdida focal (Focal Loss) en PyTorch',
    ],
    audio: [
      'Sintetizar frecuencia armónica de resonancia 432Hz',
      'Onda de audio binaural para concentración neuronal',
      'Generación de paisaje sonoro sintético cyberpunk',
    ],
  };

  const handleSelectPreset = (p: string) => {
    setPrompt(p);
  };

  // Simulated Generation Engine
  const runGeneration = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setOutputContent('');
    setTokensCount(0);

    if (activeTab === 'text') {
      const textResponses = [
        `[INFERENCIA LOCAL LLM - MATRIX-CORE 70B]\n\nEl mecanismo de Self-Attention (Auto-Atención) computa representaciones contextualmente enriquecidas calculando matrices de compatibilidad:\n\nAttention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V\n\n1. Matriz Query (Q): Representa la consulta del token actual.\n2. Matriz Key (K): Define el descriptor de los tokens circundantes.\n3. Matriz Value (V): Almacena la carga semántica real.\n\nAl escalar por √d_k se evita que los gradientes colapsen en regiones con pendientes infinitesimales de la función softmax, permitiendo capturar dependencias a largo plazo con complejidad O(N²).`,
        `[INFERENCIA LOCAL LLM]\n\nEn arquitecturas generativas modernas, la difusión latente (Latent Diffusion Models) opera comprimiendo la imagen a un espacio latente de menor dimensionalidad mediante un VAE (Variational Autoencoder). Posteriormente, una red U-Net estima el ruido añadido progresivamente, invirtiendo el proceso de degradación paso a paso bajo la guía de embeddings semánticos (CLIP).`,
      ];
      const selected = textResponses[Math.floor(Math.random() * textResponses.length)];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < selected.length) {
          setOutputContent(selected.slice(0, index + 3));
          index += 3;
          setTokensCount((prev) => prev + 1);
        } else {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 15);
    } else if (activeTab === 'code') {
      const codeSample = `import torch
import torch.nn as nn
import math

class ScaledDotProductAttention(nn.Module):
    """Cálculo matricial de auto-atención tensorial"""
    def __init__(self, d_k: int):
        super().__init__()
        self.scale = 1.0 / math.sqrt(d_k)

    def forward(self, q, k, v, mask=None):
        scores = torch.matmul(q, k.transpose(-2, -1)) * self.scale
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attention_weights = torch.softmax(scores, dim=-1)
        output = torch.matmul(attention_weights, v)
        return output, attention_weights

# Instanciación y verificación de shapes
d_model, seq_len = 512, 64
q = torch.randn(1, 8, seq_len, 64) # Batch, Heads, Len, Dim
k = torch.randn(1, 8, seq_len, 64)
v = torch.randn(1, 8, seq_len, 64)

layer = ScaledDotProductAttention(d_k=64)
out, attn = layer(q, k, v)
print(f"Tensor Salida: {out.shape} -> Inferencia Exitosa [Loss: 0.002]")`;

      let index = 0;
      const interval = setInterval(() => {
        if (index < codeSample.length) {
          setOutputContent(codeSample.slice(0, index + 6));
          index += 6;
          setTokensCount((prev) => prev + 2);
        } else {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 12);
    } else if (activeTab === 'image') {
      // Denoising diffusion simulation on canvas
      setDiffusionStep(0);
      let step = 0;
      const interval = setInterval(() => {
        step += 4;
        setDiffusionStep(step);
        drawDiffusionCanvas(step);
        if (step >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
        }
      }, 70);
    } else if (activeTab === 'audio') {
      // Audio waveform synthesis simulation
      setIsGenerating(false);
      playSynthesizerTone();
    }
  };

  const drawDiffusionCanvas = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw cyber grid background
    ctx.fillStyle = '#090e17';
    ctx.fillRect(0, 0, w, h);

    const completionRatio = progress / 100;

    // Background matrix artwork representation
    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, '#001a33');
    gradient.addColorStop(0.5, '#002b4d');
    gradient.addColorStop(1, '#001122');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Render cyber elements fading in
    ctx.strokeStyle = `rgba(0, 240, 255, ${completionRatio})`;
    ctx.lineWidth = 1.5;
    
    // Isometric cityscape / neural node skyline
    const buildings = [
      { x: 30, y: 160, w: 40, h: 100 },
      { x: 80, y: 120, w: 50, h: 140 },
      { x: 140, y: 90, w: 60, h: 170 },
      { x: 210, y: 140, w: 45, h: 120 },
      { x: 265, y: 80, w: 55, h: 180 },
    ];

    buildings.forEach(b => {
      ctx.fillStyle = `rgba(13, 25, 45, ${completionRatio * 0.9})`;
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      // Windows
      ctx.fillStyle = `rgba(0, 255, 102, ${completionRatio * 0.7})`;
      for (let wy = b.y + 10; wy < b.y + b.h - 10; wy += 15) {
        for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 12) {
          ctx.fillRect(wx, wy, 4, 6);
        }
      }
    });

    // Neural Sun / Singularity
    ctx.beginPath();
    ctx.arc(170, 70, 32, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 240, 255, ${completionRatio * 0.4})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(0, 240, 255, ${completionRatio})`;
    ctx.stroke();

    // Gaussian Noise overlay that decreases as progress increases
    const noiseAlpha = Math.max(0, 1 - completionRatio);
    if (noiseAlpha > 0.05) {
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < noiseAlpha) {
          const noiseVal = Math.floor(Math.random() * 255);
          data[i] = noiseVal;     // R
          data[i + 1] = noiseVal; // G
          data[i + 2] = noiseVal; // B
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }
  };

  const playSynthesizerTone = () => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      // Gentle harmonic modulation
      osc.frequency.exponentialRampToValueAtTime(528, ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(432, ctx.currentTime + 1.6);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ia-generativa" className="py-24 relative border-t border-cyan-500/10 bg-[#090d13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
            <span>MÓDULO 05 • SÍNTESIS GENERATIVA & MULTIMODAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            IA <span className="text-pink-400 text-glow-cyan">GENERATIVA</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            La transición de modelos discriminativos a arquitecturas autoregresivas y difusivas capaces de crear contenido multimodal inédito.
          </p>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {[
            { id: 'text', label: 'Texto & LLMs', icon: FileText, color: 'text-cyan-400', desc: 'Transformers, Auto-regresión' },
            { id: 'image', label: 'Imagen & Arte', icon: ImageIcon, color: 'text-emerald-400', desc: 'Latent Diffusion, VAE' },
            { id: 'code', label: 'Código & Lógica', icon: Code2, color: 'text-purple-400', desc: 'AST, Tokenización sintáctica' },
            { id: 'audio', label: 'Audio & Voz', icon: Music, color: 'text-amber-400', desc: 'Espectrogramas, Vocoders' },
            { id: 'llms', label: 'Modelos Fundacionales', icon: Cpu, color: 'text-blue-400', desc: 'RLHF, Parámetros densos' },
            { id: 'multimodal', label: 'Multimodalidad', icon: Layers, color: 'text-pink-400', desc: 'Any-to-Any cross attention' },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="glass-panel p-4 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition-all text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                <h4 className="text-xs font-tech font-bold text-white mb-1">{item.label}</h4>
                <p className="text-[10px] font-mono text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Interactive Generative Lab Console */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-pink-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-tech font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400" />
                SIMULADOR DE MOTOR GENERATIVO LOCAL (CLIENT-SIDE)
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Experimenta con muestreo probabilístico, difusión y síntesis sin conexión externa.
              </p>
            </div>

            {/* Modality Selector Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {[
                { id: 'text', label: 'Texto', icon: FileText },
                { id: 'image', label: 'Difusión', icon: ImageIcon },
                { id: 'code', label: 'Código', icon: Code2 },
                { id: 'audio', label: 'Audio', icon: Music },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as 'text' | 'image' | 'code' | 'audio');
                      setOutputContent('');
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-400/50 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prompt Input & Controls */}
          <div className="my-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Escribe una instrucción para el modelo de IA..."
                className="flex-1 bg-slate-900/90 border border-slate-700 focus:border-pink-400 focus:outline-none rounded-xl px-4 py-3 text-sm text-white font-mono placeholder:text-slate-500"
              />
              <button
                onClick={runGeneration}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-xl font-tech font-bold text-base tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isGenerating
                    ? 'bg-pink-900/50 text-pink-300 border border-pink-500/40 animate-pulse'
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.35)]'
                }`}
              >
                {isGenerating ? <Cpu className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>{isGenerating ? 'GENERANDO...' : 'SINTETIZAR'}</span>
              </button>
            </div>

            {/* Presets and Temperature Slider */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-500">Ejemplos:</span>
                {presets[activeTab].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectPreset(p)}
                    className="px-2.5 py-1 rounded bg-slate-900/70 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-pink-500/30 truncate max-w-[280px] cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <Sliders className="w-3.5 h-3.5" />
                <span>Temperatura:</span>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-16 accent-pink-400 cursor-pointer"
                />
                <span className="text-pink-400 font-bold">{temperature}</span>
              </div>
            </div>
          </div>

          {/* Generation Output Terminal / Canvas */}
          <div className="bg-[#070b10] rounded-xl border border-slate-800 p-4 min-h-[220px] relative flex flex-col justify-between">
            {activeTab === 'image' ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-full max-w-sm aspect-[16/10] rounded-lg overflow-hidden border border-pink-500/30 relative shadow-[0_0_25px_rgba(236,72,153,0.15)]">
                  <canvas ref={canvasRef} width={340} height={210} className="w-full h-full" />
                </div>
                <div className="mt-3 text-xs font-mono text-slate-400 flex items-center gap-2">
                  <span>Paso de Difusión Inversa:</span>
                  <span className="text-pink-400 font-bold">{diffusionStep}%</span>
                  <span className="text-slate-500">• U-Net Denoising Model</span>
                </div>
              </div>
            ) : activeTab === 'audio' ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-pink-950/60 border border-pink-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  <Volume2 className="w-8 h-8 text-pink-400 animate-pulse" />
                </div>
                <p className="text-sm font-tech font-bold text-white mb-1">
                  SÍNTESIS DE FORMA DE ONDA DE AUDIO (WEB AUDIO API)
                </p>
                <p className="text-xs font-mono text-slate-400 mb-4">
                  Oscilador sinusoidal con rampa exponencial a 432Hz / 528Hz.
                </p>
                <button
                  onClick={playSynthesizerTone}
                  className="px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Reproducir Tono Armónico</span>
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800/80 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
                    STREAM DE SALIDA
                  </span>
                  <div className="flex items-center gap-3">
                    <span>Tokens generados: <strong className="text-pink-400">{tokensCount}</strong></span>
                    {outputContent && (
                      <button
                        onClick={handleCopy}
                        className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-[#00ff66]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    )}
                  </div>
                </div>

                <pre className="font-mono text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[300px]">
                  {outputContent || (
                    <span className="text-slate-600 italic">
                      Presiona "Sintetizar" para iniciar la inferencia del modelo generativo...
                    </span>
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
