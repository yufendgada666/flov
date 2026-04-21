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
    { label: dict.contact, href: '#contact' },
  ]

  // Full Haitang poem — displayed as a quiet signature at the bottom
  const poem = ['东风袅袅泛崇光，', '香雾空蒙月转廊。', '只恐夜深花睡去，', '故烧高烛照红妆。']

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #070B18 0%, #050810 100%)',
        borderTop: '1px solid rgba(243,199,122,0.12)',
      }}
    >
      {/* Quiet candle glow signature top-center */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-24 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(243,199,122,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="section-container py-16 relative z-10">
        {/* Vertical poem — centered ornament */}
        <div className="hidden md:flex flex-row-reverse justify-center items-start gap-5 mb-12 pt-2">
          {poem.map((line, i) => (
            <div
              key={i}
              className="vertical-zh text-sm leading-loose tracking-[0.35em]"
              style={{
                fontFamily: 'var(--font-noto-serif-sc), serif',
                color: 'rgba(243,199,122,0.5)',
              }}
            >
              {line}
            </div>
          ))}
          <div className="vertical-zh text-[10px] tracking-[0.4em] mt-1" style={{ color: 'rgba(232,221,193,0.4)' }}>
            苏轼 · 海棠
          </div>
          <div className="seal w-7 h-7 text-[11px] mt-1 rotate-3">苏</div>
        </div>

        {/* Mobile — horizontal poem */}
        <div className="md:hidden text-center mb-10">
          <p
            className="text-sm leading-loose tracking-wider mb-1"
            style={{
              fontFamily: 'var(--font-noto-serif-sc), serif',
              color: 'rgba(243,199,122,0.55)',
            }}
          >
            {poem.slice(0, 2).join('')}
          </p>
          <p
            className="text-sm leading-loose tracking-wider"
            style={{
              fontFamily: 'var(--font-noto-serif-sc), serif',
              color: 'rgba(243,199,122,0.55)',
            }}
          >
            {poem.slice(2, 4).join('')}
          </p>
          <p className="text-[10px] tracking-widest mt-2" style={{ color: 'rgba(232,221,193,0.4)' }}>
            —— 苏轼 · 海棠
          </p>
        </div>

        {/* Divider */}
        <div className="ink-divider mb-10 max-w-2xl mx-auto opacity-60" aria-hidden />

        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo + tagline */}
          <div className="space-y-3">
            <FlovLogo variant="light" showWordmark />
            <p
              className="text-sm leading-relaxed"
              style={{
                color: 'rgba(232,221,193,0.55)',
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
                className="text-sm transition-colors hover:text-candle-glow"
                style={{ color: 'rgba(232,221,193,0.55)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="space-y-2 md:text-right">
            <a
              href="mailto:hello@flov.ai"
              className="block text-sm transition-colors hover:text-candle-glow"
              style={{ color: 'rgba(232,221,193,0.55)' }}
            >
              hello@flov.ai
            </a>
            <a
              href="https://flov.ai"
              className="block text-sm transition-colors hover:text-candle-glow"
              style={{ color: 'rgba(243,199,122,0.55)' }}
            >
              flov.ai
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs"
          style={{
            borderTop: '1px solid rgba(243,199,122,0.1)',
            color: 'rgba(232,221,193,0.35)',
          }}
        >
          <span>{dict.copyright}</span>
          <span>{dict.icp}</span>
        </div>
      </div>
    </footer>
  )
}
