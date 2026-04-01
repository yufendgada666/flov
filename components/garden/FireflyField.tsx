'use client'

import { useRef, useEffect } from 'react'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FireflyFieldProps {
  className?: string
}

export default function FireflyField({ className = '' }: FireflyFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isMobile = useMobileDetect()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const count = isMobile ? 8 : 25

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize fireflies
    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    const flies = Array.from({ length: count }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.015,
      radius: 1.5 + Math.random() * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w(), h())

      for (const f of flies) {
        f.phase += f.speed
        f.x += f.vx + Math.sin(f.phase * 1.3) * 0.2
        f.y += f.vy + Math.cos(f.phase * 0.9) * 0.15

        // Wrap around
        if (f.x < -10) f.x = w() + 10
        if (f.x > w() + 10) f.x = -10
        if (f.y < -10) f.y = h() + 10
        if (f.y > h() + 10) f.y = -10

        const glow = (Math.sin(f.phase * 2) + 1) / 2
        const alpha = 0.3 + glow * 0.7

        // Outer glow
        const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius * 6)
        grad.addColorStop(0, `rgba(255,217,61,${alpha * 0.4})`)
        grad.addColorStop(0.5, `rgba(255,217,61,${alpha * 0.1})`)
        grad.addColorStop(1, 'rgba(255,217,61,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius * 6, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = `rgba(255,240,180,${alpha})`
        ctx.beginPath()
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isMobile, reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
