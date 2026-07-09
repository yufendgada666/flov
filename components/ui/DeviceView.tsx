import type { ReactNode } from 'react'

/**
 * 小伴学习机（蓝色款）的自绘渲染 —— 依据实机照片用 SVG/CSS 复刻，不使用原图。
 * 实机比例约 10cm × 4.75cm（高:宽 ≈ 1000:475）。
 *
 * 渲染层次（精修版）：
 * - 多层光影：金属中框（顶亮底暗）→ 玻璃机身三层渐变 + 环境光 → 柔和曲面扫光
 * - 立体相机岛：投影 + 高光内描边；镜头四层（镜筒→深玻璃→蓝紫镀膜弧光→镜芯）
 * - squircle 连续圆角路径（背面 SVG），消除"蛋形"感
 * - `float`/`shadow` 悬浮与接地阴影；正面屏幕带周期性扫光（reduced-motion 全部关闭）
 */

interface DeviceViewProps {
  view: 'front' | 'back'
  className?: string
  children?: ReactNode
  /** 轻微上下悬浮（配合 shadow 呼吸） */
  float?: boolean
  /** 接地椭圆软阴影 */
  shadow?: boolean
  /** 正面屏幕周期性扫光（默认开） */
  sweep?: boolean
}

/* iOS 风格连续圆角（squircle）近似路径 */
function squircle(x: number, y: number, w: number, h: number, r: number): string {
  const k = 0.55 * r
  const x2 = x + w
  const y2 = y + h
  return [
    `M ${x + r} ${y}`,
    `L ${x2 - r} ${y}`,
    `C ${x2 - k} ${y} ${x2} ${y + r - k} ${x2} ${y + r}`,
    `L ${x2} ${y2 - r}`,
    `C ${x2} ${y2 - r + k} ${x2 - k} ${y2} ${x2 - r} ${y2}`,
    `L ${x + r} ${y2}`,
    `C ${x + k} ${y2} ${x} ${y2 - r + k} ${x} ${y2 - r}`,
    `L ${x} ${y + r}`,
    `C ${x} ${y + r - k} ${x + k} ${y} ${x + r} ${y}`,
    'Z',
  ].join(' ')
}

function Lens({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {/* 镜筒（金属渐变 + 受光环） */}
      <circle cx={cx} cy={cy} r="44" fill="url(#dvBarrel)" />
      <circle cx={cx} cy={cy} r="43" fill="none" stroke="#8FB3D2" strokeOpacity="0.55" strokeWidth="2" />
      {/* 深色玻璃 */}
      <circle cx={cx} cy={cy} r="33" fill="url(#dvGlass)" />
      {/* 蓝紫镀膜弧光 */}
      <path
        d={`M ${cx - 26} ${cy - 15} A 30 30 0 0 1 ${cx + 17} ${cy - 24}`}
        stroke="url(#dvCoat)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* 镜芯 + 高光 */}
      <circle cx={cx} cy={cy} r="13" fill="#04090F" />
      <circle cx={cx - 10} cy={cy - 12} r="5" fill="#CFE4F5" opacity="0.9" />
    </g>
  )
}

function BackSvg() {
  return (
    <svg viewBox="0 0 475 1000" className="w-full h-full" role="img" aria-label="小伴学习机背面渲染图：蓝色机身与相机模组">
      <defs>
        <linearGradient id="dvFrame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A9CCE9" />
          <stop offset="12%" stopColor="#7FA9CE" />
          <stop offset="85%" stopColor="#5580A8" />
          <stop offset="100%" stopColor="#7FA9CE" />
        </linearGradient>
        <linearGradient id="dvBody" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0%" stopColor="#9AC6E9" />
          <stop offset="38%" stopColor="#74A9D4" />
          <stop offset="78%" stopColor="#5D95C3" />
          <stop offset="100%" stopColor="#699FCB" />
        </linearGradient>
        <radialGradient id="dvAmb" cx="0.28" cy="0.12" r="1.1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#20405C" stopOpacity="0.16" />
        </radialGradient>
        <linearGradient id="dvIsland" x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#8CB9DF" />
          <stop offset="100%" stopColor="#6096C5" />
        </linearGradient>
        <linearGradient id="dvBarrel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D5A73" />
          <stop offset="100%" stopColor="#101C28" />
        </linearGradient>
        <radialGradient id="dvGlass" cx="0.38" cy="0.32" r="1">
          <stop offset="0%" stopColor="#31506B" />
          <stop offset="55%" stopColor="#122334" />
          <stop offset="100%" stopColor="#060D15" />
        </radialGradient>
        <linearGradient id="dvCoat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7FB0FF" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#B08CE8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B08CE8" stopOpacity="0" />
        </linearGradient>
        <filter id="dvBlur6" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="dvBlur2" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* 侧键（带受光细线） */}
      <rect x="465" y="292" width="9" height="118" rx="4.5" fill="#4E7CA5" />
      <rect x="466.5" y="294" width="2.5" height="114" rx="1.2" fill="#9FC2DE" opacity="0.8" />
      <rect x="1" y="266" width="9" height="70" rx="4.5" fill="#4E7CA5" />
      <rect x="1" y="350" width="9" height="70" rx="4.5" fill="#4E7CA5" />

      {/* 金属中框（顶亮底暗的挤出感） */}
      <path d={squircle(8, 8, 459, 984, 88)} fill="url(#dvFrame)" />
      {/* 玻璃机身：主渐变 + 环境光罩 */}
      <path d={squircle(16, 16, 443, 968, 80)} fill="url(#dvBody)" />
      <path d={squircle(16, 16, 443, 968, 80)} fill="url(#dvAmb)" />

      {/* 柔和曲面扫光（两道，模糊边缘） */}
      <path
        d="M118 16 C205 16 240 16 268 16 C190 340 150 680 138 984 C108 984 88 984 78 984 C78 700 88 300 118 16 Z"
        fill="#FFFFFF"
        opacity="0.10"
        filter="url(#dvBlur6)"
      />
      <path
        d="M312 16 L342 16 C302 380 288 700 284 984 L262 984 C266 660 280 320 312 16 Z"
        fill="#FFFFFF"
        opacity="0.05"
        filter="url(#dvBlur6)"
      />
      {/* 内缘受光细线 */}
      <path d={squircle(18, 18, 439, 964, 78)} fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" filter="url(#dvBlur2)" />

      {/* 相机岛：投影 + 岛体 + 高光内描边 */}
      <path d={squircle(40, 42, 256, 214, 58)} fill="#3E5F7C" opacity="0.38" filter="url(#dvBlur6)" />
      <path d={squircle(36, 34, 256, 214, 58)} fill="url(#dvIsland)" />
      <path d={squircle(39, 37, 250, 208, 55)} fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2.5" />

      {/* 三颗镜头（三角布局） */}
      <Lens cx={104} cy={102} />
      <Lens cx={104} cy={186} />
      <Lens cx={196} cy={144} />

      {/* 闪光灯（透镜质感） + 传感器 */}
      <circle cx="248" cy="88" r="18" fill="#E9E7D5" />
      <circle cx="248" cy="88" r="17" fill="none" stroke="#B9BBA8" strokeWidth="2.5" />
      <circle cx="248" cy="88" r="8" fill="#F7F3D8" />
      <circle cx="243.5" cy="83.5" r="3" fill="#FFFFFF" />
      <circle cx="248" cy="152" r="9" fill="#15222E" />
      <circle cx="245.5" cy="149.5" r="2.4" fill="#3E5F7C" />

      {/* 底部品牌小花（海棠） */}
      <g transform="translate(237.5 906)" opacity="0.5">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-10" rx="5.5" ry="9" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#DCEBF7" />
      </g>
    </svg>
  )
}

export default function DeviceView({ view, className = '', children, float = false, shadow = false, sweep = true }: DeviceViewProps) {
  const device =
    view === 'back' ? (
      <div className="relative aspect-[475/1000] w-full">
        <BackSvg />
      </div>
    ) : (
      <div className="relative aspect-[475/1000] w-full">
        {/* 金属中框（无硬描边：内嵌高光/暗部模拟挤出） */}
        <div
          className="absolute inset-0"
          style={{
            borderRadius: '16% / 7.6%',
            background: 'linear-gradient(180deg, #A9CCE9 0%, #7FA9CE 12%, #5580A8 85%, #7FA9CE 100%)',
            boxShadow:
              '0 30px 60px -20px rgba(31,58,82,0.45), inset 0 1.5px 1px rgba(255,255,255,0.65), inset 0 -1.5px 1.5px rgba(15,35,52,0.35)',
          }}
        >
          {/* 玻璃机身层 */}
          <div
            className="absolute inset-[1.1%]"
            style={{
              borderRadius: '15.2% / 7.2%',
              background: 'linear-gradient(135deg, #9AC6E9 0%, #74A9D4 40%, #5D95C3 100%)',
            }}
          />
          {/* 侧键（带受光细线） */}
          <span aria-hidden className="absolute -right-[3px] top-[29%] w-[4px] h-[11.5%] rounded-full bg-[#4E7CA5]" />
          <span aria-hidden className="absolute -right-[2px] top-[29.5%] w-[1.5px] h-[10.5%] rounded-full bg-[#9FC2DE]/80" />
          <span aria-hidden className="absolute -left-[3px] top-[26.5%] w-[4px] h-[7%] rounded-full bg-[#4E7CA5]" />
          <span aria-hidden className="absolute -left-[3px] top-[35%] w-[4px] h-[7%] rounded-full bg-[#4E7CA5]" />

          {/* 屏幕包边：细窄一圈深蓝灰（与蓝框衔接），代替原先厚重的纯黑环 */}
          <div
            className="absolute inset-[1.5%] overflow-hidden"
            style={{ borderRadius: '15% / 7.1%', background: '#141C26' }}
          >
            {/* 屏幕内容区（做满，仅留 ~1% 细边；极细内阴影保持嵌入感） */}
            <div
              className="absolute inset-[1.1%] overflow-hidden"
              style={{ borderRadius: '14.2% / 6.7%', background: '#FAF6F0', boxShadow: 'inset 0 0 4px rgba(10,16,24,0.5)' }}
            >
              {children}
              {/* 周期性屏幕扫光 */}
              {sweep && (
                <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none z-[15]">
                  <div
                    className="dv-sweep absolute top-[-10%] bottom-[-10%] w-[46%]"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.16) 45%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.16) 55%, transparent 100%)',
                    }}
                  />
                </div>
              )}
            </div>
            {/* 居中挖孔（灵动岛样式） */}
            <div aria-hidden className="absolute top-[2.6%] left-1/2 -translate-x-1/2 w-[34%] h-[3.4%] rounded-full bg-[#0B0F14] z-20" />
          </div>
        </div>
      </div>
    )

  return (
    <div className={`relative ${className}`}>
      {shadow && (
        <div
          aria-hidden
          className="dv-shadow absolute left-1/2 -translate-x-1/2 -bottom-[4%] w-[88%] h-[5%] rounded-[50%]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(42,64,86,0.34) 0%, rgba(42,64,86,0.12) 60%, transparent 100%)',
            filter: 'blur(6px)',
          }}
        />
      )}
      <div className={float ? 'dv-float' : undefined}>{device}</div>
    </div>
  )
}
