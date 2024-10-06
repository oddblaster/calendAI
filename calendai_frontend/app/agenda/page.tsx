'using client'

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
          <h2 className="text-2xl font-bold">Agenda</h2>
          <Dropdown></Dropdown>
        </header>

        <div className="flex gap-8">
          {/* Events list */}
          <div className="w-full">
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
      <aside className="flex flex-col w-1/4 h-lvh bg-[#00223E] p-4 shadow-md items-center">
        <h3 className="font-semibold mb-4">Notes</h3>
        <div className="space-y-4">
          <div className="bg-[#FFA17F] p-4 rounded-md">
            <h4 className="font-semibold">Meeting With Jundinu Tech</h4>
            <p>8:00 AM - 9:00 AM</p>
          </div>
          <div className="bg-[#2A4563] p-4 rounded-md">
            <h4 className="font-semibold">Meeting With Nonuda Company</h4>
            <p>2:00 PM - 3:00 PM</p>
          </div>
        </div>
        <button className="mt-auto bg-[#FFA17F] text-3xl text-white rounded-full size-16 hover:bg-[#FFBAAA]">
            +
          </button>
      </aside>
    </div>
  );
};

export default CalendarComponent;
