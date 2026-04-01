'use client'

import { motion } from 'framer-motion'

interface PetalParticleProps {
  index: number
  style?: React.CSSProperties
}

const PETAL_PATHS = [
  'M10 2 C6 5 4 10 6 14 C7 17 10 18 10 18 C10 18 13 17 14 14 C16 10 14 5 10 2Z',
  'M10 3 C5 6 3 12 5.5 16 C7 19 10 20 10 20 C10 20 13 19 14.5 16 C17 12 15 6 10 3Z',
  'M10 1 C7 5 5 9 7 13 C8 16 10 17 10 17 C10 17 12 16 13 13 C15 9 13 5 10 1Z',
]

export default function PetalParticle({ index, style }: PetalParticleProps) {
  const path = PETAL_PATHS[index % PETAL_PATHS.length]
  const duration = 7 + (index * 1.3) % 5
  const delay = (index * 0.8) % 3

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        y: [0, -25, -10, -30, 0],
        x: [0, 8, -5, 12, 0],
        rotate: [0, 15, -8, 20, 0],
        opacity: [0.5, 0.85, 0.7, 0.9, 0.5],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d={path} fill="#E8A0A8" />
      </svg>
    </motion.div>
  )
}
