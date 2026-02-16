import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  children: ReactNode
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'rounded-lg px-6 py-3 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-heist-premium text-white hover:bg-heist-premium/80 shadow-glow',
    secondary:
      'bg-heist-border text-gray-200 hover:bg-heist-border/80 border border-heist-border',
    success:
      'bg-heist-success text-white hover:bg-heist-success/80 shadow-glowSuccess',
    danger: 'bg-heist-alarm text-white hover:bg-heist-alarm/80 shadow-glowAlarm',
  }
  const widthClass = fullWidth ? 'w-full' : ''
  return (
    <button
      className={`${base} ${variants[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
