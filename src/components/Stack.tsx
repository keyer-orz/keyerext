import React from 'react'

export interface StackProps {
  children: React.ReactNode
  spacing?: number
  style?: React.CSSProperties
}

export function HStack({ children, spacing = 8, style = {} }: StackProps) {
  return (
    <div
      className="keyer-hstack"
      style={{ gap: `${spacing}px`, ...style }}
    >
      {children}
    </div>
  )
}

export function VStack({ children, spacing = 8, style = {} }: StackProps) {
  return (
    <div
      className="keyer-vstack"
      style={{ gap: `${spacing}px`, ...style }}
    >
      {children}
    </div>
  )
}
