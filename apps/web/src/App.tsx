import React, { Suspense } from 'react';

import { RouterProvider } from 'react-router-dom';

import router from './router.js';

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
