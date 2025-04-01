import React, { useState } from 'react';
import axios from 'axios';

const Newsletterbox = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const onSubmitHandle = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!email) {
            setMessage("Please enter a valid email!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:4000/api/subscribe", { email });
            setMessage(res.data.message);
            setEmail("");
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[10vw] py-8 news'>
            <div className='flex flex-col items-center justify-around gap-1 sm:gap-2 text-white'>
                <p className='text-2xl font-bold font-sans'>Sign up & save</p>
                <p className='text-sm font-sans text-center mb-4'>Be updated on new arrivals, trends, and offers. Sign up now!</p>
                
                <form onSubmit={onSubmitHandle} className='flex flex-row justify-between border pl-4 pr-2 py-1 items-center sm:w-[400px] border-white mb-4'>
                    <input 
                        type="email" 
                        placeholder='Enter email address' 
                        className='outline-none pr-1 border-none w-full bg-transparent text-white'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className='outline-none border-none px-4 py-2 bg-black text-white text-center font-semibold'>
                        Subscribe
                    </button>
                </form>

                {message && <p className="text-sm text-green-400">{message}</p>}
            </div>
        </div>
    );
};

export default Newsletterbox;
