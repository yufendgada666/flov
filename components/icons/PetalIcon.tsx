export default function PetalIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="12" cy="7" rx="3.5" ry="6" fill="currentColor" opacity="0.85" />
      <ellipse cx="12" cy="7" rx="3.5" ry="6" fill="currentColor" opacity="0.6" transform="rotate(72 12 12)" />
      <ellipse cx="12" cy="7" rx="3.5" ry="6" fill="currentColor" opacity="0.6" transform="rotate(144 12 12)" />
      <ellipse cx="12" cy="7" rx="3.5" ry="6" fill="currentColor" opacity="0.6" transform="rotate(216 12 12)" />
      <ellipse cx="12" cy="7" rx="3.5" ry="6" fill="currentColor" opacity="0.6" transform="rotate(288 12 12)" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
    </svg>
  )
}
