import React, { useEffect, useState } from 'react'
import { HStack } from './Stack'
import { Text } from './Text'

export interface ToastProps {
  id: string
  icon: 'info' | 'success' | 'error' | 'warning'
  message: string
  duration?: number
  onClose: (id: string) => void
}

const ICONS = {
  info: 'ℹ️',
  success: '✅',
  error: '❌',
  warning: '⚠️'
}

export function Toast({ id, icon, message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // 等待动画完成
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  return (
    <div
      className="keyer-toast"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.3s ease'
      }}
    >
      <HStack spacing={8} style={{ alignItems: 'center', padding: '12px 16px' }}>
        <Text size="large">{ICONS[icon]}</Text>
        <Text color="title" size="medium">{message}</Text>
      </HStack>
    </div>
  )
}

export interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="keyer-toast-container">
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  )
}
