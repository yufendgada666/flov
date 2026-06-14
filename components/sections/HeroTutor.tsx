import WeChatDemo, { type WeChatDemoDict } from '@/components/sections/WeChatDemo'
import QrCta from '@/components/ui/QrCta'

interface HeroTutorDict {
  eyebrow: string
  h1Line1: string
  h1Line2Pre: string
  h1Highlight: string
  h1Tail: string
  sub: string
  points: string[]
  ctaPrimary: string
  qrCaption: string
  qrHint: string
  wechatId: string
  demo: WeChatDemoDict
}

interface HeroTutorProps {
  dict: HeroTutorDict
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0">
      <circle cx="12" cy="12" r="11" fill="#07C160" opacity="0.12" />
      <path d="M7 12.5 L10.5 16 L17 8.5" stroke="#07C160" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* Hero renders statically (no JS/animation gate) so the H1 + CTA are in the SSR HTML and
   paint immediately — the intro overlay (if it plays) sits on top and wipes away to reveal
   already-painted content. This protects LCP and guarantees the CTA is never blank even if
   the intro animation stalls on a low-end WeChat WebView. */
export default function HeroTutor({ dict }: HeroTutorProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-sakura/[0.07] blur-3xl" />
      <div aria-hidden className="absolute bottom-0 -left-28 w-[340px] h-[340px] rounded-full bg-sunshine/[0.1] blur-3xl" />

      <div className="section-container relative pt-24 pb-14 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          {/* Copy column */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium bg-sakura/10 text-sakura-dark border border-sakura/25">
              <span className="w-1.5 h-1.5 rounded-full bg-wechat" />
              {dict.eyebrow}
            </span>

            <h1 className="mt-5 font-display-zh font-bold text-charcoal text-[30px] leading-[1.35] sm:text-4xl lg:text-[44px] lg:leading-[1.3]">
              {dict.h1Line1}
              <br />
              {dict.h1Line2Pre}
              <span className="relative inline-block text-sakura-dark">
                {dict.h1Highlight}
                <svg aria-hidden className="absolute -bottom-1.5 left-0 w-full" height="7" viewBox="0 0 100 7" preserveAspectRatio="none">
                  <path d="M2 5 Q50 0.5 98 4" stroke="#FFD93D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
              {dict.h1Tail}
            </h1>

            <p className="mt-5 text-[15px] lg:text-base leading-relaxed text-charcoal-light max-w-[34em] mx-auto lg:mx-0">
              {dict.sub}
            </p>

            <ul className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2.5">
              {dict.points.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-[13.5px] font-medium text-charcoal">
                  <CheckIcon />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center lg:justify-start">
              <QrCta heading={dict.ctaPrimary} caption={dict.qrCaption} hint={dict.qrHint} wechatId={dict.wechatId} />
            </div>
          </div>

          {/* Demo column — auto-plays in a loop, pauses offscreen */}
          <div>
            <WeChatDemo dict={dict.demo} />
          </div>
        </div>
      </div>
    </section>
  )
}
