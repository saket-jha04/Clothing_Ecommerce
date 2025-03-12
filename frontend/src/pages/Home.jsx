import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import Review from '../components/Review'
import Navbar from '../components/Navbar'
import Newsletterbox from '../components/Newsletterbox'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
    <Navbar />
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Review />
      <Policy />
      <Newsletterbox />
      <Footer />
    </>
  )
}

export default Home
