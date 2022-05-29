import { Icon, Link } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

interface SocialIconProps {
  href: string;
  icon: IconType;
}

export function SocialIcon({ href, icon }: SocialIconProps) {
  return (
    <Link href={href} target="_blank" _focus={{ outline: '0' }}>
      <Icon 
      _hover={{
          color:
          'yellow.500'
      }} 
      as={icon} 
      fontSize="24" />
    </Link>
  )
}