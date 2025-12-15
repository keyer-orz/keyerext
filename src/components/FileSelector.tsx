import React from 'react'
import { HStack, Button, Text } from '../index'
import { Keyer } from '../keyer'

export interface FileSelectorProps {
    value?: string
    placeholder?: string
    onChange?: (path: string) => void
    mode?: 'file' | 'directory'
    extensions?: string[]  // 例如: ['txt', 'md', 'json']
    buttonText?: string
    style?: React.CSSProperties
}

export function FileSelector({
    value,
    placeholder = 'No file selected',
    onChange,
    mode = 'file',
    extensions,
    buttonText,
    style
}: FileSelectorProps) {
    const [v, setV] = React.useState<string | undefined>(value)

    React.useEffect(() => {
        setV(value)
    }, [value])

    const handleSelect = async () => {
        console.log('Opening file selector...')
        try {
            let selectedPath: string | undefined

            if (mode === 'directory') {
                selectedPath = await Keyer.file.selectDirectory()
            } else {
                selectedPath = await Keyer.file.selectFile(extensions)
            }
            console.log('Selected path:', selectedPath)
            if (selectedPath) {
                setV(selectedPath)
                onChange?.(selectedPath)
            }
        } catch (error) {
            console.error('Failed to select file:', error)
        }
    }

    const displayText = v || placeholder
    const defaultButtonText = mode === 'directory' ? 'Select Folder' : 'Select File'

    return (
        <HStack spacing={8} style={style}>
            <Text color={v ? 'title' : 'subtitle'} size='small' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {displayText}
            </Text>
            <Button
                type="primary"
                onClick={handleSelect}>
                {buttonText || defaultButtonText}
            </Button>
        </HStack>
    )
}
