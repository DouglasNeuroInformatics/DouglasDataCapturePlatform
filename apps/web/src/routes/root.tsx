import React, { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import useAuth from '@/hooks/useAuth';

function rootLoader() {
  return null;
}

const Root = () => {
  const auth = useAuth();
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);

  useEffect(() => {
    if (import.meta.env.DEV) {
      void auth.methods.loginDev();
    }
  }, []);

  return auth.currentUser ? (
    <React.Fragment>
      <div className="md:hidden">
        <Navbar onToggleClick={() => setShowSidebarMobile(true)} />
      </div>
      <div
        className="absolute top-0 -left-72 z-50 h-screen w-72 md:left-0"
        style={showSidebarMobile ? { left: 0 } : undefined}
      >
        <Sidebar />
      </div>
      <div className="absolute left-0 flex h-screen w-full flex-col overflow-scroll pt-5 md:left-72 md:w-[calc(100vw-theme(spacing.72))]">
        <main className="flex-grow sm:container">
          <Outlet />
        </main>
        <Footer />
      </div>
    </React.Fragment>
  ) : (
    <Navigate to="/login" />
  );
};

export { Root as default, rootLoader };
