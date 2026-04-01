'use client'

import { motion } from 'framer-motion'
import { cardHover, fadeInUp } from '@/components/animations/variants'

interface CardProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export default function Card({ children, className = '', dark = false }: CardProps) {
  return (
    <motion.div
      className={`
        rounded-2xl p-6 border transition-colors duration-300
        ${dark
          ? 'bg-midnight-soft border-midnight-lighter hover:border-rose/30'
          : 'bg-ivory border-rose/10 hover:border-rose/30'
        }
        ${className}
      `}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
    >
      {children}
    </motion.div>
  )
}
