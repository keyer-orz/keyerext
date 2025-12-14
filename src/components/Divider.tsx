import React from 'react'

export interface DividerProps {
  vertical?: boolean
  style?: React.CSSProperties
}

export function Divider({ vertical = false, style }: DividerProps) {
  return (
    <div 
      className={vertical ? 'keyer-divider-vertical' : 'keyer-divider'} 
      style={style}
    />
  )
}
