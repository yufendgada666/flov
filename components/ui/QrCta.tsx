'use client'

import { useState } from 'react'

interface QrCtaProps {
  heading?: string
  caption: string
  hint: string
  /** Pass the real 微信号 to enable a 复制微信号 button (same-device fallback).
   *  When omitted, long-press-to-recognize (the hint) is the same-device path. */
  wechatId?: string
  size?: 'md' | 'lg'
  className?: string
}

/** Scan-to-add card showing the real WeChat QR (raster PNG so WeChat long-press recognition
    works). The long-press hint is the reliable same-device path for parents already in WeChat. */
export default function QrCta({ heading, caption, hint, wechatId, size = 'md', className = '' }: QrCtaProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    if (!wechatId) return
    try {
      await navigator.clipboard.writeText(wechatId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — long-press path still works */
    }
  }

  const imgW = size === 'lg' ? 'w-[248px]' : 'w-[216px]'

  return (
    <div
      className={`inline-flex flex-col items-center rounded-2xl bg-white shadow-[0_18px_45px_-18px_rgba(45,52,54,0.25)] border border-charcoal/[0.06] overflow-hidden ${className}`}
    >
      {heading && (
        <div className="w-full bg-wechat text-white text-[15px] font-medium text-center px-5 py-3">{heading}</div>
      )}
      <div className="flex flex-col items-center px-6 py-5">
        <div className="rounded-xl overflow-hidden border border-charcoal/[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/qr-xiaoban.png" alt="加小伴微信好友的二维码" className={`${imgW} block`} />
        </div>
        <div className="mt-3 text-[13px] font-medium text-charcoal">{caption}</div>
        <div className="mt-1.5 inline-flex items-center gap-1.5 text-[12.5px] text-wechat-dark font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 11V8a1.5 1.5 0 0 1 3 0v3M15 10a1.5 1.5 0 0 1 3 0v4.5a5.5 5.5 0 0 1-5.5 5.5H11a4 4 0 0 1-3-1.4l-2.4-2.8a1.6 1.6 0 0 1 2.4-2.1L9 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {hint}
        </div>
        {wechatId && (
          <button
            onClick={copy}
            className="mt-3 inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-[13.5px] font-medium border border-wechat/40 text-wechat-dark hover:bg-wechat/[0.06] active:scale-[0.98] transition-all"
          >
            {copied ? '已复制 ✓' : '复制微信号'}
          </button>
        )}
      </div>
    </div>
  )
}
