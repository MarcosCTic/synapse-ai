export interface AIConcept {
  id: string;
  title: string;
  subtitle: string;
  category: 'fundamento' | 'arquitectura' | 'aplicacion';
  description: string;
  applicationExample: string;
  metric: string;
  iconName: string;
  tags: string[];
}

export interface MLTypeInfo {
  id: string;
  name: string;
  category: 'supervisado' | 'no-supervisado' | 'refuerzo';
  description: string;
  examples: string[];
  algorithms: string[];
  diagram: string;
}

export interface DataScienceStage {
  step: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  tools: string[];
  output: string;
  iconName: string;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'core' | 'ml-framework' | 'data' | 'infra';
  description: string;
  ecosystem: string;
  codeSnippet: string;
  color: string;
}

export interface SectorApplication {
  id: string;
  title: string;
  icon: string;
  impact: string;
  description: string;
  practicalCase: string;
  techUsed: string;
}

export interface TerminalCommandOutput {
  command: string;
  response: string[];
  type?: 'success' | 'warning' | 'error' | 'info' | 'matrix';
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  ip: string;
  vector: string;
  riskScore: number;
  status: 'MITIGADO' | 'ANALIZANDO' | 'BLOQUEADO' | 'NORMAL';
  protocol: 'HTTPS' | 'TCP' | 'UDP' | 'DNS';
}
