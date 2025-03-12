import React, { useContext } from 'react';
import CartNav from './CartNav';
import { DetailsContext } from '../context/DetailsContext';
import CartTotal from './CartTotal';

const Address = () => {

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  return (
    <div>
      <CartNav />
      <div className="px-4 sm:px-[5vw] md:px-[8vw] lg:px-[12vw] my-10">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full sm:min-w-[50vw]">
            <h1 className="text-md sm:text-xl font-medium sm:mb-2 hidden sm:block">
              Shipping address
            </h1>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-sm">First Name <span className='text-red-600'>*</span></p>
                <input type="text" className="border border-gray-300 rounded-md px-4 py-2" required />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <p className="text-sm">Phone number <span className='text-red-600'>*</span></p>
                  <input type="text" className="border border-gray-300 rounded-md px-4 py-2" required />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-sm">Email (Optional)</p>
                  <input type="email" className="border border-gray-300 rounded-md px-4 py-2" />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">Address <span className='text-red-600'>*</span></p>
                <input type="text" className="border border-gray-300 rounded-md px-4 py-2" required />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <p className="text-sm">Locality (Optional)</p>
                  <input type="text" className="border border-gray-300 rounded-md px-4 py-2" />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-sm">Landmark (Optional)</p>
                  <input type="text" className="border border-gray-300 rounded-md px-4 py-2" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <p className="text-sm">Pincode <span className='text-red-600'>*</span></p>
                  <input type="text" className="border border-gray-300 rounded-md px-4 py-2" required />
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-sm ">City <span className='text-red-600'>*</span></p>
                  <input type="text" className="border border-gray-300 rounded-md px-4 py-2" required />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm">State <span className='text-red-600'>*</span></p>
                <select className="border border-gray-300 rounded-md px-4 py-2" required>
                  <option value="">Select State</option>
                  {statesOfIndia.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Address;