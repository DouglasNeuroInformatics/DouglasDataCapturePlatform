import React, { useContext } from 'react';

import FieldError from './FieldError';
import FormGroup from './FormGroup';

import FormContext from '@/context/FormContext';

interface TextFieldProps {
  name: string;
  label: string;
}

const TextField = ({ name, label }: TextFieldProps) => {
  const formContext = useContext(FormContext);
  const x = formContext.errorMessages[name]
  console.log(x)
  return (
    <FormGroup>
      <input name={name} placeholder={label} type="text" />
      <FieldError fieldName={name} />
    </FormGroup>
  );
}

export { TextField as default }