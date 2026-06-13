import HeaderReveal from '@/components/animations/HeaderReveal'
import FadeInX from '@/components/animations/FadeInX'

interface CompareDict {
  quote1: string
  quote2: string
  leftTitle: string
  leftPoints: string[]
  rightTitle: string
  rightPoints: string[]
}

export default function CompareBlock({ dict }: { dict: CompareDict }) {
  return (
    <section className="section-padding">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-3xl mx-auto">
          <p className="font-display-zh text-charcoal text-xl sm:text-2xl lg:text-[28px] leading-relaxed font-bold">
            {dict.quote1}
          </p>
          <p className="mt-2 font-display-zh text-sakura-dark text-lg sm:text-xl lg:text-2xl leading-relaxed font-bold">
            {dict.quote2}
          </p>
        </HeaderReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 max-w-3xl mx-auto md:rounded-2xl md:overflow-hidden md:shadow-[0_18px_45px_-22px_rgba(45,52,54,0.25)]">
          {/* 搜题软件 */}
          <FadeInX dir="left" className="rounded-2xl md:rounded-none bg-[#F2F3F5] px-7 py-7 border border-charcoal/[0.05] md:border-0">
            <div className="text-[15px] font-bold text-charcoal-light">{dict.leftTitle}</div>
            <ul className="mt-4 space-y-3">
              {dict.leftPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[14px] text-charcoal-light">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0 text-charcoal-lighter">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8.5 12 h7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </FadeInX>
          {/* 小伴 */}
          <FadeInX dir="right" delay={0.12} className="rounded-2xl md:rounded-none bg-white px-7 py-7 border-2 border-sakura/30 md:border-0 md:border-l md:border-l-charcoal/[0.06] relative">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-sakura-dark">{dict.rightTitle}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sakura/10 text-sakura-dark font-medium">AI 辅导老师</span>
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
