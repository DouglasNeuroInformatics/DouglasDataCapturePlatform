import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';
import HomePage from '../pages/HomePage.js';
import LoginPage from '../pages/LoginPage.js';

const Router = () => {
  const auth = useAuth();
  return (
    <BrowserRouter>
      {auth.token ? (
        <Routes>
          <Route index element={<HomePage />} path="/" />
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
