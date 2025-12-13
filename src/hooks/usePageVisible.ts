import { useNavigation } from './useNavigation'
import { useRef } from 'react'
 
export function usePageVisible(): boolean {
  const { currentPage } = useNavigation()
  const boundPageName = useRef(currentPage?.pageName || '@system#main')
  
  return boundPageName.current === (currentPage?.pageName || '@system#main')
}
