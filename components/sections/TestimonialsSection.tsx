'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

interface TestimonialsSectionProps {
  dict: {
    label: string
    heading: string
    prelaunchHeading: string
    prelaunchBody: string
    prelaunchCta: string
    emailPlaceholder: string
    quote1: string
    quote1Author: string
    quote2: string
    quote2Author: string
  }
  prelaunch?: boolean
}

export default function TestimonialsSection({
  dict,
  prelaunch = false,
}: TestimonialsSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const quotes = [
    { text: dict.quote1, author: dict.quote1Author },
    { text: dict.quote2, author: dict.quote2Author },
  ]

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: '#FFF5E4' }}
    >
      <div className="section-container">
        <FadeInUp className="text-center mb-4">
          <SectionLabel>{dict.label}</SectionLabel>
        </FadeInUp>

        <FadeInUp delay={0.05} className="text-center mb-12">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {prelaunch ? dict.prelaunchHeading : dict.heading}
          </h2>
        </FadeInUp>

        {prelaunch ? (
          <FadeInUp delay={0.1}>
            <div
              className="max-w-lg mx-auto text-center rounded-3xl p-10"
              style={{
                background: 'rgba(255,107,157,0.06)',
                border: '1px solid rgba(255,107,157,0.15)',
              }}
            >
              <div className="text-4xl mb-4">🌸</div>
              <p className="text-base leading-loose mb-8" style={{ color: '#636E72' }}>
                {dict.prelaunchBody}
              </p>
              {submitted ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-medium"
                  style={{ color: '#FF6B9D' }}
                >
                  已收到，感谢你的关注 🌸
                </motion.p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email) setSubmitted(true)
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.emailPlaceholder}
                    required
                    className="flex-1 px-4 py-3 rounded-full text-sm outline-none border transition-colors focus:border-sakura"
                    style={{
                      background: '#FAFBFF',
                      borderColor: 'rgba(255,107,157,0.2)',
                      color: '#2D3436',
                    }}
                  />
                  <Button variant="primary" size="md" type="submit">
                    {dict.prelaunchCta}
                  </Button>
                </form>
              )}
            </div>
          </FadeInUp>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {quotes.map((quote, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 h-full"
                  style={{
                    background: 'rgba(255,107,157,0.04)',
                    border: '1px solid rgba(255,107,157,0.1)',
                  }}
                >
                  <div
                    className="text-5xl leading-none mb-4 select-none"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      color: 'rgba(255,107,157,0.3)',
                    }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-sm leading-loose mb-4" style={{ color: '#2D3436' }}>
                    {quote.text}
                  </p>
                  <footer className="text-xs" style={{ color: '#636E72' }}>
                    &mdash; {quote.author}
                  </footer>
                </div>
              </FadeInUp>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
