import { Flex, Avatar, Container } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { Header } from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'

const Home: NextPage = () => {
  return (
    <Container maxW="1024px">
      <Header />
      <Hero
        subtitle="Codificando para impactar na vida das pessoas! 🚀"
        title="Adriano Almeida"
        key="1"
        image="https://www.github.com/adrianoluisalmeida.png" />
      
      <About />
      <Newsletter />
      <Footer />
    </Container>
  )
}

export default Home
