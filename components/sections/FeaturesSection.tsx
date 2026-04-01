'use client'

import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeInUp } from '@/components/animations/variants'

interface FeaturesSectionProps {
  dict: {
    label: string
    heading: string
    subheading: string
    feature1Title: string
    feature1Body: string
    feature2Title: string
    feature2Body: string
    feature3Title: string
    feature3Body: string
    feature4Title: string
    feature4Body: string
  }
}

const FEATURES = [
  {
    seedColor: '#FF6B9D',
    bloomColor: '#FFE4EE',
    petalColor: '#FF6B9D',
  },
  {
    seedColor: '#2EC4B6',
    bloomColor: '#E0F7F5',
    petalColor: '#2EC4B6',
  },
  {
    seedColor: '#FFD93D',
    bloomColor: '#FFF8E1',
    petalColor: '#FFD93D',
  },
  {
    seedColor: '#A78BFA',
    bloomColor: '#F0EBFF',
    petalColor: '#A78BFA',
  },
]

function BloomIcon({ seedColor, petalColor }: { seedColor: string; petalColor: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {/* Seed state (visible by default, hidden on hover via CSS) */}
      <g className="bloom-seed">
        <ellipse cx="24" cy="30" rx="6" ry="8" fill={seedColor} opacity="0.6" />
        <ellipse cx="24" cy="28" rx="4" ry="5" fill={seedColor} opacity="0.8" />
      </g>
      {/* Bloom state (hidden by default, visible on hover) */}
      <g className="bloom-flower" style={{ opacity: 0, transform: 'scale(0)', transformOrigin: '24px 24px', transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180
          const cx = 24 + Math.cos(rad) * 8
          const cy = 24 + Math.sin(rad) * 8
          return (
            <ellipse
              key={angle}
              cx={cx}
              cy={cy}
              rx={4}
              ry={7}
              fill={petalColor}
              opacity={0.7}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx="24" cy="24" r="5" fill="#FFD93D" />
      </g>
    </svg>
  )
}

export default function FeaturesSection({ dict }: FeaturesSectionProps) {
  const features = [
    { title: dict.feature1Title, body: dict.feature1Body },
    { title: dict.feature2Title, body: dict.feature2Body },
    { title: dict.feature3Title, body: dict.feature3Body },
    { title: dict.feature4Title, body: dict.feature4Body },
  ]

  return (
    <section id="product" className="section-padding" style={{ background: '#FAFBFF' }}>
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

        <FadeInUp delay={0.1} className="text-center mb-14">
          <p
            className="text-base lg:text-lg max-w-2xl mx-auto leading-loose mt-4"
            style={{ color: '#636E72' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group rounded-2xl p-6 border cursor-default transition-colors duration-300"
              style={{
                background: '#FAFBFF',
                borderColor: `${FEATURES[i].seedColor}20`,
              }}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 48px ${FEATURES[i].seedColor}18`,
                borderColor: `${FEATURES[i].seedColor}40`,
                backgroundColor: FEATURES[i].bloomColor,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Icon container with bloom transition */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                style={{ background: `${FEATURES[i].seedColor}12` }}
              >
                <div className="relative">
                  {/* Seed icon (default) */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="transition-all duration-500 group-hover:opacity-0 group-hover:scale-50"
                  >
                    <ellipse cx="14" cy="16" rx="5" ry="7" fill={FEATURES[i].seedColor} opacity="0.7" />
                    <path d="M14 9 C14 5 16 3 18 2" stroke={FEATURES[i].seedColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                  {/* Bloom icon (on hover) */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="absolute inset-0 transition-all duration-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                  >
                    {[0, 72, 144, 216, 288].map((angle) => {
                      const rad = ((angle - 90) * Math.PI) / 180
                      const cx = 14 + Math.cos(rad) * 6
                      const cy = 14 + Math.sin(rad) * 6
                      return (
                        <ellipse
                          key={angle}
                          cx={cx}
                          cy={cy}
                          rx={3}
                          ry={5}
                          fill={FEATURES[i].petalColor}
                          opacity={0.75}
                          transform={`rotate(${angle} ${cx} ${cy})`}
                        />
                      )
                    })}
                    <circle cx="14" cy="14" r="3.5" fill="#FFD93D" />
                  </svg>
                </div>
              </div>

              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-loose" style={{ color: '#636E72' }}>
                {feature.body}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
