// app/layout.tsx

'use client'; 

import './globals.css';
import { ReactNode ,useState, useEffect} from 'react';
import { SidebarProvider } from '@/contexts/SideBarContext';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'; 
import Sidebar from '@/components/sidebar'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Get the current route
  const [isMainTransition, setIsMainTransition] = useState(false);

  useEffect(() => {
    setIsMainTransition(pathname === '/main'); // Set transition state based on current route
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
        <motion.div
            key={pathname}
            initial={{
              opacity: isMainTransition ? 0 : 1,
              scale: isMainTransition ? 0.5 : 1, 
            }}
            animate={{
              opacity: 1, 
              scale: 1,    
            }}
            exit={{
              opacity: isMainTransition ? 0 : 1, 
              scale: isMainTransition ? 0.5 : 1,  
            }}
            transition={{
              duration: 1.5, 
              ease: 'easeInOut', 
            }}
          >
          <div className="flex h-screen">
            {pathname !== "/main" && <Sidebar />}
            <main className="flex-1 bg-gray-100 overflow-auto">
            {children}
            </main>
          </div>
        </motion.div>
        </SidebarProvider>
      </body>
    </html>
  );
}