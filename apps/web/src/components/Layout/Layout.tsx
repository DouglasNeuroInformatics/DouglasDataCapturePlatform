import React from 'react';

import Footer from './Footer';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <div className="absolute left-0 h-screen w-72">
        <Sidebar />
      </div>
      <div className="absolute left-72 flex h-screen w-[calc(100vw-theme(spacing.72))] flex-col overflow-scroll">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Layout;
