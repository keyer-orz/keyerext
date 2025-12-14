import React, { useState, useEffect, useCallback, useRef } from 'react'
import { usePageVisible } from '../hooks/usePageVisible'

export interface ListItem<T = any> {
  id: string
  data: T
}

export interface ListGroup<T = any> {
  title?: string | React.ReactElement | (() => React.ReactElement)
  items: ListItem<T>[]
}

export interface ListProps<T = any> {
  items: ListGroup<T>[] | ListItem<T>[]
  selectedId?: string
  onClick?: (id: string, data: T) => void  // 鼠标单击
  onSelect?: (id: string, data: T) => void // 键盘或鼠标选中
  onEnter?: (id: string, data: T) => void  // 回车/双击
  renderItem: (item: ListItem<T>, isSelected: boolean, isHovered: boolean) => React.ReactNode
  renderHeader?: () => React.ReactNode  // 固定头部，不随列表滚动
  style?: React.CSSProperties
}

export function List<T = any>({ items, selectedId, onClick, onSelect, onEnter, renderItem, renderHeader, style }: ListProps<T>) {
  const [hoverId, setHoverId] = useState<string | null>(null)
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId)
  const isPageVisible = usePageVisible()
  
  // 标准化 items 为 groups 格式
  const groups: ListGroup<T>[] = React.useMemo(() => {
    if (items.length === 0) return []
    
    // 检查是否是 ListGroup[] 格式
    const firstItem = items[0]
    if ('items' in firstItem) {
      return items as ListGroup<T>[]
    }
    
    // 否则是 ListItem[] 格式，转换为单个 group
    return [{ items: items as ListItem<T>[] }]
  }, [items])
  
  // 获取所有项的扁平列表
  const allItems = groups.flatMap(group => group.items)
  const currentSelectedId = selectedId !== undefined ? selectedId : internalSelectedId
  // refs: 记录每个 item 的 dom
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (selectedId !== undefined) {
      setInternalSelectedId(selectedId)
    }
  }, [selectedId])

  // 选中项变化时自动滚动到可视区
  useEffect(() => {
    if (currentSelectedId && itemRefs.current[currentSelectedId]) {
      itemRefs.current[currentSelectedId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [currentSelectedId])

  const handleSelect = useCallback((id: string, data: T) => {
    setInternalSelectedId(id)
    onSelect?.(id, data)
  }, [onSelect])

  const handleClick = useCallback((id: string, data: T) => {
    setInternalSelectedId(id)
    onClick?.(id, data)
  }, [onClick])

  const handleEnter = useCallback((id: string, data: T) => {
    onEnter?.(id, data)
  }, [onEnter])

  // 键盘导航 - 只在绑定的页面为栈顶时响应
  useEffect(() => {
    // 只有当绑定的页面为栈顶且有项目时才监听键盘事件
    if (!isPageVisible || allItems.length === 0) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()

        const currentIndex = allItems.findIndex(item => item.id === currentSelectedId)
        let nextIndex: number

        if (e.key === 'ArrowUp') {
          nextIndex = currentIndex <= 0 ? allItems.length - 1 : currentIndex - 1
        } else {
          nextIndex = currentIndex >= allItems.length - 1 ? 0 : currentIndex + 1
        }

        const nextItem = allItems[nextIndex]
        if (nextItem) {
          handleSelect(nextItem.id, nextItem.data)
        }
      } else if (e.key === 'Enter' && currentSelectedId) {
        e.preventDefault()
        e.stopPropagation()
        
        const currentItem = allItems.find(item => item.id === currentSelectedId)
        if (currentItem) {
          handleEnter(currentSelectedId, currentItem.data)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPageVisible, allItems, currentSelectedId, handleClick, handleSelect, handleEnter])

  const renderTitle = (title: string | React.ReactElement | (() => React.ReactElement)) => {
    if (typeof title === 'function') {
      return title()
    }
    return title
  }

  return (
    <div className={`keyer-list`} style={style}>
      {renderHeader && (
        <div className="keyer-list-header">{renderHeader()}</div>
      )}
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="keyer-list-group">
          {group.title && (
            <div className="keyer-list-group-title">{renderTitle(group.title)}</div>
          )}
          {group.items.map((item) => {
            const isSelected = item.id === currentSelectedId
            const isHovered = item.id === hoverId
            return (
              <div
                key={item.id}
                ref={el => itemRefs.current[item.id] = el}
                className={`keyer-list-item ${isSelected ? 'keyer-list-item-selected' : ''}`}
                onClick={() => handleClick(item.id, item.data)}
                onDoubleClick={() => handleEnter(item.id, item.data)}
                onMouseEnter={() => setHoverId(item.id)}
                onMouseLeave={() => setHoverId(null)}
              >
                {renderItem(item, isSelected, isHovered)}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
