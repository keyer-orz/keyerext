#!/usr/bin/env node

/**
 * 通用扩展打包脚本
 * 读取扩展的 package.json 中的 files 字段，打包指定文件到 release 目录
 * 
 * 用法: keyerext-pack [extension-dir]
 * 如果不指定目录，使用当前目录
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取扩展目录
const extDir = process.argv[2] || process.cwd()
const pkgPath = path.join(extDir, 'package.json')

// 检查 package.json 是否存在
if (!fs.existsSync(pkgPath)) {
  console.error('❌ package.json not found in:', extDir)
  process.exit(1)
}

// 读取 package.json
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

if (!pkg.name) {
  console.error('❌ package.json missing "name" field')
  process.exit(1)
}

// 获取要打包的文件列表
const files = pkg.files || ['dist']
const filesToPack = files
  .map(f => f.replace(/\/\*\*\/\*$/, '')) // 移除 /**/* 通配符
  .filter(f => {
    const fullPath = path.join(extDir, f)
    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  File/directory not found, skipping: ${f}`)
      return false
    }
    return true
  })

if (filesToPack.length === 0) {
  console.error('❌ No files to pack')
  process.exit(1)
}

// 创建 release 目录
const releaseDir = path.join(extDir, 'release')
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true })
}

// 生成压缩包名称
const tarName = `${pkg.name}.tar.gz`
const tarPath = path.join(releaseDir, tarName)

// 打包命令
const filesToPackStr = ['package.json', ...filesToPack].join(' ')
const command = `tar -czf ${tarPath} ${filesToPackStr}`

console.log('📦 Packing extension:', pkg.name)
console.log('📂 Files:', filesToPackStr)
console.log('🎯 Output:', tarPath)

try {
  execSync(command, { cwd: extDir, stdio: 'inherit' })
  console.log('✅ Extension packed successfully!')
} catch (error) {
  console.error('❌ Failed to pack extension:', error.message)
  process.exit(1)
}
