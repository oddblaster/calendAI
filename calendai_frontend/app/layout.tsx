// app/layout.tsx

'use client'; // Ensure this is a client component

import './globals.css';
import { ReactNode } from 'react';
import { SidebarProvider } from '@/contexts/SideBarContext';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar'; // Adjust the path as necessary

export default function RootLayout({ children }: { children: ReactNode }) {
   const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex h-screen">
            {pathname != "/main" && <Sidebar />}
            <main className="flex-1 bg-gray-100 overflow-auto">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}