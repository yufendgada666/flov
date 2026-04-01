import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-sakura text-white hover:bg-sakura-dark shadow-md shadow-sakura/25 hover:shadow-lg hover:shadow-sakura/30 hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'border-2 border-sakura text-sakura hover:bg-sakura/10 hover:border-sakura-dark hover:-translate-y-0.5',
    ghost: 'text-charcoal-light hover:text-charcoal hover:bg-charcoal/5',
    gold:
      'bg-sunshine text-charcoal hover:bg-sunshine-dark shadow-md shadow-sunshine/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3.5 text-base',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
