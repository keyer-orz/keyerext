import { useNavigation } from './useNavigation'
import { useRef, useEffect, useState } from 'react'
 
export function usePageVisible(): boolean {
  const { currentPage } = useNavigation()
  const boundPageName = useRef<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  
  // 在组件首次渲染时绑定当前页面名称
  useEffect(() => {
    if (boundPageName.current === null) {
      boundPageName.current = currentPage?.pageName || '@system#main'
    }
  }, [])
  
  // 检测绑定的页面名称是否与当前栈顶页面一致
  useEffect(() => {
    const currentPageName = currentPage?.pageName || '@system#main'
    setIsVisible(boundPageName.current === currentPageName)
  }, [currentPage])
  
  return isVisible
}
