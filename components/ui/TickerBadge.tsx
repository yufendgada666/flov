interface TickerBadgeProps {
  ticker?: string
  className?: string
}

export default function TickerBadge({ ticker = 'NASDAQ: FLOV', className = '' }: TickerBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${className}`}
      style={{
        background: 'rgba(212,168,71,0.08)',
        borderColor: 'rgba(212,168,71,0.4)',
      }}
    >
      {/* Live indicator dot */}
      <span className="relative flex h-2 w-2">
        <span
          className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ backgroundColor: '#D4A847' }}
        />
        <span
          className="relative inline-flex rounded-full h-2 w-2"
          style={{ backgroundColor: '#D4A847' }}
        />
      </span>
      <span
        className="mono-display text-sm font-medium tracking-widest"
        style={{ color: '#D4A847' }}
      >
        {ticker}
      </span>
    </div>
  )
}
