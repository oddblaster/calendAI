'use client';
import {ClipboardList, List, Calendar, ChevronLeft, ChevronRight, Menu, MessageSquare, PieChart, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
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
          <a href="#" className="flex items-center px-4 py-2 bg-gray-700 text-blue-400">
            <List className="w-5 h-5 mr-2" />
            Agenda
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <Calendar className="w-5 h-5 mr-2" />
            Calendar
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700">
            <ClipboardList className="w-5 h-5 mr-2" />
            Tasks
          </a>
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
        <div className='text-gray-400 hover:bg-gray-700 mt-4 p-2'>
            <List className="w-5 h-5" />
        </div>

        <div className='text-gray-400 hover:bg-gray-700 mt-4 p-2'>
            <Calendar className="w-5 h-5" />
        </div>
        
        <div className='text-gray-400 hover:bg-gray-700 mt-4 p-2'>
            <ClipboardList className="w-5 h-5" />
        </div>
        <div className="absolute bottom-14 p-2 mb-1 text-gray-400 hover:bg-gray-700 items-center justify-center">
            <Settings className="w-5 h-5" />
        </div>
        <div className="absolute bottom-5 p-2 text-gray-400 hover:bg-gray-700 items-center justify-center">
            <LogOut className="w-5 h-5 " />

        </div>
        </div> 
        
        </aside>
        }
      </>
      );
}

export default Sidebar;
