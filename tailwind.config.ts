import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── DESIGN TOKENS — Sampa Vision AI ──────────────────────────────────
      colors: {
        // Surfaces — escuro para claro
        void:     '#0A0A0F',
        deep:     '#0E0E16',
        pit:      '#121218',
        well:     '#1A1A26',
        cave:     '#20202E',
        stone:    '#2C2C3E',
        ash:      '#6B6B8A',
        fog:      '#9090AA',
        ghost:    '#C4C4D8',
        bone:     '#E4E4F0',

        // Brand accent — azul elétrico
        electric: {
          DEFAULT: '#0066FF',
          hover:   '#3385FF',
          dim:     '#0044CC',
          glow:    'rgba(0, 102, 255, 0.12)',
        },

        // Semânticos — status
        success: '#00C896',
        warning: '#F59E0B',
        error:   '#EF4444',
        info:    '#06B6D4',

        // Bordas
        border: {
          DEFAULT: 'rgba(100, 100, 180, 0.12)',
          active:  'rgba(0, 102, 255, 0.35)',
        },
      },

      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },

      fontSize: {
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)',   { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 5rem)',   { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.8rem, 3vw, 3rem)',   { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.2rem, 2vw, 1.8rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'body-lg':    ['1rem',   { lineHeight: '1.75' }],
        'body-md':    ['0.9rem', { lineHeight: '1.8' }],
        'body-sm':    ['0.8rem', { lineHeight: '1.7' }],
        'mono-md':    ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.08em' }],
        'mono-sm':    ['0.65rem', { lineHeight: '1.5', letterSpacing: '0.18em' }],
        'mono-xs':    ['0.58rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },

      spacing: {
        'section':    '8rem',
        'section-sm': '5rem',
        'section-xs': '3rem',
        'container':  '1440px',
        'gutter':     'clamp(1.5rem, 4vw, 5rem)',
      },

      animation: {
        'ticker':     'ticker 30s linear infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'scan':       'scan 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },

      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.8' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
      },

      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(100, 100, 180, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100, 100, 180, 0.06) 1px, transparent 1px)
        `,
        'glow-blue':    'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 102, 255, 0.15), transparent)',
        'glow-purple':  'radial-gradient(ellipse 40% 40% at 80% 60%, rgba(120, 0, 255, 0.06), transparent)',
      },

      backgroundSize: {
        'grid': '48px 48px',
      },

      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 102, 255, 0.3)',
        'glow-md': '0 0 24px rgba(0, 102, 255, 0.3), 0 4px 24px rgba(0, 102, 255, 0.2)',
        'glow-lg': '0 0 40px rgba(0, 102, 255, 0.4), 0 8px 40px rgba(0, 102, 255, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
