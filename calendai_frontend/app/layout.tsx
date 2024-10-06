// app/layout.tsx

'use client'; 

import './globals.css';
import { ReactNode} from 'react';
import { SidebarProvider } from '@/contexts/SideBarContext';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion'; 
import Sidebar from '@/components/sidebar'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen">
            {pathname !== "/main" && <Sidebar />}
            <main className="flex-1 bg-gray-100 overflow-auto">
            <motion.div
  key={pathname}
  initial={{ rotateY: 90 }}
  animate={{ rotateY: 0 }}
  exit={{ rotateY: -90 }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}