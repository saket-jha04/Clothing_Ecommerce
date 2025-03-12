import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-around my-12 sm:my-24 gap-10 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-700 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]'> 
      <div>
        <img src={assets.exchange_icon} alt="" className='w-10 mb-4 m-auto' />
        <p className='font-semibold text-center'>Easy Exchange Policy</p>
        <p className='text-gray-400 text-center'>We offer hassle free exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} alt="" className='w-10 mb-4 m-auto' />
        <p className='font-semibold text-center'>7 Days Return Policy</p>
        <p className='text-gray-400 text-center'>We provide 7 days free return policy</p>
      </div>
      <div>
        <img src={assets.support_img} alt="" className='w-10 mb-4 m-auto' />
        <p className='font-semibold text-center'>Best Customer Service</p>
        <p className='text-gray-400 text-center '>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default Policy
