import HeaderReveal from '@/components/animations/HeaderReveal'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface TeachDict {
  label: string
  heading: string
  sub: string
  steps: { title: string; body: string }[]
}

const STEP_TONES = [
  'bg-sakura text-white',
  'bg-sunshine text-charcoal',
  'bg-spring text-white',
  'bg-lavender text-white',
] as const

/* 它怎么教孩子：一次辅导的 4 步流程 */
export default function TeachFlow({ dict }: { dict: TeachDict }) {
  return (
    <section id="teach" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px]">{dict.sub}</p>
        </HeaderReveal>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {dict.steps.map((s, i) => (
            <FadeInUp key={s.title} delay={i * 0.1} className="relative">
              <div className="h-full bg-white rounded-2xl border border-charcoal/[0.06] shadow-[0_10px_28px_-16px_rgba(45,52,54,0.16)] px-6 py-6">
                <span
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-display-en font-semibold text-base ${STEP_TONES[i % 4]}`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3.5 text-[16px] font-bold text-charcoal">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal-light">{s.body}</p>
              </div>
              {i < dict.steps.length - 1 && (
                <span aria-hidden className="hidden lg:flex absolute top-1/2 -right-[14px] -translate-y-1/2 z-10 text-charcoal-lighter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
