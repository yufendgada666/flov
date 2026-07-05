import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import IntroProvider from '@/components/intro/IntroProvider'
import AmbientCanvas from '@/components/garden/AmbientCanvas'
import StickyCta from '@/components/ui/StickyCta'
import HeroDevice from '@/components/sections/HeroDevice'
import WhySection from '@/components/sections/WhySection'
import FeatureGrid from '@/components/sections/FeatureGrid'
import DeviceGallery from '@/components/sections/DeviceGallery'
import TeachFlow from '@/components/sections/TeachFlow'
import ReportCard from '@/components/sections/ReportCard'
import PricingSection from '@/components/sections/PricingSection'
import TrustGrid from '@/components/sections/TrustGrid'
import FaqAccordion from '@/components/sections/FaqAccordion'
import ContactCta from '@/components/sections/ContactCta'

// Landing copy is zh-only. Forcing 'zh' keeps locale resolution deterministic.
async function getLocale(): Promise<'zh'> {
  return 'zh'
}

async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default
}

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getMessages(locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: '北京花声智能科技有限公司',
        alternateName: '花声科技 FLOV',
        url: 'https://flov.cheerai.cn',
        logo: 'https://flov.cheerai.cn/icon.svg',
        email: 'yufeng@flov.la',
      },
      { '@type': 'WebSite', name: '小伴 AI 学习机', url: 'https://flov.cheerai.cn' },
      {
        '@type': 'Product',
        name: '小伴 AI 学习机',
        description:
          '一台只能学习的 AI 学习机：孩子拍照或语音提问，不给答案、一步步教方法；无法安装其他应用；每天向家长发送学习报告。',
        brand: { '@type': 'Brand', name: '花声 FLOV' },
        image: 'https://flov.cheerai.cn/opengraph-image',
        offers: {
          '@type': 'Offer',
          price: '399',
          priceCurrency: 'CNY',
          availability: 'https://schema.org/InStock',
          description: '首月 399 元（含机器、首月 AI 辅导与流量）；次月起 99 元/月；连续满 12 个月机器归用户。',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((it: { q: string; a: string }) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-sakura focus:text-white focus:text-sm focus:font-medium focus:shadow-lg"
      >
        跳到主要内容
      </a>

      <NavBar dict={t.nav} />

      <IntroProvider dict={t.intro}>
        {/* 「花瓣的一天」ambient layer — petals by day, fireflies at dusk */}
        <AmbientCanvas />

        {/* One continuous color journey — warm blush → cream → snow, breathing back and
            forth, then dusk-fading into the charcoal footer. No band edges anywhere. */}
        <main
          style={{
            background: `linear-gradient(180deg,
              #FFF7F0 0%,
              #FFF2E3 11%,
              #FBF4EA 21%,
              #F7F8FD 32%,
              #FBF3E6 43%,
              #F7F9FE 54%,
              #FDF2E4 64%,
              #F8F9FE 74%,
              #FBF4EA 82%,
              #FFEFF2 89%,
              #FFF3EC calc(100% - 270px),
              #EADCD2 calc(100% - 205px),
              #B7AAA2 calc(100% - 145px),
              #837971 calc(100% - 90px),
              #4E5256 calc(100% - 38px),
              #2D3436 100%)`,
          }}
        >
          {/* 1 · Hero — 设备主视觉 + 实时辅导演示 + 扫码咨询 */}
          <HeroDevice dict={t.hero} />

          {/* 2 · 为什么需要一台只能学习的手机 */}
          <WhySection dict={t.why} />

          {/* 3 · 硬件亮点 */}
          <FeatureGrid dict={t.features} />

          {/* 4 · 设备外观 + 规格 */}
          <DeviceGallery dict={t.gallery} />

          {/* 5 · 它怎么教孩子 */}
          <TeachFlow dict={t.teach} />

          {/* 6 · 家长报告样例 */}
          <ReportCard dict={t.report} />

          {/* 7 · 价格 */}
          <PricingSection dict={t.pricing} />

          {/* 8 · 信任与安全 */}
          <TrustGrid dict={t.trust} />

          {/* 9 · FAQ */}
          <FaqAccordion dict={t.faq} />

          {/* 10 · 强引导加微信 */}
          <ContactCta dict={t.cta} />

          {/* Dusk runway — the gradient's fade into the footer happens here */}
          <div aria-hidden className="h-56" />
        </main>
      </IntroProvider>

      <Footer dict={t.footer} />

      <StickyCta label={t.cta.sticky} />
    </>
  )
}
