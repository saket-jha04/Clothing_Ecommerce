import React, { useContext, useState } from 'react';
import { DetailsContext } from '../context/DetailsContext';
import OffersModal from './OfferModel';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartTotal = () => {
  const { currency, deliveryCharge, getCartAmount, navigate, token } = useContext(DetailsContext);
  const [showOffersModal, setShowOffersModal] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleContinue = () => {
    if(token){
      navigate('/placeorder')
    }
    else{
      toast.error("Please login to continue")
      navigate('/login')
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:w-screen max-w-[350px]">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm sm:text-lg font-semibold">Coupons and offers</p>
            <p className="text-sm sm:text-sm text-gray-500">Save more with coupons and offers</p>
          </div>
          <p
            className="text-blue-600 text-sm sm:text-base cursor-pointer"
            onClick={() => setShowOffersModal(true)}
          >
            offers
          </p>
        </div>
        <div className="flex flex-col gap-3 border p-4 rounded-md">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">Item Total</p>
              <p className="text-sm text-gray-500">
                {currency}
                {getCartAmount()}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">Delivery fee</p>
              <p className="text-sm text-gray-500">
                {currency}
                {deliveryCharge}
              </p>
            </div>
          </div>
          <hr className="border-b border-dashed" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between">
              <p className="text-base font-semibold">Grand Total</p>
              <p className="text-base font-semibold">
                {currency}
                {getCartAmount() + deliveryCharge}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">Inclusive of all taxes</p>
            </div>
          </div>
          <hr className="border-b border-dashed" />
          <p className="text-sm text-gray-500 mb-2">
            Average delivery time: <b className="text-black text-xs">3-7 days</b>
          </p>
          <div className="bg-green-100 rounded-md px-4 py-2 text-sm text-green-700">
            <p>You have saved total 80% (₹1,599) on your order! Yay!</p>
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white w-full rounded-md px-3 py-2"
          >
            Continue
          </button>
        </div>
      </div>
      <OffersModal show={showOffersModal} onClose={() => setShowOffersModal(false)} />
    </div>
  );
};

export default CartTotal;