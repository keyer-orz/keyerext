import React from 'react'

export interface TextProps {
  children: React.ReactNode
  color?: 'title' | 'subtitle'
  size?: 'large' | 'medium' | 'small'
  weight?: 'normal' | 'medium' | 'bold'
  style?: React.CSSProperties
}

export function Text({ children, color = 'title', size = 'medium', weight = 'normal', style }: TextProps) {
  const classes = [
    'keyer-text',
    `keyer-text-${color}`,
    `keyer-text-${size}`,
    `keyer-text-${weight}`
  ].join(' ')

  return <span className={classes} style={style}>{children}</span>
}
