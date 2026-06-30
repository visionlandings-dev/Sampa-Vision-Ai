'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/content'

export function Navbar() {
  const scrolled = useScrolled({ threshold: 40 })
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-400',
          scrolled
            ? 'py-3 bg-void/90 backdrop-blur-xl border-b border-[rgba(100,100,180,0.12)]'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="container-main flex items-center justify-between gap-8">

          {/* ── LOGO ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric"
            aria-label="Sampa Vision AI — Página inicial"
          >
            {/* Símbolo geométrico */}
            <span
              className="inline-flex items-center justify-center w-7 h-7 border border-electric/40 text-electric text-xs font-mono group-hover:border-electric group-hover:shadow-glow-sm transition-all duration-200"
              aria-hidden="true"
            >
              ◈
            </span>
            <span className="font-display font-bold text-sm uppercase tracking-[0.1em] text-bone">
              Sampa<span className="text-electric">.Vision</span>
            </span>
          </Link>

          {/* ── NAV DESKTOP ── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ash hover:text-bone transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* ── AÇÕES DIREITA ── */}
          <div className="hidden md:flex items-center gap-4">
            {/* Status operacional */}
            <div
              className="flex items-center gap-1.5 font-mono text-mono-xs uppercase tracking-[0.2em] text-ash"
              aria-label="Status do sistema: Operacional"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot"
                aria-hidden="true"
              />
              Operacional
            </div>

            <Link
              href="/auth/login"
              className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ash hover:text-bone transition-colors duration-200"
            >
              Entrar
            </Link>

            <Button asChild size="sm">
              <Link href="/auth/signup">
                Começar grátis
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* ── TOGGLE MOBILE ── */}
          <button
            className="md:hidden p-2 text-ash hover:text-bone transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen
              ? <X className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </header>

      {/* ── MENU MOBILE ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed top-[60px] left-0 right-0 z-40',
              'bg-void/95 backdrop-blur-xl border-b border-[rgba(100,100,180,0.12)]',
              'py-6 px-6'
            )}
          >
            <nav className="flex flex-col gap-4" aria-label="Navegação mobile">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ghost hover:text-bone transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[rgba(100,100,180,0.12)] flex flex-col gap-3">
                <Button variant="ghost" size="md" asChild>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                    Entrar
                  </Link>
                </Button>
                <Button size="md" asChild>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)}>
                    Começar grátis
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
