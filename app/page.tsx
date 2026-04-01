import { cookies, headers } from 'next/headers'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import BrandStorySection from '@/components/sections/BrandStorySection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ProductSection from '@/components/sections/ProductSection'
import JourneySection from '@/components/sections/JourneySection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import CtaSection from '@/components/sections/CtaSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import WavyDivider from '@/components/garden/WavyDivider'

async function getLocale(): Promise<'zh' | 'en'> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('NEXT_LOCALE')?.value
  if (cookie === 'en' || cookie === 'zh') return cookie

  const headersList = await headers()
  const acceptLang = headersList.get('accept-language') || ''
  return acceptLang.startsWith('en') ? 'en' : 'zh'
}

async function getMessages(locale: string) {
  return (await import(`@/messages/${locale}.json`)).default
}

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getMessages(locale)

  return (
    <>
      <NavBar dict={t.nav} currentLocale={locale} />

      <main>
        <HeroSection dict={t.hero} />
        <WavyDivider variant={1} fillTop="#E8F5E8" fillBottom="#FFF5E4" />
        <BrandStorySection dict={t.brandStory} />
        <WavyDivider variant={2} fillTop="#FFF5E4" fillBottom="#FAFBFF" />
        <FeaturesSection dict={t.features} />
        <WavyDivider variant={3} fillTop="#FAFBFF" fillBottom="#FFF5E4" />
        <ProductSection dict={t.product} />
        <WavyDivider variant={4} fillTop="#FFF5E4" fillBottom="#FAFBFF" />
        <JourneySection dict={t.journey} />
        <WavyDivider variant={5} fillTop="#FAFBFF" fillBottom="#FAFBFF" />
        <HowItWorksSection dict={t.howItWorks} />
        <WavyDivider variant={3} fillTop="#FAFBFF" fillBottom="#FFF5E4" />
        <TestimonialsSection dict={t.testimonials} prelaunch />
        <WavyDivider variant={1} fillTop="#FFF5E4" fillBottom="#0F1B3D" />
        <CtaSection dict={t.candleToken} />
        <WavyDivider variant={2} fillTop="#0F1B3D" fillBottom="#FAFBFF" />
        <ContactSection dict={t.contact} />
      </main>

      <Footer dict={t.footer} />
    </>
  )
}
