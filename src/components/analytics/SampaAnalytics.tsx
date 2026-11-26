'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { sendEvent } from '@/lib/sampaAnalytics'

/**
 * Analytics de primeira parte do sampa.vision → vision.events (Sampa-Core).
 *  - page_view a cada rota
 *  - scroll_50 / scroll_90 por página
 *  - cta_click em qualquer <a> ou <button> (rótulo = data-track ou texto do elemento)
 * Montado uma única vez no layout raiz. Não renderiza nada.
 */
export default function SampaAnalytics({ variant = null }: { variant?: string | null }) {
  const pathname = usePathname()
  const marks = useRef({ half: false, ninety: false })

  useEffect(() => {
    marks.current = { half: false, ninety: false }
    sendEvent('page_view', variant, { rota: pathname })

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const progress = (window.scrollY / max) * 100
      if (progress >= 50 && !marks.current.half) {
        marks.current.half = true
        sendEvent('scroll_50', variant, { rota: pathname })
      }
      if (progress >= 90 && !marks.current.ninety) {
        marks.current.ninety = true
        sendEvent('scroll_90', variant, { rota: pathname })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname, variant])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-track]')
      if (!el) return
      const label = (el.dataset.track || el.getAttribute('aria-label') || el.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80)
      const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') : null
      sendEvent('cta_click', variant, {
        label,
        href: href ? href.slice(0, 300) : null,
        id: el.id || null,
        rota: window.location.pathname,
      })
    }
    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [variant])

  return null
}
