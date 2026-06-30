# Sampa Vision AI — Home Page

Plataforma de Inteligência Artificial para marketing digital. Este repositório contém a home pública, construída como produto SaaS em produção.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Radix UI (base do shadcn/ui) · Lucide Icons

## Instalação

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # ambiente de desenvolvimento
npm run build         # build de produção
npm run start          # serve o build de produção
npm run lint            # ESLint
npm run type-check       # verificação TypeScript sem build
```

## Deploy no Vercel

```bash
npm i -g vercel
vercel
```

Ou conecte o repositório diretamente em [vercel.com/new](https://vercel.com/new) — o Next.js é detectado automaticamente, sem configuração adicional.

## Notas de implementação

Este pacote não inclui `node_modules` nem `.next` (build). Rode `npm install` antes de `npm run dev`.

Faltam os seguintes assets binários, que devem ser adicionados em `/public` antes do deploy: `favicon.ico`, `apple-touch-icon.png`, `og-image.png` (1200×630), `manifest.json`.

As rotas `/auth/login`, `/auth/signup`, `/docs`, `/blog`, `/contato` etc. referenciadas nos links ainda não existem — são placeholders para o próximo módulo da plataforma.
