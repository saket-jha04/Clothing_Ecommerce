import React from 'react';
import { Link } from 'react-router-dom';
import emptygif from '../assets/emptyCart.gif';

const EmptyCart = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center gap-2 h-screen'>
      <img
        src={emptygif}
        alt="Empty Cart"
        className='w-40'
      />
      <h1 className='text-xl font-semibold mt-5'>Your cart is empty</h1>
      <p className='text-gray-500 text-sm'>Looks like you haven't made your choice yet..</p>
      <Link to='/'><button className='bg-blue-800 text-white text-center rounded-md px-5 py-3'>Go to homepage</button>
      </Link>
      
    </div>
  );
};

export default EmptyCart;