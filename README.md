# Sampa Vision AI

Landing page institucional desenvolvida com **Next.js 14**, **React**, **TypeScript** e **Tailwind CSS**, projetada para apresentar a plataforma **Sampa Vision AI**, destacando seus recursos, benefícios, prova social e conversão de visitantes em leads ou clientes.

---

# Objetivo

O projeto foi desenvolvido para servir como uma landing page moderna, responsiva e otimizada para conversão (CRO - Conversion Rate Optimization), apresentando a plataforma de visão computacional de forma clara, rápida e profissional.

A estrutura da página foi organizada seguindo princípios de UX, copywriting e funil de vendas.

---

# Tecnologias

* Next.js 14 (App Router)
* React 18
* TypeScript
* Tailwind CSS
* PostCSS
* ESLint

---

# Estrutura do Projeto

```text
sampa-vision-ai/
│
├── public/                 # Arquivos públicos
│
├── src/
│   ├── app/                # Rotas da aplicação (App Router)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── home/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── config/
│   └── types/
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

---

# Fluxo da Landing Page

A ordem das seções foi planejada para conduzir o visitante até a conversão.

1. Navbar
2. Hero
3. Ticker
4. Product Demo
5. Diagnosis
6. Process
7. Modules
8. Before & After
9. Price Anchor
10. FAQ
11. CTA Final
12. Footer

---

# Componentes

## Layout

### Navbar

Responsável pela navegação principal.

### Footer

Informações institucionais e links úteis.

---

## Home

### Hero

Primeira impressão da página.

Apresenta:

* proposta de valor;
* CTA principal;
* destaque da plataforma.

---

### Ticker

Faixa dinâmica para reforçar credibilidade.

---

### ProductDemo

Demonstração visual do sistema.

---

### Diagnosis

Apresenta os principais problemas enfrentados pelo público-alvo.

---

### Process

Explica como funciona a plataforma.

---

### Modules

Mostra os módulos disponíveis.

---

### BeforeAfter

Comparação entre cenário atual e cenário utilizando a solução.

---

### PriceAnchor

Ancoragem de valor antes da oferta.

---

### FAQ

Perguntas frequentes.

---

### CtaFinal

Última chamada para ação.

---

# Instalação

Clone o projeto:

```bash
git clone https://github.com/visionlandings-dev/Sampa-Vision-Ai.git
```

Entre na pasta:

```bash
cd Sampa-Vision-Ai
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

---

# Build de Produção

Gerar build:

```bash
npm run build
```

Executar produção:

```bash
npm start
```

---

# Scripts

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera o build de produção.

```bash
npm run start
```

Executa a aplicação em produção.

```bash
npm run lint
```

Executa o ESLint.

---

# Convenções do Projeto

## Componentes

Cada componente deve possuir responsabilidade única.

Exemplo:

```text
components/
    home/
        Hero.tsx
        FAQ.tsx
```

---

## Imports

Utilizar alias:

```tsx
import { Hero } from "@/components/home/Hero";
```

Evitando imports relativos longos.

---

## Organização

Cada funcionalidade deve permanecer em seu respectivo diretório:

* components
* hooks
* lib
* config
* types

---

# Responsividade

O projeto foi desenvolvido seguindo abordagem **Mobile First** utilizando Tailwind CSS.

Breakpoints principais:

* sm
* md
* lg
* xl
* 2xl

---

# Deploy

A aplicação pode ser publicada na Vercel.

Fluxo recomendado:

1. Push para a branch `main`.
2. Integração automática GitHub → Vercel.
3. Build.
4. Deploy.

---

# Boas Práticas

* Componentes pequenos e reutilizáveis.
* Tipagem com TypeScript.
* Evitar lógica de negócio dentro dos componentes de apresentação.
* Utilizar hooks para lógica reutilizável.
* Centralizar constantes em `config`.
* Utilizar `lib` para funções auxiliares.

---

# Troubleshooting

## Module not found

Verifique:

* nomes dos arquivos;
* diferenças entre maiúsculas e minúsculas;
* alias configurado no `tsconfig.json`;
* arquivos enviados para o GitHub.

---

## Erro na Vercel

Antes do deploy execute:

```bash
npm run build
```

Se o build falhar localmente, também falhará na Vercel.

---

## Estrutura recomendada

Utilize apenas **uma** estrutura de diretórios.

Recomendado:

```text
src/
    app/
    components/
    hooks/
    lib/
    config/
```

Evite manter simultaneamente:

```text
app/
components/
```

e

```text
src/
```

para não gerar conflitos de resolução de módulos.

---

# Melhorias Futuras

* Internacionalização (i18n)
* Testes automatizados
* Storybook
* CI/CD
* Lighthouse acima de 95
* Otimização de imagens
* Analytics
* Monitoramento de erros
* SEO avançado

---

# Licença

Este projeto é destinado ao desenvolvimento da landing page **Sampa Vision AI**.

Todos os direitos reservados.
