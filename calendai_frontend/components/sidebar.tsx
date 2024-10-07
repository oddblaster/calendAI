// components/Sidebar.tsx

'use client';

import {
  ClipboardList,
  List,
  Calendar,
  Menu,
  Settings,
  LogOut,
  Building2
} from 'lucide-react';
import { useSidebar } from '@/contexts/SideBarContext'; 
import { useRouter } from 'next/navigation';

const Sidebar = () => {

  const { isOpen, toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  let dateTime = new Date();
  return (
    <aside
      className={`bg-gradient-to-t from-[#FFA17F] to-[#00223E] shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col justify-between`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 onClick={ () =>handleNavigation('/')} className="hover:cursor-pointer text-xl font-bold bg-text-gradient-animated animate-gradient-text bg-clip-text text-transparent bg-[length:200%_200%]">CalendAI <br></br><span className='text-sm'>{isOpen && `Today's date is: ${(dateTime.getMonth())%12+1}/${dateTime.getDate()}/${dateTime.getFullYear()}`}</span>
        </h1>}
        <Menu
          onClick={toggleSidebar}
          className="self-start w-6 h-6 text-white cursor-pointer"
        />

      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col justify-center">
      <div
          onClick={() => handleNavigation('/about')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <Building2 className="w-5 h-5 mr-2" />
          {isOpen && <span>About Us</span>}
        </div>
        <div
          onClick={() => handleNavigation('/agenda')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <List className="w-5 h-5 mr-2" />
          {isOpen && <span>Agenda</span>}
        </div>
        <div
          onClick={() => handleNavigation('/calendar')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <Calendar className="w-5 h-5 mr-2" />
          {isOpen && <span>Calendar</span>}
        </div>
        
      </nav>

      {/* Sidebar Footer */}
      <div className="w-full pb-4">
        <div
          onClick={() => handleNavigation('/configurations')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <Settings className="w-5 h-5 mr-2" />
          {isOpen && <span>Configurations</span>}
        </div>
        <div
          onClick={() => handleNavigation('/logout')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-2" />
          {isOpen && <span>Exit</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;