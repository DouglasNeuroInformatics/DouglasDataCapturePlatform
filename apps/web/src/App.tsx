import React, { Suspense, useState } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.js';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import AuthContext, { type AuthToken } from './store/AuthContext.js';

const App = () => {
  const [authToken, setAuthToken] = useState<AuthToken>(null);
  console.log(authToken)
  return (
    <Suspense fallback="Loading...">
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
    </Suspense>
  );
};

export default App;
