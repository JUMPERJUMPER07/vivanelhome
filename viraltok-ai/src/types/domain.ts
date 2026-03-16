export type Tone = "Educativo" | "Engracado" | "Provocativo" | "Inspirador";

export type Audience = "Iniciantes" | "Criadores" | "Empreendedores" | "Marcas";

export interface NicheOption {
  id: string;
  label: string;
  growth: string;
}

export interface ViralIdea {
  id: string;
  niche: string;
  language: string;
  title: string;
  hook: string;
  score: number;
  estimatedViews: string;
  trendReason: string;
}

export interface ScriptPackage {
  ideaId: string;
  scriptTitle: string;
  hook: string;
  scenes: string[];
  caption: string;
  cta: string;
  hashtags: string[];
}

export interface AiVideoSuggestion {
  pack: ScriptPackage;
  config: VideoRenderConfig;
}

export interface TemplateItem {
  id: string;
  name: string;
  category: string;
  winRate: string;
  description: string;
}

export interface TrendItem {
  id: string;
  topic: string;
  momentum: string;
  nicheFit: string;
  action: string;
}

export interface CalendarPost {
  id: string;
  date: string;
  title: string;
  channel: "TikTok" | "Reels" | "Shorts";
  status: "Rascunho" | "Pronto" | "Publicado";
}

export interface VideoRenderConfig {
  format: "TikTok" | "Reels";
  voice: "Masculina" | "Feminina" | "Sem narracao";
  visualStyle: "Neon" | "Minimalista" | "Cinematico";
  duration: "20s" | "30s" | "45s";
  quality: "HD" | "Full HD" | "2K";
}

export interface VideoRenderResult {
  fileName: string;
  estimatedSize: string;
  quality: "HD" | "Full HD" | "2K";
  scenes: number;
  readyAt: string;
  downloadUrl?: string;
}
