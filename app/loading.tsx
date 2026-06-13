export default function Loading() {
  return (
    <div
      className="min-h-screen grid place-items-center"
      style={{ background: 'linear-gradient(175deg, #FFF9F2 0%, #FAFBFF 60%, #FFF5E4 100%)' }}
    >
      <div className="flex flex-col items-center gap-4" aria-label="加载中">
        <span className="inline-block w-9 h-9 rounded-full border-[3px] border-sakura/25 border-t-sakura animate-spin" />
        <span className="text-[13px] text-charcoal-light tracking-wide">小伴正在赶来…</span>
      </div>
    </div>
  )
}
