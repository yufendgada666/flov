import HeaderReveal from '@/components/animations/HeaderReveal'
import ScaleSettle from '@/components/animations/ScaleSettle'
import QrCta from '@/components/ui/QrCta'

interface FinalCtaDict {
  heading: string
  sub: string
  qrCaption: string
  qrHint: string
}

export default function FinalCta({ dict }: { dict: FinalCtaDict }) {
  return (
    <section
      id="cta"
      className="section-sheet overflow-hidden section-padding scroll-mt-16"
      style={{ background: 'linear-gradient(170deg, #FFF0F5 0%, #FFF5E4 55%, #FFF9F2 100%)' }}
    >
      <div aria-hidden className="absolute -top-20 right-[8%] w-72 h-72 rounded-full bg-sakura/[0.08] blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 left-[5%] w-80 h-80 rounded-full bg-wechat/[0.06] blur-3xl" />

      <div className="section-container relative">
        <HeaderReveal className="text-center max-w-2xl mx-auto">
          <h2 className="font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-[40px] lg:leading-snug">
            {dict.heading}
          </h2>
          <p className="mt-4 text-charcoal-light text-[15px] lg:text-base">{dict.sub}</p>
        </HeaderReveal>

        <ScaleSettle delay={0.12} className="mt-9 flex justify-center">
          <QrCta size="lg" caption={dict.qrCaption} hint={dict.qrHint} />
        </ScaleSettle>
      </div>
    </section>
  )
}
