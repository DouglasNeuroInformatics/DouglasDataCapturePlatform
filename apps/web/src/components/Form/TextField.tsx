import React from 'react';

interface TextFieldProps {
  name: string;
}

const TextField = ({ name }: TextFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>Password</label>
      <input name={name} type="password" />
    </div>
  )
}

export { TextField as default, type TextFieldProps };