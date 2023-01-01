import React, { createContext } from 'react';

import useValidationError from '@/hooks/useValidationError';

type ErrorMessages = Record<string, string | undefined>;

interface FormContextInterface {
  errorMessages: ErrorMessages;
}

const FormContext = createContext<FormContextInterface>({
  errorMessages: {}
});

const FormContextProvider = ({ children }: { children: React.ReactNode }) => {
  const validationError = useValidationError();

  const errorMessages: ErrorMessages = {};
  if (validationError) {
    validationError.details.forEach((item) => {
      if (item.context?.key) {
        errorMessages[item.context.key] = item.message;
      }
    });
  }

  return <FormContext.Provider value={{ errorMessages }}>{children}</FormContext.Provider>;
};

export { FormContext as default, FormContextProvider };
