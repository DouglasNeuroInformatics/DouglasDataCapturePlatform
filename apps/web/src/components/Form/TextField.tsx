import React from 'react';

import Field from './Field';

const TextField = ({
  name,
  label,
  variant = 'text'
}: {
  name: string;
  label: string;
  variant?: 'text' | 'password';
}) => {
  return (
    <Field name={name}>
      <input
        className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent text-gray-900 placeholder-transparent focus:border-rose-600 focus:outline-none"
        name={name}
        placeholder=""
        type={variant}
      />
      <label
        className="absolute left-0 -top-3.5 -z-50 text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
        htmlFor={name}
      >
        {label}
      </label>
    </Field>
  );
};

export default TextField;
