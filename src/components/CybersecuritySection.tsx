import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Radio, 
  Search, 
  AlertTriangle, 
  Bug, 
  Lock, 
  Activity, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Terminal 
} from 'lucide-react';
import { SecurityEvent } from '../types';

export const CybersecuritySection: React.FC = () => {
  const [pipelineStep, setPipelineStep] = useState<number>(1);
  const [events, setEvents] = useState<SecurityEvent[]>([
    { id: 'SEC-892', timestamp: '17:34:02', ip: '192.168.4.112', vector: 'DDoS SYN Flood', riskScore: 94, status: 'MITIGADO', protocol: 'TCP' },
    { id: 'SEC-893', timestamp: '17:34:15', ip: '10.0.12.89', vector: 'Inyección SQL Ciega', riskScore: 88, status: 'BLOQUEADO', protocol: 'HTTPS' },
    { id: 'SEC-894', timestamp: '17:34:28', ip: '172.16.8.44', vector: 'Comportamiento Anómalo (UEBA)', riskScore: 62, status: 'ANALIZANDO', protocol: 'UDP' },
    { id: 'SEC-895', timestamp: '17:34:40', ip: '192.168.1.5', vector: 'Inspección Rutinaria Normal', riskScore: 12, status: 'NORMAL', protocol: 'HTTPS' },
  ]);

  // Live pipeline step auto-pulse
  useEffect(() => {
    const timer = setInterval(() => {
      setPipelineStep((prev) => (prev % 4) + 1);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  // Trigger simulated cyber attack
  const simulateAttack = () => {
    const vectors = [
      'Exfiltración de Credenciales Zero-Day',
      'Ransomware Polimórfico en Memoria',
      'Ataque de Fuerza Bruta Distribuido',
      'DNS Tunneling Clandestino',
    ];
    const newEvent: SecurityEvent = {
      id: `SEC-${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: new Date().toLocaleTimeString(),
      ip: `185.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      vector: vectors[Math.floor(Math.random() * vectors.length)],
      riskScore: Math.floor(Math.random() * 20 + 80),
      status: 'MITIGADO',
      protocol: 'HTTPS',
    };
    setEvents((prev) => [newEvent, ...prev.slice(0, 4)]);
  };

  const securityPillars = [
    {
      title: 'Detección de Anomalías',
      icon: Search,
      desc: 'Modelos no supervisados (Isolation Forests, One-Class SVM) que aprenden la línea base normal del sistema y alertan desviaciones infinitesimales.',
      example: 'Picos inesperados de tráfico outbound a la madrugada.',
    },
    {
      title: 'Detección de Malware',
      icon: Bug,
      desc: 'Redes neuronales que analizan la secuencia de opcodes y llamadas al sistema (Syscalls) sin depender de firmas estáticas tradicionales.',
      example: 'Identificación de ejecutables polimórficos ofuscados.',
    },
    {
      title: 'Análisis de Tráfico (DPI)',
      icon: Radio,
      desc: 'Inspección profunda de paquetes (Deep Packet Inspection) en tiempo real con redes recurrentes (LSTM) clasificando flujos cifrados TLS.',
      example: 'Descubrimiento de túneles C2 de Command & Control.',
    },
    {
      title: 'Detección de Intrusiones (IDS)',
      icon: ShieldAlert,
      desc: 'Sistemas que correlacionan millones de logs por segundo mediante grafos neuronales para neutralizar cadenas de explotación complejas.',
      example: 'Aislamiento automático de segmentos de red comprometidos.',
    },
    {
      title: 'Patrones Sospechosos',
      icon: AlertTriangle,
      desc: 'Algoritmos de agrupamiento que correlacionan intentos de autenticación fallidos con vectores de geolocalización y entropía de payloads.',
      example: 'Ataques de Password Spraying a través de múltiples proxies.',
    },
    {
      title: 'Análisis de Comportamiento (UEBA)',
      icon: Activity,
      desc: 'User and Entity Behavior Analytics que modela perfiles de usuarios e identifica movimientos laterales o abuso de privilegios internos.',
      example: 'Detección de accesos a bases de datos sensibles fuera de rol.',
    },
  ];

  return (
    <section id="ciberseguridad" className="py-24 relative border-t border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>MÓDULO 08 • CIBERDEFENSA AUTOMATIZADA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-tech font-bold text-white tracking-wide">
            IA Y <span className="text-rose-400 text-glow-cyan">CIBERSEGURIDAD</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base font-sans">
            La Inteligencia Artificial revoluciona la protección digital mediante monitoreo predictivo, respuesta autónoma a incidentes y mitigación de amenazas a velocidad de máquina.
          </p>
        </div>

        {/* Dynamic Simulated Pipeline: TRÁFICO DE RED -> ANÁLISIS IA -> DETECCIÓN -> ALERTA */}
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/30 mb-16 shadow-[0_0_30px_rgba(244,63,94,0.1)]">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400">FLUJO OPERATIVO EN VIVO</span>
              <h3 className="text-lg font-tech font-bold text-white">PIPELINE DE CIBERDEFENSA COGNITIVA</h3>
            </div>
            <button
              onClick={simulateAttack}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)] cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Simular Ataque & Neutralización IA</span>
            </button>
          </div>

          {/* 4 Pipeline Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: 1, name: 'TRÁFICO DE RED', icon: Radio, desc: 'Ingesta de 2.4 Gbps de paquetes crudos PCAP.' },
              { step: 2, name: 'ANÁLISIS IA', icon: Activity, desc: 'Clasificación con Transformers e Isolation Forests.' },
              { step: 3, name: 'DETECCIÓN', icon: Search, desc: 'Identificación de correlación anómala y scoring.' },
              { step: 4, name: 'ALERTA / MITIGACIÓN', icon: ShieldCheck, desc: 'Reglas de firewall dinámico aplicadas en <12ms.' },
            ].map((st) => {
              const Icon = st.icon;
              const isCurrent = pipelineStep === st.step;
              return (
                <div
                  key={st.step}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-rose-950/40 border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      PASO 0{st.step}
                    </span>
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-rose-400 animate-pulse' : 'text-slate-500'}`} />
                  </div>
                  <h4 className="font-tech font-bold text-white text-sm mb-1">{st.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live SOC Security Incident Feed */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-16">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800 text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              REGISTRO DE TELEMETRÍA IDS / IPS EN TIEMPO REAL
            </span>
            <span className="text-[#00ff66]">ESTADO: ESCUDO ACTIVO (100% EFECTIVIDAD)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="pb-2">INCIDENTE</th>
                  <th className="pb-2">HORA</th>
                  <th className="pb-2">IP ORIGEN</th>
                  <th className="pb-2">VECTOR DETECTADO</th>
                  <th className="pb-2">RIESGO</th>
                  <th className="pb-2 text-right">ACCIÓN IA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2.5 text-cyan-400 font-bold">{ev.id}</td>
                    <td className="py-2.5 text-slate-400">{ev.timestamp}</td>
                    <td className="py-2.5">{ev.ip}</td>
                    <td className="py-2.5 text-white font-medium">{ev.vector}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.riskScore > 80 ? 'bg-rose-950 text-rose-300 border border-rose-500/40' : 'bg-emerald-950 text-emerald-300'
                      }`}>
                        {ev.riskScore}/100
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ev.status === 'MITIGADO'
                          ? 'bg-emerald-950 text-[#00ff66] border border-emerald-500/40'
                          : ev.status === 'BLOQUEADO'
                          ? 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          : 'bg-amber-950 text-amber-300'
                      }`}>
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-cyan-500/15 hover:border-rose-500/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-rose-500/40 transition-colors">
                  <Icon className="w-5 h-5 text-rose-400" />
                </div>
                <h4 className="text-lg font-tech font-bold text-white mb-2">{p.title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">{p.desc}</p>
                <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400">
                  <span className="text-rose-400 font-bold block mb-0.5">CASO PRÁCTICO:</span>
                  {p.example}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
