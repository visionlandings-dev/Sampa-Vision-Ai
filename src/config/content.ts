// All page copy lives here — edit text without touching components

export const NAV_LINKS = [
  { label: 'Produto',  href: '#produto' },
  { label: 'Processo', href: '#processo' },
  { label: 'Preços',   href: '#precos' },
  { label: 'FAQ',      href: '#faq' },
]

export const TICKER_ITEMS = [
  'AI Landing Engine', 'AI Copy Engine', 'AI Branding Engine',
  'AI SEO Engine', 'AI Ads Engine', 'AI Analytics Engine',
  'AI Automation Engine', 'AI Agents',
]

export const TERMINAL_STEPS = [
  { icon: '→', text: 'Analisando briefing...',        delay: 400 },
  { icon: '→', text: 'Identificando público-alvo...', delay: 900 },
  { icon: '✓', text: 'Briefing processado',           delay: 1400 },
  { icon: '→', text: 'Gerando headline principal...', delay: 1900 },
  { icon: '→', text: 'Estruturando copy...',          delay: 2400 },
  { icon: '✓', text: 'Copy gerado — 3 variações',     delay: 2900 },
  { icon: '→', text: 'Aplicando identidade visual...', delay: 3300 },
  { icon: '✓', text: 'Layout aplicado',               delay: 3800 },
  { icon: '→', text: 'Publicando em cloud...',        delay: 4200 },
  { icon: '↗', text: 'clinica-sp.sampa.vision — 58s', delay: 4700, isResult: true },
] as const

export const HERO_FRICTION_KILLERS = [
  'Sem cartão de crédito',
  'Sem reunião',
  'Cancela quando quiser',
  'Primeira página grátis',
]

export const HERO_METRICS = [
  { value: '2.847', label: 'páginas geradas', sub: 'hoje' },
  { value: '58s',   label: 'tempo médio',     sub: 'de entrega' },
]

export const SEGMENT_DEMOS = [
  {
    id: 'clinica',
    label: 'Clínica',
    briefing: {
      Negócio: 'Clínica de dermatologia e estética',
      Público:  'Mulheres 30–50 anos',
      Objetivo: 'Agendamentos online',
    },
    headline:    'RESULTADOS QUE VOCÊ VÊ. TRATAMENTOS QUE VOCÊ SENTE.',
    subheadline: 'Dermatologia e estética avançada para quem exige o melhor para a própria pele.',
    cta:         'Agendar consulta →',
    time:        '52s',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    briefing: {
      Negócio: 'Loja de moda feminina online',
      Público:  'Mulheres 25–40 anos',
      Objetivo: 'Vendas diretas',
    },
    headline:    'SUA MODA. SEU ESTILO. ENTREGA EM 24H.',
    subheadline: 'Peças selecionadas para mulheres que não abrem mão de estilo no dia a dia.',
    cta:         'Ver coleção →',
    time:        '61s',
  },
  {
    id: 'infoprodutor',
    label: 'Infoprodutor',
    briefing: {
      Negócio: 'Curso online de finanças pessoais',
      Público:  'Adultos 25–45 com dívidas',
      Objetivo: 'Inscrições no curso',
    },
    headline:    'SAIA DAS DÍVIDAS. CONSTRUA SUA RESERVA. EM 90 DIAS.',
    subheadline: 'O método que já ajudou 4.200 pessoas a organizar as finanças e começar a investir.',
    cta:         'Quero me inscrever →',
    time:        '47s',
  },
  {
    id: 'servico',
    label: 'Serviço Local',
    briefing: {
      Negócio: 'Hidráulica residencial e comercial',
      Público:  'Proprietários com urgência',
      Objetivo: 'Orçamentos pelo WhatsApp',
    },
    headline:    'PROBLEMA HIDRÁULICO? RESOLVEMOS HOJE.',
    subheadline: 'Atendimento em até 2h. Orçamento gratuito. 15 anos de experiência.',
    cta:         'Pedir orçamento →',
    time:        '39s',
  },
]

export const PROCESS_STEPS = [
  { n: '01', title: 'Briefing',     desc: '7 perguntas estratégicas. Sem jargão. Sem reunião.', time: '~2 min' },
  { n: '02', title: 'Aurora Gera',  desc: 'A IA estrutura copy, layout e identidade visual.',   time: '~45s'   },
  { n: '03', title: 'Editor',       desc: 'Edite qualquer elemento com 1 clique. Ou use como está.', time: '~1 min' },
  { n: '04', title: 'Publicação',   desc: 'URL ao vivo. SSL incluso. Search Console configurado.', time: '~10s' },
]

export const MODULES = [
  { icon: '⚡', title: 'Landing Pages',  status: 'live',  date: 'Disponível' },
  { icon: '✦',  title: 'Copywriting',    status: 'soon',  date: 'Jul. 2026'  },
  { icon: '◈',  title: 'Branding',       status: 'soon',  date: 'Ago. 2026'  },
  { icon: '◎',  title: 'SEO Inteligente',status: 'soon',  date: 'Set. 2026'  },
  { icon: '⬡',  title: 'CRM',            status: 'plan',  date: 'Out. 2026'  },
  { icon: '▲',  title: 'Agentes IA',     status: 'plan',  date: '2027'       },
]

export const BEFORE_AFTER = [
  {
    wide: true,
    before: { label: 'Custo da agência', value: 'R$ 2.400 + 21 dias de espera' },
    after:  { label: 'Com Sampa Vision', value: 'R$ 97/mês · 58 segundos' },
    quote:  'Coloquei no ar antes da campanha terminar. Nunca tinha acontecido isso com uma agência.',
    author: 'Rafael C.',
    role:   'Gestor de Tráfego',
  },
  {
    wide: false,
    before: { label: 'Conversão anterior', value: '1,8%' },
    after:  { label: 'Com Sampa Vision',   value: '4,3%' },
    quote:  'Em 3 semanas recuperamos o investimento. A taxa de conversão mais que dobrou.',
    author: 'Ana T.',
    role:   'Diretora de Marketing',
  },
  {
    wide: false,
    before: { label: 'Custo por lead', value: 'R$ 180' },
    after:  { label: 'Com Sampa Vision', value: 'R$ 47 (−74%)' },
    quote:  'Custo por lead caiu 74% em 30 dias. Não mudo mais de ferramenta.',
    author: 'Lucas P.',
    role:   'Head de Growth',
  },
]

export const PRICE_COMPARISON = {
  agency: {
    label: 'Agência Tradicional',
    price: 'R$ 2.500 – 8.000',
    unit:  'por landing page',
    cons:  [
      '+ 3 a 8 semanas de prazo',
      '+ reuniões e aprovações',
      '+ revisões limitadas por contrato',
      '+ dependência total de terceiros',
    ],
  },
  product: {
    label: 'Sampa Vision AI',
    price: 'a partir de R$ 97',
    unit:  '/mês',
    pros:  [
      'Landing pages ilimitadas',
      'Entrega em menos de 60 segundos',
      'Editor sem código incluído',
      'Cancela quando quiser',
    ],
  },
}

export const FAQ_ITEMS = [
  {
    q: 'Quanto tempo leva para entregar minha landing page?',
    a: 'Nossa IA gera a página em menos de 60 segundos após o briefing. O processo completo — briefing, edição e publicação — leva menos de 5 minutos.',
  },
  {
    q: 'Preciso ter um domínio próprio?',
    a: 'Não. Entregamos a página publicada em subdomínio gratuito com SSL incluso. Quando quiser ativar o domínio próprio, o custo de hospedagem está incluído no plano.',
  },
  {
    q: 'A página funciona para Google Ads e Meta Ads?',
    a: 'Sim. Toda página é construída com estrutura focada em tráfego pago: headline clara, CTA de alto contraste e carregamento rápido. Integramos Pixel Meta e Google Tag Manager com 1 clique.',
  },
  {
    q: 'Posso editar a página depois que for gerada?',
    a: 'Sim. O editor permite edição de qualquer elemento após a geração. Você tem controle total sem precisar de programador ou designer.',
  },
  {
    q: 'Como funciona o briefing de 7 perguntas?',
    a: 'São 7 perguntas sobre seu negócio, público, diferencial, oferta e CTA. Levam cerca de 2 minutos para responder e são a base que a IA usa para gerar copy e layout personalizados.',
  },
  {
    q: 'Qual é o investimento?',
    a: 'O plano Starter começa em R$ 97/mês e inclui landing pages ilimitadas. Nenhum plano exige cartão de crédito para começar — a primeira página é grátis.',
  },
]
