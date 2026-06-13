'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Desktop: inertial smooth scrolling via Lenis + eased hash-anchor travel.
 * Mobile/touch: NO Lenis (it fights the WeChat WebView's native scrolling); hash anchors
 * use native scrollIntoView, and `scroll-mt-16` on sections supplies the header offset.
 * Reduced-motion: native scrolling, nothing installed.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const isDesktop = window.matchMedia('(min-width: 1024px) and (pointer: fine)').matches

    if (!isDesktop) {
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
        if (!a) return
        const hash = a.getAttribute('href') || ''
        if (hash.length < 2) return
        const target = document.querySelector(hash)
        if (!target) return
        e.preventDefault()
        ;(target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    }

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let rafId = requestAnimationFrame(function loop(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    })

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const hash = a.getAttribute('href') || ''
      if (hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, {
        offset: -64,
        duration: 1.25,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onClick)
      delete (window as unknown as { __lenis?: Lenis }).__lenis
      lenis.destroy()
    }
  }, [])

  return null
}
