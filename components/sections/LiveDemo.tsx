'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Role = 'child' | 'flov' | 'summary'

interface ChatTurn {
  role: Role
  text: string
  time: string
}

interface LiveDemoDict {
  header: string
  subheader: string
  turns: ChatTurn[]
  summaryTitle: string
  summaryTime: string
  summaryBody: string
  summaryTag1: string
  summaryTag2: string
  floatingNote: string
}

interface LiveDemoProps {
  dict: LiveDemoDict
}

export default function LiveDemo({ dict }: LiveDemoProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showSummary, setShowSummary] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isPaused) return

    const total = dict.turns.length
    if (visibleCount < total) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), 1400)
      return () => clearTimeout(t)
    }

    if (!showSummary) {
      const t = setTimeout(() => setShowSummary(true), 900)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      setShowSummary(false)
      setVisibleCount(0)
    }, 5200)
    return () => clearTimeout(t)
  }, [visibleCount, showSummary, isPaused, dict.turns.length])

  // Auto scroll to bottom when a new bubble appears
  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [visibleCount])

  return (
    <div
      className="relative w-full max-w-[420px] mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient glow behind the phone */}
      <div
        aria-hidden
        className="absolute -inset-12 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(243,199,122,0.28) 0%, rgba(243,199,122,0.08) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Phone frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[44px] p-[6px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(243,199,122,0.1)]"
        style={{
          background:
            'linear-gradient(145deg, #2A3950 0%, #0E1626 50%, #1C2A3A 100%)',
        }}
      >
        {/* Screen */}
        <div
          className="relative rounded-[38px] overflow-hidden"
          style={{
            background:
              'linear-gradient(180deg, #0A0F1E 0%, #141E32 100%)',
            height: '620px',
          }}
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[110px] h-[26px] bg-black rounded-b-[18px]" />

          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-6 pt-3 pb-1 text-[11px] text-paper-warm/80 font-medium">
            <span>22:08</span>
            <div className="flex items-center gap-1">
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                <rect x="0.5" y="0.5" width="11" height="8" rx="1.5" stroke="currentColor" opacity="0.6" />
                <rect x="2" y="2" width="8" height="5" rx="0.5" fill="currentColor" />
                <rect x="12" y="3" width="1.5" height="3" rx="0.5" fill="currentColor" opacity="0.6" />
              </svg>
            </div>
          </div>

          {/* Chat header */}
          <div className="relative z-20 px-5 pt-5 pb-3 flex items-center gap-3 border-b border-paper-warm/5">
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-candle-glow to-candle-flame shadow-lg shadow-candle-flame/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4 C8 6, 6 10, 6 13 C6 17, 9 20, 12 20 C15 20, 18 17, 18 13 C18 10, 16 6, 12 4 Z"
                  fill="white"
                  opacity="0.95"
                />
                <circle cx="10.5" cy="12" r="1" fill="#FF9D4D" />
                <circle cx="13.5" cy="12" r="1" fill="#FF9D4D" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-spring border-2 border-night-ink" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-paper-warm text-sm font-semibold">{dict.header}</div>
              <div className="text-moon-silver/60 text-[10px]">{dict.subheader}</div>
            </div>
            <div className="flex gap-1.5">
              <span className="w-1 h-1 rounded-full bg-paper-warm/40" />
              <span className="w-1 h-1 rounded-full bg-paper-warm/40" />
              <span className="w-1 h-1 rounded-full bg-paper-warm/40" />
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative z-10 px-4 py-4 overflow-y-auto h-[calc(100%-98px)] scrollbar-none"
            style={{ scrollbarWidth: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar { display: none; }
            `}</style>

            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {dict.turns.slice(0, visibleCount).map((turn, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${turn.role === 'child' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                        turn.role === 'child'
                          ? 'bg-gradient-to-br from-sakura-light to-sakura text-white rounded-[18px] rounded-br-[4px] shadow-lg shadow-sakura/20'
                          : 'bg-paper-warm/95 text-night-ink rounded-[18px] rounded-bl-[4px] shadow-md shadow-black/20'
                      }`}
                      style={{
                        fontFamily: 'var(--font-noto-sans-sc), sans-serif',
                      }}
                    >
                      {turn.text}
                      <div
                        className={`mt-1 text-[10px] ${
                          turn.role === 'child' ? 'text-white/70' : 'text-night-mist/60'
                        }`}
                      >
                        {turn.time}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator when waiting for next FLOV turn */}
                {visibleCount < dict.turns.length &&
                  dict.turns[visibleCount]?.role === 'flov' && (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-paper-warm/70 rounded-[18px] rounded-bl-[4px] px-4 py-3 flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-night-mist/60 animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-night-mist/60 animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-night-mist/60 animate-bounce [animation-delay:300ms]" />
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom reflection */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,15,30,0) 0%, rgba(10,15,30,0.9) 100%)',
            }}
          />
        </div>
      </motion.div>

      {/* Parent Summary card — floating bottom-right */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 2.5 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-8 -right-4 md:-right-16 w-[280px] z-20"
          >
            <div
              className="relative p-5 rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] border border-paper-warm/40"
              style={{
                background:
                  'linear-gradient(165deg, #FAF4E4 0%, #F5EDD8 100%)',
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, rgba(181,147,90,0.04) 0px, transparent 2px),
                  radial-gradient(circle at 70% 80%, rgba(181,147,90,0.03) 0px, transparent 2px),
                  linear-gradient(165deg, #FAF4E4 0%, #F5EDD8 100%)
                `,
              }}
            >
              {/* Cinnabar seal */}
              <div
                className="seal absolute -top-2 -right-2 w-9 h-9 text-xs rotate-6"
                aria-hidden
              >
                花声
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] tracking-[0.2em] text-cinnabar/80 uppercase en-display">
                  For parents
                </span>
                <span className="h-px flex-1 bg-cinnabar/20" />
                <span className="text-[10px] text-night-mist/70 mono-display">
                  {dict.summaryTime}
                </span>
              </div>

              <div
                className="text-sm font-semibold text-night-ink mb-2"
                style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
              >
                {dict.summaryTitle}
              </div>

              <div className="text-[13px] leading-relaxed text-night-wash mb-3">
                {dict.summaryBody}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sakura/10 text-sakura-dark">
                  {dict.summaryTag1}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-spring/10 text-spring-dark">
                  {dict.summaryTag2}
                </span>
              </div>

              {/* Floating note */}
              <div className="mt-3 pt-3 border-t border-dashed border-cinnabar/15 flex items-start gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="mt-0.5 flex-shrink-0">
                  <path d="M12 2 L12 22 M2 12 L22 12" stroke="#B23B2E" strokeWidth="2" opacity="0.4" />
                </svg>
                <div className="text-[11px] text-night-mist italic leading-relaxed">
                  {dict.floatingNote}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isPaused ? 1 : 0 }}
        className="absolute top-4 right-4 z-30 text-[10px] tracking-widest text-candle-glow/80 uppercase en-display pointer-events-none"
      >
        Paused
      </motion.div>
    </div>
  )
}
