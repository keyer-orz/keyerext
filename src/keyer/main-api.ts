export interface ExecResult {
  success: boolean
  output?: string
  error?: string
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
  }
  shortcuts: {
    updateGlobal: (shortcut: string) => Promise<boolean> // save and register global shortcut
    updateCommand: (cmdId: string, shortcut: string | undefined) => Promise<boolean>
    registerGlobal: (shortcut: string) => Promise<boolean>
    registerCommand: (cmdId: string, shortcut: string | undefined) => Promise<boolean>
  }
  exec: {
    terminal: (cmd: string, cwd?: string) => Promise<ExecResult>
    window: (cmd: string, cwd?: string) => Promise<ExecResult>
  }
  path: {
    userData: (...dirs: string[]) => string
    appPath: (...dirs: string[]) => string
  }
}