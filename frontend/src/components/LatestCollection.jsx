import React, { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '../context/DetailsContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const {products} = useContext(DetailsContext)

    const [latestItem, setLatestItem] = useState([])
    useEffect(() => {
        setLatestItem(products.slice(0, 10))
    }, [products])
  return (
    <div className='my-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]'>
        <div className='py-6 text-xl sm:text-3xl'>
            <div className='inline-flex items-center gap-3 mb-2'>
            <p className='text-gray-700 font-semibold'>TOP COLLECTIONS</p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
            </div>
        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestItem.map((item,index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
