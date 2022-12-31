import React from 'react';

import FieldError from './FieldError';

interface FormGroupProps {
  children: React.ReactNode
}

const FormGroup = ({ children }: FormGroupProps) => {
  return (
    <div className="flex flex-col">
      {children}
      <FieldError />
    </div>
  )
}

export default FormGroup;