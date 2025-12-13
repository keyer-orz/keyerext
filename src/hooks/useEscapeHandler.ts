import { useEffect } from 'react'
import { useNavigation } from './useNavigation'

export function useEscapeHandler(handler: boolean | (() => boolean)) {
  const { registerEscapeHandler, unregisterEscapeHandler } = useNavigation()

  useEffect(() => {
    const escapeHandler = () => {
      return typeof handler === 'function' ? handler() : !handler
    }

    registerEscapeHandler(escapeHandler)
    return unregisterEscapeHandler
  }, [handler, registerEscapeHandler, unregisterEscapeHandler])
}
