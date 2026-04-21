'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface PrivacySectionProps {
  dict: {
    label: string
    heading: string
    subheading: string
    childSide: string
    childTitle: string
    childBody: string
    childTagline: string
    childChipChat: string
    childChipOnly: string
    parentSide: string
    parentTitle: string
    parentBody: string
    parentTagline: string
    parentChipDigest: string
    parentChipNoRaw: string
    wallLabel: string
    wallCopy: string
  }
}

export default function PrivacySection({ dict }: PrivacySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="privacy"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #FAFBFF 0%, #F4EFFF 50%, #FAFBFF 100%)',
      }}
    >
      {/* Soft background ornament */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 600px 400px at 20% 30%, rgba(255,107,157,0.06) 0%, transparent 60%), radial-gradient(ellipse 500px 400px at 80% 70%, rgba(167,139,250,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="section-container relative z-10">
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

        {/* Two-panel split with a wall in the middle */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-stretch">
            {/* ── LEFT · Child side ─────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative lg:pr-8"
            >
              <SidePanel
                side="child"
                sideLabel={dict.childSide}
                title={dict.childTitle}
                body={dict.childBody}
                tagline={dict.childTagline}
                chips={[dict.childChipChat, dict.childChipOnly]}
              />
            </motion.div>

            {/* ── MIDDLE · Privacy wall ─────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0.3 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex lg:flex-col items-center justify-center py-4 lg:py-0 lg:px-4"
              style={{ transformOrigin: 'center' }}
            >
              {/* Horizontal divider on mobile */}
              <div className="flex lg:hidden w-full items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cinnabar/30 to-cinnabar/50" />
                <PrivacyBadge label={dict.wallLabel} copy={dict.wallCopy} horizontal />
                <span className="h-px flex-1 bg-gradient-to-r from-cinnabar/50 via-cinnabar/30 to-transparent" />
              </div>

              {/* Vertical divider on desktop */}
              <div className="hidden lg:flex flex-col items-center h-full">
                <span className="w-px flex-1 bg-gradient-to-b from-transparent via-cinnabar/25 to-cinnabar/40" />
                <PrivacyBadge label={dict.wallLabel} copy={dict.wallCopy} />
                <span className="w-px flex-1 bg-gradient-to-b from-cinnabar/40 via-cinnabar/25 to-transparent" />
              </div>
            </motion.div>

            {/* ── RIGHT · Parent side ───────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative lg:pl-8"
            >
              <SidePanel
                side="parent"
                sideLabel={dict.parentSide}
                title={dict.parentTitle}
                body={dict.parentBody}
                tagline={dict.parentTagline}
                chips={[dict.parentChipDigest, dict.parentChipNoRaw]}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrivacyBadge({
  label,
  copy,
  horizontal = false,
}: {
  label: string
  copy: string
  horizontal?: boolean
}) {
  return (
    <div
      className={`flex items-center justify-center ${
        horizontal ? 'flex-row gap-3 px-4' : 'flex-col gap-2 py-6'
      }`}
    >
      {/* Lock icon in a cinnabar circle */}
      <div
        className="relative flex items-center justify-center w-12 h-12 rounded-full shrink-0"
        style={{
          background: 'linear-gradient(135deg, #C94936 0%, #B23B2E 100%)',
          boxShadow: '0 6px 18px -4px rgba(178,59,46,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="10" width="14" height="10" rx="2" fill="#FAF4E8" opacity="0.95" />
          <path
            d="M8 10 V8 C8 5 10 3 12 3 C14 3 16 5 16 8 V10"
            stroke="#FAF4E8"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="12" cy="14" r="1.4" fill="#B23B2E" />
          <path d="M12 15 L12 17" stroke="#B23B2E" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className={horizontal ? 'flex flex-col items-start min-w-0' : 'text-center'}>
        <div
          className="text-xs tracking-widest uppercase en-display"
          style={{ color: '#B23B2E', opacity: 0.8 }}
        >
          {label}
        </div>
        <div
          className={`${horizontal ? 'text-[10px]' : 'text-[11px]'} mt-0.5 leading-snug`}
          style={{ color: '#636E72', fontFamily: 'var(--font-noto-serif-sc), serif' }}
        >
          {copy}
        </div>
      </div>
    </div>
  )
}

function SidePanel({
  side,
  sideLabel,
  title,
  body,
  tagline,
  chips,
}: {
  side: 'child' | 'parent'
  sideLabel: string
  title: string
  body: string
  tagline: string
  chips: string[]
}) {
  const isChild = side === 'child'
  const accent = isChild ? '#FF6B9D' : '#A78BFA'
  const bgGrad = isChild
    ? 'linear-gradient(165deg, #FFF0F5 0%, #FFFAFC 100%)'
    : 'linear-gradient(165deg, #F4EFFF 0%, #FBFAFF 100%)'

  return (
    <div
      className="relative h-full rounded-3xl p-7 md:p-9 overflow-hidden"
      style={{
        background: bgGrad,
        border: `1px solid ${accent}22`,
        boxShadow: `0 20px 50px -20px ${accent}22`,
      }}
    >
      {/* Decorative bloom in the corner */}
      <div
        aria-hidden
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent}33 0%, transparent 70%)`,
        }}
      />

      {/* Side label */}
      <div className="relative flex items-center gap-2 mb-4">
        <span
          className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: accent, fontFamily: 'var(--font-noto-serif-sc), serif' }}
          aria-hidden
        >
          {isChild ? '儿' : '家'}
        </span>
        <span className="text-xs tracking-[0.2em] uppercase en-display" style={{ color: accent }}>
          {sideLabel}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-2xl font-bold mb-3 relative"
        style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
      >
        {title}
      </h3>

      {/* Mini mockup visual */}
      <div className="relative my-5">
        {isChild ? <ChildMiniMock /> : <ParentMiniMock />}
      </div>

      {/* Body */}
      <p className="text-sm leading-loose relative" style={{ color: '#636E72' }}>
        {body}
      </p>

      {/* Quote tagline */}
      <p
        className="mt-4 text-sm italic relative"
        style={{ color: accent, fontFamily: 'var(--font-noto-serif-sc), serif' }}
      >
        {tagline}
      </p>

      {/* Chips */}
      <div className="mt-5 flex flex-wrap gap-2 relative">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
            style={{
              background: `${accent}12`,
              color: accent,
              border: `1px solid ${accent}22`,
            }}
          >
            {i === 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M3 3 L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
            {chip}
          </span>
        ))}
      </div>
    </div>
  )
}

function ChildMiniMock() {
  return (
    <div
      className="rounded-2xl p-4 space-y-2"
      style={{
        background: 'rgba(255, 107, 157, 0.08)',
        border: '1px dashed rgba(255, 107, 157, 0.3)',
      }}
    >
      {/* Chat bubbles */}
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-gradient-to-br from-sakura-light to-sakura text-white text-xs rounded-2xl rounded-br-sm px-3 py-1.5">
          今天有点难过……
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[80%] bg-white/80 text-charcoal text-xs rounded-2xl rounded-bl-sm px-3 py-1.5 border border-sakura/10">
          我陪着你。想聊聊吗？
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-gradient-to-br from-sakura-light to-sakura text-white text-xs rounded-2xl rounded-br-sm px-3 py-1.5">
          嗯……只跟你说。
        </div>
      </div>
    </div>
  )
}

function ParentMiniMock() {
  return (
    <div
      className="rounded-2xl p-4 space-y-2"
      style={{
        background: 'rgba(167, 139, 250, 0.06)',
        border: '1px dashed rgba(167, 139, 250, 0.3)',
      }}
    >
      {/* Digest card */}
      <div className="flex items-center gap-2 text-[10px] tracking-widest text-lavender/80 uppercase en-display">
        <span className="w-1 h-1 rounded-full bg-lavender" />
        今日摘要 · 07:00
      </div>
      <div className="text-xs font-semibold text-charcoal" style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}>
        孩子昨晚情绪偏低
      </div>
      <div className="text-[11px] text-charcoal-light leading-relaxed">
        建议今早先陪伴，不急着问原因。她愿意主动开口时会告诉你。
      </div>
      <div className="flex gap-1.5 pt-1">
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-lavender/15 text-lavender-dark">情绪 · 低落</span>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-spring/15 text-spring-dark">主动表达</span>
      </div>
      {/* Faded redaction bar to hint "raw transcript not shown" */}
      <div className="pt-2 border-t border-dashed border-lavender/20">
        <div className="flex items-center gap-1.5 text-[10px] text-charcoal-light/70">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <path d="M3 3 L9 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          </svg>
          原始对话不可见
        </div>
      </div>
    </div>
  )
}
