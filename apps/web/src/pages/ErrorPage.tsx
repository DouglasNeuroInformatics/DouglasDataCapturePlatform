import React from 'react';

interface ErrorPageProps {
  statusCode: number;
  message: string;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <h2>{message}</h2>
    </div>
  )
}

export default ErrorPage;