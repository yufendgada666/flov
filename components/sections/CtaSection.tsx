'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import Button from '@/components/ui/Button'
import FireflyField from '@/components/garden/FireflyField'

interface CtaSectionProps {
  dict: {
    heading: string
    subheading: string
    promise1Title: string
    promise1Body: string
    promise2Title: string
    promise2Body: string
    promise3Title: string
    promise3Body: string
    quote: string
    cta: string
  }
}

const PROMISE_ICONS = [
  // 1 · Child's private space — a bud / closed flower (safe cocoon)
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 3 C8 5, 6 9, 6 13 C6 17, 9 20, 12 20 C15 20, 18 17, 18 13 C18 9, 16 5, 12 3 Z"
      fill="rgba(243,199,122,0.22)"
      stroke="#F3C77A"
      strokeWidth="1.4"
    />
    <path
      d="M12 8 C10.5 10, 10 12, 10.5 14 M12 8 C13.5 10, 14 12, 13.5 14"
      stroke="#F3C77A"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.7"
    />
    <circle cx="12" cy="14" r="1.2" fill="#F3C77A" />
  </svg>,
  // 2 · Parent digest — envelope
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="6" width="18" height="14" rx="2" fill="rgba(243,199,122,0.18)" stroke="#F3C77A" strokeWidth="1.4" />
    <path d="M3 8 L12 14 L21 8" stroke="#F3C77A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="18" cy="5" r="2" fill="#FF9D4D" opacity="0.85" />
  </svg>,
  // 3 · End-to-end encrypted — shield w/ check
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2 L20 5 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V5 L12 2 Z"
      fill="rgba(243,199,122,0.18)"
      stroke="#F3C77A"
      strokeWidth="1.5"
    />
    <path d="M9 12 L11 14 L15 10" stroke="#F3C77A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>,
]

export default function CtaSection({ dict }: CtaSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const promises = [
    { title: dict.promise1Title, body: dict.promise1Body },
    { title: dict.promise2Title, body: dict.promise2Body },
    { title: dict.promise3Title, body: dict.promise3Body },
  ]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(243,199,122,0.12) 0%, transparent 60%), linear-gradient(180deg, #0F1B3D 0%, #1A1040 50%, #0F1B3D 100%)',
        padding: '6rem 0 5rem',
      }}
    >
      <FireflyField />

      {/* Deterministic star field */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[
          { x: 5, y: 8, s: 2, o: 0.35 }, { x: 12, y: 15, s: 1.5, o: 0.25 }, { x: 22, y: 5, s: 2.5, o: 0.4 },
          { x: 35, y: 20, s: 1, o: 0.3 }, { x: 45, y: 10, s: 2, o: 0.45 }, { x: 55, y: 25, s: 1.5, o: 0.2 },
          { x: 65, y: 8, s: 2, o: 0.35 }, { x: 75, y: 18, s: 1, o: 0.5 }, { x: 85, y: 12, s: 2.5, o: 0.3 },
          { x: 92, y: 22, s: 1.5, o: 0.25 }, { x: 8, y: 40, s: 1, o: 0.3 }, { x: 18, y: 55, s: 2, o: 0.4 },
          { x: 28, y: 45, s: 1.5, o: 0.2 }, { x: 40, y: 60, s: 2, o: 0.35 }, { x: 50, y: 42, s: 1, o: 0.45 },
          { x: 62, y: 50, s: 2.5, o: 0.3 }, { x: 72, y: 65, s: 1.5, o: 0.25 }, { x: 82, y: 48, s: 2, o: 0.4 },
          { x: 90, y: 58, s: 1, o: 0.35 }, { x: 15, y: 75, s: 2, o: 0.2 }, { x: 30, y: 80, s: 1.5, o: 0.3 },
          { x: 48, y: 78, s: 2.5, o: 0.25 }, { x: 60, y: 85, s: 1, o: 0.4 }, { x: 78, y: 72, s: 2, o: 0.35 },
          { x: 88, y: 82, s: 1.5, o: 0.3 }, { x: 95, y: 35, s: 1, o: 0.45 }, { x: 3, y: 30, s: 2, o: 0.2 },
          { x: 38, y: 35, s: 1.5, o: 0.35 }, { x: 52, y: 70, s: 2, o: 0.25 }, { x: 70, y: 38, s: 1, o: 0.4 },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: star.s,
              height: star.s,
              top: `${star.y}%`,
              left: `${star.x}%`,
              background: 'white',
              opacity: star.o,
            }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        {/* Candle icon + heading */}
        <FadeInUp className="text-center mb-5">
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 mb-6 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(243,199,122,0.3) 0%, transparent 70%)',
            }}
            animate={{ opacity: [0.7, 1, 0.85, 1], scale: [1, 1.04, 0.98, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
              <path
                d="M14 2 C13 5, 10 7, 10 12 C10 15, 12 17, 14 17 C16 17, 18 15, 18 12 C18 9, 16 6, 14 2 Z"
                fill="#F3C77A"
              />
              <path
                d="M14 2 C13.5 4, 12 6, 12 10 C12 12, 13 13, 14 13 C15 13, 16 12, 16 10 C16 8, 15 5, 14 2 Z"
                fill="#FF9D4D"
              />
              <rect x="11.5" y="17" width="5" height="14" rx="0.5" fill="#F5E9CC" />
              <rect x="9" y="30" width="10" height="3" rx="1" fill="#D88442" />
            </svg>
          </motion.div>
        </FadeInUp>

        <FadeInUp delay={0.08} className="text-center mb-4">
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{
              fontFamily: 'var(--font-noto-serif-sc), serif',
              color: '#FAFBFF',
            }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.14} className="text-center mb-12">
          <p
            className="text-base max-w-xl mx-auto leading-loose"
            style={{
              color: 'rgba(250,251,255,0.65)',
              fontFamily: 'var(--font-noto-serif-sc), serif',
            }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        {/* Three real promises — replaces the fake counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{
                background: 'rgba(243,199,122,0.06)',
                border: '1px solid rgba(243,199,122,0.18)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Candle-glow corner */}
              <div
                aria-hidden
                className="absolute -top-6 -right-6 w-16 h-16 rounded-full pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(243,199,122,0.25) 0%, transparent 60%)',
                }}
              />

              <div className="relative flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{PROMISE_ICONS[i]}</div>
                <div className="min-w-0">
                  <div
                    className="text-base font-semibold mb-1 text-paper-warm"
                    style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
                  >
                    {p.title}
                  </div>
                  <div className="text-[13px] leading-relaxed text-moon-silver/70">
                    {p.body}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Poem quote */}
        <FadeInUp delay={0.55} className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-8 bg-candle-glow/30" />
            <p
              className="text-sm italic leading-relaxed"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
                color: 'rgba(243,199,122,0.6)',
              }}
            >
              {dict.quote}
            </p>
            <span className="h-px w-8 bg-candle-glow/30" />
          </div>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.65} className="text-center">
          <Button variant="gold" size="lg">
            <a href="#contact">{dict.cta}</a>
          </Button>
        </FadeInUp>

        {/* Mascot — kept as a signature, muted to fit night palette */}
        <motion.div
          className="absolute -bottom-2 right-8 md:right-16 hidden md:block pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 0.55, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ filter: 'saturate(0.7) brightness(0.85)' }}
        >
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" aria-hidden="true">
            <path d="M30 50 C30 55 30 65 30 75" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" />
            {[0, 72, 144, 216, 288].map((angle) => {
              const rad = ((angle - 90) * Math.PI) / 180
              const cx = 30 + Math.cos(rad) * 12
              const cy = 30 + Math.sin(rad) * 12
              return (
                <ellipse
                  key={angle}
                  cx={cx}
                  cy={cy}
                  rx={6}
                  ry={10}
                  fill="#FF6B9D"
                  opacity={angle % 144 === 0 ? 0.9 : 0.7}
                  transform={`rotate(${angle} ${cx} ${cy})`}
                />
              )
            })}
            <circle cx="30" cy="30" r="8" fill="#FFD93D" />
            <circle cx="27" cy="29" r="1.5" fill="#2D3436" />
            <circle cx="33" cy="29" r="1.5" fill="#2D3436" />
            <path d="M28 33 Q30 35 32 33" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" fill="none" />
            <motion.path
              d="M42 30 C46 26 50 24 52 20"
              stroke="#2EC4B6"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              style={{ transformOrigin: '42px 30px' }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
