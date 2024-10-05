import React from 'react';
import Dropdown from '@/components/dropdown';
import { Calendar, ChevronLeft, ChevronRight, Menu, MessageSquare, PieChart, Settings, LogOut } from 'lucide-react';
import TaskLink from '@/components/viewtask';


const CalendarComponent = () => {
  const events = [
    { title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'work' },
    { title: 'Dentist Appointment', date: 'Tomorrow, 10:00 AM', type: 'personal' },
    { title: 'Project Deadline', date: 'Friday, 5:00 PM', type: 'work' },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">January</h2>
          <Dropdown></Dropdown>
        </header>

        <div className="flex gap-8">
          {/* Calendar */}
          <div className="w-1/3 bg-gray-800 p-4 rounded-md shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">January</h3>
              <div className="flex gap-2">
                <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
                <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>
            </div>
            {/* Calendar grid would go here */}
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* ... Calendar days ... */}
            </div>
          </div>

          {/* Events list */}
          <div className="w-2/3">
            <h3 className="font-semibold mb-4">Events</h3>
            <ul className="space-y-4">
              {events.map((event, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-md shadow">
                  <h4 className="font-semibold">{event.title}</h4>
                  <p className="text-sm text-gray-400">{event.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-8"></div>
      </main>

      {/* Day view */}
      <aside className="w-1/4 bg-gray-800 p-4 shadow-md">
        <h3 className="font-semibold mb-4">Friday - January 4, 2022</h3>
        <div className="space-y-4">
          <div className="bg-[#FFA17F] p-4 rounded-md">
            <h4 className="font-semibold">Meeting With Jundinu Tech</h4>
            <p>8:00 AM - 9:00 AM</p>
          </div>
          <div className="bg-[#00223E] p-4 rounded-md">
            <h4 className="font-semibold">Meeting With Nonuda Company</h4>
            <p>2:00 PM - 3:00 PM</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CalendarComponent;
