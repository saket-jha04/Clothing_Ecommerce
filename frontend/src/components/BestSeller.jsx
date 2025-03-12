import React, { useContext, useEffect, useState } from 'react'
import {DetailsContext} from '../context/DetailsContext'
import ProductItem from './ProductItem'

const BestSeller = () => {
    const {products} = useContext(DetailsContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        const bestSellerData = products.filter(item => item.bestseller === true)
        setBestSeller(bestSellerData.slice(0, 5))
    }, [products])
  return (
    <div className='my-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] mb-20'>
      <div className='inline-flex items-center gap-3 text-center text-xl py-6 sm:text-3xl '>
        <p className='text-gray-700 font-medium'>BESTSELLERS</p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestSeller.map((item,index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default BestSeller
