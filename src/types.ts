/**
 * 扩展数据存储接口
 */
export interface IExtensionStore {
    /**
     * 获取数据
     * @param key 键名
     * @param defaultValue 默认值
     */
    get<T = any>(key: string, defaultValue?: T): T

    /**
     * 设置数据
     * @param key 键名
     * @param value 值
     */
    set<T = any>(key: string, value: T): void

    /**
     * 删除数据
     * @param key 键名
     */
    delete(key: string): void

    /**
     * 检查键是否存在
     * @param key 键名
     */
    has(key: string): boolean

    /**
     * 清空所有数据
     */
    clear(): void

    /**
     * 获取所有键名
     */
    keys(): string[]

    /**
     * 保存到文件（自动调用，通常不需要手动调用）
     */
    save(): Promise<void>
}


export type ICommand = {
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

export type CommandResult = React.ReactElement | null | {
    component: React.ReactElement
    size: { width: number, height: number }
}
export interface IExtension {
    /**
     * 扩展数据存储（由框架注入）
     */
    store?: IExtensionStore;
    load?(): ICommand[];
    preview?(input: string): React.ReactElement | null;
    run(name: string): React.ReactElement | null;
}