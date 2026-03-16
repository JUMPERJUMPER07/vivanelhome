import { IncomingMessage, ServerResponse } from 'http';
import { Plugin } from 'vite';
import { handleChatPayload, handleTranslatePayload } from './geminiCore';

const readJsonBody = async (req: IncomingMessage): Promise<unknown> => {
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
};

const sendJson = (res: ServerResponse, status: number, body: Record<string, unknown>) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

export const viteApiPlugin = (): Plugin => ({
  name: 'local-serverless-api',
  configureServer(server) {
    server.middlewares.use('/api/chat', async (req, res, next) => {
      if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed.' });
        return;
      }

      try {
        const payload = await readJsonBody(req);
        const result = await handleChatPayload(payload as never);
        sendJson(res, result.status, result.body as Record<string, unknown>);
      } catch (error) {
        next(error as Error);
      }
    });

    server.middlewares.use('/api/translate', async (req, res, next) => {
      if (req.method !== 'POST') {
        sendJson(res, 405, { error: 'Method not allowed.' });
        return;
      }

      try {
        const payload = await readJsonBody(req);
        const result = await handleTranslatePayload(payload as never);
        sendJson(res, result.status, result.body as Record<string, unknown>);
      } catch (error) {
        next(error as Error);
      }
    });
  }
});
