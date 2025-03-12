import React, { useState } from 'react';
import CartTotal from './CartTotal';
import CartNav from './CartNav';
import { assets } from '../assets/assets';

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState('online');

  const handlePaymentChange = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  return (
    <div>
      <CartNav />
      <div className="px-4 sm:px-[5vw] md:px-[8vw] lg:px-[12vw] my-10">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full sm:min-w-[50vw]">
            <h1 className="text-md sm:text-xl font-medium sm:mb-2">Payment</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className={`flex-1 p-4 border rounded-md cursor-pointer ${selectedPayment === 'online' ? 'bg-gradient-to-r from-blue-100 to-blue-50' : 'bg-white'}`}
                onClick={() => handlePaymentChange('online')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={selectedPayment === 'online'}
                    onChange={() => handlePaymentChange('online')}
                    className="mr-2"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Online Payment</p>
                    <p className="text-xs text-gray-500">Pay using credit/debit card, net banking, or UPI</p>
                  </div>
                </div>
              </div>
              <div
                className={`flex-1 p-4 border rounded-md cursor-pointer ${selectedPayment === 'cod' ? 'bg-gradient-to-r from-blue-100 to-blue-50' : 'bg-white'}`}
                onClick={() => handlePaymentChange('cod')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={selectedPayment === 'cod'}
                    onChange={() => handlePaymentChange('cod')}
                    className="mr-2"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-medium">Cash on Delivery</p>
                    <p className="text-xs text-gray-500">Pay with cash upon delivery</p>
                  </div>
                </div>
              </div>
            </div>
            {selectedPayment === 'online' && (
              <div className="p-4 border rounded-md mt-4">
                <h2 className="text-sm font-medium mb-2">Online Payment</h2>
                <p className="text-xs text-gray-500">You have selected online payment. Please proceed to the next step to complete your payment.</p>
              </div>
            )}
            {selectedPayment === 'cod' && (
              <div className="p-4 border rounded-md mt-4">
                <h2 className="text-sm font-medium mb-2">Cash on Delivery</h2>
                <p className="text-xs text-gray-500">You have selected cash on delivery. Please proceed to the next step to confirm your order.</p>
              </div>
            )}
          </div>
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Payment;