'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Button from '@/components/ui/Button'
import LiveDemo from '@/components/sections/LiveDemo'
import { fadeInUp } from '@/components/animations/variants'

interface HeroSectionProps {
  dict: {
    // Legacy fields (still present in zh.json)
    poemLine1: string
    poemLine2: string
    poemAuthor: string
    tagline: string
    subTagline: string
    cta: string
    ctaSecondary: string
    // New product-first fields
    eyebrow?: string
    titleLine1?: string
    titleLine2?: string
    titleHighlight?: string
    description?: string
    ctaPrimary?: string
    trustLine?: string
    liveDemo?: {
      header: string
      subheader: string
      turns: { role: 'child' | 'flov'; text: string; time: string }[]
      summaryTitle: string
      summaryTime: string
      summaryBody: string
      summaryTag1: string
      summaryTag2: string
      floatingNote: string
    }
  }
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const controls = useAnimation()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => controls.start('visible'), 300)
    return () => clearTimeout(timer)
  }, [controls])

  // Lantern cursor — mouse-following glow on the hero surface
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      el.style.setProperty('--lantern-x', `${x}px`)
      el.style.setProperty('--lantern-y', `${y}px`)
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [])

  // Fallback for legacy copy
  const eyebrow = dict.eyebrow ?? '面向 6–14 岁家庭 · AI 成长陪伴'
  const titleLine1 = dict.titleLine1 ?? '孩子不说的事，'
  const titleHighlight = dict.titleHighlight ?? '让小伴替你听见'
  const titleLine2 = dict.titleLine2 ?? ''
  const description =
    dict.description ??
    '小伴是一款陪伴式 AI，在孩子身边听、陪、答；把关键的情绪与成长信号，轻声告诉家长。'
  const ctaPrimary = dict.ctaPrimary ?? dict.cta ?? '免费体验小伴'
  const ctaSecondary = dict.ctaSecondary ?? '观看 90 秒介绍'
  const trustLine = dict.trustLine ?? 'iOS / Android · 支持亲情号 · 端到端加密'

  const liveDemo = dict.liveDemo ?? {
    header: '与小伴的对话',
    subheader: 'online · 22:08',
    turns: [
      { role: 'child' as const, text: '今天我其实不太想睡……', time: '22:04' },
      { role: 'flov' as const, text: '怎么啦？是心里有事吗？', time: '22:04' },
      { role: 'child' as const, text: '数学测验没考好，我不敢告诉妈妈。', time: '22:05' },
      { role: 'flov' as const, text: '嗯，我陪着你。愿意和我说说是哪道题卡住了吗？', time: '22:05' },
      { role: 'child' as const, text: '应用题全错了，我脑子一片空白。', time: '22:06' },
      {
        role: 'flov' as const,
        text: '一次没考好不代表你不行。明天我陪你把这几道题拆开看，好吗？',
        time: '22:06',
      },
    ],
    summaryTitle: '昨晚孩子提到数学测验失利',
    summaryTime: '次日 07:00',
    summaryBody: '孩子情绪低落但愿意表达。建议今早先陪伴，不急着问成绩——她说"不敢告诉妈妈"。',
    summaryTag1: '情绪 · 低落',
    summaryTag2: '主动表达',
    floatingNote: '这条摘要不会让孩子看到。',
  }

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-screen overflow-hidden bg-hero-night lantern-surface night-grain"
    >
      {/* Moon / orb glow top-right */}
      <motion.div
        aria-hidden
        className="absolute top-[12%] right-[8%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(201,214,232,0.25) 0%, rgba(201,214,232,0.08) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Distant dim flowers (blooming in the dark) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {[
          { x: '6%', y: '68%', s: 8, d: 0 },
          { x: '12%', y: '82%', s: 6, d: 1.2 },
          { x: '22%', y: '75%', s: 10, d: 0.5 },
          { x: '88%', y: '78%', s: 7, d: 1.8 },
          { x: '78%', y: '88%', s: 9, d: 0.8 },
          { x: '92%', y: '62%', s: 5, d: 2.2 },
          { x: '4%', y: '55%', s: 5, d: 1.5 },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: f.x,
              top: f.y,
              width: f.s,
              height: f.s,
              background: 'radial-gradient(circle, #F3C77A 0%, rgba(243,199,122,0.3) 60%, transparent 100%)',
              boxShadow: '0 0 12px rgba(243,199,122,0.5)',
            }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 4 + i * 0.4, delay: f.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Vertical poem — right edge, low opacity, acts as a signature */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.55, x: 0 }}
        transition={{ duration: 1.4, delay: 1.2 }}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
      >
        <div className="flex gap-1 items-start">
          <div
            className="vertical-zh text-sm tracking-[0.4em] text-candle-glow/70 leading-loose"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
          >
            {dict.poemLine1}{dict.poemLine2}
          </div>
          <div className="vertical-zh text-[10px] tracking-widest text-moon-silver/40 mt-8">
            {dict.poemAuthor}
          </div>
          <div className="seal w-6 h-6 text-[10px] mt-4 rotate-3">苏</div>
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 pt-28 md:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          {/* ── LEFT: INFO ─────────────────────────────────── */}
          <div className="relative">
            {/* Eyebrow */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-candle-glow/25 bg-candle-glow/5"
            >
              <span className="relative w-1.5 h-1.5 rounded-full bg-candle-glow">
                <span className="absolute inset-0 rounded-full bg-candle-glow animate-ping opacity-70" />
              </span>
              <span className="text-xs tracking-[0.15em] text-candle-glow/90">
                {eyebrow}
              </span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-[56px] leading-[1.15] font-bold mb-6"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
              }}
            >
              <span className="block text-moon-silver">{titleLine1}</span>
              <span className="block mt-1">
                <span className="text-gradient-candle">{titleHighlight}</span>
                {titleLine2 && (
                  <span className="text-moon-silver">{titleLine2}</span>
                )}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.3 }}
              className="text-base md:text-lg leading-relaxed text-moon-silver/80 max-w-xl mb-8"
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href="#contact">
                <Button variant="primary" size="lg">
                  <span>{ctaPrimary}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Button>
              </a>
              <a href="#how-it-works">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-moon-silver/25 text-moon-silver/90 hover:text-candle-glow hover:border-candle-glow/50 transition-all duration-300 font-medium">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 12 L11 15 L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                  {ctaSecondary}
                </button>
              </a>
            </motion.div>

            {/* Trust line */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={controls}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-xs text-moon-dim"
            >
              <div className="flex -space-x-2">
                {['#FF6B9D', '#F3C77A', '#2EC4B6', '#A78BFA'].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-night-ink"
                    style={{
                      background: `linear-gradient(135deg, ${c}, ${c}aa)`,
                    }}
                  />
                ))}
              </div>
              <span className="tracking-wide">{trustLine}</span>
            </motion.div>

            {/* Night-side marker (low, decorative) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="hidden md:flex items-center gap-3 mt-16"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="animate-candle-flicker">
                <path
                  d="M12 3 C11 5, 9 6, 9 9 C9 11.5, 10.5 13, 12 13 C13.5 13, 15 11.5, 15 9 C15 6, 13 5, 12 3 Z"
                  fill="#F3C77A"
                />
                <rect x="10.5" y="13" width="3" height="7" rx="0.5" fill="#F5E9CC" opacity="0.8" />
              </svg>
              <span className="text-[11px] tracking-[0.25em] text-candle-glow/60 uppercase en-display">
                Night · when parents listen
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: LIVE DEMO ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative flex items-center justify-center min-h-[600px]"
          >
            <LiveDemo dict={liveDemo} />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient — transition into the next (warmer) section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(14,22,38,0.5) 40%, #1C2A3A 100%)',
        }}
      />
    </section>
  )
}
