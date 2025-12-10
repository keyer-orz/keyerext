export interface ExecResult {
  success: boolean
  output?: string
  error?: string
}

export interface NetRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: string | Record<string, any>
  timeout?: number
}

export interface NetResponse<T = any> {
  status: number
  statusText: string
  headers: Record<string, string>
  data: T
}

export interface DownloadOptions {
  headers?: Record<string, string>
  timeout?: number
}

export interface IMainAPI {
  window: {
    show(): Promise<void>
    hide(): Promise<void>
    resize(size: { width: number; height: number }): Promise<void>
  }
  file: {
    read: (path: string) => Promise<string>
    write: (path: string, content: string) => Promise<void>
    selectDirectory: () => Promise<string | undefined>
    extract: (archivePath: string, targetPath: string) => Promise<boolean>
  }
  shortcuts: {
    registerApp: (shortcut: string) => Promise<boolean>
    registerCommand: (cmdId: string, shortcut: string | undefined) => Promise<boolean>
    unregister(shortcut: string): Promise<boolean>
  }
  exec: {
    terminal: (cmd: string, cwd?: string) => Promise<ExecResult>
    window: (cmd: string, cwd?: string) => Promise<ExecResult>
  }
  path: {
    userData: (...dirs: string[]) => Promise<string>
    appPath: (...dirs: string[]) => Promise<string>
  }
  net: {
    request: <T = any>(url: string, options?: NetRequestOptions) => Promise<NetResponse<T>>
    download: (url: string, savePath: string, options?: DownloadOptions) => Promise<boolean>
  }
}