'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import FlovLogo from '@/components/icons/FlovLogo'
import Button from '@/components/ui/Button'

interface NavBarProps {
  dict: {
    story: string
    product: string
    howItWorks: string
    investor: string
    contact: string
    requestAccess: string
    langToggle: string
  }
  currentLocale: string
}

const NAV_LINKS = [
  { labelKey: 'story', href: '#story' },
  { labelKey: 'product', href: '#product' },
  { labelKey: 'howItWorks', href: '#how-it-works' },
  { labelKey: 'contact', href: '#contact' },
] as const

export default function NavBar({ dict, currentLocale }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleLocale = () => {
    const next = currentLocale === 'zh' ? 'en' : 'zh'
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`
    window.location.reload()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? 'glass-light shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="hover:opacity-80 transition-opacity">
            <FlovLogo variant={scrolled ? 'dark' : 'garden'} showWordmark />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-sakura ${
                  scrolled ? 'text-charcoal-light' : 'text-charcoal/70'
                }`}
              >
                {dict[link.labelKey as keyof typeof dict]}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className={`hidden md:block text-sm font-medium transition-colors hover:text-sakura ${
                scrolled ? 'text-charcoal-light' : 'text-charcoal/60'
              }`}
            >
              {dict.langToggle}
            </button>
            <Button variant="primary" size="sm" className="hidden md:inline-flex">
              <a href="#contact">{dict.requestAccess}</a>
            </Button>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-charcoal' : 'text-charcoal/80'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
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
            className="md:hidden pb-4 border-t border-charcoal/10"
          >
            <nav className="flex flex-col gap-1 mt-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-2 py-2 text-sm rounded-lg text-charcoal-light hover:text-sakura hover:bg-sakura-50 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {dict[link.labelKey as keyof typeof dict]}
                </a>
              ))}
              <div className="flex items-center justify-between mt-3 px-2">
                <button onClick={toggleLocale} className="text-sm text-charcoal-light">
                  {dict.langToggle}
                </button>
                <Button variant="primary" size="sm">
                  <a href="#contact" onClick={() => setMenuOpen(false)}>{dict.requestAccess}</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
}
