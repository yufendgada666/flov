'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from './variants'

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  once?: boolean
  slow?: boolean
}

export default function StaggerContainer({
  children,
  className,
  once = true,
  slow = false,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
      variants={
        slow
          ? {
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
            }
          : staggerContainer
      }
    >
      {children}
    </motion.div>
  )
}
