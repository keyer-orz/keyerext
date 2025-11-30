import React, { useState, useEffect } from 'react'
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
        console.log(`[Image] Loading image from src: ${src}`)
        if (!src) {
            console.error('[Image] No source provided')
            setError(new Error('No source provided'))
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            setImageSrc(src)
            setLoading(false)
            onLoad?.()
        } catch (err) {
            console.error('[Image] Error loading image:', err)
            const error = err instanceof Error ? err : new Error('Failed to load image')
            setError(error)
            setLoading(false)
            onError?.(error)
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