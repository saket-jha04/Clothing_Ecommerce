import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import './App.css'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}  />
        <Route path='/collection' element={<Collection/>}  />
        <Route path='/cart' element={<Cart/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/login' element={<Login/>}  />
        <Route path='/orders' element={<Orders/>}  />
        <Route path='/product/:productId' element={<Product/>}  />
        <Route path='/placeorder' element={<PlaceOrder/>}  />
      </Routes>
    </>
  )
}

export default App
