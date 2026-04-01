'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { COLORS } from '@/lib/garden-config'

interface ChildFlowerProps {
  className?: string
  size?: number
  color?: string
  delay?: number
  personality?: 'curious' | 'happy' | 'shy'
}

export default function ChildFlower({
  className = '',
  size = 80,
  color = COLORS.sakura,
  delay = 0,
  personality = 'happy',
}: ChildFlowerProps) {
  const ref = useRef<SVGSVGElement>(null)

  useGSAP(() => {
    if (!ref.current) return

    // Gentle floating
    gsap.to(ref.current, {
      y: -8,
      duration: 2.5 + delay * 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })

    // Petal rotation
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

    // Autonomous blinking
    const eyeEls = ref.current.querySelectorAll('.child-eye')
    const blink = () => {
      gsap.delayedCall(3 + Math.random() * 5, () => {
        const tl = gsap.timeline()
        tl.to(eyeEls, { attr: { ry: 0.5 }, duration: 0.08, ease: 'power2.in' })
        tl.to(eyeEls, { attr: { ry: 3.5 }, duration: 0.1, ease: 'power2.out' })
        tl.call(blink)
      })
    }
    blink()
  }, { scope: ref })

  // Mouth varies by personality
  const mouths = {
    curious: 'M35 44 Q40 46 45 44', // tiny O
    happy: 'M35 43 Q40 48 45 43',   // big smile
    shy: 'M37 44 Q40 45 43 44',     // small smile
  }

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
      <path d="M40 55 C38 65 42 75 40 85" stroke={COLORS.spring} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="34" cy="72" rx="6" ry="3.5" fill={COLORS.springLight} opacity="0.7" transform="rotate(-25 34 72)" />

      {/* 5 petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const cx = 40 + Math.cos(rad) * 22
        const cy = 35 + Math.sin(rad) * 22
        return (
          <ellipse
            key={i}
            className="child-petal"
            cx={cx}
            cy={cy}
            rx={10}
            ry={16}
            fill={i % 2 === 0 ? color : COLORS.sakuraLight}
            opacity={0.85}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        )
      })}

      {/* Face */}
      <circle cx="40" cy="35" r="16" fill={COLORS.cream} />

      {/* Eyes */}
      <ellipse className="child-eye" cx="35" cy="33" rx="3" ry="3.5" fill="white" stroke="#2D3436" strokeWidth="0.5" />
      <circle cx="35" cy="33" r="2" fill={COLORS.charcoal} />
      <circle cx="35.8" cy="32" r="0.8" fill="white" />

      <ellipse className="child-eye" cx="45" cy="33" rx="3" ry="3.5" fill="white" stroke="#2D3436" strokeWidth="0.5" />
      <circle cx="45" cy="33" r="2" fill={COLORS.charcoal} />
      <circle cx="45.8" cy="32" r="0.8" fill="white" />

      {/* Blush */}
      <circle cx="31" cy="38" r="3" fill={COLORS.sakuraLight} opacity="0.35" />
      <circle cx="49" cy="38" r="3" fill={COLORS.sakuraLight} opacity="0.35" />

      {/* Mouth */}
      <path d={mouths[personality]} stroke={COLORS.sakura} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
