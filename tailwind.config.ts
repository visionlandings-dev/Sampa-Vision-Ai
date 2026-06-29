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
      colors: {
        void:    '#09090B',
        pit:     '#0D0D12',
        well:    '#111827',
        cave:    '#1A1F2E',
        stone:   '#374151',
        ash:     '#6B7280',
        fog:     '#9CA3AF',
        ghost:   '#D1D5DB',
        bone:    '#F3F4F6',

        electric: {
          DEFAULT: '#0066FF',
          hover:   '#3385FF',
          dim:     '#0044CC',
          glow:    'rgba(0,102,255,0.18)',
        },

        success: '#10B981',
        warning: '#F59E0B',
        error:   '#EF4444',

        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          active:  'rgba(0,102,255,0.40)',
        },
      },

      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },

      fontSize: {
        'hero':    ['clamp(2.6rem,6vw,5.5rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display': ['clamp(1.8rem,3vw,2.8rem)',  { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'title':   ['clamp(1.2rem,2vw,1.6rem)',  { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'mono-xs': ['0.58rem', { lineHeight: '1.4', letterSpacing: '0.22em' }],
        'mono-sm': ['0.66rem', { lineHeight: '1.5', letterSpacing: '0.18em' }],
        'mono-md': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.10em' }],
      },

      boxShadow: {
        'glow-sm': '0 0 12px rgba(0,102,255,0.25)',
        'glow-md': '0 0 24px rgba(0,102,255,0.3), 0 4px 20px rgba(0,102,255,0.2)',
        'glow-lg': '0 0 40px rgba(0,102,255,0.4), 0 8px 40px rgba(0,102,255,0.3)',
      },

      animation: {
        'ticker':     'ticker 32s linear infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'fade-up':    'fade-up 0.6s ease forwards',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
      },

      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-dot': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.4' },
          '50%':     { opacity: '0.85' },
        },
        'cursor-blink': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
      },

      backgroundImage: {
        'grid':       `linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),
                       linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)`,
        'glow-radial':'radial-gradient(ellipse 70% 60% at 60% 0%, rgba(0,102,255,0.12), transparent)',
      },
      backgroundSize: { grid: '48px 48px' },
    },
  },
  plugins: [],
}

export default config
