'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import XiaoBanAvatar from '@/components/ui/XiaoBanAvatar'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Role = 'child' | 'ban'

interface DemoTurn {
  role: Role
  type: 'text' | 'photo'
  text: string
}

export interface WeChatDemoDict {
  title: string
  statusTime: string
  timestampChip: string
  turns: DemoTurn[]
}

interface WeChatDemoProps {
  dict: WeChatDemoDict
  /** Gate the auto-play loop (e.g. wait for the intro overlay to finish) */
  active?: boolean
  className?: string
}

const TURN_INTERVAL = 1700
const END_HOLD = 4200

function ChildAvatar() {
  return (
    <span
      className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-[5px] overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #A8D8F0 0%, #6CB4EE 100%)' }}
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="13.5" r="7.5" fill="#FFE8D6" />
        <path d="M5.5 12 Q5 5.5 12 5.5 Q19 5.5 18.5 12 Q16 10.5 12 10.5 Q8 10.5 5.5 12 Z" fill="#5A4632" />
        <circle cx="9.6" cy="13.6" r="0.95" fill="#2D3436" />
        <circle cx="14.4" cy="13.6" r="0.95" fill="#2D3436" />
        <path d="M10.4 16.2 Q12 17.5 13.6 16.2" stroke="#2D3436" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  )
}

/** WeChat-style bubble tail */
function Tail({ side, color }: { side: 'left' | 'right'; color: string }) {
  return (
    <span
      aria-hidden
      className={`absolute top-[13px] w-2 h-2 rotate-45 ${side === 'left' ? '-left-[3px]' : '-right-[3px]'}`}
      style={{ background: color }}
    />
  )
}

function PhotoBubble({ text }: { text: string }) {
  return (
    <div className="relative rounded-[6px] overflow-hidden w-[180px] shadow-sm">
      <div
        className="px-3 py-3"
        style={{
          background:
            'repeating-linear-gradient(180deg, #FFFEFA 0px, #FFFEFA 21px, #E8E3D5 21px, #E8E3D5 22px)',
        }}
      >
        <div className="flex items-center gap-1 mb-1.5" aria-hidden>
          <span className="w-1.5 h-1.5 rounded-full bg-cinnabar/50" />
          <span className="text-[9px] tracking-wider text-charcoal-lighter">数学练习册 · P42</span>
        </div>
        <p
          className="text-[12px] leading-[21px] text-charcoal/85"
          style={{ transform: 'rotate(-0.6deg)', fontFamily: 'var(--font-noto-sans-sc), sans-serif' }}
        >
          {text}
        </p>
      </div>
      <span className="absolute bottom-1.5 right-2 text-[9px] text-charcoal-lighter/80" aria-hidden>
        ▣ 照片
      </span>
    </div>
  )
}

export default function WeChatDemo({ dict, active = true, className = '' }: WeChatDemoProps) {
  const reducedMotion = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })

  const total = dict.turns.length
  const paused = hoverPaused || !inView || !active

  useEffect(() => {
    if (reducedMotion || paused) return
    if (visibleCount < total) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), TURN_INTERVAL)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisibleCount(0), END_HOLD)
    return () => clearTimeout(t)
  }, [visibleCount, paused, reducedMotion, total])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleCount])

  const shown = reducedMotion ? total : visibleCount
  const nextTurn = dict.turns[shown]
  const showTyping = !reducedMotion && shown < total && nextTurn?.role === 'ban'

  return (
    <div
      ref={rootRef}
      className={`relative w-full max-w-[340px] md:max-w-[370px] mx-auto ${className}`}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {/* Text transcript for screen readers / no-animation — the demo's persuasion lives here too */}
      <div className="sr-only">
        <p>与小伴的对话示例：</p>
        <ul>
          {dict.turns.map((turn, i) => (
            <li key={i}>
              {turn.role === 'child' ? '孩子' : '小伴'}：{turn.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Soft brand glow behind the phone */}
      <div
        aria-hidden
        className="absolute -inset-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(255,107,157,0.14) 0%, rgba(255,217,61,0.08) 45%, transparent 72%)',
          filter: 'blur(14px)',
        }}
      />

      {/* Phone frame — light hardware */}
      <div
        className="relative rounded-[40px] p-[7px] shadow-[0_30px_60px_-18px_rgba(45,52,54,0.35),0_0_0_1px_rgba(45,52,54,0.06)]"
        style={{ background: 'linear-gradient(150deg, #FDFDFD 0%, #E9EBEE 55%, #F6F7F9 100%)' }}
      >
        <div className="relative rounded-[33px] overflow-hidden bg-wechat-bg" style={{ height: '560px' }}>
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 w-[96px] h-[22px] bg-charcoal rounded-b-[14px]" />

          {/* Status bar */}
          <div className="relative z-20 flex items-center justify-between px-5 pt-2.5 pb-0.5 text-[11px] font-medium text-charcoal">
            <span className="font-mono">{dict.statusTime}</span>
            <span className="flex items-center gap-1" aria-hidden>
              <svg width="13" height="9" viewBox="0 0 14 9" fill="none">
                <rect x="0.5" y="0.5" width="11" height="8" rx="1.5" stroke="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="7" height="5" rx="0.5" fill="currentColor" />
                <rect x="12" y="3" width="1.5" height="3" rx="0.5" fill="currentColor" opacity="0.5" />
              </svg>
            </span>
          </div>

          {/* WeChat header */}
          <div className="relative z-20 flex items-center px-3 pt-1.5 pb-2 border-b border-charcoal/[0.07] bg-wechat-bg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden className="text-charcoal">
              <path d="M15 5 L8 12 L15 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1 text-center text-[15px] font-medium text-charcoal">{dict.title}</div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="text-charcoal">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="relative z-10 px-3 py-3 overflow-y-auto h-[calc(100%-92px)]"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex flex-col gap-3.5">
              <div className="text-center">
                <span className="text-[10px] text-charcoal-light/70 px-2 py-0.5">{dict.timestampChip}</span>
              </div>

              <AnimatePresence initial={false}>
                {dict.turns.slice(0, shown).map((turn, idx) => {
                  const isChild = turn.role === 'child'
                  return (
                    <motion.div
                      key={idx}
                      initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex items-start gap-2 ${isChild ? 'flex-row-reverse' : ''}`}
                    >
                      {isChild ? <ChildAvatar /> : <XiaoBanAvatar size={36} />}
                      {turn.type === 'photo' ? (
                        <PhotoBubble text={turn.text} />
                      ) : (
                        <div
                          className={`relative max-w-[72%] px-3 py-2 rounded-[6px] text-[13.5px] leading-relaxed text-wechat-text ${
                            isChild ? 'bg-wechat-bubble' : 'bg-white'
                          }`}
                          style={{ fontFamily: 'var(--font-noto-sans-sc), sans-serif' }}
                        >
                          <Tail side={isChild ? 'right' : 'left'} color={isChild ? '#95EC69' : '#FFFFFF'} />
                          {turn.text}
                        </div>
                      )}
                    </motion.div>
                  )
                })}

                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-2"
                  >
                    <XiaoBanAvatar size={36} />
                    <div className="relative bg-white rounded-[6px] px-3.5 py-3 flex gap-1">
                      <Tail side="left" color="#FFFFFF" />
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:300ms]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Input bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-2 px-3 py-2 bg-[#F6F6F6] border-t border-charcoal/[0.07]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-charcoal/70">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9 10.5 Q9.4 9.5 10.3 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M13.7 10.5 Q14.1 9.5 15 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M8.5 13.5 Q12 17 15.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
            </svg>
            <div className="flex-1 h-8 rounded-[5px] bg-white" />
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="text-charcoal/70">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 7.5v9M7.5 12h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
