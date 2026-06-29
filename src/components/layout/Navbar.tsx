'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrolled'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/config/content'

export function Navbar() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'py-3 bg-void/90 backdrop-blur-xl border-b border-white/[0.06]'
            : 'py-5 bg-transparent',
        )}
      >
        <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)] flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" aria-label="Sampa Vision AI — Página inicial" className="flex items-center gap-2.5 group">
            <span className="inline-flex items-center justify-center w-7 h-7 border border-electric/40 text-electric text-xs font-mono group-hover:border-electric group-hover:shadow-glow-sm transition-all duration-200">
              ◈
            </span>
            <span className="font-display font-bold text-sm uppercase tracking-[0.1em] text-bone">
              Sampa<span className="text-electric">.Vision</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ash hover:text-bone transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-1.5 font-mono text-mono-xs uppercase tracking-[0.2em] text-ash">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" aria-hidden />
              Operacional
            </div>
            <Link href="/entrar" className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ash hover:text-bone transition-colors">
              Entrar
            </Link>
            <Button asChild size="sm">
              <Link href="#contato">
                Começar grátis
                <ArrowRight className="w-3 h-3" aria-hidden />
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-ash hover:text-bone transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[56px] left-0 right-0 z-40 bg-void/95 backdrop-blur-xl border-b border-white/[0.06] py-6 px-6"
          >
            <nav className="flex flex-col gap-4" aria-label="Navegação mobile">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-mono-sm uppercase tracking-[0.18em] text-ghost hover:text-bone transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col gap-3">
                <Button variant="ghost" size="md" asChild>
                  <Link href="/entrar" onClick={() => setOpen(false)}>Entrar</Link>
                </Button>
                <Button size="md" asChild>
                  <Link href="#contato" onClick={() => setOpen(false)}>
                    Começar grátis <ArrowRight className="w-3 h-3" aria-hidden />
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
