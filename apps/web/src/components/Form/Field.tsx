import React, { useContext } from 'react';

import FormContext from '@/context/FormContext';

const Field = ({ name, children }: { name: string, children: React.ReactNode }) => {
  const formContext = useContext(FormContext);
  return (
    <div className="relative my-3">
      {children}
      <span className="peer-placeholder-shown:">{formContext.errorMessages[name]}</span>
    </div>
  );
};

export default Field;
