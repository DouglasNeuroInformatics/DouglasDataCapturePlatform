import React, { useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import AuthContext, { type AuthToken } from './store/AuthContext.js';

const App = () => {
  const [authToken, setAuthToken] = useState<AuthToken>(null);
  console.log(authToken);
  console.log('token in session storage', window.sessionStorage.getItem('token'))
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <BrowserRouter>
        {authToken ? (
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
    </AuthContext.Provider>
  );
};

export default App;
