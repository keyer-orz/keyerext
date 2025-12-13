import { RefObject, useCallback } from 'react'
import type { InputRef } from '../components/Input'
import { useNavigation } from './useNavigation'
import { usePageVisible } from './usePageVisible'

export function useInputEscapeHandler(inputRef: RefObject<InputRef>) {
  const { escapeHandler } = useNavigation()
  const isPageVisible = usePageVisible()
  const handler = useCallback(() => {
    const input = inputRef.current
    if (!input) {
      return true
    }

    // 检查 Input 是否聚焦
    if (!input.isFocused()) {
      input.focus()
      return false // 阻止关闭
    }

    if (!input.isEmpty()) {
      input.clear()
      return false // 阻止关闭
    }

    return true
  }, [inputRef])

  if (isPageVisible)
    escapeHandler(handler)
}
