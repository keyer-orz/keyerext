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
    preview(cmd: string, handler: (input: string) => JSX.Element | null): Promise<void> // 预览输入
  }
  store: IExtensionStore
}