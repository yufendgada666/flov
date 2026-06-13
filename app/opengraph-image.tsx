import { ImageResponse } from 'next/og'

export const alt = '小伴 · 微信里的 AI 辅导老师'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* Brand-visual OG card. Kept Latin-only so it renders crisply without bundling a CJK font;
   the Chinese title/description still come from the page <title>/<meta> tags. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #FFF7F0 0%, #FFF0F5 45%, #FFF5E4 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <svg width="150" height="150" viewBox="-50 -50 100 100">
          <ellipse cx="0" cy="-22" rx="14" ry="22" fill="#FF6B9D" />
          <ellipse cx="20.9" cy="-6.8" rx="14" ry="22" fill="#FF6B9D" opacity="0.8" transform="rotate(72 20.9 -6.8)" />
          <ellipse cx="12.9" cy="17.8" rx="14" ry="22" fill="#FF6B9D" transform="rotate(144 12.9 17.8)" />
          <ellipse cx="-12.9" cy="17.8" rx="14" ry="22" fill="#FF6B9D" opacity="0.8" transform="rotate(216 -12.9 17.8)" />
          <ellipse cx="-20.9" cy="-6.8" rx="14" ry="22" fill="#FF6B9D" transform="rotate(288 -20.9 -6.8)" />
          <circle r="14" fill="#FFD93D" />
        </svg>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, letterSpacing: 14, color: '#2D3436', marginTop: 28 }}>
          FLOV
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#993556', marginTop: 8 }}>
          Teaches the method — not the answer.
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#888780', marginTop: 40 }}>flov.cheerai.cn</div>
      </div>
    ),
    { ...size }
  )
}
