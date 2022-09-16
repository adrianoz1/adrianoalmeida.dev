import React from "react"
import {
  Flex,
  Heading,
  Stack,
  Link,
  Icon,
  HStack
} from "@chakra-ui/react"
import { RiMailFill, RiWhatsappFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <Flex
      as="section"
      align="center"
      mx="auto"      
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      w="100%"
      px="6"
      mb="15"
      minH="40vh"
      pt="6"
      maxWidth={1480}
    >
      <Stack
        spacing={4}
        w={{ base: "100%" }}
        borderRadius="2xl"
        align={["center", "center"]}
      >
        <Stack>
          <Heading
            as="h3"
            size="2xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center"]}
          >
            🙋🏽‍♂️ Bora bater um papo?
          </Heading>
        </Stack>
        <HStack>
          <Link href="mailto: adrianoo.luis.almeida@gmail.com" target="_blank">
            <Icon 
                alignSelf="center"
                width="100%"
                _hover={{
                    color:
                    'yellow.500'
                }} 
                as={RiMailFill} 
                fontSize="24" />
          </Link>
          <Link href="https://wa.me/5555991312271" target="_blank">
            <Icon 
                alignSelf="center"
                width="100%"
                _hover={{
                    color:
                    'yellow.500'
                }} 
                as={RiWhatsappFill} 
                fontSize="24" />
          </Link>
        </HStack>
      </Stack>
    </Flex>
  )
}
