import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// ── FONTE INTER via next/font (otimizado, sem CLS) ───────────────────────
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// ── METADATA COMPLETA — SEO + Open Graph + Twitter ───────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://sampa.vision'),

  title: {
    default: 'Sampa Vision AI — Páginas que convertem em 60 segundos',
    template: '%s | Sampa Vision AI',
  },
  description:
    'Plataforma de Inteligência Artificial para marketing digital. Gere landing pages de alta conversão, copy estratégico e identidade visual com IA. De um briefing de 7 perguntas para uma página publicada em menos de 60 segundos.',

  keywords: [
    'landing page IA',
    'gerador de landing page',
    'inteligência artificial marketing',
    'landing page alta conversão',
    'criador de páginas de vendas',
    'plataforma SaaS marketing',
    'sampa vision',
  ],

  authors: [{ name: 'Sampa Vision AI', url: 'https://sampa.vision' }],
  creator: 'Sampa Vision AI',
  publisher: 'Sampa Vision AI',

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sampa.vision',
    siteName: 'Sampa Vision AI',
    title: 'Sampa Vision AI — Páginas que convertem em 60 segundos',
    description:
      'Plataforma de IA para marketing digital. Landing pages de alta conversão geradas em segundos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sampa Vision AI — Plataforma de IA para Marketing Digital',
      },
    ],
  },

  // Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'Sampa Vision AI — Páginas que convertem em 60 segundos',
    description:
      'Plataforma de IA para marketing digital. Landing pages de alta conversão geradas em segundos.',
    images: ['/og-image.png'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Manifest
  manifest: '/manifest.json',

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

// ── VIEWPORT ─────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ── SCHEMA.ORG — JSON-LD ──────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sampa Vision AI',
  url: 'https://sampa.vision',
  description:
    'Plataforma de Inteligência Artificial para geração de landing pages de alta conversão.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '97',
    priceCurrency: 'BRL',
  },
}

// ── ROOT LAYOUT ───────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip to main content — acessibilidade */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-electric focus:text-void focus:px-4 focus:py-2 focus:text-sm focus:font-medium"
        >
          Ir para o conteúdo principal
        </a>

        {children}
      </body>
    </html>
  )
}
