import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glow?: 'default' | 'success' | 'alarm'
}

export function Card({ children, className = '', glow = 'default' }: CardProps) {
  const glowClass =
    glow === 'success'
      ? 'shadow-glowSuccess'
      : glow === 'alarm'
        ? 'shadow-glowAlarm'
        : 'shadow-glow'

  return (
    <div
      className={`rounded-xl border border-heist-border bg-heist-panel p-6 ${glowClass} ${className}`}
    >
      {children}
    </div>
  )
}
