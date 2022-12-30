import React from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ErrorElement from './components/ErrorElement';
import Layout, { layoutLoader } from './components/Layout';
import { AuthContextProvider } from './context/AuthContext';
import HomePage from './routes/home';
import AddInstrumentPage, { addInstrumentAction } from './routes/instruments/add-instrument';
import ViewInstrumentsPage from './routes/instruments/view-instruments';
import LoginPage from './routes/login';
import AddSubjectPage, { addSubjectAction } from './routes/subjects/add-subject';
import ViewSubjectsPage, { viewSubjectsLoader } from './routes/subjects/view-subjects';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense>
        <Layout />
      </React.Suspense>
    ),
    errorElement: <ErrorElement />,
    loader: layoutLoader,
    children: [
      {
        path: '/home',
        element: <HomePage />
      },
      {
        path: '/subjects/add-subject',
        element: <AddSubjectPage />,
        action: addSubjectAction
      },
      {
        path: '/subjects/view-subjects',
        element: <ViewSubjectsPage />,
        loader: viewSubjectsLoader
      },
      {
        path: '/instruments/add-instrument',
        element: <AddInstrumentPage />,
        action: addInstrumentAction
      },
      {
        path: '/instruments/view-instruments',
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
