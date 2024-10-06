'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Main = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push('/agenda');
    }
    return (
        <>
            <div className="ease-in-out relative h-screen w-full bg-gradient-animated bg-[length:200%_200%] animate-gradient flex items-center justify-center">
                <img
                src="/calender-dynamic-gradient.png"
                alt="Calendar"
                className="ease-in-out absolute z-15 h-auto w-[20vw] h-auto left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                <h1 className="font-outfit text-[8vw] font-bold text-white z-20">Ca<span className='text-transparent text-outline'>lend</span><span className="bg-[length:200%_200%] bg-text-gradient-animated animate-gradient-text bg-clip-text text-transparent">AI</span></h1>
                <button onClick={handleClick} className='text-white duration-300 ease-in-out absolute ring ring-1 ring-white top-[85vh] rounded-md w-[20vw] h-[8vh] items-center justify-center font-outfit text-[1.2vw] font-thin hover:bg-[length:200%_200%] bg-text-gradient-animated animate-gradient-text bg-clip-text hover:text-transparent'>Start</button>           
            </div>
        </>
    );
}

export default Main;