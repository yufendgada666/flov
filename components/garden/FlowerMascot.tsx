'use client'

import { useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useMousePosition } from '@/hooks/useMousePosition'
import { MASCOT, TIMING, COLORS } from '@/lib/garden-config'

interface FlowerMascotProps {
  className?: string
  size?: number
  interactive?: boolean
}

export default function FlowerMascot({
  className = '',
  size = 200,
  interactive = true,
}: FlowerMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftIrisRef = useRef<SVGCircleElement>(null)
  const rightIrisRef = useRef<SVGCircleElement>(null)
  const leftPupilRef = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const leftEyeRef = useRef<SVGEllipseElement>(null)
  const rightEyeRef = useRef<SVGEllipseElement>(null)
  const mascotGroupRef = useRef<SVGGElement>(null)
  const mouse = useMousePosition()

  // Eye tracking with GSAP quickTo
  const leftIrisX = useRef<gsap.QuickToFunc | null>(null)
  const leftIrisY = useRef<gsap.QuickToFunc | null>(null)
  const rightIrisX = useRef<gsap.QuickToFunc | null>(null)
  const rightIrisY = useRef<gsap.QuickToFunc | null>(null)

  useGSAP(() => {
    if (!interactive || !containerRef.current) return

    // Initialize quickTo for smooth iris tracking
    if (leftIrisRef.current) {
      leftIrisX.current = gsap.quickTo(leftIrisRef.current, 'cx', { duration: TIMING.eyeTrackEase, ease: 'power2.out' })
      leftIrisY.current = gsap.quickTo(leftIrisRef.current, 'cy', { duration: TIMING.eyeTrackEase, ease: 'power2.out' })
    }
    if (rightIrisRef.current) {
      rightIrisX.current = gsap.quickTo(rightIrisRef.current, 'cx', { duration: TIMING.eyeTrackEase, ease: 'power2.out' })
      rightIrisY.current = gsap.quickTo(rightIrisRef.current, 'cy', { duration: TIMING.eyeTrackEase, ease: 'power2.out' })
    }
    if (leftPupilRef.current) {
      gsap.quickTo(leftPupilRef.current, 'cx', { duration: TIMING.eyeTrackEase + 0.05, ease: 'power2.out' })
      gsap.quickTo(leftPupilRef.current, 'cy', { duration: TIMING.eyeTrackEase + 0.05, ease: 'power2.out' })
    }

    // Breathing animation
    if (mascotGroupRef.current) {
      gsap.to(mascotGroupRef.current, {
        scaleX: 1.02,
        scaleY: 1.015,
        duration: TIMING.breatheDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '100px 120px',
      })
    }

    // Petal sway — each petal gets independent subtle rotation
    const petals = containerRef.current.querySelectorAll('.mascot-petal')
    petals.forEach((petal, i) => {
      gsap.to(petal, {
        rotation: `+=${2 + Math.random() * 2}`,
        duration: TIMING.petalSwayDuration + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        transformOrigin: '100px 100px',
      })
    })

    // Autonomous blinking
    const blink = () => {
      const delay = TIMING.blinkIntervalMin + Math.random() * (TIMING.blinkIntervalMax - TIMING.blinkIntervalMin)
      gsap.delayedCall(delay / 1000, () => {
        // Close eyes
        const tl = gsap.timeline()
        if (leftEyeRef.current && rightEyeRef.current) {
          tl.to([leftEyeRef.current, rightEyeRef.current], {
            attr: { ry: 1 },
            duration: TIMING.blinkDuration / 2,
            ease: 'power2.in',
          })
          tl.to([leftEyeRef.current, rightEyeRef.current], {
            attr: { ry: MASCOT.eyeRadius },
            duration: TIMING.blinkDuration / 2,
            ease: 'power2.out',
          })
        }
        tl.call(blink)
      })
    }
    blink()
  }, { scope: containerRef })

  // Track mouse position for eyes
  useEffect(() => {
    if (!interactive || mouse.isTouch || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.42 // eye level

    const dx = mouse.x - centerX
    const dy = mouse.y - centerY
    const maxDist = 300
    const nx = Math.max(-1, Math.min(1, dx / maxDist))
    const ny = Math.max(-1, Math.min(1, dy / maxDist))
    const offsetX = nx * MASCOT.irisMaxOffset
    const offsetY = ny * MASCOT.irisMaxOffset

    leftIrisX.current?.(MASCOT.eyeLeft.x + offsetX)
    leftIrisY.current?.(MASCOT.eyeLeft.y + offsetY)
    rightIrisX.current?.(MASCOT.eyeRight.x + offsetX)
    rightIrisY.current?.(MASCOT.eyeRight.y + offsetY)

    // Also move pupils with slightly more offset
    if (leftPupilRef.current) {
      leftPupilRef.current.setAttribute('cx', String(MASCOT.eyeLeft.x + offsetX * 1.1))
      leftPupilRef.current.setAttribute('cy', String(MASCOT.eyeLeft.y + offsetY * 1.1))
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.setAttribute('cx', String(MASCOT.eyeRight.x + offsetX * 1.1))
      rightPupilRef.current.setAttribute('cy', String(MASCOT.eyeRight.y + offsetY * 1.1))
    }
  }, [mouse.x, mouse.y, mouse.isTouch, interactive])

  // Generate petal positions
  const petals = Array.from({ length: MASCOT.petalCount }).map((_, i) => {
    const angle = (i * 360) / MASCOT.petalCount - 90
    const rad = (angle * Math.PI) / 180
    const cx = MASCOT.faceCenter.x + Math.cos(rad) * MASCOT.petalOffset
    const cy = MASCOT.faceCenter.y + Math.sin(rad) * MASCOT.petalOffset
    return { cx, cy, angle }
  })

  return (
    <div ref={containerRef} className={`inline-block ${className}`} style={{ width: size, height: size * 1.2 }}>
      <svg viewBox={MASCOT.viewBox} width="100%" height="100%" aria-label="FLOV flower mascot">
        <g ref={mascotGroupRef}>
          {/* Stem */}
          <path
            d={`M100 ${MASCOT.faceCenter.y + MASCOT.faceRadius + 10} C95 170 105 190 100 220`}
            stroke={COLORS.spring}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Leaves */}
          <ellipse cx="88" cy="185" rx="12" ry="6" fill={COLORS.spring} opacity="0.8" transform="rotate(-30 88 185)" />
          <ellipse cx="112" cy="175" rx="12" ry="6" fill={COLORS.springLight} opacity="0.8" transform="rotate(25 112 175)" />

          {/* Petals */}
          {petals.map((p, i) => (
            <ellipse
              key={i}
              className="mascot-petal"
              cx={p.cx}
              cy={p.cy}
              rx={MASCOT.petalRx}
              ry={MASCOT.petalRy}
              fill={i % 2 === 0 ? COLORS.sakura : COLORS.sakuraLight}
              opacity={0.85 + (i % 3) * 0.05}
              transform={`rotate(${p.angle} ${p.cx} ${p.cy})`}
            />
          ))}

          {/* Face circle */}
          <circle
            cx={MASCOT.faceCenter.x}
            cy={MASCOT.faceCenter.y}
            r={MASCOT.faceRadius}
            fill={COLORS.cream}
          />
          {/* Face inner gradient (warmth) */}
          <circle
            cx={MASCOT.faceCenter.x}
            cy={MASCOT.faceCenter.y + 3}
            r={MASCOT.faceRadius - 4}
            fill="rgba(255,245,228,0.6)"
          />

          {/* Left eye */}
          <ellipse
            ref={leftEyeRef}
            cx={MASCOT.eyeLeft.x}
            cy={MASCOT.eyeLeft.y}
            rx={MASCOT.eyeRadius - 1}
            ry={MASCOT.eyeRadius}
            fill="white"
            stroke="#2D3436"
            strokeWidth="0.8"
          />
          <circle
            ref={leftIrisRef}
            cx={MASCOT.eyeLeft.x}
            cy={MASCOT.eyeLeft.y}
            r={MASCOT.irisRadius}
            fill={COLORS.charcoal}
          />
          <circle
            ref={leftPupilRef}
            cx={MASCOT.eyeLeft.x}
            cy={MASCOT.eyeLeft.y}
            r={MASCOT.pupilRadius}
            fill="#111"
          />
          {/* Highlight */}
          <circle cx={MASCOT.eyeLeft.x + 1.5} cy={MASCOT.eyeLeft.y - 2} r={1.5} fill="white" />

          {/* Right eye */}
          <ellipse
            ref={rightEyeRef}
            cx={MASCOT.eyeRight.x}
            cy={MASCOT.eyeRight.y}
            rx={MASCOT.eyeRadius - 1}
            ry={MASCOT.eyeRadius}
            fill="white"
            stroke="#2D3436"
            strokeWidth="0.8"
          />
          <circle
            ref={rightIrisRef}
            cx={MASCOT.eyeRight.x}
            cy={MASCOT.eyeRight.y}
            r={MASCOT.irisRadius}
            fill={COLORS.charcoal}
          />
          <circle
            ref={rightPupilRef}
            cx={MASCOT.eyeRight.x}
            cy={MASCOT.eyeRight.y}
            r={MASCOT.pupilRadius}
            fill="#111"
          />
          <circle cx={MASCOT.eyeRight.x + 1.5} cy={MASCOT.eyeRight.y - 2} r={1.5} fill="white" />

          {/* Blush */}
          <circle
            cx={MASCOT.blushLeft.x}
            cy={MASCOT.blushLeft.y}
            r={MASCOT.blushRadius}
            fill={COLORS.sakuraLight}
            opacity="0.4"
          />
          <circle
            cx={MASCOT.blushRight.x}
            cy={MASCOT.blushRight.y}
            r={MASCOT.blushRadius}
            fill={COLORS.sakuraLight}
            opacity="0.4"
          />

          {/* Mouth — cute smile */}
          <path
            d={`M92 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + 6} 108 ${MASCOT.mouthY}`}
            stroke={COLORS.sakura}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}
