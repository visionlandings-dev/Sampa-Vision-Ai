'use client'

import { useState, useEffect, useCallback } from 'react'

interface UseScrolledOptions {
  threshold?: number
}

/**
 * Detecta se o usuário scrollou além de um threshold.
 * Usado para ativar o estado "sticky" da nav.
 */
export function useScrolled({ threshold = 50 }: UseScrolledOptions = {}): boolean {
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    // Verificar estado inicial
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrolled
}
