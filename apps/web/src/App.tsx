import React, { Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';

import router from './router.js';
import { AuthContextProvider } from './store/auth-context.js';

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Suspense>
  );
};

export default App;
