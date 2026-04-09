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
  const leftIrisRef = useRef<SVGCircleElement>(null)
  const rightIrisRef = useRef<SVGCircleElement>(null)
  const leftPupilRef = useRef<SVGCircleElement>(null)
  const rightPupilRef = useRef<SVGCircleElement>(null)
  const leftEyeRef = useRef<SVGEllipseElement>(null)
  const rightEyeRef = useRef<SVGEllipseElement>(null)
  const mascotGroupRef = useRef<SVGGElement>(null)
  const mouthRef = useRef<SVGPathElement>(null)
  const mouse = useMousePosition()

  // Eye tracking with GSAP quickTo
  const leftIrisX = useRef<gsap.QuickToFunc | null>(null)
  const leftIrisY = useRef<gsap.QuickToFunc | null>(null)
  const rightIrisX = useRef<gsap.QuickToFunc | null>(null)
  const rightIrisY = useRef<gsap.QuickToFunc | null>(null)
  const lastProximityScale = useRef<number>(1)

  useGSAP(
    () => {
      if (!interactive || !containerRef.current) return

      // Initialize quickTo for smooth iris tracking
      if (leftIrisRef.current) {
        leftIrisX.current = gsap.quickTo(leftIrisRef.current, 'cx', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
        leftIrisY.current = gsap.quickTo(leftIrisRef.current, 'cy', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
      }
      if (rightIrisRef.current) {
        rightIrisX.current = gsap.quickTo(rightIrisRef.current, 'cx', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
        rightIrisY.current = gsap.quickTo(rightIrisRef.current, 'cy', {
          duration: TIMING.eyeTrackEase,
          ease: 'power2.out',
        })
      }

      // Initialize proximity scale to 1
      if (containerRef.current) {
        gsap.set(containerRef.current, { scaleX: 1, scaleY: 1 })
      }

      // Breathing animation
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

      // Stamen subtle wiggle
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

      // Autonomous blinking
      const blink = () => {
        const delay =
          TIMING.blinkIntervalMin +
          Math.random() * (TIMING.blinkIntervalMax - TIMING.blinkIntervalMin)
        gsap.delayedCall(delay / 1000, () => {
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
    },
    { scope: containerRef }
  )

  // Track mouse position for eyes + proximity reaction
  useEffect(() => {
    if (!interactive || mouse.isTouch || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.42 // eye level

    const dx = mouse.x - centerX
    const dy = mouse.y - centerY

    // Eye tracking
    const maxDist = 300
    const nx = Math.max(-1, Math.min(1, dx / maxDist))
    const ny = Math.max(-1, Math.min(1, dy / maxDist))
    const offsetX = nx * MASCOT.irisMaxOffset
    const offsetY = ny * MASCOT.irisMaxOffset

    leftIrisX.current?.(MASCOT.eyeLeft.x + offsetX)
    leftIrisY.current?.(MASCOT.eyeLeft.y + offsetY)
    rightIrisX.current?.(MASCOT.eyeRight.x + offsetX)
    rightIrisY.current?.(MASCOT.eyeRight.y + offsetY)

    if (leftPupilRef.current) {
      leftPupilRef.current.setAttribute('cx', String(MASCOT.eyeLeft.x + offsetX * 1.1))
      leftPupilRef.current.setAttribute('cy', String(MASCOT.eyeLeft.y + offsetY * 1.1))
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.setAttribute('cx', String(MASCOT.eyeRight.x + offsetX * 1.1))
      rightPupilRef.current.setAttribute('cy', String(MASCOT.eyeRight.y + offsetY * 1.1))
    }

    // Proximity reaction: distance to flower center (visual center, not eye level)
    const visualCenterY = rect.top + rect.height * 0.5
    const visualDx = mouse.x - centerX
    const visualDy = mouse.y - visualCenterY
    const dist = Math.sqrt(visualDx * visualDx + visualDy * visualDy)

    let targetScale = 1
    if (dist < MASCOT.proximityRadius) {
      const t = 1 - dist / MASCOT.proximityRadius // 0 → 1 as cursor approaches
      targetScale = 1 + (MASCOT.proximityScale - 1) * t

      // Wider smile when cursor is near
      if (mouthRef.current) {
        const smileDepth = 6 + t * 5
        mouthRef.current.setAttribute(
          'd',
          `M88 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + smileDepth} 112 ${MASCOT.mouthY}`
        )
      }
    } else if (mouthRef.current) {
      mouthRef.current.setAttribute(
        'd',
        `M92 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + 6} 108 ${MASCOT.mouthY}`
      )
    }

    // Animate proximity scale only when target meaningfully changes
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
    // Petal tip is at faceCenter, and grows outward
    const tipX = MASCOT.faceCenter.x + Math.cos(rad) * MASCOT.petalOffset
    const tipY = MASCOT.faceCenter.y + Math.sin(rad) * MASCOT.petalOffset
    // The petal path is drawn in local coords with tip at (0,0) and growing UP (negative Y)
    // We need to rotate so the petal grows outward in the direction of `angle`
    // Default petal direction is "up" (-Y) which is angle -90°. So we need to rotate by (angle + 90)
    const rotation = angle + 90
    return { tipX, tipY, rotation }
  })

  // Generate stamen positions — small dots clustered around face center
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
          <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={COLORS.sakura} stopOpacity="0.85" />
            <stop offset="60%" stopColor={COLORS.sakuraLight} stopOpacity="0.6" />
            <stop offset="100%" stopColor={COLORS.sakuraLight} stopOpacity="0" />
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

            {/* Petals — 5 begonia heart-shaped petals */}
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

            {/* Left eye */}
            <ellipse
              ref={leftEyeRef}
              cx={MASCOT.eyeLeft.x}
              cy={MASCOT.eyeLeft.y}
              rx={MASCOT.eyeRadius - 1}
              ry={MASCOT.eyeRadius}
              fill="white"
              stroke="#2D3436"
              strokeWidth="1"
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
            <circle cx={MASCOT.eyeLeft.x + 1.8} cy={MASCOT.eyeLeft.y - 2.5} r={1.8} fill="white" />
            <circle cx={MASCOT.eyeLeft.x - 1.5} cy={MASCOT.eyeLeft.y + 2} r={0.8} fill="white" opacity="0.7" />

            {/* Right eye */}
            <ellipse
              ref={rightEyeRef}
              cx={MASCOT.eyeRight.x}
              cy={MASCOT.eyeRight.y}
              rx={MASCOT.eyeRadius - 1}
              ry={MASCOT.eyeRadius}
              fill="white"
              stroke="#2D3436"
              strokeWidth="1"
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
            <circle cx={MASCOT.eyeRight.x + 1.8} cy={MASCOT.eyeRight.y - 2.5} r={1.8} fill="white" />
            <circle cx={MASCOT.eyeRight.x - 1.5} cy={MASCOT.eyeRight.y + 2} r={0.8} fill="white" opacity="0.7" />

            {/* Cartoon cheeks — bigger, saturated, with white highlight */}
            <circle
              cx={MASCOT.blushLeft.x}
              cy={MASCOT.blushLeft.y}
              r={MASCOT.blushRadius}
              fill="url(#blushGradient)"
            />
            <circle
              cx={MASCOT.blushLeft.x - 2}
              cy={MASCOT.blushLeft.y - 2.5}
              r="2.2"
              fill="white"
              opacity="0.7"
            />
            <circle
              cx={MASCOT.blushRight.x}
              cy={MASCOT.blushRight.y}
              r={MASCOT.blushRadius}
              fill="url(#blushGradient)"
            />
            <circle
              cx={MASCOT.blushRight.x - 2}
              cy={MASCOT.blushRight.y - 2.5}
              r="2.2"
              fill="white"
              opacity="0.7"
            />

            {/* Mouth — cute smile */}
            <path
              ref={mouthRef}
              d={`M92 ${MASCOT.mouthY} Q100 ${MASCOT.mouthY + 6} 108 ${MASCOT.mouthY}`}
              stroke={COLORS.sakuraDeep}
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
