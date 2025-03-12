import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Main Swiper styles
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { assets } from '../assets/assets';

const Review = () => {
  return (
    <div>
      <div className=" my-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-gray-50 py-10">
        <div className="mb-6 sm:mb-12">
          <h2 className="text-3xl text-center font-bold text-gray-900">What our happy users say!</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true} // Enable infinite loop
          modules={[Navigation, Pagination, Autoplay]} // Pass modules
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="group max-w-xl bg-white transition-all duration-500 w-full mx-auto p-6 mb-10">
              <div className='flex flex-col justify-around items-center gap-2'>
              <div className="flex flex-col items-center text-center gap-2">
                  <img className="rounded-full object-cover w-14" src={assets.user} alt="avatar" />
                  <div className="text-base">
                    <p className="text-gray-900 font-medium transition-all duration-500 ">
                      Raju Singh
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 transition-all duration-500">
                  <img src={assets.rating} alt="" className='w-24' />
                </div>
                <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 text-center">
                  Pagedone stands out as the most user-friendly and effective solution I've ever used.
                </p>
                
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="group max-w-xl bg-white p-6 transition-all duration-500 w-full mx-auto">
              <div className='flex flex-col justify-around items-center gap-2'>
              <div className="flex flex-col items-center text-center gap-2">
                  <img className="rounded-full object-cover w-14" src={assets.user} alt="avatar" />
                  <div className="text-base">
                    <p className="text-gray-900 font-medium transition-all duration-500">
                      Ansh Chauhan
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 transition-all duration-500">
                  <img src={assets.rating} alt="" className='w-24' />
                </div>
                <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 text-center">
                  Pagedone stands out as the most user-friendly and effective solution I've ever used.
                </p>
                
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <div className="group max-w-xl bg-white p-6 transition-all duration-500 w-full mx-auto">
              <div className='flex flex-col justify-around items-center gap-2'>
              <div className="flex flex-col items-center text-center gap-2">
                  <img className="rounded-full object-cover w-14" src={assets.user} alt="avatar" />
                  <div className="text-base">
                    <p className="text-gray-900 font-medium transition-all duration-500">
                      Jethalal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 transition-all duration-500">
                  <img src={assets.rating} alt="" className='w-24' />
                </div>
                <p className="text-lg text-gray-500 leading-8 h-24 transition-all duration-500 text-center">
                  Pagedone stands out as the most user-friendly and effective solution I've ever used.
                </p>
                
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Review;
