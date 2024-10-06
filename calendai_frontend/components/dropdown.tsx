'use client';

import { useState } from "react";
import { format, differenceInCalendarDays } from 'date-fns';


const Dropdown = ({events, setEvents}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [attributes, setAttributes] = useState({
    title: '',
    date: '',
    description: '',
  });

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAttributes({
      ...attributes,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date();
  
    // Convert the `attributes.date` string (YYYY-MM-DD) into a Date object
    const enteredDate = new Date(attributes.date + "T00:00:00"); // Ensures it's treated as a local date
    
    // Check if the entered date is valid
    if (isNaN(enteredDate.getTime())) {
      alert('Invalid date entered.');
      return;
    }

    // Calculate the difference in days between the entered date and the current date
    const differenceInDays = differenceInCalendarDays(enteredDate, currentDate);

    let formattedDate;

    if (differenceInDays <= 7 && differenceInDays >= 0) {
      // If within 7 days, convert to the day of the week
      formattedDate = format(enteredDate, 'EEEE'); // 'EEEE' gives the full day name, like "Monday"
    } else {
      // If more than 7 days, keep the original date format (YYYY-MM-DD)
      formattedDate = format(enteredDate, 'yyyy-MM-dd'); 
    }

    // Update the attributes state with the formatted date
    const updatedAttributes = { ...attributes, date: formattedDate };

    // Add the updated attributes to the events list
    setEvents([...events, updatedAttributes]);

    console.log('Custom Attributes:', attributes);
    const jsonString = JSON.stringify(attributes, null, 2); 
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'event-data.json';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

  };

  return (
    <div className="relative">
      {/* Button to open the full-page overlay */}
      <button
        onClick={toggleOverlay}
        className="bg-[#FFA17F] text-white px-4 py-2 rounded-md hover:bg-[#FFB599] duration-75"
      >
        New Event
      </button>

      {/* Full-page overlay with fade-in and scale transition */}
      <div
        className={`fixed inset-0 z-50 bg-gradient-to-t from-[#FFA17F]/50 to-[#00223E] flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative transition-transform duration-300 transform ${
            isOpen ? 'scale-100' : 'scale-95'
          }`}
        >
          <h2 className="text-2xl text-black font-bold mb-4">Create Event</h2>

          {/* Form for event attributes */}
          <form onSubmit={handleSubmit}>
            {Object.keys(attributes).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                {key === 'summary' ? (
                  <textarea
                    name={key}
                    value={attributes[key]}
                    onChange={handleInputChange}
                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
             transition-colors duration-300 ease-in-out 
             focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${key}`}
                  />
                ) : (
                  <input
                    type={key === 'date' ? 'date' : 'text'}
                    name={key}
                    value={attributes[key]}
                    onChange={handleInputChange}
                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${key}`}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={toggleOverlay}
                className="text-gray-500 hover:text-gray-800 duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#FFA17F] text-white px-4 py-2 rounded-md hover:bg-[#FFBAAA] transition duration-150"
              >
                Save
              </button>
            </div>
          </form>

          {/* Close button for overlay */}
          <button
            onClick={toggleOverlay}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 duration-150"
          >
            &#10005; {/* Unicode for "X" */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;