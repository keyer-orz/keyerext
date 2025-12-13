import { createContext, ReactElement } from 'react'
import { ExtensionContextType } from './ExtensionContext';

export interface PageStackItem {
  pageName: string
  element: ReactElement
  windowSize?: { width: number; height: number }
  ctx: ExtensionContextType
}

export interface NavigationContextType {
  push: (page: string) => void
  pop: () => void
  escapeHandler: (handler: () => boolean) => void
  currentPage: PageStackItem | null
  stack: PageStackItem[]
  
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined)
