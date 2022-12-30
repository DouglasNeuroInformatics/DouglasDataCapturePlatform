import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout, { layoutLoader } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import AddSubjectPage, { addSubjectAction } from './pages/AddSubjectPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import AddInstrumentPage from './pages/instruments/AddInstrumentPage';
import ViewInstrumentsPage from './pages/instruments/ViewInstrumentsPage';
import LoginPage from './pages/LoginPage';
import ViewSubjectsPage, { viewSubjectsLoader } from './pages/ViewSubjectsPage';

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
      },
      {
        path: '/add-subject',
        element: <AddSubjectPage />,
        action: addSubjectAction
      },
      {
        path: '/view-subjects',
        element: <ViewSubjectsPage />,
        loader: viewSubjectsLoader
      },
      {
        path: '/instruments/add',
        element: <AddInstrumentPage />
      },
      {
        path: '/instruments/view',
        element: <ViewInstrumentsPage />
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
