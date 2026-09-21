import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TermIcon, CornerDownLeft, Trash2, HelpCircle, Sparkles, X } from 'lucide-react';

interface TerminalMessage {
  type: 'user' | 'system' | 'error' | 'success';
  content: string | React.ReactNode;
}

interface InteractiveTerminalProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isModal = false, onClose }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<TerminalMessage[]>([
    {
      type: 'system',
      content: (
        <div>
          <p className="text-cyan-400 font-bold">SYNAPSE AI KERNEL v4.19.0-MATRIX-x86_64</p>
          <p className="text-slate-400 text-xs mt-1">
            Bienvenido a la consola de comandos de SYNAPSE AI. Escribe <span className="text-[#00ff66] font-bold">help</span> para ver la lista de comandos disponibles.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add user command to history
    const newHistory: TerminalMessage[] = [
      ...history,
      { type: 'user', content: `synapse@matrix:~$ ${cmd}` },
    ];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'system',
          content: (
            <div className="space-y-1 text-xs">
              <p className="text-cyan-300 font-bold mb-1">COMANDOS DISPONIBLES EN EL SISTEMA:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                <div><span className="text-[#00ff66] font-bold">help</span> : Muestra este índice de comandos</div>
                <div><span className="text-[#00ff66] font-bold">about</span> : Misión y arquitectura de SYNAPSE AI</div>
                <div><span className="text-[#00ff66] font-bold">ai</span> : Fundamentos de Inteligencia Artificial</div>
                <div><span className="text-[#00ff66] font-bold">ml</span> : Taxonomía de Machine Learning</div>
                <div><span className="text-[#00ff66] font-bold">datascience</span> : Pipeline de Ciencia de Datos</div>
                <div><span className="text-[#00ff66] font-bold">models</span> : Arquitecturas neuronales en producción</div>
                <div><span className="text-[#00ff66] font-bold">stats</span> : Métricas y telemetría de inferencia</div>
                <div><span className="text-[#00ff66] font-bold">matrix</span> : Activa secuencia criptográfica</div>
                <div><span className="text-[#00ff66] font-bold">clear</span> : Limpia el búfer de la terminal</div>
              </div>
            </div>
          ),
        });
        break;

      case 'about':
        newHistory.push({
          type: 'system',
          content: (
            <p className="text-slate-300 text-xs leading-relaxed">
              <strong className="text-cyan-400">SYNAPSE AI</strong> es una plataforma tecnológica interactiva de vanguardia diseñada para la divulgación rigurosa de Inteligencia Artificial, Machine Learning y Ciencia de Datos. Construida con una estética Cyberpunk Matrix de alto rendimiento, simulaciones en tiempo real y cero dependencias de servidores externos.
            </p>
          ),
        });
        break;

      case 'ai':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs space-y-1 text-slate-300">
              <p className="text-cyan-400 font-bold">[CONCEPT] INTELIGENCIA ARTIFICIAL</p>
              <p>Disciplina que desarrolla agentes computacionales capaces de percibir su entorno, razonar formalmente, generalizar a partir de la experiencia y ejecutar acciones autónomas para alcanzar objetivos definidos.</p>
              <p className="text-slate-400">Ramas: Machine Learning, Deep Learning, Visión por Computadora, NLP, Robótica Cognitiva.</p>
            </div>
          ),
        });
        break;

      case 'ml':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs space-y-1 text-slate-300">
              <p className="text-[#00ff66] font-bold">[PARADIGMAS] MACHINE LEARNING</p>
              <p>• <strong className="text-white">Supervisado:</strong> $y = f(x)$ con etiquetas anotadas (Clasificación, Regresión).</p>
              <p>• <strong className="text-white">No Supervisado:</strong> Descubrimiento de estructura latente (K-Means, PCA, Autoencoders).</p>
              <p>• <strong className="text-white">Por Refuerzo (RL):</strong> Optimización de políticas mediante recompensa/castigo (MDP, Q-Learning, PPO).</p>
            </div>
          ),
        });
        break;

      case 'datascience':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs space-y-1 text-slate-300">
              <p className="text-blue-400 font-bold">[PIPELINE] CIENCIA DE DATOS DE EXTREMO A EXTREMO</p>
              <p>1. Ingesta de Datos (Batch / Kafka Streaming)</p>
              <p>2. Limpieza e Imputación de Valores Nulos</p>
              <p>3. Análisis Exploratorio de Datos (EDA) & Correlaciones</p>
              <p>4. Ingeniería de Características (Embeddings / Normalización)</p>
              <p>5. Entrenamiento y Ajuste de Hiperparámetros (Optuna)</p>
              <p>6. Validación Cruzada & Evaluación de Métricas</p>
              <p>7. Despliegue en Producción MLOps con Docker & Kubernetes</p>
            </div>
          ),
        });
        break;

      case 'models':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs space-y-1 text-slate-300">
              <p className="text-purple-400 font-bold">[ZOO DE MODELOS] ARQUITECTURAS EN CLÚSTER</p>
              <p>• <strong className="text-cyan-400">Transformers Decoders:</strong> Atención multi-cabeza autorregresiva (GPT, Llama, Gemini).</p>
              <p>• <strong className="text-cyan-400">Diffusion Models:</strong> Desruido iterativo de espacio latente (Stable Diffusion, Imagen).</p>
              <p>• <strong className="text-cyan-400">CNNs Profundas:</strong> Convoluciones espaciales para visión (ResNet, ConvNeXt, YOLO).</p>
              <p>• <strong className="text-cyan-400">Gradient Boosting:</strong> Árboles de decisión aditivos ultrarrápidos (XGBoost, LightGBM).</p>
            </div>
          ),
        });
        break;

      case 'stats':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs font-mono space-y-1 text-slate-300">
              <p className="text-amber-400 font-bold">[TELEMETRÍA ACTUAL DEL SISTEMA]</p>
              <p>• Throughput de Inferencia : 12,480 peticiones/segundo</p>
              <p>• Latencia Promedio (p99)   : 4.8 ms</p>
              <p>• Precisión Ponderada (F1) : 98.7%</p>
              <p>• Datasets en Memoria      : 1,482 colecciones activas</p>
              <p>• Volumen Procesado Hoy    : 84.9 Terabytes</p>
              <p>• Estado de los Nodos      : 100% OPERATIVO (GREEN)</p>
            </div>
          ),
        });
        break;

      case 'matrix':
        newHistory.push({
          type: 'system',
          content: (
            <div className="text-xs font-mono text-[#00ff66] space-y-0.5 animate-pulse">
              <p>01001111 01010000 01000101 01001110 00100000 01011001</p>
              <p>DESPERTAR COGNITIVO SINÁPTICO AUTORIZADO...</p>
              <p>01001101 01000001 01010100 01010010 01001001 01011000</p>
              <p className="text-cyan-400">Acceso concedido al núcleo de red neuronal artificial.</p>
            </div>
          ),
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'error',
          content: (
            <p className="text-rose-400 text-xs">
              Comando desconocido: &quot;{cmd}&quot;. Escribe <span className="underline font-bold text-white">help</span> para consultar las instrucciones válidas.
            </p>
          ),
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  const quickCommands = ['help', 'about', 'ai', 'ml', 'datascience', 'models', 'stats', 'clear'];

  const containerContent = (
    <div className="glass-panel rounded-2xl border border-cyan-500/40 shadow-[0_0_35px_rgba(0,240,255,0.2)] overflow-hidden flex flex-col h-[520px]">
      {/* Terminal Title Bar */}
      <div className="bg-[#070b10] px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <TermIcon className="w-3.5 h-3.5 text-cyan-400" />
            synapse-shell // bash 5.2 (tty1)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            title="Limpiar terminal"
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="bg-[#090d14] px-4 py-2 border-b border-slate-800 flex flex-wrap gap-1.5 text-[11px] font-mono">
        <span className="text-slate-500 self-center mr-1">Comandos Rápidos:</span>
        {quickCommands.map((q) => (
          <button
            key={q}
            onClick={() => handleCommand(q)}
            className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Output Console History */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 bg-[#05080c] cursor-text"
      >
        {history.map((msg, i) => (
          <div key={i} className="leading-relaxed">
            {msg.content}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Row */}
      <div className="bg-[#070b10] px-4 py-3 border-t border-slate-800 flex items-center gap-2 font-mono text-xs">
        <span className="text-[#00ff66] font-bold">synapse@matrix:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un comando (ej: help, stats, models)..."
          className="flex-1 bg-transparent text-cyan-300 focus:outline-none placeholder-slate-600 caret-cyan-400"
          autoFocus
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="max-w-3xl w-full">
          {containerContent}
        </div>
      </div>
    );
  }

  return (
    <section id="terminal" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>MÓDULO 12 • INTERFAZ DE LÍNEA DE COMANDOS (CLI)</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            TERMINAL <span className="text-cyan-400 text-glow-cyan">INTERACTIVA</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            Explora la base de conocimiento y los diagnósticos del sistema a través de una consola con comandos UNIX y respuestas formatadas en tiempo real.
          </p>
        </div>

        {containerContent}
      </div>
    </section>
  );
};
