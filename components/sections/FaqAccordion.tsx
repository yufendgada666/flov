'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'

interface FaqDict {
  label: string
  heading: string
  items: { q: string; a: string }[]
}

export default function FaqAccordion({ dict }: { dict: FaqDict }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-snow scroll-mt-16">
      <div className="section-container">
        <FadeInUp className="text-center">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1} className="mt-10 max-w-2xl mx-auto">
          <div className="divide-y divide-charcoal/[0.07] rounded-2xl border border-charcoal/[0.07] bg-white overflow-hidden">
            {dict.items.map((item, i) => {
              const open = openIdx === i
              return (
                <div key={item.q}>
                  <h3>
                    <button
                      id={`faq-q-${i}`}
                      aria-expanded={open}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 text-left text-[15px] font-medium text-charcoal hover:bg-snow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura focus-visible:ring-inset"
                    >
                      {item.q}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                        className={`flex-shrink-0 text-charcoal-light transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      >
                        <path d="M5 9 L12 16 L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-7 pb-5 text-[14px] leading-relaxed text-charcoal-light">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
