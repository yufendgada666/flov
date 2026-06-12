import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface TrustDict {
  label: string
  heading: string
  items: { title: string; body: string }[]
}

const TRUST_ICONS = [
  /* shield-check 防抄袭 */
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3 L19 5.5 V11 c0 4.8 -3 8.2 -7 9.5 C8 19.2 5 15.8 5 11 V5.5 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M8.8 11.5 l2.2 2.2 l4.2 -4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
  /* book-focus 只聊学习 */
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M5 4.5 a1.5 1.5 0 0 1 1.5 -1.5 H19 v16 H6.5 A1.5 1.5 0 0 0 5 20.5 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M5 20.5 A1.5 1.5 0 0 1 6.5 19 H19" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9.5 8 h5 M9.5 11.5 h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>,
  /* eye-record 家长可查 */
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 12 q4.5 -6 9 -6 q4.5 0 9 6 q-4.5 6 -9 6 q-4.5 0 -9 -6 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
  /* spark-AI 优势 */
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3.5 l1.8 5 l5 1.8 l-5 1.8 l-1.8 5 l-1.8 -5 l-5 -1.8 l5 -1.8 Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M18.5 15.5 l0.9 2.3 l2.3 0.9 l-2.3 0.9 l-0.9 2.3 l-0.9 -2.3 l-2.3 -0.9 l2.3 -0.9 Z" fill="currentColor" opacity="0.55" />
  </svg>,
]

const ICON_TONES = [
  'bg-wechat/10 text-wechat-dark',
  'bg-sky/15 text-sky-dark',
  'bg-spring/10 text-spring-dark',
  'bg-sakura/10 text-sakura-dark',
]

export default function TrustGrid({ dict }: { dict: TrustDict }) {
  return (
    <section id="trust" className="section-padding bg-cream scroll-mt-16">
      <div className="section-container">
        <FadeInUp className="text-center">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
        </FadeInUp>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {dict.items.map((item, i) => (
            <FadeInUp key={item.title} delay={(i % 2) * 0.1}>
              <div
                className={`h-full bg-white rounded-2xl px-6 py-6 border ${
                  i === dict.items.length - 1 ? 'border-sakura/30' : 'border-charcoal/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${ICON_TONES[i % 4]}`}>
                    {TRUST_ICONS[i % 4]}
                  </span>
                  <h3 className="text-[16px] font-bold text-charcoal">{item.title}</h3>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-charcoal-light">{item.body}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
