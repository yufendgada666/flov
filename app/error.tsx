'use client'

import Link from 'next/link'

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main
      className="min-h-screen grid place-items-center px-6 text-center"
      style={{ background: 'linear-gradient(175deg, #FFF9F2 0%, #FAFBFF 60%, #FFF5E4 100%)' }}
    >
      <div className="max-w-sm">
        <h1 className="font-display-zh font-bold text-charcoal text-2xl">页面出了点小状况</h1>
        <p className="mt-3 text-charcoal-light text-[15px]">刷新一下通常就好了。</p>
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-[15px] font-medium bg-sakura text-white shadow-md shadow-sakura/25 hover:bg-sakura-dark transition-colors"
          >
            重新加载
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-[15px] font-medium border border-charcoal/15 text-charcoal hover:border-sakura hover:text-sakura transition-colors"
          >
            回首页
          </Link>
        </div>
      </div>
    </main>
  )
}
