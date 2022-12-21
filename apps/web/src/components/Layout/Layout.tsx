import React from 'react';

import Footer from './Footer.js';
import Sidebar from './Sidebar.js';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

const Layout = ({ children, showSidebar = true }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <div>
        <main className="container mx-auto grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
