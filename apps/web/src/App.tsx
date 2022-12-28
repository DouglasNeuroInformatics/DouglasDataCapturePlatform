import React from 'react';

import Router from './components/Router';
import { AuthContextProvider } from './store/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
