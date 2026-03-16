export const config = {
  runtime: 'nodejs'
};

const OPENAI_API_URL = 'https://api.openai.com/v1/responses';
const MODEL = 'gpt-4.1-mini';

const languageNames: Record<string, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  fr: 'French'
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

    const text = typeof body?.text === 'string' ? body.text : '';
    const targetLanguage = typeof body?.targetLanguage === 'string' ? body.targetLanguage : 'en';
    if (!text.trim()) {
      res.status(400).json({ code: 'INVALID_REQUEST', error: 'Text is required.' });
      return;
    }

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          {
            role: 'system',
            content: [
              {
                type: 'input_text',
                text: `Translate the following text strictly into ${languageNames[targetLanguage] || languageNames.en}.
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
        ]
      })
    });

    const payload = await response.json();
    if (!response.ok) {
      res.status(502).json({
        code: payload?.error?.code || 'OPENAI_TRANSLATE_ERROR',
        error: payload?.error?.message || 'Failed to translate text.'
      });
      return;
    }

    res.status(200).json({ text: extractText(payload) || text });
  } catch (error) {
    console.error('Translate function error:', error);
    res.status(500).json({
      code: 'FUNCTION_RUNTIME_ERROR',
      error: error instanceof Error ? error.message : 'Translate function failed.'
    });
  }
}
