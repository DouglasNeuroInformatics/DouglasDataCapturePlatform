import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout, { layoutLoader } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense>
        <Layout />
      </React.Suspense>
    ),
    errorElement: <ErrorPage />,
    loader: layoutLoader,
    children: [
      {
        path: '/home',
        element: <HomePage />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <React.Suspense>
        <LoginPage />
      </React.Suspense>
    )
  }
]);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />;
    </AuthContextProvider>
  );
};

export default App;
