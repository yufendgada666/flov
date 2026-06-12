'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FlovLogo from '@/components/icons/FlovLogo'

interface NavBarProps {
  dict: {
    how: string
    features: string
    report: string
    faq: string
    cta: string
  }
}

const NAV_LINKS = [
  { labelKey: 'how', href: '#how' },
  { labelKey: 'features', href: '#features' },
  { labelKey: 'report', href: '#report' },
  { labelKey: 'faq', href: '#faq' },
] as const

export default function NavBar({ dict }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-light shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="hover:opacity-80 transition-opacity" aria-label="小伴 · FLOV 首页">
            <FlovLogo variant="dark" showWordmark />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-charcoal-light hover:text-sakura transition-colors duration-200"
              >
                {dict[link.labelKey]}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#cta"
              className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium bg-sakura text-white shadow-md shadow-sakura/25 hover:bg-sakura-dark hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {dict.cta}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-charcoal transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="打开菜单"
              aria-expanded={menuOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                {menuOpen ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-charcoal/10 glass-light -mx-6 px-6"
          >
            <nav className="flex flex-col gap-1 mt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2.5 text-sm rounded-lg text-charcoal-light hover:text-sakura hover:bg-sakura-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {dict[link.labelKey]}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-sm font-medium bg-sakura text-white"
              >
                {dict.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
