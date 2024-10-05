// components/Sidebar.tsx

'use client';

import {
  ClipboardList,
  List,
  Calendar,
  Menu,
  Settings,
  LogOut,
} from 'lucide-react';
import { useSidebar } from '@/contexts/SideBarContext'; 
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <aside
      className={`bg-gradient-to-t from-[#FFA17F] to-[#00223E] shadow-md transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col justify-between`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        {isOpen && <h1 className="text-xl font-bold text-white">Calendai</h1>}
        <Menu
          onClick={toggleSidebar}
          className="w-6 h-6 text-white cursor-pointer"
        />
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col">
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
        <div
          onClick={() => handleNavigation('/tasks')}
          className="flex items-center px-4 py-2 text-white bg-transparent hover:bg-white/20 cursor-pointer transition-colors duration-200"
        >
          <ClipboardList className="w-5 h-5 mr-2" />
          {isOpen && <span>Tasks</span>}
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