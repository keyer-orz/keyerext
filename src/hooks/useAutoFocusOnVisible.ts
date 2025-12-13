import { useEffect, RefObject } from 'react'
import type { InputRef } from '../components/Input'
import { useNavigation } from './useNavigation'

export function useAutoFocusOnVisible(inputRef: RefObject<InputRef>) {
  const { stack } = useNavigation()
  useEffect(() => {
    inputRef.current?.focus()
  }, [stack])
}
