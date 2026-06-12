'use client'

import { motion } from 'framer-motion'

interface FadeInXProps {
  children: React.ReactNode
  dir?: 'left' | 'right'
  delay?: number
  className?: string
}

/** Directional slide-in for paired/contrasting content (e.g. comparison panels). */
export default function FadeInX({ children, dir = 'left', delay = 0, className }: FadeInXProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: dir === 'left' ? -48 : 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
