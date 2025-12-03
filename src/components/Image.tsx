import React from 'react'
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
    ctx?: any
}

export function Image({
    src,
    alt = '',
    width,
    height,
    className,
    style,
    ctx,
}: ImageProps) {
    const imageStyle: React.CSSProperties = {
        ...style,
        width,
        height,
        objectFit: 'contain'
    }
    // 只处理http(s)或app开头的src
    if (/^(https?:|app|asset)/.test(src)) {
        if (src.startsWith('asset://')) {
            src = src.replace('asset://', `asset://${ctx.dir}/assets/`)
        }
        return (
            <img
                src={src}
                alt={alt}
                className={`keyer-image ${className || ''}`}
                style={imageStyle}
            />
        )
    } else {
        // 不是http/app开头，展示首字符或表情
        const displayChar = src || '🖼️'
        return (
            <div 
                className={`keyer-image-fallback ${className || ''}`}
                style={{
                    ...imageStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: typeof width === 'number' ? width / 1.5 : 32
                }}
                title={alt}
            >
                {displayChar}
            </div>
        )
    }
}