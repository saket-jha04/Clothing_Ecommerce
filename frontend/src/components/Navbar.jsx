import React, { useContext } from "react";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";
import { DetailsContext } from "../context/DetailsContext.jsx";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
    userInitial,
  } = useContext(DetailsContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    window.location.reload();
    setToken("");
    setCartItem({});
  };

  return (
    <div className="sticky top-0 z-50 shadow-sm border-b">
      <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] bg-gray-50">
        <NavLink to="/">
          <img src={assets.logo} className="w-16" alt="" />
        </NavLink>
        <ul className="hidden sm:flex gap-5 text-md text-gray-700 ">
          <NavLink to="/" className="flex flex-col items-center gap-1 link">
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/collection"
            className="flex flex-col items-center gap-1 link"
          >
            <p>Collection</p>
          </NavLink>
          <NavLink
            to="/contact"
            className="flex flex-col items-center gap-1 link"
          >
            <p>Contact Us</p>
          </NavLink>
        </ul>
        <div className="flex items-center gap-4">
          <img
            className="w-5 cursor-pointer"
            src={assets.search_icon}
            alt=""
            onClick={() => setShowSearch(true)}
          />
          <div className="group relative">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              className="w-5 cursor-pointer"
              src={token ? "" : assets.profile_icon} // Hide image if user is logged in
              alt=""
            />
            {token && (
  <div className='relative group'>
    {/* Show user initials when logged in */}
    <div 
      className="w-8 h-8 bg-gray-200 text-black flex items-center justify-center rounded-full cursor-pointer"
    >
      {userInitial}
    </div>

    {/* Dropdown menu */}
    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-10'>
      <div className='flex flex-col gap-2 w-28 py-3 px-4 bg-slate-100 text-gray-500 rounded-lg'>
        <p className='cursor-pointer hover:text-black'>My Profile</p>
        <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Order</p>
        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
      </div>
    </div>
  </div>
)}
          </div>
          <NavLink to="/cart" className="relative">
            <img className="w-5 cursor-pointer" src={assets.cart_icon} alt="" />
            <p className="absolute right-[-8px] bottom-[-6px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          </NavLink>
          <img
            className="w-5 cursor-pointer sm:hidden"
            src={assets.menu_icon}
            alt=""
            onClick={() => setShowMenu(true)}
          />
        </div>
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 overflow-y-auto text-black bg-white transition-all ${
            showMenu ? "w-full" : "w-0"
          }`}
        >
          <div className="flex justify-between items-center p-6">
            <p>Menu</p>
            <img
              className="w-5 cursor-pointer"
              src={assets.close}
              alt=""
              onClick={() => setShowMenu(false)}
            />
          </div>
          <div className="flex flex-col items-center text-gray-600">
            <NavLink
              to="/"
              className="cursor-pointer py-8 pl-6 border w-full plink"
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className="cursor-pointer py-8 pl-6 border w-full plink"
            >
              Collection
            </NavLink>
            <NavLink
              to="/contact"
              className="cursor-pointer py-8 pl-6 border w-full plink"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
