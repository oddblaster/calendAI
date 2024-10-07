'use client';

import React from 'react';
import Dropdown from '@/components/dropdown';
import Notes from '@/components/notes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const CalendarComponent = () => {
  const [events, setEvents] = useState([
    { title: 'Team Meeting', date: 'Today, 2:00 PM', description: 'work' },
    { title: 'Dentist Appointment', date: 'Tomorrow, 10:00 AM', description: 'personal' },
    { title: 'Project Deadline', date: 'Friday, 5:00 PM', description: 'work' },
  ]);
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
  const getEvents = async () => {
    try {
      const response = await fetch("http://localhost:8000/event/get_events", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Agenda</h2>
          <Dropdown events={events} setEvents={setEvents}></Dropdown>
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
        className="mt-4 bg-[#FFA17F] text-3xl text-white rounded-full w-16 h-16 flex justify-center items-center hover:bg-[#FFBAAA] duration-150"
        onClick={() => setFormVisible(!formVisible)}
      >
        +
      </button>
      <AnimatePresence>
        {formVisible && (
          <motion.div
            key="form-container"
            className="w-full mt-4 p-4 rounded-md shadow-lg"
            initial={{ opacity: 0, y: 100 }} // Start off-screen at the bottom
            animate={{ opacity: 1, y: 0 }}    // Slide in and fade in from the bottom
            exit={{ opacity: 0, y: 100 }}     // Slide out to the bottom and fade out
            transition={{ duration: 0.5, ease: "easeInOut"}}
            style={{ pointerEvents: formVisible ? 'auto' : 'none' }}
          >
            <form className="flex flex-col items-center" onSubmit={addNote}>
              <input 
                className="mb-4 p-2 w-full text-black rounded-md"
                type="text" 
                placeholder="Note Title" 
                value={newNote.title} 
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} 
              />
              <textarea
                className="mb-4 p-2 w-full text-black rounded-md"
                placeholder="Note Description"
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
              />
              <button type="submit" className="bg-[#FFA17F] text-white rounded-full px-4 py-2 hover:bg-[#FFBAAA] duration-150">
                Add Note
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
  </aside>
    </div>
  );
};

export default CalendarComponent;
