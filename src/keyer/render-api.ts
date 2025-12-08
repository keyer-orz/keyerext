export interface ClipboardData {
  text?: string
  image?: string
  html?: string
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
  onProgress?: (downloaded: number, total: number, progress: number) => void
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
    }
    net: {
        request: <T = any>(url: string, options?: NetRequestOptions) => Promise<NetResponse<T>>
        download: (url: string, savePath: string, options?: DownloadOptions) => Promise<boolean>
    }
}