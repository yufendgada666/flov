'use client'

import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import StaggerContainer from '@/components/animations/StaggerContainer'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import TypewriterChat from '@/components/ui/TypewriterChat'
import { fadeInUp } from '@/components/animations/variants'

interface ProductSectionProps {
  dict: {
    label: string
    heading: string
    subheading: string
    feature1Title: string
    feature1Body: string
    feature2Title: string
    feature2Body: string
    feature3Title: string
    feature3Body: string
    feature4Title: string
    feature4Body: string
    cta: string
    chatMsg1: string
    chatMsg2: string
    chatMsg3: string
    chatMsg4: string
    chatLabel: string
  }
}

const FEATURE_COLORS = ['#FF6B9D', '#2EC4B6', '#FFD93D', '#A78BFA']

export default function ProductSection({ dict }: ProductSectionProps) {
  const features = [
    { title: dict.feature1Title, body: dict.feature1Body },
    { title: dict.feature2Title, body: dict.feature2Body },
    { title: dict.feature3Title, body: dict.feature3Body },
    { title: dict.feature4Title, body: dict.feature4Body },
  ]

  const chatMessages = [
    { text: dict.chatMsg1, from: 'child' as const },
    { text: dict.chatMsg2, from: 'ai' as const },
    { text: dict.chatMsg3, from: 'child' as const },
    { text: dict.chatMsg4, from: 'ai' as const },
  ]

  return (
    <section id="demo" className="section-padding" style={{ background: '#FFF5E4' }}>
      <div className="section-container">
        <FadeInUp className="text-center mb-4">
          <SectionLabel>{dict.label}</SectionLabel>
        </FadeInUp>

        <FadeInUp delay={0.05} className="text-center mb-4">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1} className="text-center mb-16">
          <p
            className="text-base lg:text-lg max-w-2xl mx-auto leading-loose mt-4"
            style={{ color: '#636E72' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <TypewriterChat messages={chatMessages} aiLabel={dict.chatLabel} />
          </motion.div>

          {/* Features */}
          <StaggerContainer className="space-y-5" slow>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex gap-4 items-start p-4 rounded-xl transition-colors duration-300 group"
                style={{ borderBottom: `1px solid ${FEATURE_COLORS[i]}15` }}
                whileHover={{ backgroundColor: `${FEATURE_COLORS[i]}08` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${FEATURE_COLORS[i]}15` }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: FEATURE_COLORS[i] }}
                  />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold mb-1"
                    style={{ color: '#2D3436' }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-loose" style={{ color: '#636E72' }}>
                    {feature.body}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="pt-4">
              <Button variant="primary" size="lg">
                <a href="#contact">{dict.cta}</a>
              </Button>
            </motion.div>
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
