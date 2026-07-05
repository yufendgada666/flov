'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import DeviceView from '@/components/ui/DeviceView'
import XiaoBanAvatar from '@/components/ui/XiaoBanAvatar'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Role = 'child' | 'ban'

interface DemoTurn {
  role: Role
  type: 'text' | 'photo'
  text: string
}

export interface DeviceDemoDict {
  title: string
  statusTime: string
  timestampChip: string
  turns: DemoTurn[]
}

interface DeviceDemoProps {
  dict: DeviceDemoDict
  className?: string
}

const TURN_INTERVAL = 1700
const END_HOLD = 4200

/* 真机 App 的配色（v2.7 起）：珊瑚主色 + 叶绿说话键 + 奶白底 */
const C_CORAL = '#D98370'
const C_CORAL2 = '#C9705F'
const C_LEAF = '#8AA585'
const C_LEAF2 = '#789573'
const C_INK = '#33302B'

function PhotoBubble({ text }: { text: string }) {
  return (
    <div className="relative rounded-md overflow-hidden w-[72%] shadow-sm">
      <div
        className="px-2.5 py-2"
        style={{
          background: 'repeating-linear-gradient(180deg, #FFFEFA 0px, #FFFEFA 15px, #EAE5D8 15px, #EAE5D8 16px)',
        }}
      >
        <div className="flex items-center gap-1 mb-1" aria-hidden>
          <span className="w-1 h-1 rounded-full bg-cinnabar/50" />
          <span className="text-[7px] tracking-wider text-charcoal-lighter">数学练习册 · P42</span>
        </div>
        <p className="text-[9px] leading-[15px] text-charcoal/85" style={{ transform: 'rotate(-0.6deg)' }}>
          {text}
        </p>
      </div>
      <span className="absolute bottom-1 right-1.5 text-[7px] text-charcoal-lighter/80" aria-hidden>
        ▣ 照片
      </span>
    </div>
  )
}

/** 小伴学习机的实时辅导演示：自动循环播放一次完整的「不给答案」引导，渲染在蓝色机身内。 */
export default function DeviceDemo({ dict, className = '' }: DeviceDemoProps) {
  const reducedMotion = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inView = useInView(rootRef, { amount: 0.3 })

  const total = dict.turns.length
  const paused = hoverPaused || !inView

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
      className={`relative ${className}`}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
    >
      {/* 屏幕阅读器文字版 —— 核心说服力不依赖动画 */}
      <div className="sr-only">
        <p>小伴学习机上的一次辅导示例：</p>
        <ul>
          {dict.turns.map((turn, i) => (
            <li key={i}>
              {turn.role === 'child' ? '孩子' : '小伴'}：{turn.text}
            </li>
          ))}
        </ul>
      </div>

      {/* 品牌光晕 */}
      <div
        aria-hidden
        className="absolute -inset-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 45%, rgba(111,166,211,0.20) 0%, rgba(255,217,61,0.08) 45%, transparent 72%)',
          filter: 'blur(14px)',
        }}
      />

      <DeviceView view="front" className="relative">
        <div className="absolute inset-0 flex flex-col">
          {/* App 顶栏（珊瑚渐变，让出居中挖孔） */}
          <div
            className="relative flex items-end justify-between px-3 pb-1.5 pt-[16%] flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${C_CORAL} 0%, ${C_CORAL2} 100%)` }}
          >
            <div className="flex items-center gap-1.5">
              <XiaoBanAvatar size={18} />
              <div className="leading-none">
                <div className="text-[10px] font-bold text-white">{dict.title}</div>
                <div className="text-[6.5px] text-white/80 mt-0.5 tracking-wider">学习小伙伴</div>
              </div>
            </div>
            <div className="text-[7px] text-white/85 font-mono pb-0.5">{dict.statusTime}</div>
          </div>

          {/* 对话区 */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-2 py-2" style={{ scrollbarWidth: 'none' }}>
            <div className="flex flex-col gap-1.5">
              <div className="text-center">
                <span className="text-[7px] text-charcoal-light/70">{dict.timestampChip}</span>
              </div>

              <AnimatePresence initial={false}>
                {dict.turns.slice(0, shown).map((turn, idx) => {
                  const isChild = turn.role === 'child'
                  return (
                    <motion.div
                      key={idx}
                      initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex items-start gap-1 ${isChild ? 'justify-end' : ''}`}
                    >
                      {!isChild && <XiaoBanAvatar size={16} className="mt-0.5" />}
                      {turn.type === 'photo' ? (
                        <PhotoBubble text={turn.text} />
                      ) : (
                        <div
                          className="max-w-[76%] px-2 py-1.5 text-[9px] leading-[1.55] shadow-sm"
                          style={
                            isChild
                              ? {
                                  background: `linear-gradient(135deg, ${C_CORAL} 0%, ${C_CORAL2} 100%)`,
                                  color: '#FFFFFF',
                                  borderRadius: '9px 9px 3px 9px',
                                }
                              : { background: '#FFFFFF', color: C_INK, borderRadius: '9px 9px 9px 3px' }
                          }
                        >
                          {turn.text}
                        </div>
                      )}
                    </motion.div>
                  )
                })}

                {showTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-1"
                  >
                    <XiaoBanAvatar size={16} className="mt-0.5" />
                    <div className="bg-white rounded-lg px-2 py-1.5 flex gap-0.5 shadow-sm">
                      <span className="w-1 h-1 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:0ms]" />
                      <span className="w-1 h-1 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:150ms]" />
                      <span className="w-1 h-1 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:300ms]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 底部两大按钮（真机 v4 起无打字，只有拍照 + 按住说话） */}
          <div className="flex-shrink-0 flex gap-1.5 px-2 pb-2.5 pt-1">
            <div
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[8.5px] font-bold text-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${C_CORAL} 0%, ${C_CORAL2} 100%)` }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="6.5" width="18" height="13" rx="2.5" stroke="white" strokeWidth="2" />
                <circle cx="12" cy="13" r="3.6" stroke="white" strokeWidth="2" />
                <path d="M8.5 6.5 L10 4 h4 l1.5 2.5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              拍照搜题
            </div>
            <div
              className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full text-[8.5px] font-bold text-white shadow-sm"
              style={{ background: `linear-gradient(135deg, ${C_LEAF} 0%, ${C_LEAF2} 100%)` }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="9" y="3" width="6" height="11" rx="3" stroke="white" strokeWidth="2" />
                <path d="M5.5 11.5 a6.5 6.5 0 0 0 13 0 M12 18 v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              按住说话
            </div>
          </div>
        </div>
      </DeviceView>
    </div>
  )
}
