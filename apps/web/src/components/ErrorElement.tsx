import React from 'react';

import useErrorInfo from '@/hooks/useErrorInfo';

const ErrorElement = () => {
  const errorInfo = useErrorInfo();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-5xl">Oops!</h1>
      <h1 className="mb-2 text-5xl">{errorInfo.code}</h1>
      <h3 className="text-3xl">{errorInfo.message}</h3>
    </div>
  );
};

export default ErrorElement;
