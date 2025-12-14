import React from 'react'

export interface TextProps {
  children: React.ReactNode
  color?: 'title' | 'subtitle'
  size?: 'large' | 'medium' | 'small'
  style?: React.CSSProperties
}

export function Text({ children, color = 'title', size = 'medium', style }: TextProps) {
  const classes = [
    'keyer-text',
    `keyer-text-${color}`,
    `keyer-text-${size}`
  ].join(' ')

  return <span className={classes} style={style}>{children}</span>
}
