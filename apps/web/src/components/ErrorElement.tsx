import React from 'react';

import { useRouteError } from 'react-router-dom';

// To be checked later
interface RouteError {
  status: number;
  statusText: string;
}

const ErrorElement = () => {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-2 text-5xl">{error.status}</h1>
      <h3 className="text-3xl">{error.statusText}</h3>
    </div>
  );
};

export default ErrorElement;
