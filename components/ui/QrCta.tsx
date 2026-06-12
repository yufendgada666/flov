interface QrCtaProps {
  heading?: string
  caption: string
  hint: string
  size?: 'md' | 'lg'
  className?: string
}

/** Scan-to-add CTA card. Swap /qr-placeholder.svg for the real QR image — no code change needed. */
export default function QrCta({ heading, caption, hint, size = 'md', className = '' }: QrCtaProps) {
  const qrSize = size === 'lg' ? 'w-[150px] h-[150px]' : 'w-[120px] h-[120px]'

  return (
    <div
      className={`inline-flex flex-col items-center rounded-2xl bg-white shadow-[0_18px_45px_-18px_rgba(45,52,54,0.25)] border border-charcoal/[0.06] overflow-hidden ${className}`}
    >
      {heading && (
        <div className="w-full bg-wechat text-white text-[15px] font-medium text-center px-5 py-3">
          {heading}
        </div>
      )}
      <div className="flex flex-col items-center px-6 py-5">
        <div className="relative p-2 rounded-xl border border-charcoal/[0.08]">
          {/* WeChat-green scan corners */}
          <span aria-hidden className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-wechat rounded-tl-lg" />
          <span aria-hidden className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-wechat rounded-tr-lg" />
          <span aria-hidden className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-wechat rounded-bl-lg" />
          <span aria-hidden className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-wechat rounded-br-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/qr-placeholder.svg" alt="小伴微信二维码" className={`${qrSize} block`} />
        </div>
        <div className="mt-3 text-[13px] font-medium text-charcoal">{caption}</div>
        <div className="mt-1 text-[11.5px] text-charcoal-light/80">{hint}</div>
      </div>
    </div>
  )
}
