import React from 'react';

import { Form as ReactRouterForm } from 'react-router-dom';

import { FormContextProvider } from '@/context/FormContext';

const Form = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormContextProvider>
      <ReactRouterForm autoComplete="off" className="max-w-lg" method="post">
        {children}
      </ReactRouterForm>
    </FormContextProvider>
  );
};

export default Form;
