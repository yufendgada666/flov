import Link from 'next/link'
import FlovLogo from '@/components/icons/FlovLogo'

export default function NotFound() {
  return (
    <main
      className="min-h-screen grid place-items-center px-6 text-center"
      style={{ background: 'linear-gradient(175deg, #FFF9F2 0%, #FAFBFF 60%, #FFF5E4 100%)' }}
    >
      <div className="max-w-sm">
        <div className="flex justify-center mb-6">
          <FlovLogo variant="dark" showWordmark />
        </div>
        <h1 className="font-display-zh font-bold text-charcoal text-3xl">这一页走丢了</h1>
        <p className="mt-3 text-charcoal-light text-[15px]">你要找的内容不在这里，回首页看看小伴吧。</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center mt-7 px-6 py-3 rounded-full text-[15px] font-medium bg-sakura text-white shadow-md shadow-sakura/25 hover:bg-sakura-dark transition-colors"
        >
          回到首页
        </Link>
      </div>
    </main>
  )
}
