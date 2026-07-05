import HeaderReveal from '@/components/animations/HeaderReveal'
import ScaleSettle from '@/components/animations/ScaleSettle'
import FadeInUp from '@/components/animations/FadeInUp'
import QrCta from '@/components/ui/QrCta'

interface ContactDict {
  heading: string
  sub: string
  qrCaption: string
  qrHint: string
  wechatId: string
  email: string
  phone: string
}

/* 底部强引导：扫码加微信（主）+ 邮箱 / 电话（辅） */
export default function ContactCta({ dict }: { dict: ContactDict }) {
  const phonePending = dict.phone.includes('待填')
  return (
    <section id="cta" className="relative overflow-hidden section-padding scroll-mt-16">
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
          <QrCta size="lg" caption={dict.qrCaption} hint={dict.qrHint} wechatId={dict.wechatId} />
        </ScaleSettle>

        {/* 其他联系方式 */}
        <FadeInUp delay={0.18} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <a
            href={`mailto:${dict.email}`}
            className="inline-flex items-center gap-2 text-[14px] text-charcoal-light hover:text-sakura transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
              <path d="M4 7 L12 13 L20 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {dict.email}
          </a>
          <span className="inline-flex items-center gap-2 text-[14px] text-charcoal-light">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 3.5 h3 l1.5 4.5 -2 1.5 a12 12 0 0 0 6 6 l1.5 -2 4.5 1.5 v3 a2 2 0 0 1 -2 2 A16.5 16.5 0 0 1 4 5.5 a2 2 0 0 1 2 -2 Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
            {phonePending ? (
              <span className="text-charcoal-lighter">
                {dict.phone}
                <span className="ml-1 text-[11px] px-1.5 py-0.5 rounded bg-sunshine/25 text-charcoal-light">TODO</span>
              </span>
            ) : (
              <a href={`tel:${dict.phone}`} className="hover:text-sakura transition-colors">
                {dict.phone}
              </a>
            )}
          </span>
        </FadeInUp>
      </div>
    </section>
  )
}
