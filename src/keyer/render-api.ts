import { CommandResult, ICommand, IExtensionStore } from '../types';

export interface ClipboardData {
  text?: string
  image?: string
  html?: string
}

export interface IRenderAPI {
  clipboard: {
    read(): Promise<ClipboardData>
    readText(): Promise<string>
    readImage(): Promise<string | null>
    writeText(text: string): Promise<void>
    writeImage(image: string | Buffer): Promise<void>
    writeHtml(html: string): Promise<void>
    clear(): Promise<void>
  },
  command: {
    register(cmd: ICommand, handler: () => CommandResult): Promise<void>  // 注册插件
  }
  store: IExtensionStore
  toast: {
    show(icon: 'info' | 'success' | 'error' | 'warning', message: string, duration?: number): Promise<void>
  }
}