import { Avatar, Box, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import { Header } from "../../components/Header"
import EbookComponent from "../../components/Ebook"
import Footer from "../../components/Footer"

const Ebook: NextPage = () => {
  return (
    <Container maxW="1024px">
      <Header />

      <EbookComponent
        subtitle="Conheça as habilidades indispensáveis para acelerar o seu processo de contração na oportunidade que sempre sonhou! "
        title="O caminho mais fácil para conseguir a primeira oportunidade em programação!"
        key="1"
        image="https://s3publicimage.s3.amazonaws.com/book.png" />

      <Stack padding="10">
        <Heading
          as="h3"
          size="xl"
          marginBottom={7}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          O que você vai aprender?
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} spacing='40px'>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center"  minHeight='80px'>Descubra o que as empresas esperam de você</Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'>Aprenda como conseguir o seu trabalho dos sonhos</Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'>Tenha clareza do que desenvolver além de suas habilidades técnicas</Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'>Saiba onde e como ser descoberto pelos recrutadores</Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'> Aprenda como se relacionar com as pessoas e como se destacar</Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} paddingTop="6" textAlign="center" minHeight='80px'>E muito mais!</Box>
        </SimpleGrid>
    
      </Stack>

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
          Olá! Caso você tenha caído aqui de paraquedas, deixa eu me apresentar primeiro. Meu nome é Adriano Almeida, sou Software Enginner e nas horas vagas gosto de criar conteúdo sobre tecnologia e programação. Tenho mais de dez anos de mercado e comecei como programador full- stack.
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
          Se você tem intenção de facilitar o seu processo de contratação na área de programação, então esse livro vai te ensinar algumas facilidades que eu aprendi com muita experiência e mão na massa.
          
        </Heading>

      </Stack>
      <Box w={{ base: "80%", sm: "80%", md: "35%", lg: "30%" }} borderRadius="50%" mb={{ base: 12, md: 0 }}>
        <Avatar src="https://www.github.com/adrianoluisalmeida.png" size="full"  borderColor="gray.800" borderWidth="15px" />
      </Box>
    </Flex>

      <Stack padding="10">
        <Heading
          as="h3"
          size="xl"
          marginBottom={7}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          Para quem é esse livro?
        </Heading>

        <SimpleGrid columns={[1]} spacing='40px'>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4}   textAlign="center"  minHeight='80px'>
            <Heading
              as="h3"
              size="md"
              marginBottom={7}
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center"]}
            >
              Pessoas em transição de carreira
            </Heading>
              Se você enxergou na área de tecnologia uma oportunidade para melhorar suas condições de vida, você está certo. As vagas para esta área possuem os melhores salários do mercado, e eu me proponho a te ensinar como conseguir sua primeira oportunidade de forma simples e direta.
          </Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'>
            <Heading
              as="h3"
              size="md"
              marginBottom={7}
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center"]}
            >
              Devs iniciantes
            </Heading>
            O livro é perfeito para quem está trabalhando com programação e quer saber como acelerar o seu processo de desenvolvimento profissional e, além disso, desfrutar dos altos salários que a área proporciona
          </Box>
          <Box borderRadius="2xl" backgroundColor="gray.800" padding={4} textAlign="center" minHeight='80px'>
            <Heading
                as="h3"
                size="md"
                marginBottom={7}
                fontWeight="bold"
                color="primary.800"
                textAlign={["center", "center"]}
              >
                Estudantes de tecnologia
              </Heading>
            Em pouco tempo você vai perceber que para atuar na área de tecnologia não basta ter conhecimentos técnicos, é necessário desenvolver outras habilidades que vão te destacar entre a concorrência. Neste ebook, de forma simples e direta, vou te ensinar todas elas. 
          </Box>
        </SimpleGrid>
    
      </Stack>

      <Footer />

    </Container>
  )
}

export default Ebook
