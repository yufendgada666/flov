'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import FlovLogo from '@/components/icons/FlovLogo'
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

function hasSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, '1')
  } catch {
    /* private mode — play every time, acceptable */
  }
}

export default function IntroOverlay({ dict, onDone }: IntroOverlayProps) {
  const reducedMotion = useReducedMotion()
  const isMobile = useMobileDetect()
  const rootRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const doneRef = useRef(false)
  // null = undecided (first client render), false = play, true = skip entirely
  const [skipped, setSkipped] = useState<boolean | null>(null)

  useEffect(() => {
    if (hasSeen()) {
      setSkipped(true)
      doneRef.current = true
      onDone()
    } else {
      setSkipped(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reduced motion: never play
  useEffect(() => {
    if (skipped === false && reducedMotion) {
      finish(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, skipped])

  function finish(instant = false) {
    if (doneRef.current) return
    doneRef.current = true
    markSeen()
    tlRef.current?.kill()
    document.body.style.overflow = ''
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
    if (skipped !== false) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipped])

  useGSAP(
    () => {
      if (skipped !== false || reducedMotion) return
      document.body.style.overflow = 'hidden'

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Wipe-up reveal
          gsap.to(rootRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.8,
            ease: 'power3.inOut',
            onStart: () => {
              document.body.style.overflow = ''
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

      /* Act 1 — the problem photo drops in (0 – 1.3s) */
      tl.fromTo(
        '.io-photo',
        { autoAlpha: 0, y: -46, rotate: -5, scale: 0.94 },
        { autoAlpha: 1, y: 0, rotate: -1.5, scale: 1, duration: 1.0, ease: 'back.out(1.4)' },
        0.15
      )
      /* Act 2 — child asks for the answer (1.3 – 2.4s) */
      tl.fromTo(
        '.io-ask',
        { autoAlpha: 0, y: 22, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: 'back.out(1.6)' },
        1.35
      )
      /* Act 3 — 小伴: no answers, step by step (2.4 – 3.6s) */
      tl.fromTo(
        '.io-reply',
        { autoAlpha: 0, y: 22, scale: 0.95 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
        2.45
      )
      /* Act 4 — steps light up, child solves it (3.6 – 5.4s) */
      tl.fromTo('.io-step1', { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 3.6)
      tl.fromTo('.io-step2', { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 4.05)
      tl.fromTo(
        '.io-solve',
        { autoAlpha: 0, y: 20, scale: 0.94 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        4.55
      )
      tl.fromTo(
        '.io-check',
        { autoAlpha: 0, scale: 0 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'back.out(2.4)' },
        4.95
      )
      /* Act 5 — chat drifts away, report toast (5.5 – 6.4s) */
      tl.to('.io-stage', { autoAlpha: 0, y: -36, duration: 0.6, ease: 'power2.in' }, 5.55)
      tl.fromTo(
        '.io-toast',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
        5.95
      )
      /* Act 6 — brand settles (6.4 – 7.4s) */
      tl.to('.io-toast', { autoAlpha: 0, y: -18, duration: 0.45, ease: 'power2.in' }, 6.75)
      tl.fromTo(
        '.io-brand',
        { autoAlpha: 0, scale: 0.92, letterSpacing: '0.4em' },
        { autoAlpha: 1, scale: 1, letterSpacing: '0.08em', duration: 0.9, ease: 'power2.out' },
        6.95
      )
      tl.to({}, { duration: 0.55 }) // hold the brand beat

      if (isMobile) tl.timeScale(1.25)
    },
    { scope: rootRef, dependencies: [skipped, reducedMotion, isMobile] }
  )

  // Cleanup scroll lock on unmount (safety)
  useEffect(() => () => {
    document.body.style.overflow = ''
  }, [])

  if (skipped !== false) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 90% at 50% 30%, #FFF9F2 0%, #FFF3E4 55%, #FFE9D6 100%)',
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
      aria-label="小伴产品开场动画"
      role="dialog"
    >
      {/* Skip */}
      <button
        onClick={() => finish()}
        className="absolute top-5 right-5 z-10 min-w-[44px] min-h-[44px] px-4 rounded-full text-[13px] font-medium text-charcoal-light bg-white/70 border border-charcoal/10 hover:text-charcoal hover:bg-white transition-colors"
      >
        {dict.skip} →
      </button>

      <div className="relative h-full flex flex-col items-center justify-center px-6">
        {/* Chat stage */}
        <div className="io-stage relative w-full max-w-[360px]">
          {/* Act 1 · problem photo */}
          <div
            className="io-photo invisible relative mx-auto w-[250px] rounded-xl overflow-hidden shadow-[0_24px_50px_-18px_rgba(45,52,54,0.35)] border border-charcoal/[0.07]"
            style={{
              background:
                'repeating-linear-gradient(180deg, #FFFEFA 0px, #FFFEFA 23px, #EAE5D8 23px, #EAE5D8 24px)',
            }}
          >
            <div className="px-4 pt-3 pb-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cinnabar/50" aria-hidden />
                <span className="text-[10px] tracking-wider text-charcoal-lighter">{dict.photoLabel}</span>
              </div>
              <p className="text-[13.5px] leading-[24px] text-charcoal/85" style={{ transform: 'rotate(-0.5deg)' }}>
                {dict.problem}
              </p>
            </div>
          </div>

          {/* Act 2 · child asks */}
          <div className="io-ask invisible mt-5 flex justify-end">
            <div className="relative max-w-[78%] px-3.5 py-2.5 rounded-[8px] rounded-tr-[3px] bg-wechat-bubble text-wechat-text text-[14.5px] leading-relaxed shadow-sm">
              {dict.childAsk}
            </div>
          </div>

          {/* Act 3 · ban replies */}
          <div className="io-reply invisible mt-3 flex items-start gap-2">
            <XiaoBanAvatar size={34} />
            <div className="relative max-w-[78%] px-3.5 py-2.5 rounded-[8px] rounded-tl-[3px] bg-white text-wechat-text text-[14.5px] leading-relaxed shadow-sm">
              {dict.banReply}
            </div>
          </div>

          {/* Act 4 · steps + solve */}
          <div className="mt-4 flex items-center gap-2 pl-11">
            <span className="io-step1 invisible inline-flex px-3 py-1.5 rounded-lg bg-sunshine/25 text-charcoal text-[13px] font-mono font-medium border border-sunshine/40">
              {dict.step1}
            </span>
            <span className="io-step2 invisible inline-flex px-3 py-1.5 rounded-lg bg-sky/15 text-charcoal text-[13px] font-mono font-medium border border-sky/30">
              {dict.step2}
            </span>
          </div>
          <div className="io-solve invisible mt-4 flex justify-end items-center gap-2">
            <span className="io-check inline-flex items-center justify-center w-7 h-7 rounded-full bg-wechat shadow-[0_6px_16px_-4px_rgba(7,193,96,0.55)]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 12.5 L10 16.5 L18 7.5" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="relative max-w-[72%] px-3.5 py-2.5 rounded-[8px] rounded-tr-[3px] bg-wechat-bubble text-wechat-text text-[14.5px] font-medium leading-relaxed shadow-sm">
              {dict.childSolve}
            </div>
          </div>
        </div>

        {/* Act 5 · report toast */}
        <div className="io-toast invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white shadow-[0_22px_50px_-18px_rgba(45,52,54,0.3)] border border-charcoal/[0.06]">
            <XiaoBanAvatar size={30} />
            <span className="text-[14px] font-medium text-charcoal whitespace-nowrap">{dict.reportToast}</span>
          </div>
        </div>

        {/* Act 6 · brand */}
        <div className="io-brand invisible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="flex items-center justify-center">
            <FlovLogo variant="dark" showWordmark={false} className="scale-[1.7]" />
          </div>
          <div className="mt-4 font-display-zh font-bold text-charcoal text-2xl tracking-[0.08em]">
            {dict.brandName}
          </div>
          <div className="mt-2 text-[14px] text-charcoal-light tracking-[0.14em]">{dict.brandLine}</div>
        </div>
      </div>
    </div>
  )
}
