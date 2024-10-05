'use client';

import { useState } from "react";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [attributes, setAttributes] = useState({
    title: '',
    summary: '',
    location: '',
    date: '',
    start: '',
    end: '',
    zone: ''
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
    console.log('Custom Attributes:', attributes);
    // Add your submission logic here (e.g., API call)
    setIsOpen(false); // Close the overlay after submission
  };

  return (
    <div className="relative">
      {/* Button to open the full-page overlay */}
      <button
        onClick={toggleOverlay}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 duration-75"
      >
        + Create event
      </button>

      {/* Full-page overlay with fade-in and scale transition */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
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

          {/* Close button for overlay */}
          <button
            onClick={toggleOverlay}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            &#10005; {/* Unicode for "X" */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;