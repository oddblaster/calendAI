'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import AnimatedNotes from '@/components/animatednotes';
import { useEffect, useState } from 'react';

const Main = () => {
  const calendAIObjects = [
    {
      color: '#FF9E80',
      title: 'Your Intelligent Scheduling Assistant',
      description: 'CalendAI makes organizing your day effortless with AI-powered suggestions, ensuring you never miss an important meeting or event.'
    },
    {
      color: '#FFB07C',
      title: 'Simplify Your Schedule',
      description: 'Let CalendAI streamline your daily plans by intelligently prioritizing tasks and meetings, so you can focus on what really matters.'
    },
    {
      color: '#FF8F6B',
      title: 'AI-Powered Time Management',
      description: 'With CalendAI, scheduling has never been easier. Our AI ensures that you always have the best time slots reserved for your important tasks.'
    },
    {
      color: '#FFA37D',
      title: 'Plan with Precision',
      description: 'CalendAI understands your workflow and helps you plan with precision, offering smart insights to optimize your day-to-day productivity.'
    },
    {
      color: '#FF9468',
      title: 'Smarter Scheduling, Better Results',
      description: 'CalendAI uses artificial intelligence to create a personalized schedule for you, making sure you achieve your goals on time, every time.'
    },
    {
      color: '#FFAB82',
      title: 'Efficiency Meets Innovation',
      description: 'CalendAI turns the challenge of time management into a breeze by providing innovative, AI-driven features that help you stay ahead of your schedule.'
    },
    {
      color: '#FF9B72',
      title: 'Master Your Time, Effortlessly',
      description: 'Master your time with CalendAI’s intuitive features that automate and simplify your scheduling, giving you more time for what matters most.'
    }
  ];

  const router = useRouter();
  const handleClick = () => {
    router.push('/agenda');
  };

  return (
    <>        
      <div className="ease-in-out relative h-screen w-full bg-gradient-animated bg-[length:200%_200%] animate-gradient flex items-center justify-center">
      {calendAIObjects.map((cal, index) => (
          <AnimatedNotes
            key={index}  
            index={index}    
            delay={index} 
            color={cal.color}
            title={cal.title}
            description={cal.description}
          />
        ))}  
        <img
          src="/calender-dynamic-gradient.png"
          alt="Calendar"
          className="ease-in-out absolute z-10 h-auto w-[20vw] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
        <h1 className="font-outfit text-[8vw] font-bold text-white z-20">Ca<span className='text-transparent text-outline'>lend</span><span className="bg-[length:200%_200%] bg-text-gradient-animated animate-gradient-text bg-clip-text text-transparent">AI</span></h1>
        <button onClick={handleClick} className='text-white duration-300 ease-in-out absolute ring ring-1 ring-white top-[85vh] rounded-md w-[20vw] h-[8vh] items-center justify-center font-outfit text-[1.2vw] font-thin hover:bg-[length:200%_200%] bg-text-gradient-animated animate-gradient-text bg-clip-text hover:text-transparent'>Start</button>
      </div>
    </>
  );
}

export default Main;