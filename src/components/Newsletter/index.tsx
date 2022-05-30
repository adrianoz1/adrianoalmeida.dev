import { Flex, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import NewsletterForm from "./form";

export default function Newsletter() {
  return (
    <Flex
    as="section"
    align="center"
    mx="auto"      
    justify="space-between"
    direction={{ base: "column-reverse", md: "row" }}
    w="100%"
    px="6"
    minH="40vh"
    pt="6"
    maxWidth={1480}
  >
    <Stack
      spacing={4}
      w={{ base: "100%" }}
      borderRadius="2xl"
      padding="4"
      align={["center", "center"]}
    >
      <VStack padding={4} spacing={12}>
        <Heading
          as="h3"
          size="2xl"
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          Fique por dentro dos meus conteúdos semanais!
        </Heading>
        <NewsletterForm />
      </VStack>
    </Stack>
  </Flex>
  )

}