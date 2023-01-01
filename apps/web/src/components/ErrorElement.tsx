import React from 'react';

import useErrorInfo from '@/hooks/useErrorInfo';

const ErrorElement = () => {
  const errorInfo = useErrorInfo();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1>Oops!</h1>
      <h3>{`${errorInfo.code ? errorInfo.code.toString() + ' | ' : ''} ${errorInfo.message}`}</h3>
    </div>
  );
};

export default ErrorElement;
