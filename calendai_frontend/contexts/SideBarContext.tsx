'use client'; // Ensure this is a client component

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context
interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with default values
const SidebarContext = createContext<SidebarContextProps>({
  isOpen: false,
  toggleSidebar: () => {},
});

// Create a provider component
export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook for easy consumption of the context
export const useSidebar = () => useContext(SidebarContext);