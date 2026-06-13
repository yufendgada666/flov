import FadeInUp from '@/components/animations/FadeInUp'
import HeaderReveal from '@/components/animations/HeaderReveal'
import SectionLabel from '@/components/ui/SectionLabel'

interface StepsRowDict {
  label: string
  heading: string
  sub: string
  items: { title: string; body: string }[]
}

const STEP_COLORS = ['bg-sakura', 'bg-sunshine', 'bg-spring'] as const
const STEP_TEXT = ['text-white', 'text-charcoal', 'text-white'] as const

export default function StepsRow({ dict }: { dict: StepsRowDict }) {
  return (
    <section id="how" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px]">{dict.sub}</p>
        </HeaderReveal>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {dict.items.map((step, i) => (
            <FadeInUp key={step.title} delay={i * 0.12} className="relative">
              <div className="relative h-full bg-white rounded-2xl border border-charcoal/[0.06] shadow-[0_12px_30px_-16px_rgba(45,52,54,0.18)] px-6 py-7 text-center md:text-left transition-transform duration-300 hover:-translate-y-1 active:scale-[0.99]">
                <span
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-display-en font-semibold text-lg ${STEP_COLORS[i % 3]} ${STEP_TEXT[i % 3]}`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-charcoal">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-charcoal-light">{step.body}</p>
              </div>
              {i < dict.items.length - 1 && (
                <span
                  aria-hidden
                  className="hidden md:flex absolute top-1/2 -right-[18px] -translate-y-1/2 z-10 text-charcoal-lighter"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5 L16 12 L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
