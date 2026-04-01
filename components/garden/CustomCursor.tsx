'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useMobileDetect } from '@/hooks/useMobileDetect'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const mouse = useMousePosition()
  const isMobile = useMobileDetect()
  const [hovering, setHovering] = useState(false)
  const posX = useRef<gsap.QuickToFunc | null>(null)
  const posY = useRef<gsap.QuickToFunc | null>(null)

  // Setup quickTo for smooth follow
  useEffect(() => {
    if (isMobile || mouse.isTouch || !cursorRef.current) return

    posX.current = gsap.quickTo(cursorRef.current, 'x', { duration: 0.2, ease: 'power2.out' })
    posY.current = gsap.quickTo(cursorRef.current, 'y', { duration: 0.2, ease: 'power2.out' })

    // Add custom-cursor class to body
    document.body.classList.add('custom-cursor')

    // Listen for hover on interactive elements
    const interactiveSelector = 'a, button, input, select, textarea, [role="button"]'
    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)

    document.querySelectorAll(interactiveSelector).forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    // MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove('custom-cursor')
      observer.disconnect()
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [isMobile, mouse.isTouch])

  // Track cursor position
  useEffect(() => {
    if (isMobile || mouse.isTouch) return
    posX.current?.(mouse.x - 10)
    posY.current?.(mouse.y - 10)
  }, [mouse.x, mouse.y, isMobile, mouse.isTouch])

  // Don't render on mobile/touch
  if (isMobile || mouse.isTouch) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ willChange: 'transform' }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        style={{
          transform: `scale(${hovering ? 1.6 : 1}) rotate(${hovering ? 0 : 45}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: hovering ? 'drop-shadow(0 0 6px rgba(255,107,157,0.6))' : 'none',
        }}
      >
        <ellipse cx="10" cy="6" rx="5" ry="8" fill="#FF6B9D" opacity={hovering ? 1 : 0.8} />
      </svg>
    </div>
  )
}
