'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FadeInUp from '@/components/animations/FadeInUp'
import SectionLabel from '@/components/ui/SectionLabel'
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
    background: '#FAFBFF',
    border: '1px solid rgba(255,107,157,0.15)',
    color: '#2D3436',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setSuccess(true)
  }

  return (
    <section id="contact" className="section-padding" style={{ background: '#FAFBFF' }}>
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

        <FadeInUp delay={0.1} className="text-center mb-12">
          <p
            className="text-base lg:text-lg max-w-xl mx-auto leading-loose mt-4"
            style={{ color: '#636E72' }}
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
                className="text-center py-12"
              >
                <div className="text-5xl mb-4">🌸</div>
                <p
                  className="text-lg"
                  style={{ color: '#2D3436', fontFamily: 'var(--font-noto-serif-sc), serif' }}
                >
                  {dict.successMsg}
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 rounded-3xl"
                style={{
                  background: '#FFF5E4',
                  border: '1px solid rgba(255,107,157,0.1)',
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
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#FF6B9D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,107,157,0.15)')}
                  />
                  <input
                    type="email"
                    required
                    placeholder={dict.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = '#FF6B9D')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,107,157,0.15)')}
                  />
                </div>

                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF6B9D')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,107,157,0.15)')}
                >
                  <option value="" disabled style={{ background: '#FFF5E4' }}>
                    {dict.rolePlaceholder}
                  </option>
                  {roles.map((r) => (
                    <option key={r.value} value={r.value} style={{ background: '#FFF5E4' }}>
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
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#FF6B9D')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,107,157,0.15)')}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? dict.submitting : dict.submit}
                </Button>
              </form>
            )}

            <div
              className="flex items-center justify-center gap-6 mt-8 pt-8"
              style={{ borderTop: '1px solid rgba(255,107,157,0.1)' }}
            >
              <a
                href="mailto:hello@flov.ai"
                className="flex items-center gap-2 text-sm transition-colors hover:text-sakura"
                style={{ color: '#636E72' }}
              >
                <span>✉️</span>
                <span>{dict.email}</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm transition-colors hover:text-spring"
                style={{ color: '#636E72' }}
              >
                <span>💬</span>
                <span>{dict.wechat}</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
