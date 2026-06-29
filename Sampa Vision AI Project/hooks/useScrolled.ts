'use client'
import { useState, useEffect, useCallback } from 'react'

export function useScrolled(threshold = 50): boolean {
  const [scrolled, setScrolled] = useState(false)
  const handle = useCallback(() => setScrolled(window.scrollY > threshold), [threshold])

  useEffect(() => {
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [handle])

  return scrolled
}
