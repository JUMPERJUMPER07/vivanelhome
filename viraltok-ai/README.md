# ViralTok AI (MVP)

SaaS em Next.js para gerar videos virais diarios para TikTok com IA (mocks realistas).

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Prisma + SQLite
- Componentes reutilizaveis

## Modulos entregues

- Auth (`/sign-in`, `/sign-up`)
- Onboarding de preferencias (`/onboarding`)
- Dashboard (`/dashboard`)
- Gerador de ideias (`/ideas`)
- Templates (`/templates`)
- Tendencias (`/trends`)
- Preview de video vertical 9:16 (`/preview`)
- Calendario de postagem (`/calendar`)
- Planos e billing mockado (`/billing`)

## Fluxo implementado

1. Entrar/criar conta
2. Definir nicho, idioma, tom e publico
3. Gerar ideias virais do dia
4. Selecionar ideia
5. Gerar roteiro, legenda, CTA e hashtags
6. Visualizar preview mockado de video 9:16
7. Salvar no calendario

## Como rodar

```bash
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## IA real (OpenAI)

No `.env`, configure:

```bash
OPENAI_API_KEY="sua_chave_openai"
OPENAI_MODEL="gpt-4.1-mini"
OPENAI_TTS_MODEL="gpt-4o-mini-tts"
```

Depois, no `/preview`, use:
- `Criar com IA` para gerar roteiro e preset reais.
- `Gerar video agora` com voz `Feminina`/`Masculina` para exportar MP4 narrado com TTS real.

## Estrutura principal

```text
src/
  app/
    (auth)/...
    (app)/...
  components/
    feature/
    layout/
    ui/
  lib/
    mock-data.ts
    prisma.ts
  types/
    domain.ts
prisma/
  schema.prisma
```

## Observacoes

- Dados estao mockados em `src/lib/mock-data.ts`.
- Schema Prisma pronto para evoluir para backend real (`prisma/schema.prisma`).
- Se quiser ativar banco local depois, rode `npx prisma generate` e tente `npx prisma migrate dev --name init`.
