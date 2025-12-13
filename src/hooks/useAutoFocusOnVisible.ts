import { useEffect, RefObject } from 'react'
import type { InputRef } from '../components/Input'

export function useAutoFocusOnVisible(inputRef: RefObject<InputRef>) {
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
}
