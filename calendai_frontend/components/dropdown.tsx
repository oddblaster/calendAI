'use client';

import { useState } from "react";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [attributes, setAttributes] = useState({
        title: '',
        summary: '',
        location: '',
        date : '',
        start: '',
        end: '',
        zone: ''
      });
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setAttributes({
          ...attributes,
          [name]: value,
        });
      };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Custom Attributes:', attributes);
    // You can add logic to handle the submission, like storing the attributes in state or sending them to a backend.
    setIsOpen(false); // Close the dropdown after submission
    };



    return (
        <div className="relative">
          {/* Button to toggle dropdown */}
          <button
            onClick={toggleDropdown}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-75"
          >
            + Create event
          </button>
    
          {/* Dropdown with dynamic inputs */}
          {isOpen && (
            <form
              onSubmit={handleSubmit}
              className={`absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg p-4 transform transition-all duration-300 ease-in-out 
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
              {/* Dynamically generate input fields based on attributes */}
              {Object.keys(attributes).map((key) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={attributes[key]}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
    
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      );
}

export default Dropdown;