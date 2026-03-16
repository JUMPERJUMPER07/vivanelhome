export const config = {
  runtime: 'nodejs'
};

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const MODEL = 'gpt-4.1-mini';

const systemInstructions: Record<string, string> = {
  en: `
You are a compassionate, patient Socratic math tutor.
Your goal is to help the user learn, not to immediately give the final answer.
You must respond strictly in English.
`,
  pt: `
Voce e um tutor de matematica socratico, paciente e acolhedor.
Seu objetivo e ajudar o usuario a aprender, nao entregar a resposta final de imediato.
Voce deve responder estritamente em portugues.
`,
  es: `
Eres un tutor socratico de matematicas, paciente y cercano.
Tu objetivo es ayudar al usuario a aprender, no dar la respuesta final de inmediato.
Debes responder estrictamente en espanol.
`,
  fr: `
Vous etes un tuteur socratique de mathematiques, patient et bienveillant.
Votre objectif est d'aider l'utilisateur a apprendre, pas de lui donner tout de suite la reponse finale.
Vous devez repondre strictement en francais.
`
};

const languageNames: Record<string, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  fr: 'French'
};

const complexityPrompts: Record<string, Record<string, string>> = {
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

const parseBody = async (req: any): Promise<any> => {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string' && req.body.trim()) {
    return JSON.parse(req.body);
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const body = await parseBody(req);
    const apiKey = (process.env.OPENAI_API_KEY || process.env.API_KEY || '').trim();
    if (!apiKey) {
      res.status(500).json({ code: 'MISSING_OPENAI_API_KEY', error: 'OpenAI API key not configured on the server.' });
      return;
    }

    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    const imageBase64 = typeof body?.imageBase64 === 'string' ? body.imageBase64 : undefined;
    const language = typeof body?.language === 'string' ? body.language : 'en';
    const complexity = typeof body?.complexity === 'string' ? body.complexity : 'Intermediate';
    const history = Array.isArray(body?.history) ? body.history.slice(-20) : [];

    if (!text && !imageBase64) {
      res.status(400).json({ code: 'INVALID_REQUEST', error: 'Message text or image is required.' });
      return;
    }

    const input: any[] = [
      {
        role: 'system',
        content: [{ type: 'input_text', text: systemInstructions[language] || systemInstructions.en }]
      },
      ...history
        .filter((message: any) => message && typeof message.text === 'string')
        .map((message: any) => ({
          role: message.role === 'model' ? 'assistant' : 'user',
          content: [{ type: 'input_text', text: message.text }]
        }))
    ];

    const instruction = `[Instruction: ${(complexityPrompts[language] || complexityPrompts.en)[complexity] || complexityPrompts.en.Intermediate} Respond strictly in ${languageNames[language] || languageNames.en}.]`;
    const content: any[] = [];

    if (text) {
      content.push({ type: 'input_text', text: `${text} ${instruction}`.trim() });
    } else {
      content.push({
        type: 'input_text',
        text: `Please help me solve this math problem. Respond strictly in ${languageNames[language] || languageNames.en}. ${instruction}`.trim()
      });
    }

    if (imageBase64) {
      content.push({ type: 'input_image', image_url: imageBase64 });
    }

    input.push({
      role: 'user',
      content
    });

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        input
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      res.status(502).json({
        code: payload?.error?.code || 'OPENAI_CHAT_ERROR',
        error: payload?.error?.message || 'Failed to generate tutor response.'
      });
      return;
    }

    res.status(200).json({ text: extractText(payload) || '' });
  } catch (error) {
    console.error('Chat function error:', error);
    res.status(500).json({
      code: 'FUNCTION_RUNTIME_ERROR',
      error: error instanceof Error ? error.message : 'Chat function failed.'
    });
  }
}
