import FlovLogo from '@/components/icons/FlovLogo'

interface FooterProps {
  dict: {
    tagline: string
    desc: string
    linksTitle: string
    links: {
      how: string
      features: string
      report: string
      faq: string
    }
    contactTitle: string
    contactEmail: string
    copyright: string
    icp: string
  }
}

export default function Footer({ dict }: FooterProps) {
  const links = [
    { label: dict.links.how, href: '#how' },
    { label: dict.links.features, href: '#features' },
    { label: dict.links.report, href: '#report' },
    { label: dict.links.faq, href: '#faq' },
  ]

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="section-container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <FlovLogo variant="light" showWordmark />
            <p className="mt-4 text-[15px] font-medium text-white/90">{dict.tagline}</p>
            <p className="mt-1.5 text-[13px] text-white/55">{dict.desc}</p>
          </div>

          <div>
            <div className="text-[13px] font-semibold tracking-wider text-white/45 mb-4">{dict.linksTitle}</div>
            <nav className="flex flex-col gap-2.5">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-[14px] text-white/70 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-[13px] font-semibold tracking-wider text-white/45 mb-4">{dict.contactTitle}</div>
            <a
              href={`mailto:${dict.contactEmail}`}
              className="text-[14px] text-white/70 hover:text-white transition-colors"
            >
              {dict.contactEmail}
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-white/40">
          <span>{dict.copyright}</span>
          <span>{dict.icp}</span>
        </div>
      </div>
    </footer>
  )
}
