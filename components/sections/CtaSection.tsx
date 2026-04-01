'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import Button from '@/components/ui/Button'
import FireflyField from '@/components/garden/FireflyField'

interface CtaSectionProps {
  dict: {
    heading: string
    subheading: string
    counterLabel: string
    counterUnit: string
    quote: string
    cta: string
  }
}

function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target])

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
    </span>
  )
}

export default function CtaSection({ dict }: CtaSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0F1B3D 0%, #1A1040 40%, #0F1B3D 100%)',
        padding: '5rem 0',
      }}
    >
      <FireflyField />

      {/* Stars background — deterministic positions to avoid hydration mismatch */}
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
        {/* Counter */}
        <FadeInUp className="text-center mb-12">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6"
            style={{
              background: 'rgba(255,217,61,0.1)',
              border: '1px solid rgba(255,217,61,0.2)',
            }}
          >
            <span className="text-xl">🕯️</span>
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {dict.counterLabel}
            </span>
            <span
              className="text-2xl font-bold"
              style={{
                color: '#FFD93D',
                fontFamily: 'var(--font-jetbrains-mono), monospace',
              }}
            >
              <AnimatedCounter target={12847} inView={isInView} />
            </span>
            <span className="text-sm" style={{ color: '#FFD93D' }}>
              {dict.counterUnit}
            </span>
          </div>
        </FadeInUp>

        {/* Heading */}
        <FadeInUp delay={0.1} className="text-center mb-6">
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

        <FadeInUp delay={0.15} className="text-center mb-8">
          <p
            className="text-base max-w-lg mx-auto leading-loose"
            style={{ color: 'rgba(250,251,255,0.5)' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        {/* Quote */}
        <FadeInUp delay={0.2} className="text-center mb-10">
          <p
            className="text-sm max-w-md mx-auto italic leading-relaxed"
            style={{
              fontFamily: 'var(--font-noto-serif-sc), serif',
              color: 'rgba(255,217,61,0.6)',
            }}
          >
            &ldquo;{dict.quote}&rdquo;
          </p>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={0.25} className="text-center">
          <Button variant="gold" size="lg">
            <a href="#contact">{dict.cta}</a>
          </Button>
        </FadeInUp>

        {/* Mascot waving */}
        <motion.div
          className="absolute -bottom-2 right-8 md:right-16 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" aria-hidden="true">
            {/* Stem */}
            <path d="M30 50 C30 55 30 65 30 75" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" />
            {/* Petals */}
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
            {/* Eyes */}
            <circle cx="27" cy="29" r="1.5" fill="#2D3436" />
            <circle cx="33" cy="29" r="1.5" fill="#2D3436" />
            {/* Smile */}
            <path d="M28 33 Q30 35 32 33" stroke="#2D3436" strokeWidth="1" strokeLinecap="round" fill="none" />
            {/* Waving hand/leaf */}
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
