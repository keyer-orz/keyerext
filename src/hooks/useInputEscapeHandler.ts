import { RefObject } from 'react'
import { useEscapeHandler } from './useEscapeHandler'
import type { InputRef } from '../components/Input'
 
export function useInputEscapeHandler(inputRef: RefObject<InputRef>) {
  useEscapeHandler(() => {
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
  })
}
