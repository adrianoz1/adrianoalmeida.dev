import React from "react"
import {
  Flex,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react"

export default function About() {
  return (
    <Flex
      as="section"
      align="center"
      mx="auto"      
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      px="6"
      pt="10"
      maxWidth={1480}
    >
      <Stack
        spacing={4}
        borderRadius="2xl"
        padding="4"
        backgroundColor="gray.800"
        align={["center", "center"]}
      >
        <Stack padding="10">
          <Text align="center" mb="10">
            Programador e entusiasta em desenvolvimento web há mais de 8 anos. Tenho experiência de atuação em grandes projetos nas mais variadas tecnologias.
          </Text>
          <Text align="center" mb="10">
            Empreendedor nato, buscando sempre solucionar problemas e criar negócios usando a tecnologia. Possuo experiência com Javascript, TypeScript, React, React Native, Styled-Components, NodeJS, C#, PHP dentre outras tecnologias que uso para criar aplicações web/mobile de alto nível e valor.
          </Text>
        </Stack>
      </Stack>
    </Flex>
  )
}