'use client'

import { motion } from 'framer-motion'

interface CandleFlameProps {
  index?: number
  size?: 'sm' | 'md' | 'lg'
}

export default function CandleFlame({ index = 0, size = 'md' }: CandleFlameProps) {
  const sizes = { sm: 32, md: 48, lg: 64 }
  const w = sizes[size]

  // Each candle gets slightly different timing based on index
  const delay = (index * 0.17) % 2
  const flameDuration = 1.1 + (index % 5) * 0.12

  return (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      <motion.div
        style={{ width: w * 0.6, height: w * 0.9, position: 'relative' }}
        animate={{
          scaleY: [1, 1.1, 0.92, 1.06, 1],
          scaleX: [1, 0.95, 1.05, 0.97, 1],
        }}
        transition={{
          delay,
          duration: flameDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 20 30"
          fill="none"
          aria-hidden="true"
        >
          {/* Outer flame */}
          <path
            d="M10 2 C7 8 4 14 6 20 C7.5 24 10 26 10 26 C10 26 12.5 24 14 20 C16 14 13 8 10 2Z"
            fill="#D4A847"
          />
          {/* Inner flame highlight */}
          <path
            d="M10 8 C9 12 7.5 16 9 19 C9.5 21 10 22 10 22 C10 22 10.5 21 11 19 C12.5 16 11 12 10 8Z"
            fill="#F5E6B0"
            opacity="0.8"
          />
          {/* Wick */}
          <line x1="10" y1="26" x2="10" y2="30" stroke="#3D2A00" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Candle body */}
      <div
        style={{
          width: w * 0.5,
          height: w * 0.7,
          background: 'linear-gradient(180deg, #FAF6EF 0%, #F3EBD8 100%)',
          borderRadius: '2px 2px 4px 4px',
          boxShadow: '0 2px 8px rgba(212,168,71,0.15)',
        }}
      />

      {/* Glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: w * 2,
          height: w * 2,
          background: 'radial-gradient(circle, rgba(212,168,71,0.2) 0%, transparent 70%)',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{
          delay,
          duration: flameDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
