import React, { useState, useEffect, useRef } from 'react'

import { Keyer } from '../keyer'

export interface ImageProps {
    src: string
    alt?: string
    width?: number | string
    height?: number | string
    className?: string
    style?: React.CSSProperties
    onLoad?: () => void
    onError?: (error: Error) => void
    fallback?: React.ReactNode
}

export function Image({
    src,
    alt = '',
    width,
    height,
    className,
    style,
    onLoad,
    onError,
    fallback
}: ImageProps) {
    const [imageSrc, setImageSrc] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        loadImage()
    }, [src])


    const loadImage = async () => {
        if (!src) {
            setError(new Error('No source provided'))
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            let finalSrc: string

            if (src.startsWith('app://')) {
                // 通过 Keyer.app.getFileIcon 获取主进程的 base64 图标
                const appPath = src.replace('app://', '')
                if (Keyer?.app?.getFileIcon) {
                    finalSrc = await Keyer.app.getFileIcon(appPath)
                } else {
                    throw new Error('Keyer.app.getFileIcon not available')
                }
            } else if (src.startsWith('http://') || src.startsWith('https://')) {
                // 处理 HTTP/HTTPS URL
                finalSrc = await handleHttpUrl(src)
            } else {
                // 直接使用源地址（如 data: URLs）
                finalSrc = src
            }
            setImageSrc(finalSrc)
            setLoading(false)
            onLoad?.()

        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to load image')
            setError(error)
            setLoading(false)
            onError?.(error)
        }
    }
 
    const handleHttpUrl = async (url: string): Promise<string> => {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            const blob = await response.blob()
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result as string)
                reader.onerror = () => reject(new Error('Failed to read image blob'))
                reader.readAsDataURL(blob)
            })
        } catch (err) {
            throw new Error(`Failed to fetch image: ${url} - ${err}`)
        }
    }

    const imageStyle: React.CSSProperties = {
        ...style,
        width,
        height,
        objectFit: 'contain'
    }

    if (loading) {
        return (
            <div 
                className={`keyer-image-loading ${className || ''}`}
                style={imageStyle}
            >
                <div className="keyer-image-spinner" />
            </div>
        )
    }

    if (error || !imageSrc) {
        if (fallback) {
            return <>{fallback}</>
        }
        return (
            <div 
                className={`keyer-image-error ${className || ''}`}
                style={imageStyle}
                title={error?.message || 'Failed to load image'}
            >
                <span className="keyer-image-error-icon">🖼️</span>
            </div>
        )
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            className={`keyer-image ${className || ''}`}
            style={imageStyle}
            onLoad={() => onLoad?.()}
            onError={(e) => {
                const error = new Error('Image load failed')
                setError(error)
                onError?.(error)
            }}
        />
    )
}