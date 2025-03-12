import React from 'react'
import Slider from 'react-slick'
import { assets } from '../assets/assets'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  }

  return (
    <div className='w-full'>
      <Slider {...settings}>
        <div className='w-full max-h-[300px]'>
          <div className='flex flex-col sm:flex-row w-full'>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11 h-[1.5px] bg-[#414141]'></p>
                  <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
                </div>
                <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                  <p className='w-8 md:w-11 h-[1.5px] bg-[#414141]'></p>
                </div>
              </div>
            </div>
            <img className='w-full sm:w-1/2 shadow-lg' src={assets.hero_img} alt="" />
          </div>
        </div>
        {/* Add more slides as needed */}
        <div className='w-full'>
          <div className='flex flex-col sm:flex-row w-full'>
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
              <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                  <p className='w-8 md:w-11 h-[1.5px] bg-[#414141]'></p>
                  <p className='font-medium text-sm md:text-base'>NEW COLLECTION</p>
                </div>
                <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Summer Sale</h1>
                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                  <p className='w-8 md:w-11 h-[1.5px] bg-[#414141]'></p>
                </div>
              </div>
            </div>
            <img className='w-full sm:w-1/2 shadow-lg' src={assets.banner} alt="" />
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default Hero