'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useMousePosition } from '@/hooks/useMousePosition'
import { MASCOT, TIMING, COLORS, BEGONIA_PETAL_PATH } from '@/lib/garden-config'

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
  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)
  const mascotGroupRef = useRef<SVGGElement>(null)
  const mouthRef = useRef<SVGPathElement>(null)
  const mouse = useMousePosition()

  const leftEyeX = useRef<gsap.QuickToFunc | null>(null)
  const leftEyeY = useRef<gsap.QuickToFunc | null>(null)
  const rightEyeX = useRef<gsap.QuickToFunc | null>(null)
  const rightEyeY = useRef<gsap.QuickToFunc | null>(null)
  const lastProximityScale = useRef<number>(1)

  useGSAP(
    () => {
      if (!interactive || !containerRef.current) return

      // Init eye dot quickTo
      if (leftEyeRef.current) {
        leftEyeX.current = gsap.quickTo(leftEyeRef.current, 'cx', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
        leftEyeY.current = gsap.quickTo(leftEyeRef.current, 'cy', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
      }
      if (rightEyeRef.current) {
        rightEyeX.current = gsap.quickTo(rightEyeRef.current, 'cx', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
        rightEyeY.current = gsap.quickTo(rightEyeRef.current, 'cy', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
      }

      // Init proximity scale
      if (containerRef.current) {
        gsap.set(containerRef.current, { scaleX: 1, scaleY: 1 })
      }

      // Breathing
      if (mascotGroupRef.current) {
        gsap.to(mascotGroupRef.current, {
          scaleX: 1.025,
          scaleY: 1.018,
          duration: TIMING.breatheDuration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '100px 120px',
        })
      }

      // Petal sway
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

      // Stamen wiggle
      const stamens = containerRef.current.querySelectorAll('.mascot-stamen')
      stamens.forEach((s, i) => {
        gsap.to(s, {
          y: `+=${0.5 + Math.random()}`,
          duration: 1.2 + i * 0.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Autonomous blinking — squash dot eyes vertically
      const blink = () => {
        const delay =
          TIMING.blinkIntervalMin +
          Math.random() * (TIMING.blinkIntervalMax - TIMING.blinkIntervalMin)
        gsap.delayedCall(delay / 1000, () => {
          const tl = gsap.timeline()
          if (leftEyeRef.current && rightEyeRef.current) {
            tl.to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 0.1,
              duration: TIMING.blinkDuration / 2,
              ease: 'power2.in',
              transformOrigin: 'center center',
            })
            tl.to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 1,
              duration: TIMING.blinkDuration / 2,
              ease: 'power2.out',
              transformOrigin: 'center center',
            })
          }
          tl.call(blink)
        })
      }
      blink()
    },
    { scope: containerRef }
  )

  // Mouse tracking + proximity
  useEffect(() => {
    if (!interactive || mouse.isTouch || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.42

    const dx = mouse.x - centerX
    const dy = mouse.y - centerY

    // Eye tracking - move dot eyes
    const maxDist = 320
    const nx = Math.max(-1, Math.min(1, dx / maxDist))
    const ny = Math.max(-1, Math.min(1, dy / maxDist))
    const offsetX = nx * MASCOT.irisMaxOffset
    const offsetY = ny * MASCOT.irisMaxOffset

    leftEyeX.current?.(MASCOT.eyeLeft.x + offsetX)
    leftEyeY.current?.(MASCOT.eyeLeft.y + offsetY)
    rightEyeX.current?.(MASCOT.eyeRight.x + offsetX)
    rightEyeY.current?.(MASCOT.eyeRight.y + offsetY)

    // Proximity reaction
    const visualCenterY = rect.top + rect.height * 0.5
    const visualDx = mouse.x - centerX
    const visualDy = mouse.y - visualCenterY
    const dist = Math.sqrt(visualDx * visualDx + visualDy * visualDy)

    let targetScale = 1
    if (dist < MASCOT.proximityRadius) {
      const t = 1 - dist / MASCOT.proximityRadius
      targetScale = 1 + (MASCOT.proximityScale - 1) * t

      if (mouthRef.current) {
        const smileDepth = 5 + t * 6
        mouthRef.current.setAttribute(
          'd',
          `M88 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + smileDepth} 112 ${MASCOT.mouthY}`
        )
      }
    } else if (mouthRef.current) {
      mouthRef.current.setAttribute(
        'd',
        `M93 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + 5} 107 ${MASCOT.mouthY}`
      )
    }

    if (containerRef.current && Math.abs(targetScale - lastProximityScale.current) > 0.005) {
      lastProximityScale.current = targetScale
      gsap.to(containerRef.current, {
        scaleX: targetScale,
        scaleY: targetScale,
        duration: TIMING.proximityEase,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }, [mouse.x, mouse.y, mouse.isTouch, interactive])

  // Generate petal positions — 5 petals around face center
  const petals = Array.from({ length: MASCOT.petalCount }).map((_, i) => {
    const angle = (i * 360) / MASCOT.petalCount - 90
    const rad = (angle * Math.PI) / 180
    const tipX = MASCOT.faceCenter.x + Math.cos(rad) * MASCOT.petalOffset
    const tipY = MASCOT.faceCenter.y + Math.sin(rad) * MASCOT.petalOffset
    const rotation = angle + 90
    return { tipX, tipY, rotation }
  })

  // Stamen cluster
  const stamens = Array.from({ length: MASCOT.stamenCount }).map((_, i) => {
    const a = (i * 360) / MASCOT.stamenCount + (i % 2) * 18
    const r = MASCOT.stamenClusterRadius * (0.5 + (i % 3) * 0.25)
    const rad = (a * Math.PI) / 180
    return {
      x: MASCOT.faceCenter.x + Math.cos(rad) * r,
      y: MASCOT.faceCenter.y - 18 + Math.sin(rad) * r * 0.5,
      r: MASCOT.stamenRadius * (0.7 + (i % 2) * 0.5),
    }
  })

  return (
    <div
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{ width: size, height: size * 1.2, transformOrigin: 'center center' }}
    >
      <svg viewBox={MASCOT.viewBox} width="100%" height="100%" aria-label="FLOV begonia mascot">
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor={COLORS.sakura} />
            <stop offset="60%" stopColor={COLORS.sakuraLight} />
            <stop offset="100%" stopColor={COLORS.begoniaWhite} />
          </radialGradient>
          <radialGradient id="petalGradientAlt" cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor={COLORS.sakuraDeep} />
            <stop offset="55%" stopColor={COLORS.sakura} />
            <stop offset="100%" stopColor={COLORS.sakuraLight} />
          </radialGradient>
          <radialGradient id="faceGradient" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#FFFBF5" />
            <stop offset="100%" stopColor={COLORS.cream} />
          </radialGradient>
        </defs>

        <g>
          <g ref={mascotGroupRef}>
            {/* Stem */}
            <path
              d={`M100 ${MASCOT.faceCenter.y + MASCOT.faceRadius + 14} C95 175 105 195 100 225`}
              stroke={COLORS.spring}
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Leaves */}
            <ellipse
              cx="86"
              cy="190"
              rx="13"
              ry="6.5"
              fill={COLORS.spring}
              opacity="0.85"
              transform="rotate(-30 86 190)"
            />
            <ellipse
              cx="114"
              cy="178"
              rx="13"
              ry="6.5"
              fill={COLORS.springLight}
              opacity="0.85"
              transform="rotate(28 114 178)"
            />

            {/* Petals — 5 begonia heart-shaped */}
            {petals.map((p, i) => (
              <path
                key={i}
                className="mascot-petal"
                d={BEGONIA_PETAL_PATH}
                fill={i % 2 === 0 ? 'url(#petalGradient)' : 'url(#petalGradientAlt)'}
                stroke={COLORS.sakuraDeep}
                strokeWidth="0.6"
                strokeOpacity="0.3"
                transform={`translate(${p.tipX} ${p.tipY}) rotate(${p.rotation})`}
              />
            ))}

            {/* Face circle */}
            <circle
              cx={MASCOT.faceCenter.x}
              cy={MASCOT.faceCenter.y}
              r={MASCOT.faceRadius}
              fill="url(#faceGradient)"
              stroke={COLORS.sakuraLight}
              strokeWidth="1"
              strokeOpacity="0.5"
            />

            {/* Stamen cluster — yellow dots near top of face */}
            {stamens.map((s, i) => (
              <circle
                key={i}
                className="mascot-stamen"
                cx={s.x}
                cy={s.y}
                r={s.r}
                fill={i % 2 === 0 ? COLORS.sunshine : COLORS.sunshineDeep}
              />
            ))}

            {/* Abstract dot eyes */}
            <circle
              ref={leftEyeRef}
              cx={MASCOT.eyeLeft.x}
              cy={MASCOT.eyeLeft.y}
              r="3.6"
              fill={COLORS.charcoal}
            />
            <circle
              ref={rightEyeRef}
              cx={MASCOT.eyeRight.x}
              cy={MASCOT.eyeRight.y}
              r="3.6"
              fill={COLORS.charcoal}
            />

            {/* Abstract cheeks — soft pink dots only */}
            <circle
              cx={MASCOT.blushLeft.x}
              cy={MASCOT.blushLeft.y}
              r="5.5"
              fill={COLORS.sakura}
              opacity="0.45"
            />
            <circle
              cx={MASCOT.blushRight.x}
              cy={MASCOT.blushRight.y}
              r="5.5"
              fill={COLORS.sakura}
              opacity="0.45"
            />

            {/* Curve mouth */}
            <path
              ref={mouthRef}
              d={`M93 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + 5} 107 ${MASCOT.mouthY}`}
              stroke={COLORS.charcoal}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
