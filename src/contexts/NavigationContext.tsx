import { createContext, ReactElement } from 'react'
import { ExtensionContextType } from './ExtensionContext';

export interface PageStackItem {
  pageName: string
  element: ReactElement
  escapeHandler?: () => boolean
  windowSize?: { width: number; height: number }
  ctx: ExtensionContextType
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
