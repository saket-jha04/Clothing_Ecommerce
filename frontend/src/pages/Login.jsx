import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { DetailsContext } from '../context/DetailsContext'
import axios from 'axios'
import { toast } from 'react-toastify'


const Login = () => {
  const [ currentState, setCurrentState ] = useState('Login')
  const { token,setToken,navigate,backendURL,setUserInitial } = useContext(DetailsContext)
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(currentState === 'Sign Up'){
        const res = await axios.post(backendURL+"/api/user/register",{name,email,password})
        console.log(res)
        if(res.data.sucess){
          setToken(res.data.token)
          localStorage.setItem('token',res.data.token)
          setUserInitial(name.charAt(0).toUpperCase())
          toast.success('Registration Successfull')
        }else{
          toast.error(res.data.message)
        }
      }else{
        const res = await axios.post(backendURL+"/api/user/login",{email,password})
        if(res.data.sucess){
          setToken(res.data.token)
          localStorage.setItem('token',res.data.token)
          setUserInitial(email.charAt(0).toUpperCase())
          toast.success('Login successful!')
        }else{
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 mb-20 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='font-serif text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === "Login" ? "" : <input onChange={(e)=>setName(e.target.value)} value={name}  type="text" className='w-full px-3 py-2 border-2 border-gray-600' placeholder='Name' required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border-2 border-gray-600' placeholder='Email' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border-2 border-gray-600' placeholder='Password' />
      
      <div className='w-full flex flex-row justify-between gap-2 text-sm '>
      {
        currentState === 'Login' ? <p className='cursor-pointer'>Forgot Password</p> : ""
      }
        {
          currentState === 'Sign Up' ? <p onClick={()=> setCurrentState('Login')} className='cursor-pointer hover:underline'>Already have an account?</p> : <p onClick={()=> setCurrentState('Sign Up')} className='cursor-pointer hover:underline'>Create an account</p>
        }
      </div>
      <button className='w-full text-white bg-black py-2 px-3 rounded-sm'>Submit</button>
    </form>
  <Footer />
    </div>
    
  )
}

export default Login
