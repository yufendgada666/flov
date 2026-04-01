interface WavyDividerProps {
  variant?: 1 | 2 | 3 | 4 | 5
  fillTop?: string
  fillBottom?: string
  className?: string
  flip?: boolean
}

const WAVES: Record<number, string> = {
  1: 'M0,40 C160,80 320,0 480,40 C640,80 800,0 960,40 L960,100 L0,100 Z',
  2: 'M0,60 C120,20 240,80 360,40 C480,0 600,60 720,30 C840,0 960,50 960,50 L960,100 L0,100 Z',
  3: 'M0,30 C200,70 400,10 600,50 C800,90 960,20 960,20 L960,100 L0,100 Z',
  4: 'M0,50 C100,30 200,70 320,40 C440,10 560,60 680,35 C800,10 900,55 960,40 L960,100 L0,100 Z',
  5: 'M0,45 C80,15 180,65 300,35 C420,5 540,55 660,25 C780,0 880,50 960,30 L960,100 L0,100 Z',
}

export default function WavyDivider({
  variant = 1,
  fillTop = '#FAFBFF',
  fillBottom = '#FFF5E4',
  className = '',
  flip = false,
}: WavyDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: 60,
        marginTop: -1,
        marginBottom: -1,
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      {/* Bottom fill */}
      <div className="absolute inset-0" style={{ background: fillBottom }} />
      {/* Wave shape */}
      <svg
        viewBox="0 0 960 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <path d={WAVES[variant]} fill={fillTop} />
      </svg>
    </div>
  )
}
