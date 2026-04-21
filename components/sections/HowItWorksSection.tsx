'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'

interface HowItWorksSectionProps {
  dict: {
    label: string
    heading: string
    step1Title: string
    step1Body: string
    step2Title: string
    step2Body: string
    step3Title: string
    step3Body: string
  }
}

const STEP_COLORS = ['#FF6B9D', '#FFD93D', '#2EC4B6']

function StepIcon({ index }: { index: number }) {
  const color = STEP_COLORS[index]
  const icons = [
    <svg key={0} width="20" height="20" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 3C7.9 3 3 7.1 3 12.2c0 2.8 1.4 5.3 3.6 7l-1 3.8 4.2-2.1c1.3.4 2.7.6 4.2.6 6.1 0 11-4.1 11-9.2S20.1 3 14 3z"
        fill={color}
        opacity="0.2"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="10" cy="12" r="1.2" fill={color} />
      <circle cx="14" cy="12" r="1.2" fill={color} />
      <circle cx="18" cy="12" r="1.2" fill={color} />
    </svg>,
    <svg key={1} width="20" height="20" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="8" fill={color} opacity="0.15" />
      <path d="M14 6c-4.4 0-8 3.6-8 8s3.6 8 8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 10c-2.2 0-4 1.8-4 4s1.8 4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill={color} />
    </svg>,
    <svg key={2} width="20" height="20" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="7" width="20" height="14" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      <path d="M4 10l10 7 10-7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
  ]
  return icons[index]
}

export default function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const steps = [
    { title: dict.step1Title, body: dict.step1Body },
    { title: dict.step2Title, body: dict.step2Body },
    { title: dict.step3Title, body: dict.step3Body },
  ]

  return (
    <section
      id="how-it-works"
      className="py-12 md:py-16"
      style={{ background: '#FAFBFF' }}
      ref={sectionRef}
    >
      <div className="section-container">
        <FadeInUp className="text-center mb-8">
          <div
            className="inline-flex items-center gap-3 text-xs tracking-[0.25em] uppercase en-display"
            style={{ color: '#636E72' }}
          >
            <span className="h-px w-8 bg-charcoal-light/25" />
            {dict.label}
            <span className="h-px w-8 bg-charcoal-light/25" />
          </div>
          <h2
            className="text-xl md:text-2xl font-bold mt-3"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-2 md:gap-6 items-start relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center px-1"
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: '#FAFBFF',
                      boxShadow: `0 0 0 4px ${STEP_COLORS[i]}15`,
                      border: `1.5px solid ${STEP_COLORS[i]}40`,
                    }}
                  >
                    <StepIcon index={i} />
                  </div>
                </div>
                <div
                  className="text-[13px] font-semibold mb-1"
                  style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
                >
                  {step.title}
                </div>
                <p className="text-[11px] md:text-xs leading-relaxed max-w-[16ch] md:max-w-[22ch]" style={{ color: '#8A94A2' }}>
                  {step.body}
                </p>

                {/* Arrow between steps — desktop only */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-4 h-px"
                    style={{
                      left: `${((i + 1) * 100) / steps.length - 6}%`,
                      width: '12%',
                      background: `linear-gradient(90deg, ${STEP_COLORS[i]}50, ${STEP_COLORS[i + 1]}50)`,
                    }}
                    aria-hidden
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
