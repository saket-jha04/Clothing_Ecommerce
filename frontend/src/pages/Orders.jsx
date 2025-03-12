import React, { useContext } from 'react'
import { DetailsContext } from '../context/DetailsContext';
import Navbar from '../components/Navbar';

const Orders = () => {
  const { currency, products, getCartAmount, navigate } = useContext(DetailsContext);
  return (
    <div>
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw] my-5 sm:my-10'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold'>My Orders</h1>
        <div>
          {
            products.slice(1,4).map((item,index) => (
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-row justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium '>{item.name}</p>
                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                      <p className='text-lg'>{currency} {item.price}</p>
                      <p>Quanity 1</p>
                      <p>Size: M</p>
                    </div>
                    <p>Date: <span className='text-gray-500'>25,Feb,2025</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
                    <p className='sm:text-sm font-medium'>Ready To Ship</p>
                  </div>
                  <button onClick={() => navigate('/orderdetails')} className='text-sm text-blue-500 font-medium'>View Details</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
    </div>
  )
}

export default Orders
