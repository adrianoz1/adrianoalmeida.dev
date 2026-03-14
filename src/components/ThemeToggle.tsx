import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  const hoverBg = useColorModeValue('gray.100', 'gray.700')
  const borderColor = useColorModeValue('gray.300', 'borderSubtle')
  const color = useColorModeValue('gray.700', 'gray.100')
  const bg = useColorModeValue('white', 'surfaceBg')

  return (
    <IconButton
      aria-label={colorMode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      icon={colorMode === 'dark' ? <RiSunLine /> : <RiMoonLine />}
      onClick={toggleColorMode}
      variant="ghost"
      color={color}
      bg={bg}
      border="1px solid"
      borderColor={borderColor}
      _hover={{ bg: hoverBg }}
    />
  )
}
