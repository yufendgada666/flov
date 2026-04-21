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
    scene1Time: string
    scene1Phase: string
    scene1Title: string
    scene1Body: string
    scene2Time: string
    scene2Phase: string
    scene2Title: string
    scene2Body: string
    scene3Time: string
    scene3Phase: string
    scene3Title: string
    scene3Body: string
    scene4Time: string
    scene4Phase: string
    scene4Title: string
    scene4Body: string
    scene5Time: string
    scene5Phase: string
    scene5Title: string
    scene5Body: string
    scene6Time: string
    scene6Phase: string
    scene6Title: string
    scene6Body: string
  }
}

// Each scene has a pair of tone colors — morning soft warm → midday bright → evening cool → night deep → dawn amber
const SCENE_STYLES = [
  // 1 · 07:00 Morning — pale warm
  { accent: '#FFB454', halo: 'radial-gradient(circle, rgba(255,180,84,0.22) 0%, transparent 70%)', bg: '#FFF7EC' },
  // 2 · 12:30 Midday — teal
  { accent: '#2EC4B6', halo: 'radial-gradient(circle, rgba(46,196,182,0.18) 0%, transparent 70%)', bg: '#EBFAF7' },
  // 3 · 16:00 After school — rose
  { accent: '#FF6B9D', halo: 'radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)', bg: '#FFF0F5' },
  // 4 · 19:30 Evening — lavender
  { accent: '#A78BFA', halo: 'radial-gradient(circle, rgba(167,139,250,0.20) 0%, transparent 70%)', bg: '#F4EFFF' },
  // 5 · 22:00 Night — deep ink
  { accent: '#6B7FB0', halo: 'radial-gradient(circle, rgba(107,127,176,0.22) 0%, transparent 70%)', bg: '#ECEFF8' },
  // 6 · 07:00 Dawn — candle glow
  { accent: '#E5A74E', halo: 'radial-gradient(circle, rgba(229,167,78,0.22) 0%, transparent 70%)', bg: '#FFF8E6' },
]

function SceneIcon({ index }: { index: number }) {
  const color = SCENE_STYLES[index].accent
  const icons = [
    // 1 · Morning — rising sun
    <svg key="1" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="20" r="6" fill={color} opacity="0.85" />
      <path d="M16 10 L16 6 M10 12 L7 9 M22 12 L25 9 M6 20 L2 20 M26 20 L30 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 26 L28 26" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.4" />
    </svg>,
    // 2 · Midday — speech bubbles (between classes)
    <svg key="2" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M4 10 C4 7 6 5 9 5 L18 5 C21 5 23 7 23 10 L23 14 C23 17 21 19 18 19 L10 19 L6 23 L6 19 C4.5 18 4 16 4 14 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.4" />
      <path d="M13 24 C13 22 14 21 16 21 L24 21 C26 21 28 22 28 24 L28 26 C28 28 26 29 24 29 L22 29 L19 31 L19 29 C17 29 13 28 13 26 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.4" />
      <circle cx="9" cy="12" r="1" fill={color} />
      <circle cx="13" cy="12" r="1" fill={color} />
      <circle cx="17" cy="12" r="1" fill={color} />
    </svg>,
    // 3 · After school — book + breath
    <svg key="3" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M6 6 L26 6 L26 26 L6 26 Z" fill={color} opacity="0.12" stroke={color} strokeWidth="1.4" />
      <path d="M16 6 L16 26" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <path d="M10 11 L12 11 M10 14 L13 14 M19 11 L22 11 M19 14 L22 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <circle cx="16" cy="21" r="2.5" fill={color} opacity="0.6" />
    </svg>,
    // 4 · Evening — lamp + family
    <svg key="4" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M10 4 L22 4 L20 12 L12 12 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.4" />
      <path d="M16 12 L16 22" stroke={color} strokeWidth="1.4" />
      <path d="M8 28 C8 25 11 23 16 23 C21 23 24 25 24 28" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="26" r="1.5" fill={color} />
    </svg>,
    // 5 · Bedtime — moon + stars
    <svg key="5" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M22 8 C18 8 14 12 14 17 C14 22 18 26 23 26 C20 26 16 22 16 17 C16 12 19 9 22 8 Z" fill={color} opacity="0.85" />
      <circle cx="8" cy="10" r="1" fill={color} opacity="0.7" />
      <circle cx="12" cy="6" r="0.8" fill={color} opacity="0.6" />
      <circle cx="6" cy="18" r="0.8" fill={color} opacity="0.5" />
    </svg>,
    // 6 · Dawn digest — envelope + candle
    <svg key="6" width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="10" width="24" height="16" rx="2" fill={color} opacity="0.12" stroke={color} strokeWidth="1.4" />
      <path d="M4 12 L16 20 L28 12" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M16 2 C15 4 13 5 13 8 C13 10 14.5 11 16 11 C17.5 11 19 10 19 8 C19 6 17.5 4 16 2 Z" fill={color} opacity="0.9" />
    </svg>,
  ]
  return icons[index]
}

export default function JourneySection({ dict }: JourneySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const scenes = [
    { time: dict.scene1Time, phase: dict.scene1Phase, title: dict.scene1Title, body: dict.scene1Body },
    { time: dict.scene2Time, phase: dict.scene2Phase, title: dict.scene2Title, body: dict.scene2Body },
    { time: dict.scene3Time, phase: dict.scene3Phase, title: dict.scene3Title, body: dict.scene3Body },
    { time: dict.scene4Time, phase: dict.scene4Phase, title: dict.scene4Title, body: dict.scene4Body },
    { time: dict.scene5Time, phase: dict.scene5Phase, title: dict.scene5Title, body: dict.scene5Body },
    { time: dict.scene6Time, phase: dict.scene6Phase, title: dict.scene6Title, body: dict.scene6Body },
  ]

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: '#FFF5E4' }}
    >
      {/* Soft day-to-night horizontal gradient strip at the bottom */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #FFB454 0%, #2EC4B6 25%, #FF6B9D 45%, #A78BFA 65%, #2A3950 82%, #E5A74E 100%)',
          opacity: 0.5,
        }}
      />

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

        <FadeInUp delay={0.1} className="text-center mb-16 max-w-2xl mx-auto">
          <p
            className="text-base lg:text-lg leading-loose"
            style={{ color: '#636E72' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        {/* Vertical timeline — mobile & desktop */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central vertical line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,180,84,0.4) 0%, rgba(46,196,182,0.4) 22%, rgba(255,107,157,0.4) 42%, rgba(167,139,250,0.4) 62%, rgba(107,127,176,0.5) 82%, rgba(229,167,78,0.4) 100%)',
            }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <div className="space-y-10 md:space-y-16">
            {scenes.map((scene, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              const style = SCENE_STYLES[i]
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-16 md:pl-0 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:items-center"
                >
                  {/* Scene card — placed in left or right grid column on desktop */}
                  <div
                    className={
                      side === 'left'
                        ? 'md:col-start-1 md:text-right md:pr-2'
                        : 'md:col-start-3 md:pl-2'
                    }
                  >
                    <SceneCard scene={scene} style={style} side={side} index={i} />
                  </div>

                  {/* Center dot — absolute on mobile (aligned with vertical line), grid center col on desktop */}
                  <div className="absolute left-[28px] top-3 md:top-auto md:left-auto md:static md:col-start-2 flex items-center justify-center -translate-x-1/2 md:translate-x-0">
                    <motion.div
                      className="relative w-4 h-4 rounded-full z-10"
                      style={{
                        background: style.accent,
                        boxShadow: `0 0 0 4px #FFF5E4, 0 0 24px ${style.accent}66`,
                      }}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.15 }}
                    />
                    <div
                      aria-hidden
                      className="absolute w-10 h-10 rounded-full pointer-events-none"
                      style={{ background: style.halo }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Closing note under the line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 text-xs tracking-[0.2em] text-charcoal-light uppercase en-display">
              <span className="h-px w-12 bg-charcoal-light/30" />
              24 Hours · One Quiet Listener
              <span className="h-px w-12 bg-charcoal-light/30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SceneCard({
  scene,
  style,
  side,
  index,
}: {
  scene: { time: string; phase: string; title: string; body: string }
  style: (typeof SCENE_STYLES)[number]
  side: 'left' | 'right'
  index: number
}) {
  // Cards on the left side sit flush against the central axis (items-end), but
  // the paragraph text itself stays left-aligned for natural Chinese reading.
  const alignDesktop = side === 'left' ? 'md:items-end' : 'md:items-start'
  return (
    <div className={`flex flex-col gap-2 items-start text-left ${alignDesktop}`}>
      <div
        className={`inline-flex items-center gap-2 ${
          side === 'left' ? 'md:flex-row-reverse' : ''
        }`}
      >
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
          style={{
            background: style.bg,
            border: `1px solid ${style.accent}30`,
          }}
          aria-hidden
        >
          <SceneIcon index={index} />
        </span>
        <div className="text-xs tracking-widest mono-display" style={{ color: style.accent }}>
          {scene.time}
        </div>
        <span className="text-xs text-charcoal-light">· {scene.phase}</span>
      </div>

      <h3
        className="text-lg font-bold mt-1"
        style={{
          fontFamily: 'var(--font-noto-serif-sc), serif',
          color: '#2D3436',
        }}
      >
        {scene.title}
      </h3>
      <p
        className="text-sm leading-loose max-w-sm"
        style={{ color: '#636E72' }}
      >
        {scene.body}
      </p>
    </div>
  )
}
