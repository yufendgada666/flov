'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { COLORS, BEGONIA_PETAL_PATH_SMALL } from '@/lib/garden-config'

export type AmbientFlowerVariant = 'sakura' | 'lavender' | 'white' | 'sunshine' | 'deep'

interface AmbientFlowerProps {
  size?: number
  variant?: AmbientFlowerVariant
  className?: string
  style?: React.CSSProperties
  delay?: number
}

const VARIANTS: Record<AmbientFlowerVariant, { outer: string; inner: string; center: string }> = {
  sakura: { outer: COLORS.sakuraLight, inner: COLORS.sakura, center: COLORS.sunshine },
  lavender: { outer: COLORS.lavenderLight, inner: COLORS.lavender, center: COLORS.sunshine },
  white: { outer: COLORS.begoniaWhite, inner: COLORS.sakuraLight, center: COLORS.sunshineDeep },
  sunshine: { outer: '#FFE89A', inner: COLORS.sunshine, center: COLORS.sakura },
  deep: { outer: COLORS.sakura, inner: COLORS.sakuraDeep, center: COLORS.sunshine },
}

export default function AmbientFlower({
  size = 40,
  variant = 'sakura',
  className = '',
  style,
  delay = 0,
}: AmbientFlowerProps) {
  const ref = useRef<SVGSVGElement>(null)
  const colors = VARIANTS[variant]

  useGSAP(
    () => {
      if (!ref.current) return

      // Subtle floating
      gsap.to(ref.current, {
        y: -4 - Math.random() * 4,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay,
      })

      // Petals subtle rotation
      const petals = ref.current.querySelectorAll('.ambient-petal')
      petals.forEach((p, i) => {
        gsap.to(p, {
          rotation: `+=${1 + Math.random()}`,
          duration: 2.5 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '40px 40px',
        })
      })
    },
    { scope: ref }
  )

  // 5 begonia petals around center (40, 40)
  const petalPositions = Array.from({ length: 5 }).map((_, i) => {
    const angle = (i * 360) / 5 - 90
    const rad = (angle * Math.PI) / 180
    const tipX = 40 + Math.cos(rad) * 18
    const tipY = 40 + Math.sin(rad) * 18
    const rotation = angle + 90
    return { tipX, tipY, rotation, alt: i % 2 === 1 }
  })

  return (
    <svg
      ref={ref}
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={`pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {petalPositions.map((p, i) => (
        <path
          key={i}
          className="ambient-petal"
          d={BEGONIA_PETAL_PATH_SMALL}
          fill={p.alt ? colors.outer : colors.inner}
          opacity="0.85"
          transform={`translate(${p.tipX} ${p.tipY}) rotate(${p.rotation})`}
        />
      ))}
      {/* Center stamen cluster */}
      <circle cx="40" cy="40" r="4" fill={colors.outer} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i * 60) * (Math.PI / 180)
        return (
          <circle
            key={i}
            cx={40 + Math.cos(a) * 2.5}
            cy={40 + Math.sin(a) * 2.5}
            r="1.2"
            fill={colors.center}
          />
        )
      })}
      <circle cx="40" cy="40" r="1.4" fill={colors.center} />
    </svg>
  )
}
