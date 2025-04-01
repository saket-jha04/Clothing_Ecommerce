import React, { useContext, useState } from "react";
import CartNav from "../components/CartNav";
import { DetailsContext } from "../context/DetailsContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets";
import ordergif from "../assets/ordered.gif"

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [ordered, setOrdered] = useState(false);
  const {
    currency,
    deliveryCharge,
    getCartAmount,
    navigate,
    backendURL,
    token,
    cartItems,
    setCartItems,
    products,
  } = useContext(DetailsContext);

  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    locality: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const initPay = async (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler : async (res) => {
        console.log(res)
        try {
          const {data} = await axios.post(backendURL + '/api/order/verifyPayment',res,{headers:{token}})
          if(data.success){
            setOrdered(true);
            setTimeout(() => {
              navigate("/orders");
              setCartItems({});
            }, 5000);
          }
        } catch (error) {
          console.log(error)
          toast.error("Payment verification failed. Please try again.");
        }
      }
    } 
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const handleContinue = async (e) => {
    e.preventDefault();

    // Check if required fields are filled
    const requiredFields = ["name", "phone", "address", "pincode", "city"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field} field.`);
        return;
      }
    }

    try {
      let orderItems = [];
      Object.keys(cartItems).forEach((item) => {
        Object.keys(cartItems[item]).forEach((size) => {
          if (cartItems[item][size] > 0) {
            const product = products.find((p) => p._id === item);
            if (product) {
              orderItems.push({
                ...product,
                size,
                quantity: cartItems[item][size],
              });
            }
          }
        });
      });

      let orderData = {
        address: formData,
        items: orderItems,
        date: Date.now(),
        amount: getCartAmount() + deliveryCharge,
      };

      switch (method) {
        case "cod":
          const res = await axios.post(backendURL + '/api/order/place',orderData,{headers:{token}})
          if (res.data.success) {
            setOrdered(true);
            setTimeout(() => {
              setCartItems({});
              navigate("/orders");
            }, 5000);
          } else{
            toast.error(res.data.message)
          }
          break;
        case "razorpay":
          const razorpayRes = await axios.post(backendURL + '/api/order/razorpay', orderData, { headers: { token } });
          if(razorpayRes.data.success){
            initPay(razorpayRes.data.order)
          }
          break;
      }
    } catch (error) {
      toast.error("Order placement failed. Please try again.");
    }
  };

  return (
    <div>
      <CartNav />
      <div className="px-4 sm:px-[5vw] md:px-[8vw] lg:px-[12vw] my-10">
        <form onSubmit={handleContinue}>
          {/* Address Section */}
          <div className="border rounded-md p-4 mb-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsAddressOpen(!isAddressOpen)}
            >
              <h1 className="text-md sm:text-lg font-medium">Shipping Address</h1>
              <span className="text-blue-600">{isAddressOpen ? "Close" : "Edit"}</span>
            </div>
            {isAddressOpen && (
              <div className="mt-4">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col gap-4 w-full">
                    <input
                      onChange={onChangeHandler}
                      name="name"
                      value={formData.name}
                      type="text"
                      placeholder="Name"
                      className="border border-gray-300 rounded-md px-4 py-2"
                      required
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        onChange={onChangeHandler}
                        name="phone"
                        value={formData.phone}
                        type="text"
                        placeholder="Phone number"
                        pattern="[0-9]{10}"
                        maxLength={10}
                        className="border border-gray-300 rounded-md px-4 py-2"
                        required
                      />
                      <input
                        onChange={onChangeHandler}
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>
                    <input
                      onChange={onChangeHandler}
                      name="address"
                      value={formData.address}
                      type="text"
                      placeholder="Address"
                      className="border border-gray-300 rounded-md px-4 py-2"
                      required
                    />
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        onChange={onChangeHandler}
                        name="locality"
                        value={formData.locality}
                        type="text"
                        placeholder="Locality (Optional)"
                        className="border border-gray-300 rounded-md px-4 py-2"
                      />
                      <input
                        onChange={onChangeHandler}
                        name="landmark"
                        value={formData.landmark}
                        type="text"
                        placeholder="Landmark (Optional)"
                        className="border border-gray-300 rounded-md px-4 py-2"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        onChange={onChangeHandler}
                        name="pincode"
                        value={formData.pincode}
                        type="text"
                        placeholder="Pincode"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        required
                      />
                      <input
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        type="text"
                        placeholder="City"
                        className="border border-gray-300 rounded-md px-4 py-2"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="border rounded-md p-4">
            <h1 className="text-md sm:text-lg font-medium mb-4">Order Summary</h1>
            {Object.keys(cartItems).map((itemId) =>
              Object.keys(cartItems[itemId]).map((size) => {
                const product = products.find((p) => p._id === itemId);
                return (
                  <div key={`${itemId}-${size}`} className="flex items-center justify-between border-b pb-2 mb-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
                    <div className="flex flex-col flex-1 ml-4">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Size: {size}</p>
                    </div>
                    <p className="text-sm">Qty: {cartItems[itemId][size]}</p>
                    <p className="font-medium">
                      {currency}
                      {product.price * cartItems[itemId][size]}
                    </p>
                  </div>
                );
              })
            )}

            {/* Price Details */}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between text-gray-700">
                <p>Item Total</p>
                <p>{currency}{getCartAmount()}</p>
              </div>
              <div className="flex justify-between text-gray-700">
                <p>Delivery Fee</p>
                <p>{currency}{deliveryCharge}</p>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <p>Grand Total</p>
                <p>{currency}{getCartAmount() + deliveryCharge}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-6 mt-4">
            <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-700' : ''}`}></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-700' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>
          {/* Continue Button */}
          <div className="mt-6 text-center">
            <button type="submit" className="bg-blue-600 text-white w-full rounded-md px-4 py-2">
              Continue
            </button>
          </div>
        </form>
      </div>
      {ordered && (
  <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80">
    <img src={ordergif} alt="Loading..." className="w-40" />
  </div>
)}
    </div>
  );
};

export default PlaceOrder;
