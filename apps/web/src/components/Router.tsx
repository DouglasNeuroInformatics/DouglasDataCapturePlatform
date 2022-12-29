import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import AddInstrumentPage from '@/pages/AddInstrumentPage';
import AddSubjectPage from '@/pages/AddSubjectPage';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import ViewSubjectsPage from '@/pages/ViewSubjectsPage';

const Router = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      {auth.token ? (
        <Routes>
          <Route index element={<HomePage />} path="/" />
          <Route element={<AddSubjectPage />} path="/add-subject" />
          <Route element={<ViewSubjectsPage />} path="/view-subjects" />
          <Route element={<AddInstrumentPage />} path="add-instrument" />
          <Route element={<Navigate to="/" />} path="*" />
        </Routes>
      ) : (
        <Routes>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Navigate to="/login" />} path="*" />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
