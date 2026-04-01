'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { COLORS } from '@/lib/garden-config'

interface FloatingPetalProps {
  index: number
  style?: React.CSSProperties
}

export default function FloatingPetal({ index, style }: FloatingPetalProps) {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    const dur = 6 + (index * 1.5) % 4
    const delay = (index * 0.7) % 3

    gsap.to(ref.current, {
      y: `-=${20 + index * 5}`,
      x: `+=${(index % 2 === 0 ? 1 : -1) * (10 + index * 2)}`,
      rotation: 360,
      duration: dur,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })

    gsap.to(ref.current, {
      opacity: 0.4,
      duration: dur / 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 0.5,
    })
  }, { scope: ref })

  const colors = [COLORS.sakura, COLORS.sakuraLight, '#FFB3CC', '#FF8BB5']
  const fill = colors[index % colors.length]

  return (
    <svg
      ref={ref}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="absolute pointer-events-none"
      style={{ opacity: 0.7, ...style }}
      aria-hidden="true"
    >
      <ellipse cx="9" cy="5" rx="4" ry="7" fill={fill} transform="rotate(15 9 9)" />
    </svg>
  )
}
