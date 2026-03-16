import {
  Audience,
  CalendarPost,
  NicheOption,
  ScriptPackage,
  TemplateItem,
  Tone,
  TrendItem,
  ViralIdea,
  VideoRenderConfig,
  VideoRenderResult,
} from "@/types/domain";

export const nicheOptions: NicheOption[] = [
  { id: "gospel", label: "Gospel", growth: "+46%" },
  { id: "cars", label: "Carros", growth: "+34%" },
  { id: "courses", label: "Cursos", growth: "+39%" },
  { id: "tech", label: "Tecnologia", growth: "+32%" },
  { id: "beauty", label: "Beleza", growth: "+37%" },
  { id: "fitness", label: "Fitness", growth: "+29%" },
  { id: "finance", label: "Financas", growth: "+43%" },
  { id: "marketing", label: "Marketing Digital", growth: "+35%" },
  { id: "culinary", label: "Culinaria", growth: "+18%" },
  { id: "gaming", label: "Gaming", growth: "+41%" },
  { id: "humor", label: "Humor", growth: "+33%" },
  { id: "relationships", label: "Relacionamentos", growth: "+28%" },
];

export const tones: Tone[] = ["Educativo", "Engracado", "Provocativo", "Inspirador"];
export const audiences: Audience[] = ["Iniciantes", "Criadores", "Empreendedores", "Marcas"];
export const languageOptions = ["Portuguese", "English", "Spanish"];

export const viralIdeas: ViralIdea[] = [
  {
    id: "idea-gospel-1",
    niche: "Gospel",
    language: "Portuguese",
    title: "Versiculo do dia em 15s com aplicacao pratica",
    hook: "Se essa palavra falar com voce hoje, manda para alguem.",
    score: 95,
    estimatedViews: "190k-460k",
    trendReason: "Formato curto, emocional e alto compartilhamento em comunidades.",
  },
  {
    id: "idea-cars-1",
    niche: "Carros",
    language: "Portuguese",
    title: "3 erros que detonam o consumo do seu carro sem voce perceber",
    hook: "Esse habito simples pode estar queimando seu dinheiro no posto.",
    score: 93,
    estimatedViews: "150k-390k",
    trendReason: "Dor financeira + utilidade pratica aumenta comentarios e salvamentos.",
  },
  {
    id: "idea-courses-1",
    niche: "Cursos",
    language: "Portuguese",
    title: "Como montar um mini curso vendavel em 1 fim de semana",
    hook: "Nao precisa camera cara: precisa desta estrutura de 3 modulos.",
    score: 91,
    estimatedViews: "130k-330k",
    trendReason: "Promessa clara de monetizacao com baixo custo de entrada.",
  },
  {
    id: "idea-tech-1",
    niche: "Tecnologia",
    language: "Portuguese",
    title: "5 sites de IA gratis que parecem proibidos de tao bons",
    hook: "Se voce cria conteudo, salva esse video agora.",
    score: 94,
    estimatedViews: "260k-680k",
    trendReason: "Curadoria de ferramentas tem alta taxa de save e share.",
  },
  {
    id: "idea-1",
    niche: "Marketing Digital",
    language: "Portuguese",
    title: "3 erros que matam seu alcance no TikTok em 2026",
    hook: "Se voce ainda faz isso nos 3 primeiros segundos, seu video ja morreu.",
    score: 96,
    estimatedViews: "220k-580k",
    trendReason: "Topico de alta dor + retencao alta nos primeiros segundos.",
  },
  {
    id: "idea-2",
    niche: "Financas",
    language: "Portuguese",
    title: "Como sair do ciclo salario a salario em 60 dias",
    hook: "Ninguem te ensinou esse sistema de 2 contas.",
    score: 94,
    estimatedViews: "180k-440k",
    trendReason: "Conteudo pratico com promessa objetiva e salvamentos elevados.",
  },
  {
    id: "idea-3",
    niche: "Fitness",
    language: "Portuguese",
    title: "Treino de 12 minutos para secar sem academia",
    hook: "Faz isso por 7 dias e compara seu antes e depois.",
    score: 92,
    estimatedViews: "240k-620k",
    trendReason: "Formato desafio + facil replicacao + compartilhamento alto.",
  },
  {
    id: "idea-4",
    niche: "Beleza",
    language: "Portuguese",
    title: "A tecnica de maquiagem que muda seu rosto em 30 segundos",
    hook: "Esse truque de contorno virou meu video mais salvo do mes.",
    score: 90,
    estimatedViews: "130k-350k",
    trendReason: "Conteudo visual com transformacao imediata gera replay.",
  },
  {
    id: "idea-humor-1",
    niche: "Humor",
    language: "Portuguese",
    title: "POV: quando voce tenta gravar video serio e a vida nao colabora",
    hook: "Se isso acontece com voce, comenta 'eu'.",
    score: 89,
    estimatedViews: "200k-510k",
    trendReason: "POV + identificacao pessoal gera forte engajamento.",
  },
  {
    id: "idea-rel-1",
    niche: "Relacionamentos",
    language: "Portuguese",
    title: "3 sinais silenciosos de que a relacao precisa de conversa honesta",
    hook: "O sinal numero 2 quase ninguem percebe a tempo.",
    score: 90,
    estimatedViews: "170k-420k",
    trendReason: "Tema emocional com formato lista eleva retencao.",
  },
];

export const templates: TemplateItem[] = [
  {
    id: "tpl-1",
    name: "Hook Shock",
    category: "Alto impacto",
    winRate: "74%",
    description: "Abre com uma declaracao forte e quebra de expectativa em 2 segundos.",
  },
  {
    id: "tpl-2",
    name: "Mini Story",
    category: "Narrativo",
    winRate: "69%",
    description: "Estrutura de problema, virada e solucao em ate 35 segundos.",
  },
  {
    id: "tpl-3",
    name: "Checklist Viral",
    category: "Educacional",
    winRate: "71%",
    description: "Lista curta com entregas praticas para aumentar salvamentos.",
  },
];

export const trends: TrendItem[] = [
  {
    id: "trend-1",
    topic: "POV + texto grande",
    momentum: "+81% nas ultimas 48h",
    nicheFit: "Marketing, beleza, fitness",
    action: "Abra com opiniao contraria e corte rapido a cada 1.8s.",
  },
  {
    id: "trend-2",
    topic: "Antes e depois acelerado",
    momentum: "+63% na semana",
    nicheFit: "Financas, fitness, culinaria",
    action: "Mostre prova visual no segundo 4 para elevar retencao.",
  },
  {
    id: "trend-3",
    topic: "Dueto com noticia quente",
    momentum: "+57% na semana",
    nicheFit: "Marketing, creator economy",
    action: "Reaja com gancho de 5 palavras e CTA de comentario.",
  },
];

export const calendarPosts: CalendarPost[] = [
  { id: "cal-1", date: "2026-03-09", title: "3 erros que matam alcance", channel: "TikTok", status: "Pronto" },
  { id: "cal-2", date: "2026-03-10", title: "Sistema de 2 contas", channel: "TikTok", status: "Rascunho" },
  { id: "cal-3", date: "2026-03-11", title: "Treino de 12 minutos", channel: "Reels", status: "Pronto" },
];

export function getIdeaById(ideaId?: string) {
  return viralIdeas.find((idea) => idea.id === ideaId) ?? viralIdeas[0];
}

export interface IdeaFilters {
  niche?: string;
  language?: string;
  tone?: string;
  audience?: string;
}

export function getDailyIdeas(filters?: IdeaFilters) {
  const niche = filters?.niche?.toLowerCase().trim();
  const language = filters?.language?.toLowerCase().trim();

  const byNiche = niche
    ? viralIdeas.filter((idea) => idea.niche.toLowerCase() === niche)
    : [];

  const byLanguage = language
    ? viralIdeas.filter((idea) => idea.language.toLowerCase() === language)
    : viralIdeas;

  const merged = [...byNiche, ...byLanguage].reduce<ViralIdea[]>((acc, idea) => {
    if (!acc.some((item) => item.id === idea.id)) acc.push(idea);
    return acc;
  }, []);

  const withToneBoost = merged.map((idea) => ({
    ...idea,
    score: Math.min(99, idea.score + (filters?.tone === "Provocativo" ? 2 : filters?.tone === "Inspirador" ? 1 : 0)),
  }));

  return (withToneBoost.length > 0 ? withToneBoost : viralIdeas).slice(0, 8);
}

export function generateScriptPackage(ideaId?: string): ScriptPackage {
  const idea = getIdeaById(ideaId);
  const nicheTag = idea.niche.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");

  return {
    ideaId: idea.id,
    scriptTitle: idea.title,
    hook: idea.hook,
    scenes: [
      "Cena 1 (0-3s): close no rosto + texto grande do hook.",
      "Cena 2 (4-10s): apresente o erro/problema com exemplo real.",
      "Cena 3 (11-20s): entregue a correcao com passo pratico.",
      "Cena 4 (21-30s): mini prova/social proof e convite para comentar.",
    ],
    caption:
      `Se voce quer crescer em ${idea.niche}, este formato entrega retencao e conversao. Testa hoje e me conta nos comentarios.`,
    cta: "Comenta 'roteiro' para receber a versao completa.",
    hashtags: ["#viralcontent", "#tiktokbrasil", "#criadores", `#${nicheTag}`, "#viraltokai"],
  };
}

export function generateVideoRender(pack: ScriptPackage, config: VideoRenderConfig): VideoRenderResult {
  const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const nameBase = pack.scriptTitle
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 38);

  const baseSize = config.duration === "45s" ? 24.8 : config.duration === "30s" ? 17.3 : 12.1;
  const multiplier = config.quality === "2K" ? 1.8 : config.quality === "Full HD" ? 1.3 : 1;
  const size = `${(baseSize * multiplier).toFixed(1)} MB`;

  return {
    fileName: `${nameBase || "video-viral"}-${config.format.toLowerCase()}-${dateCode}.mp4`,
    estimatedSize: size,
    quality: config.quality,
    scenes: pack.scenes.length,
    readyAt: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
  };
}
