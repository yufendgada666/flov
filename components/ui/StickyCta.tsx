'use client'

import { useEffect, useState } from 'react'

/** Mobile-only sticky bottom CTA. Hides itself when the final #cta (with its own QR) is in
    view so it never covers the real scan card. Safe-area aware for notched phones. */
export default function StickyCta({ label }: { label: string }) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const cta = document.getElementById('cta')
    if (!cta || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 })
    io.observe(cta)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-2 transition-transform duration-300 ${
        hidden ? 'translate-y-[120%]' : 'translate-y-0'
      }`}
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
    >
      <a
        href="#cta"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-wechat text-white text-[15px] font-medium py-3.5 shadow-[0_10px_30px_-8px_rgba(7,193,96,0.55)] active:scale-[0.98] transition-transform"
      >
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
          <path d="M14 14h2v2M20 14v6M14 18v2h2M18 20h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        {label}
      </a>
    </div>
  )
}
