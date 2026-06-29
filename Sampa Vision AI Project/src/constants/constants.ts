export const SITE = {
  name:        "Sampa Vision AI",
  domain:      "sampa.vision",
  tagline:     "From brief to live page. Automatically.",
  description: "A plataforma de IA que transforma um briefing em uma landing page publicada em minutos. Sem código. Sem reunião. Sem espera.",
  url:         "https://sampa.vision",
  twitter:     "@sampavision",
} as const;

export const NAV_LINKS = [
  { label: "Produto",    href: "#produto"    },
  { label: "Pricing",    href: "#pricing"    },
  { label: "Changelog",  href: "#changelog"  },
] as const;

export const STATS = [
  { value: "2.400+", label: "Páginas geradas"  },
  { value: "< 3min", label: "Tempo de geração" },
  { value: "98.9%",  label: "Uptime garantido" },
  { value: "40+",    label: "Nichos ativos"    },
] as const;

export const TICKER_ITEMS = [
  "AI Landing Engine",
  "AI Branding Engine",
  "AI Copy Engine",
  "AI SEO Engine",
  "AI Ads Engine",
  "AI Analytics Engine",
  "AI Automation Engine",
  "AI Agents",
] as const;

export const FEATURES = [
  {
    id:       "copy",
    size:     "large" as const,
    icon:     "Zap",
    title:    "Copy que vende",
    subtitle: "gerado em segundos",
    desc:     "O briefing captura sua voz, oferta e público. A IA calibra para conversão — não para template. Cada palavra com intenção.",
    badge:    "Disponível",
  },
  {
    id:       "publish",
    size:     "small" as const,
    icon:     "Globe",
    title:    "No ar antes de terminar o café",
    subtitle: "Auto-publish",
    desc:     "Deploy automático com SSL, CDN global e URL pronta para campanha.",
    badge:    null,
  },
  {
    id:       "domain",
    size:     "small" as const,
    icon:     "Link",
    title:    "Seu domínio. Nossa infra.",
    subtitle: "Custom Domain",
    desc:     "Conecte seu domínio em um clique. Certificado SSL incluído.",
    badge:    null,
  },
  {
    id:       "analytics",
    size:     "small" as const,
    icon:     "BarChart3",
    title:    "Saiba o que converte",
    subtitle: "Analytics built-in",
    desc:     "Métricas de conversão, heatmap e A/B test integrados.",
    badge:    "Em breve",
  },
  {
    id:       "seo",
    size:     "small" as const,
    icon:     "Search",
    title:    "Google te encontra no dia 1",
    subtitle: "SEO automático",
    desc:     "Meta tags, sitemap e indexação configurados automaticamente.",
    badge:    null,
  },
] as const;

export const OBJECTIONS = [
  {
    question: '"Vai ficar genérico?"',
    answer:   "Não. O briefing captura sua voz, oferta e público específico. A IA calibra para conversão — não para template. Cada página é única.",
  },
  {
    question: '"Preciso saber programar?"',
    answer:   "Zero código. Você preenche o briefing em texto. Nós geramos, publicamos e configuramos tudo. Você nem vê o HTML.",
  },
  {
    question: '"E se não converter?"',
    answer:   "30 dias de garantia de revisão. Se a página não performa, regeneramos sem custo adicional. Resultado é o produto.",
  },
  {
    question: '"Funciona para meu nicho?"',
    answer:   "40+ segmentos validados: clínicas, SaaS, imóveis, educação, e-commerce, consultoria e muito mais.",
  },
] as const;

export const PLANS = [
  {
    id:       "free",
    name:     "Free",
    price:    { monthly: 0, annual: 0 },
    desc:     "Para testar o produto",
    cta:      "Começar grátis",
    ctaHref:  "/signup",
    featured: false,
    features: [
      "1 landing page",
      "Subdomínio sampa.vision",
      "SSL incluído",
      "Geração com IA",
      "Preview instantâneo",
    ],
    missing: [
      "Domínio próprio",
      "Analytics",
      "SEO automático",
      "Suporte prioritário",
    ],
  },
  {
    id:       "pro",
    name:     "Pro",
    price:    { monthly: 297, annual: 237 },
    desc:     "Para times que crescem",
    cta:      "Assinar Pro",
    ctaHref:  "/signup?plan=pro",
    featured: true,
    features: [
      "Páginas ilimitadas",
      "Domínio próprio",
      "SSL automático",
      "Analytics integrado",
      "SEO automático",
      "Pixel Meta + GA4",
      "Suporte prioritário",
      "Revisões incluídas",
    ],
    missing: [],
  },
  {
    id:       "enterprise",
    name:     "Enterprise",
    price:    { monthly: null, annual: null },
    desc:     "Para operações em escala",
    cta:      "Falar com time",
    ctaHref:  "#contact",
    featured: false,
    features: [
      "White label",
      "API access",
      "SLA 99.9%",
      "Onboarding dedicado",
      "Integrações custom",
      "Multi-workspace",
    ],
    missing: [],
  },
] as const;

export const TESTIMONIALS = [
  {
    id:      "lucas",
    size:    "wide" as const,
    quote:   "R$ 4,20 por lead. Antes pagava R$ 11. A página foi publicada numa segunda e na quinta já tínhamos recuperado o investimento.",
    author:  "Lucas Prado",
    role:    "Head de Growth",
    company: "StartLab",
    initials:"LP",
    metric:  "-62% CPL",
  },
  {
    id:      "marcos",
    size:    "tall" as const,
    quote:   "Publiquei na segunda. Na quinta já tinha recuperado o investimento. Nenhuma agência que contratei antes chegou perto disso.",
    author:  "Marcos Fontes",
    role:    "Fundador",
    company: "Construtora Viva",
    initials:"MF",
    metric:  "ROI em 4 dias",
  },
  {
    id:      "ana",
    size:    "small" as const,
    quote:   "Taxa de conversão de 8,3% na primeira semana. Nunca tinha visto isso com nenhuma outra ferramenta.",
    author:  "Ana Teixeira",
    role:    "Diretora de Marketing",
    company: "Élite Clínica",
    initials:"AT",
    metric:  "8.3% CVR",
  },
  {
    id:      "rafael",
    size:    "small" as const,
    quote:   "O briefing de 7 perguntas foi mais preciso do que qualquer reunião de 2 horas. O copy saiu melhor do que eu esperava.",
    author:  "Rafael Carvalho",
    role:    "CEO",
    company: "Grupo Meridian",
    initials:"RC",
    metric:  "3× leads",
  },
] as const;

export const DEMO_STEPS = [
  {
    id:    "brief",
    label: "01 — Brief",
    title: "7 perguntas. Tudo que a IA precisa.",
    desc:  "Proposta de valor, público, diferencial, prova social, oferta, objeção e CTA. Sem jargão. Sem reunião.",
    logs:  [
      "Receiving brief payload...",
      "Parsing intent signals...",
      "Mapping audience profile...",
      "Extracting value proposition...",
      "Brief validated ✓",
    ],
  },
  {
    id:    "generate",
    label: "02 — Generate",
    title: "IA calibrada para conversão.",
    desc:  "Modelos treinados em estrutura de CRO geram copy, hierarquia e seções. Em segundos.",
    logs:  [
      "Initializing generation pipeline...",
      "Generating headline variants... ████████ done",
      "Building section structure... ██████░░ 78%",
      "Calibrating for conversion...",
      "Copy generated ✓",
    ],
  },
  {
    id:    "preview",
    label: "03 — Preview",
    title: "Veja antes de publicar.",
    desc:  "Preview em tempo real no browser. Ajuste, regenere ou aprove. Controle total.",
    logs:  [
      "Compiling components...",
      "Applying brand identity...",
      "Rendering preview...",
      "Optimizing assets...",
      "Preview ready ✓",
    ],
  },
  {
    id:    "publish",
    label: "04 — Publish",
    title: "No ar. SSL. CDN. URL.",
    desc:  "Deploy automático. Certificado SSL. CDN global. Indexação no Search Console. Tudo em um clique.",
    logs:  [
      "Deploying to edge network...",
      "Provisioning SSL certificate...",
      "Configuring CDN rules...",
      "Submitting to Search Console...",
      "Live at sampa.vision/seu-projeto ✓",
    ],
  },
] as const;
