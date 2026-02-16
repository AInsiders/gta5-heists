import type { ReactNode } from 'react'

interface PanelProps {
  title?: string
  children: ReactNode
  className?: string
}

export function Panel({ title, children, className = '' }: PanelProps) {
  return (
    <div
      className={`rounded-xl border border-heist-border bg-heist-panel p-6 shadow-glow ${className}`}
    >
      {title && (
        <h2 className="mb-4 text-lg font-bold text-white border-b border-heist-border pb-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}
