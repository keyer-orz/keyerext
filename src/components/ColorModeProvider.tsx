import React, { createContext, useContext, useEffect, useState } from 'react'

type ColorMode = 'light' | 'dark'

interface ColorModeContextType {
    colorMode: ColorMode
    setColorMode: (mode: ColorMode) => void
    toggleColorMode: () => void
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined)

export interface ColorModeProviderProps {
    children: React.ReactNode
    initialColorMode?: ColorMode
}

export function ColorModeProvider({ children, initialColorMode = 'dark' }: ColorModeProviderProps) {
    const [colorMode, setColorModeState] = useState<ColorMode>(initialColorMode)

    const setColorMode = (mode: ColorMode) => {
        setColorModeState(mode)
        const root = document.documentElement
        if (mode === 'dark') {
            root.classList.add('dark')
            root.style.colorScheme = 'dark'
        } else {
            root.classList.remove('dark')
            root.style.colorScheme = 'light'
        }
        root.setAttribute('data-theme', mode)
    }

    const toggleColorMode = () => {
        setColorMode(colorMode === 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        setColorMode(initialColorMode)
    }, [initialColorMode])

    return (
        <ColorModeContext.Provider value={{ colorMode, setColorMode, toggleColorMode }}>
            {children}
        </ColorModeContext.Provider>
    )
}

export function useColorMode() {
    const context = useContext(ColorModeContext)
    if (!context) {
        throw new Error('useColorMode must be used within a ColorModeProvider')
    }
    return context
}
