'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'

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
    // Full Haitang poem
    poemFull1: string
    poemFull2: string
    poemFull3: string
    poemFull4: string
    poemTitle: string
    poemAuthor: string
    poemNote: string
    // FLOV breakdown
    flovTitle: string
    flovSub: string
    flovF: string
    flovFMeaning: string
    flovFBody: string
    flovL: string
    flovLMeaning: string
    flovLBody: string
    flovO: string
    flovOMeaning: string
    flovOBody: string
    flovV: string
    flovVMeaning: string
    flovVBody: string
    flovClosing: string
    // Legacy (not rendered in album layout)
    floraTitle?: string
    floraBody?: string
    voiceTitle?: string
    voiceBody?: string
  }
}

export default function BrandStorySection({ dict }: BrandStorySectionProps) {
  const rootRef = useRef<HTMLElement>(null)
  const inView = useInView(rootRef, { once: true, amount: 0.15 })

  const poemLines = [
    dict.poemFull1,
    dict.poemFull2,
    dict.poemFull3,
    dict.poemFull4,
  ]

  const flovLetters = [
    { letter: 'F', name: dict.flovF, meaning: dict.flovFMeaning, body: dict.flovFBody, icon: 'flower' as const },
    { letter: 'L', name: dict.flovL, meaning: dict.flovLMeaning, body: dict.flovLBody, icon: 'candle' as const },
    { letter: 'O', name: dict.flovO, meaning: dict.flovOMeaning, body: dict.flovOBody, icon: 'ear' as const },
    { letter: 'V', name: dict.flovV, meaning: dict.flovVMeaning, body: dict.flovVBody, icon: 'wave' as const },
  ]

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative overflow-hidden section-padding night-grain"
      style={{
        background:
          'radial-gradient(ellipse 1100px 700px at 50% 20%, rgba(243,199,122,0.08) 0%, transparent 60%), linear-gradient(180deg, #0F1B3D 0%, #0E1626 45%, #070B18 100%)',
      }}
    >
      {/* Decorative firefly specks */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {[
          { x: '8%', y: '15%', s: 3, d: 0.2 },
          { x: '18%', y: '42%', s: 2, d: 1.3 },
          { x: '82%', y: '22%', s: 4, d: 0.7 },
          { x: '92%', y: '55%', s: 2, d: 2.1 },
          { x: '6%', y: '78%', s: 3, d: 1.5 },
          { x: '88%', y: '82%', s: 2, d: 0.9 },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: f.x,
              top: f.y,
              width: f.s,
              height: f.s,
              background: 'radial-gradient(circle, #F3C77A 0%, transparent 70%)',
              boxShadow: '0 0 8px rgba(243,199,122,0.5)',
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + i * 0.5, delay: f.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="section-container relative z-10">
        {/* Top label */}
        <FadeInUp className="text-center mb-10">
          <div
            className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase en-display"
            style={{ color: 'rgba(243,199,122,0.75)' }}
          >
            <span className="h-px w-10 bg-candle-glow/40" />
            {dict.label}
            <span className="h-px w-10 bg-candle-glow/40" />
          </div>
          <h2
            className="text-3xl lg:text-[40px] font-bold mt-5 candle-glow-text"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        {/* Album spread — two pages like an open Song dynasty book */}
        <div className="relative max-w-6xl mx-auto">
          {/* Binding line at the middle */}
          <div
            aria-hidden
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 pointer-events-none z-20"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(243,199,122,0.25) 15%, rgba(243,199,122,0.35) 50%, rgba(243,199,122,0.25) 85%, transparent 100%)',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
            {/* ── LEFT PAGE · Poem in vertical Chinese layout ─────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -1 }}
              animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:mr-6"
            >
              <div
                className="relative rounded-2xl p-8 md:p-12 min-h-[520px] flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    'linear-gradient(145deg, #F5EDD8 0%, #EADBB5 100%)',
                  backgroundImage: `
                    radial-gradient(circle at 15% 25%, rgba(139,95,45,0.06) 0px, transparent 2px),
                    radial-gradient(circle at 70% 75%, rgba(139,95,45,0.05) 0px, transparent 2px),
                    radial-gradient(circle at 40% 60%, rgba(139,95,45,0.04) 0px, transparent 2px),
                    linear-gradient(145deg, #F5EDD8 0%, #EADBB5 100%)
                  `,
                  backgroundSize: '120px 120px, 90px 90px, 160px 160px, 100% 100%',
                  boxShadow:
                    '0 30px 60px -20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 0 80px rgba(139,95,45,0.06)',
                }}
              >
                {/* Page edge decoration — top & bottom border */}
                <div
                  aria-hidden
                  className="absolute top-4 left-4 right-4 flex justify-between items-center"
                >
                  <div className="w-12 h-px bg-cinnabar/30" />
                  <div className="text-[10px] tracking-[0.3em] text-cinnabar/60 en-display">
                    {dict.poemNote}
                  </div>
                  <div className="w-12 h-px bg-cinnabar/30" />
                </div>
                <div
                  aria-hidden
                  className="absolute bottom-4 left-4 right-4 flex justify-between items-center"
                >
                  <div className="w-12 h-px bg-cinnabar/30" />
                  <div className="w-12 h-px bg-cinnabar/30" />
                </div>

                {/* Poem title — small, top-right vertical */}
                <div
                  className="hidden md:block absolute top-10 right-8 vertical-zh text-xs text-cinnabar/80 tracking-[0.4em]"
                  style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
                  aria-hidden
                >
                  {dict.poemTitle}
                </div>

                {/* Poem — vertical RL lines */}
                <div className="flex flex-row-reverse gap-5 md:gap-8 items-start pt-8 pb-6">
                  {poemLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 1.2,
                        delay: 0.5 + i * 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="vertical-zh text-xl md:text-2xl leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-noto-serif-sc), serif',
                        color: '#3A2A1A',
                        letterSpacing: '0.3em',
                      }}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                {/* Author signature + seal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.8, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute bottom-10 left-10 flex items-center gap-2"
                >
                  <div
                    className="vertical-zh text-xs tracking-widest"
                    style={{ color: '#6B4A2A', fontFamily: 'var(--font-noto-serif-sc), serif' }}
                  >
                    {dict.poemAuthor}
                  </div>
                  <div className="seal w-9 h-9 text-sm rotate-6">苏</div>
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT PAGE · Story prose + closing ────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotate: 1 }}
              animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:ml-6"
            >
              <div className="py-8 md:py-12 md:pl-8 space-y-5 relative">
                {/* Chapter marker */}
                <div
                  className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase en-display mb-2"
                  style={{ color: 'rgba(243,199,122,0.7)' }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="2" fill="#F3C77A" />
                    <circle cx="6" cy="6" r="5" stroke="#F3C77A" strokeOpacity="0.35" />
                  </svg>
                  Chapter · 起
                </div>

                <p
                  className="text-base leading-loose"
                  style={{
                    color: 'rgba(232,221,193,0.82)',
                    fontFamily: 'var(--font-noto-serif-sc), serif',
                  }}
                >
                  {dict.body1}
                </p>

                <div className="ink-divider my-6" aria-hidden />

                <p
                  className="text-base leading-loose"
                  style={{
                    color: 'rgba(232,221,193,0.82)',
                    fontFamily: 'var(--font-noto-serif-sc), serif',
                  }}
                >
                  {dict.body2}
                </p>

                <div className="ink-divider my-6" aria-hidden />

                <p
                  className="text-base leading-loose"
                  style={{
                    color: 'rgba(232,221,193,0.82)',
                    fontFamily: 'var(--font-noto-serif-sc), serif',
                  }}
                >
                  {dict.body3}
                </p>

                {/* Poetic closing pull-quote */}
                <blockquote
                  className="mt-8 pl-5 border-l-2 italic"
                  style={{
                    borderColor: 'rgba(243,199,122,0.45)',
                  }}
                >
                  <p
                    className="text-lg leading-loose candle-glow-text"
                    style={{
                      fontFamily: 'var(--font-noto-serif-sc), serif',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {dict.quote}
                  </p>
                  <cite
                    className="mt-2 block text-xs not-italic"
                    style={{ color: 'rgba(243,199,122,0.6)' }}
                  >
                    {dict.quoteAttr}
                  </cite>
                </blockquote>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FLOV letter breakdown — four panels */}
        <div className="max-w-6xl mx-auto mt-20">
          <FadeInUp className="text-center mb-10">
            <div className="text-[11px] tracking-[0.35em] uppercase en-display mb-2" style={{ color: 'rgba(243,199,122,0.65)' }}>
              {dict.flovSub}
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold candle-glow-text"
              style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
            >
              {dict.flovTitle}
            </h3>
          </FadeInUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {flovLetters.map((item, i) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl p-5 md:p-6 overflow-hidden"
                style={{
                  background:
                    'linear-gradient(160deg, rgba(243,199,122,0.06) 0%, rgba(243,199,122,0.02) 100%)',
                  border: '1px solid rgba(243,199,122,0.18)',
                }}
              >
                {/* Large display letter */}
                <div
                  className="absolute -top-2 -right-2 text-[90px] md:text-[110px] leading-none font-bold opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    color: '#F3C77A',
                    fontFamily: 'var(--font-cormorant), serif',
                  }}
                  aria-hidden
                >
                  {item.letter}
                </div>

                {/* Icon */}
                <div className="relative mb-3">
                  <FlovIcon variant={item.icon} />
                </div>

                {/* Letter + name */}
                <div className="relative flex items-baseline gap-2 mb-1">
                  <span
                    className="text-base tracking-wider font-semibold"
                    style={{ color: '#F3C77A', fontFamily: 'var(--font-cormorant), serif' }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'rgba(243,199,122,0.55)' }}
                  >
                    · {item.meaning}
                  </span>
                </div>

                <p
                  className="relative text-xs md:text-[13px] leading-relaxed"
                  style={{ color: 'rgba(232,221,193,0.7)' }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Closing line */}
          <FadeInUp className="text-center mt-10" delay={0.2}>
            <p
              className="text-sm italic"
              style={{
                fontFamily: 'var(--font-cormorant), serif',
                color: 'rgba(243,199,122,0.7)',
                fontSize: '1rem',
              }}
            >
              {dict.flovClosing}
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: 'rgba(201,214,232,0.45)' }}
            >
              {dict.closing}
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}

function FlovIcon({ variant }: { variant: 'flower' | 'candle' | 'ear' | 'wave' }) {
  const color = '#F3C77A'
  if (variant === 'flower') {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        {[0, 72, 144, 216, 288].map((angle) => {
          const rad = ((angle - 90) * Math.PI) / 180
          const cx = 16 + Math.cos(rad) * 8
          const cy = 16 + Math.sin(rad) * 8
          return (
            <ellipse
              key={angle}
              cx={cx}
              cy={cy}
              rx={4}
              ry={7}
              fill={color}
              opacity="0.8"
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx="16" cy="16" r="3.5" fill="#FF9D4D" />
      </svg>
    )
  }
  if (variant === 'candle') {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4 C15 6, 13 8, 13 12 C13 14, 14.5 15, 16 15 C17.5 15, 19 14, 19 12 C19 10, 17.5 7, 16 4 Z"
          fill={color}
        />
        <rect x="13.5" y="15" width="5" height="11" rx="0.5" fill="#F5E9CC" />
        <rect x="11" y="25" width="10" height="3" rx="1" fill="#D88442" />
      </svg>
    )
  }
  if (variant === 'ear') {
    return (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 5 C10 5, 7 10, 7 16 C7 22, 11 27, 16 27 C14 24, 14 22, 16 20 C19 17, 21 14, 19 11 C18 9, 16 8, 14 9"
          stroke={color}
          strokeWidth="1.8"
          fill="rgba(243,199,122,0.1)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="15" r="2" fill={color} />
      </svg>
    )
  }
  // wave
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <path
        d="M3 16 C6 10, 10 10, 13 16 C16 22, 20 22, 23 16 C26 10, 29 10, 29 16"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M3 22 C6 18, 10 18, 13 22"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <circle cx="23" cy="16" r="1.5" fill={color} />
    </svg>
  )
}
