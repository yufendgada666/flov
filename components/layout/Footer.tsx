import FlovLogo from '@/components/icons/FlovLogo'

interface FooterProps {
  dict: {
    tagline: string
    copyright: string
    icp: string
    story: string
    product: string
    investor: string
    contact: string
  }
}

export default function Footer({ dict }: FooterProps) {
  const links = [
    { label: dict.story, href: '#story' },
    { label: dict.product, href: '#product' },
    { label: dict.investor, href: '#investor' },
    { label: dict.contact, href: '#contact' },
  ]

  return (
    <footer style={{ background: '#2D3436', borderTop: '1px solid rgba(255,107,157,0.1)' }}>
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo + tagline */}
          <div className="space-y-3">
            <FlovLogo variant="light" showWordmark />
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'rgba(250,251,255,0.45)',
                fontFamily: 'var(--font-noto-serif-sc), serif',
                lineHeight: '2',
              }}
            >
              {dict.tagline}
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 md:items-center">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:text-sakura"
                style={{ color: 'rgba(250,251,255,0.5)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="space-y-2 md:text-right">
            <a
              href="mailto:hello@flov.ai"
              className="block text-sm transition-colors hover:text-sakura"
              style={{ color: 'rgba(250,251,255,0.5)' }}
            >
              hello@flov.ai
            </a>
            <a
              href="https://flov.ai"
              className="block text-sm transition-colors hover:text-sunshine"
              style={{ color: 'rgba(255,217,61,0.5)' }}
            >
              flov.ai
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderTop: '1px solid rgba(255,107,157,0.08)',
            color: 'rgba(250,251,255,0.3)',
          }}
        >
          <span>{dict.copyright}</span>
          <span>{dict.icp}</span>
        </div>
      </div>
    </footer>
  )
}
