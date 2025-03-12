import React from 'react';

const OffersModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Coupons and Offers</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="mb-4 flex flex-row justify-between items-center p-1 rounded-lg border">
          <input
            type="text"
            placeholder="Enter coupon code"
            className="w-full border-none outline-none px-4 py-2"
          />
          <button className="bg-gray-300 text-gray-700 rounded-md px-4 py-2">
            Apply
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Available Coupons</h3>
          <p className="border-b-2 border-black w-20"></p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border border-gray-300 rounded-md p-4">
            <div>
              <h4 className="text-lg font-semibold">New</h4>
              <p className="text-sm text-gray-500">Get 100 off on any clothes</p>
            </div>
            <button className="bg-blue-500 text-white rounded-md px-4 py-2">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersModal;