'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeInUp } from '@/components/animations/variants'

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
  // Simple SVG icons for each step
  const icons = [
    // Child speaking (speech bubble)
    <svg key={0} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3C7.9 3 3 7.1 3 12.2c0 2.8 1.4 5.3 3.6 7l-1 3.8 4.2-2.1c1.3.4 2.7.6 4.2.6 6.1 0 11-4.1 11-9.2S20.1 3 14 3z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" />
      <circle cx="10" cy="12" r="1.2" fill={color} />
      <circle cx="14" cy="12" r="1.2" fill={color} />
      <circle cx="18" cy="12" r="1.2" fill={color} />
    </svg>,
    // AI listening (ear/wave)
    <svg key={1} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="8" fill={color} opacity="0.15" />
      <path d="M14 6c-4.4 0-8 3.6-8 8s3.6 8 8 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 10c-2.2 0-4 1.8-4 4s1.8 4 4 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="14" r="2" fill={color} />
    </svg>,
    // Parent receives (heart/letter)
    <svg key={2} width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="7" width="20" height="14" rx="3" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      <path d="M4 10l10 7 10-7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 4l-2 3h4l-2-3z" fill={color} opacity="0.5" />
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
      className="section-padding"
      style={{ background: '#FAFBFF' }}
      ref={sectionRef}
    >
      <div className="section-container">
        <FadeInUp className="text-center mb-4">
          <SectionLabel>{dict.label}</SectionLabel>
        </FadeInUp>

        <FadeInUp delay={0.05} className="text-center mb-16">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-px overflow-visible" aria-hidden="true">
            <svg className="w-full" height="2" viewBox="0 0 800 2" preserveAspectRatio="none">
              <motion.line
                x1="100"
                y1="1"
                x2="700"
                y2="1"
                stroke="#FF6B9D"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: '#FAFBFF',
                      boxShadow: `0 0 0 6px ${STEP_COLORS[i]}15`,
                      border: `2px solid ${STEP_COLORS[i]}30`,
                    }}
                  >
                    <StepIcon index={i} />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: STEP_COLORS[i] }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-loose max-w-xs" style={{ color: '#636E72' }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
