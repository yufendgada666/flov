'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import GardenScene from '@/components/garden/GardenScene'
import Button from '@/components/ui/Button'
import { poemStagger, poemLine, fadeInUp } from '@/components/animations/variants'

interface HeroSectionProps {
  dict: {
    poemLine1: string
    poemLine2: string
    poemAuthor: string
    tagline: string
    subTagline: string
    cta: string
    ctaSecondary: string
  }
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const controls = useAnimation()

  useEffect(() => {
    // Delay initial animation to let garden scene settle
    const timer = setTimeout(() => controls.start('visible'), 800)
    return () => clearTimeout(timer)
  }, [controls])

  return (
    <section id="top">
      <GardenScene>
        <div className="text-center max-w-3xl mx-auto">
          {/* Poem */}
          <motion.div variants={poemStagger} initial="hidden" animate={controls} className="mb-6">
            <motion.p
              variants={poemLine}
              className="text-2xl md:text-3xl lg:text-4xl leading-loose mb-1"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
                color: '#2D3436',
                letterSpacing: '0.1em',
                textShadow: '0 2px 12px rgba(255,255,255,0.5)',
              }}
            >
              {dict.poemLine1}
            </motion.p>
            <motion.p
              variants={poemLine}
              className="text-2xl md:text-3xl lg:text-4xl leading-loose"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
                color: '#2D3436',
                letterSpacing: '0.1em',
                textShadow: '0 2px 12px rgba(255,255,255,0.5)',
              }}
            >
              {dict.poemLine2}
            </motion.p>
            <motion.p
              variants={poemLine}
              className="mt-3 text-sm tracking-widest"
              style={{ color: '#636E72' }}
            >
              {dict.poemAuthor}
            </motion.p>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            className="flex items-center justify-center gap-3 my-6"
            transition={{ delay: 0.6 }}
          >
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, #FF6B9D)' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: '#FF6B9D' }} />
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, #FF6B9D, transparent)' }} />
          </motion.div>

          {/* Tagline */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.8 }}
          >
            <h1
              className="text-xl md:text-2xl lg:text-3xl font-bold mb-3"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
                color: '#2D3436',
              }}
            >
              {dict.tagline}
            </h1>
            <p className="text-sm md:text-base max-w-md mx-auto leading-relaxed" style={{ color: '#636E72' }}>
              {dict.subTagline}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
          >
            <Button variant="primary" size="lg">
              <a href="#product">{dict.cta}</a>
            </Button>
            <Button variant="secondary" size="lg">
              <a href="#story">{dict.ctaSecondary}</a>
            </Button>
          </motion.div>
        </div>
      </GardenScene>
    </section>
  )
}
