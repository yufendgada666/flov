export default function FlameIcon({ className = '', size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C10 6 7 9 8.5 13C9.5 16 11 17 12 17C13 17 14.5 16 15.5 13C17 9 14 6 12 2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 10C11 12 10 14 11 16C11.5 17.5 12 18 12 18C12 18 12.5 17.5 13 16C14 14 13 12 12 10Z"
        fill="white"
        opacity="0.6"
      />
      <ellipse cx="12" cy="20" rx="3" ry="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
