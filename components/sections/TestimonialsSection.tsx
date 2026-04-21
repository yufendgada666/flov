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
    quote1?: string
    quote1Author?: string
    quote1Meta?: string
    quote2?: string
    quote2Author?: string
    quote2Meta?: string
    quote3?: string
    quote3Author?: string
    quote3Meta?: string
  }
  prelaunch?: boolean
}

const ACCENTS = [
  { bar: '#FF6B9D', seal: '小' },
  { bar: '#2EC4B6', seal: '声' },
  { bar: '#A78BFA', seal: '家' },
]

export default function TestimonialsSection({
  dict,
  prelaunch = false,
}: TestimonialsSectionProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // Only show quote cards if we have real quotes (non-prelaunch mode).
  const realQuotes = (!prelaunch &&
    [
      dict.quote1 && dict.quote1Author
        ? { text: dict.quote1, author: dict.quote1Author, meta: dict.quote1Meta }
        : null,
      dict.quote2 && dict.quote2Author
        ? { text: dict.quote2, author: dict.quote2Author, meta: dict.quote2Meta }
        : null,
      dict.quote3 && dict.quote3Author
        ? { text: dict.quote3, author: dict.quote3Author, meta: dict.quote3Meta }
        : null,
    ].filter(Boolean)) as
    | { text: string; author: string; meta?: string }[]
    | false

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

        <FadeInUp delay={0.05} className="text-center mb-4">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-6"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif', color: '#2D3436' }}
          >
            {prelaunch ? dict.prelaunchHeading : dict.heading}
          </h2>
        </FadeInUp>

        {/* Real user quotes — only rendered when provided (post-launch) */}
        {realQuotes && realQuotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14 mt-10">
            {realQuotes.map((q, i) => (
              <FadeInUp key={i} delay={0.1 + i * 0.08}>
                <article
                  className="relative h-full rounded-2xl p-6 pt-8 bg-white/70 backdrop-blur-sm"
                  style={{
                    border: '1px solid rgba(45,52,54,0.06)',
                    boxShadow: '0 4px 24px -8px rgba(178,59,46,0.06)',
                  }}
                >
                  <span
                    className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                    style={{ background: ACCENTS[i % 3].bar, opacity: 0.6 }}
                  />
                  <div
                    className="absolute -top-4 left-6 text-5xl leading-none select-none"
                    style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      color: ACCENTS[i % 3].bar,
                      opacity: 0.35,
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>
                  <div className="seal absolute -top-3 right-5 w-8 h-8 text-xs rotate-6" aria-hidden>
                    {ACCENTS[i % 3].seal}
                  </div>
                  <p
                    className="text-[15px] leading-loose mb-6"
                    style={{ color: '#2D3436', fontFamily: 'var(--font-noto-serif-sc), serif' }}
                  >
                    {q.text}
                  </p>
                  <footer className="flex items-center gap-2 text-xs pt-4 border-t border-dashed border-charcoal/10">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-semibold"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENTS[i % 3].bar}, ${ACCENTS[i % 3].bar}aa)`,
                      }}
                    >
                      {q.author.slice(0, 1)}
                    </span>
                    <div>
                      <div className="font-medium text-charcoal">{q.author}</div>
                      {q.meta && <div className="text-[11px] text-charcoal-light">{q.meta}</div>}
                    </div>
                  </footer>
                </article>
              </FadeInUp>
            ))}
          </div>
        )}

        {/* Prelaunch email capture — standalone card, no fabricated quotes */}
        {prelaunch && (
          <FadeInUp delay={0.1}>
            <div
              className="max-w-xl mx-auto text-center rounded-3xl p-8 md:p-10 mt-6"
              style={{
                background: 'rgba(255,107,157,0.06)',
                border: '1px solid rgba(255,107,157,0.15)',
              }}
            >
              <div className="text-3xl mb-4" aria-hidden>
                🕯️
              </div>
              <p
                className="text-base leading-loose mb-8 max-w-md mx-auto"
                style={{ color: '#636E72' }}
              >
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
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={dict.emailPlaceholder}
                    required
                    className="flex-1 min-w-0 px-4 py-3 rounded-full text-sm outline-none border transition-colors focus:border-sakura"
                    style={{
                      background: '#FAFBFF',
                      borderColor: 'rgba(255,107,157,0.2)',
                      color: '#2D3436',
                    }}
                  />
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="shrink-0 whitespace-nowrap"
                  >
                    {dict.prelaunchCta}
                  </Button>
                </form>
              )}
            </div>
          </FadeInUp>
        )}
      </div>
    </section>
  )
}
