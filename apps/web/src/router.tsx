import React from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom'

import AboutPage from './pages/AboutPage.js';
import IndexPage from './pages/IndexPage.js';
import LoginPage from './pages/LoginPage.js'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <IndexPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]

const router = createBrowserRouter([
  ...publicRoutes
])

export default router;