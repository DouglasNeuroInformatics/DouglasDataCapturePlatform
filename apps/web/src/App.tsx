import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
