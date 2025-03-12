import React, { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '../context/DetailsContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Seach = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(DetailsContext)
    const location = useLocation()

    useEffect(() => {
      if (location.pathname !== '/collection') {
        setShowSearch(false);
      }
    }, [location,setShowSearch])

  return showSearch ? (
    <div className=' text-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw]'>
      <div className='inline-flex items-center justify-center border border-gray-300 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm text-black ' />
        <img src={assets.search_icon} alt="" className='w-4 cursor-pointer' />
      </div>
      <img onClick={() => setShowSearch(false)} onChange={(e) => setSearch(e.target.value)} src={assets.cross_icon} alt="" className='inline w-3 cursor-pointer' />
    </div>
  ) : null
}

export default Seach
