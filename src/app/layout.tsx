import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://sampa.vision'),
  title: {
    default: 'Sampa Vision AI — Landing Pages que convertem em 60 segundos',
    template: '%s | Sampa Vision AI',
  },
  description:
    'Plataforma de IA que transforma um briefing de 7 perguntas em uma landing page publicada em menos de 60 segundos. Sem agência. Sem código. Sem espera.',
  keywords: ['landing page IA', 'gerador de landing page', 'inteligência artificial marketing', 'páginas de alta conversão'],
  authors: [{ name: 'Sampa Vision AI', url: 'https://sampa.vision' }],
  creator: 'Sampa Vision AI',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://sampa.vision',
    siteName: 'Sampa Vision AI',
    title: 'Sampa Vision AI — Landing Pages que convertem em 60 segundos',
    description: 'Plataforma de IA que gera landing pages profissionais em menos de 60 segundos.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sampa Vision AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sampa Vision AI — Landing Pages que convertem em 60 segundos',
    description: 'Plataforma de IA que gera landing pages profissionais em menos de 60 segundos.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Sampa Vision AI',
  url: 'https://sampa.vision',
  description: 'Plataforma de IA para geração de landing pages de alta conversão.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '97', priceCurrency: 'BRL' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-electric focus:text-void focus:px-4 focus:py-2 focus:text-sm"
        >
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  )
}
