import { useEffect, RefObject } from 'react'
import { useNavigation } from './useNavigation'
import type { InputRef } from '../components/Input'

export function useAutoFocusOnVisible(inputRef: RefObject<InputRef>) {
  const { currentPage } = useNavigation()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [currentPage, inputRef])
}
