'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from './variants'

interface FadeInUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export default function FadeInUp({
  children,
  className,
  delay = 0,
  once = true,
}: FadeInUpProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={fadeInUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
