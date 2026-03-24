# Achadinhos Top

Loja virtual em Next.js + React + Tailwind CSS criada para divulgar produtos de afiliados com foco em mobile, conversao e facilidade de manutencao.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Lucide React

## Como rodar

```bash
npm install
npm run dev
```

A aplicacao ficara disponivel em `http://localhost:3000`.

## Painel administrativo

Para gerar um novo hash de senha do painel:

```bash
npm run hash:admin -- sua-senha-forte
```

Depois copie o valor gerado para `ADMIN_PASSWORD_HASH` no arquivo `.env.local`.

## Supabase para Vercel

Para publicar na Vercel, configure:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SEU_SERVICE_ROLE_KEY
SUPABASE_STORAGE_BUCKET=product-images
```

Tambem execute o SQL em [schema.sql](C:\Users\jampe\Downloads\preserve-receiver-contingency\supabase\schema.sql) no painel do Supabase para criar a tabela e o bucket.

## Estrutura principal

```text
src/
  app/
    categorias/[slug]/
    produto/[slug]/
  components/store/
  data/
  lib/
```

## O que editar primeiro

- Produtos mockados: `src/data/products.ts`
- Links sociais e WhatsApp: `src/lib/store.ts`
- Textos e SEO geral: `src/app/layout.tsx`
- Sessoes e vitrine da home: `src/app/page.tsx`
