import ScaleSettle from '@/components/animations/ScaleSettle'
import SectionLabel from '@/components/ui/SectionLabel'

interface PricingDict {
  label: string
  heading: string
  price: string
  unit: string
  note: string
}

export default function PricingPlaceholder({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" className="pb-20 lg:pb-28 scroll-mt-16">
      <div className="section-container">
        <ScaleSettle className="max-w-md mx-auto">
          <div className="rounded-2xl border border-dashed border-charcoal/20 bg-white px-8 py-8 text-center">
            <SectionLabel>{dict.label}</SectionLabel>
            <h2 className="mt-4 font-display-zh font-bold text-charcoal text-xl sm:text-2xl">{dict.heading}</h2>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="font-display-en text-4xl font-semibold text-charcoal/40 tracking-wide">{dict.price}</span>
              <span className="text-charcoal-light/70 text-sm">{dict.unit}</span>
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-charcoal-light">{dict.note}</p>
          </div>
        </ScaleSettle>
      </div>
    </section>
  )
}
