import { IExtensionStore } from './keyer'

export type ICommand = {
    id?: string
    name: string
    title?: string
    icon?: string
    desc?: string
    extTitle?: string
    type?: string // 类型
    windowSize?: { width: number; height: number } // 窗口尺寸（可选，不配置则使用默认尺寸）
}

export namespace WindowSize {
    export const Normal = { width: 800, height: 500 } // 默认尺寸
    export const Large = { width: 1000, height: 800 } // 适合复杂内容
    export const Small = { width: 400, height: 300 }  // 适合简单内容
    export const Wide = { width: 1200, height: 600 }  // 适合左右分屏
}

export interface IExtension {
    /**
     * 扩展数据存储（由框架注入）
     */
    store?: IExtensionStore;
    dir?: string;
    
    load?(): ICommand[];
    preview?(input: string): React.ReactElement | null;
    run(name: string): React.ReactElement | null;
}

// Navigation
export { NavigationContext, type NavigationContextType, type PageStackItem } from './contexts/NavigationContext'
export { useNavigation } from './hooks/useNavigation'
export { useEscapeHandler } from './hooks/useEscapeHandler'
export { useInputEscapeHandler } from './hooks/useInputEscapeHandler'
export { usePageVisible } from './hooks/usePageVisible'
export { useAutoFocusOnVisible } from './hooks/useAutoFocusOnVisible'

// Extension Context
export { ExtensionContext, useExtensionContext, type ExtensionContextType, type IExtensionMeta } from './contexts/ExtensionContext'

// UI Components
export { Text, type TextProps } from './components/Text'
export { List, type ListProps, type ListItem, type ListGroup } from './components/List'
export { HStack, VStack, type StackProps } from './components/Stack'
export { Input, type InputProps, type InputRef } from './components/Input'
export { Divider, type DividerProps } from './components/Divider'
export { Dropdown, type DropdownProps, type DropdownOption } from './components/Dropdown'
export { Button, type ButtonProps } from './components/Button'
export { Switch, type SwitchProps } from './components/Switch'
export { RadioGroup, type RadioGroupProps, type RadioOption } from './components/Radio'
export { Loading, type LoadingProps } from './components/Loading'
export { Checkbox, CheckboxGroup, type CheckboxProps, type CheckboxGroupProps } from './components/Checkbox'
export { Drawer, type DrawerProps } from './components/Drawer'
export { Image, type ImageProps } from './components/Image'

// Keyer Core Capabilities
export { Keyer, setKeyer, type IKeyer, type IMainAPI, type IRenderAPI, type IExtensionStore, type ExecResult, type ClipboardData } from './keyer'