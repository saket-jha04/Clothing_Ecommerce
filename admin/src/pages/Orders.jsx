import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { backendURL } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const res = await axios.post(
        backendURL + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  const statusHandler = async (event, orderId) =>{
    try {
      const res = await axios.post(backendURL + "/api/order/status", { orderId, status:event.target.value }, { headers: { token } })
      if(res.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Orders Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] lg:[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700" key={index}>
            <img className="w-14" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span> ,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.name}</p>
              <div>
                <p>
                  {order.address.address +
                    "," +
                    order.address.locality +
                    "," +
                    order.address.landmark +
                    ","}
                </p>
                <p>{order.address.city + "," + order.address.pincode}</p>
                <p>{order.address.state}</p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? 'done' : 'pending'}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">₹ {order.amount}</p>
            <select onChange={(event) => statusHandler(event,order._id)} value={order.status} className="font-semibold">
              <option value="Packing">Packing</option>
              <option value="Shipping">Shipping</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
