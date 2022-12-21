import React from 'react';

import Footer from './Footer.js';
import Sidebar from './Sidebar.js';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto flex min-h-full grow flex-col overflow-scroll">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
