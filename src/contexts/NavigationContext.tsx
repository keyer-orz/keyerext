import { createContext, ReactElement } from 'react'
import { IExtensionMeta } from './ExtensionContext';

export interface PageStackItem {
  pageName: string
  element: ReactElement
  escapeHandler?: () => boolean
  windowSize?: { width: number; height: number }
  ctx: IExtensionMeta
}

export interface NavigationContextType {
  push: (page: string) => void
  pop: () => void
  currentPage: PageStackItem | null
  stack: PageStackItem[]
  registerEscapeHandler: (handler: () => boolean) => void
  unregisterEscapeHandler: () => void
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined)
