import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface FeatureItem {
  icon: string
  title: string
  body: string
}

interface FeatureGridDict {
  label: string
  heading: string
  sub: string
  items: FeatureItem[]
}

const ICON_BG: Record<string, string> = {
  method: 'bg-sakura/10 text-sakura-dark',
  ask: 'bg-spring/10 text-spring-dark',
  input: 'bg-sky/15 text-sky-dark',
  subjects: 'bg-lavender/15 text-lavender-dark',
  practice: 'bg-sunshine/20 text-sunshine-dark',
  reportIcon: 'bg-wechat/10 text-wechat-dark',
}

function FeatureIcon({ name }: { name: string }) {
  const stroke = 'currentColor'
  switch (name) {
    case 'method':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 19 C8 16, 8 8, 12 8 C16 8, 16 16, 19 13" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="4.5" r="1.8" stroke={stroke} strokeWidth="1.6" />
          <path d="M4 5 L8 9 M8 5 L4 9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
        </svg>
      )
    case 'ask':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 5 h13 a2 2 0 0 1 2 2 v6 a2 2 0 0 1 -2 2 H10 l-4 3.5 V15 H6 a2 2 0 0 1 -2 -2 Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M9.6 9 q0 -1.8 1.9 -1.8 q1.9 0 1.9 1.6 q0 1.2 -1.5 1.7 l-0.4 0.2 v1" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="11.5" cy="13.6" r="0.8" fill={stroke} />
        </svg>
      )
    case 'input':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3.5" y="6.5" width="12" height="10" rx="2" stroke={stroke} strokeWidth="1.7" />
          <circle cx="9.5" cy="11.5" r="2.4" stroke={stroke} strokeWidth="1.6" />
          <path d="M18.5 9.5 q2.5 2 0 4.5 M20.5 7.5 q4 3.5 0 8.2" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
      )
    case 'subjects':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 6 a2 2 0 0 1 2 -2 h5 v16 H6 a2 2 0 0 1 -2 -2 Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M20 6 a2 2 0 0 0 -2 -2 h-5 v16 h5 a2 2 0 0 0 2 -2 Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M6.5 8.5 h2.5 M6.5 11.5 h2.5 M15 8.5 h2.5 M15 11.5 h2.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'practice':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 3.5 h9 l4 4 V20.5 a1.5 1.5 0 0 1 -1.5 1.5 h-11.5 a1.5 1.5 0 0 1 -1.5 -1.5 V5 a1.5 1.5 0 0 1 1.5 -1.5 Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8 11 l2 2 l4 -4.5" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 16.5 h7" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="4" y="3.5" width="16" height="17" rx="2.5" stroke={stroke} strokeWidth="1.7" />
          <path d="M8.5 13 v3.5 M12 10 v6.5 M15.5 7.5 v9" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
  }
}

export default function FeatureGrid({ dict }: { dict: FeatureGridDict }) {
  return (
    <section id="features" className="section-padding bg-snow scroll-mt-16">
      <div className="section-container">
        <FadeInUp className="text-center">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px]">{dict.sub}</p>
        </FadeInUp>

        <div className="mt-10 lg:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {dict.items.map((f, i) => (
            <FadeInUp key={f.title} delay={(i % 3) * 0.1}>
              <div className="group h-full bg-white rounded-2xl border border-charcoal/[0.06] px-6 py-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-20px_rgba(45,52,54,0.25)]">
                <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${ICON_BG[f.icon] ?? ICON_BG.method}`}>
                  <FeatureIcon name={f.icon} />
                </span>
                <h3 className="mt-4 text-[16.5px] font-bold text-charcoal">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-charcoal-light">{f.body}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
