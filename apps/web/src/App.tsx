import React from 'react';

import Router from './components/Router.js';
import { AuthContextProvider } from './store/AuthContext.js';

const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};

export default App;
