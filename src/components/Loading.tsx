import React from 'react'

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullscreen?: boolean
  overlay?: boolean
  style?: React.CSSProperties
}

export function Loading({
  size = 'medium',
  text,
  fullscreen = false,
  overlay = false,
  style
}: LoadingProps) {
  const sizeClass = `keyer-loading-${size}`
  const fullscreenClass = fullscreen ? 'keyer-loading-fullscreen' : ''
  const overlayClass = overlay ? 'keyer-loading-overlay' : ''

  const content = (
    <div style={style} className={`keyer-loading ${sizeClass}`}>
      <div className="keyer-loading-spinner" />
      {text && <div className="keyer-loading-text">{text}</div>}
    </div>
  )

  if (fullscreen || overlay) {
    return (
      <div className={`keyer-loading-wrapper ${fullscreenClass} ${overlayClass}`}>
        {content}
      </div>
    )
  }

  return content
}
