import React from 'react';

import { FaGithub } from 'react-icons/fa';

interface LayoutProps {
  children: React.ReactNode;
}

const currentYear = new Date().getFullYear();

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="container mx-auto grow">{children}</main>
      <footer className="container mx-auto">
        <hr />
        <div className="p-5">
          <p className="text-center text-sm text-gray-500">&copy; {currentYear} Douglas Neuroinformatics Platform</p>
          <div className="flex items-center justify-center">
            <span className="text-center text-sm text-gray-500">View Source Code</span>
            <a
              href="https://github.com/DouglasNeuroInformatics/DouglasDataCapturePlatform"
              rel="noreferrer"
              target="_blank"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
