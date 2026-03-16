import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteApiPlugin } from './server/viteApiPlugin';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    process.env.OPENAI_API_KEY =
      process.env.OPENAI_API_KEY ||
      env.OPENAI_API_KEY ||
      env.VITE_OPENAI_API_KEY ||
      env.API_KEY ||
      env.VITE_API_KEY ||
      '';

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), viteApiPlugin()],
      build: {
        chunkSizeWarningLimit: 900,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('recharts') || id.includes('mathjs')) {
                  return 'graphing';
                }

                if (id.includes('@google/genai')) {
                  return 'ai';
                }

                return 'vendor';
              }
            }
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
