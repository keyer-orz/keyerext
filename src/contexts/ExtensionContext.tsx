import { createContext, useContext } from 'react'

export interface ExtensionContextType {
  dir: string;
}

export const ExtensionContext = createContext<ExtensionContextType | undefined>(undefined)

/**
 * 获取当前扩展的上下文信息
 * 扩展可以通过这个 hook 获取自己的元数据和全局配置
 */
export function useExtensionContext() {
  const context = useContext(ExtensionContext)
  if (!context) {
    throw new Error('useExtensionContext must be used within ExtensionProvider')
  }
  return context
}
