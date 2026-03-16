import { Complexity, Language, Message } from '../types';

type ChatPayload = {
  text?: string;
  imageBase64?: string;
  complexity?: Complexity;
  language?: Language;
  history?: Message[];
};

type TranslatePayload = {
  text?: string;
  targetLanguage?: Language;
};

type ApiResult =
  | { status: number; body: Record<string, unknown> }
  | { status: number; body: { text: string } };

type ResponsesInputItem = {
  role: 'system' | 'user' | 'assistant';
  content: Array<
    | { type: 'input_text'; text: string }
    | { type: 'input_image'; image_url: string }
  >;
};

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-4.1-mini';
const supportedLanguages: Language[] = ['en', 'pt', 'es', 'fr'];
const supportedComplexities: Complexity[] = ['Beginner', 'Intermediate', 'Advanced'];

const systemInstructions: Record<Language, string> = {
  en: `
You are a compassionate, patient Socratic math tutor.
Your goal is to help the user learn, not to immediately give the final answer.
You must respond strictly in English.

Rules:
1. Analyze the problem carefully before responding.
2. If the problem is ambiguous or incomplete, ask a clarifying question instead of guessing.
3. Focus on the very first useful step and keep the pace gradual.
4. Guide the user with questions whenever possible instead of dumping the full solution.
5. If the user asks why, explain the math idea simply and kindly.
6. Use warm, encouraging language.
7. Use clear Markdown and LaTeX for math.
8. Invite the user to use the grapher when visualization would help.
`,
  pt: `
Voce e um tutor de matematica socratico, paciente e acolhedor.
Seu objetivo e ajudar o usuario a aprender, nao entregar a resposta final de imediato.
Voce deve responder estritamente em portugues.

Regras:
1. Analise o problema com cuidado antes de responder.
2. Se houver ambiguidade ou falta de contexto, faca uma pergunta esclarecedora.
3. Foque no primeiro passo util e avance com calma.
4. Guie o usuario com perguntas em vez de despejar a solucao completa.
5. Se o usuario perguntar o motivo, explique a ideia matematica com simplicidade.
6. Use um tom encorajador e gentil.
7. Use Markdown claro e LaTeX para matematica.
8. Convide o usuario a usar o grafico quando a visualizacao ajudar.
`,
  es: `
Eres un tutor socratico de matematicas, paciente y cercano.
Tu objetivo es ayudar al usuario a aprender, no dar la respuesta final de inmediato.
Debes responder estrictamente en espanol.

Reglas:
1. Analiza el problema con cuidado antes de responder.
2. Si hay ambiguedad o falta contexto, haz una pregunta aclaratoria.
3. Enfocate en el primer paso util y avanza con calma.
4. Guia al usuario con preguntas en lugar de entregar toda la solucion.
5. Si el usuario pregunta por que, explica la idea matematica con sencillez.
6. Usa un tono amable y motivador.
7. Usa Markdown claro y LaTeX para las expresiones matematicas.
8. Invita al usuario a usar el graficador cuando una visualizacion ayude.
`,
  fr: `
Vous etes un tuteur socratique de mathematiques, patient et bienveillant.
Votre objectif est d'aider l'utilisateur a apprendre, pas de lui donner tout de suite la reponse finale.
Vous devez repondre strictement en francais.

Regles:
1. Analysez soigneusement le probleme avant de repondre.
2. En cas d'ambiguite ou de contexte incomplet, posez une question de clarification.
3. Concentrez-vous sur la premiere etape utile et avancez progressivement.
4. Guidez l'utilisateur avec des questions plutot que de donner toute la solution.
5. Si l'utilisateur demande pourquoi, expliquez l'idee mathematique simplement.
6. Utilisez un ton chaleureux et encourageant.
7. Utilisez un Markdown clair et LaTeX pour les mathematiques.
8. Invitez l'utilisateur a utiliser le grapheur quand une visualisation serait utile.
`
};

const languageNames: Record<Language, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  fr: 'French'
};

const complexityPrompts: Record<Language, Record<Complexity, string>> = {
  en: {
    Beginner: 'Explain as if the student is a beginner. Use simple analogies.',
    Intermediate: 'Explain at an intermediate level.',
    Advanced: 'Explain at an advanced level with more formal notation.'
  },
  pt: {
    Beginner: 'Explique como para um iniciante. Use analogias simples.',
    Intermediate: 'Explique em um nivel intermediario.',
    Advanced: 'Explique em um nivel avancado com notacao mais formal.'
  },
  es: {
    Beginner: 'Explica como para un principiante. Usa analogias simples.',
    Intermediate: 'Explica a un nivel intermedio.',
    Advanced: 'Explica a un nivel avanzado con notacion mas formal.'
  },
  fr: {
    Beginner: 'Expliquez comme a un debutant. Utilisez des analogies simples.',
    Intermediate: 'Expliquez a un niveau intermediaire.',
    Advanced: 'Expliquez a un niveau avance avec une notation plus formelle.'
  }
};

const getApiKey = (): string => {
  return process.env.OPENAI_API_KEY || process.env.API_KEY || '';
};

const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && supportedLanguages.includes(value as Language);

const isComplexity = (value: unknown): value is Complexity =>
  typeof value === 'string' && supportedComplexities.includes(value as Complexity);

const safeHistory = (history: unknown): Message[] => {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item): item is Message => {
      return Boolean(
        item &&
          typeof item === 'object' &&
          'role' in item &&
          'text' in item &&
          ((item as Message).role === 'user' || (item as Message).role === 'model') &&
          typeof (item as Message).text === 'string'
      );
    })
    .slice(-20);
};

const errorResult = (status: number, code: string, error: string): ApiResult => ({
  status,
  body: { code, error }
});

const extractText = (payload: any): string => {
  if (typeof payload?.output_text === 'string' && payload.output_text.trim()) {
    return payload.output_text;
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  for (const item of output) {
    const content = Array.isArray(item?.content) ? item.content : [];
    for (const part of content) {
      if (typeof part?.text === 'string' && part.text.trim()) {
        return part.text;
      }
      if (typeof part?.output_text === 'string' && part.output_text.trim()) {
        return part.output_text;
      }
    }
  }

  return '';
};

const callOpenAI = async (input: ResponsesInputItem[]): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('MISSING_OPENAI_API_KEY');
  }

  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      input
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    const message = payload?.error?.message || 'OPENAI_API_ERROR';
    throw new Error(message);
  }

  return extractText(payload);
};

const formatHistory = (history: Message[]): ResponsesInputItem[] =>
  history.map((message) => ({
    role: message.role === 'model' ? 'assistant' : 'user',
    content: [{ type: 'input_text', text: message.text }]
  }));

export const handleChatPayload = async (payload: ChatPayload): Promise<ApiResult> => {
  const text = typeof payload.text === 'string' ? payload.text.trim() : '';
  const imageBase64 = typeof payload.imageBase64 === 'string' ? payload.imageBase64 : undefined;
  const language = isLanguage(payload.language) ? payload.language : 'en';
  const complexity = isComplexity(payload.complexity) ? payload.complexity : 'Intermediate';
  const history = safeHistory(payload.history);

  if (!text && !imageBase64) {
    return errorResult(400, 'INVALID_REQUEST', 'Message text or image is required.');
  }

  const input: ResponsesInputItem[] = [
    {
      role: 'system',
      content: [{ type: 'input_text', text: systemInstructions[language] }]
    },
    ...formatHistory(history)
  ];

  const instruction = `[Instruction: ${complexityPrompts[language][complexity]} Respond strictly in ${languageNames[language]}.]`;
  const content: ResponsesInputItem['content'] = [];

  if (text) {
    content.push({ type: 'input_text', text: `${text} ${instruction}`.trim() });
  } else {
    content.push({
      type: 'input_text',
      text: `Please help me solve this math problem. Respond strictly in ${languageNames[language]}. ${instruction}`.trim()
    });
  }

  if (imageBase64) {
    content.push({ type: 'input_image', image_url: imageBase64 });
  }

  input.push({
    role: 'user',
    content
  });

  try {
    const responseText = await callOpenAI(input);
    return {
      status: 200,
      body: { text: responseText || '' }
    };
  } catch (error) {
    console.error('Chat API error:', error);
    const code = error instanceof Error ? error.message : 'OPENAI_CHAT_ERROR';
    return errorResult(
      code === 'MISSING_OPENAI_API_KEY' ? 500 : 502,
      code,
      code === 'MISSING_OPENAI_API_KEY' ? 'OpenAI API key not configured on the server.' : 'Failed to generate tutor response.'
    );
  }
};

export const handleTranslatePayload = async (payload: TranslatePayload): Promise<ApiResult> => {
  const text = typeof payload.text === 'string' ? payload.text : '';
  const targetLanguage = isLanguage(payload.targetLanguage) ? payload.targetLanguage : 'en';

  if (!text.trim()) {
    return errorResult(400, 'INVALID_REQUEST', 'Text is required.');
  }

  const input: ResponsesInputItem[] = [
    {
      role: 'system',
      content: [
        {
          type: 'input_text',
          text: `Translate the following text strictly into ${languageNames[targetLanguage]}.
Rules:
1. Keep the original meaning.
2. Preserve all LaTeX content inside $ or $$ exactly as written.
3. Preserve Markdown formatting.
4. Return only the translated text.`
        }
      ]
    },
    {
      role: 'user',
      content: [{ type: 'input_text', text }]
    }
  ];

  try {
    const responseText = await callOpenAI(input);
    return {
      status: 200,
      body: { text: responseText || text }
    };
  } catch (error) {
    console.error('Translate API error:', error);
    const code = error instanceof Error ? error.message : 'OPENAI_TRANSLATE_ERROR';
    return errorResult(
      code === 'MISSING_OPENAI_API_KEY' ? 500 : 502,
      code,
      code === 'MISSING_OPENAI_API_KEY' ? 'OpenAI API key not configured on the server.' : 'Failed to translate text.'
    );
  }
};
