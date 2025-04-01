import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { DetailsContext } from "../context/DetailsContext";

const CartNav = () => {
  const { getCartCount } = useContext(DetailsContext);
    const location = useLocation();
    const currentPath = location.pathname;
  
    const isDisabled = (path) => {
      const steps = ['/cart', '/placeorder/address', '/placeorder/payment'];
      const currentIndex = steps.indexOf(currentPath);
      const targetIndex = steps.indexOf(path);
      return targetIndex > currentIndex;
    };
    const getTitleAndStep = () => {
      switch (currentPath) {
        case '/cart':
          return { title: 'Shopping Cart', step: 'Step 1/2' };
        case '/placeorder':
          return { title: 'Place Order', step: 'Step 2/2' };
        default:
          return { title: '', step: '' };
      }
    };
    const { title, step } = getTitleAndStep();
  return (
    <div className="sticky top-0 z-50 shadow-sm border-b">
      <div className="px-4 sm:px-[5vw] md:px-[8vw] lg:px-[12vw] py-5 font-medium bg-gray-50">
        <div className="hidden sm:flex flex-row justify-between items-center">
          <NavLink to="/">
            <img src={assets.logo} className="w-20 md:w-16" alt="" />
          </NavLink>
          <div className="flex flex-row items-center space-x-4 md:space-x-2">
          <div className="flex items-center">
            <div
              className={`w-4 h-4 md:w-6 md:h-6 md:text-base text-xs flex items-center justify-center rounded-full ${
                currentPath === '/cart' || currentPath === '/placeorder'
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              1
            </div>
            <span className={`ml-2 ${currentPath === '/cart' || currentPath === '/placeorder' ? 'text-blue-700' : ''}`}>
              Cart
            </span>
          </div>
          <div className="w-8 h-0.5 bg-gray-500"></div>
          <div className="flex items-center">
            <div
              className={`w-4 h-4 md:w-6 md:h-6 md:text-base text-xs flex items-center justify-center rounded-full ${
                currentPath === '/placeorder' ? 'bg-blue-700 text-white' : 'bg-gray-500 text-white'
              }`}
            >
              2
            </div>
            <span className={`ml-2 ${currentPath === '/placeorder' ? 'text-blue-700' : ''}`}>
              Place Order
            </span>
          </div>  
          </div>
          <div className="flex flex-row items-center space-x-4">
          <NavLink to="/collection" className="flex items-center">
              <div className="flex flex-row gap-2 items-center hover:bg-gray-300 rounded-3xl px-4 py-2 cursor-pointer">
                <img
                  className="w-4 md:w-5 md:h-5 h-auto cursor-pointer"
                  src={assets.exchange_icon}
                  alt=""
                />
                <p className="text-sm md:text-base text-gray-700">Collections</p>
              </div>
            </NavLink>
            <NavLink to="/cart" className="flex items-center relative">
              <div className="flex flex-row gap-2 items-center rounded-3xl px-4 py-2 cursor-pointer">
                <img
                  className="w-4 md:w-5 md:h-5 h-4 cursor-pointer"
                  src={assets.cart_icon}
                  alt=""
                />
                <p className='absolute lg:right-[-6px] bottom-[16px] md:right-[-22px] w-5 text-center bg-black text-white leading-5 aspect-square rounded-full lg:text-[10px]'>{getCartCount()}</p>
                <p className="text-sm md:text-base ">Cart</p>
              </div>
            </NavLink>
            <NavLink to="/account" className="flex items-center">
              <div className="flex flex-row gap-2 items-center hover:bg-gray-300 rounded-3xl px-4 py-2 cursor-pointer">
                <img
                  className="w-4 md:w-5 md:h-5 h-4 cursor-pointer"
                  src={assets.profile_icon}
                  alt=""
                />
                <p className="text-sm md:text-base text-gray-700">Account</p>
              </div>
            </NavLink>
          </div>
            
        </div>
        <div className='flex sm:hidden justify-between items-center bg-gray-50'>
          <div className="flex flex-row items-center gap-2">
          {currentPath !== '/cart' && (
              <NavLink to={currentPath === '/address' ? '/cart' : '/address'} className="flex items-center">
                <img src={assets.right} alt="" className="w-3" />
              </NavLink>
            )}
          <p className='text-base font-normal'>{title}</p>
            
          </div>
            <p className='text-base font-normal ml-4'>{step}</p>
        </div>
      </div>
    </div>
  );
};

export default CartNav;
