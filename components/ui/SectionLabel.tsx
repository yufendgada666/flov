interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionLabel({ children, light = false, className = '' }: SectionLabelProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium tracking-widest uppercase
        ${light
          ? 'bg-white/10 text-sunshine border border-sunshine/30'
          : 'bg-sakura/10 text-sakura border border-sakura/30'
        }
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${light ? 'bg-sunshine' : 'bg-sakura'}`} />
      {children}
    </span>
  )
}
