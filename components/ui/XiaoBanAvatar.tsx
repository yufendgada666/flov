interface XiaoBanAvatarProps {
  size?: number
  className?: string
}

/** WeChat-style rounded-square avatar for 小伴 — begonia face on warm ground */
export default function XiaoBanAvatar({ size = 36, className = '' }: XiaoBanAvatarProps) {
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.max(4, size * 0.14),
        background: 'linear-gradient(160deg, #FFF0F5 0%, #FFE3ED 100%)',
      }}
      aria-hidden="true"
    >
      <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 28 28" fill="none">
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = ((angle - 90) * Math.PI) / 180
          const cx = 14 + Math.cos(rad) * 7
          const cy = 14 + Math.sin(rad) * 7
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={4}
              ry={6.5}
              fill="#FF6B9D"
              opacity={i % 2 === 0 ? 0.9 : 0.72}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx="14" cy="14" r="4.6" fill="#FFD93D" />
        <circle cx="12.4" cy="13.4" r="0.95" fill="#2D3436" />
        <circle cx="15.6" cy="13.4" r="0.95" fill="#2D3436" />
        <path d="M12.6 15.6 Q14 16.9 15.4 15.6" stroke="#2D3436" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </svg>
    </span>
  )
}
