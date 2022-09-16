import React from "react"
import {
  Box,
  Flex,
  Heading,
  Stack,
  Avatar,
} from "@chakra-ui/react"

export default function Author({
  ...rest
}) {
  return (
    <Flex
      as="section"
      align="center"
      mx="auto"      
      justify="space-between"
      direction={{ base: "column-reverse", md: "row" }}
      minH="70vh"
      w="100%"
      px="6"
      pb="10"
      pt="6"
      maxWidth={1480}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "60%", lg: "70%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="lg"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          Sobre o autor
        </Heading>
        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          Olá! Caso você tenha caído aqui de paraquedas, deixa eu me apresentar primeiro. Meu nome é Adriano Almeida, sou <i>Software Enginner</i> e nas horas vagas gosto de criar conteúdo sobre tecnologia e programação. Tenho mais de dez anos de mercado e comecei como programador full- stack. Sou <i>Bacharel em Sistemas de Informação pela Universidade Federal de Santa Maria (UFSM)</i>.
        </Heading>

        <Heading
          as="h2"
          size="md"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          Se você tem intenção de facilitar o seu processo de contratação na área de programação, então esse ebook vai te ensinar algumas facilidades que eu aprendi com muita experiência e mão na massa.
          
        </Heading>

      </Stack>
      <Box w={{ base: "80%", sm: "80%", md: "35%", lg: "30%" }} borderRadius="50%" mb={{ base: 12, md: 0 }}>
        <Avatar src="https://www.github.com/adrianoluisalmeida.png" size="full"  borderColor="gray.800" borderWidth="15px" />
      </Box>
    </Flex>
  )
}


