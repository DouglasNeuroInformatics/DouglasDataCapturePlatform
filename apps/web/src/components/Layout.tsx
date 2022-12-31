import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import useAuth from '@/hooks/useAuth';

function layoutLoader() {
  return null;
}

const Layout = () => {
  const auth = useAuth();
  return auth ? (
    <React.Fragment>
      <div className="absolute left-0 h-screen w-72">
        <Sidebar />
      </div>
      <div className="absolute left-72 flex h-screen w-[calc(100vw-theme(spacing.72))] flex-col overflow-scroll">
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

export { Layout as default, layoutLoader };
