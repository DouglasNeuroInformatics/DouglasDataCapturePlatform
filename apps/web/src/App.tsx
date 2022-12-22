import React, { useContext } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import AuthContext, { AuthContextProvider } from './store/AuthContext.js';

const App = () => {
  const authContext = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <BrowserRouter>
        {authContext.token ? (
          <Routes>
            <Route index element={<HomePage />} path="/" />
            <Route element={<Navigate to="/" />} path="*" />
          </Routes>
        ) : (
          <Routes>
            <Route index element={<HomePage />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<Navigate to="/login" />} path="*" />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
