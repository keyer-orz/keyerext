/**
 * Keyer 核心能力声明
 *
 * 这个模块只负责声明接口,具体实现由 app 的 src/app/keyer 提供
 * 插件可以通过 Keyer 实例访问应用的核心能力
 */

import IMainAPI, { ExecResult } from "./main-api"
import IRenderAPI, { ClipboardData } from "./render-api"

// Re-export types from main-api and render-api
export type { ExecResult, ClipboardData }
export type { default as IMainAPI } from "./main-api"
export type { default as IRenderAPI } from "./render-api"

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

export interface IKeyer extends IMainAPI, IRenderAPI {}

/**
 * 全局 Keyer 实例
 * 由 app 在运行时注入实现
 */
export let Keyer: IKeyer

/**
 * 设置 Keyer 实例 (由 app 调用)
 * @internal
 */
export function setKeyer(instance: IKeyer): void {
  Keyer = instance
}
