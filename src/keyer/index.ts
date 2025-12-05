/**
 * Keyer 核心能力声明
 *
 * 这个模块只负责声明接口,具体实现由 app 的 src/app/keyer 提供
 * 插件可以通过 Keyer 实例访问应用的核心能力
 */

import { IMainAPI } from "./main-api"
import { IRenderAPI } from "./render-api"

export interface IKeyer extends IMainAPI, IRenderAPI { }

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
