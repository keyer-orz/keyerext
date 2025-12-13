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

export enum CommandMode {
    Action = 'action', // 默认模式，执行时加载
    View = 'view',     // KeyerUI 内嵌视图模式, 执行时加载
    Window = 'window', // 独立窗口模式, 执行时加载
    Inline = 'inline'  // 内联模式, 在主界面内嵌显示, 可以接受主界面的 Input 输入, App 启动加载
}

export type ICommand = {
    name: string
    title?: string
    icon?: string
    desc?: string
    mode?: CommandMode // 默认为 'action'
}

export namespace WindowSize {
    export const Normal = { width: 800, height: 500 } // 默认尺寸
    export const Large = { width: 1000, height: 800 } // 适合复杂内容
    export const Small = { width: 400, height: 300 }  // 适合简单内容
    export const Wide = { width: 1200, height: 600 }  // 适合左右分屏
}

export type CommandResult = JSX.Element | null | {
    component: JSX.Element
    size: { width: number, height: number }
}