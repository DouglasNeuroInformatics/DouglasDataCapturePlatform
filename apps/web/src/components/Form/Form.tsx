import React from 'react';

import classNames from 'classnames';
import { Form as ReactRouterForm } from 'react-router-dom';

import { FormContextProvider } from '@/context/FormContext';

const Form = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <FormContextProvider>
      <ReactRouterForm autoComplete="off" className={classNames('max-w-lg', className)} method="post">
        {children}
      </ReactRouterForm>
    </FormContextProvider>
  );
};

export default Form;
