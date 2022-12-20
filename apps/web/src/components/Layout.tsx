import React from 'react';

import Footer from './Footer.js';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="container mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
