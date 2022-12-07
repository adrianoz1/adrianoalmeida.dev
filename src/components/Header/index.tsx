import { Flex, Text, Icon, HStack, Link } from '@chakra-ui/react'
import { RiFacebookBoxFill, RiGithubFill, RiInstagramFill, RiLinkedinBoxFill, RiYoutubeFill } from 'react-icons/ri'
import { SocialIcon } from '../SocialIcon'

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="light"
        w="64">
        Aa
        <Text as="span" ml="1" color="yellow.500">
          .
        </Text>
        dev
      </Text>

      <Flex
        align="center"
        ml="auto"
      >
        <HStack
          spacing="4"
          mx="8"
          pr="1"
          py="1"
          color="gray.300">
            <SocialIcon icon={RiLinkedinBoxFill} href="https://www.linkedin.com/in/adrianoluisalmeida/" />
            <SocialIcon icon={RiYoutubeFill} href="https://www.youtube.com/adrianoalmeidadev" />
            <SocialIcon icon={RiInstagramFill} href="https://www.instagram.com/adrianoalmeidadev/" />
            <SocialIcon icon={RiFacebookBoxFill} href="https://www.facebook.com/adrianoalmeidadev" />
            <SocialIcon icon={RiGithubFill} href="https://www.github.com/adrianoz1" />
        </HStack>

      </Flex>
    </Flex>
  )
}
