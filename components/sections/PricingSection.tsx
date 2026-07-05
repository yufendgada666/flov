import HeaderReveal from '@/components/animations/HeaderReveal'
import ScaleSettle from '@/components/animations/ScaleSettle'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface PricingDict {
  label: string
  heading: string
  sub: string
  firstMonth: { price: string; title: string; lines: string[] }
  monthly: { price: string; title: string; lines: string[] }
  ownership: string
  refund: string[]
  cta: string
}

export default function PricingSection({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px]">{dict.sub}</p>
        </HeaderReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-3xl mx-auto">
          {/* 首月 */}
          <ScaleSettle>
            <div className="h-full bg-white rounded-2xl border-2 border-sakura/30 px-7 py-7 text-center shadow-[0_18px_45px_-22px_rgba(45,52,54,0.22)]">
              <div className="text-[13px] font-bold text-sakura-dark tracking-wider">{dict.firstMonth.title}</div>
              <div className="mt-2 font-display-en text-[44px] leading-none font-semibold text-charcoal">
                {dict.firstMonth.price}
              </div>
              <ul className="mt-5 space-y-2">
                {dict.firstMonth.lines.map((l) => (
                  <li key={l} className="text-[13.5px] text-charcoal-light">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </ScaleSettle>
          {/* 次月起 */}
          <ScaleSettle delay={0.1}>
            <div className="h-full bg-white rounded-2xl border border-charcoal/[0.07] px-7 py-7 text-center shadow-[0_18px_45px_-22px_rgba(45,52,54,0.16)]">
              <div className="text-[13px] font-bold text-charcoal-light tracking-wider">{dict.monthly.title}</div>
              <div className="mt-2 font-display-en text-[44px] leading-none font-semibold text-charcoal">
                {dict.monthly.price}
              </div>
              <ul className="mt-5 space-y-2">
                {dict.monthly.lines.map((l) => (
                  <li key={l} className="text-[13.5px] text-charcoal-light">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </ScaleSettle>
        </div>

        {/* 满 12 个月机器归你 */}
        <FadeInUp delay={0.12} className="mt-6 max-w-3xl mx-auto">
          <div className="rounded-2xl px-6 py-4 text-center bg-sunshine/20 border border-sunshine/40">
            <span className="text-[14.5px] font-bold text-charcoal">🎁 {dict.ownership}</span>
          </div>
        </FadeInUp>

        {/* 退订政策 */}
        <FadeInUp delay={0.18} className="mt-6 max-w-3xl mx-auto">
          <div className="rounded-2xl border border-charcoal/[0.07] bg-white px-6 py-5">
            <div className="text-[13px] font-bold text-charcoal mb-3">退订政策</div>
            <ul className="space-y-2">
              {dict.refund.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[13px] text-charcoal-light leading-relaxed">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden className="flex-shrink-0 mt-0.5 text-spring-dark">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 12.5 L11 15.5 L16 9.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.22} className="mt-8 text-center">
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-[15px] font-medium bg-wechat text-white shadow-[0_10px_30px_-8px_rgba(7,193,96,0.5)] hover:bg-wechat-dark hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            {dict.cta}
          </a>
        </FadeInUp>
      </div>
    </section>
  )
}
