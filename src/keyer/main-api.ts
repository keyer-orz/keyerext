export interface ExecResult {
  success: boolean
  output?: string
  error?: string
}

export default interface IMainAPI {
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
    updateGlobal: (shortcut: string) => Promise<boolean>
    updateCommand: (cmdId: string, shortcut: string | undefined) => Promise<boolean>
  }
  exec: {
    terminal: (cmd: string, cwd?: string) => Promise<ExecResult>
    window: (cmd: string, cwd?: string) => Promise<ExecResult>
  }
}