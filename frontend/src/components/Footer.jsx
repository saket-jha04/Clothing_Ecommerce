import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-zinc-900'>
        <div className='flex flex-col sm:flex-row sm:items-start pt-8 gap-6 sm:gap-10'>
            <div className='flex flex-col items-start gap-2 text-white w-full max-w-md '>
                <p className='font-bold mb-2'>Shop</p>
                <p className='cursor-pointer'>Best Seller</p>
                <p className='cursor-pointer'>Mens</p>
                <p className='cursor-pointer'>Woman</p>
                <p className='cursor-pointer'>Kids</p>
            </div>
            <div className='flex flex-col items-start justify-start gap-4 text-white'>
                <p className='font-bold'>Our Mission</p>
                <p className='w-full max-w-md break-words'>Our mission is to provide our customers with high-quality products and exceptional service that exceed their expectations.</p>
            </div>
            <div className='flex flex-row items-start justify-around gap-6 m-auto'>
                <img src={assets.insta} alt="" className='cursor-pointer hover:translate-y-[-10px] transition-transform duration-200' />
                <img src={assets.facebook} alt="" className='cursor-pointer hover:translate-y-[-10px] transition-transform duration-200' />
            </div>
        </div>
        <div className='flex flex-col gap-2 justify-around py-10'>
            <p className='w-full h-[0.6px] bg-gray-600'></p>
            <p className='text-white items-center text-center'>Developed by Saket</p>
        </div>
    </div>
  )
}

export default Footer
