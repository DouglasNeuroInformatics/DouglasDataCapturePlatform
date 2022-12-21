import React, { Suspense, useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import router from './router.js';
import AuthContext, { type AuthToken } from './store/auth-context.js';

const App = () => {
  const [authToken, setAuthToken] = useState<AuthToken>(null);
  return (
    <Suspense fallback="Loading...">
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </Suspense>
  );
};

export default App;
