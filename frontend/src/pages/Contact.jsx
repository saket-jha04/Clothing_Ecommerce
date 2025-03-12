import React from 'react'
import Navbar from '../components/Navbar'
import Newsletterbox from '../components/Newsletterbox'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div>
      <Navbar />
<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] py-10'>
      <div className='flex flex-col justify-start gap-4 sm:gap-10'>
        <h1 className='font-bold text-xl sm:text-3xl font-sans'>Contact Us</h1>
        <div className='flex flex-col gap-2'>
          <p className='text-sm sm:text-base text-wrap'>We are here to help! Whether you have questions about our products, need assistance with your order, or simply want to connect with our team, we're happy to hear from you.</p>
          <p className='text-sm sm:text-base font-semibold'>Get in Touch:</p>
          <div className='flex flex-row gap-1 items-center'>
            <p className='text-sm sm:text-base font-semibold'>Email:</p>
            <p className='text-sm sm:text-base underline cursor-pointer'>helpnothing@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    <Newsletterbox />
    <Footer />
    </div>
    
  )
}

export default Contact
