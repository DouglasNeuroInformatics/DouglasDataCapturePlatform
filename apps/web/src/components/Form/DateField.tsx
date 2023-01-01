import React from 'react';

import Field from './Field';

const DateField = ({ name }: { name: string }) => {
  return (
    <Field name={name}>
      <input name={name} type="date" />
      <label htmlFor={name}></label>
    </Field>
  );
};

export default DateField;
