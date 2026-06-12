import HeaderReveal from '@/components/animations/HeaderReveal'
import ScaleSettle from '@/components/animations/ScaleSettle'
import SectionLabel from '@/components/ui/SectionLabel'
import XiaoBanAvatar from '@/components/ui/XiaoBanAvatar'

interface ReportDict {
  label: string
  heading: string
  sub: string
  sampleTime: string
  sampleBody: string
  note: string
}

export default function ReportCard({ dict }: { dict: ReportDict }) {
  return (
    <section id="report" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px] leading-relaxed">{dict.sub}</p>
        </HeaderReveal>

        {/* WeChat-style message strip */}
        <ScaleSettle delay={0.1} className="mt-10 max-w-xl mx-auto">
          <div className="rounded-2xl bg-wechat-bg px-4 py-5 sm:px-6 shadow-[0_18px_45px_-22px_rgba(45,52,54,0.28)] border border-charcoal/[0.05]">
            <div className="text-center mb-4">
              <span className="text-[11px] text-charcoal-light/70">{dict.sampleTime}</span>
            </div>
            <div className="flex items-start gap-2.5">
              <XiaoBanAvatar size={38} />
              <div className="min-w-0">
                <div className="text-[11px] text-charcoal-light/80 mb-1">小伴</div>
                <div className="relative bg-white rounded-[6px] px-4 py-3 text-[14px] leading-[1.8] text-wechat-text shadow-sm">
                  <span aria-hidden className="absolute top-[14px] -left-[3px] w-2 h-2 rotate-45 bg-white" />
                  {dict.sampleBody}
                </div>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-[13px] leading-relaxed text-charcoal-light px-4">{dict.note}</p>
        </ScaleSettle>
      </div>
    </section>
  )
}
