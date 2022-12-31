import React, { useContext } from 'react';

import FormContext from '@/context/FormContext';

const FieldError = ({ fieldName }: { fieldName: string }) => {
  const formContext = useContext(FormContext);
  const errorMessage = formContext.errorMessages[fieldName];
  return errorMessage ? <span className="text-red-700">{errorMessage}</span> : null;
};

export default FieldError;
