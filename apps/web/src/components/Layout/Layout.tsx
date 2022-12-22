import React from 'react';

import Footer from './Footer.js';
import Sidebar from './Sidebar.js';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen w-screen">
      <Sidebar />
      <div className="container absolute left-72 mx-auto min-h-full w-[calc(100vw-theme(spacing.72))] overflow-scroll">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
