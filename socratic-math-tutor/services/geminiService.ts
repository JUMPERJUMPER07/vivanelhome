import { Complexity, Language, Message } from '../types';

type ApiErrorResponse = {
  error?: string;
  code?: string;
};

const parseError = async (response: Response): Promise<Error> => {
  let payload: ApiErrorResponse | null = null;

  try {
    payload = (await response.json()) as ApiErrorResponse;
  } catch {
    payload = null;
  }

  const error = new Error(payload?.error || payload?.code || `HTTP_${response.status}`);
  error.name = payload?.code || `HTTP_${response.status}`;
  return error;
};

const postJson = async <TResponse>(path: string, body: unknown): Promise<TResponse> => {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as TResponse;
};

export const initializeChat = (_history?: Message[], _language: Language = 'en'): void => {
  // Chat state now lives on the serverless API to keep the API key off the client.
};

export const resetChat = (_language: Language = 'en'): void => {
  // Stateless API: resetting the local conversation is enough.
};

export const translateText = async (text: string, targetLanguage: Language): Promise<string> => {
  const data = await postJson<{ text: string }>('/api/translate', {
    text,
    targetLanguage
  });

  return data.text || text;
};

export const sendMessageToGemini = async (
  text: string,
  imageBase64?: string,
  complexity: Complexity = 'Intermediate',
  language: Language = 'en',
  history: Message[] = []
): Promise<string> => {
  const data = await postJson<{ text: string }>('/api/chat', {
    text,
    imageBase64,
    complexity,
    language,
    history
  });

  return data.text || '';
};
