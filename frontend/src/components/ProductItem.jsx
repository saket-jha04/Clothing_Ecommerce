import React, { useContext } from 'react'
import { DetailsContext } from '../context/DetailsContext'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({id, name, price, image}) => {
    const {currency} = useContext(DetailsContext)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/product/${id}`)
        setTimeout(() => {
            window.scrollTo(0,0)
        }, 100)
    }
  return (
    <div onClick={handleClick} className='cursor-pointer text-gray-700'>
        <div className='overflow-hidden'>
            <img className='hover:scale-90 transition ease-in-out' src={image[0]} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </div>
  )
}

export default ProductItem
