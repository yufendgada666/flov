'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useMousePosition } from '@/hooks/useMousePosition'
import { COLORS, BEGONIA_PETAL_PATH_SMALL } from '@/lib/garden-config'

export type ChildFlowerColorVariant = 'sakura' | 'lavender' | 'white' | 'deep' | 'sunshine'

interface ChildFlowerProps {
  className?: string
  size?: number
  delay?: number
  personality?: 'curious' | 'happy' | 'shy'
  colorVariant?: ChildFlowerColorVariant
}

const COLOR_VARIANTS: Record<
  ChildFlowerColorVariant,
  { outer: string; inner: string; center: string }
> = {
  sakura: { outer: COLORS.sakuraLight, inner: COLORS.sakura, center: COLORS.sunshine },
  lavender: { outer: COLORS.lavenderLight, inner: COLORS.lavender, center: COLORS.sunshine },
  white: { outer: COLORS.begoniaWhite, inner: COLORS.sakuraLight, center: COLORS.sunshineDeep },
  deep: { outer: COLORS.sakura, inner: COLORS.sakuraDeep, center: COLORS.sunshine },
  sunshine: { outer: '#FFE89A', inner: COLORS.sunshine, center: COLORS.sakura },
}

const PERSONALITY_TRACK_FACTOR = {
  curious: 1.2,
  happy: 0.8,
  shy: 0.4,
} as const

export default function ChildFlower({
  className = '',
  size = 80,
  delay = 0,
  personality = 'happy',
  colorVariant = 'sakura',
}: ChildFlowerProps) {
  const ref = useRef<SVGSVGElement>(null)
  const leftEyeRef = useRef<SVGCircleElement>(null)
  const rightEyeRef = useRef<SVGCircleElement>(null)
  const leftEyeX = useRef<gsap.QuickToFunc | null>(null)
  const leftEyeY = useRef<gsap.QuickToFunc | null>(null)
  const rightEyeX = useRef<gsap.QuickToFunc | null>(null)
  const rightEyeY = useRef<gsap.QuickToFunc | null>(null)
  const mouse = useMousePosition()
  const colors = COLOR_VARIANTS[colorVariant]
  const trackFactor = PERSONALITY_TRACK_FACTOR[personality]

  useGSAP(
    () => {
      if (!ref.current) return

      const trackDelay = personality === 'shy' ? 0.4 : 0.18
      if (leftEyeRef.current) {
        leftEyeX.current = gsap.quickTo(leftEyeRef.current, 'cx', {
          duration: trackDelay,
          ease: 'power2.out',
        })
        leftEyeY.current = gsap.quickTo(leftEyeRef.current, 'cy', {
          duration: trackDelay,
          ease: 'power2.out',
        })
      }
      if (rightEyeRef.current) {
        rightEyeX.current = gsap.quickTo(rightEyeRef.current, 'cx', {
          duration: trackDelay,
          ease: 'power2.out',
        })
        rightEyeY.current = gsap.quickTo(rightEyeRef.current, 'cy', {
          duration: trackDelay,
          ease: 'power2.out',
        })
      }

      // Gentle floating
      gsap.to(ref.current, {
        y: -6,
        duration: 2.5 + delay * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      })

      // Petal sway
      const petals = ref.current.querySelectorAll('.child-petal')
      petals.forEach((p, i) => {
        gsap.to(p, {
          rotation: `+=${1.5}`,
          duration: 2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '40px 35px',
        })
      })

      // Blink — squash dot eyes
      const blink = () => {
        gsap.delayedCall(3 + Math.random() * 5, () => {
          const tl = gsap.timeline()
          if (leftEyeRef.current && rightEyeRef.current) {
            tl.to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 0.1,
              duration: 0.08,
              ease: 'power2.in',
              transformOrigin: 'center center',
            })
            tl.to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 1,
              duration: 0.1,
              ease: 'power2.out',
              transformOrigin: 'center center',
            })
          }
          tl.call(blink)
        })
      }
      blink()
    },
    { scope: ref }
  )

  // Eye tracking
  useEffect(() => {
    if (mouse.isTouch || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height * 0.4

    const dx = mouse.x - centerX
    const dy = mouse.y - centerY
    const maxDist = 280
    const nx = Math.max(-1, Math.min(1, dx / maxDist))
    const ny = Math.max(-1, Math.min(1, dy / maxDist))
    const maxOffset = 1.6 * trackFactor
    const offsetX = nx * maxOffset
    const offsetY = ny * maxOffset

    leftEyeX.current?.(35 + offsetX)
    leftEyeY.current?.(33 + offsetY)
    rightEyeX.current?.(45 + offsetX)
    rightEyeY.current?.(33 + offsetY)
  }, [mouse.x, mouse.y, mouse.isTouch, trackFactor])

  // Mouth varies by personality
  const mouths = {
    curious: 'M37 43 Q40 46 43 43',
    happy: 'M35 42 Q40 47 45 42',
    shy: 'M37 43.5 Q40 45 43 43.5',
  }

  // 5 begonia petals
  const petalPositions = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 360) / 5 - 90
    const rad = (angle * Math.PI) / 180
    const tipX = 40 + Math.cos(rad) * 22
    const tipY = 35 + Math.sin(rad) * 22
    const rotation = angle + 90
    return { tipX, tipY, rotation, alt: i % 2 === 1 }
  })

  return (
    <svg
      ref={ref}
      viewBox="0 0 80 90"
      width={size}
      height={size * 1.125}
      className={className}
      aria-hidden="true"
    >
      {/* Stem */}
      <path
        d="M40 55 C38 65 42 75 40 85"
        stroke={COLORS.spring}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="34"
        cy="72"
        rx="6"
        ry="3.5"
        fill={COLORS.springLight}
        opacity="0.7"
        transform="rotate(-25 34 72)"
      />

      {/* 5 begonia petals */}
      {petalPositions.map((p, i) => (
        <path
          key={i}
          className="child-petal"
          d={BEGONIA_PETAL_PATH_SMALL}
          fill={p.alt ? colors.outer : colors.inner}
          stroke={COLORS.sakuraDeep}
          strokeWidth="0.3"
          strokeOpacity="0.25"
          transform={`translate(${p.tipX} ${p.tipY}) rotate(${p.rotation})`}
        />
      ))}

      {/* Face */}
      <circle cx="40" cy="35" r="14" fill={COLORS.cream} stroke={colors.outer} strokeWidth="0.6" />

      {/* Stamen tiny cluster */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i * 72) * (Math.PI / 180)
        return (
          <circle
            key={i}
            cx={40 + Math.cos(a) * 3}
            cy={29 + Math.sin(a) * 1.5}
            r="0.9"
            fill={colors.center}
          />
        )
      })}

      {/* Abstract dot eyes */}
      <circle ref={leftEyeRef} cx="35" cy="33" r="1.6" fill={COLORS.charcoal} />
      <circle ref={rightEyeRef} cx="45" cy="33" r="1.6" fill={COLORS.charcoal} />

      {/* Abstract cheeks */}
      <circle cx="32" cy="38" r="2.2" fill={COLORS.sakura} opacity="0.5" />
      <circle cx="48" cy="38" r="2.2" fill={COLORS.sakura} opacity="0.5" />

      {/* Mouth — simple curve */}
      <path
        d={mouths[personality]}
        stroke={COLORS.charcoal}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
