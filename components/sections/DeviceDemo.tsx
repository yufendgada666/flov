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

interface Scenario {
  label: string
  turns: DemoTurn[]
}

export interface DeviceDemoDict {
  title: string
  statusTime: string
  timestampChip: string
  menuGreeting: string
  menuHint: string
  tryAgain: string
  listening: string
  scenarios: Scenario[]
}

interface DeviceDemoProps {
  dict: DeviceDemoDict
  className?: string
}

const TURN_INTERVAL = 1700
const AUTO_START_MS = 8000
const AUTO_RETURN_MS = 5000
const USER_RETURN_MS = 14000

/* 真机 App 的配色（v2.7 起）：珊瑚主色 + 叶绿说话键 + 奶白底 */
const C_CORAL = '#D98370'
const C_CORAL2 = '#C9705F'
const C_LEAF = '#8AA585'
const C_LEAF2 = '#789573'
const C_INK = '#33302B'

const CORAL_GRAD = `linear-gradient(135deg, ${C_CORAL} 0%, ${C_CORAL2} 100%)`
const LEAF_GRAD = `linear-gradient(135deg, ${C_LEAF} 0%, ${C_LEAF2} 100%)`

function PhotoBubble({ text }: { text: string }) {
  return (
    <div className="relative rounded-lg overflow-hidden w-[80%] shadow-sm">
      <div
        className="px-2.5 py-2"
        style={{
          background: 'repeating-linear-gradient(180deg, #FFFEFA 0px, #FFFEFA 20px, #EAE5D8 20px, #EAE5D8 21px)',
        }}
      >
        <div className="flex items-center gap-1 mb-1" aria-hidden>
          <span className="w-1.5 h-1.5 rounded-full bg-cinnabar/50" />
          <span className="text-[9px] tracking-wider text-charcoal-lighter">数学练习册 · P42</span>
        </div>
        <p className="text-[12px] leading-[19px] text-charcoal/85" style={{ transform: 'rotate(-0.6deg)' }}>
          {text}
        </p>
      </div>
      <span className="absolute bottom-1 right-2 text-[9px] text-charcoal-lighter/80" aria-hidden>
        ▣ 照片
      </span>
    </div>
  )
}

/**
 * 小伴学习机·可交互演示：
 * 选题 chips 点哪道演示哪道；「按住说话」可真实按住（松开进入语音提问的辅导）；
 * 「拍照搜题」直接演示拍照题；无人操作 8 秒后自动开始演示（一旦交互即停用自动）。
 * 全部脚本化，不连真实 AI。
 */
export default function DeviceDemo({ dict, className = '' }: DeviceDemoProps) {
  const reducedMotion = useReducedMotion()
  const [mode, setMode] = useState<'menu' | 'playing'>('menu')
  const [scenarioIdx, setScenarioIdx] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [recording, setRecording] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [hoverPaused, setHoverPaused] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const autoIdxRef = useRef(0)
  const voiceIdxRef = useRef(1)
  const inView = useInView(rootRef, { amount: 0.3 })

  const scenario = dict.scenarios[scenarioIdx]
  const total = scenario ? scenario.turns.length : 0
  const paused = hoverPaused || !inView
  const finished = mode === 'playing' && visibleCount >= total

  const TILT_REST = 'rotateY(-4deg) rotateX(2deg)'
  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !tiltRef.current) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    tiltRef.current.style.transform = `rotateY(${(x * 10 - 4).toFixed(2)}deg) rotateX(${(2 - y * 6).toFixed(2)}deg)`
  }
  const onTiltLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = TILT_REST
  }

  function startScenario(idx: number, viaUser: boolean) {
    setScenarioIdx(idx)
    setMode('playing')
    setVisibleCount(reducedMotion ? dict.scenarios[idx].turns.length : 0)
    if (viaUser) setInteracted(true)
  }

  function backToMenu() {
    setMode('menu')
    setVisibleCount(0)
  }

  /* 对话推进 */
  useEffect(() => {
    if (mode !== 'playing' || reducedMotion || paused) return
    if (visibleCount < total) {
      const t = setTimeout(() => setVisibleCount((c) => c + 1), TURN_INTERVAL)
      return () => clearTimeout(t)
    }
  }, [mode, visibleCount, paused, reducedMotion, total])

  /* 播完自动回到选题屏 */
  useEffect(() => {
    if (!finished || paused) return
    const t = setTimeout(() => backToMenu(), interacted ? USER_RETURN_MS : AUTO_RETURN_MS)
    return () => clearTimeout(t)
  }, [finished, paused, interacted])

  /* 无人操作时自动开始演示（循环换题） */
  useEffect(() => {
    if (mode !== 'menu' || interacted || reducedMotion || paused) return
    const t = setTimeout(() => {
      const idx = autoIdxRef.current % dict.scenarios.length
      autoIdxRef.current += 1
      startScenario(idx, false)
    }, AUTO_START_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, interacted, reducedMotion, paused])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visibleCount, mode])

  /* 按住说话：按下出录音条，松开"识别"出一道语音题并进入辅导 */
  const voiceDown = () => {
    if (mode === 'playing' && !finished) return
    setRecording(true)
  }
  const voiceUp = () => {
    if (!recording) return
    setRecording(false)
    const idx = voiceIdxRef.current % dict.scenarios.length
    voiceIdxRef.current += 1
    startScenario(idx, true)
  }

  const shown = mode === 'playing' ? (reducedMotion ? total : visibleCount) : 0
  const nextTurn = scenario?.turns[shown]
  const showTyping = mode === 'playing' && !reducedMotion && shown < total && nextTurn?.role === 'ban'

  return (
    <div
      ref={rootRef}
      className={`relative ${className}`}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => {
        setHoverPaused(false)
        onTiltLeave()
      }}
      onMouseMove={onTiltMove}
      style={{ perspective: '1400px' }}
    >
      {/* 屏幕阅读器文字版 —— 三套辅导脚本完整可读 */}
      <div className="sr-only">
        <p>小伴学习机辅导演示（三个例题）：</p>
        {dict.scenarios.map((s) => (
          <div key={s.label}>
            <p>{s.label}：</p>
            <ul>
              {s.turns.map((turn, i) => (
                <li key={i}>
                  {turn.role === 'child' ? '孩子' : '小伴'}：{turn.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
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

      <div ref={tiltRef} style={{ transform: TILT_REST, transition: 'transform 0.25s ease-out', transformStyle: 'preserve-3d' }}>
        <DeviceView view="front" className="relative" float shadow>
          <div className="absolute inset-0 flex flex-col">
            {/* App 顶栏 */}
            <div
              className="relative flex items-end justify-between px-3 pb-1.5 pt-[16%] flex-shrink-0"
              style={{ background: CORAL_GRAD }}
            >
              <div className="flex items-center gap-1.5">
                <XiaoBanAvatar size={22} />
                <div className="leading-none">
                  <div className="text-[13px] font-bold text-white">{dict.title}</div>
                  <div className="text-[9px] text-white/80 mt-0.5 tracking-wider">学习小伙伴</div>
                </div>
              </div>
              <div className="text-[9.5px] text-white/85 font-mono pb-0.5">{dict.statusTime}</div>
            </div>

            {/* 内容区：选题屏 或 对话 */}
            {mode === 'menu' ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 px-3 text-center">
                <XiaoBanAvatar size={60} />
                <div className="text-[15px] font-bold mt-1.5" style={{ color: C_INK }}>
                  {dict.menuGreeting}
                </div>
                <div className="text-[11.5px] mb-2" style={{ color: '#8A8378' }}>
                  {dict.menuHint}
                </div>
                {dict.scenarios.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => startScenario(i, true)}
                    className="w-[88%] py-2.5 rounded-full text-[13px] font-bold bg-white shadow-sm border active:scale-95 transition-transform"
                    style={{ color: C_CORAL2, borderColor: 'rgba(217,131,112,0.4)' }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            ) : (
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-2.5 py-2.5" style={{ scrollbarWidth: 'none' }}>
                <div className="flex flex-col gap-2">
                  <div className="text-center">
                    <span className="text-[9.5px] text-charcoal-light/70">{dict.timestampChip}</span>
                  </div>

                  <AnimatePresence initial={false}>
                    {scenario.turns.slice(0, shown).map((turn, idx) => {
                      const isChild = turn.role === 'child'
                      return (
                        <motion.div
                          key={`${scenarioIdx}-${idx}`}
                          initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex items-start gap-1 ${isChild ? 'justify-end' : ''}`}
                        >
                          {!isChild && <XiaoBanAvatar size={20} className="mt-0.5" />}
                          {turn.type === 'photo' ? (
                            <PhotoBubble text={turn.text} />
                          ) : (
                            <div
                              className="max-w-[82%] px-3 py-2 text-[12.5px] leading-[1.6] shadow-sm"
                              style={
                                isChild
                                  ? { background: CORAL_GRAD, color: '#FFFFFF', borderRadius: '12px 12px 4px 12px' }
                                  : { background: '#FFFFFF', color: C_INK, borderRadius: '12px 12px 12px 4px' }
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
                        <XiaoBanAvatar size={20} className="mt-0.5" />
                        <div className="bg-white rounded-xl px-3 py-2 flex gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:0ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:150ms]" />
                          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-lighter animate-bounce [animation-delay:300ms]" />
                        </div>
                      </motion.div>
                    )}

                    {finished && (
                      <motion.div
                        key="again"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center pt-1"
                      >
                        <button
                          onClick={backToMenu}
                          className="px-5 py-2 rounded-full text-[12.5px] font-bold bg-white shadow-sm border active:scale-95 transition-transform"
                          style={{ color: C_CORAL2, borderColor: 'rgba(217,131,112,0.4)' }}
                        >
                          {dict.tryAgain}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* 录音条（按住说话时出现） */}
            {recording && (
              <div className="flex-shrink-0 mx-2.5 mb-1 px-3 py-2 rounded-xl flex items-center justify-center gap-1.5 bg-white/95 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D14B3F] animate-ping" />
                <span className="text-[12px] font-bold" style={{ color: C_INK }}>
                  {dict.listening}
                </span>
              </div>
            )}

            {/* 底部两大按钮（真实可按） */}
            <div className="flex-shrink-0 flex gap-2 px-2.5 pb-3 pt-1">
              <button
                onClick={() => startScenario(0, true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[12.5px] font-bold text-white shadow-sm active:scale-95 transition-transform"
                style={{ background: CORAL_GRAD }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="3" y="6.5" width="18" height="13" rx="2.5" stroke="white" strokeWidth="2" />
                  <circle cx="12" cy="13" r="3.6" stroke="white" strokeWidth="2" />
                  <path d="M8.5 6.5 L10 4 h4 l1.5 2.5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                </svg>
                拍照搜题
              </button>
              <button
                onPointerDown={voiceDown}
                onPointerUp={voiceUp}
                onPointerLeave={() => recording && voiceUp()}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[12.5px] font-bold text-white shadow-sm active:scale-95 transition-transform select-none touch-none"
                style={{ background: recording ? 'linear-gradient(135deg, #D14B3F 0%, #B93E33 100%)' : LEAF_GRAD }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="9" y="3" width="6" height="11" rx="3" stroke="white" strokeWidth="2" />
                  <path d="M5.5 11.5 a6.5 6.5 0 0 0 13 0 M12 18 v3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {recording ? '松开提问' : '按住说话'}
              </button>
            </div>
          </div>
        </DeviceView>
      </div>
    </div>
  )
}
