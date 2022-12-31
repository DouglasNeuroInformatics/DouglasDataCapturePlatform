import { ValidationError } from 'joi';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

interface ErrorInfo {
  code?: number;
  message: string;
}

const parseErrorInfo = (error: unknown): ErrorInfo => {
  if (isRouteErrorResponse(error)) {
    return {
      code: error.status,
      message: error.statusText
    };
  } else if (error instanceof ValidationError) {
    return {
      message: error.message
    };
  } else if (error instanceof Error) {
    return {
      message: error.message
    };
  }
  return {
    message: 'An unknown error occurred'
  };
};

export default function useErrorInfo() {
  const error = useRouteError();
  console.error(error);
  return parseErrorInfo(error);
}
