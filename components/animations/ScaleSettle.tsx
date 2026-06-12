'use client'

import { motion } from 'framer-motion'

interface ScaleSettleProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/** Hero-object entrance: rises and settles with a soft overshoot — for cards/QR/phone. */
export default function ScaleSettle({ children, delay = 0, className }: ScaleSettleProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.9, delay }}
    >
      {children}
    </motion.div>
  )
}
