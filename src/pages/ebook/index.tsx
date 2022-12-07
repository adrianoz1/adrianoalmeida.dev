import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { Header } from "../../components/Header";
import EbookComponent from "../../components/Ebook/Header";
import Footer from "../../components/Footer";
import Author from "../../components/Ebook/Author";
import Newsletter from "../../components/Newsletter";

const Ebook: NextPage = () => {
  return (
    <Container maxW="1024px">
      <Header />
      <EbookComponent
        subtitle="Conheça as habilidades indispensáveis para acelerar o seu processo de contratação na oportunidade que sempre sonhou! "
        title="O Caminho Mais Fácil Para Você Se Tornar DEV!"
        key="1"
        image="https://s3publicimage.s3.amazonaws.com/ebook-mockup.png"
      />
      <Stack padding="10">
        <Heading
          as="h3"
          size="xl"
          marginBottom={7}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          📚 O que você vai aprender?
        </Heading>

        <SimpleGrid columns={[1, 2, 3]} spacing="40px">
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            Descubra o que as empresas esperam de você
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            Aprenda como conseguir o seu trabalho dos sonhos
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            Tenha clareza do que desenvolver além de suas habilidades técnicas
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            Saiba onde e como ser descoberto pelos recrutadores
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            {" "}
            Aprenda como se relacionar com as pessoas e como se destacar
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            paddingTop="6"
            textAlign="center"
            minHeight="80px"
          >
            E muito mais!
          </Box>
        </SimpleGrid>
      </Stack>

      <Author />

      <Stack padding="10">
        <Heading
          as="h3"
          size="xl"
          marginBottom={7}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          🤔 Para quem é esse ebook?
        </Heading>

        <SimpleGrid columns={[1]} spacing="40px">
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
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
            Se você enxergou na área de tecnologia uma oportunidade para
            melhorar suas condições de vida, você está certo. As vagas para esta
            área possuem os melhores salários do mercado, e eu me proponho a te
            ensinar como conseguir sua primeira oportunidade de forma simples e
            direta.
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
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
            O ebook é perfeito para quem está trabalhando com programação e quer
            saber como acelerar o seu processo de desenvolvimento profissional
            e, além disso, desfrutar dos altos salários que a área nos
            proporciona.
          </Box>
          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
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
            Em pouco tempo você vai perceber que para atuar na área de
            tecnologia não basta ter conhecimentos técnicos, é necessário
            desenvolver outras habilidades que vão te destacar entre a
            concorrência. Neste ebook, de forma simples e direta, vou te ensinar
            todas elas.
          </Box>

          <Box
            borderRadius="2xl"
            backgroundColor="gray.800"
            padding={4}
            textAlign="center"
            minHeight="80px"
          >
            <Heading
              as="h3"
              size="md"
              marginBottom={7}
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center"]}
            >
              <Text as="mark">Para Você</Text>
            </Heading>
            Se você chegou até aqui, você está pronto para conseguir a sua
            primeira oportunidade como dev e alcançar o salário que sempre
            sonhou.
          </Box>
        </SimpleGrid>
        
      </Stack>

      <Stack padding="10" id="resgatar-ebook">
        <Heading
          as="h3"
          size="xl"
          marginBottom={7}
          fontWeight="bold"
          color="primary.800"
          textAlign={["center", "center"]}
        >
          🚀 Conteúdo Exclusivo!
        </Heading>

        <SimpleGrid columns={[1]} spacing="40px">
          <Box
            borderRadius="2xl"
            backgroundColor="black"
            padding={6}
            textAlign="center"
            minHeight="80px"
          >
            <Heading
              as="h3"
              size="lg"
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center"]}
            ></Heading>
            <Text fontSize="xl">
              Ao adquirir esse ebook você vai aprender o caminho mais fácil para
              você se tornar dev. E mais, você vai começar a receber dicas e
              truques exclusivos sobre programação e tecnologia! Não perca essa
              oportunidade única!
            </Text>
          </Box>
        </SimpleGrid>
      </Stack>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Ebook;
