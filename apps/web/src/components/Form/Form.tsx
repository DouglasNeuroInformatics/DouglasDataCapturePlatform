import React from 'react';

import { Form as ReactRouterForm } from 'react-router-dom';

import { FormContextProvider } from '@/context/FormContext';

interface FormProps {
  children: React.ReactNode;
}

const Form = ({ children }: FormProps) => {
  return (
    <FormContextProvider>
      <ReactRouterForm autoComplete="off" className="flex flex-col" method="post">
        {children}
      </ReactRouterForm>
    </FormContextProvider>
  );
};

export { Form as default, type FormProps };
