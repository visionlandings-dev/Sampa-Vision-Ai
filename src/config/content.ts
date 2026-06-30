import type {
  PlatformModule,
  Testimonial,
  SegmentDemo,
  ProcessStep,
  FAQItem,
  NavItem,
  HeroMetric,
} from '@/types'

// ── NAVEGAÇÃO ─────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: 'Produto',  href: '#produto' },
  { label: 'Preços',   href: '#precos' },
  { label: 'Docs',     href: '/docs', external: true },
  { label: 'Blog',     href: '/blog', external: true },
]

// ── HERO ──────────────────────────────────────────────────────────────────
export const HERO_METRICS: HeroMetric[] = [
  { value: '2.847', label: 'páginas geradas', sublabel: 'hoje' },
  { value: '58s',   label: 'tempo médio',     sublabel: 'de entrega' },
]

export const HERO_FRICTION_KILLERS = [
  'Sem cartão de crédito',
  'Sem reunião',
  'Cancela quando quiser',
  'Primeira página grátis',
]

export const TERMINAL_STEPS = [
  { icon: '→', text: 'Lendo perfil de marca...', delay: 0.4, isResult: false },
  { icon: '→', text: 'Identificando público-alvo...', delay: 0.9, isResult: false },
  { icon: '✓', text: 'Briefing analisado', delay: 1.4, isResult: false },
  { icon: '→', text: 'Estruturando hierarquia...', delay: 1.8, isResult: false },
  { icon: '→', text: 'Gerando headline principal...', delay: 2.3, isResult: false },
  { icon: '✓', text: 'Copy gerado (3 variações)', delay: 2.8, isResult: false },
  { icon: '→', text: 'Aplicando identidade visual...', delay: 3.2, isResult: false },
  { icon: '✓', text: 'Layout aplicado', delay: 3.7, isResult: false },
  { icon: '→', text: 'Publicando...', delay: 4.1, isResult: false },
  { icon: '↗', text: 'clinica-sp.sampa.vision — 58s', delay: 4.6, isResult: true },
] as const

// ── TICKER ────────────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  'Clínica Derma SP',
  'Startup Nexus',
  'Academia Form',
  'Advogada Patrícia Melo',
  'E-commerce Viva',
  'Construtora Meridian',
  'Studio Foto RS',
  'Consultoria RH Pro',
  'Escola Digital BR',
  'Clínica Vet Sul',
]

// ── DEMOS DE SEGMENTO ─────────────────────────────────────────────────────
export const SEGMENT_DEMOS: SegmentDemo[] = [
  {
    id: 'clinica',
    label: 'Clínica',
    briefing: {
      business:  'Clínica de dermatologia e estética',
      audience:  'Mulheres 30–50, São Paulo, classe A/B',
      objective: 'Agendamentos online para consulta',
    },
    result: {
      headline:    'RESULTADOS QUE VOCÊ VÊ. TRATAMENTOS QUE VOCÊ SENTE.',
      subheadline: 'Dermatologia e estética avançada para quem exige o melhor para a própria pele.',
      cta:         'Agendar consulta →',
      time:        '52s',
    },
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    briefing: {
      business:  'Loja de moda feminina online',
      audience:  'Mulheres 25–40, Brasil, interesse em moda',
      objective: 'Vendas diretas e captura de leads',
    },
    result: {
      headline:    'SUA MODA. SEU ESTILO. ENTREGA EM 24H.',
      subheadline: 'Peças selecionadas para mulheres que não abrem mão de estilo no dia a dia.',
      cta:         'Ver coleção →',
      time:        '61s',
    },
  },
  {
    id: 'infoprodutor',
    label: 'Infoprodutor',
    briefing: {
      business:  'Curso online de finanças pessoais',
      audience:  'Adultos 25–45 com dívidas ou sem reserva',
      objective: 'Inscrições no curso com 50% de desconto',
    },
    result: {
      headline:    'SAIA DAS DÍVIDAS. CONSTRUA SUA RESERVA. EM 90 DIAS.',
      subheadline: 'O método que já ajudou 4.200 pessoas a organizar as finanças e começar a investir.',
      cta:         'Quero me inscrever →',
      time:        '47s',
    },
  },
  {
    id: 'servico-local',
    label: 'Serviço Local',
    briefing: {
      business:  'Hidráulica residencial e comercial',
      audience:  'Proprietários com problemas urgentes, região metropolitana',
      objective: 'Chamadas e orçamentos pelo WhatsApp',
    },
    result: {
      headline:    'PROBLEMA HIDRÁULICO? RESOLVEMOS HOJE.',
      subheadline: 'Atendimento em até 2h. Orçamento gratuito. 15 anos de experiência na região.',
      cta:         'Pedir orçamento →',
      time:        '39s',
    },
  },
]

// ── PROCESSO ─────────────────────────────────────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step:        '01',
    title:       'Briefing',
    description: '7 perguntas estratégicas. Sem reunião. Sem jargão.',
    time:        '~2 min',
  },
  {
    step:        '02',
    title:       'Aurora Gera',
    description: 'A IA estrutura copy, layout e identidade visual.',
    time:        '~45s',
  },
  {
    step:        '03',
    title:       'Editor',
    description: 'Edite qualquer elemento com 1 clique. Ou use como está.',
    time:        '~1 min',
  },
  {
    step:        '04',
    title:       'Publicação',
    description: 'URL ao vivo. SSL incluso. Google Search Console.',
    time:        '~10s',
  },
]

// ── MÓDULOS DA PLATAFORMA ────────────────────────────────────────────────
export const PLATFORM_MODULES: PlatformModule[] = [
  {
    id:          'landing-pages',
    icon:        '⚡',
    title:       'Landing Pages',
    description: 'Páginas de alta conversão geradas por IA em segundos.',
    status:      'available',
  },
  {
    id:          'copywriting',
    icon:        '✦',
    title:       'Copywriting',
    description: 'Copy estratégico para anúncios, e-mails e páginas.',
    status:      'soon',
    releaseDate: 'Jul. 2026',
  },
  {
    id:          'branding',
    icon:        '◈',
    title:       'Branding',
    description: 'Identidade visual consistente gerada por IA.',
    status:      'soon',
    releaseDate: 'Ago. 2026',
  },
  {
    id:          'seo',
    icon:        '◎',
    title:       'SEO Inteligente',
    description: 'Otimização automática para o Google.',
    status:      'soon',
    releaseDate: 'Set. 2026',
  },
  {
    id:          'crm',
    icon:        '⬡',
    title:       'CRM',
    description: 'Pipeline de leads integrado à plataforma.',
    status:      'planned',
    releaseDate: 'Out. 2026',
  },
  {
    id:          'agents',
    icon:        '▲',
    title:       'Agentes IA',
    description: 'Marketing autônomo. Zero intervenção manual.',
    status:      'planned',
    releaseDate: '2027',
  },
]

// ── DEPOIMENTOS ──────────────────────────────────────────────────────────
export const TESTIMONIALS: Testimonial[] = [
  {
    id:       'rafael',
    quote:    'Coloquei no ar antes da campanha terminar. Nunca tinha acontecido isso com uma agência.',
    author:   'Rafael C.',
    role:     'Gestor de Tráfego',
    city:     'São Paulo',
    before:   { metric: 'Custo agência',   value: 'R$ 2.400 + 21 dias' },
    after:    { metric: 'Com Sampa Vision', value: 'R$ 97/mês · 58 segundos' },
    featured: true,
  },
  {
    id:       'ana',
    quote:    'Em 3 semanas recuperamos o investimento. A taxa de conversão subiu de 1,8% para 4,3%.',
    author:   'Ana T.',
    role:     'Diretora de Marketing',
    city:     'Curitiba',
    before:   { metric: 'Conversão anterior', value: '1,8%' },
    after:    { metric: 'Com Sampa Vision',    value: '4,3%' },
    featured: false,
  },
  {
    id:       'lucas',
    quote:    'Custo por lead caiu 74% em 30 dias. Não muda mais de ferramenta.',
    author:   'Lucas P.',
    role:     'Head de Growth',
    city:     'Florianópolis',
    before:   { metric: 'Custo por lead', value: 'R$ 180' },
    after:    { metric: 'Com Sampa Vision', value: 'R$ 47 (−74%)' },
    featured: false,
  },
]

// ── FAQ ───────────────────────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quanto tempo leva para entregar minha landing page?',
    answer:
      'Nossa IA gera a página em menos de 60 segundos após o briefing. O processo completo — briefing, edição e publicação — leva menos de 5 minutos.',
  },
  {
    question: 'Preciso ter um domínio próprio?',
    answer:
      'Não. Entregamos a página publicada em subdomínio gratuito (suamarca.sampa.vision) com SSL incluso. Quando quiser ativar o domínio próprio, o custo de hospedagem é incluído no plano.',
  },
  {
    question: 'A página funciona para Google Ads e Meta Ads?',
    answer:
      'Sim. Toda página é construída com estrutura focada em tráfego pago: headline clara, CTA de alto contraste, carregamento rápido e formulário de captura. Integramos Pixel Meta e Google Tag Manager com 1 clique.',
  },
  {
    question: 'Posso solicitar revisões após a entrega?',
    answer:
      'Sim. O editor da plataforma permite edição de qualquer elemento após a geração. Você tem controle total sobre o resultado sem precisar de programador ou designer.',
  },
  {
    question: 'Como funciona o briefing de 7 perguntas?',
    answer:
      'São 7 perguntas estratégicas sobre seu negócio, público, diferencial, oferta e CTA. Levam cerca de 2 minutos para responder e são a base que a IA usa para gerar copy e layout personalizados.',
  },
  {
    question: 'Qual é o investimento?',
    answer:
      'O plano Starter começa em R$ 97/mês e inclui landing pages ilimitadas. Nenhum plano exige cartão de crédito para começar — a primeira página é grátis.',
  },
]

// ── COMPARAÇÃO DE PREÇO ───────────────────────────────────────────────────
export const PRICE_COMPARISON = {
  competitor: {
    label:    'Agência Tradicional',
    price:    'R$ 2.500 – 8.000',
    unit:     'por landing page',
    cons:     ['+ 3 semanas de prazo', '+ reuniões e briefings longos', '+ revisões limitadas por contrato', '+ dependência total de terceiros'],
  },
  product: {
    label:    'Sampa Vision AI',
    price:    'a partir de R$ 97',
    unit:     '/mês',
    pros:     ['Landing pages ilimitadas', 'Entrega em menos de 60 segundos', 'Editor sem código', 'Cancela quando quiser'],
  },
}

// ── FOOTER ────────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  produto:  [
    { label: 'Landing Pages',  href: '#produto' },
    { label: 'Copywriting',    href: '#modulos' },
    { label: 'Branding',       href: '#modulos' },
    { label: 'Preços',         href: '#precos' },
  ],
  empresa:  [
    { label: 'Sobre',      href: '/sobre' },
    { label: 'Roadmap',    href: '/roadmap' },
    { label: 'Contato',    href: '/contato' },
    { label: 'Carreiras',  href: '/carreiras' },
  ],
  recursos: [
    { label: 'Docs',        href: '/docs' },
    { label: 'Blog',        href: '/blog' },
    { label: 'Status',      href: '/status' },
    { label: 'Changelog',   href: '/changelog' },
  ],
  legal:    [
    { label: 'Privacidade',  href: '/privacidade' },
    { label: 'Termos',       href: '/termos' },
    { label: 'API',          href: '/api' },
  ],
}
