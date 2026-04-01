interface FlovLogoProps {
  className?: string
  variant?: 'light' | 'dark' | 'garden'
  showWordmark?: boolean
}

export default function FlovLogo({
  className = '',
  variant = 'garden',
  showWordmark = true,
}: FlovLogoProps) {
  const textColor = variant === 'light' ? '#FAF6EF' : '#2D3436'
  const petalColor = '#FF6B9D'
  const centerColor = '#FFD93D'

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        {/* 5 petals */}
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
              fill={petalColor}
              opacity={i % 2 === 0 ? 0.9 : 0.7}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          )
        })}
        <circle cx="14" cy="14" r="4" fill={centerColor} />
        {/* Tiny eyes */}
        <circle cx="12.5" cy="13.5" r="1" fill="#2D3436" />
        <circle cx="15.5" cy="13.5" r="1" fill="#2D3436" />
        <circle cx="12.8" cy="13" r="0.4" fill="white" />
        <circle cx="15.8" cy="13" r="0.4" fill="white" />
      </svg>

      {showWordmark && (
        <span
          style={{
            color: textColor,
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: '1.4rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          FLOV
        </span>
      )}
    </div>
  )
}
