import HeaderReveal from '@/components/animations/HeaderReveal'
import ScaleSettle from '@/components/animations/ScaleSettle'
import SectionLabel from '@/components/ui/SectionLabel'
import DeviceView from '@/components/ui/DeviceView'
import XiaoBanAvatar from '@/components/ui/XiaoBanAvatar'

interface GalleryDict {
  label: string
  heading: string
  sub: string
  note: string
  specs: { k: string; v: string }[]
}

/* 静态正面屏（欢迎页样式）：给外观图集用 */
function FrontScreen() {
  return (
    <div className="absolute inset-0 flex flex-col" aria-hidden>
      <div
        className="relative flex items-end px-3 pb-1.5 pt-[16%] flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #D98370 0%, #C9705F 100%)' }}
      >
        <div className="flex items-center gap-1.5">
          <XiaoBanAvatar size={18} />
          <div className="text-[10px] font-bold text-white leading-none">小伴</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-3 text-center">
        <XiaoBanAvatar size={56} />
        <div className="text-[11px] font-bold" style={{ color: '#33302B' }}>
          嗨，我是小伴！
        </div>
        <div className="text-[8px] leading-relaxed" style={{ color: '#8A8378' }}>
          把不会的题拍给我，
          <br />
          咱俩一起把它想明白
        </div>
      </div>
      <div className="flex-shrink-0 flex gap-1.5 px-2 pb-2.5">
        <div
          className="flex-1 py-1.5 rounded-full text-[8.5px] font-bold text-white text-center"
          style={{ background: 'linear-gradient(135deg, #D98370 0%, #C9705F 100%)' }}
        >
          拍照搜题
        </div>
        <div
          className="flex-1 py-1.5 rounded-full text-[8.5px] font-bold text-white text-center"
          style={{ background: 'linear-gradient(135deg, #8AA585 0%, #789573 100%)' }}
        >
          按住说话
        </div>
      </div>
    </div>
  )
}

export default function DeviceGallery({ dict }: { dict: GalleryDict }) {
  return (
    <section id="gallery" className="section-padding scroll-mt-16">
      <div className="section-container">
        <HeaderReveal className="text-center max-w-2xl mx-auto">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2 className="mt-4 font-display-zh font-bold text-charcoal text-2xl sm:text-3xl lg:text-4xl">
            {dict.heading}
          </h2>
          <p className="mt-3 text-charcoal-light text-[15px] leading-relaxed">{dict.sub}</p>
        </HeaderReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center max-w-4xl mx-auto">
          {/* 双机位渲染：背面 + 正面，落在"台面"上并带倒影 */}
          <ScaleSettle className="relative">
            <div className="relative z-[1] flex items-end justify-center gap-6">
              <DeviceView view="back" className="w-[150px] sm:w-[170px] -rotate-3" />
              <DeviceView view="front" className="w-[150px] sm:w-[170px] rotate-3 translate-y-2">
                <FrontScreen />
              </DeviceView>
            </div>
            {/* 接地阴影 */}
            <div
              aria-hidden
              className="absolute left-1/2 -translate-x-1/2 bottom-[-10px] w-[92%] h-6 rounded-[50%] z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(42,64,86,0.30) 0%, rgba(42,64,86,0.10) 60%, transparent 100%)',
                filter: 'blur(7px)',
              }}
            />
            {/* 台面倒影（翻转副本 + 渐隐遮罩） */}
            <div
              aria-hidden
              className="relative flex items-start justify-center gap-6 mt-1 pointer-events-none select-none"
              style={{
                transform: 'scaleY(-1)',
                WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 42%)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 42%)',
              }}
            >
              <DeviceView view="back" className="w-[150px] sm:w-[170px] -rotate-3" />
              <DeviceView view="front" className="w-[150px] sm:w-[170px] rotate-3 translate-y-2" sweep={false}>
                <FrontScreen />
              </DeviceView>
            </div>
          </ScaleSettle>

          {/* 规格 */}
          <ScaleSettle delay={0.1}>
            <dl className="divide-y divide-charcoal/[0.07] rounded-2xl border border-charcoal/[0.07] bg-white overflow-hidden">
              {dict.specs.map((s) => (
                <div key={s.k} className="flex items-start gap-4 px-5 sm:px-6 py-4">
                  <dt className="w-[5.5em] flex-shrink-0 text-[13.5px] font-bold text-charcoal">{s.k}</dt>
                  <dd className="text-[13.5px] text-charcoal-light leading-relaxed">{s.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[12px] text-charcoal-light/70 text-center lg:text-left">{dict.note}</p>
          </ScaleSettle>
        </div>
      </div>
    </section>
  )
}
