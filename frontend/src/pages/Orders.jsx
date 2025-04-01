import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DetailsContext } from '../context/DetailsContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Orders = () => {
  const { currency, products, getCartAmount, navigate, backendURL, token } = useContext(DetailsContext);
  const [orderData, setOrderData] = useState([])
  const loadOrderData = async () => {
    try {
      if(!token){
        return null
      }
      const res = await axios.post(backendURL + "/api/order/userorders",{},{headers:{token}})
      if(res.data.success){
        let allOrders = []
        res.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrders.push(item)
          })
        })
        console.log(allOrders)
        setOrderData(allOrders.reverse())
      }
    } catch (error) {
      
    }
  }
  useEffect(() =>{
    loadOrderData()
  },[token])
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      navigate("/", { replace: true });
    };
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <div className='px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw] my-5 sm:my-10'>
      <div className='flex flex-col gap-6'>
        <h1 className='text-2xl font-semibold'>My Orders</h1>
        <div>
          {
            orderData.map((item,index) => (
              <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-row justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium '>{item.name}</p>
                    <div className='flex items-center gap-3 mt-3 text-base text-gray-700'>
                      <p>{currency} {item.price}</p>
                      <p>Quanity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p>Date: <span className='text-gray-500'>{new Date(item.date).toDateString()}</span></p>
                    <p>Payment Method: <span className='text-gray-500'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-600'></p>
                    <p className='sm:text-sm font-medium'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='px-4 text-sm rounded-md font-medium'>Refresh Status</button>
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
