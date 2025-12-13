import { useEffect, useRef } from 'react'
import { useNavigation } from './useNavigation'

export function useEscapeHandler(handler: boolean | (() => boolean)) {
  const { registerEscapeHandler, unregisterEscapeHandler } = useNavigation()
  const handlerRef = useRef(handler)

  // 保持 handlerRef 同步
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const escapeHandler = () => {
      const currentHandler = handlerRef.current
      if (typeof currentHandler === 'function') {
        return currentHandler()
      }
      return !currentHandler
    }

    registerEscapeHandler(escapeHandler)
    return () => {
      unregisterEscapeHandler()
    }
  }, [registerEscapeHandler, unregisterEscapeHandler])
}
