import React from 'react'

export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'default' | 'primary' | 'danger'
  size?: 'big' | 'normal' | 'small'
  disabled?: boolean
  style?: React.CSSProperties
}

export function Button({
  children,
  onClick,
  type = 'default',
  size = 'normal',
  disabled = false,
  style
}: ButtonProps) {
  const typeClass = `keyer-button-${type}`
  const sizeClass = `keyer-button-${size}`
  const disabledClass = disabled ? 'keyer-button-disabled' : ''

  return (
    <button
      className={`keyer-button ${typeClass} ${sizeClass} ${disabledClass}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  )
}
