import { Box, VStack, Text } from '@chakra-ui/react'
import { useEffect, useState, useMemo, useCallback } from 'react'

export interface ListItem<T = any> {
    id: string | number
    data: T
}

export interface ListSection<T = any> {
    header: string
    items: ListItem<T>[]
}

export interface ListProps<T = any> {
    sections: ListSection<T>[]
    onExecute: (item: T) => void
    renderItem: (item: T, isSelected: boolean) => React.ReactNode
}

export function List<T>({ sections, onExecute, renderItem }: ListProps<T>) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const allItems = useMemo(() => sections.flatMap(s => s.items), [sections])

    // Reset selection when items change
    useEffect(() => {
        setSelectedIndex(0)
    }, [allItems.length])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (allItems.length === 0) return

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex(prev => Math.min(prev + 1, allItems.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(prev => Math.max(prev - 1, 0))
            } else if (e.key === 'Enter' && allItems[selectedIndex]) {
                e.preventDefault()
                onExecute(allItems[selectedIndex].data)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [allItems, selectedIndex, onExecute])

    return (
        <VStack align="stretch" gap={3}>
            {sections.map((section, sectionIndex) => {
                // Calculate start index for this section
                const sectionStartIndex = sections
                    .slice(0, sectionIndex)
                    .reduce((acc, s) => acc + s.items.length, 0)

                return (
                    <Box key={`section-${sectionIndex}`}>
                        {/* Section Header */}
                        <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color="gray.500"
                            textTransform="uppercase"
                            mb={2}
                            px={2}
                        >
                            {section.header}
                        </Text>

                        {/* Section Items */}
                        <VStack align="stretch" gap={1}>
                            {section.items.map((item, itemIndex) => {
                                const globalIndex = sectionStartIndex + itemIndex
                                const isSelected = globalIndex === selectedIndex
                                const data = item.data

                                return (
                                    <Box
                                        key={item.id}
                                        onClick={() => onExecute(data)}
                                        cursor="pointer"
                                        px={3}
                                        py={2}
                                        borderRadius="md"
                                        bg={isSelected ? 'blue.500' : 'transparent'}
                                        color={isSelected ? 'white' : 'inherit'}
                                        transition="all 0.15s"
                                        _hover={{
                                            bg: isSelected ? 'blue.600' : 'gray.100'
                                        }}
                                    >
                                        {renderItem(data, isSelected)}
                                    </Box>
                                )
                            })}
                        </VStack>
                    </Box>
                )
            })}
        </VStack>
    )
}
