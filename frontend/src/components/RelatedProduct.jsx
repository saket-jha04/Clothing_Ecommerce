import React, { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '../context/DetailsContext'
import ProductItem from './ProductItem'

const RelatedProduct = ({category,subCategory}) => {
    const { products } = useContext(DetailsContext)
    const [related,setRelated] = useState([])

    useEffect(() => {
        if(products.length > 0){
            let productcpy = products.slice()
            productcpy = productcpy.filter((item) => category === item.category)
            productcpy = productcpy.filter((item) => subCategory === item.subCategory)
            setRelated(productcpy.slice(0,5))
            console.log(productcpy.slice(0,5))
        }
    }, [])
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] my-12'>
      <div className='text-center text-3xl py-2'>
        <h2 className='font-semibold'>Related Products</h2>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-2'>
        {related.map((item, index) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProduct
