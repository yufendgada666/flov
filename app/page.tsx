import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import IntroProvider from '@/components/intro/IntroProvider'
import HeroTutor from '@/components/sections/HeroTutor'
import StepsRow from '@/components/sections/StepsRow'
import FeatureGrid from '@/components/sections/FeatureGrid'
import CompareBlock from '@/components/sections/CompareBlock'
import ReportCard from '@/components/sections/ReportCard'
import TrustGrid from '@/components/sections/TrustGrid'
import FaqAccordion from '@/components/sections/FaqAccordion'
import PricingPlaceholder from '@/components/sections/PricingPlaceholder'
import FinalCta from '@/components/sections/FinalCta'

// Landing copy is zh-only for now. Forcing 'zh' also keeps English-locale
// browsers off the legacy en.json (old schema — would crash on missing keys).
async function getLocale(): Promise<'zh'> {
  return 'zh'
}

async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default
}

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getMessages(locale)

  return (
    <>
      <NavBar dict={t.nav} />

      <IntroProvider dict={t.intro}>
        {/* One continuous color journey — warm blush → cream → snow, breathing back and
            forth, then dusk-fading into the charcoal footer. No band edges anywhere. */}
        <main
          style={{
            background: `linear-gradient(180deg,
              #FFF7F0 0%,
              #FFF2E3 13%,
              #FBF4EA 24%,
              #F7F8FD 37%,
              #FBF3E6 50%,
              #F7F9FE 62%,
              #FDF2E4 72%,
              #F8F9FE 82%,
              #FFEFF2 91%,
              #FFF3EC calc(100% - 220px),
              #4A4F52 calc(100% - 40px),
              #2D3436 100%)`,
          }}
        >
          {/* 1 · Hero — H1 + WeChat live demo + scan CTA */}
          <HeroTutor dict={t.hero} />

          {/* 2 · 三步开始 */}
          <StepsRow dict={t.steps} />

          {/* 3 · 六大特色 */}
          <FeatureGrid dict={t.features} />

          {/* 4 · 搜题软件 vs 小伴 */}
          <CompareBlock dict={t.compare} />

          {/* 5 · 家长报告样例 */}
          <ReportCard dict={t.report} />

          {/* 6 · 信任与安全 */}
          <TrustGrid dict={t.trust} />

          {/* 7 · FAQ + 价格占位 + 底部扫码 */}
          <FaqAccordion dict={t.faq} />
          <PricingPlaceholder dict={t.pricing} />
          <FinalCta dict={t.cta} />

          {/* Dusk runway — the gradient's fade into the footer happens here */}
          <div aria-hidden className="h-56" />
        </main>
      </IntroProvider>

      <Footer dict={t.footer} />
    </>
  )
}
