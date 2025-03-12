import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const[list,setList] = useState([])

  const fetchList = async () => {
    try {
      const res = await axios.get(backendURL+"/api/product/list")
      console.log(res.data)
      if(res.data.success){
        setList(res.data.products)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(backendURL+"/api/product/remove",{id},{headers:{token}})
      if(res.data.success){
        toast.success(res.data.message)
        await fetchList()
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])
  return (
    <>
     <p className='mb-2 font-semibold'>All Products List</p>
     <div className='flex flex-col gap-2'>
      <div className='hidden md:grid grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center py-1 px-4 border bg-gray-100 text-sm'>
        <b>Index</b>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div> 
      {
        list.map((item,index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <p className='md:px-4'>{index}</p>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }
     </div> 
    </>
  )
}

export default List
