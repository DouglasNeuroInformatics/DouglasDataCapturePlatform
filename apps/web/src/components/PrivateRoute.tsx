import React, { useContext } from 'react';

import { Route, RouteProps, Navigate } from 'react-router-dom';

import AuthContext from '../store/AuthContext.js';

const PrivateRoute = (props: RouteProps) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = !!authContext.authToken;

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }
  return <Route {...props} />;
};

export default PrivateRoute;
