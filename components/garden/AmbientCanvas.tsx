'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 「花瓣的一天」— site-wide ambient background on a single fixed canvas.
 * Begonia petals drift all day; fireflies take over in the dusk zone near the
 * footer. Mouse movement stirs a gentle breeze; clicking blooms a small flower.
 * One rAF loop, DPR-capped, paused when the tab is hidden, off for reduced motion.
 */

const PETALS_DESKTOP = 15
const PETALS_MOBILE = 8
const FIREFLIES = 12

interface Petal {
  x: number
  y: number
  s: number
  vy: number
  ph: number
  sway: number
  rot: number
  vr: number
  deep: boolean
  drift: number
}

interface Firefly {
  x: number
  y: number
  ph: number
  sp: number
  r: number
}

interface Bloom {
  x: number
  y: number
  t: number
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const lowEnd =
      typeof (navigator as { deviceMemory?: number }).deviceMemory === 'number' &&
      ((navigator as { deviceMemory?: number }).deviceMemory as number) < 4

    let W = 0
    let H = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5)

    const isMobile = () => window.innerWidth < 768
    const targetCount = () => (lowEnd ? 6 : isMobile() ? PETALS_MOBILE : PETALS_DESKTOP)

    function size() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = W * DPR
      canvas!.height = H * DPR
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    size()

    const mkPetal = (fromTop: boolean): Petal => ({
      x: Math.random() * W,
      y: fromTop ? -24 : Math.random() * H,
      s: 6 + Math.random() * 7,
      vy: 0.35 + Math.random() * 0.55,
      ph: Math.random() * Math.PI * 2,
      sway: 0.4 + Math.random() * 0.7,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.02,
      deep: Math.random() < 0.4,
      drift: 0,
    })

    const petals: Petal[] = []
    for (let i = 0; i < targetCount(); i++) petals.push(mkPetal(false))

    const flies: Firefly[] = []
    for (let i = 0; i < FIREFLIES; i++) {
      flies.push({
        x: Math.random() * W,
        y: H * 0.45 + Math.random() * H * 0.5,
        ph: Math.random() * Math.PI * 2,
        sp: 0.3 + Math.random() * 0.5,
        r: 1.2 + Math.random() * 1.4,
      })
    }

    const blooms: Bloom[] = []

    const mouse = { x: -9999, y: -9999, vx: 0 }
    let lastMx: number | null = null

    const onMove = (e: MouseEvent) => {
      mouse.vx = lastMx === null ? 0 : e.clientX - lastMx
      lastMx = e.clientX
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const onLeave = () => {
      mouse.x = -9999
      lastMx = null
      mouse.vx = 0
    }
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouse.vx = lastMx === null ? 0 : (t.clientX - lastMx) * 0.6
      lastMx = t.clientX
      mouse.x = t.clientX
      mouse.y = t.clientY
    }
    const onClick = (e: MouseEvent) => {
      if (blooms.length > 4) return
      blooms.push({ x: e.clientX, y: e.clientY, t: 0 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)
    window.addEventListener('click', onClick)
    window.addEventListener('resize', size)

    function petalPath(s: number) {
      ctx!.beginPath()
      ctx!.moveTo(0, s * 0.55)
      ctx!.bezierCurveTo(-s * 0.62, s * 0.15, -s * 0.5, -s * 0.72, 0, -s)
      ctx!.bezierCurveTo(s * 0.5, -s * 0.72, s * 0.62, s * 0.15, 0, s * 0.55)
      ctx!.closePath()
    }

    function drawPetal(x: number, y: number, rot: number, s: number, deep: boolean, alpha: number) {
      ctx!.save()
      ctx!.translate(x, y)
      ctx!.rotate(rot)
      ctx!.globalAlpha = alpha
      ctx!.fillStyle = deep ? '#ED93B1' : '#F4C0D1'
      petalPath(s)
      ctx!.fill()
      ctx!.globalAlpha = alpha * 0.55
      ctx!.fillStyle = '#FBEAF0'
      petalPath(s * 0.45)
      ctx!.fill()
      ctx!.restore()
    }

    let raf = 0
    let running = true

    function frame() {
      if (!running) return
      ctx!.clearRect(0, 0, W, H)

      // Petal population follows breakpoint
      const want = targetCount()
      while (petals.length < want) petals.push(mkPetal(true))
      if (petals.length > want) petals.length = want

      // Dusk progress: fireflies wake as the viewport reaches the page bottom
      const docH = document.documentElement.scrollHeight
      const seen = (window.scrollY + H) / docH
      const duskAlpha = Math.min(1, Math.max(0, (seen - 0.86) / 0.1))

      petals.forEach((p) => {
        p.ph += 0.02
        p.rot += p.vr
        p.y += p.vy * (p.deep ? 0.7 : 1)
        const wind = Math.sin(p.ph) * p.sway * 0.6
        if (mouse.x > -100) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 12100) p.drift += mouse.vx * 0.05 * (1 - d2 / 12100)
        }
        p.drift *= 0.96
        p.x += wind + p.drift
        if (p.y > H + 26) Object.assign(p, mkPetal(true))
        if (p.x < -32) p.x = W + 24
        if (p.x > W + 32) p.x = -24
        // Petals thin out in the dusk zone so fireflies own the night
        const alpha = (p.deep ? 0.4 : 0.66) * (1 - duskAlpha * 0.55)
        drawPetal(p.x, p.y, p.rot + Math.sin(p.ph) * 0.3, p.s * (p.deep ? 0.7 : 1), p.deep, alpha)
      })

      if (duskAlpha > 0.01 && !lowEnd) {
        flies.forEach((f) => {
          f.ph += 0.02 * f.sp
          f.x += Math.sin(f.ph) * 0.5
          f.y += Math.cos(f.ph * 0.8) * 0.3
          if (f.x < 0) f.x = W
          if (f.x > W) f.x = 0
          const tw = 0.45 + Math.sin(f.ph * 3) * 0.4
          ctx!.globalAlpha = Math.max(0.06, tw * 0.5) * duskAlpha
          ctx!.fillStyle = '#F3C77A'
          ctx!.beginPath()
          ctx!.arc(f.x, f.y, f.r * 2.6, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.globalAlpha = Math.max(0.12, tw) * duskAlpha
          ctx!.fillStyle = '#FFE9B8'
          ctx!.beginPath()
          ctx!.arc(f.x, f.y, f.r, 0, Math.PI * 2)
          ctx!.fill()
          ctx!.globalAlpha = 1
        })
      }

      for (let i = blooms.length - 1; i >= 0; i--) {
        const bl = blooms[i]
        bl.t += 0.03
        const pr = Math.min(1, bl.t)
        const ease = 1 - Math.pow(1 - pr, 3)
        for (let k = 0; k < 5; k++) {
          const ang = k * ((Math.PI * 2) / 5) + bl.t * 0.4
          drawPetal(bl.x, bl.y, ang, 9 * ease, true, (1 - pr) * 0.9)
          const px = bl.x + Math.cos(ang - Math.PI / 2) * 12 * ease
          const py = bl.y + Math.sin(ang - Math.PI / 2) * 12 * ease
          drawPetal(px, py, ang, 7 * ease, false, (1 - pr) * 0.85)
        }
        ctx!.globalAlpha = 1 - pr
        ctx!.fillStyle = '#FFD93D'
        ctx!.beginPath()
        ctx!.arc(bl.x, bl.y, 3.5 * ease, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.globalAlpha = 1
        if (bl.t > 1.4) blooms.splice(i, 1)
      }

      raf = requestAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', size)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
    />
  )
}
