import React from 'react'
import Navbar from './Hero/Navbar'
// import Data from './/Dasboard/Data'
import Products from './Product/Hewan'
import Pakan from './Product/Pakan'
import Hero from './Hero/Hero'
import Footer from './Hero/Footer'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Pakan />
      <Footer />
    </div>
  )
}

export default Home
