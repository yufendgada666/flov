import HeaderReveal from '@/components/animations/HeaderReveal'
import FadeInX from '@/components/animations/FadeInX'
import SectionLabel from '@/components/ui/SectionLabel'

interface WhyDict {
  label: string
  heading: string
  quote1: string
  quote2: string
  leftTitle: string
  leftPoints: string[]
  rightTitle: string
  rightPoints: string[]
}

/* 为什么需要一台「只能学习」的手机：普通手机 vs 小伴学习机 */
export default function WhySection({ dict }: { dict: WhyDict }) {
  return (
    <section id="why" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-3xl mx-auto">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-5 font-display-zh text-charcoal text-lg sm:text-xl leading-relaxed font-bold">{dict.quote1}</p>
          <p className="mt-1 font-display-zh text-sakura-dark text-lg sm:text-xl leading-relaxed font-bold">{dict.quote2}</p>
        </HeaderReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 max-w-3xl mx-auto md:rounded-2xl md:overflow-hidden md:shadow-[0_18px_45px_-22px_rgba(45,52,54,0.25)]">
          {/* 普通手机 */}
          <FadeInX dir="left" className="rounded-2xl md:rounded-none bg-[#F2F3F5] px-7 py-7 border border-charcoal/[0.05] md:border-0">
            <div className="text-[15px] font-bold text-charcoal-light">{dict.leftTitle}</div>
            <ul className="mt-4 space-y-3">
              {dict.leftPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] text-charcoal-light">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0 text-charcoal-lighter">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M9 9 l6 6 M15 9 l-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </FadeInX>
          {/* 小伴学习机 */}
          <FadeInX dir="right" delay={0.12} className="rounded-2xl md:rounded-none bg-white px-7 py-7 border-2 border-sakura/30 md:border-0 md:border-l md:border-l-charcoal/[0.06] relative">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-sakura-dark">{dict.rightTitle}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sakura/10 text-sakura-dark font-medium">只能学习</span>
            </div>
            <ul className="mt-4 space-y-3">
              {dict.rightPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] font-medium text-charcoal">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0">
                    <circle cx="12" cy="12" r="11" fill="#07C160" opacity="0.12" />
                    <path d="M7 12.5 L10.5 16 L17 8.5" stroke="#07C160" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </FadeInX>
        </div>
      </div>
    </section>
  )
}
