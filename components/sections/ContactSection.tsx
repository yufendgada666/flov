'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import Button from '@/components/ui/Button'

interface ContactSectionProps {
  dict: {
    label: string
    heading: string
    subheading: string
    namePlaceholder: string
    emailPlaceholder: string
    rolePlaceholder: string
    roleParent: string
    roleInvestor: string
    rolePartner: string
    rolePress: string
    messagePlaceholder: string
    submit: string
    submitting: string
    successMsg: string
    wechat: string
    email: string
  }
}

export default function ContactSection({ dict }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const roles = [
    { value: 'parent', label: dict.roleParent },
    { value: 'investor', label: dict.roleInvestor },
    { value: 'partner', label: dict.rolePartner },
    { value: 'press', label: dict.rolePress },
  ]

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(243,199,122,0.18)',
    color: '#F5EDD8',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
    fontFamily: 'inherit',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSuccess(true)
  }

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden night-grain"
      style={{
        background:
          'radial-gradient(ellipse 800px 500px at 50% 30%, rgba(243,199,122,0.06) 0%, transparent 60%), linear-gradient(180deg, #070B18 0%, #0E1626 100%)',
      }}
    >
      <div className="section-container relative z-10">
        <FadeInUp className="text-center mb-3">
          <div
            className="inline-flex items-center gap-3 text-xs tracking-[0.35em] uppercase en-display"
            style={{ color: 'rgba(243,199,122,0.75)' }}
          >
            <span className="h-px w-10 bg-candle-glow/40" />
            {dict.label}
            <span className="h-px w-10 bg-candle-glow/40" />
          </div>
        </FadeInUp>

        <FadeInUp delay={0.05} className="text-center mb-4">
          <h2
            className="text-3xl lg:text-4xl font-bold mt-5 candle-glow-text"
            style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
          >
            {dict.heading}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1} className="text-center mb-12">
          <p
            className="text-base lg:text-lg max-w-xl mx-auto leading-loose"
            style={{ color: 'rgba(232,221,193,0.7)' }}
          >
            {dict.subheading}
          </p>
        </FadeInUp>

        <FadeInUp delay={0.15}>
          <div className="max-w-xl mx-auto">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                {/* Candle flame success glyph */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 mb-5 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(243,199,122,0.35) 0%, transparent 70%)',
                  }}
                  animate={{ scale: [1, 1.08, 0.98, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg width="40" height="52" viewBox="0 0 40 52" fill="none">
                    <path
                      d="M20 4 C18 8, 14 12, 14 18 C14 22, 17 25, 20 25 C23 25, 26 22, 26 18 C26 14, 23 9, 20 4 Z"
                      fill="#F3C77A"
                    />
                    <path
                      d="M20 4 C19 7, 17 10, 17 15 C17 18, 18.5 19, 20 19 C21.5 19, 23 18, 23 15 C23 12, 21.5 7, 20 4 Z"
                      fill="#FF9D4D"
                    />
                    <rect x="16" y="25" width="8" height="20" rx="0.5" fill="#F5E9CC" />
                    <rect x="13" y="44" width="14" height="4" rx="1" fill="#D88442" />
                  </svg>
                </motion.div>
                <p
                  className="text-lg candle-glow-text"
                  style={{ fontFamily: 'var(--font-noto-serif-sc), serif' }}
                >
                  {dict.successMsg}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 rounded-3xl"
                style={{
                  background: 'rgba(14,22,38,0.6)',
                  border: '1px solid rgba(243,199,122,0.15)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  boxShadow:
                    '0 30px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(243,199,122,0.08)',
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder={dict.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#F3C77A'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(243,199,122,0.18)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder={dict.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#F3C77A'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(243,199,122,0.18)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    }}
                  />
                </div>

                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F3C77A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(243,199,122,0.18)')}
                >
                  <option value="" disabled style={{ background: '#0E1626', color: '#F5EDD8' }}>
                    {dict.rolePlaceholder}
                  </option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value} style={{ background: '#0E1626', color: '#F5EDD8' }}>
                      {r.label}
                    </option>
                  ))}
                </select>

                <textarea
                  rows={4}
                  placeholder={dict.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#F3C77A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(243,199,122,0.18)')}
                />

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? dict.submitting : dict.submit}
                </Button>
              </form>
            )}

            {/* Contact links — paper-warm color on night bg */}
            <div
              className="flex items-center justify-center gap-8 mt-10 pt-8"
              style={{ borderTop: '1px solid rgba(243,199,122,0.12)' }}
            >
              <a
                href="mailto:hello@flov.ai"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'rgba(232,221,193,0.7)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#F3C77A')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(232,221,193,0.7)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 7 L12 13 L21 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                <span>{dict.email}</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'rgba(232,221,193,0.7)' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#F3C77A')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(232,221,193,0.7)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 10 C8 7 10 5 12 5 C14 5 16 7 16 10 M6 18 L7 15 C5 13 4 11 4 9 C4 6 7 4 12 4 C17 4 20 6 20 9 C20 13 17 15 13 15 L9 15 Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <span>{dict.wechat}</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
