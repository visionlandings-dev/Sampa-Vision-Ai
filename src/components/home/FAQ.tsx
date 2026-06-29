'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { FAQ_ITEMS } from '@/config/content'
import { cn } from '@/lib/utils'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-[clamp(5rem,10vw,9rem)] border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-[clamp(1rem,4vw,4rem)]">
        <Reveal className="mb-12">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className="font-display font-bold text-display text-bone mt-3">
            Perguntas que<br />
            <span className="text-electric">todo cliente faz.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="max-w-[780px]">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className="border-b border-white/[0.06] first:border-t">
              <button
                className={cn(
                  'w-full flex items-center justify-between gap-8 py-5 text-left font-light text-sm transition-colors',
                  open === i ? 'text-bone' : 'text-fog hover:text-ghost',
                )}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <Plus
                  className={cn('w-4 h-4 shrink-0 text-ash transition-transform duration-300', open === i && 'rotate-45 text-electric')}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-xs font-light text-ash leading-[1.9]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
