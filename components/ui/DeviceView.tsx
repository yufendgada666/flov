import type { ReactNode } from 'react'

/**
 * 小伴学习机（蓝色款）的自绘渲染 —— 依据实机照片用 SVG/CSS 复刻，不使用原图。
 * 实机比例约 10cm × 4.75cm（高:宽 ≈ 1000:475），圆角小机身、左上三摄相机岛、
 * 金属蓝中框。`view="back"` 渲染背面；`view="front"` 渲染正面框架，屏幕内容由
 * children 传入（如自动播放的辅导演示）。
 */

interface DeviceViewProps {
  view: 'front' | 'back'
  className?: string
  children?: ReactNode
}

function BackSvg() {
  return (
    <svg viewBox="0 0 475 1000" className="w-full h-full" role="img" aria-label="小伴学习机背面渲染图：蓝色机身与相机模组">
      <defs>
        <linearGradient id="dvBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8FBEE3" />
          <stop offset="45%" stopColor="#6FA6D3" />
          <stop offset="100%" stopColor="#5B92C0" />
        </linearGradient>
        <linearGradient id="dvIsland" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9CC6E8" />
          <stop offset="100%" stopColor="#6FA3CE" />
        </linearGradient>
        <radialGradient id="dvLens" cx="0.4" cy="0.35" r="0.9">
          <stop offset="0%" stopColor="#2E4356" />
          <stop offset="45%" stopColor="#16222E" />
          <stop offset="100%" stopColor="#0A121B" />
        </radialGradient>
        <linearGradient id="dvGloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id="dvShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#1F3A52" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* 侧键（先画在机身下层） */}
      <rect x="466" y="300" width="8" height="112" rx="4" fill="#3E729F" />
      <rect x="1" y="272" width="8" height="66" rx="4" fill="#3E729F" />
      <rect x="1" y="356" width="8" height="66" rx="4" fill="#3E729F" />

      {/* 机身 */}
      <rect x="6" y="6" width="463" height="988" rx="78" fill="url(#dvBody)" stroke="#43799F" strokeWidth="3" />
      <rect x="13" y="13" width="449" height="974" rx="71" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />

      {/* 玻璃高光 */}
      <path d="M60 6 L250 6 L120 1000 L6 1000 L6 300 Z" fill="url(#dvGloss)" />

      {/* 相机岛 */}
      <g filter="url(#dvShadow)">
        <rect x="36" y="34" width="256" height="214" rx="56" fill="url(#dvIsland)" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
      </g>

      {/* 三颗镜头（三角布局） */}
      {[
        { cx: 104, cy: 102 },
        { cx: 104, cy: 186 },
        { cx: 196, cy: 144 },
      ].map((l, i) => (
        <g key={i}>
          <circle cx={l.cx} cy={l.cy} r="42" fill="#0C141D" />
          <circle cx={l.cx} cy={l.cy} r="34" fill="url(#dvLens)" stroke="#31485C" strokeWidth="2" />
          <circle cx={l.cx} cy={l.cy} r="14" fill="#0A1520" />
          <circle cx={l.cx - 10} cy={l.cy - 12} r="6" fill="#AFCDE6" opacity="0.75" />
        </g>
      ))}

      {/* 闪光灯 + 传感器 */}
      <circle cx="248" cy="88" r="17" fill="#F2F1E4" stroke="#C9CBB9" strokeWidth="3" />
      <circle cx="248" cy="88" r="7" fill="#E4DFC2" />
      <circle cx="248" cy="152" r="9" fill="#1D2B38" />

      {/* 底部品牌小花（海棠） */}
      <g transform="translate(237.5 906)" opacity="0.55">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-10" rx="5.5" ry="9" fill="#FFFFFF" transform={`rotate(${a})`} />
        ))}
        <circle r="5" fill="#DCEBF7" />
      </g>
    </svg>
  )
}

export default function DeviceView({ view, className = '', children }: DeviceViewProps) {
  if (view === 'back') {
    return (
      <div className={`relative aspect-[475/1000] ${className}`}>
        <BackSvg />
      </div>
    )
  }

  return (
    <div className={`relative aspect-[475/1000] ${className}`}>
      {/* 金属蓝中框 */}
      <div
        className="absolute inset-0 shadow-[0_30px_60px_-20px_rgba(31,58,82,0.45)]"
        style={{
          borderRadius: '16% / 7.6%',
          background: 'linear-gradient(135deg, #8FBEE3 0%, #6FA6D3 45%, #5B92C0 100%)',
          border: '1px solid #43799F',
        }}
      >
        {/* 侧键 */}
        <span aria-hidden className="absolute -right-[2px] top-[30%] w-[3px] h-[11%] rounded-full bg-[#3E729F]" />
        <span aria-hidden className="absolute -left-[2px] top-[27%] w-[3px] h-[6.5%] rounded-full bg-[#3E729F]" />
        <span aria-hidden className="absolute -left-[2px] top-[35.5%] w-[3px] h-[6.5%] rounded-full bg-[#3E729F]" />

        {/* 黑色屏幕包边 */}
        <div
          className="absolute inset-[2.4%] overflow-hidden"
          style={{ borderRadius: '14.5% / 6.9%', background: '#0B0F14' }}
        >
          {/* 屏幕内容区 */}
          <div className="absolute inset-[2.2%] overflow-hidden" style={{ borderRadius: '12.5% / 6%', background: '#FAF6F0' }}>
            {children}
          </div>
          {/* 居中挖孔（灵动岛样式） */}
          <div
            aria-hidden
            className="absolute top-[2.6%] left-1/2 -translate-x-1/2 w-[34%] h-[3.4%] rounded-full bg-[#0B0F14] z-20"
          />
        </div>
      </div>
    </div>
  )
}
