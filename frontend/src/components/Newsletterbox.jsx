import React from 'react'


const Newsletterbox = () => {
    const onSubmitHandle = (event) => {
      event.preventDefault();
    }
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] py-8 news'>
        <div className='flex flex-col items-center justify-around gap-1 sm:gap-2 text-white'>
            <p className='text-2xl font-bold font-sans'>Sign up & save</p>
            <p className='text-sm font-sans text-center mb-4'>Be updated on new arrivals, trends and offers. Sign up now!</p>
            <form onSubmit={onSubmitHandle} className='flex flex-row justify-between border pl-4 pr-2 py-1 items-center sm:w-[400px]  border-white mb-4'>
                <input type="text" name="" id="" placeholder='Enter email address' className='outline-none pr-1 border-none w-full bg-transparent text-white' />
                <button className='outline-none border-none px-4 py-2 bg-black text-white text-center font-semibold'>Subscribe</button>
            </form>
        </div>
      
    </div>
  )
}

export default Newsletterbox
