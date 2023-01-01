import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorElement from './components/ErrorElement';
import HomePage from './routes/home';
import InstrumentPage, { instrumentPageLoader } from './routes/instruments/:instrument';
import AddInstrumentPage, { addInstrumentAction } from './routes/instruments/add-instrument';
import ViewInstrumentsPage, { viewInstrumentsLoader } from './routes/instruments/view-instruments';
import LoginPage, { loginAction } from './routes/login';
import Root, { rootLoader } from './routes/root';
import AddSubjectPage, { addSubjectAction } from './routes/subjects/add-subject';
import ViewSubjectsPage, { viewSubjectsLoader } from './routes/subjects/view-subjects';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <React.Suspense>
        <Root />
      </React.Suspense>
    ),
    errorElement: <ErrorElement />,
    loader: rootLoader,
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
        element: <ViewInstrumentsPage />,
        loader: viewInstrumentsLoader
      },
      {
        path: '/instruments/:id',
        element: <InstrumentPage />,
        loader: instrumentPageLoader
      }
    ]
  },
  {
    path: '/login',
    element: (
      <React.Suspense>
        <LoginPage />
      </React.Suspense>
    ),
    action: loginAction,
    errorElement: <ErrorElement />
  }
]);

export default router;
