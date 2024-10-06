'use client';

import React from 'react';
import Dropdown from '@/components/dropdown';
import Notes from '@/components/notes';
import { useState } from 'react';


const CalendarComponent = () => {
  const events = [
    { title: 'Team Meeting', date: 'Today, 2:00 PM', type: 'work' },
    { title: 'Dentist Appointment', date: 'Tomorrow, 10:00 AM', type: 'personal' },
    { title: 'Project Deadline', date: 'Friday, 5:00 PM', type: 'work' },
  ];
  const [notes,setNotes] = useState([
    { color: '#FFA17F', title: "Need to Get the Projects Done", description: "DO NOT HARDCODE THAT SHIT" },
    { color: '#7FFFD4', title: "Meeting with Client", description: "Prepare the new proposal and mockups" },
    { color: '#FF6F61', title: "Code Review", description: "Refactor the authentication module" },
    { color: '#FFD700', title: "Write Documentation", description: "Explain the new API endpoints clearly" },
    { color: '#87CEEB', title: "Team Stand-up", description: "Discuss progress and blockers for the week" },
    { color: '#FF69B4', title: "Optimize Database Queries", description: "Avoid unnecessary joins in the user report" },
    { color: '#DDA0DD', title: "Fix UI Bugs", description: "Check for responsiveness on mobile screens" },
    { color: '#00CED1', title: "Deploy to Production", description: "Ensure tests pass before pushing live" },
    { color: '#90EE90', title: "Design Feedback Session", description: "Incorporate feedback from the UX team" },
    { color: '#C71585', title: "Plan Next Sprint", description: "Prioritize tasks for the next two weeks" }
]);

const [newNote, setNewNote] = useState({ title: "", description: "", color: "#FFA17F" });

const [formVisible, setFormVisible] = useState(false);

  const addNote = (e) => {
    e.preventDefault(); 
    if (newNote.title && newNote.description) {
      setNotes([...notes, newNote]);  
      setNewNote({ title: "", description: "", color: "#FFA17F" });  
      setFormVisible(false);  
    }
  };

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

      <aside className="flex flex-col w-1/4 h-lvh bg-[#00223E] p-4 shadow-md items-center">
        <h3 className="font-semibold mb-4">QuickNotes</h3>
        
        <div className="space-y-4 flex-grow overflow-y-auto w-full">
          {notes.map((note, index) => (
            <Notes key={index} color={note.color} title={note.title} description={note.description}></Notes>
          ))}
        </div>
        <button 
        className="mt-4 bg-[#FFA17F] text-3xl text-white rounded-full w-16 h-16 flex justify-center items-center hover:bg-[#FFBAAA]"
        onClick={() => setFormVisible(!formVisible)}
      >
        +
      </button>

      <div className={`w-full mt-4 transition-all duration-500 ease-in-out transform ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {formVisible && (
          <form className="flex flex-col items-center" onSubmit={addNote}>
            <input 
              className="mb-2 p-2 w-full text-black rounded-md"
              type="text" 
              placeholder="Note Title" 
              value={newNote.title} 
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} 
            />
            <textarea
              className="mb-2 p-2 w-full text-black rounded-md"
              placeholder="Note Description"
              value={newNote.description}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
            />
            <button type="submit" className="bg-[#FFA17F] text-white rounded-full px-4 py-2 hover:bg-[#FFBAAA]">
              Add Note
            </button>
          </form>
        )}
      </div>
  </aside>
    </div>
  );
};

export default CalendarComponent;
