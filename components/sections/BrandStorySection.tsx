'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'
import { fadeInUp, fadeInLeft, fadeInRight } from '@/components/animations/variants'

interface BrandStorySectionProps {
  dict: {
    label: string
    heading: string
    body1: string
    body2: string
    body3: string
    quote: string
    quoteAttr: string
    closing: string
    floraTitle: string
    floraBody: string
    voiceTitle: string
    voiceBody: string
  }
}

function StrokeBranch() {
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(svgRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView || !svgRef.current) return
    const paths = svgRef.current.querySelectorAll('.stroke-path')
    paths.forEach((path, i) => {
      const el = path as SVGPathElement
      const length = el.getTotalLength()
      el.style.strokeDasharray = `${length}`
      el.style.strokeDashoffset = `${length}`
      el.style.transition = `stroke-dashoffset ${1.2 + i * 0.3}s ease-out ${i * 0.2}s`
      // Trigger reflow then animate
      el.getBoundingClientRect()
      el.style.strokeDashoffset = '0'
    })
  }, [isInView])

  return (
    <svg
      ref={svgRef}
      width="320"
      height="320"
      viewBox="0 0 320 320"
      fill="none"
      className="opacity-90"
      aria-hidden="true"
    >
      {/* Main branch */}
      <path
        className="stroke-path"
        d="M60 280 C80 240 100 200 130 170 C155 145 175 140 200 120 C220 105 235 85 250 60"
        stroke="#FF6B9D"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Sub-branches */}
      <path
        className="stroke-path"
        d="M130 170 C115 155 110 135 120 115"
        stroke="#FF6B9D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <path
        className="stroke-path"
        d="M175 140 C165 120 168 100 180 85"
        stroke="#FF6B9D"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* Hawthorn blossoms — appear after stroke draws */}
      {[
        { cx: 120, cy: 108, r: 18 },
        { cx: 180, cy: 80, r: 16 },
        { cx: 205, cy: 115, r: 14 },
        { cx: 248, cy: 58, r: 15 },
        { cx: 155, cy: 155, r: 12 },
      ].map((flower, i) => (
        <g
          key={i}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'scale(1)' : 'scale(0)',
            transformOrigin: `${flower.cx}px ${flower.cy}px`,
            transition: `opacity 0.5s ease ${1.2 + i * 0.15}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${1.2 + i * 0.15}s`,
          }}
        >
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx={flower.cx}
              cy={flower.cy - flower.r * 0.6}
              rx={flower.r * 0.38}
              ry={flower.r * 0.65}
              fill="#FF6B9D"
              opacity="0.75"
              transform={`rotate(${angle} ${flower.cx} ${flower.cy})`}
            />
          ))}
          <circle cx={flower.cx} cy={flower.cy} r={flower.r * 0.22} fill="#FFD93D" />
        </g>
      ))}

      {/* Candle */}
      <g
        style={{
          opacity: isInView ? 1 : 0,
          transition: 'opacity 0.8s ease 2s',
        }}
      >
        <rect x="148" y="250" width="24" height="50" rx="3" fill="#FFF5E4" opacity="0.9" />
        <path d="M160 245 C157 238 154 232 160 228 C166 232 163 238 160 245Z" fill="#FFD93D" />
        <ellipse cx="160" cy="248" rx="12" ry="4" fill="#FFD93D" opacity="0.2" />
      </g>
    </svg>
  )
}

export default function BrandStorySection({ dict }: BrandStorySectionProps) {
  return (
    <section id="story" className="section-padding" style={{ background: '#FFF5E4' }}>
      <div className="section-container">
        {/* Top label */}
        <FadeInUp className="text-center mb-16">
          <SectionLabel>{dict.label}</SectionLabel>
        </FadeInUp>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Illustration with stroke animation */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FAFBFF 0%, #FFF5E4 50%, #FFE4EE 100%)',
                minHeight: 400,
              }}
            >
              <StrokeBranch />

              {/* Poem overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(0deg, rgba(255,245,228,0.95) 0%, transparent 100%)' }}
              >
                <p
                  className="text-lg leading-loose text-center"
                  style={{
                    fontFamily: 'var(--font-noto-serif-sc), serif',
                    color: '#2D3436',
                    letterSpacing: '0.1em',
                  }}
                >
                  {dict.quote}
                </p>
                <p className="text-xs text-center mt-2" style={{ color: '#FF6B9D' }}>
                  {dict.quoteAttr}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="space-y-5">
              <h2
                className="text-3xl lg:text-4xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
              >
                {dict.heading}
              </h2>

              <p className="text-base leading-loose" style={{ color: '#636E72' }}>
                {dict.body1}
              </p>
              <p className="text-base leading-loose" style={{ color: '#636E72' }}>
                {dict.body2}
              </p>
              <p className="text-base leading-loose" style={{ color: '#636E72' }}>
                {dict.body3}
              </p>

              {/* Inline poem quote */}
              <div
                className="rounded-2xl p-5 border"
                style={{
                  background: 'rgba(255,107,157,0.06)',
                  borderColor: 'rgba(255,107,157,0.15)',
                }}
              >
                <p
                  className="text-base leading-loose text-center"
                  style={{
                    fontFamily: 'var(--font-noto-serif-sc), serif',
                    color: '#FF6B9D',
                    letterSpacing: '0.08em',
                  }}
                >
                  {dict.quote}
                </p>
                <p className="text-xs text-center mt-1" style={{ color: '#A78BFA' }}>
                  {dict.quoteAttr}
                </p>
              </div>

              <p
                className="text-sm pt-2"
                style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: '1.1rem',
                  color: '#A78BFA',
                  fontStyle: 'italic',
                }}
              >
                {dict.closing}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Flora + Voice cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {[
            {
              title: dict.floraTitle,
              body: dict.floraBody,
              color: '#FF6B9D',
              bg: 'rgba(255,107,157,0.08)',
              borderColor: 'rgba(255,107,157,0.15)',
              iconPath: 'M12 2C7 2 3 7 3 12c0 3 1.5 5.5 4 7.5C9 21 12 22 12 22s3-1 5-2.5c2.5-2 4-4.5 4-7.5 0-5-4-10-9-10z',
            },
            {
              title: dict.voiceTitle,
              body: dict.voiceBody,
              color: '#2EC4B6',
              bg: 'rgba(46,196,182,0.08)',
              borderColor: 'rgba(46,196,182,0.15)',
              iconPath: 'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8',
            },
          ].map((card, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <motion.div
                className="rounded-2xl p-6 border cursor-default"
                style={{ background: card.bg, borderColor: card.borderColor }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 16px 40px ${card.borderColor}`,
                  transition: { duration: 0.3 },
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{ background: card.bg }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={card.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.iconPath} />
                  </svg>
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-loose" style={{ color: '#636E72' }}>
                  {card.body}
                </p>
              </motion.div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
