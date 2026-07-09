'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import DeviceView from '@/components/ui/DeviceView'
import XiaoBanAvatar from '@/components/ui/XiaoBanAvatar'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMobileDetect } from '@/hooks/useMobileDetect'

export interface IntroDict {
  skip: string
  photoLabel: string
  problem: string
  childAsk: string
  banReply: string
  step1: string
  step2: string
  childSolve: string
  reportToast: string
  brandName: string
  brandLine: string
}

interface IntroOverlayProps {
  dict: IntroDict
  onDone: () => void
}

const SEEN_KEY = 'flov-intro-seen'

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* private mode — play every time, acceptable */
  }
}

/**
 * 开场动画（学习机版）：蓝色小伴机滑入 → 屏幕亮起 → 题目照片进屏 → 屏内对话
 * （要答案 / 不给答案）→ 步骤点亮、孩子算出 → 家长微信收到报告 → 品牌落定揭幕。
 * 行为：可跳过（按钮/Esc）、每会话一次、reduced-motion 直接跳过、播放期间锁滚动。
 */
export default function IntroOverlay({ dict, onDone }: IntroOverlayProps) {
  const reducedMotion = useReducedMotion()
  const isMobile = useMobileDetect()
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const doneRef = useRef(false)
  // false = play the intro, true = skip it. Decided synchronously on first client render
  // (ssr:false component) to avoid a null-state race that could stall the overlay.
  const [skipped, setSkipped] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    try {
      if (sessionStorage.getItem(SEEN_KEY) === '1') return true
    } catch {
      /* ignore */
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    return false
  })

  useEffect(() => {
    if (skipped) {
      doneRef.current = true
      markSeen()
      onDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function finish(instant = false) {
    if (doneRef.current) return
    doneRef.current = true
    markSeen()
    tlRef.current?.kill()
    document.body.style.overflow = ''
    window.__lenis?.start()
    const el = rootRef.current
    if (!el || instant) {
      setSkipped(true)
      onDone()
      return
    }
    onDone()
    gsap.to(el, {
      autoAlpha: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => setSkipped(true),
    })
  }

  // Escape to skip
  useEffect(() => {
    if (skipped) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipped])

  // Hard failsafe: GSAP rides on requestAnimationFrame — if the tab's rAF is throttled or
  // suspended (background load, odd WebViews), the timeline can stall and the overlay would
  // block the page forever. Force-finish (instant, no animation) well past normal duration.
  useEffect(() => {
    if (skipped) return
    const t = setTimeout(() => finish(true), 16000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipped])

  useGSAP(
    () => {
      if (skipped || reducedMotion) return
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.to(rootRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.8,
            ease: 'power3.inOut',
            onStart: () => {
              document.body.style.overflow = ''
              window.__lenis?.start()
              if (!doneRef.current) {
                doneRef.current = true
                markSeen()
                onDone()
              }
            },
            onComplete: () => setSkipped(true),
          })
        },
      })
      tlRef.current = tl

      /* 幕1 · 学习机滑入落定 (0 – 1.4s) */
      tl.fromTo(
        '.io-dev',
        { autoAlpha: 0, y: 96, scale: 0.9, rotate: -6 },
        { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.15, ease: 'back.out(1.15)' },
        0.15
      )
      /* 幕2 · 屏幕亮起 (1.4 – 2s) */
      tl.to('.io-screenoff', { autoAlpha: 0, duration: 0.6, ease: 'power2.inOut' }, 1.4)
      /* 幕3 · 题目照片进屏 (2.1 – 3s) */
      tl.fromTo(
        '.io-photo',
        { autoAlpha: 0, y: -26, rotate: -5, scale: 0.9 },
        { autoAlpha: 1, y: 0, rotate: -1.5, scale: 1, duration: 0.8, ease: 'back.out(1.4)' },
        2.1
      )
      /* 幕4 · 屏内对话 (3.1 – 5s) */
      tl.fromTo('.io-ask', { autoAlpha: 0, y: 12, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, 3.15)
      tl.fromTo('.io-reply', { autoAlpha: 0, y: 12, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 4.05)
      /* 幕5 · 步骤点亮 → 孩子算出 (5 – 6.8s) */
      tl.fromTo('.io-step1', { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.45 }, 5.0)
      tl.fromTo('.io-step2', { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.45 }, 5.4)
      tl.fromTo('.io-solve', { autoAlpha: 0, y: 12, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' }, 6.0)
      tl.fromTo('.io-check', { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 6.4)
      /* 幕6 · 家长微信收到报告 (7 – 7.9s) */
      tl.fromTo(
        '.io-toast',
        { autoAlpha: 0, x: 60, y: -8 },
        { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: 'back.out(1.4)' },
        7.0
      )
      /* 幕7 · 品牌落定 (8.3 – 9.3s) */
      tl.to('.io-stage', { autoAlpha: 0, y: -30, duration: 0.55, ease: 'power2.in' }, 8.3)
      tl.fromTo(
        '.io-brand',
        { autoAlpha: 0, scale: 0.92, letterSpacing: '0.35em' },
        { autoAlpha: 1, scale: 1, letterSpacing: '0.06em', duration: 0.9, ease: 'power2.out' },
        8.6
      )
      tl.to({}, { duration: 0.55 }) // hold the brand beat

      if (isMobile) tl.timeScale(1.25)
    },
    { scope: rootRef, dependencies: [skipped, reducedMotion, isMobile] }
  )

  // Cleanup scroll lock on unmount (safety)
  useEffect(
    () => () => {
      document.body.style.overflow = ''
    },
    []
  )

  if (skipped) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 90% at 50% 30%, #FFF9F2 0%, #FFF3E4 55%, #FFE9D6 100%)',
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
      aria-label="小伴学习机产品开场动画"
      role="dialog"
    >
      <button
        onClick={() => finish()}
        className="absolute top-5 right-5 z-10 min-w-[44px] min-h-[44px] px-4 rounded-full text-[13px] font-medium text-charcoal-light bg-white/70 border border-charcoal/10 hover:text-charcoal hover:bg-white transition-colors"
      >
        {dict.skip} →
      </button>

      <div className="relative h-full flex items-center justify-center px-6">
        {/* 舞台：学习机 + 家长通知 */}
        <div className="io-stage relative">
          <div className="io-dev invisible relative w-[190px] sm:w-[210px]">
            <DeviceView view="front" shadow sweep={false}>
              <div className="absolute inset-0 flex flex-col">
                {/* App 顶栏 */}
                <div
                  className="relative flex items-end px-3 pb-1.5 pt-[16%] flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #D98370 0%, #C9705F 100%)' }}
                >
                  <div className="flex items-center gap-1.5">
                    <XiaoBanAvatar size={16} />
                    <div className="text-[9px] font-bold text-white leading-none">小伴</div>
                  </div>
                </div>

                {/* 屏内剧情 */}
                <div className="flex-1 px-2 py-2 flex flex-col gap-1.5 overflow-hidden">
                  <div className="io-photo invisible relative rounded-md overflow-hidden w-[80%] mx-auto shadow-sm">
                    <div
                      className="px-2.5 py-2"
                      style={{
                        background: 'repeating-linear-gradient(180deg, #FFFEFA 0px, #FFFEFA 15px, #EAE5D8 15px, #EAE5D8 16px)',
                      }}
                    >
                      <div className="flex items-center gap-1 mb-1" aria-hidden>
                        <span className="w-1 h-1 rounded-full bg-cinnabar/50" />
                        <span className="text-[7px] tracking-wider text-charcoal-lighter">{dict.photoLabel}</span>
                      </div>
                      <p className="text-[9px] leading-[15px] text-charcoal/85" style={{ transform: 'rotate(-0.6deg)' }}>
                        {dict.problem}
                      </p>
                    </div>
                  </div>

                  <div className="io-ask invisible flex justify-end">
                    <div
                      className="max-w-[80%] px-2 py-1.5 text-[9px] leading-[1.5] text-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #D98370 0%, #C9705F 100%)', borderRadius: '9px 9px 3px 9px' }}
                    >
                      {dict.childAsk}
                    </div>
                  </div>

                  <div className="io-reply invisible flex items-start gap-1">
                    <XiaoBanAvatar size={15} className="mt-0.5" />
                    <div
                      className="max-w-[80%] px-2 py-1.5 text-[9px] leading-[1.5] bg-white shadow-sm"
                      style={{ color: '#33302B', borderRadius: '9px 9px 9px 3px' }}
                    >
                      {dict.banReply}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-5">
                    <span className="io-step1 invisible inline-flex px-1.5 py-1 rounded-md bg-sunshine/30 text-charcoal text-[8px] font-mono font-bold border border-sunshine/50">
                      {dict.step1}
                    </span>
                    <span className="io-step2 invisible inline-flex px-1.5 py-1 rounded-md bg-sky/20 text-charcoal text-[8px] font-mono font-bold border border-sky/35">
                      {dict.step2}
                    </span>
                  </div>

                  <div className="io-solve invisible flex justify-end items-center gap-1">
                    <span className="io-check inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-wechat shadow-sm">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 12.5 L10 16.5 L18 7.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div
                      className="max-w-[72%] px-2 py-1.5 text-[9px] font-bold leading-[1.5] text-white shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #D98370 0%, #C9705F 100%)', borderRadius: '9px 9px 3px 9px' }}
                    >
                      {dict.childSolve}
                    </div>
                  </div>
                </div>

                {/* 屏幕未亮遮罩 */}
                <div className="io-screenoff absolute inset-0 z-10" style={{ background: '#0B0F14' }} />
              </div>
            </DeviceView>
          </div>

          {/* 家长微信通知 */}
          <div className="io-toast invisible absolute -right-6 sm:-right-24 top-[12%]">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white shadow-[0_18px_40px_-14px_rgba(45,52,54,0.3)] border border-charcoal/[0.06]">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-wechat flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white" aria-hidden>
                  <path d="M9.5 4C5.9 4 3 6.4 3 9.4c0 1.7 1 3.2 2.4 4.2l-.6 1.9 2.2-1.1c.5.1 1 .2 1.5.2h.4A5 5 0 0 1 9 13c0-2.9 2.9-5.2 6.4-5.2h.3C15 5.6 12.5 4 9.5 4Zm11.5 9c0-2.5-2.4-4.5-5.5-4.5S10 10.5 10 13s2.4 4.5 5.5 4.5c.5 0 1-.1 1.5-.2l1.9 1-.5-1.7c1.3-.8 2.1-2.1 2.1-3.6Z" />
                </svg>
              </span>
              <span className="text-[12px] font-medium text-charcoal whitespace-nowrap">{dict.reportToast}</span>
            </div>
          </div>
        </div>

        {/* 品牌落定 */}
        <div className="io-brand invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex items-center justify-center">
            <XiaoBanAvatar size={64} />
          </div>
          <div className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl tracking-[0.06em]">
            {dict.brandName}
          </div>
          <div className="mt-2 text-[14px] text-charcoal-light tracking-[0.12em]">{dict.brandLine}</div>
        </div>
      </div>
    </div>
  )
}
