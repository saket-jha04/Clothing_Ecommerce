import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendURL } from '../App'
import {toast} from 'react-toastify'

const Add = ({token}) => {
  
  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState('Men')
  const [subCategory,setSubCategory] = useState('Topwear')
  const [bestseller,setBestseller] = useState('')
  const [sizes,setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestSeller",bestseller)
      console.log('besseller'+bestseller);
      formData.append("sizes",JSON.stringify(sizes))


      image1 && formData.append("img1",image1)
      image2 && formData.append("img2",image2)
      image3 && formData.append("img3",image3)
      image4 && formData.append("img4",image4)
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const res = await axios.post(backendURL + "/api/product/add",formData,{headers:{token}})
      if(res.data.success){
        toast.success(res.data.message)
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setSizes([])
      }else{
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
        <label htmlFor="image1">
        <img className='w-20 cursor-pointer' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" name="" id="image1" hidden />
      </label>
      <label htmlFor="image2">
        <img className='w-20 cursor-pointer' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
      </label><label htmlFor="image3">
        <img className='w-20 cursor-pointer' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
      </label><label htmlFor="image4">
        <img className='w-20 cursor-pointer' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
      </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input value={name} onChange={(e)=>setName(e.target.value)} className='w-full max-w-[500px] px-2 py-1' type="text" placeholder='Type here' name="" id="" required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Enter the content here' name="" id="" required />
      </div>
      <div className='flex flex-col sm:flex-row items-center gap-4'>
        <div className='w-full'>
          <p className='mb-2' >Product Category</p>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className='px-2 py-1'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className='w-full'>
          <p className='mb-2'>Sub-Category</p>
          <select value={subCategory} onChange={(e)=>setSubCategory(e.target.value)} className='px-2 py-1'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product Price</p>
          <input value={price} onChange={(e)=>setPrice(e.target.value)} className='px-3 py-1 w-1/2 sm:w-full' type="Number" placeholder='200' />
        </div>
      </div>
      <div className='w-full'>
        <p>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-1 mt-1'>
      <input 
    type="checkbox" 
    id="bestseller" 
    checked={bestseller} 
    onChange={(e) =>{ setBestseller(e.target.checked) 
      console.log("Bestseller state:", e.target.checked)}} 
  />        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button type='submit' className='w-full sm:w-1/4 px-2 py-1 mt-3 text-white bg-blue-500 cursor-pointer'>Add</button>
    </form>
  )
}

export default Add
