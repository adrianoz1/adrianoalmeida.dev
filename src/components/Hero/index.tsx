import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  Flex,
  Avatar,
  Heading,
  Stack,
} from "@chakra-ui/react"

interface HeroProps {
  title: string,
  subtitle: string,
  image: string,
}

export default function Hero({
  title,
  subtitle,
  image,
  ...rest
}: HeroProps) {
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
      {...rest}
    >
      <Stack
        spacing={4}
        w={{ base: "80%", md: "60%", lg: "70%" }}
        align={["center", "center", "flex-start", "flex-start"]}
      >
        <Heading
          as="h1"
          size="4xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center", "left", "left"]}
        >
          {title}
        </Heading>
        <Heading
          as="h2"
          size="lg"
          color="primary.800"
          opacity="0.8"
          fontWeight="normal"
          lineHeight={1.5}
          textAlign={["center", "center", "left", "left"]}
        >
          {subtitle}
        </Heading>
      </Stack>
      <Box w={{ base: "80%", sm: "80%", md: "35%", lg: "30%" }} borderRadius="50%" mb={{ base: 12, md: 0 }}>
        <Avatar src={image} size="full"  borderColor="gray.800" borderWidth="15px" />
      </Box>
    </Flex>
  )
}