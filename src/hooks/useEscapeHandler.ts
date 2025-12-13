import { useEffect, useRef } from 'react'
import { useNavigation } from './useNavigation'

export function useEscapeHandler(handler: boolean | (() => boolean)) {
  const navigation = useNavigation()
  const handlerRef = useRef(handler)

  // 保持 handler 引用最新
  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const escapeHandler = () => {
      return typeof handlerRef.current === 'function' ? handlerRef.current() : !handlerRef.current
    }

    navigation.registerEscapeHandler(escapeHandler)
    return () => navigation.unregisterEscapeHandler()
  }, []) // 空依赖数组，只在 mount/unmount 时执行
}
