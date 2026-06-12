'use client'

import { motion } from 'framer-motion'

interface HeaderRevealProps {
  children: React.ReactNode
  className?: string
}

/** Section-header entrance: wipe-up mask reveal — reads as "a new page begins". */
export default function HeaderReveal({ children, className }: HeaderRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% -8% 0%)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
