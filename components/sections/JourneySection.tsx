'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface JourneySectionProps {
  dict: {
    label: string
    heading: string
    subheading: string
    stage1Title: string
    stage1Body: string
    stage2Title: string
    stage2Body: string
    stage3Title: string
    stage3Body: string
  }
}

const STAGES = [
  {
    color: '#FFD93D',
    bgColor: 'rgba(255,217,61,0.1)',
    borderColor: 'rgba(255,217,61,0.2)',
  },
  {
    color: '#2EC4B6',
    bgColor: 'rgba(46,196,182,0.1)',
    borderColor: 'rgba(46,196,182,0.2)',
  },
  {
    color: '#FF6B9D',
    bgColor: 'rgba(255,107,157,0.1)',
    borderColor: 'rgba(255,107,157,0.2)',
  },
]

function SeedIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="rgba(255,217,61,0.15)" />
      <ellipse cx="32" cy="36" rx="8" ry="12" fill="#FFD93D" opacity="0.8" />
      <path d="M32 24 C32 18 35 14 38 12" stroke="#2EC4B6" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function SproutIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="rgba(46,196,182,0.12)" />
      {/* Stem */}
      <path d="M32 48 C32 38 32 32 32 26" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leaf */}
      <path d="M32 36 C26 32 22 28 24 22 C28 24 30 30 32 36Z" fill="#2EC4B6" opacity="0.7" />
      {/* Right leaf */}
      <path d="M32 30 C38 26 42 22 40 16 C36 18 34 24 32 30Z" fill="#2EC4B6" opacity="0.5" />
      {/* Ground */}
      <ellipse cx="32" cy="48" rx="10" ry="3" fill="#FFD93D" opacity="0.3" />
    </svg>
  )
}

function BloomIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28" fill="rgba(255,107,157,0.1)" />
      {/* Petals */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const cx = 32 + Math.cos(rad) * 10
        const cy = 28 + Math.sin(rad) * 10
        return (
          <ellipse
            key={angle}
            cx={cx}
            cy={cy}
            rx={5}
            ry={9}
            fill="#FF6B9D"
            opacity={angle % 120 === 0 ? 0.8 : 0.6}
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        )
      })}
      <circle cx="32" cy="28" r="5" fill="#FFD93D" />
      {/* Stem */}
      <path d="M32 37 C32 42 32 48 32 50" stroke="#2EC4B6" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 44 C28 40 24 38 22 34" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

const ICONS = [SeedIcon, SproutIcon, BloomIcon]

export default function JourneySection({ dict }: JourneySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const stages = [
    { title: dict.stage1Title, body: dict.stage1Body },
    { title: dict.stage2Title, body: dict.stage2Body },
    { title: dict.stage3Title, body: dict.stage3Body },
  ]

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#FAFBFF' }}
    >
      <div className="section-container">
        <FadeInUp className="text-center mb-4">
          <SectionLabel>{dict.label}</SectionLabel>
        </FadeInUp>

        <FadeInUp delay={0.05} className="text-center mb-4">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1} className="text-center mb-16">
          <p
            className="text-base lg:text-lg max-w-2xl mx-auto leading-loose mt-4"
            style={{ color: '#636E72' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-32 left-0 right-0" aria-hidden="true">
            <svg className="w-full" height="4" viewBox="0 0 900 4" preserveAspectRatio="none">
              <motion.line
                x1="75"
                y1="2"
                x2="825"
                y2="2"
                stroke="url(#journeyGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />
              <defs>
                <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FFD93D" />
                  <stop offset="50%" stopColor="#2EC4B6" />
                  <stop offset="100%" stopColor="#FF6B9D" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stages.map((stage, i) => {
              const Icon = ICONS[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-6 rounded-full p-2"
                    style={{
                      background: STAGES[i].bgColor,
                      border: `2px solid ${STAGES[i].borderColor}`,
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.6 + i * 0.3,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    <Icon />
                  </motion.div>

                  {/* Stage number */}
                  <div
                    className="text-xs font-bold tracking-widest mb-2"
                    style={{ color: STAGES[i].color }}
                  >
                    0{i + 1}
                  </div>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: 'var(--font-noto-serif-sc), serif',
                      color: '#2D3436',
                    }}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className="text-sm leading-loose max-w-xs"
                    style={{ color: '#636E72' }}
                  >
                    {stage.body}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
