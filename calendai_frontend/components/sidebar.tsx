'use client';
import {ClipboardList, List, Calendar, ChevronLeft, ChevronRight, Menu, MessageSquare, PieChart, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    }

    const handleNavigation = (path: string) => {
      router.push(path)
    }

    return (
        <>
        {open ? 
        <aside className="w-64 bg-gray-800 shadow-md">
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Calendai</h1>
          <Menu onClick={handleClick} className="w-6 h-6 text-white" />
        </div>
        <nav className="mt-6">
          <div onClick={() => handleNavigation('/agenda')} className="flex items-center px-4 py-2 bg-gray-700 text-blue-400">
            <List className="w-5 h-5 mr-2" />
            Agenda
          </div>
          <div onClick={() => handleNavigation('/calendar')} className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <Calendar className="w-5 h-5 mr-2" />
            Calendar
          </div>
          <div onClick={() => handleNavigation('/tasks')} className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <ClipboardList className="w-5 h-5 mr-2" />
            Tasks
          </div>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <Settings className="w-5 h-5 mr-2" />
            Configurations
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <LogOut className="w-5 h-5 mr-2" />
            Exit
          </a>
        </div>
      </aside>
      : 
      <aside className="w-16 bg-gray-800 shadow-md">
        <div className='flex flex-col items-center'>
        <div className="p-4 flex items-center justify-center">
            <Menu onClick={handleClick} className="w-6 h-6 text-white" />
        </div>
        <div onClick={() => handleNavigation('/agenda')} className='text-gray-400 hover:bg-gray-700 mt-4 p-2 cursor-pointer'>
            <List className="w-5 h-5" />
        </div>
        <div onClick={() => handleNavigation('/calendar')} className='text-gray-400 hover:bg-gray-700 mt-4 p-2 cursor-pointer'>
            <Calendar className="w-5 h-5" />
        </div>
        <div onClick={() => handleNavigation('/tasks')} className='text-gray-400 hover:bg-gray-700 mt-4 p-2 cursor-pointer'>
            <ClipboardList className="w-5 h-5" />
        </div>
        <div onClick={() => handleNavigation('/configurations')} className="absolute bottom-14 p-2 mb-1 text-gray-400 hover:bg-gray-700 cursor-pointer items-center justify-center">
            <Settings className="w-5 h-5" />
        </div>
        <div onClick={() => handleNavigation('/logout')} className="absolute bottom-5 p-2 text-gray-400 hover:bg-gray-700 cursor-pointer items-center justify-center">
            <LogOut className="w-5 h-5 " />
        </div>
        </div> 
        
        </aside>
        }
      </>
      );
}

export default Sidebar;
