'use client'

import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * Scroll-linked page-settle: each .section-sheet eases down onto the stack as it
 * enters (scrubbed to scroll position, not a timed tween), and the section beneath
 * recedes slightly — so every seam crossing feels like a physical page turn.
 */
export default function SheetMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const sheets = gsap.utils.toArray<HTMLElement>('.section-sheet')
    const triggers: ScrollTrigger[] = []

    sheets.forEach((sheet) => {
      // Incoming sheet settles: slight lift + breathing room eases away as it lands
      const settle = gsap.fromTo(
        sheet,
        { y: 56 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sheet,
            start: 'top bottom',
            end: 'top 70%',
            scrub: 0.6,
          },
        }
      )
      if (settle.scrollTrigger) triggers.push(settle.scrollTrigger)

      // Section beneath recedes as this sheet covers it (depth of a stacked deck).
      // Only sections qualify — the footer's previous sibling is <main> itself.
      const prev = sheet.previousElementSibling as HTMLElement | null
      if (prev && prev.tagName === 'SECTION') {
        const recede = gsap.fromTo(
          prev,
          { scale: 1, opacity: 1 },
          {
            scale: 0.985,
            opacity: 0.82,
            transformOrigin: 'center 85%',
            ease: 'none',
            scrollTrigger: {
              trigger: sheet,
              start: 'top 85%',
              end: 'top 18%',
              scrub: 0.6,
            },
          }
        )
        if (recede.scrollTrigger) triggers.push(recede.scrollTrigger)
      }
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return null
}
